define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/router',
        '@angular/forms',
        './admin.component',
        './menu-tree.component',
        './detail.component',
        './group.component',
        './list.component',
        './project.component',
        './slider.component'],
    function (exports, ngCore, ngBrowser, ngRouter, ngForms, adminComponent, menuTree,
              detail, group, list, project, slider) {
        'use strict';

        function AdminModule() {
        }

        AdminModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngForms.FormsModule,
                    ngRouter.RouterModule.forChild([
                        {
                            path: 'admin',
                            component: adminComponent.AdminComponent
                        },
                        {
                            path: 'admin/detail/:lang',
                            component: detail.DetailComponent
                        },
                        {
                            path: 'admin/group/:lang',
                            component: group.GroupComponent
                        },
                        {
                            path: 'admin/list/:lang',
                            component: list.ListComponent
                        },
                        {
                            path: 'admin/projects/:lang',
                            component: project.ProjectsComponent
                        },
                        {
                            path: 'admin/slider/:lang',
                            component: slider.SliderComponent
                        }
                    ])
                ],
                exports: [ngRouter.RouterModule],
                declarations: [
                    adminComponent.AdminComponent,
                    menuTree.MenuTreeComponent,
                    detail.DetailComponent,
                    group.GroupComponent,
                    list.ListComponent,
                    project.ProjectsComponent,
                    slider.SliderComponent
                ]
            })
        ];

        exports.AdminModule = AdminModule;
    });
