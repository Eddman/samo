define(['exports',
        '@angular/core',
        '../mock/lists.mock'],
    function (exports, ngCore, mockLists) {
        function ListService() {
            this.listItems = mockLists.listItems;
        }

        ListService.prototype.getListItems = function (config) {
            return Promise.resolve(this.listItems[config.type][config.locale]);
        };

        exports.ListService = ListService;
    });
