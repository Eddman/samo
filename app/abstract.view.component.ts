import {EventEmitter, ElementRef, Output, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MetaService} from '@meta/index';

import {AuthService} from './auth/auth.service';
import {RoutingService} from './routing/routing.service';
import {Route} from "./routing/route";

import {ModalLoginComponent} from './common/modal/modal.login.component';
import {AbstractComponent} from "./abstract.component";
import {ViewHeader} from "./detail/detail";

import {SubjectSubscription} from 'rxjs/SubjectSubscription';

export class AbstractViewComponent extends AbstractComponent {

    @Output()
    public headerChange: EventEmitter<ViewHeader>;

    @ViewChild(ModalLoginComponent)
    public loginModal: ModalLoginComponent;

    @Input()
    public route: Route;

    constructor(metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
        this.el = el.nativeElement;
        this.headerChange = new EventEmitter<ViewHeader>();
    }

    protected onHttpError(err: any, restartSave: Function, restartEdit: Function, resetForm: Function) {
        let loginSubscription: SubjectSubscription<any>, cancelSubscription: SubjectSubscription<any>;
        // 401 Unauthorized
        if (err === 401) {
            // Subscribe for login
            loginSubscription = this.loginModal.login.subscribe(() => {
                // Unsubscribe
                loginSubscription.unsubscribe();
                cancelSubscription.unsubscribe();

                // Restart save
                if (restartSave) {
                    restartSave.bind(this)();
                }
            });

            // Subscribe for cancel
            cancelSubscription = this.loginModal.cancel.subscribe(() => {
                // Unsubscribe
                loginSubscription.unsubscribe();
                cancelSubscription.unsubscribe();

                // Canceled - stop edit
                this.stopEdit();

                // Reset form
                if (resetForm) {
                    resetForm.bind(this)();
                }
            });

            // Open login popup
            this.loginModal.open();
        } else {
            // Show error
            this.error = err;

            // Restart edit mode
            if (restartEdit) {
                restartEdit.bind(this)();
            }
        }
    }
}