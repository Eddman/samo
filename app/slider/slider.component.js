define(['module',
        'exports',
        '@angular/core',
        'src/components/render.component',
        'src/components/pageslider.component',
        'src/components/navbutton.component'],
    function (module, exports, ngCore, ngSliderRender, ngSliderComponent, ngSliderButtons) {
        function SliderComponent() {
        }

        SliderComponent.prototype.ngOnChanges = function() {
            this.pages = [
                {image: "black"},
                {image: "red"}
            ];
            this.pageNumber = 0;
            this.pageCount = this.pages.length;
        };

        SliderComponent.annotations = [
            new ngCore.Component({
                moduleId: module.id,
                selector: 'slider-view',
                directives: [
                    ngSliderRender.KBPagesRendererDirective,
                    ngSliderComponent.KBPageSliderComponent,
                    ngSliderButtons.KBNavButtonComponent],
                templateUrl: 'slider.component.html',
                styleUrls: ['slider.component.css'],
                inputs: ['route']
            })
        ];

        exports.SliderComponent = SliderComponent;
    });