define(['module', 'exports', '@angular/core', './content'], function (module, exports, ngCore, content) {
    function ContentComponent() {
        this.contentParts = undefined;
        this.types = content.contentPartsTypes;
    }

    ContentComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'content',
            templateUrl: 'content.component.html',
            styleUrls: ['content.component.css'],
            inputs: ['contentParts']
        })
    ];

    exports.ContentComponent = ContentComponent;
});