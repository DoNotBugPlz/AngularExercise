/**
 * Created by chencl@1193 on 2018/03/12.
 */
(function () {
    'use strict';

    angular
        .module('app.dataImport')
        .controller('PicShowCtrl', PicShowCtrl);

    PicShowCtrl.$inject = ['SYSTEM', '$scope'];

    /* @ngInject */
    function PicShowCtrl(SYSTEM, $scope) {
        var vm = this;
        $scope.picShowCtrl = vm;
        vm.img_arr = JSON.parse($scope.img_arr);
        vm.current_pkid = $scope.current_pkid;
        var appConfig = SYSTEM.appConfig;
        /////////
        /***图片点击放大***/
        $scope.css_path = appConfig + "css/picshow/picshow.css";
        $scope.errorPic = "../styles/images/picShow/no_show.jpg";
        var defaultImg = {pkid:"pic_" + Math.random(),file_name:"沒有图片",download_path:$scope.errorPic};
        var picArr = [];
        angular.forEach(vm.img_arr,function (item) {
            defaultImg = {pkid:"pic_" + Math.random(),file_name:"沒有图片",download_path:$scope.errorPic};
            picArr.push(angular.extend(defaultImg,item));
        });
        if(picArr.length == 0) picArr.push(defaultImg);
        angular.extend($scope,{
            pic_loading:true,//图片加载中
            dataArr:picArr,//图片列表
            showIndex:0,//默认展示第一个图片,
            showImg:{},//当前展示的图片对象
            imgStyle:{top:"0",left:"0",width:0,height:0},
            changeIndex:function (num) {//切换图片
                var newIndex = $scope.showIndex + num;
                if(newIndex < 0 || newIndex > $scope.dataArr.length - 1) return;
                $scope.showImgByIndex(newIndex);
            },
            showImgByIndex:function (index) {
                $scope.showIndex = Math.min(Math.max(index,0),$scope.dataArr.length - 1);
                $scope.pic_loading = true;
                var currItem = $scope.dataArr[$scope.showIndex];
                setImgLoader(currItem.download_path);
            },
            loadImg:function (imgLoader) {//加载图片
                $scope.pic_loading = false;
                $scope.showImg.file_name = $scope.dataArr[$scope.showIndex].file_name;
                $scope.showImg.href = imgLoader.src;
                $scope.showImg._w = imgLoader.width;
                $scope.showImg._h = imgLoader.height;
                $scope.initImg();
            },
            initImg:function () {//初始化图片
                $scope.showImg.scale = 100;
                $scope.showImg.step = 0;
                $scope.scaleImg(0);
            },
            scaleImg:function (pot) {//缩放图片
                var ratio = 1.2;
                var new_scale = (pot > 0) ? $scope.showImg.scale * ratio
                    : (pot < 0) ? $scope.showImg.scale / ratio
                    : $scope.showImg.scale;
                new_scale = new_scale.toFixed(0);
                new_scale = Math.min(1600,Math.max(5,new_scale));
                if(new_scale > 90 && new_scale < 110) new_scale = 100;

                $scope.showImg.scale = new_scale;

                var w = $scope.showImg._w * $scope.showImg.scale / 100;
                var h = $scope.showImg._h * $scope.showImg.scale / 100;
                var panelWidth = 868,panelHeight = 553;
                var left = (panelWidth - w) / 2;
                var top = (panelHeight - h) / 2;
                $scope.imgStyle = angular.extend($scope.imgStyle,{top:top,left:left,width:w,height:h});
            },
            //翻转图片
            rotateImg:function () {
                $scope.showImg.step++;
                if($scope.showImg.step==4) $scope.showImg.step = 0;
                if(document.all){
                    $scope.imgStyle.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + $scope.showImg.step + ')';
                }else{
                    $scope.imgStyle.transform = "rotate("+($scope.showImg.step*90)+"deg)";
                }
            },
            downloadFile: function(){
                toastr['error']('暂无下载功能！');
                return;
                if($scope.showImg.href) $scope.downloadPostFile($scope.showImg.href);
            }
        });
        //鼠标滚轮事件
        function addMousewheel() {
            var isFirefox = navigator.userAgent.indexOf("Firefox") > -1 ;
            var MOUSEWHEEL_EVENT = isFirefox ? "DOMMouseScroll" : "mousewheel";

            var ele = document.getElementById("201710191717picpanel");
            if(!ele) return;

            if(ele.attachEvent){
                ele.attachEvent("on"+MOUSEWHEEL_EVENT, function(e){
                    mouseWheelScroll(e);
                });
            } else if(ele.addEventListener){
                ele.addEventListener(MOUSEWHEEL_EVENT, function(e){
                    mouseWheelScroll(e);
                }, false);
            }

            function mouseWheelScroll(e){
                var _delta = parseInt(e.wheelDelta || -e.detail);
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.scaleImg(_delta > 0 ? 1 : -1);
                    });
                },100);
            }
        }
        //鼠标拖拽
        function addMouseDrag() {
            var drag = {_move:0,pageX:0,pageY:0};
            jQuery("#201710191717picpanel .pic_content").bind("mousedown",startDrag);
            jQuery("#201710191717picpanel .pic_content").bind('mousemove',moveDrag);
            jQuery("#201710191717picpanel .pic_content").bind('mouseup',stopDrag);
            jQuery("#201710191717picpanel .pic_content").bind('mouseout',stopDrag);
            function startDrag(e) {
                drag.pageX = e.pageX || e.clientX;
                drag.pageY = e.pageY || e.clientY;
                drag._move = 1;
                e.stopPropagation();
            }
            function moveDrag(e) {
                if(drag._move){
                    var nextDragX = e.pageX || e.clientX;
                    var nextDragY = e.pageY || e.clientY;

                    var style = angular.extend({},$scope.imgStyle);
                    style.left += (nextDragX - drag.pageX) / 1;
                    style.top += (nextDragY - drag.pageY) / 1;
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.imgStyle = style;
                        });
                    },100);

                    drag.pageX = nextDragX;
                    drag.pageY = nextDragY;

                    e.stopPropagation();
                    return false;
                }
            }
            function stopDrag(e) {
                drag.pageX = 0;
                drag.pageY = 0;
                drag._move = 0;
                e.stopPropagation();
            }
        }
        //图片加载
        function setImgLoader(href){
            var imgLoader = new Image();
            imgLoader.onerror = function() {
                setImgLoader($scope.errorPic);
            };
            imgLoader.onload = function() {
                imgLoader.onerror = imgLoader.onload = null;
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.loadImg(imgLoader);
                    });
                },100);
            };
            imgLoader.src = href;
        }
        function getPicItemIndex(pkid){
            if(!pkid) return 0;
            var index = 0;
            angular.forEach($scope.dataArr,function(n,i){
                if(n.pkid == pkid) index = i;
            });
            return index;
        }

        //默认一个图片
        $scope.showImgByIndex(getPicItemIndex(vm.current_pkid|| ""));
        //鼠标事件
        addMousewheel();
        addMouseDrag();
    }

})();

