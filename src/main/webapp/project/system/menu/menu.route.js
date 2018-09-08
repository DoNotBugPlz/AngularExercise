(function () {
    angular.module("app.menu")
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("menu", {
                url: '/menu',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './system/menu/menu.html',
                        controller: 'MenuCtrl',
                        controllerAs: 'menu'
                    }
                },
                resolve: {
                    loadMenuFiles: loadMenuFiles
                }
            })
            .state("menuDetail", {
                url: '/menuDetail',
                params: {
                    menuId:'',
                    parentMenuId:'',
                    zTreeRefreshMenuId:'',
                    menuTimeStamp:''
                },
                parent: "menu",
                views: {
                    'menu_details@menu': {
                        templateUrl: './system/menu/menuDetail/menu.detail.html',
                        controller: 'MenuDetailCtrl',
                        controllerAs: 'menuDetail'
                    }
                },
                resolve: {
                    loadMenuDetailFiles: loadMenuDetailFiles
                }
            })
    }

    /* @ngInject */
    loadMenuFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMenuFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/menu/menu.controller.js',
            './system/menu/menu.service.js',
            'ng-zTree'
        ]);
    }

    /* @ngInject */
    loadMenuDetailFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadMenuDetailFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './system/menu/menuDetail/menu.detail.controller.js',
            './system/menu/menuDetail/menu.detail.service.js'
        ]);
    }

})();
