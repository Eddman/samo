import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {EMPTY, Observable} from 'rxjs';
import {catchError, shareReplay, takeUntil, tap} from 'rxjs/operators';
import {AbstractViewComponent} from '../abstract.view.component';
import {ViewHeader} from '../detail/detail';

import {MenuItem} from '../routing/menu';
import {Route} from '../routing/route';
import {RoutingService} from '../routing/routing.service';

@Component({
    selector           : 'sn-app-menu',
    templateUrl        : 'menu.component.html',
    styleUrls          : [
        'menu.component.scss'
    ],
    host               : {
        '[class.sn-app-menu]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class MenuComponent extends AbstractViewComponent {

    @Output()
    public editEnabled = new EventEmitter<boolean>();

    private readonly _rootItem = this.routingService.getMenuRoutes().pipe(
        tap((rootItem: MenuItem) => {
            document.title = rootItem.title;
        }),
        catchError((error) => {
            this.error = error;
            return EMPTY;
        }),
        shareReplay({
            refCount  : true,
            bufferSize: 1
        })
    );

    constructor(metaService: Meta,
                routingService: RoutingService,
                changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
        routingService.navigationOccurred.pipe(
            takeUntil(this.destroyed)
        ).subscribe(() => changeDetectorRef.markForCheck());
    }

    public get rootItem(): Observable<MenuItem> {
        return this._rootItem;
    }

    public isGroupExpanded(groupItem: MenuItem): boolean {
        const selected: string[] = this.routingService.selectedRoutePathParams;
        return selected && selected.length > 0 && selected[0] === groupItem.realURL;
    }

    public getHomeLink(): string {
        const selected: string[] = this.routingService.selectedRoutePathParams;
        return selected ? '/' + selected.slice(0, selected.length - 1).join('/') : '/';
    }

    public isPageHeaderVisible(): boolean {
        const selected: Route | undefined = this.routingService.selectedRoute;
        return !selected || !selected.parameters && !selected.additionalHeader;
    }

    public getPageHeader(): ViewHeader | undefined {
        if (this.routingService.selectedRoute != null) {
            return this.routingService.selectedRoute.additionalHeader;
        }
        return undefined;
    }
}
