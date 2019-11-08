export interface SliderImage {
    url: string;
}

export interface SliderConfiguration {
    images: SliderImage[];

    autoSlide?: number;

    primary?: boolean;
    description?: string;
}
