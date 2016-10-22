define(['exports'],
    function (exports) {
        exports.routes = [
            {
                type: 'group',
                redirect: '',
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
                type: 'group',
                redirect: 'projects',
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
                        title: 'Médiá',
                        url: 'media',
                        type: 'projectsView',
                        config: {
                            type: 'media'
                        }
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
                type: 'group',
                redirect: 'projects',
                routes: [
                    {
                        title: 'Arbeit',
                        url: 'projects',
                        type: 'projectsView',
                        config: {
                            type: 'projects'
                        }
                    }, {
                        title: 'Medien',
                        url: 'media',
                        type: 'projectsView',
                        config: {
                            type: 'media'
                        }
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
            }
        ];

    });
