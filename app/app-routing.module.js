define(['exports',
        '@angular/core',
        '@angular/router',
        './slider/slider.component',
        './projects/projects.component'],
    function (exports, ngCore, ngRouter, sliderComponent, projectsComponent) {

        var routes = [
            {path: '', component: sliderComponent.SliderComponent},
            {path: 'projects/:lang', component: projectsComponent.ProjectsComponent},
            {path: 'media/:lang', component: sliderComponent.SliderComponent},
            {path: 'cv/:lang', component: sliderComponent.SliderComponent},
            {path: 'contact/:lang', component: sliderComponent.SliderComponent}
        ];

        function AppRoutingModule() {
        }

        AppRoutingModule.annotations = [
            new ngCore.NgModule({
                imports: [ngRouter.RouterModule.forRoot(routes)],
                exports: [ngRouter.RouterModule]
            })
        ];

        exports.AppRoutingModule = AppRoutingModule;
        exports.routes = routes;
    }
);
