(function () {
    angular.module("app.login")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("login", {
                url: '/login',
                views: {
                    'main': {
                        templateUrl: './login/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login'
                    }
                },
                resolve: {
                    loadLoginFiles: loadLoginFiles
                }
            })
    }

    /* @ngInject */
    loadLoginFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadLoginFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './login/login.controller.js',
            './login/login.service.js',
            'sliderUnlock'
        ]);
    }

})();
