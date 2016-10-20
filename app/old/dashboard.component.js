define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './hero.service'],
    function (module, exports, ngCore, ngRouter, heroService) {

        function DashboardComponent(router, heroService) {
            this.heroes = [];
            this.router = router;
            this.heroService = heroService;
        }

        DashboardComponent.prototype.ngOnInit = function () {
            var self = this;
            this.heroService.getHeroes()
                .then(function (heroes) {
                    self.heroes = heroes.slice(1, 5)
                });
        };

        DashboardComponent.prototype.gotoDetail = function (hero) {
            var link = ['/detail', hero.id];
            this.router.navigate(link);
        };


        DashboardComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'my-dashboard',
                templateUrl: 'dashboard.component.html',
                styleUrls: ['dashboard.component.css']
            })
        ];
        DashboardComponent.parameters = [[new ngCore.Inject(ngRouter.Router)], [heroService.HeroService]];

        exports.DashboardComponent = DashboardComponent;
    }
);

