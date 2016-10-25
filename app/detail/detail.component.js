define(['module',
        'exports',
        '@angular/core',
        './detail.service'],
    function (module, exports, ngCore, detailService) {
        function DetailComponent(detailService) {
            this.detailService = detailService
        }

        //noinspection JSUnusedGlobalSymbols
        DetailComponent.prototype.ngOnInit = function () {
            this.detailService.getDetail({
                locale: this.route.locale,
                type: this.route.configuration.type
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