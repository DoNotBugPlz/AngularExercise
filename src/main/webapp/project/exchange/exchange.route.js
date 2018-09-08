(function () {
    angular.module("app.exchange")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("exchange", {
                url: '/exchange',
                params: {menuName: '交流互动管理列表'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './exchange/exchange.html',
                        controller: 'ExchangeCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadExchangeFiles: loadExchangeFiles
                }
            })
    }

    /* @ngInject */
    loadExchangeFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadExchangeFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './exchange/exchange.controller.js',
            './exchange/exchange.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'

        ]);
    }

})();
