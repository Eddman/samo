define(['module',
        'exports',
        '../abstract.component',
        './detail.service'],
    function (module, exports, abstractComponent, detailService) {
        'use strict';

        function DetailComponent(metaService, authService, detailService) {
            abstractComponent.AbstractComponent.apply(this, arguments);
            this.detailService = detailService;
        }

        abstractComponent.inherit(DetailComponent, {
            ngOnChanges: function () {
                this.detailService.getDetail({
                    type: this.route.configuration.type,
                    parameters: this.route.parameters
                }).then(function (detail) {
                    var desc;
                    this.detail = detail;

                    this.setSEODescription();
                    this.setSEOImage();

                    if (detail) {
                        if (detail.title) {
                            desc = detail.title;
                        }
                        if (detail.header) {
                            if (desc) {
                                desc += ", ";
                            } else {
                                desc = '';
                            }
                            desc += detail.header.pageTitle;
                            desc += ", ";
                            desc += detail.header.content.replace(new RegExp('\n', 'g'), ', ');
                        }

                        if (this.detail.content) {
                            desc = this.getDescriptionFromContent(desc, this.detail.content);
                        }

                        this.setSEODescription(desc);
                        this.setSEOImage(this.getFirstImageFromContent(this.detail.content));
                        this.headerChange.emit(this.detail.header);
                    }
                }.bind(this));
            }
        }, [detailService.DetailService]);

        exports.DetailComponent = abstractComponent.component(DetailComponent, module, 'detail-view', 'detail.component');
    });