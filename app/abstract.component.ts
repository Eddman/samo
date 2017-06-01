import {ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';

import {AuthService} from './auth/auth.service';
import {RoutingService} from './routing/routing.service';
import {ContentPartsTypes, ContentPart} from './content/content';

const metaConfig = {
    description: 'architekt ~ poprad ~ wien'
};

export abstract class AbstractComponent {

    protected el: Element;

    public isEdit: boolean;

    public error: string;

    constructor(protected metaService: Meta,
        protected authService: AuthService,
        protected routingService: RoutingService,
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        el: ElementRef) {
        this.isEdit = false;
        this.el = el.nativeElement;
    }

    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    protected startEdit(): void {
        this.isEdit = true;

        // Disable navigation
        this.routingService.disabled = true;
    }

    protected stopEdit(): void {
        this.isEdit = false;

        // Enable navigation
        delete this.routingService.disabled;

        // Remove error message
        delete this.error;
    }

    protected getDescriptionFromContent(desc: string, content: ContentPart[]): string {
        let description: string = desc;
        if (content) {
            if (description) {
                description += '\n';
            } else {
                description = '';
            }
            content.forEach((part: ContentPart) => {
                if (part.type === ContentPartsTypes.TEXT && part.text) {
                    description += part.text;
                }
            });
        }
        return description;
    }

    protected setSEODescription(desc?: string): void {
        let description = desc;
        if (description) {
            description = description.replace(new RegExp('\t', 'g'), '');
            if (description.length > 250) {
                description = description.substring(0, 247).concat('...');
            }
        } else {
            description = metaConfig.description;
        }

        this.metaService.updateTag({
            property: 'og:description',
            content : description
        });

        this.metaService.updateTag({
            name   : 'description',
            content: description
        });
    }

    protected getFirstImageFromContent(content: ContentPart[]): string {
        let img: ContentPart;
        if (content) {
            img = content.find((part: ContentPart) => {
                return part.type === ContentPartsTypes.IMAGE && !!part.url;
            });
        }
        if (img) {
            return img.url;
        }
        return null;
    }

    protected setSEOImage(imageUrl?: string): void {
        if (imageUrl) {
            this.metaService.updateTag({
                property: 'og:image',
                content : imageUrl
            });
        } else {
            this.metaService.updateTag({
                property: 'og:image',
                content : window.location.origin + '/seo/thumb.png'
            });
        }
    }
}