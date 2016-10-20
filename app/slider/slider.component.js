define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function SliderComponent() {
    }

    SliderComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            templateUrl: 'slider.component.html',
            styleUrls: ['slider.component.css']
        })
    ];

    exports.SliderComponent = SliderComponent;
});
