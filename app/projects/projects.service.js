define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function ProjectsService(http) {
            httpService.AbstractHttpService.call(this, http);
        }

        exports.ProjectsService = httpService.inherit(ProjectsService, {
            getProject: function (config) {
                return this.getWithCache('/app/mock/:0/:1.json', config.type);
            }
        });
    });
