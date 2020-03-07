import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {AbstractComponent} from './abstract.component';
import {RoutingService} from './routing/routing.service';

@Component({
    // tslint:disable:component-selector
    selector           : 'samuel-netocny',
    // tslint:enable
    templateUrl        : 'app.component.html',
    styleUrls          : [
        'app.component.scss'
    ],
    host               : {
        '[class.samuel-netocny]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class AppComponent extends AbstractComponent {

    constructor(metaService: Meta,
                routingService: RoutingService) {
        super(metaService, routingService);
    }
}
