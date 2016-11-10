define(['exports', '@angular/core'], function (exports, ngCore) {
    'use strict';

    function ColumnsDirective() {
    }

    //noinspection JSUnusedGlobalSymbols
    ColumnsDirective.prototype.ngOnInit = function () {
        //noinspection JSUnresolvedVariable
        if (this.columns) {
            this.columnsCount = this.columns.columns;
        }
    };

    ColumnsDirective.annotations = [
        new ngCore.Directive({
            selector: '[columns]',
            inputs: ['columns'],
            host: {
                '[class.text]': 'true',
                '[class.column2]': 'columnsCount == 2',
                '[class.column3]': 'columnsCount == 3'
            }
        })
    ];

    exports.ColumnsDirective = ColumnsDirective;
});