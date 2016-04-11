(function(app) {
    document.addEventListener('DOMContentLoaded', function() {
        ng.platform.browser.bootstrap(app.RootComponent);
    });
})(window.app || (window.app = {}));