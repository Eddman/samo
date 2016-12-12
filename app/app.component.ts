import {Component, ViewChild, ReflectiveInjector, ElementRef, OnInit} from '@angular/core';
import {RouterOutlet, ActivatedRoute, RouterOutletMap, Router} from '@angular/router';

import {MetaService} from "@meta/index";

import {AbstractComponent} from './abstract.component';
import {AuthService} from "./auth/auth.service";
import {RoutingService} from "./routing/routing.service";

@Component({
    moduleId: module.id,
    selector: 'samuel-netocny',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent extends AbstractComponent implements OnInit {

    @ViewChild(RouterOutlet)
    private routerOutlet: RouterOutlet;

    private previousRoute: ActivatedRoute;

    private active: boolean;

    constructor(metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
    }


    public ngOnInit(): void {
        this.active = true;
    }

    public deactivateRouter(deactivate: boolean) {
        let resolved: any[];

        if (this.active !== deactivate) {
            return;
        }

        this.active = !deactivate;

        if (deactivate) {
            this.previousRoute = this.routerOutlet.activatedRoute;
            this.routerOutlet.deactivate();
        } else if (this.previousRoute) {
            resolved = [
                {
                    provide: ActivatedRoute,
                    useValue: this.previousRoute
                },
                {
                    provide: RouterOutletMap,
                    useValue: this.routerOutlet.outletMap
                }
            ];
            this.routerOutlet.activate(this.previousRoute, (this.routerOutlet as any).resolver,
                this.routerOutlet.locationInjector, ReflectiveInjector.resolve(resolved),
                this.routerOutlet.outletMap);
        }
    }
}
