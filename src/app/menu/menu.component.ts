import {ElementRef, ViewChild, EventEmitter, Output, OnInit, Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {RoutingService} from '../routing/routing.service';
import {AuthService} from '../auth/auth.service';

import {ModalConfirmationComponent} from '../common/modal/modal.confirmation.component';
import {ModalLoginComponent} from '../common/modal/modal.login.component';
import {AbstractViewComponent} from '../abstract.view.component';

import {MenuItem} from '../routing/menu';
import {Route} from '../routing/route';
import {RouteConfiguration} from '../routing/route.configuration';
import {ViewHeader} from '../detail/detail';

@Component({
    moduleId   : module.id,
    selector   : 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls  : ['menu.component.css'],
    host       : {
        '[class.editMode]': 'isEdit'
    }
})
export class MenuComponent extends AbstractViewComponent implements OnInit {

    @Output()
    public headerChange: EventEmitter<ViewHeader>;

    @ViewChild(ModalLoginComponent)
    public loginModal: ModalLoginComponent;

    @Input()
    public route: Route;

    @ViewChild('saveConfirmation')
    public saveConfirmation: ModalConfirmationComponent;

    @ViewChild('cancelConfirmation')
    public cancelConfirmation: ModalConfirmationComponent;

    @Output()
    public editEnabled: EventEmitter<boolean>;

    public rootItem: MenuItem | RouteConfiguration;

    constructor(metaService: Meta,
        authService: AuthService,
        routingService: RoutingService,
        router: Router,
        route: ActivatedRoute,
        el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
        this.editEnabled = new EventEmitter<boolean>();
    }

    // Items loading
    public ngOnInit(): void {
        this.loadItems();
    }

    private loadItems(): void {
        this.routingService.getMenuRoutes().then((rootItem: MenuItem) => {
            this.rootItem = rootItem;
            document.title = rootItem.title;
        }, (error) => {
            this.error = error;
            delete this.rootItem;
        });
    }

    // Standard menu navigation
    public isDisabled(): boolean {
        return this.routingService.disabled;
    }

    public isGroupExpanded(groupItem: MenuItem): boolean {
        let selected: string[] = this.routingService.selectedRoutePathParams;
        return selected && selected.length && selected[0] === groupItem.realURL;
    }

    public getHomeLink(): string {
        let selected: string[] = this.routingService.selectedRoutePathParams;
        return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
    }

    public isPageHeaderVisible(): boolean {
        let selected: Route = this.routingService.selectedRoute;
        return !selected || !selected.parameters && !selected.additionalHeader;
    }

    public getPageHeader(): ViewHeader {
        return this.routingService.selectedRoute.additionalHeader;
    }

    // Edit mode
    protected startEdit(): void {
        super.startEdit();
        this.editEnabled.emit(true);
    }

    protected stopEdit(): void {
        super.stopEdit();
        this.editEnabled.emit(false);
    }

    public edit(): void {
        // Enable edit mode
        this.startEdit();

        // Load all routes
        this.routingService.getRootConfiguration().then((root: RouteConfiguration) => {
            this.rootItem = JSON.parse(JSON.stringify(root));
        }).catch((error) => {
            this.error = error;
        });
    }

    // Save
    public confirmSave(): void {
        // Open confirmation popup
        this.saveConfirmation.open();
    }

    public save(): void {
        let rootItem: RouteConfiguration = <RouteConfiguration> this.rootItem;

        // Remove root item
        this.rootItem = <RouteConfiguration>{};

        // Remove unnecessary local data
        this.removeBags(rootItem);

        // Save root configuration
        this.routingService.saveRootConfiguration(rootItem)
        // On save refresh
            .then(() => {
                // Disable edit mode
                this.stopEdit();

                // Load items
                this.loadItems();
            })
            // On error
            .catch((err) => {
                // Restore
                this.rootItem = rootItem;

                // Process error
                this.onHttpError(err, this.save, this.edit, this.loadItems);
            });
    }

    private removeBags(item: RouteConfiguration): void {
        delete item.bag;
        if (item.routes) {
            item.routes.forEach((item: RouteConfiguration) => {
                this.removeBags(item);
            });
        }
    }

    // Cancel edit
    public confirmCancel(): void {
        // Open confirmation popup
        this.cancelConfirmation.open();
    }

    public cancel(): void {
        // Disable edit mode
        this.stopEdit();

        // Load items
        this.loadItems();
    }

    // Adding groups
    public addGroup(): void {
        (<RouteConfiguration> this.rootItem).routes.push({
            title : 'No name',
            url   : '',
            type  : 'group',
            routes: []
        });
    }
}
