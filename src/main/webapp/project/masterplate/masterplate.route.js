(function () {
    angular.module("app.masterplate")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("masterplate", {
                url: '/masterplate',
                params: {menuName: '模版列表'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './masterplate/masterplate.html',
                        controller: 'MasterplateCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMasterplateFiles: loadMasterplateFiles
                }
            })

            .state("masterplate.detail", {
                url: '/masterplate/detail',
                params: {
                    menuName: '新增模版',
                    id: ''
                },
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './masterplate/detail/masterplate.detail.html',
                        controller: 'masterplateDetailCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadmasterplateDetailFiles: loadmasterplateDetailFiles
                }
            })
    }

    /* @ngInject */
    loadMasterplateFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMasterplateFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './masterplate/masterplate.controller.js',
            './masterplate/masterplate.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'

        ]);
    }
    /* @ngInject */
    loadmasterplateDetailFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadmasterplateDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './masterplate/detail/masterplate.detail.controller.js',
            './masterplate/detail/masterplate.detail.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'

        ]);
    }

})();
