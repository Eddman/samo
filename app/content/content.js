define(['exports'], function (exports) {
    'use strict';

    exports.contentPartsTypes = {
        TEXT: 'text',
        IMAGE: 'image',
        LINK_EXTERNAL: 'external-link',
        LINK_INTERNAL: 'internal-link',
        LINE_BREAK: 'break',
        SLIDER: 'slider'
    };

    function ContentPart(type, text) {
        this.type = type;
        this.text = text;
    }

    ContentPart.forText = function (text, columns) {
        var contentPart = new ContentPart(exports.contentPartsTypes.TEXT, text);
        contentPart.columns = columns;
        return contentPart;
    };

    ContentPart.forImage = function (url, title, float, width) {
        var contentPart = new ContentPart(exports.contentPartsTypes.IMAGE);
        contentPart.url = url;
        contentPart.title = title;
        contentPart.float = float;
        contentPart.width = width;
        return contentPart;
    };

    ContentPart.forLineBreak = function () {
        return new ContentPart(exports.contentPartsTypes.LINE_BREAK);
    };

    ContentPart.forLinkExternal = function (text, url) {
        var contentPart = new ContentPart(exports.contentPartsTypes.LINK_EXTERNAL, text);
        contentPart.url = url;
        return contentPart;
    };

    ContentPart.forLinkInternal = function (text, pathParts) {
        var contentPart = new ContentPart(exports.contentPartsTypes.LINK_INTERNAL, text);
        contentPart.routeLink = '/' + [].concat(pathParts).join('/');
        return contentPart;
    };

    ContentPart.forSlider = function (config) {
        var contentPart = new ContentPart(exports.contentPartsTypes.SLIDER);
        contentPart.configuration = config;
        return contentPart;
    };

    exports.ContentPart = ContentPart;
});