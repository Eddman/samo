import {StorageService} from "./storage.service";
import {Headers} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class RequestService {

    constructor() {
    }

    public getAuthHeaders(): Headers {
        let headers: Headers = RequestService.getJsonHeaders(),
            authToken: string = StorageService.getAuthToken();

        if (authToken) {
            headers.append('Authorization', 'Bearer ' + authToken);
        }
        return headers;
    }

    public static getJsonHeaders(): Headers {
        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
