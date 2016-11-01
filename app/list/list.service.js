define(['exports',
        '../mock/lists.mock'],
    function (exports, mockLists) {
        'use strict';

        function ListService() {
            this.listItems = mockLists.listItems;
        }

        ListService.prototype.getListItems = function (config) {
            //noinspection AmdModulesDependencies
            return Promise.resolve(this.listItems[config.type][config.locale]);
        };

        exports.ListService = ListService;
    });
