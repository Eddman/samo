import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first, shareReplay, takeUntil, tap} from 'rxjs/operators';
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
export class SliderComponent extends AbstractViewComponent implements OnChanges {

    @Input()
    public keysEnabled: boolean = true;

    private _sliderConfiguration: Observable<SliderConfiguration> | undefined;

    constructor(private readonly sliderService: SliderService,
                metaService: Meta,
                routingService: RoutingService,
                private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnChanges(): void {
        if (this.route == null) {
            this._sliderConfiguration = undefined;
            this.changeDetectorRef.markForCheck();
            return;
        }

        this._sliderConfiguration = this.sliderService.getSlides(this.route.configuration.type).pipe(
            first(),
            takeUntil(this.destroyed),
            tap((slides: SliderConfiguration) => {
                if (this.keysEnabled || slides.primary) {
                    if (!slides.primary) {
                        this.setSEODescription(slides.description);
                    }
                    if (slides && slides.images && slides.images.length) {
                        this.setSEOImage(slides.images[0].imageURL);
                    } else {
                        this.setSEOImage();
                    }
                }
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

        this.changeDetectorRef.markForCheck();
    }

    public get sliderConfiguration(): Observable<SliderConfiguration> | undefined {
        return this._sliderConfiguration;
    }

// private moveToFirst(): void {
    //     if (this.interval) {
    //         // Pause sliding
    //         this.startAutoSlide(false);
    //
    //         // Speedup transitions
    //         this.transitionDuration = this.transitionDuration || 0;
    //         this.transitionDuration /= 10;
    //
    //         setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
    //     } else {
    //         this.pageNumber -= 1;
    //         if (this.pageNumber === 0) {
    //             // Restart auto-slide
    //             this.startAutoSlide();
    //         } else {
    //             setTimeout(this.moveToFirst.bind(this), (this.transitionDuration || 0) * 1.5);
    //         }
    //     }
    //     this.changeDetectorRef.markForCheck();
    // }
    //
    // private startAutoSlide(sliding?: boolean): void {
    //     if (this.autoSlide) {
    //         if (arguments.length === 0 || sliding) {
    //             this.transitionDuration = this.defaultDuration || 500;
    //             this.interval = setInterval(this.autoSlideFunction.bind(this),
    //                 this.autoSlide + this.transitionDuration);
    //         } else {
    //             clearInterval(this.interval);
    //             delete this.interval;
    //         }
    //     } else {
    //         this.transitionDuration = this.defaultDuration || 500;
    //     }
    //
    //     this.changeDetectorRef.markForCheck();
    // }
    //
    // public ngOnDestroy(): void {
    //     // Pause sliding
    //     this.startAutoSlide(false);
    // }
}
