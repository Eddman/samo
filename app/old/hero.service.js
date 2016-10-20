define(['exports',
        './mock-heros'],
    function (exports, heros) {
        function HeroService() {
        };

        HeroService.prototype.getHeroes = function () {
            return Promise.resolve(heros.HEROES);
        };

        HeroService.prototype.getHero = function (id) {
            return this.getHeroes()
                .then(function (heroes) {
                    return heroes.find(function (hero) {
                            return hero.id === id;
                        }
                    )
                });
        };

        HeroService.prototype.getSelectedHero = function () {
            return this.selectedHero;
        };

        HeroService.prototype.setSelectedHero = function (hero) {
            this.selectedHero = hero;
        };

        exports.HeroService = HeroService;
    }
);
