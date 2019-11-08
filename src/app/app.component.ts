import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {RouterOutlet, ActivatedRoute, Router} from '@angular/router';
import {Meta} from '@angular/platform-browser';

import {AbstractComponent} from './abstract.component';
import {AuthService} from './auth/auth.service';
import {RoutingService} from './routing/routing.service';

@Component({
    moduleId   : module.id,
    selector   : 'samuel-netocny',
    templateUrl: 'app.component.html',
    styleUrls  : ['app.component.css']
})
export class AppComponent extends AbstractComponent implements OnInit {

    @ViewChild(RouterOutlet)
    public routerOutlet: RouterOutlet;

    private previousRoute: ActivatedRoute;

    private active: boolean;

    constructor(metaService: Meta,
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
        if (this.active !== deactivate) {
            return;
        }

        this.active = !deactivate;

        if (deactivate) {
            this.previousRoute = this.routerOutlet.activatedRoute;
            this.routerOutlet.deactivate();
        } else if (this.previousRoute) {
            this.routerOutlet.activateWith(this.previousRoute, null);
        }
    }
}
