import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {AbstractHttpService} from "../abstract.http.service";
import {RequestService} from "../auth/request.service";

import {ListItem} from "./list.item";

@Injectable()
export class ListService extends AbstractHttpService<ListItem[]> {

    constructor(http: Http, requestService: RequestService) {
        super(http, requestService);
    }

    public getListItems(type: string[]): Promise<ListItem[]> {
        return this.getWithCache('/app/mock/list/:0/:1.json', type);
    }
}
