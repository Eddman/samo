define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function ImageDirective() {
    }

    ImageDirective.prototype.ngOnInit = function () {
        //noinspection JSUnresolvedVariable
        if(this.img) {
            this.floatLeft = false;
            this.floatRight = false;
            if (this.img.float) {
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
        }),
    ];

    exports.ImageDirective = ImageDirective;
});