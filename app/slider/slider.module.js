define(['exports',
        '@angular/core',
        '@angular/platform-browser',
        'index',
        './slider.component',
        './slider.service'],
    function (exports, ngCore, ngBrowser, ngSlider, sliderComponent, sliderService) {
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
                ],
                providers: [
                    sliderService.SliderService
                ]
            })
        ];

        exports.SliderModule = SliderModule;
    });
