define(['exports'],
    function (exports) {
        exports.routes = [
            {
                routes: [
                    {
                        url: '',
                        type: 'slider',
                        config: {
                            images: 'home'
                        }
                    }
                ]
            },
            {
                title: '/SK/ Poprad-Tatry',
                locale: 'sk',
                routes: [
                    {
                        title: 'Práce',
                        url: 'projects',
                        type: 'projectsView',
                        config: {
                            type: 'projects'
                        }
                    },
                    {
                        title: 'Média',
                        url: 'media',
                        type: 'projectsView',
                        config: {}
                    },
                    {
                        title: 'CV',
                        url: 'cv',
                        type: 'detail',
                        config: {}
                    },
                    {
                        title: 'Kontakt',
                        url: 'contact',
                        type: 'detail',
                        config: {}
                    }
                ]
            },
            {
                title: '/AT/ Wien',
                locale: 'at',
                routes: [
                    {
                        title: 'Arbeit',
                        url: 'projects',
                        type: 'projectsView',
                        config: {
                            type: 'projects'
                        }
                    }
                ]
            }
        ];

    });
