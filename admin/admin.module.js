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
        './slider.component',
        './menu.service'],
    function (exports, ngCore, ngBrowser, ngRouter, ngForms, adminComponent, menuTree,
              detail, group, list, project, slider, menuService) {
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
                            path: 'admin/detail',
                            component: detail.DetailComponent
                        },
                        {
                            path: 'admin/group',
                            component: group.GroupComponent
                        },
                        {
                            path: 'admin/list',
                            component: list.ListComponent
                        },
                        {
                            path: 'admin/projects',
                            component: project.ProjectsComponent
                        },
                        {
                            path: 'admin/slider',
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
                ],
                providers: [
                    menuService.MenuService
                ]
            })
        ];

        exports.AdminModule = AdminModule;
    });
