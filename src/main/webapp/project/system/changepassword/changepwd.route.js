(function () {
    angular.module("app.changepwd")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("changepwd", {
                url: '/changepwd',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/changepassword/changepwd.html',
                        controller: 'ChangePwdCtrl',
                        controllerAs: 'changepwd'
                    }
                },
                resolve: {
                    loadChangePwdFiles: loadChangePwdFiles
                }
            })
    }

    /* @ngInject */
    loadChangePwdFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadChangePwdFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/changepassword/changepwd.controller.js',
            './system/changepassword/changepwd.service.js'
        ]);
    }

})();
