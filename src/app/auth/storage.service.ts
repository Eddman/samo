import {Injectable} from '@angular/core';

const STORAGE_KEY = 'auth_token';

@Injectable()
export class StorageService {

    public static getAuthToken(): string {
        return localStorage.getItem(STORAGE_KEY);
    }

    public static setAuthToken(token: string) {
        localStorage.setItem(STORAGE_KEY, token);
    }

    public static removeAuthToken() {
        localStorage.removeItem(STORAGE_KEY);
    }
}
