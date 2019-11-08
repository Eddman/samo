import {EventEmitter, Input, Output} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {AbstractComponent} from './abstract.component';
import {ViewHeader} from './detail/detail';
import {Route} from './routing/route';
import {RoutingService} from './routing/routing.service';

export abstract class AbstractViewComponent extends AbstractComponent {

    @Output()
    public headerChange = new EventEmitter<ViewHeader>();

    @Input()
    public route: Route | undefined;

    constructor(metaService: Meta,
                routingService: RoutingService) {
        super(metaService, routingService);
    }
}
