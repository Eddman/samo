import {ElementRef, Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";

import {MetaService} from 'ng2-meta';

import {AbstractComponent} from "../abstract.component";
import {AuthService} from "../auth/auth.service";
import {RoutingService} from "./routing.service";

import {Route} from "./route";
import {ViewHeader} from "../detail/detail";

@Component({
    moduleId: module.id,
    selector: 'router',
    templateUrl: 'router.component.html',
    styleUrls: ['router.component.css']
})
export class RouterComponent extends AbstractComponent implements OnInit {

    public config: Route;

    constructor(metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                activeRoute: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, activeRoute, el);
    }

    public ngOnInit(): void {
        this.activeRoute.params.forEach(this.processRoute.bind(this));
    }

    processRoute(pathParams: string[]) {
        let params: string[] = [];
        Object.keys(pathParams).forEach(function (p) {
            params.push(pathParams[p]);
        });
        this.routingService.getRouteConfig(params).then(
            (route) => {
                this.config = route;
                this.routingService.selectedRoute = route;
                this.routingService.selectedRoutePathParams = params;

                if (route.redirectPath) {
                    this.router.navigate([route.redirectPath], {relativeTo: this.activeRoute});
                }
            },
            () => {
                this.router.navigate(['/']);
            }
        );
    }

    processHeader(header: ViewHeader) {
        this.config.additionalHeader = header;
    }
}
