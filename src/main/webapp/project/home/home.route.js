(function () {
    'use strict';

    angular
        .module('app.home')
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
        /***框架****/
            .state("app", {
                url: '/home',
                views: {
                    'main': {
                        templateUrl: './home/home_green/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'vm'
                    },
                    'panel@app': {
                        templateUrl: './desktop/desktop.html',
                        controller: 'DesktopCtrl',
                        controllerAs: 'desktop'
                    }
                },
                resolve: {
                    loadHomeFiles: loadHomeFiles
                }
            })
            .state("app.contentIfram", {
                url: '/app.contentIfram?:iframSrc',
                params:{iframSrc:""},
                parent: 'app',
                views: {
                    'panel@app': {
                        templateUrl: './home/content/content.ifram.html',
                        controller:"ContentIframCtrl",
                        controllerAs: 'vm'
                    }
                },
                resolve:{
                    loadContentIframFiles:loadContentIframFiles
                }
            })
    }


    /* @ngInject */

    loadHomeFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadHomeFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './home/js/home.controller.js',
            './home/js/home.service.js',
            './desktop/desktop.controller.js',
            'mCustomScrollbar',
            './login/login.service.js',
            '../styles/js/master_sk.js',
             './utils/app.animate.js'

        ]);
    }
    loadContentIframFiles.$inject = ['$ocLazyLoad'];
    function loadContentIframFiles($ocLazyLoad){
        return $ocLazyLoad.load([
            './home/js/content.ifram.controller.js'
        ])
    }
})();
