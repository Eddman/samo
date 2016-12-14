export interface SliderImage {
    url: string;
}

export interface SliderConfiguration {
    duration: number;
    images: SliderImage[];

    autoSlide?: number;

    primary?: boolean;
    description?: string;
}