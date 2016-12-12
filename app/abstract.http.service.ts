import {Http, RequestOptions, Response} from '@angular/http';
import {RequestService} from './auth/request.service';
import {Observable} from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

const defaultURL = window.location.origin;

export class AbstractHttpService<T> {

    private cache: any = {};

    constructor(private http: Http, private requestService: RequestService) {
    }

    protected constructURL(templateURL: string, params?: string[], subParams?: string[]): string {
        let resourceURL: string = templateURL;
        let index: number = 0;
        if (params) {
            Object.keys(params).forEach(function (i) {
                resourceURL = resourceURL.replace(':' + index, params[i]);
                index += 1;
            });
        }
        if (subParams) {
            Object.keys(subParams).forEach(function (i) {
                resourceURL = resourceURL.replace(':' + index, subParams[i]);
                index += 1;
            });
        }
        return defaultURL + resourceURL;
    }

    private getRequestOptions(): RequestOptions {
        return new RequestOptions({
            headers: this.requestService.getAuthHeaders()
        });
    }

    private static extractData(res: Response): any {
        let body: any = res.json();
        return body.data || {};
    }

    private static handleError(error: Response | any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string, err: any, body: any;
        if (error.status === 401) {
            // Not logged in - login first
            return Observable.throw(error.status);
        } else {
            if (error instanceof Response) {
                //noinspection UnusedCatchParameterJS
                try {
                    body = error.json() || '';
                    err = body.error || JSON.stringify(body);
                } catch (e) {
                    err = error.text();
                }
                errMsg = error.status + ' - ' + (error.statusText || '') + ' ' + err;
            } else {
                errMsg = error.message || error.toString();
            }
            if (window.console) {
                window.console.error(errMsg);
            }
            return Observable.throw(errMsg);
        }
    }

    protected get(resourceURL: string, mapFunction?: (value: any, index: number) => {}): Observable<T> {
        let request: Observable<T> = this.http.get(resourceURL, this.getRequestOptions())
            .map(AbstractHttpService.extractData);
        if (mapFunction) {
            request.map(mapFunction);
        }
        return request.catch(AbstractHttpService.handleError);
    }

    protected post(resourceURL: string, data: any, mapFunction?: (value: any, index: number) => {}): Observable<T> {
        let request: Observable<T> = this.http.post(resourceURL, JSON.stringify(data), this.getRequestOptions())
            .map(AbstractHttpService.extractData);
        if (mapFunction) {
            request.map(mapFunction);
        }
        return request.catch(AbstractHttpService.handleError);
    }

    protected getWithCache(resourceURLTemplate: string, params?: string[], subParams?: string[]): Promise<T> {
        let resourceURL: string = this.constructURL(resourceURLTemplate, params, subParams);
        if (!this.getCache(params, subParams)) {
            return new Promise((resolve, reject) => {
                this.get(resourceURL).subscribe(
                    (data) => {
                        this.setCache(data, params, subParams);
                        resolve(data);
                    }, reject);
            });
        }
        return Promise.resolve(this.getCache(params, subParams));
    }

    private getCache(params?: string[], subParams?: string[]): any {
        return this.findCache(params, subParams).value;
    }

    protected setCache(data: any, params?: string[], subParams?: string[]): void {
        this.findCache(params, subParams).value = data;
    }

    public clearCache(params?: string[], subParams?: string[]): void {
        let cache: any = this.findCache(params, subParams);
        Object.keys(cache).forEach(function (k) {
            delete cache[k];
        });
    }

    private findCache(params?: string[], subParams?: string[]): any {
        let cache: any = this.cache;
        if (params) {
            Object.keys(params).forEach(function (i) {
                if (!cache[params[i]]) {
                    cache[params[i]] = {};
                }
                cache = cache[params[i]];
            });
        }
        if (subParams) {
            Object.keys(subParams).forEach(function (i) {
                if (!cache[subParams[i]]) {
                    cache[subParams[i]] = {};
                }
                cache = cache[subParams[i]];
            });
        }
        return cache;
    }
}