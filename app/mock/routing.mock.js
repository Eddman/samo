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
            title: 'CV',
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

        var praceAT = {
            title: 'Arbeit',
            url: 'projects',
            type: 'projects',
            paramsSize: 1,
            config: {
                type: ['projects', 'at']
            }
        };

        var mediaAT = {
            title: 'News',
            url: 'news',
            type: 'list',
            config: {
                type: ['news', 'at']
            }
        };

        var cvAT = {
            title: 'CV',
            url: 'cv',
            type: 'detail',
            config: {
                type: ['cv', 'at']
            }
        };

        var contactAT = {
            title: 'Kontakt',
            url: 'contact',
            type: 'detail',
            config: {
                type: ['contact', 'at']
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
