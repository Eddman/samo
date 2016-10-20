define(['module', 'exports',
        '@angular/core',
    '../locale.service'],
    function (module, exports, ngCore, localeService) {
        function MenuComponent(localeService) {
            this.localeService = localeService;
        }

        MenuComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'app-menu',
                templateUrl: 'menu.component.html',
                styleUrls: ['menu.component.css']
            })
        ];
        MenuComponent.parameters = [
            localeService.LocaleService
        ];

        exports.MenuComponent = MenuComponent;
    });
