import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const defaultURL: string = window.location.origin;

export interface Request<T> {
    resourceURL: string;
    params?: string[];
    subParams?: string[];

    mapFunction?: (value: any, index: number) => T;
}

export interface PostRequest<T> extends Request<T> {
    data: any;
}

export interface ErrorResponse {
    status: number;
    message: string;
}

export abstract class AbstractHttpService<T> {

    constructor(private http: HttpClient) {
    }

    private cache: object = {};

    private static handleError(error: Response | any): Observable<never> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        let err: any;
        let body: any;
        if (error.status === 401) {
            // Not logged in - login first
            return throwError({
                status : error.status,
                message: error.statusText
            });
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
            return throwError({
                status : error.status || 500,
                message: errMsg
            });
        }
    }

    protected constructURL(request: Request<T>): string {
        let resourceURL: string = request.resourceURL;
        let index: number = 0;
        if (request.params) {
            request.params.forEach((param: string) => {
                resourceURL = resourceURL.replace(':' + index, param);
                index += 1;
            });
        }
        if (request.subParams) {
            request.subParams.forEach((param: string) => {
                resourceURL = resourceURL.replace(':' + index, param);
                index += 1;
            });
        }
        return defaultURL + resourceURL;
    }

    protected get(request: Request<T>): Observable<T> {
        const requestObservable: Observable<T> = this.http.get(this.constructURL(request), {
            observe     : 'body',
            responseType: 'json',
            headers     : new HttpHeaders({
                Accept        : 'application/json',
                'Content-Type': 'application/json'
            })
        }).pipe(
            map((body: any) => body.data as T)
        );
        if (request.mapFunction) {
            requestObservable.pipe(map(request.mapFunction));
        }
        return requestObservable.pipe(catchError(AbstractHttpService.handleError));
    }

    protected getWithCache(request: Request<T>): Observable<T> {
        if (!this.getCache(request)) {
            return this.get(request).pipe(
                tap((data) => {
                    this.setCache(data, request);
                })
            );
        }
        return of(this.getCache(request));
    }

    private getCache(request?: Request<T>): T {
        return this.findCache(request).value;
    }

    protected setCache(data: T, request?: Request<T>): void {
        this.findCache(request).value = data;
    }

    public clearCache(request?: Request<T>): void {
        const cache: any = this.findCache(request);
        Object.keys(cache).forEach((k: string) => {
            delete cache[k];
        });
    }

    private findCache(request?: Request<T>): { value: T } {
        let cache: any = this.cache;
        if (request) {
            if (request.params) {
                request.params.forEach((param: string) => {
                    if (!cache[param]) {
                        cache[param] = {};
                    }
                    cache = cache[param];
                });
            }
            if (request.subParams) {
                request.subParams.forEach((param: string) => {
                    if (!cache[param]) {
                        cache[param] = {};
                    }
                    cache = cache[param];
                });
            }
        }
        return cache;
    }
}
