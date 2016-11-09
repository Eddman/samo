define(['exports'],
    function (exports) {
        'use strict';

        var praceSK = {
            title: 'Práce',
            url: 'projects',
            type: 'projects',
            paramsSize: 1,
            config: {
                type: ['projects', 'sk']
            }
        };

        var mediaSK = {
            title: 'News',
            url: 'news',
            type: 'list',
            config: {
                type: ['news', 'sk']
            }
        };

        var cvSK = {
            title: 'Profil',
            url: 'cv',
            type: 'detail',
            config: {
                type: ['cv', 'sk']
            }
        };

        var contactSK = {
            title: 'Kontakt',
            url: 'contact',
            type: 'detail',
            config: {
                type: ['contact', 'sk']
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

        exports.routes =
        {
            title: 'SAMUEL NETOČNÝ, architekt',
            type: 'slider',
            config: {
                images: 'home',
                duration: 700,
                autoSlide: 10000
            },
            routes: [
                sk
            ]
        };
    });
