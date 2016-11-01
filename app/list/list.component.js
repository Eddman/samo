define(['module', 'exports',
        '@angular/core',
        './list.service'],
    function (module, exports, ngCore, listService) {
        'use strict';

        function ListComponent(listService) {
            this.listService = listService;
        }

        //noinspection JSUnusedGlobalSymbols
        ListComponent.prototype.ngOnChanges = function () {
            this.listService.getListItems({
                locale: this.route.locale,
                type: this.route.configuration.type
            }).then(function (listItems) {
                this.listItems = listItems;
            }.bind(this));
        };

        ListComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'list-view',
                templateUrl: 'list.component.html',
                inputs: ['route']
            })
        ];

        ListComponent.parameters = [
            listService.ListService
        ];

        exports.ListComponent = ListComponent;
    });
