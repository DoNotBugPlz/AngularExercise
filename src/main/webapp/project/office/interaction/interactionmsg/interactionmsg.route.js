/**
 * @author maxzhao
 * @time 2018/08/21.
 */

(function () {
    angular.module("app.interactionmsg")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("interactionmsg", {
                url: '/interactionmsg',
                params: {interactionmsgName: '互动消息'},
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './office/interaction/interactionmsg/interactionmsg.html',
                        controller: 'InteractionmsgCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadInteractionmsgFiles: loadInteractionmsgFiles
                }
            });
    }

    loadInteractionmsgFiles.$inject = ['$ocLazyLoad'];

    function loadInteractionmsgFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './office/interaction/interactionmsg/interactionmsg.controller.js',
            './office/interaction/interactionmsg/interactionmsg.service.js',
            'pagination',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }
})();
