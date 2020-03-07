import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '../abstract.http.service';
import {SliderConfiguration} from './slider.configuration';

@Injectable()
export class SliderService extends AbstractHttpService<SliderConfiguration> {

    constructor(http: HttpClient) {
        super(http);
    }

    public getSlides(type: string[]): Observable<SliderConfiguration> {
        return this.getWithCache({
            resourceURL: '/assets/mock/slides/:0/:1.json',
            params     : type
        });
    }
}
