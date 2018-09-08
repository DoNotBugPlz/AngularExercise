/**
 * @author maxzhao
 * @time 2018/09/05.
 */
(function () {
    'use strict';

    angular
        .module('app.querymonitordatashare')
        .controller('QuerymonitordatashareCtrl', QuerymonitordatashareCtrl);
    QuerymonitordatashareCtrl.$inject = ['$scope', 'querymonitordatashareService', 'pageInfDefault', 'ngDialog', '$sce', '$q', '_', '$window', 'SYSTEM'];

    /* @ngInject */
    function QuerymonitordatashareCtrl($scope, querymonitordatashareService, pageInfDefault, ngDialog, $sce, $q, _, $window, SYSTEM) {
        var vm = this;
        window.vm = vm;
        vm.title = 'QuerymonitordatashareCtrl';
        var loadAllosSuccess = loadAllowSuccess;
        var loadListSuccess = loadListSuccess;
        var fineLoginView = fineLoginView;
        var fineLoginAdmin = fineLoginAdmin;
        var fineLoginSuccess = fineLoginAdminSuccess;
        /**
         * 初始化时,创建fine模板
         * 新建时创建模板
         * @param fineDatas = []
         * @returns {null}
         */
        var createFineList = createFineList;
        /** 自动检查数据库中数据，对没有创建fine文件的数据进行创建 */
        var searchDataByNoUrlSuccess = searchDataByNoUrlSuccess;
        vm.loadList = loadList;
        vm.reset = reset;
        /***批量选择控制**/
        vm.selectAll = selectAll;
        vm.selectItem = selectItem;

        /** 操作 **/
        vm.save = addData;
        vm.delData = delData;
        vm.delSelectData = delSelectData;
        vm.viewData = viewData;
        vm.editData = editData;
        /** 共享/取消共享 **/
        vm.is_publicData = is_publicData;
        /** 取消收藏 **/
        vm.cancelCollctData = cancelCollctData;
        vm.cancelCollctDataList = cancelCollctDataList;
        /** 查看他人分享 **/
        vm.viewAllCollect = viewAllCollect;

        function selectAll() {
            vm.allSelected = !vm.allSelected;
            if (!angular.isUndefined(vm.dataList)) {
                _.forEach(vm.dataList, function (item) {
                    item.selected = vm.allSelected;
                });
            }
        }

        function selectItem(item) {
            item.selected = !item.selected;
        }

        function active() {
            /*默认页码*/
            vm.currentPageInf = {
                pageNumber: pageInfDefault.pageNumberDefault,
                pageSize: pageInfDefault.pageSizeDefault
            };
            $q.all([
                querymonitordatashareService.loadList(vm.currentPageInf)
            ]).then(loadAllosSuccess).then(fineLoginView);
        }

        function loadAllowSuccess(responses) {
            loadListSuccess(responses[0]);
        }

        //region fine
        //region fine login
        function fineLoginView() {
            jQuery.ajax({
                url: SYSTEM.FineBIURL + '?op=fs_load&cmd=sso',
                dataType: 'jsonp',
                data: {'fr_username': 'user1', 'fr_password': 'user1'},
                jsonp: 'callback',
                timeout: 5000,
                success: function (data) {
                    if (data.status === 'success') {
                    } else if (data.status === 'fail') {
                    }
                },
                error: function () {
                    console.log('error');
                }
            });
        }

        function fineLoginAdmin() {
            jQuery.ajax({
                url: SYSTEM.FineBIURL + '?op=fs_load&cmd=sso',
                dataType: 'jsonp',
                data: {'fr_username': 'sky', 'fr_password': 'sky'},
                jsonp: 'callback',
                timeout: 5000,
                success: function (data) {
                    if (data.status === 'success') {
                        fineLoginSuccess();
                    } else if (data.status === 'fail') {
                    }
                },
                error: function () {
                    console.log('error');
                }
            });
        }

        function fineLoginAdminSuccess() {
            querymonitordatashareService.searchDataByNoUrl()
                .then(searchDataByNoUrlSuccess).then(createFineList);
        }

        //endregion
        //region 初始化处理创建fine报表失败的实体
        function searchDataByNoUrlSuccess(response) {
            var fineDatas = response.data.rows;
            return (fineDatas);
        }

        /* 首先确定登录的是管理员 */
        function createFineList(fineDatas) {
            _.forEach(fineDatas, function (fineData) {
                jQuery.ajax({
                    url: SYSTEM.FineBIURL + '?op=api&cmd=add_report',
                    dataType: 'jsonp',
                    data: {
                        'realTime': true,
                        'reportName': fineData.id
                    },
                    jsonp: 'callback',
                    timeout: 5000,
                    success: function (data) {
                        var params = {};
                        params.id = fineData.id;
                        params.report_id = data.result.reportId;
                        params.build_url = data.result.buildUrl;
                        querymonitordatashareService.save(params).then(function (response) {
                            // shareViewRole(fineData.id, data.result.reportId);
                            loadList();
                        });
                    },
                    error: function () {
                    }
                });
            });
        }

        /* 创建模板之后挂出模板 */
        function shareViewRole(reportName, reportId) {
            //32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=hangout_report_to_plate&_=0.11645705485716462
            //POST
            //report:{"reportName":"2","reportId":210,"createBy":-999,"text":"2","description":"","parentId":"78"}
            //isPlate:true
            var report = {
                "reportName": "2",
                "reportId": 210,
                "createBy": -999,
                "text": "2",
                "description": "",
                "parentId": "78"
            };
            var xhr = new XMLHttpRequest();
            xhr.open('post', SYSTEM.FineBIURL + '?op=fr_bi&cmd=hangout_report_to_plate&_=0.11645705485716462', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-url');
            xhr.setRequestHeader('cookie', 'JSESSIONID=BDB8A9E8437A3E608834A5B8847D0A43; 16-999=52766; 148-999=60148; 149-999=26429; 146-999=97412; 145-999=605; 144-999=22874; 183-999=1506; 182-999=33031; 188-999=23201; 194-999=99362; 176-999=17082; 202-999=81061; 199-999=71092; 204-999=97742; 207-999=6854; 206-999=98267; 208-999=559; 205-999=93430; 155-999=85516; 153-999=95051; 152-999=63605; 186-999=90818; 209-999=3133; 211-999=69155; 210-999=73165; 44102=19833; 46102=14878; 213-999=93854; lastLoginedAt=1535636272640; lastLoginedIp=""; lastLoginedShow=false; lastLoginedCity=""; fr_remember=false; fr_password=""; fr_username=sky');
            xhr.send({"report": report, "isPlate": true});
            /* jQuery.ajax({
                 url: SYSTEM.FineBIURL + '?op=fr_bi&cmd=hangout_report_to_plate&_=0.11645705485716462',
                 method: 'POST',
                 dataType: 'json',
                 data: {
                     'report': report,
                     'isPlate': true
                 },
                 jsonp: 'callback',
                 timeout: 5000,
                 success: function (data) {
                     console.log('success');
                     console.log(data);
                     //{"sortindex":0,"nodeicon":"bi","reportId":183,"reportName":"131","parentDeviceConfig":7,"description":"","type":"7","parentId":"078","createBy":-999,"bilink":"?op=fr_bi&cmd=bi_init&id=183&show=_bi_show_&createBy=-999","bih5link":"?op=fr_bi_h5&cmd=h5_init&id=183&createBy=-999","mobileDeviceConfig":7,"id":"7257","text":"131","mobileCoverId":"s","value":"7257"}
                 },
                 error: function (data) {
                     console.log(data);
                 }
             });*/
        }

        //endregion
        //endregion
        function loadList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            querymonitordatashareService.loadList(params).then(loadListSuccess);
        }

        function reset() {
            vm.searchParams = {};
        }

        function loadListSuccess(response) {
            vm.dataList = response.data.rows;
            vm.dataListPage = angular.extend({
                pageTurn: 'dataListPage',
                pagenum: vm.currentPageInf.pageNumber
            }, response.data);
        }

        function addData(fineData) {
            var xhr = new XMLHttpRequest();
            xhr.open('post','http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=hangout_report_to_plate&_=0.06358614197274748',true);
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
            xhr.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
            xhr.setRequestHeader("Connection", "keep-alive");
            //      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xhr.setRequestHeader("Cookie",// Cookie == null ? "" : Cookie.toString());
                "JSESSIONID=40C405803A8DAC551C2682F24F6F66D0; fr_remember=false; fr_password=\"\"; fr_username=" +
                "sky" +
                "; _ga=GA1.1.2010333435.1493111932; Hm_lvt_407473d433e871de861cf818aa1405a1=1494208070,1494227597,1494238947,1494292415; Hm_lpvt_407473d433e871de861cf818aa1405a1=1494297516");
            xhr.setRequestHeader("Host", '32.1.0.33:37799');
            xhr.setRequestHeader("Origin", "http://32.1.0.33:37799/WebReport/ReportServer");
            xhr.setRequestHeader("Referer", "http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=hangout_report_to_plate&_=0.06358614197274748");
            xhr.setRequestHeader("User-Agent", "User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36");
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var pa= 'report={"reportName":"4123","reportId":210,"createBy":-999,"text":"131232","description":"","parentId":"78"}&isPlate=true';
            xhr.send(pa);
            return ;
            shareViewRole();

              var formData = new FormData();
              formData.append('report', '{"reportName":"4123","reportId":210,"createBy":-999,"text":"131232","description":"","parentId":"78"}');
              formData.append('isPlate', true);
              jQuery.ajax({
                  type: 'POST',
                  url: 'http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=bi_init_created_by_me',
                  data: formData,
                  beforeSend: function (request) {
                      request.setRequestHeader("Accept", "*/*");
                      request.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
                      request.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
                      request.setRequestHeader("Connection", "keep-alive");
  //      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                      request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                      request.setRequestHeader("Cookie",// Cookie == null ? "" : Cookie.toString());
                          "JSESSIONID=40C405803A8DAC551C2682F24F6F66D0; fr_remember=false; fr_password=\"\"; fr_username=" +
                          "sky" +
                          "; _ga=GA1.1.2010333435.1493111932; Hm_lvt_407473d433e871de861cf818aa1405a1=1494208070,1494227597,1494238947,1494292415; Hm_lpvt_407473d433e871de861cf818aa1405a1=1494297516");
                      request.setRequestHeader("Host", '32.1.0.33:37799');
                      request.setRequestHeader("Origin", "http://32.1.0.33:37799/WebReport/ReportServer");
                      request.setRequestHeader("Referer", "http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=bi_init_created_by_me");
                      request.setRequestHeader("User-Agent", "User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36");
                      request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                  },
                  success: function (resonse) {

                      console.log('success')
                      console.log(response.data)
                  },
                  error: function (response) {
                      console.log('error')
                      console.log(response.data)
                  }
              });
              return;
            if (!fineData) {
                fineData = {};
                var name = prompt('请输入查询配置名', '');
                fineData.name = name;
            }
            if (fineData.name) {
                querymonitordatashareService.save(fineData)
                    .then(addDataSuccess).then(loadList);
            }
            /* 点击确定，配置名为空 */
            if (!fineData.name && fineData.name != null) {
                AppTools.errorTips("配置名不能为空");
            }
        }

        function addDataSuccess(response) {
            vm.finedata = response.data;
            if (!vm.finedata.build_url) {
                createFineList([{'id': vm.finedata.id}]);
            }
            return null;
        }

        function viewData(item) {
            var title = '查询';
            var params = {
                'is_view': 1,
                'biUrl': item.build_url
            };
            opNgDialog(title, params);
        }

        function editData(item) {
            fineLoginAdmin();
            var title = '修改查询';
            if (!item.build_url) {
                $q.all([
                    querymonitordatashareService.login()
                    , querymonitordatashareService.searchDataByNoUrl()
                ]).then(loadFineSuccess);
            }
            var params = {
                'is_edit': 1,
                'biUrl': item.build_url
            };
            opNgDialog(title, params);
        }

        function opNgDialog(title, params) {
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template: "priceMonitorGoods/queryAnalysisDataShare/detail/querymonitordatashare.detail.html",
                height: height * 0.9 + 'px',
                width: width * 0.9 + 'px',
                controller: 'QuerymonitordatashareDetailCtrl as vm',
                data: params,
                resolve: {
                    loadEditFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorGoods/queryAnalysisDataShare/detail/querymonitordatashare.detail.controller.js',
                            './priceMonitorGoods/queryAnalysisDataShare/detail/querymonitordatashare.detail.service.js'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    fineLoginView();
                }
            });
        }
        function opParamsNgDialog(title, params) {
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: title,
                template: "priceMonitorGoods/queryAnalysisDataShare/selectParams/querymonitordatashare.selectParams.html",
                height: height * 0.9 + 'px',
                width: width * 0.9 + 'px',
                controller: 'QuerymonitordatashareSelectParamsCtrl as ps',
                data: params,
                resolve: {
                    loadEditFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorGoods/queryAnalysisDataShare/selectParams/querymonitordatashare.selectParams.controller.js',
                            './priceMonitorGoods/queryAnalysisDataShare/selectParams/querymonitordatashare.selectParams.service.js'
                        ]);
                    }
                },
                preCloseCallback: function () {

                }
            });
        }
        function is_publicData(item) {
            item.data_type = (!item.data_type) ? 1 : 0;
            if (item.data_type) {
                var params = {'config_id': item.id};
                ngDialog.open({
                    title: '选择共享人',
                    template: "priceMonitorGoods/queryAnalysisDataShare/object_list/object_list.html",
                    height: '800px',
                    width: '800px',
                    controller: 'objectListCtrl as vm',
                    data: params,
                    resolve: {
                        loadEditFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './priceMonitorGoods/queryAnalysisDataShare/object_list/object_list.controller.js',
                                './priceMonitorGoods/queryAnalysisDataShare/object_list/object_list.service.js',
                                'mCustomScrollbar'
                            ]);
                        }
                    },
                    preCloseCallback: function (callBackData) {
                        if (callBackData && callBackData.userList) {
                            var user_ids = _.map(callBackData.userList, function (user) {
                                return user.id;
                            });
                            var params = {};
                            params.id = item.id;
                            params.data_type = (!item.data_type) ? 1 : 0;
                            params.user_ids = user_ids;
                            querymonitordatashareService.save(params).then(function (response) {
                                if (response.data && response.data.id) {
                                    item = response.data;
                                    item.data_type = (!item.data_type) ? 1 : 0;
                                }
                            });
                        }
                    }
                });
            } else {
                var params = {};
                params.id = item.id;
                params.data_type = (!item.data_type) ? 1 : 0;
                querymonitordatashareService.save(params).then(function (response) {
                    if (response.data && response.data.id) {
                        item = response.data;
                    }
                });
            }
        }

        function cancelCollctDataList() {
            cancelCollctData({'id': getAllSelectId().join(',')});
        }

        function getAllSelectId() {
            return _.map(_.filter(vm.dataList, function (item) {
                return item.selected;
            }), function (item) {
                return item.id;
            });
        }

        function cancelCollctData(item) {
            if (angular.isUndefined(item.id) || item.id === '') {
                AppTools.errorTips("请选择要取消收藏的记录");
                return;
            }
            AppTools.confirm("确定收藏所选记录吗？", function () {
                querymonitordatashareService.cancelCollctData({'ids': item.id}).then(function (response) {
                    if (response.data) {
                        loadList();
                        AppTools.successTips("取消收藏的成功");
                    }
                });
            });

        }

        function delData(item) {
            if (angular.isUndefined(item.id) || item.id == '') {
                AppTools.errorTips("请选择要删除的记录!");
                return;
            }
            AppTools.confirm("确定删除所选记录吗？", function () {
                querymonitordatashareService.delData({'ids': item.id}).then(function (response) {
                    if (response.data) {
                        loadList();
                        AppTools.successTips("删除的成功");
                    }
                });
            });
        }

        function delSelectData(item) {
            delData({'id': getAllSelectId().join(',')});
        }

        function viewAllCollect() {
            var height = $window.innerHeight;
            var width = $window.innerWidth;
            ngDialog.open({
                title: '查看其它共享',
                template: "priceMonitorGoods/queryAnalysisDataShare/otherShare/querymonitordatashare.otherShare.html",
                height: height * 0.9 + 'px',
                width: width * 0.9 + 'px',
                controller: 'QuerymonitordatashareOtherShareCtrl as os',
                // data: params,
                resolve: {
                    loadEditFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            './priceMonitorGoods/queryAnalysisDataShare/otherShare/querymonitordatashare.otherShare.controller.js',
                            './priceMonitorGoods/queryAnalysisDataShare/otherShare/querymonitordata.otherShare.service.js'
                        ]);
                    }
                },
                preCloseCallback: function () {
                    loadList();
                }
            });
        }

        $scope.$watch("vm.searchParams.is_collect", function (newVal, oldVal) {
            if (newVal != oldVal) {
                loadList(pageInfDefault.pageNumberDefault, vm.currentPageInf.pageSize);
            }
        });
        active();

    }
})();


