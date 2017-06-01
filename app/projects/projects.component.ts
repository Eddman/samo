import {
    ElementRef, ViewChild, OnChanges, OnDestroy, SimpleChanges, Component, Output, Input,
    EventEmitter
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta} from '@angular/platform-browser';

import {DragulaService} from 'ng2-dragula/components/dragula.provider';

import {RoutingService} from '../routing/routing.service';
import {AuthService} from '../auth/auth.service';

import {AbstractViewComponent} from '../abstract.view.component';
import {ModalLoginComponent} from '../common/modal/modal.login.component';
import {ModalConfirmationComponent} from '../common/modal/modal.confirmation.component';

import {ViewHeader} from '../detail/detail';
import {Route} from '../routing/route';
import {Project} from './project';

import {ProjectsService} from './projects.service';
import {removedState} from './thumbnail.component';

const dragAndDropBag = 'thumbnails-bag';

@Component({
    moduleId   : module.id,
    selector   : 'projects-view',
    templateUrl: 'projects.component.html',
    styleUrls  : ['projects.component.css']
})
export class ProjectsComponent extends AbstractViewComponent implements OnChanges, OnDestroy {

    @Output()
    public headerChange: EventEmitter<ViewHeader>;

    @Input()
    public route: Route;

    private jigglePaused: boolean;

    @ViewChild(ModalLoginComponent)
    public loginModal: ModalLoginComponent;

    @ViewChild('deleteConfirmation')
    public deleteConfirmation: ModalConfirmationComponent;

    @ViewChild('saveConfirmation')
    public saveConfirmation: ModalConfirmationComponent;

    @ViewChild('cancelConfirmation')
    public cancelConfirmation: ModalConfirmationComponent;

    private bagEl: Element;

    private projects: Project[];

    private projectToRemove: Project;

    constructor(private projectService: ProjectsService,
        private dragulaService: DragulaService,
        metaService: Meta,
        authService: AuthService,
        routingService: RoutingService,
        router: Router,
        route: ActivatedRoute,
        el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
        this.jigglePaused = false;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // Load initial projects list
        this.loadProjects();
    }

    public ngOnDestroy(): void {
        // Enable edit
        this.stopEdit();
    }

    stopEdit() {
        // Destroy dragula
        if (this.dragulaService.find(dragAndDropBag)) {
            this.dragulaService.destroy(dragAndDropBag);
        }

        // Call super
        super.stopEdit();
    }

    loadProjects() {
        // Load projects
        this.projectService.getProject(this.route.configuration.type)
        // Process if OK
            .then(this.processProjects.bind(this))
            // Display error if there is some problem
            .catch((err) => {
                this.error = err;
            });
    }

    processProjects(projects: Project[]) {
        // Remove SEO information from the screen
        this.setSEODescription();
        this.setSEOImage();

        // Setup new SEO image.
        if (projects && projects.length) {
            if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
            } else {
                this.setSEOImage(projects[0].thumbUrl);
            }
        }

        // Copy projects array
        this.projects = JSON.parse(JSON.stringify(projects));
    }

    pauseJiggle() {
        this.jigglePaused = true;
    }

    unpauseJiggle() {
        this.jigglePaused = false;
    }

    edit() {
        // Unpause Jiggle effect
        this.unpauseJiggle();

        // Enable edit
        this.startEdit();

        // Get the bag element
        this.bagEl = Array.prototype.slice.call(this.el.childNodes).find((child: Element) => {
            return child.className === 'grid';
        });

        // Destroy previous dragula
        if (this.dragulaService.find(dragAndDropBag)) {
            this.dragulaService.destroy(dragAndDropBag);
        }

        // Setup dragula for the bag above
        this.dragulaService.setOptions(dragAndDropBag, {
            containers   : [this.bagEl],
            revertOnSpill: true,
            direction    : 'horizontal',
            moves(el: Element) {
                return el.tagName.toLowerCase() === 'thumbnail';
            },
            accepts(el: Element, target: Element, source: Element, sibling: Element) {
                if (sibling && sibling.classList) {
                    return !sibling.classList.contains('thumbnail') || sibling.classList.contains('new_project');
                }
                return true;
            }
        });

        // Setup models for dragula
        this.dragulaService.find(dragAndDropBag).drake.models = [this.projects];
    }

    confirmSave() {
        //Pause Jiggle effect
        this.pauseJiggle();

        // Open confirmation popup
        this.saveConfirmation.open();
    }

    save() {
        let projects: Project[] = this.projects;

        // Remove so they will be not visible until saved
        this.processProjects([]);

        // Save projects
        this.projectService.saveProjects(this.route.configuration.type, projects)
        // On save refresh
            .then((projects: Project[]) => {
                // Disable edit mode
                this.stopEdit();

                // Reload
                this.processProjects(projects);
            })
            // On error
            .catch((err) => {
                // Restore projects
                this.processProjects(projects);

                // Process error
                this.onHttpError(err, this.save, this.edit, this.loadProjects);
            });
    }

    confirmCancel() {
        //Pause Jiggle effect
        this.pauseJiggle();

        // Open confirmation popup
        this.cancelConfirmation.open();
    }

    cancel() {
        // Disable edit mode
        this.stopEdit();

        // Reload from service
        this.loadProjects();
    }

    confirmRemove(project: Project) {
        // Pause Jiggle effect
        this.pauseJiggle();

        // Set project to be removed
        this.projectToRemove = project;

        // Open confirmation popup
        this.deleteConfirmation.open();
    }

    startRemove() {
        this.projectToRemove.state = removedState;
    }

    remove() {
        // Unpause Jiggle effect
        this.unpauseJiggle();

        // Remove the selected project
        this.projects.splice(this.projects.indexOf(this.projectToRemove), 1);
    }

    addNewProject() {
        // Add empty object
        this.projects.push({
            parameter: (1 + Math.random()) * 0x10000 + ''
        });
    }
}
