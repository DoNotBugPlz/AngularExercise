/**
 * @author maxzhao
 * @time 2018/08/21.
 */

(function () {
    angular.module("app.office")
        .config(config);
    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state("notice", {
                url: '/notice',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './office/notice/notice.html',
                        controller: 'NoticeCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadNoticeFiles: loadNoticeFiles
                }
            })
            .state("training", {
                url: '/training',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './office/training/training.html',
                        controller: 'TrainingCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadTrainingFiles: loadTrainingFiles
                }
            })
            .state("regulatory", {
                url: '/regulatory',
                parent: "app",
                views: {
                    'panel@app': {
                        templateUrl: './office/regulatory/regulatory.html',
                        controller: 'RegulatoryCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    loadRegulatoryFiles: loadRegulatoryFiles
                }
            }).state("selfNotice", {
            url: '/selfNotice',
            params: {menuName: '通知列表'},
            parent: "app",
            views: {
                'panel@app': {
                    templateUrl: './office/selfNotice/selfNotice.html',
                    controller: 'SelfNoticeCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                loadNoticeFiles: loadSelfNoticeFiles
            }
        });
    }

    loadNoticeFiles.$inject = ['$ocLazyLoad'];

    function loadNoticeFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './office/notice/notice.controller.js',
            './office/office.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

    loadTrainingFiles.$inject = ['$ocLazyLoad'];

    function loadTrainingFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './office/training/training.controller.js',
            './office/office.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

    loadRegulatoryFiles.$inject = ['$ocLazyLoad'];

    function loadRegulatoryFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './office/regulatory/regulatory.controller.js',
            './office/office.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }
    loadSelfNoticeFiles.$inject = ['$ocLazyLoad'];

    /* @ngInject */
    function loadSelfNoticeFiles($ocLazyLoad) {
        return $ocLazyLoad.load([
            './office/selfNotice/selfNotice.controller.js',
            './office/selfNotice/selfNotice.service.js',
            'pagination',
            'chosen',
            'mCustomScrollbar',
            'My97DatePicker'
        ]);
    }

})();
