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
import {Observable} from 'rxjs';
import {first, map, takeUntil} from 'rxjs/operators';
import {AbstractViewComponent} from '../abstract.view.component';
import {RoutingService} from '../routing/routing.service';
import {SliderConfiguration, SliderImage} from './slider.configuration';
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

    public pages: Observable<SliderImage[]> | undefined;

    private pageNumber: number = 0;
    private pageCount: number = 0;

    private defaultDuration: number | undefined;
    private transitionDuration: number | undefined;

    /**
     * Autoslide interval handle
     */
    private interval: number | undefined;
    private autoSlide: number | undefined;

    constructor(private readonly sliderService: SliderService,
                metaService: Meta,
                routingService: RoutingService,
                private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // Pause previous sliding
        this.startAutoSlide(false);

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
                this.pageNumber = 0;
                this.pageCount = slides.images.length;

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

                this.defaultDuration = slides.duration;

                // Check if auto-slide is available
                if (slides.autoSlide) {
                    this.autoSlide = slides.autoSlide;
                }

                // Start sliding
                if (this.autoSlide) {
                    this.startAutoSlide(true);
                } else {
                    this.startAutoSlide(false);
                }

                // Change detection
                this.changeDetectorRef.markForCheck();

                return slides.images;
            })
        );

        // Change detection
        this.changeDetectorRef.markForCheck();
    }

    private autoSlideFunction(): void {
        if (this.pageNumber < this.pageCount - 1) {
            // Move one slide forward
            this.pageNumber += 1;
        } else {
            // Move to front
            this.moveToFirst();
        }
    }

    private moveToFirst(): void {
        if (this.interval) {
            // Pause sliding
            this.startAutoSlide(false);

            // Speedup transitions
            this.transitionDuration = this.transitionDuration || 0;
            this.transitionDuration /= 10;

            setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
        } else {
            this.pageNumber -= 1;
            if (this.pageNumber === 0) {
                // Restart auto-slide
                this.startAutoSlide();
            } else {
                setTimeout(this.moveToFirst.bind(this), (this.transitionDuration || 0) * 1.5);
            }
        }
    }

    private startAutoSlide(sliding?: boolean): void {
        if (this.autoSlide) {
            if (arguments.length === 0 || sliding) {
                this.transitionDuration = this.defaultDuration || 500;
                this.interval = setInterval(this.autoSlideFunction.bind(this),
                    this.autoSlide + this.transitionDuration);
            } else {
                clearInterval(this.interval);
                delete this.interval;
            }
        } else {
            this.transitionDuration = this.defaultDuration || 500;
        }
    }

    public ngOnDestroy(): void {
        // Pause sliding
        this.startAutoSlide(false);
    }
}
