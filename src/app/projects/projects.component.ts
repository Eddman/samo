import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError, first, map, shareReplay, takeUntil} from 'rxjs/operators';
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

    constructor(private projectService: ProjectsService,
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
        // Load projects
        this._projects = this.projectService.getProject(this.route.configuration.type).pipe(
            first(),
            takeUntil(this.destroyed),
            // Process if OK
            map((projects) => this.processProjects(projects)),
            shareReplay({
                bufferSize: 1,
                refCount  : true
            }),
            // Display error if there is some problem
            catchError((err: ErrorResponse) => {
                this.error = err.message;
                return of([]);
            })
        );

        this.changeDetectorRef.markForCheck();
    }

    public get projects(): Observable<Project[]> | undefined {
        return this._projects;
    }

    private processProjects(projects: Project[]): Project[] {
        // Remove SEO information from the screen
        this.setSEODescription();
        this.setSEOImage();

        // Setup new SEO image.
        if (this.route != null && projects != null && projects.length) {
            if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
            } else {
                this.setSEOImage(projects[0].thumbUrl);
            }
        }

        // Copy projects array
        return JSON.parse(JSON.stringify(projects));
    }
}
