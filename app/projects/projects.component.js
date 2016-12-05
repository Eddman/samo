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

        function ProjectsComponent(projectService, dragulaService) {
            abstractComponent.AbstractComponent.apply(this, Array.prototype.slice.call(arguments, 2));
            this.projectService = projectService;
            this.dragulaService = dragulaService;
            this.jigglePaused = false;
        }

        abstractComponent.inherit(ProjectsComponent, {
            ngOnChanges: function () {
                // Load initial projects list
                this.loadProjects();
            },
            ngOnDestroy: function () {
                // Enable edit
                this.stopEdit();
            },
            stopEdit: function () {
                // Destroy dragula
                if (this.dragulaService.find(dragAndDropBag)) {
                    this.dragulaService.destroy(dragAndDropBag);
                }

                // Call super
                abstractComponent.AbstractComponent.prototype.stopEdit.apply(this);
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
                this.startEdit();

                // Get the bag element
                this.bagEl = Array.prototype.slice.call(this.el.childNodes).find(function (child) {
                    return child.className === "grid";
                });

                // Destroy previous dragula
                if (this.dragulaService.find(dragAndDropBag)) {
                    this.dragulaService.destroy(dragAndDropBag);
                }

                // Setup dragula for the bag above
                this.dragulaService.setOptions(dragAndDropBag, {
                    containers: [this.bagEl],
                    revertOnSpill: true,
                    direction: 'horizontal',
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
                var projects = this.projects;

                // Remove so they will be not visible until saved
                this.processProjects([]);

                // Save projects
                this.projectService.saveProjects({
                    type: this.route.configuration.type
                }, projects)
                // On save refresh
                    .then(function (projects) {
                        // Disable edit mode
                        this.stopEdit();

                        // Reload
                        this.processProjects(projects);
                    }.bind(this))
                    // On error
                    .catch(function (err) {
                        // Restore projects
                        this.processProjects(projects);

                        // Process error
                        this.onHttpError(err, this.save, this.edit, this.loadProjects);
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
                this.stopEdit();

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
            startDelete: function () {
                this.projectToDelete.state = 'removed';
            },
            delete: function () {
                // Unpause Jiggle effect
                this.unpauseJiggle();

                // Remove the selected project
                this.projects.splice(this.projects.indexOf(this.projectToDelete), 1);
            },
            addNewProject: function () {
                // Add empty object
                this.projects.push({
                    parameter: (1 + Math.random()) * 0x10000
                });
            }
        }, [
            projectService.ProjectsService,
            dragulaService.DragulaService
        ]);

        abstractComponent.viewComponent(ProjectsComponent, module, 'projects-view', 'projects.component');

        // Queries for modal popups
        exports.ProjectsComponent = abstractComponent.addQueries(ProjectsComponent, {
            'loginModal': new ngCore.ViewChild(loginModal.ModalLoginComponent),
            'deleteConfirmation': new ngCore.ViewChild('deleteConfirmation'),
            'saveConfirmation': new ngCore.ViewChild('saveConfirmation'),
            'cancelConfirmation': new ngCore.ViewChild('cancelConfirmation')
        });
    });
