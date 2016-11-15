define(['exports',
        '../abstract.http.service'],
    function (exports, httpService) {
        'use strict';

        function ProjectsService() {
            httpService.AbstractHttpService.apply(this, arguments);
        }

        exports.ProjectsService = httpService.inherit(ProjectsService, {
            getProject: function (config) {
                return this.getWithCache('/app/mock/:0/:1.json', config.type);
            }
        });
    });
