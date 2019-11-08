import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {SwipeService} from './swipe.service';

export interface ISlide {
    url: string;
    action: string;
    leftSide: boolean;
    rightSide: boolean;
    selected: boolean;
}

@Component({
    selector           : 'sn-slideshow',
    templateUrl        : 'slideshow.component.html',
    styleUrls          : [
        'slideshow.component.scss'
    ],
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host               : {
        '[class.sn-slideshow]': 'true'
    }
})
export class SlideshowComponent implements OnInit {
    slideIndex: number = 0;
    slides: ISlide[] = [];

    private autoplayIntervalId: any;

    private _autoPlayInterval: number = 5000;

    @Input()
    public set autoPlayInterval(value: number) {
        this._autoPlayInterval = value;
        this.handleAutoPlay(true);
    }

    @Input()
    public autoSlide: boolean = true;

    public constructor(private swipeService: SwipeService,
                       private ngZone: NgZone,
                       private changeDetector: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.handleAutoPlay(true);
    }

    @Input()
    public set imageUrls(imageUrls: string[]) {
        // Check if these are the same
        if ((imageUrls == null
             && this.slides.length === 0)
            || (imageUrls != null
                && imageUrls.length === this.slides.length
                && imageUrls.every((url, index) => this.slides[index].url === url))) {
            return;
        }

        this.slides = [];
        for (const image of imageUrls) {
            this.slides.push({
                url      : image,
                action   : '',
                leftSide : false,
                rightSide: false,
                selected : false
            });
        }

        this.slides[this.slideIndex].selected = true;
    }

    /**
     * @description this is the function that should be called to make the slides change.
     *              indexDirection to move back is -1, to move forward is 1, and to stay in place is 0.
     *              0 is taken into account for failed swipes
     */
    public onSlide(indexDirection: number): void {
        this.handleAutoPlay();
        this.slide(indexDirection);
    }

    /**
     * @description Use the swipe service to detect swipe events from phone and tablets
     */
    public onSwipe(e: TouchEvent, when: string): void {
        const indexDirection = this.swipeService.swipe(e, when);
        // handle a failed swipe
        if (indexDirection === 0) {
            return;
        } else {
            this.onSlide(indexDirection);
        }
    }

    /**
     * @description set the index to the desired index - 1 and simulate a right slide
     */
    public goToSlide(index: number): void {
        const beforeClickIndex = this.slideIndex;
        this.slideIndex = index - 1;
        this.setSlideIndex(1);

        this.handleAutoPlay();
        this.slideRight(beforeClickIndex);
        this.slides[beforeClickIndex].selected = false;
        this.slides[this.slideIndex].selected = true;
    }

    /**
     * @description set the index to the desired index - 1 and simulate a right slide
     */
    public getSlideStyle(index: number) {
        const slide = this.slides[index];

        return {
            'background-image': 'url(' + slide.url + ')'
        };
    }

    /**
     * @description set the index to the desired index - 1 and simulate a right slide
     */
    public getSlideUrl(index: number) {
        const slide = this.slides[index];

        return slide.url;
    }

    /**
     * @description Set the new slide index, then make the transition happen.
     */
    private slide(indexDirection: number): void {
        const oldIndex = this.slideIndex;

        this.setSlideIndex(indexDirection);

        if (indexDirection === 1) {
            this.slideRight(oldIndex);
        } else {
            this.slideLeft(oldIndex);
        }

        this.slides[oldIndex].selected = false;
        this.slides[this.slideIndex].selected = true;
    }

    /**
     * @description This is just treating the url array like a circular list.
     */
    private setSlideIndex(indexDirection: number): void {
        this.slideIndex += indexDirection;

        if (this.slideIndex < 0) {
            this.slideIndex = this.slides.length - 1;
        }

        if (this.slideIndex >= this.slides.length) {
            this.slideIndex = 0;
        }
    }

    /**
     * @description This function handles the variables to move the CSS classes around accordingly.
     *              In order to correctly handle animations, the new slide as well as the slides to
     *              the left and right are assigned classes.
     */
    private slideLeft(oldIndex: number): void {
        this.slides[this.getLeftSideIndex(oldIndex)].leftSide = false;
        this.slides[oldIndex].leftSide = true;
        this.slides[oldIndex].action = 'slideOutLeft';
        this.slides[this.slideIndex].rightSide = false;
        this.slides[this.getRightSideIndex()].rightSide = true;
        this.slides[this.slideIndex].action = 'slideInRight';
    }

    /**
     * @description This function handles the variables to move the CSS classes around accordingly.
     *              In order to correctly handle animations, the new slide as well as the slides to
     *              the left and right are assigned classes.
     */
    private slideRight(oldIndex: number): void {
        this.slides[this.getRightSideIndex(oldIndex)].rightSide = false;
        this.slides[oldIndex].rightSide = true;
        this.slides[oldIndex].action = 'slideOutRight';
        this.slides[this.slideIndex].leftSide = false;
        this.slides[this.getLeftSideIndex()].leftSide = true;
        this.slides[this.slideIndex].action = 'slideInLeft';
    }

    /**
     * @description Start or stop autoPlay, don't do it at all server side
     */
    private handleAutoPlay(startAutoPlay?: boolean): void {
        if (this.autoplayIntervalId) {
            this.ngZone.runOutsideAngular(() => clearInterval(this.autoplayIntervalId));
            this.autoplayIntervalId = null;
        }
        if (startAutoPlay === true) {
            this.ngZone.runOutsideAngular(() => {
                this.autoplayIntervalId = setInterval(() => {
                    this.ngZone.run(() => {
                        if (!this.autoSlide) {
                            return;
                        }
                        this.slide(1);
                        this.changeDetector.markForCheck();
                    });
                }, this._autoPlayInterval || 5000);
            });
        }
    }

    /**
     * @description get the index for the slide to the left of the new slide
     */
    private getLeftSideIndex(i?: number): number {
        if (i === undefined) {
            i = this.slideIndex;
        }

        if (--i < 0) {
            i = this.slides.length - 1;
        }

        return i;
    }

    /**
     * @description get the index for the slide to the right of the new slide
     */
    private getRightSideIndex(i?: number): number {
        if (i === undefined) {
            i = this.slideIndex;
        }

        if (++i >= this.slides.length) {
            i = 0;
        }

        return i;
    }

    /**
     * @description a trackBy function for the ngFor loops
     */
    public trackBySlide(index: number, slide: ISlide): string {
        return slide.url;
    }
}
