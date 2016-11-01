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
                '[class.columns]': 'true',
                '[style.columnCount]': 'columnsCount'
            }
        })
    ];

    exports.ColumnsDirective = ColumnsDirective;
});