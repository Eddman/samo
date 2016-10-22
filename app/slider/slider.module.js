define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        './slider.component'],
    function (exports, ngCore, ngBrowser, sliderComponent) {
        function SliderModule() {
        }

        SliderModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule
                ],
                exports: [
                    sliderComponent.SliderComponent
                ],
                declarations: [
                    sliderComponent.SliderComponent
                ]
            })
        ];

        exports.SliderModule = SliderModule;
    });
