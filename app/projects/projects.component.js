define(['module',
        'exports',
        '@angular/core',
        '../abstract.component',
        './projects.service',
        '@dragula/components/dragula.provider'],
    function (module, exports, ngCore, abstractComponent, projectService, dragulaService) {
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
                this.loadProjects();
            },
            loadProjects: function () {
                this.projectService.getProject({
                    type: this.route.configuration.type
                }).then(this.processProjects.bind(this));
            },
            processProjects: function (projects) {
                Object.keys(projects).forEach(function (i) {
                    projects[i].index = +i;
                });

                this.setSEODescription();
                this.setSEOImage();

                if (projects) {
                    if (this.route.parameters && this.route.parameters.length && projects[this.route.parameters[0]]) {
                        this.setSEOImage(projects[this.route.parameters[0] - 1].thumbUrl);
                    } else {
                        this.setSEOImage(projects[0].thumbUrl);
                    }
                }
                this.projects = [].concat(projects);
            },
            edit: function () {
                var i;
                for (i = 0; i < this.el.childNodes.length; i++) {
                    if (this.el.childNodes[i].className == "grid") {
                        this.bagEl = this.el.childNodes[i];
                        break;
                    }
                }
                this.jigglePaused = false;
                this.isEdit = true;
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
                this.dragulaService.find(dragAndDropBag).drake.models = [this.projects];
            },
            confirmSave: function (saveConfirmation) {
                this.jigglePaused = true;
                saveConfirmation.open();
            },
            save: function (modalLogin) {
                this.isEdit = false;
                if (this.dragulaService.find(dragAndDropBag)) {
                    this.dragulaService.destroy(dragAndDropBag);
                }
                this.projectService.saveProjects({
                    type: this.route.configuration.type
                }, this.projects)
                    .then(this.processProjects.bind(this))
                    .catch(function (err) {
                        var loginSubscription, cancelSubscription;
                        if (err === 401) {
                            loginSubscription = modalLogin.login.subscribe(function () {
                                loginSubscription.unsubscribe();
                                cancelSubscription.unsubscribe();
                                this.save(modalLogin); //Restart
                            }.bind(this));
                            cancelSubscription = modalLogin.cancel.subscribe(function () {
                                loginSubscription.unsubscribe();
                                cancelSubscription.unsubscribe();
                                this.loadProjects(); //Reset
                            }.bind(this));
                            modalLogin.open();
                        }
                    }.bind(this));
            },
            confirmCancel: function (cancelConfirmation) {
                this.jigglePaused = true;
                cancelConfirmation.open();
            },
            cancel: function () {
                this.isEdit = false;
                this.dragulaService.destroy(dragAndDropBag);
                this.loadProjects();
            },
            confirmDelete: function (deleteConfirmation, project) {
                this.jigglePaused = true;
                this.projectToDelete = project;
                deleteConfirmation.open();
            },
            delete: function () {
                this.jigglePaused = false;
                this.projects.splice(this.projects.indexOf(this.projectToDelete), 1);
            },
            addNewProject: function () {
                this.projects.push({});
            }
        }, [
            projectService.ProjectsService,
            dragulaService.DragulaService,
            ngCore.ElementRef
        ]);

        exports.ProjectsComponent = abstractComponent.component(ProjectsComponent, module, 'projects-view', 'projects.component');
    });
