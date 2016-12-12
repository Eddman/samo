import {ElementRef, Component, OnChanges, SimpleChanges} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {MetaService} from '@meta/index';

import {AbstractViewComponent} from "../abstract.view.component";
import {RoutingService} from "../routing/routing.service";
import {AuthService} from "../auth/auth.service";

import {DetailService} from "./detail.service";
import {Detail} from "./detail";

@Component({
    moduleId: module.id,
    selector: 'detail-view',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.component.css']
})
export class DetailComponent extends AbstractViewComponent implements OnChanges {

    private detail: Detail;

    constructor(private detailService: DetailService,
                metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
    }


    public ngOnChanges(changes: SimpleChanges): void {
        this.detailService.getDetail(this.route.configuration.type, this.route.parameters).then((detail: Detail) => {
            let desc: string;
            this.detail = detail;

            this.setSEODescription();
            this.setSEOImage();

            if (detail) {
                if (detail.title) {
                    desc = detail.title;
                }
                if (detail.header) {
                    if (desc) {
                        desc += ", ";
                    } else {
                        desc = '';
                    }
                    desc += detail.header.pageTitle;
                    desc += ", ";
                    desc += detail.header.content.replace(new RegExp('\n', 'g'), ', ');
                }

                if (this.detail.content) {
                    desc = this.getDescriptionFromContent(desc, this.detail.content);
                }

                this.setSEODescription(desc);
                this.setSEOImage(this.getFirstImageFromContent(this.detail.content));
                this.headerChange.emit(this.detail.header);
            }
        });
    }
}