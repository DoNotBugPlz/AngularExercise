
(function () {
    'use strict';

    angular
        .module('app.core', [
            /* Cross-cutting modules */
            /*            'block.auth',*/

            /* 3rd-party modules */
            'LocalStorageModule',
            'oc.lazyLoad',
            'ui.router',
            'ngDialog'
        ]);
})();
