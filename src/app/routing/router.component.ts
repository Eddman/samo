import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {AbstractComponent} from '../abstract.component';
import {ViewHeader} from '../detail/detail';
import {Route} from './route';
import {RoutingService} from './routing.service';

@Component({
    selector           : 'sn-router',
    templateUrl        : 'router.component.html',
    styleUrls          : [
        'router.component.scss'
    ],
    host               : {
        '[class.sn-router]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class RouterComponent extends AbstractComponent implements OnInit {

    public config: Route | undefined;

    constructor(metaService: Meta,
                routingService: RoutingService,
                private readonly router: Router,
                private readonly activeRoute: ActivatedRoute,
                private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnInit(): void {
        this.activeRoute.params.pipe(
            takeUntil(this.destroyed),
            switchMap((params) => this.processRoute(params))
        ).subscribe();
    }

    private processRoute(pathParams: Params) {
        const params: string[] = [];
        Object.keys(pathParams).forEach((paramName: string) => {
            params.push(pathParams[paramName]);
        });
        return this.routingService.getRouteConfig(params).pipe(
            tap((route) => {
                    this.config = route;
                    this.routingService.setSelectedRoute(route, params);
                    this.changeDetectorRef.markForCheck();

                    if (route.redirectPath) {
                        this.router.navigate([route.redirectPath], {relativeTo: this.activeRoute});
                    }
                },
                () => {
                    this.router.navigate(['/']);
                }
            )
        );
    }

    public processHeader(header: ViewHeader) {
        if (this.config != null) {
            this.config.additionalHeader = header;
            this.routingService.setSelectedRoute(
                this.routingService.selectedRoute,
                this.routingService.selectedRoutePathParams
            );
            this.changeDetectorRef.markForCheck();
        }
    }
}
