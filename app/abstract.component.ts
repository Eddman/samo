import {EventEmitter, ElementRef, Component, Output, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MetaService} from '@meta/index';

import {AuthService} from './auth/auth.service';
import {RoutingService} from './routing/routing.service';
import {contentPartsTypes, ContentPart} from './content/content';
import {ModalLoginComponent} from './common/modal/modal.login.component';

import {SubjectSubscription} from 'rxjs/SubjectSubscription';

@Component({
    moduleId: module.id,
})
export class AbstractComponent {

    protected el: Element;

    protected isEdit: boolean;

    public error: string;

    constructor(protected metaService: MetaService,
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

    protected getDescriptionFromContent(desc: string, content: ContentPart[]): string {
        let description: string = desc;
        if (content) {
            if (description) {
                description += '\n';
            } else {
                description = '';
            }
            Object.keys(content).forEach((k) => {
                if (content[k].type === contentPartsTypes.TEXT && content[k].text) {
                    description += content[k].text;
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
            this.metaService.setTag('description', description);
        } else {
            this.metaService.setTag('description', null);
        }
    }

    protected getFirstImageFromContent(content: ContentPart[]): string {
        let img: string;
        if (content) {
            img = Object.keys(content).find((k) => {
                return content[k].type === contentPartsTypes.IMAGE && content[k].url;
            });
            if (img) {
                img = content[img].url;
            }
        }
        return img;
    }

    protected setSEOImage(imageUrl?: string): void {
        if (imageUrl) {
            this.metaService.setTag('og:image', window.location.origin + imageUrl);
        } else {
            this.metaService.setTag('og:image', window.location.origin + '/seo/thumb.png');
        }
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
}