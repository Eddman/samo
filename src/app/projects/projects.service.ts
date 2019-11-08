import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '../abstract.http.service';
import {Project} from './project';

// TODO change after a BE is available
const getURL: string = '/assets/mock/:0/:1.json';

@Injectable()
export class ProjectsService extends AbstractHttpService<Project[]> {

    constructor(http: HttpClient) {
        super(http);
    }

    public getProject(type: string[]): Observable<Project[]> {
        return this.getWithCache({
            resourceURL: getURL,
            params     : type
        });
    }
}
