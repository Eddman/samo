define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        '@angular/common',
        './hero.service'],
    function (module, exports, ngCore, ngRouter, ngCommon, heroService) {
        function HeroDetailComponent(heroService, route, location) {
            this.heroService = heroService;
            this.route = route;
            this.location = location;
        }

        HeroDetailComponent.prototype.ngOnInit = function () {
            var self = this;
            this.route.params.forEach(
                function (params) {
                    var id = +params['id'];
                    self.heroService.getHero(id).then(
                        function (hero) {
                            self.hero = hero;
                        });
                });
        };

        HeroDetailComponent.prototype.goBack = function () {
            this.location.back();
        };

        HeroDetailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'my-hero-detail',
                templateUrl: 'hero-detail.component.html'
            })
        ];
        HeroDetailComponent.parameters = [[new ngCore.Inject(heroService.HeroService)],
            [ngRouter.ActivatedRoute], [ngCommon.Location]];

        exports.HeroDetailComponent = HeroDetailComponent;
    }
);
