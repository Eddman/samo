import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {AbstractHttpService} from "../abstract.http.service";

import {RequestService} from "../auth/request.service";
import {DetailService} from "../detail/detail.service";

import {Project} from "./project";

const getURL: string = '/app/mock/:0/:1.json', // TODO change after a BE is available
    postURL: string = '/projects/:0/:1/save';

@Injectable()
export class ProjectsService extends AbstractHttpService<Project[]> {

    constructor(http: Http, requestService: RequestService, private detailService: DetailService) {
        super(http, requestService);
    }


    getProject(type: string[]): Promise<Project[]> {
        return this.getWithCache(getURL, type);
    }

    saveProjects(type: string[], projects: Project[]): Promise<Project[]> {
        let resourceURL: string = this.constructURL(postURL, type);
        return new Promise((resolve, reject) => {
            this.post(resourceURL, {data: projects}).subscribe(
                (data: Project[]) => {
                    this.setCache(data, type);
                    this.detailService.clearCache(type);
                    resolve(data);
                }, reject);
        });
    }
}
