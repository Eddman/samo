import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractComponent} from '../abstract.component';
import {RoutingService} from '../routing/routing.service';
import {Project} from './project';

const loadedState: string = 'loaded';

@Component({
    selector           : 'sn-thumbnail',
    templateUrl        : 'thumbnail.component.html',
    styleUrls          : [
        'thumbnail.component.scss'
    ],
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host               : {
        '[class.sn-thumbnail]': 'true',
        '[class.hover]'       : 'hover'
    },
    animations         : [
        trigger('state', [
            state('*', style({
                opacity  : 0,
                transform: 'scale(0)'
            })),
            state(loadedState, style({
                opacity  : 1,
                transform: 'scale(1)'
            })),
            transition('* => ' + loadedState, animate('300ms ease'))
        ])
    ]
})
export class ThumbnailComponent extends AbstractComponent {

    @Input()
    public thumbnail: Project | undefined;

    public hover: boolean;

    public constructor(metaService: Meta,
                       routingService: RoutingService,
                       private readonly router: Router,
                       private readonly activeRoute: ActivatedRoute,
                       private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
        this.hover = false;
    }

    public navigate() {
        if (this.thumbnail != null && this.hover) {
            this.router.navigate([this.thumbnail.parameter], {relativeTo: this.activeRoute});
        }
    }

    setHover() {
        setTimeout(() => {
            this.hover = true;
            this.changeDetectorRef.markForCheck();
        }, 100);
        return false;
    }

    unsetHover() {
        setTimeout(() => {
            this.hover = false;
            this.changeDetectorRef.markForCheck();
        }, 100);
        return false;
    }
}
