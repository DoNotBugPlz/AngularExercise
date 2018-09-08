(function () {
    'use strict';
    angular
        .module('app.monitoringPointWorker')
        .controller('MonitoringPointWriteCtrl', MonitoringPointWriteCtrl);
    MonitoringPointWriteCtrl.$inject = ['$scope', '$http', '$stateParams', 'SYSTEM', 'monitoringPointWriteService', 'pageInfDefault', 'ngDialog', '_'];

    /* @ngInject */
    function MonitoringPointWriteCtrl($scope, $http, $stateParams, SYSTEM, monitoringPointWriteService, pageInfDefault, ngDialog, _) {
        var vm = this;
        window.a = vm;
        vm.title = 'DesktopCtrl';
        vm.loadMonitoringPointWorkerList = loadMonitoringPointWorkerList;
        vm.uploadFile = uploadFile;
        vm.showImg = showImg;
        vm.delImg = delImg;
        vm.showGoodsInfo = showGoodsInfo;
        vm.checkPrice = checkPrice;
        vm.colsePop = colsePop;
        //重置
        vm.excelId = $stateParams.excelId || '';

        /*****/
        var setBarCodeManageList = setBarCodeManageList;
        var refreshList = refreshList;
        /*默认页码*/
        vm.currentPageInf = {
            pageNumber: pageInfDefault.pageNumberDefault,
            pageSize: pageInfDefault.pageSizeDefault
        };
        /*默认状态*/
        vm.category_status = [{id: 0, text: "待填报"}, {id: 1, text: "暂存"}, {id: 2, text: "退回"}];
        vm.monitoringPointWorkerList = [
            {
                id: 1,
                goodsname: "菜籽油",
                spec: "桶装一级压榨",
                measurement_unit: "元/5升",
                price: "80.00",
                remakr: "",
                filename: "Koala.jpg",
                fileid: "a08182bc6588a13b01658a6758270008183553"
            },
            {
                id: 2,
                goodsname: "菜籽油",
                spec: "桶装一级压榨",
                measurement_unit: "元/5升",
                price: "78.00",
                remakr: "",
                filename: ""
            },
            {
                id: 3,
                goodsname: "菜籽油",
                spec: "桶装一级压榨",
                measurement_unit: "元/5升",
                price: "79.00",
                remakr: "",
                filename: ""
            },
            {
                id: 4,
                goodsname: "菜籽油",
                spec: "桶装一级压榨",
                measurement_unit: "元/5升",
                price: "69.70",
                remakr: "",
                filename: ""
            },
            {
                id: 5,
                goodsname: "大豆油",
                spec: "桶装一级浸出",
                measurement_unit: "元/5升",
                price: "42.00",
                remakr: "",
                filename: ""
            }, {
                id: 6,
                goodsname: "大豆油",
                spec: "桶装一级浸出",
                measurement_unit: "元/5升",
                price: "42.60",
                remakr: "",
                filename: ""
            },
            {
                id: 7,
                goodsname: "花生油",
                spec: "桶装一级压榨",
                measurement_unit: "元/5升",
                price: "139.30",
                remakr: "",
                filename: ""
            }
        ];
        _.map(vm.monitoringPointWorkerList, function (item) {
            item.pricenew = item.price;
        })
        activate();

        ////////////////
        function activate() {
            // loadMonitoringPointWorkerList();
        }

        function showImg(n) {
            vm.fileid = n.fileid;
            // vm.fileList = list;
            $("#imgPop").show();

        }

        function checkPrice(n) {
            var oldPrice = Number(n.pricenew);
            var newPrice = Number(n.price);
            var temp = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
            if (Math.abs(temp) > 80) {
                if (temp > 0) {
                    vm.priceChange = "上涨了" + temp;
                    n.price = Number(n.price).toFixed(2);
                    $("#price" + n.id).css('color', 'red');
                } else {
                    vm.priceChange = "下跌了" + Math.abs(temp);
                    n.price = Number(n.price).toFixed(2);
                    $("#price" + n.id).css('color', 'green');
                }
                $("#priceChange").show();
            } else {
                if (temp > 0) {
                    n.price = Number(n.price).toFixed(2);
                    $("#price" + n.id).css('color', 'red');
                } else {
                    n.price = Number(n.price).toFixed(2);
                    $("#price" + n.id).css('color', 'green');
                }
            }
        }


        function showGoodsInfo(n) {
            vm.goodsname = n.goodsname;


            $("#goodsInfo").show();
            // var goodsId = n.id;
            // ngDialog.open({
            //     title: "商品详情",
            //     template: "monitoringPoint/goodsInfo/goodsInfo.html",
            //     height: '400px',
            //     width: '600px',
            //     controller: 'goodsInfoCtrl as vm',
            //     data: goodsId,
            //     resolve: {
            //         loadGoodsInfoFiles: function ($ocLazyLoad) {
            //             return $ocLazyLoad.load([
            //                 './monitoringPoint/goodsInfo/goodsInfo.controller.js',
            //                 './monitoringPoint/goodsInfo/goodsInfo.service.js',
            //                 'ng-zTree',
            //                 'My97DatePicker'
            //             ]);
            //         }
            //     }
            // });


        }

        function colsePop() {
            $(".popupBg").hide();
        }

        function uploadFile(n) {
            $("#fileName").click().off('change').on('change', function (e) {
                var file = document.getElementById("fileName").files[0];
                var formDate = new FormData();
                formDate.append("Filedata", file);
                formDate.append("tablename", "t_test_point");
                formDate.append("colname", "priceImg");
                formDate.append("recordid", n.id);
                //上传附件
                $http({
                    url: "../Common/SaveFiles.do",
                    method: 'POST',
                    headers: {"Accept": undefined, "Content-Type": undefined},
                    data: formDate,
                    transformRequest: angular.identity
                }).then(function (response) {
                    _.forEach(vm.monitoringPointWorkerList, function (e) {
                        if (e.id == n.id) {
                            e.filename = response.data[0].filename;
                            e.fileid = response.data[0].id;
                        }

                    })

                });

            });
        }

        function delImg(fileid) {
            $http({
                url: "../Sys_attachfile/DeleteList.do",
                method: 'post',
                data: {ids: fileid},
                headers: {"RequestType": SYSTEM.RequestParamType}
            }).then(function (response) {
                vm.monitoringPointWorkerList[0].fileid = "";
                $("#imgPop").show();
            });
        }

        // function swiper() {
        //     //弹窗脚本
        //     var mySwiper = new Swiper('.swiper-container', {
        //         pagination: '',
        //         loop: false,
        //         spaceBetween: 20,
        //         grabCursor: true,
        //         paginationClickable: true
        //     });
        //     $('.arrow-left').on('click', function (e) {
        //         e.preventDefault();
        //         mySwiper.swipePrev();
        //         $(".arrow-right").removeClass("disabled");
        //         setTimeout(function () {
        //             if ($(".swiper-slide.swiper-slide-active").index() == 0) {
        //                 $(".arrow-left").addClass("disabled");
        //             }
        //         }, 100);
        //     });
        //     $('.arrow-right').on('click', function (e) {
        //         e.preventDefault();
        //         mySwiper.swipeNext();
        //         $(".arrow-left").removeClass("disabled");
        //         setTimeout(function () {
        //             if ($(".swiper-slide.swiper-slide-active").index() == $(".swiper-slide").length - 1) {
        //                 $(".arrow-right").addClass("disabled");
        //             }
        //         }, 100);
        //     })
        //
        // }


        //加载数据列表
        function loadMonitoringPointWorkerList(pageNumber, pageSize) {
            var pageInf = {
                pageNumber: pageNumber || vm.currentPageInf.pageNumber,
                pageSize: pageSize || vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInf, vm.searchParams);
            vm.currentPageInf = angular.extend(vm.currentPageInf, pageInf);
            monitoringPointWriteService.loadMonitoringPointWorkerList(params)
                .then(function (response) {
                    setBarCodeManageList(response, params.pageNumber)
                });
        }

        //刷新列表
        function refreshList() {
            loadMonitoringPointWorkerList(vm.currentPageInf.pageNumber, vm.currentPageInf.pageSize)
        }

        function setBarCodeManageList(response, pageNum) {
            var result = response.data;
            vm.monitoringPointWorkerList = result.rows;
            _.map(vm.monitoringPointWorkerList, function (item) {
                item.pricenew = item.price;
            })
            vm.monitoringPointWorkerListPage = angular.extend({
                pageTurn: 'loadMonitoringPointWorkerList',
                pagenum: pageNum
            }, result);
        }

    }

})();

