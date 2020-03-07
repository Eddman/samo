import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '../abstract.http.service';
import {Detail} from './detail';

const getURL: string = '/assets/mock/details{params}.json';

@Injectable()
export class DetailService extends AbstractHttpService<Detail> {

    public constructor(http: HttpClient) {
        super(http);
    }

    public getDetail(type: string[], parameters?: string[]): Observable<Detail> {
        let detailParamsLenght: number = type.length;
        let i: number;
        let detailParams: string = '';
        if (parameters) {
            detailParamsLenght += parameters.length;
        }
        for (i = 0; i < detailParamsLenght; i += 1) {
            detailParams += '/:' + i;
        }
        return this.getWithCache({
            resourceURL: getURL.replace('{params}', detailParams),
            params     : type,
            subParams  : parameters
        });
    }
}
