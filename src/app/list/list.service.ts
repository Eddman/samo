import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '../abstract.http.service';
import {ListItem} from './list.item';

const getURL: string = '/assets/mock/list/:0/:1.json';

@Injectable()
export class ListService extends AbstractHttpService<ListItem[]> {

    constructor(http: HttpClient) {
        super(http);
    }

    public getListItems(type: string[]): Observable<ListItem[]> {
        return this.getWithCache({
            resourceURL: getURL,
            params     : type
        });
    }
}
