define(['module',
        'exports',
        '../abstract.component',
        './list.service'],
    function (module, exports, abstractComponent, listService) {
        'use strict';

        function ListComponent(metaService, listService) {
            abstractComponent.AbstractComponent.call(this, metaService);
            this.listService = listService;
        }

        abstractComponent.inherit(ListComponent, {
            ngOnChanges: function () {
                this.listService.getListItems({
                    type: this.route.configuration.type
                }).then(function (listItems) {
                    this.listItems = listItems;
                }.bind(this));
            }
        }, [listService.ListService]);

        exports.ListComponent = abstractComponent.component(ListComponent, module, 'list-view', 'list.component');
    });
