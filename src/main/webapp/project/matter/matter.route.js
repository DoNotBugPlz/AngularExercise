/**
 * Created by zh on 2018年8月6日21:01:05.
 */
(function () {
    angular.module("app.matter")
        .config(config);
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state("matter", {
                url: '/matter',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './matter/matter.html',
                        controller: 'MatterCtrl',
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
                './matter/matter.controller.js',
                './matter/matter.service.js',
                'pagination',
                'mCustomScrollbar',
                'ng-zTree',
                'My97DatePicker'

            ]);
        }
    }
})();