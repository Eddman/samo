import {ElementRef, OnChanges, SimpleChanges, Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {MetaService} from '@meta/index';

import {InheritAnnotations} from "../abstract.component";
import {AbstractViewComponent} from "../abstract.view.component";
import {RoutingService} from "../routing/routing.service";
import {AuthService} from "../auth/auth.service";

import {ListService} from "./list.service";
import {ListItem} from "./list.item";

@Component({
    moduleId: module.id,
    selector: 'list-view',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
@InheritAnnotations()
export class ListComponent extends AbstractViewComponent implements OnChanges {

    private listItems: ListItem[];

    constructor(private listService: ListService,
                metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.listService.getListItems(this.route.configuration.type).then((listItems: ListItem[]) => {
            let desc: string;

            this.listItems = listItems;

            this.setSEODescription();
            this.setSEOImage();

            if (this.listItems && this.listItems.length) {
                Object.keys(this.listItems).find((i) => {
                    if (this.listItems[i].title) {
                        desc = this.listItems[i].title;
                    }

                    if (this.listItems[i].content) {
                        desc = this.getDescriptionFromContent(desc, this.listItems[i].content);
                    }
                    return desc && desc.length >= 250;
                });

                this.setSEODescription(desc);

                Object.keys(this.listItems).find((i) => {
                    let img: string;
                    if (this.listItems[i].content) {
                        img = this.getFirstImageFromContent(this.listItems[i].content);
                        if (img) {
                            this.setSEOImage(img);
                            return true;
                        }
                    }
                    return false;
                });
            }
        });
    }
}
