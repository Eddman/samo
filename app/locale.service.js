define(['exports'],
    function (exports) {
        'use strict';

        function LocaleService() {
        }

        //noinspection JSUnusedGlobalSymbols
        LocaleService.prototype.getSelectedLang = function () {
            return this.selectedLang;
        };

        LocaleService.prototype.setSelectedLang = function (selectedLang) {
            this.selectedLang = selectedLang;
        };

        exports.LocaleService = LocaleService;
    });
