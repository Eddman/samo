import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first, map, shareReplay, takeUntil} from 'rxjs/operators';
import {ErrorResponse} from '../abstract.http.service';
import {AbstractViewComponent} from '../abstract.view.component';
import {RoutingService} from '../routing/routing.service';
import {SliderConfiguration} from './slider.configuration';
import {SliderService} from './slider.service';

@Component({
    selector           : 'sn-slider-view',
    templateUrl        : 'slider.component.html',
    styleUrls          : [
        'slider.component.scss'
    ],
    host               : {
        '[class.sn-slider-view]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class SliderComponent extends AbstractViewComponent implements OnChanges, OnDestroy {

    @Input()
    public keysEnabled: boolean = true;

    public pages: Observable<string[]> | undefined;

    public autoSlide: number | undefined;

    constructor(private readonly sliderService: SliderService,
                metaService: Meta,
                routingService: RoutingService,
                private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.route == null) {
            this.pages = undefined;

            // Change detection
            this.changeDetectorRef.markForCheck();
            return;
        }

        this.pages = this.sliderService.getSlides(this.route.configuration.type).pipe(
            first(),
            takeUntil(this.destroyed),
            map((slides: SliderConfiguration) => {

                if (this.keysEnabled || slides.primary) {
                    if (!slides.primary) {
                        this.setSEODescription(slides.description);
                    }
                    if (slides && slides.images && slides.images.length) {
                        this.setSEOImage(slides.images[0].url);
                    } else {
                        this.setSEOImage();
                    }
                }

                // Check if auto-slide is available
                if (slides.autoSlide) {
                    this.autoSlide = slides.autoSlide;
                }

                // Change detection
                this.changeDetectorRef.markForCheck();

                return slides.images.map((img) => img.url);
            }),
            shareReplay({
                bufferSize: 1,
                refCount  : true
            }),
            // Display error if there is some problem
            catchError((err: ErrorResponse) => {
                this.error = err.message;
                this.changeDetectorRef.markForCheck();
                return EMPTY;
            })
        );

        // Change detection
        this.changeDetectorRef.markForCheck();
    }
}
