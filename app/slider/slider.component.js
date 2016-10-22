define(['module', 'exports', '@angular/core'], function (module, exports, ngCore) {
    function SliderComponent() {
    }

    SliderComponent.annotations = [
        new ngCore.Component({
            moduleId: module.id,
            selector: 'slider-view',
            templateUrl: 'slider.component.html',
            styleUrls: ['slider.component.css'],
            inputs: ['route']
        })
    ];

    exports.SliderComponent = SliderComponent;
});