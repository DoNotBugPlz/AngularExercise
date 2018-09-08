/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.matterfind")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("matterfind", {
                url: '/matterfind',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './matter/find/matterfind.html',
                        controller: 'MatterFindCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadRolesFiles: loadRolesFiles
                }
            })

        loadRolesFiles.$inject = ['$ocLazyLoad'];
        function loadRolesFiles($ocLazyLoad) {
            return $ocLazyLoad.load([
                './matter/find/matterfind.controller.js',
                './matter/find/matterfind.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker',
                'chosen'

            ]);
        }
    }
})();