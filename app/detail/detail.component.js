define(['module',
        'exports',
        '@angular/core',
        './detail.service'],
    function (module, exports, ngCore, detailService) {
        'use strict';

        function DetailComponent(detailService) {
            this.detailService = detailService;
            this.headerChange = new ngCore.EventEmitter();
        }

        //noinspection JSUnusedGlobalSymbols
        DetailComponent.prototype.ngOnInit = function () {
            this.detailService.getDetail({
                type: this.route.configuration.type,
                parameters: this.route.parameters
            }).then(function (detail) {
                this.detail = detail;
                this.headerChange.emit(this.detail.header);
            }.bind(this));
        };

        DetailComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'detail-view',
                templateUrl: 'detail.component.html',
                styleUrls: ['detail.component.css'],
                inputs: ['route'],
                outputs: ['headerChange']
            })
        ];

        DetailComponent.parameters = [[detailService.DetailService]];

        exports.DetailComponent = DetailComponent;
    });