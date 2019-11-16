import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first, shareReplay, takeUntil, tap} from 'rxjs/operators';
import {ErrorResponse} from '../abstract.http.service';
import {AbstractViewComponent} from '../abstract.view.component';
import {RoutingService} from '../routing/routing.service';
import {Project} from './project';
import {ProjectsService} from './projects.service';

@Component({
    selector           : 'sn-projects-view',
    templateUrl        : 'projects.component.html',
    styleUrls          : [
        'projects.component.scss'
    ],
    host               : {
        '[class.sn-projects-view]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class ProjectsComponent extends AbstractViewComponent implements OnChanges {

    private _projects: Observable<Project[]> | undefined;

    public constructor(private readonly projectService: ProjectsService,
                       metaService: Meta,
                       routingService: RoutingService,
                       private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnChanges(): void {
        if (this.route == null) {
            this._projects = undefined;
            this.changeDetectorRef.markForCheck();
            return;
        }

        this._projects = this.projectService.getProject(this.route.configuration.type).pipe(
            first(),
            takeUntil(this.destroyed),
            tap((projects: Project[]) => {
                this.setSEODescription();
                this.setSEOImage();

                if (this.route != null && projects != null && projects.length) {
                    if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                        this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
                    } else {
                        this.setSEOImage(projects[0].thumbUrl);
                    }
                }
            }),
            shareReplay({
                bufferSize: 1,
                refCount  : true
            }),
            // Display error if there is some problem
            catchError((err: ErrorResponse) => {
                this.error = err.message;
                this.changeDetectorRef.markForCheck();
                return EMPTY;
            })
        );

        this.changeDetectorRef.markForCheck();
    }

    public get projects(): Observable<Project[]> | undefined {
        return this._projects;
    }
}
