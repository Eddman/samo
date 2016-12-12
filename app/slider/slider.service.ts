import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {RequestService} from "../auth/request.service";
import {AbstractHttpService} from "../abstract.http.service";

import {SliderConfiguration} from "./slider.configuration";

@Injectable()
export class SliderService extends AbstractHttpService<SliderConfiguration> {


    constructor(http: Http, requestService: RequestService) {
        super(http, requestService);
    }

    public getSlides(type: string[]): Promise<SliderConfiguration> {
        return this.getWithCache('/app/mock/slides/:0/:1.json', type);
    }
}