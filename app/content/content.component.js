define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function ContentComponent() {
        this.contentPart = undefined;
    }

    ContentComponent.prototype.isString = function () {
        return typeof this.contentPart === 'string';
    };

    ContentComponent.prototype.isColumnsText = function () {
        if(typeof this.contentPart === 'object') {
            return this.contentPart.columns;
        }
        return false;
    };

    ContentComponent.prototype.isExternalLink = function () {
        if(typeof this.contentPart === 'object') {
            return this.contentPart.url;
        }
        return false;
    };

    ContentComponent.prototype.isInternalLink = function () {
        if(typeof this.contentPart === 'object') {
            return this.contentPart.routeLink;
        }
        return false;
    };

    ContentComponent.prototype.isImage = function () {
        if(typeof this.contentPart === 'object') {
            return this.contentPart.imageSrc;
        }
        return false;
    };

    ContentComponent.prototype.isLineBreak = function () {
        if(typeof this.contentPart === 'object') {
            return this.contentPart.lineBreak;
        }
        return false;
    };

    ContentComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'content-part',
            templateUrl: 'content.component.html',
            styleUrls: ['content.component.css'],
            inputs: ['contentPart']
        })
    ];

    exports.ContentComponent = ContentComponent;
});