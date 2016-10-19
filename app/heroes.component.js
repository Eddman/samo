define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './hero.service'],
    function (module, exports, ngCore, ngRouter, heroService) {

        function HeroesComponent(router, heroService) {
            this.heroes = [];
            this.router = router;
            this.heroService = heroService;
        }

        HeroesComponent.prototype.ngOnInit = function () {
            var self = this;
            this.heroService.getHeroes()
                .then(function (heroes) {
                    self.heroes = heroes
                });
        };

        HeroesComponent.prototype.gotoDetail = function () {
            var link = ['/detail', this.heroService.getSelectedHero().id];
            this.router.navigate(link);
        };

        HeroesComponent.prototype.onSelect = function (hero) {
            this.heroService.setSelectedHero(hero);
        };

        HeroesComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'my-heroes',
                templateUrl: 'heroes.component.html',
                styleUrls: ['heroes.component.css']
            })
        ];
        HeroesComponent.parameters = [[new ngCore.Inject(ngRouter.Router)], [heroService.HeroService]];

        exports.HeroesComponent = HeroesComponent;
    }
);
