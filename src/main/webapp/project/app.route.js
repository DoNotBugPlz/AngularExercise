(function () {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$stateProvider','$provide'];

    /* @ngInject */
    function config($urlRouterProvider, $stateProvider,$provide) {
        //Note: Please don't use "$urlRouterProvider.otherwise('home');" here
        //https://stackoverflow.com/questions/25065699/why-does-angularjs-with-ui-router-keep-firing-the-statechangestart-event
        //alert(1);
        //alert(AppTools.Request("1"));
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('login');
        });
        // $provide.decorator("$state",function ($delegate,$stateParams) {
        //     $delegate.forceReload=function () {
        //         return $delegate.go($delegate.current,$stateParams,{
        //             reload:true,
        //             inherit:false,
        //             notify:true
        //         });
        //     }
        //     return $delegate;
        //
        // })

    }

    run.$inject = ['localStorageService', '$rootScope', '$state', '$stateParams'];

    /* @ngInject */
    function run(localStorageService, $rootScope, $state, $stateParams){
        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams) {
            localStorageService.set("previousState", {
                name:fromState.name,
                stateParams:fromParams
            });
            localStorageService.set("currentState", {
                name:toState.name,
                stateParams:toParams
            });
        });
        $rootScope.back = function(){
            var previousState = localStorageService.get("previousState");
            $state.go(previousState.name, previousState.params);
        }
    }
})();
