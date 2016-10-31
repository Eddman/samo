define(['exports'],
    function (exports) {
        var praceSK = {
            title: 'Práce',
            url: 'projects',
            type: 'projects',
            paramsSize: 1,
            config: {
                type: 'projects'
            }
        };

        var mediaSK = {
            title: 'News',
            url: 'news',
            type: 'list',
            config: {
                type: 'news'
            }
        };

        var cvSK = {
            title: 'CV',
            url: 'cv',
            type: 'detail',
            config: {
                type: 'cv'
            }
        };

        var contactSK = {
            title: 'Kontakt',
            url: 'contact',
            type: 'detail',
            config: {
                type: 'contact'
            }
        };

        var sk = {
            title: '/SK/ Poprad-Tatry',
            url: 'sk',
            type: 'group',
            redirect: ['sk', 'projects'],
            routes: [
                praceSK,
                mediaSK,
                cvSK,
                contactSK
            ]
        };

        var praceAT = {
            title: 'Arbeit',
            url: 'projects',
            type: 'projects',
            paramsSize: 1,
            config: {
                type: 'projects'
            }
        };

        var mediaAT = {
            title: 'News',
            url: 'news',
            type: 'list',
            config: {
                type: 'news'
            }
        };

        var cvAT = {
            title: 'CV',
            url: 'cv',
            type: 'detail',
            config: {
                type: 'cv'
            }
        };

        var contactAT = {
            title: 'Kontakt',
            url: 'contact',
            type: 'detail',
            config: {
                type: 'contact'
            }
        };

        var at = {
            title: '/AT/ Wien',
            url: 'at',
            type: 'group',
            redirect: ['at', 'projects'],
            routes: [
                praceAT,
                mediaAT,
                cvAT,
                contactAT
            ]
        };

        exports.routes =
        {
            title: 'SAMUEL NETOČNÝ, architekt',
            type: 'slider',
            config: {
                images: 'home',
                duration: 500,
                autoSlide: 5000
            },
            routes: [
                sk,
                at
            ]
        };
    });
