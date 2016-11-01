define(['exports', '@angular/core'], function (exports, ngCore) {
    'use strict';

    function ImageDirective() {
    }

    //noinspection JSUnusedGlobalSymbols
    ImageDirective.prototype.ngOnInit = function () {
        //noinspection JSUnresolvedVariable
        if (this.img) {
            this.floatLeft = false;
            this.floatRight = false;
            if (this.img.float) {
                //noinspection SwitchStatementWithNoDefaultBranchJS
                switch (this.img.float) {
                    case 'left':
                        this.floatLeft = true;
                        break;
                    case 'right':
                        this.floatRight = true;
                        break;
                }
            }
            this.url = this.img.url;
            this.title = this.img.title;
            this.width = this.img.width;
        }
    };

    ImageDirective.annotations = [
        new ngCore.Directive({
            selector: '[img]',
            inputs: ['img'],
            host: {
                '[class.floatLeft]': 'floatLeft',
                '[class.floatRight]': 'floatRight',
                '[title]': 'title',
                '[src]': 'url',
                '[style.width]': 'width'
            }
        })
    ];

    exports.ImageDirective = ImageDirective;
});