(function () {
    angular.module("app.institutions")
        .config(config);
    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
           /* .state('institutions', {
                url: '/institutions',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/institutions/institutions.html',
                        controller: 'institutionsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadInstitutionFiles: loadInstitutionFiles
                }
            })*/
            .state('pointInstitutions', {
                url: '/pointInstitutions',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/institutions/pointInstitutions.html',
                        controller: 'pointInstitutionsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadPointInstitutionsFiles: loadPointInstitutionsFiles
                }
            })
            .state('statisticsInstitutions', {
                url: '/statisticsInstitutions',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/institutions/statisticsInstitutions.html',
                        controller: 'statisticsInstitutionsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadStatisticsInstitutionsFiles: loadStatisticsInstitutionsFiles
                }
            })
            .state('denoterInstitutions', {
                url: '/denoterInstitutions',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './organization/institutions/denoterInstitutions.html',
                        controller: 'denoterInstitutionsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadDenoterInstitutionsFiles: loadDenoterInstitutionsFiles
                }
            });
    }

    loadInstitutionFiles.$inject = ['$ocLazyLoad'];

    function loadInstitutionFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/institutions/institutions.controller.js',
            './organization/institutions/institutions.service.js'
        ]);
    }    loadPointInstitutionsFiles.$inject = ['$ocLazyLoad'];

    function loadPointInstitutionsFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/institutions/pointInstitutions.controller.js',
            './organization/institutions/institutions.service.js'
        ]);
    }

    loadStatisticsInstitutionsFiles.$inject = ['$ocLazyLoad'];

    function loadStatisticsInstitutionsFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/institutions/statisticsInstitutions.controller.js',
            './organization/institutions/institutions.service.js'
        ]);
    }

    function loadDenoterInstitutionsFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/institutions/denoterInstitutions.controller.js',
            './organization/institutions/institutions.service.js'
        ]);
    }
})();