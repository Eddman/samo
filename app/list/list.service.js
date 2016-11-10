define(['exports',
        '../mock/lists.mock'],
    function (exports, mockLists) {
        'use strict';

        function ListService() {
            this.listItems = mockLists.listItems;
        }

        ListService.prototype.getListItems = function (config) {
            //noinspection AmdModulesDependencies
            var listItemsTree = this.listItems;
            Object.keys(config.type).forEach(function (i) {
                listItemsTree = listItemsTree[config.type[i]];
            });
            //noinspection AmdModulesDependencies
            return Promise.resolve(listItemsTree);
        };

        exports.ListService = ListService;
    });
