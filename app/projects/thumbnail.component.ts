import {Component, Output, Input, ElementRef, EventEmitter, AnimationTransitionEvent} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import {Project} from './project';
import {AuthService} from '../auth/auth.service';
import {RoutingService} from '../routing/routing.service';

import {AbstractComponent} from '../abstract.component';

const loadedState: string = 'loaded';
export const removedState: string = 'removed';

@Component({
    moduleId   : module.id,
    selector   : 'thumbnail',
    templateUrl: 'thumbnail.component.html',
    styleUrls  : ['thumbnail.component.css'],
    host       : {
        '[class.hover]': 'hover && thumbnail.state !== "' + removedState + '"'
    },
    animations : [
        trigger('state', [
            state('*', style({
                opacity  : 0,
                transform: 'scale(0)'
            })),
            state(loadedState, style({
                opacity  : 1,
                transform: 'scale(1)'
            })),
            transition('* => ' + loadedState, animate('300ms ease')),
            transition(loadedState + ' => ' + removedState, [
                animate(600, keyframes([
                    style({
                        opacity  : 1,
                        transform: 'scale(1.1)',
                        offset   : 0.2
                    }),
                    style({
                        opacity  : 1,
                        transform: 'scale(1.1) rotate(3deg)',
                        offset   : 0.2
                    }),
                    style({
                        opacity  : 1,
                        transform: 'scale(1.1) rotate(-3deg)',
                        offset   : 0.35
                    }),
                    style({
                        opacity  : 1,
                        transform: 'scale(1.1) rotate(3deg)',
                        offset   : 0.5
                    }),
                    style({
                        opacity  : 1,
                        transform: 'scale(1.1) rotate(-3deg)',
                        offset   : 0.65
                    }),
                    style({
                        opacity  : 0,
                        transform: 'scale(0) rotate(0)',
                        offset   : 1
                    })
                ]))
            ])
        ])
    ]
})
export class ThumbnailComponent extends AbstractComponent {

    @Input()
    public thumbnail: Project;

    @Input()
    @Input()
    public isEdit: boolean;

    @Output()
    public removeChange: EventEmitter<Project>;

    @Output()
    public removedChange: EventEmitter<Project>;

    public hover: boolean;

    constructor(metaService: Meta,
        authService: AuthService,
        routingService: RoutingService,
        router: Router,
        activeRoute: ActivatedRoute,
        el: ElementRef) {
        super(metaService, authService, routingService, router, activeRoute, el);
        this.hover = false;
        this.removeChange = new EventEmitter();
        this.removedChange = new EventEmitter();
    }

    navigate() {
        if (this.hover && !this.isEdit) {
            this.router.navigate([this.thumbnail.parameter], {relativeTo: this.activeRoute});
        }
    }

    setHover() {
        setTimeout(() => {
            this.hover = true;
        }, 100);
        return false;
    }

    unsetHover() {
        setTimeout(() => {
            this.hover = false;
        }, 100);
        return false;
    }

    remove() {
        this.removeChange.emit(this.thumbnail);
    }

    removed(event: AnimationTransitionEvent) {
        if (event.toState === removedState) {
            this.removedChange.emit(this.thumbnail);
        }
    }
}
