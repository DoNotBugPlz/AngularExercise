/**
 * @author maxzhao
 * @time 2018/08/17.
 */
(function () {
    angular.module("app.staffstatistics")
        .config(config);
    config.$inject = ['$stateProvider'];


    function config($stateProvider) {
        $stateProvider.state("staffstatistics", {
            url: '/staffstatistics',
            // params: {},
            parent: "app",
            views: {
                'panel@app': {
                    templateUrl: './organization/staffStatistics/staffStatistics.html',
                    controller: 'StaffStatisticsCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                loadStaffOrganizationFiles: loadStaffOrganizationFiles
            }
        });
    }

    loadStaffOrganizationFiles.$inject = ['$ocLazyLoad'];

    function loadStaffOrganizationFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './organization/staffStatistics/staffStatistics.controller.js',
            './organization/staffStatistics/staffStatistics.service.js'
        ]);
    }
})();
