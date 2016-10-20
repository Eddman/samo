define(['exports'],
    function (exports, mockProjects) {
        function LocaleService() {
            this.selectedLang;
        }

        LocaleService.prototype.getSelectedLang = function () {
            return this.selectedLang;
        };

        LocaleService.prototype.setSelectedLang = function (selectedLang) {
            this.selectedLang = selectedLang;
        };

        exports.LocaleService = LocaleService;
    });
