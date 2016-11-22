define(['module',
        'exports',
        '@angular/core',
        '../abstract.component',
        './projects.service',
        '@dragula/components/dragula.provider',
        '../common/modal/modal.login.component'],
    function (module, exports, ngCore, abstractComponent, projectService, dragulaService, loginModal) {
        'use strict';

        var dragAndDropBag = 'thumbnails-bag';

        function ProjectsComponent(metaService, authService, projectService, dragulaService, el) {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.projectService = projectService;
            this.dragulaService = dragulaService;
            this.isEdit = false;
            this.jigglePaused = false;
            this.el = el.nativeElement;
        }

        abstractComponent.inherit(ProjectsComponent, {
            ngOnChanges: function () {
                // Load initial projects list
                this.loadProjects();
            },
            loadProjects: function () {
                // Load projects
                this.projectService.getProject({
                    type: this.route.configuration.type
                })
                // Process if OK
                    .then(this.processProjects.bind(this))
                    // Display error if there is some problem
                    .catch(function (err) {
                        this.error = err;
                    }.bind(this));
            },
            processProjects: function (projects) {
                // Setup indexes
                Object.keys(projects).forEach(function (i) {
                    projects[i].index = +i;
                });

                // Remove SEO information from the screen
                this.setSEODescription();
                this.setSEOImage();

                // Setup new SEO image.
                if (projects) {
                    if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                        this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
                    } else {
                        this.setSEOImage(projects[0].thumbUrl);
                    }
                }

                // Copy projects array
                this.projects = [].concat(projects);
            },
            pauseJiggle: function () {
                this.jigglePaused = true;
            },
            unpauseJiggle: function () {
                this.jigglePaused = false;
            },
            edit: function () {
                // Unpause Jiggle effect
                this.unpauseJiggle();

                // Enable edit
                this.isEdit = true;

                // Get the bag element
                this.bagEl = this.el.childNodes.find(function (child) {
                    return child.className === "grid";
                });

                // Setup dragula for the bag above
                this.dragulaService.setOptions(dragAndDropBag, {
                    containers: [this.bagEl],
                    revertOnSpill: true,
                    moves: function (el) {
                        return el.tagName.toLowerCase() === 'thumbnail';
                    },
                    accepts: function (el, target, source, sibling) {
                        if (sibling && sibling.classList) {
                            return !sibling.classList.contains('thumbnail') || sibling.classList.contains('new_project');
                        }
                        return true;
                    }
                });

                // Setup models for dragula
                this.dragulaService.find(dragAndDropBag).drake.models = [this.projects];
            },
            confirmSave: function () {
                //Pause Jiggle effect
                this.pauseJiggle();

                // Open confirmation popup
                this.saveConfirmation.open();
            },
            save: function () {
                // Disable edit mode
                this.isEdit = false;

                // Destroy dragula
                if (this.dragulaService.find(dragAndDropBag)) {
                    this.dragulaService.destroy(dragAndDropBag);
                }

                // Save projects
                this.projectService.saveProjects({
                    type: this.route.configuration.type
                }, this.projects)
                // On save refresh
                    .then(this.processProjects.bind(this))
                    // On error
                    .catch(function (err) {
                        var loginSubscription, cancelSubscription;
                        // 401 Unauthorized
                        if (err === 401) {
                            // Subscribe for login
                            loginSubscription = this.loginModal.login.subscribe(function () {
                                // Unsubscribe
                                loginSubscription.unsubscribe();
                                cancelSubscription.unsubscribe();

                                // Restart save
                                this.save();
                            }.bind(this));

                            // Subscribe for cancel
                            cancelSubscription = this.loginModal.cancel.subscribe(function () {
                                // Unsubscribe
                                loginSubscription.unsubscribe();
                                cancelSubscription.unsubscribe();

                                // Reset form
                                this.loadProjects();
                            }.bind(this));

                            // Open login popup
                            this.loginModal.open();
                        } else {
                            // Show error
                            this.error = err;

                            // Restart edit mode
                            this.edit();
                        }
                    }.bind(this));
            },
            confirmCancel: function () {
                //Pause Jiggle effect
                this.pauseJiggle();

                // Open confirmation popup
                this.cancelConfirmation.open();
            },
            cancel: function () {
                // Disable edit mode
                this.isEdit = false;

                // Destroy dragula
                if (this.dragulaService.find(dragAndDropBag)) {
                    this.dragulaService.destroy(dragAndDropBag);
                }

                // Reload from service
                this.loadProjects();
            },
            confirmDelete: function (project) {
                // Pause Jiggle effect
                this.pauseJiggle();

                // Set project to be removed
                this.projectToDelete = project;

                // Open confirmation popup
                this.deleteConfirmation.open();
            },
            delete: function () {
                // Unpause Jiggle effect
                this.unpauseJiggle();

                // Remove the selected project
                this.projects.splice(this.projects.indexOf(this.projectToDelete), 1);
            },
            addNewProject: function () {
                // Add empty object
                this.projects.push({});
            }
        }, [
            projectService.ProjectsService,
            dragulaService.DragulaService,
            ngCore.ElementRef
        ]);

        exports.ProjectsComponent = abstractComponent.component(ProjectsComponent, module, 'projects-view', 'projects.component');

        // Queries for modal popups
        ProjectsComponent.annotations[0].queries = {
            'loginModal': new ngCore.ViewChild(loginModal.ModalLoginComponent),
            'deleteConfirmation': new ngCore.ViewChild('deleteConfirmation'),
            'saveConfirmation': new ngCore.ViewChild('saveConfirmation'),
            'cancelConfirmation': new ngCore.ViewChild('cancelConfirmation')
        };
    });
