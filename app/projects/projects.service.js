define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function ProjectsService(http) {
            httpService.AbstractHttpService.call(this, http);
        }

        httpService.inherit(ProjectsService);

        ProjectsService.prototype.getProjects = function (config) {
            return this.getWithCache('/app/mock/:0/:1.json', config.type);
        };

        exports.ProjectsService = ProjectsService;
    });
