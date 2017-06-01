import {ViewChild, EventEmitter, Output, ElementRef, Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';

import {Modal} from '@herbis/ngx-modal';

import {ModalConfirmationComponent} from './modal.confirmation.component';

import {AuthService} from '../../auth/auth.service';
import {AbstractComponent} from '../../abstract.component';
import {RoutingService} from '../../routing/routing.service';

@Component({
    moduleId   : module.id,
    selector   : 'modal-login',
    templateUrl: 'modal.login.component.html'
})
export class ModalLoginComponent extends AbstractComponent {

    @Output()
    public login: EventEmitter<any>;

    @Output()
    public cancel: EventEmitter<any>;

    @ViewChild(Modal)
    public loginComponent: Modal;

    @ViewChild(ModalConfirmationComponent)
    public cancelConfirmation: ModalConfirmationComponent;

    public username: string;
    public password: string;

    public loggingIn: boolean;

    constructor(metaService: Meta,
        authService: AuthService,
        routingService: RoutingService,
        router: Router,
        route: ActivatedRoute,
        el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
        this.login = new EventEmitter<any>();
        this.cancel = new EventEmitter<any>();
    }

    public open() {
        this.loginComponent.open();
    }

    public loginClick() {
        this.loggingIn = true;
        delete this.error;
        this.authService.login({
            user    : this.username,
            password: this.password
        }).subscribe((success) => {
            if (success) {
                this.login.emit();
            }
            this.loggingIn = false;
        }, (err) => {
            this.error = err;
            this.loggingIn = false;
        });
    }

    public cancelClick() {
        this.loginComponent.close();
        this.cancelConfirmation.open();
    }

    public confirmCancelation() {
        this.cancel.emit();
    }
}
