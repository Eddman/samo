import {SliderPage} from '@netocny/ng-page-slider';

export interface SliderConfiguration {
    duration: number;
    images: (SliderPage & { title: string })[];

    autoSlide?: number;

    primary?: boolean;
    description?: string;
}
