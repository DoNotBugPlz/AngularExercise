/**
 * Created by yzr on 2018/08/16.
 */
(function (rootPath) {
    'use strict';
    angular
        .module('app.core')
        .directive('attachFileList', attachFileListDirective);
    attachFileListDirective.$inject = ['$','$compile','$http','_','SYSTEM','ngDialog'];
    /* @ngInject */
    function attachFileListDirective($, $compile,$http,_,SYSTEM,ngDialog) {
        var canViewFileTypeImg=["jpg","png","bmp","gif"];
        var canViewFileTypeOffice=["doc","docx",'xls','xlsx','ppt','pptx','pdf'];
        var canEditFileType=["doc","docx",'xls','xlsx','ppt','pptx'];
        //_.indexOf([1, 2, 1, 2], 2);
        var defaultOptions = {
            fileListTitle:"附件列表",
            showOp:true,
            opDetail:{
                downLoadOpShow:true,//显示下载
                deleteOpShow:true,//显示删除
                uploadOpShow:true,//显示上传
                viewOpShow:true,//显示预览
                editOpShow:true//显示编辑
            },
            downLoadUrl:rootPath+"Common/DownLoadFile.do?fileid=",
            deleteFileList:rootPath+"Sys_attachfile/DeleteList.do",
            uploadUrl:rootPath+"Common/SaveFiles.do",
            uploadOtherParams:{},//上传附件传递额外参数
            uploadSuccess:"",
            loadFileListUrl:rootPath+"Common/loadFileList.do",//加载附件列表URl
            loadFileListOtherParams:{},//加载附件列表传递额外参数 ｛"tab_name":"notice","col_name":"upload","recordid":"1111"｝
            tab_name:"",
            col_name:"",
            recordid:""
        };
        var defaultLoadOptions = {
            loadFileListOtherParams:{},//加载附件列表传递额外参数
            tab_name:"",
            col_name:"",
            recordid:""
        };
        var directive = {
            restrict: 'EA',
            link: link,
            controller:controller,
            controllerAs:"vm",
            scope:{
                "attachFileListInitOptions": "=",
                "attachFileListLoadOptions": "="
            }
        };
        return directive;
        function controller($scope) {
            var vm = this;
            vm.searchParam = {};
            $scope.$watch('attachFileListInitOptions', function (value) {
                if(value){
                    var options = angular.extend({}, defaultOptions, value);
                    options.dataListStr = options.tab_name+"_"+options.col_name+"_fileList";
                    options.fileStr = options.tab_name+"_"+options.col_name+"_file";
                    vm.selectItem = function(n,$event){
                        n.selected = !n.selected;
                        $event.stopPropagation();
                    }
                    vm.viewFile = function (fileInf) {
                        var extname = fileInf.extname;
                        var fileName = fileInf.filename;
                        if(extname.indexOf(".")==0){
                            extname = extname.replace(".","");
                        }
                        if(_.indexOf(canViewFileTypeOffice,extname)>-1){
                            var params = {
                                editAble:false,
                                officeId:fileInf.id,
                                fileName:fileName
                            };
                            AppTools.opWebOffice(ngDialog,fileName,params,function () {
                                vm.loadFileList(vm.searchParam);
                            })
                        }else if(_.indexOf(canViewFileTypeImg,extname)>-1){
                            var params = {
                                imgId:fileInf.id,
                            };
                            opImg(fileName,params);
                        }

                    };
                    vm.showEditFileButton = function(fileInf){
                        var extname = fileInf.extname;
                        if(extname.indexOf(".")==0){
                            extname = extname.replace(".","");
                        }
                        if(_.indexOf(canEditFileType,extname)>-1){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    vm.showViewFileButton = function(fileInf){
                        var extname = fileInf.extname;
                        if(extname.indexOf(".")==0){
                            extname = extname.replace(".","");
                        }
                        if(_.indexOf(canViewFileTypeImg,extname)>-1||_.indexOf(canViewFileTypeOffice,extname)>-1){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    vm.editFile = function (fileInf){
                        var params = {
                            editAble:true,
                            officeId:fileInf.id,
                            fileName:fileInf.filename
                        };
                        AppTools.opWebOffice(ngDialog,fileInf.filename,params,function () {
                            vm.loadFileList(vm.searchParam);
                        })
                    }
                    vm.loadFileList = function(params){
                        $http({
                            url: options.loadFileListUrl,
                            method: 'get',
                            params:params
                        }).then(function (response) {
                            vm[options.dataListStr] = {};
                            if(response.data&&response.data.rows){
                                vm[options.dataListStr]=response.data.rows;
                            }
                        });
                    };
                    vm.uploadFile = function () {
                        $("#"+options.fileStr).click();
                    };
                    vm.delFileList = function(){
                        var idList = [];
                        _.forEach(vm[options.dataListStr],function (e) {
                            if(e.selected){
                                idList.push(e.id);
                            }
                        });
                        $http({
                            url: options.deleteFileList,
                            method: 'post',
                            data:{ids:idList.join(",")},
                            headers:{"RequestType":SYSTEM.RequestParamType}
                        }).then(function (response) {
                            vm.loadFileList(vm.searchParam);
                        });
                    };

                    var opImg = function (title,params) {


                    };
                }
            },true);
            $scope.$watch('attachFileListLoadOptions', function (value) {
                if(value){
                    var options = angular.extend({}, defaultLoadOptions, value);
                    var params = {
                        tab_name:options.tab_name,
                        col_name:options.col_name,
                        recordid:options.recordid
                    };
                    vm.searchParam = angular.extend({}, params, options.loadFileListOtherParams);
                    vm.loadFileList(vm.searchParam);
                }
            },true);

        }
        function link(scope, element, attrs) {
            scope.$watch('attachFileListInitOptions', function (value) {
                if(value){
                    var options = $.extend(true,{}, defaultOptions, value);
                    initTabHtml(scope,element,options);
                }
            },true);
        }
        function initTabHtml(scope,element,options) {
            options.dataListStr = options.tab_name+"_"+options.col_name+"_fileList";
            options.fileStr = options.tab_name+"_"+options.col_name+"_file";
            var tabHearOpStr = "<div class=\"dataContentTop\"  style='border: none;'>\n" +
                "<input type='file'   style='display: none' id='"+options.fileStr+"'>"+
                "            <div class=\"listStyle pull-left\">"+options.fileListTitle+"</div>\n" +
                "            <div class=\"btnOper pull-right\">\n";
            if(options.showOp&&options.recordid) {
                if (options.opDetail.uploadOpShow) {
                    tabHearOpStr+="<span class=\"btn1\" ng-click=\"vm.uploadFile()\">新增\t</span>\n";
                }
                if (options.opDetail.deleteOpShow) {
                    tabHearOpStr+="<span class=\"btn1\" ng-click=\"vm.delFileList()\">删除</span>\n";
                }
            }
            tabHearOpStr+="            </div>\n" +
                "        </div>";
            var tabHeadStr =  $("<div class=\"table-thead\">"+
                "                    <table cellpadding=\"0\" cellspacing=\"0\"  style=\"table-layout: fixed\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                    </table>\n" +
                "                </div>\n");
            var tabNoDataStr = $("<div id=\"query_nothing\" class=\"nothing nothingTop\" style='margin-top: 0px' \n" +
                "                     ng-show=\"!!!vm."+options.dataListStr+"||vm."+options.dataListStr+".length==0\">\n" +
                "                    <span></span>暂无数据\n" +
                "                </div>");
            var tabContentStr = $("<div class=\"table-tbody\" style='position: absolute;border: none;top:40px;bottom: 0px' m-custom-scrollbar>\n" +
                "                    <table id=\"query-list-panel\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout: fixed\"\n" +
                "                           ng-hide=\"!!!vm."+options.dataListStr+"||vm."+options.dataListStr+".length==0\">\n" +
                "                        <tbody>\n" +
                "                        <tr ng-repeat=\"n in vm."+options.dataListStr+" track by $index\" ng-class-even=\"'bgcolor'\"\n" +
                "                            ng-class=\"{'false':'','true':'selected'}[n.selected]\">\n" +
                "                        </tr>\n" +
                "                        </tbody>\n" +
                "                    </table>\n" +
                "                </div>");
            var tabHeadThStr = "";
            var tabContentTdStr = "";
            tabHeadThStr += " <th width=\"5%\">\n" +
                "                     <input style='width: 40%' type=\"checkbox\" ng-model=\"allSelected\" />\n" +
                "                  </th>";
            tabContentTdStr+="<td width=\"5%\" ng-click=\"vm.selectItem(n,$event)\">\n" +
                " <a href=\"javascript:;\" class=\"ipt_check\" ng-model=\"n.selected\" ng-class=\"{true:'checked',false:''}[n.selected]\"></a>"+
                // "                 <input  style='width: 40%;border: none' type=\"checkbox\" ng-click=\"$event.stopPropagation();\"  ng-model=\"n.selected\" />\n" +
                "            </td>"
            tabHeadThStr+="<th width=\"5%\">序号</th>\n";
            tabHeadThStr+="<th width=\"70%\">文件名</th>\n";
            tabContentTdStr += "<td  width=\"5%\">{{ $index + 1 }}</td>\n";
            tabContentTdStr += "<td  width=\"70%\" style='text-align: left'>&nbsp;&nbsp;{{ n.filename }}</td>\n";

            if(options.showOp){
                var opInfStrList = [];
                if(options.opDetail.downLoadOpShow){
                    opInfStrList.push("<a href=\""+options.downLoadUrl+"{{n.id}}\" >[下载]</a>");
                }
                if(options.opDetail.viewOpShow){
                    opInfStrList.push("<a ng-click=\"vm.viewFile(n)\" ng-show='vm.showViewFileButton(n)'>[预览]</a>") ;
                }
                if(options.opDetail.editOpShow){
                    opInfStrList.push("<a ng-click=\"vm.editFile(n)\" ng-show='vm.showEditFileButton(n)'>[编辑]</a>");
                }
                tabHeadThStr+="<th width=\"20%\">操作</th>\n";
                tabContentTdStr+="<td width=\"20%\">\n" +opInfStrList.join("&nbsp;&nbsp;")+"</td>";
            }
            $("tr",tabHeadStr).append(tabHeadThStr);
            $("tr",tabContentStr).append(tabContentTdStr);
            //element.empty();
            element.html(tabHearOpStr);
            //element.append(tabHeadStr);
            element.append(tabNoDataStr);
            element.append(tabContentStr);
            $compile(element.children())(scope);
            element.find("input:file").off('change').on('change',function(e){
                var file = document.getElementById(options.fileStr).files[0];
                var formDate = new FormData();
                formDate.append("Filedata",file);
                formDate.append("tablename",options.tab_name);
                formDate.append("colname",options.col_name);
                formDate.append("recordid",options.recordid);
                if(options.uploadOtherParams){
                    _.forEach(options.uploadOtherParams,function (value,key) {
                        formDate.append(key,value);
                    })
                }
                //上传附件
                $http({
                    url: options.uploadUrl,
                    method: 'POST',
                    headers:{"Accept":undefined,"Content-Type":undefined},
                    data:formDate,
                    transformRequest:angular.identity
                }).then(function (response) {
                    scope.vm.loadFileList(scope.vm.searchParam);
                });

            });
        }




    }



})("../");


