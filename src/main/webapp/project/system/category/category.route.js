/**
 * Created by tr on 2018年8月9日21:02:37
 */
(function () {
    angular.module("app.category")
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("category", {
                url: '/category',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/category/category.html',
                        controller: 'CategoryCtrl',
                        controllerAs: 'category'
                    }
                },
                resolve: {
                    loadCategoryFiles: loadCategoryFiles
                }
            })
            .state("categoryValue", {
                url: '/categoryValue?:categoryId&:categoryName',
                params: {
                    categoryId:'',
                    categoryName: ''
                },
                parent: "category",
                views: {
                    'category_value@category': {
                        templateUrl: './system/category/categoryValue/category_value.html',
                        controller: 'CategoryValueCtrl',
                        controllerAs: 'categoryValue'
                    }
                },
                resolve: {
                    loadCategoryValueFiles: loadCategoryValueFiles
                }
            })

        loadCategoryFiles.$inject = ['$ocLazyLoad'];
        function loadCategoryFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './system/category/category.controller.js',
                './system/category/category.service.js',
                'mCustomScrollbar',
                'pagination'
            ]);
        }

        loadCategoryValueFiles.$inject = ['$ocLazyLoad'];
        function loadCategoryValueFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './system/category/categoryValue/category_value.controller.js',
                './system/category/categoryValue/category_value.service.js',
                'mCustomScrollbar'
            ]);
        }
    }
})();