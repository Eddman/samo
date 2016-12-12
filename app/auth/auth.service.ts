import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {AbstractHttpService} from '../abstract.http.service';
import {RequestService} from "./request.service";
import {StorageService} from "./storage.service";

const loginURL = '/login',
    logoutURL = '/logout';

export interface LoginData {
    user: string;
    password: string;
}

interface LoginResponseData {
    success: boolean;
    auth_token: string;
}

@Injectable()
export class AuthService extends AbstractHttpService<boolean> {
    private loggedIn: BehaviorSubject<boolean>;

    constructor(http: Http, requestService: RequestService) {
        super(http, requestService);
        this.loggedIn = new BehaviorSubject<boolean>(false);

        //if (!!this.storage.getAuthToken()) {
        this.loggedIn.next(true);
        //}
    }

    public login(credentials: LoginData): Observable<boolean> {
        StorageService.removeAuthToken();
        this.loggedIn.next(false);
        return this.post(loginURL, credentials, (res: LoginResponseData) => {
            if (res.success) {
                StorageService.setAuthToken(res.auth_token);
                this.loggedIn.next(true);
            }

            return res.success;
        });
    }

    public logout(): Observable<boolean> {
        let request: Observable<boolean> = this.post(logoutURL, {});
        StorageService.removeAuthToken();
        this.loggedIn.next(false);
        return request;
    }

    public isLoggedIn(): boolean {
        return this.loggedIn.getValue();
    }
}
