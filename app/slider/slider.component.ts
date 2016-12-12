import {Component, ElementRef, OnChanges, SimpleChanges, Input, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {MetaService} from '@meta/index';

import {RoutingService} from "../routing/routing.service";
import {AuthService} from "../auth/auth.service";

import {AbstractViewComponent} from "../abstract.view.component";

import {SliderService} from "./slider.service";
import {SliderConfiguration, SliderImage} from "./slider.configuration";

@Component({
    moduleId: module.id,
    selector: 'slider-view',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.css']
})
export class SliderComponent extends AbstractViewComponent implements OnChanges, OnDestroy {

    @Input()
    private keysEnabled: boolean;

    private pages: SliderImage[];

    private pageNumber: number;
    private pageCount: number;

    private defaultDuration: number;
    private transitionDuration: number;

    /**
     * Autoslide interval handle
     */
    private interval: number;
    private autoSlide: number;

    constructor(private sliderService: SliderService,
                metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // Pause previous sliding
        this.startAutoSlide(false);

        this.sliderService.getSlides(this.route.configuration.type).then((slides: SliderConfiguration) => {
            this.pages = slides.images;
            this.pageNumber = 0;
            this.pageCount = this.pages.length;

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
        });
    }

    autoSlideFunction() {
        if (this.pageNumber < this.pageCount - 1) {
            // Move one slide forward
            this.pageNumber += 1;
        } else {
            // Move to front
            this.moveToFirst();
        }
    }

    moveToFirst() {
        if (this.interval) {
            // Pause sliding
            this.startAutoSlide(false);

            // Speedup transitions
            this.transitionDuration /= 10;

            setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
        } else {
            this.pageNumber -= 1;
            if (this.pageNumber === 0) {
                // Restart auto-slide
                this.startAutoSlide();
            } else {
                setTimeout(this.moveToFirst.bind(this), this.transitionDuration * 1.5);
            }
        }
    }

    startAutoSlide(sliding?: boolean) {
        if (this.autoSlide) {
            if (arguments.length === 0 || sliding) {
                this.transitionDuration = this.defaultDuration || 500;
                this.interval = setInterval(this.autoSlideFunction.bind(this), this.autoSlide + this.transitionDuration);
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