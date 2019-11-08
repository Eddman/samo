import {OnDestroy} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Observable, Subject} from 'rxjs';
import {ContentPart} from './content/content';
import {RoutingService} from './routing/routing.service';

const metaConfig = {
    description: 'architekt ~ poprad ~ wien'
};

export abstract class AbstractComponent implements OnDestroy {

    public error: string | undefined;

    private readonly _destroyed = new Subject<void>();

    constructor(protected metaService: Meta,
                protected routingService: RoutingService) {
    }

    public ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    public get destroyed(): Observable<void> {
        return this._destroyed.asObservable();
    }

    protected getDescriptionFromContent(desc: string | undefined, content: ContentPart[]): string | undefined {
        let description: string | undefined = desc;
        if (content) {
            if (description) {
                description += '\n';
            } else {
                description = '';
            }
            content.forEach((part: ContentPart) => {
                if (part.type === 'text' && part.text) {
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

    protected getFirstImageFromContent(content: ContentPart[]): string | undefined {
        let img: ContentPart | undefined;
        if (content) {
            img = content.find((part: ContentPart) => {
                return part.type === 'image' && !!part.url;
            });
        }
        if (img) {
            return img.url;
        }
        return undefined;
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
                content : '/assets/images/seo/thumb.png'
            });
        }
    }
}
