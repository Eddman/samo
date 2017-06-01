import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {AbstractHttpService} from '../abstract.http.service';
import {RequestService} from '../auth/request.service';
import {Detail} from './detail';

const getURL: string = '/app/mock/details{params}.json';

@Injectable()
export class DetailService extends AbstractHttpService<Detail> {

    constructor(http: Http, requestService: RequestService) {
        super(http, requestService);
    }

    public getDetail(type: string[], parameters?: string[]): Promise<Detail> {
        let detailParamsLenght: number = type.length,
            i: number,
            detailParams: string = '';
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
