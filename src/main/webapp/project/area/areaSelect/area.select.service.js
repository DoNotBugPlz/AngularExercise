
(function (rootPath) {
    'use strict';

    angular
        .module('app.area')
        .service('areaSelectService', areaSelectService);
    areaSelectService.$inject = ['$http'];
    /* @ngInject */
    function areaSelectService($http) {
        this.loadAreaTree = function () {
            return $http({
                url: rootPath + "Cf_area/LoadListAreaTree.do",
                method: 'GET'
            })
        }
    }

})('../');
