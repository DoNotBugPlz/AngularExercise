(function () {
    angular.module("app.foreign_material")
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("foreign_material", {
                url: '/foreign_material',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './foreignMaterial/foreignMaterial.html',
                        controller: 'ForeignMaterialCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadForeignMaterialFiles: loadForeignMaterialFiles
                }
            })

        /* @ngInject */
        loadForeignMaterialFiles.$inject = ['$ocLazyLoad'];

        /* @ngInject */
        function loadForeignMaterialFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './foreignMaterial/foreignMaterial.controller.js',
                './foreignMaterial/foreignMaterial.service.js',
                'pagination',//分页
                'mCustomScrollbar',//滚动条
                'My97DatePicker'//时间控件

            ]);
        }
    }


})();
