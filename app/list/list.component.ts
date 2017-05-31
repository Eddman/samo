import {ElementRef, OnChanges, SimpleChanges, Component, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MetaService} from 'ng2-meta/src';

import {AbstractViewComponent} from '../abstract.view.component';
import {ModalLoginComponent} from '../common/modal/modal.login.component';

import {RoutingService} from '../routing/routing.service';
import {AuthService} from '../auth/auth.service';

import {ListService} from './list.service';

import {ListItem} from './list.item';
import {Route} from '../routing/route';
import {ViewHeader} from '../detail/detail';

@Component({
    moduleId   : module.id,
    selector   : 'list-view',
    templateUrl: 'list.component.html',
    styleUrls  : ['list.component.css']
})
export class ListComponent extends AbstractViewComponent implements OnChanges {

    @Output()
    public headerChange: EventEmitter<ViewHeader>;

    @ViewChild(ModalLoginComponent)
    public loginModal: ModalLoginComponent;

    @Input()
    public route: Route;

    public listItems: ListItem[];

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
                this.listItems.some((item: ListItem) => {
                    if (item.title) {
                        desc = item.title;
                    }

                    if (item.content) {
                        desc = this.getDescriptionFromContent(desc, item.content);
                    }
                    return desc && desc.length >= 250;
                });

                this.setSEODescription(desc);

                this.listItems.some((item: ListItem) => {
                    let img: string;
                    if (item.content) {
                        img = this.getFirstImageFromContent(item.content);
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
