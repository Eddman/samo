define(['module',
        'exports',
        '@angular/core',
        '@angular/meta/index',
        './detail.service'],
    function (module, exports, ngCore, ngMeta, detailService) {
        'use strict';

        function DetailComponent(detailService, metaService) {
            this.detailService = detailService;
            this.metaService = metaService;
            this.headerChange = new ngCore.EventEmitter();
        }

        //noinspection JSUnusedGlobalSymbols
        DetailComponent.prototype.ngOnChanges = function () {
            this.detailService.getDetail({
                type: this.route.configuration.type,
                parameters: this.route.parameters
            }).then(function (detail) {
                this.detail = detail;
                if (detail) {
                    if (detail.title) {
                        this.metaService.setTag('description', detail.title);
                    }
                    if (detail.header) {
                        this.metaService.setTag('description', detail.header.pageTitle + '\n' + detail.header.content);
                    }

                    this.headerChange.emit(this.detail.header);
                }
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

        DetailComponent.parameters = [detailService.DetailService, ngMeta.MetaService];

        exports.DetailComponent = DetailComponent;
    });