import {ViewChild, Component, EventEmitter, Output, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Modal} from 'ng2-modal/Modal';
import {MetaService} from 'ng2-meta/src';

import {AuthService} from '../../auth/auth.service';
import {AbstractComponent} from '../../abstract.component';
import {RoutingService} from '../../routing/routing.service';

@Component({
    moduleId: module.id,
    selector: 'modal-confirm',
    templateUrl: 'modal.confirmation.component.html'
})
export class ModalConfirmationComponent extends AbstractComponent {

    @Output()
    public yes: EventEmitter<any>;

    @Output()
    public no: EventEmitter<any>;

    @ViewChild(Modal)
    public modal: Modal;

    constructor(metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
        this.yes = new EventEmitter<any>();
        this.no = new EventEmitter<any>();
    }

    public open() {
        this.modal.open();
    }

    public yesClick() {
        this.yes.emit();
        this.modal.close();
    }

    public noClick() {
        this.no.emit();
        this.modal.close();
    }
}
