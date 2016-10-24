define(['exports'],
    function (exports) {
        function LocaleService() {
        }

        LocaleService.prototype.getSelectedLang = function () {
            return this.selectedLang;
        };

        LocaleService.prototype.setSelectedLang = function (selectedLang) {
            this.selectedLang = selectedLang;
        };

        exports.LocaleService = LocaleService;
    });
