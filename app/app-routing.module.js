define(['exports',
        '@angular/core',
        '@angular/router',
        './dashboard.component',
        './hero-detail.component',
        './heroes.component'],
    function (exports, ngCore, ngRouter, dashboard,
              heroDetail, heroesComponent) {

        var routes = [
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: dashboard.DashboardComponent},
            {path: 'detail/:id', component: heroDetail.HeroDetailComponent},
            {path: 'heroes', component: heroesComponent.HeroesComponent}
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
