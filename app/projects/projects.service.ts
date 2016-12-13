import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {AbstractHttpService, PostRequest} from "../abstract.http.service";

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

    public getProject(type: string[]): Promise<Project[]> {
        return this.getWithCache({
            resourceURL: getURL,
            params: type
        });
    }

    public saveProjects(type: string[], projects: Project[]): Promise<Project[]> {
        let request: PostRequest<any> = {
            resourceURL: postURL,
            params: type,
            data: projects
        };
        return new Promise((resolve, reject) => {
            this.post(request).subscribe(
                (data: Project[]) => {
                    this.setCache(data, request);
                    this.detailService.clearCache(request);
                    resolve(data);
                }, reject);
        });
    }
}
