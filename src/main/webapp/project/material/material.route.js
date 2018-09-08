(function () {
    angular.module("app.material")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("material", {
                url: '/material',
                params: {menuName: '监测材料编制查询列表'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './material/material.html',
                        controller: 'MaterialCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadMaterialFiles: loadMaterialFiles
                }
            })
    }

    /* @ngInject */
    loadMaterialFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMaterialFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './material/material.controller.js',
            './material/material.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'

        ]);
    }

})();
