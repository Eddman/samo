define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        'index',
        './slider.component'],
    function (exports, ngCore, ngBrowser, ngSlider, sliderComponent) {
        function SliderModule() {
        }

        SliderModule.annotations = [
            new ngCore.NgModule({
                imports: [
                    ngBrowser.BrowserModule,
                    ngSlider.PageSliderModule
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
