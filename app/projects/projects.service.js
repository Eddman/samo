define(['exports',
        '../abstract.http.service',
        '../detail/detail.service'],
    function (exports, httpService, detailService) {
        'use strict';

        var getURL = '/app/mock/:0/:1.json', // TODO change after a BE is available
            postURL = '/projects/:0/:1/save';

        function ProjectsService(http, requestService, detailService) {
            httpService.AbstractHttpService.apply(this, arguments);
            this.detailService = detailService;
        }

        exports.ProjectsService = httpService.inherit(ProjectsService, {
            getProject: function (config) {
                return this.getWithCache(getURL, config.type);
            },
            saveProjects: function (config, projects) {
                var resourceURL = this.constructURL(postURL, config.type);
                return new Promise(function (resolve, reject) {
                    this.post(resourceURL, {data: projects}).subscribe(
                        function (data) {
                            this.setCache(config.type, null, data);
                            this.detailService.clearCache(config.type);
                            resolve(data);
                        }.bind(this), reject);
                }.bind(this));
            }
        }, [detailService.DetailService]);
    });
