(function () {
    angular.module("app.submission")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("submission", {
                url: '/submission',
                params: {menuName: '监测材料编制查询列表'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './submission/submission.html',
                        controller: 'SubmissionCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadSubmissionFiles: loadSubmissionFiles
                }
            })
    }

    /* @ngInject */
    loadSubmissionFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadSubmissionFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './submission/submission.controller.js',
            './submission/submission.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'

        ]);
    }

})();
