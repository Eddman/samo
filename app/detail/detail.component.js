define(['module',
        'exports',
        '@angular/core',
        './detail.service'],
    function (module, exports, ngCore, detailService) {
        'use strict';

        function DetailComponent(detailService) {
            this.detailService = detailService;
        }

        //noinspection JSUnusedGlobalSymbols
        DetailComponent.prototype.ngOnChanges = function () {
            this.detailService.getDetail({
                locale: this.route.locale,
                type: this.route.configuration.type,
                parameters: this.route.parameters
            }).then(function (detail) {
                this.detail = detail;
            }.bind(this));
        };

        DetailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'detail-view',
                templateUrl: 'detail.component.html',
                inputs: ['route']
            })
        ];

        DetailComponent.parameters = [[detailService.DetailService]];

        exports.DetailComponent = DetailComponent;
    });