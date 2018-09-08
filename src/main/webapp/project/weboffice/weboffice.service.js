/**
 * Created by yzr
 */
(function (rootPath) {
    angular.module('app.webOffice')
        .service('webOfficeService', webOfficeService);
    webOfficeService.$inject = ['$http','SYSTEM'];
    /* @ngInject */
    function webOfficeService($http,SYSTEM) {
        var defaultOptions = {
            saveDocumentActionPath:rootPath+"Common/SaveFiles.do",
            postFile:"Filedata",//文档内容以PostFile发送到服务器时使用的名称
            postData:"", //发送至服务器的参数，格式：key1=value1&key2=value2&key3=value3
            fileName: "", //文件名称
            postFormId: "", //连带发送到服务器的Form控件ID，默认：""
        };

        this.loadOfficeFromUrl = loadOfficeFromUrl;
        this.creatNewOffice = creatNewOffice;
        this.saveWebOfficeToURL = saveWebOfficeToURL;
        this.loadWebOfficeOCX = loadWebOfficeOCX;
        this.loadAttachFile = loadAttachFile;

        function creatNewOffice(progId,webOfficeOCX) {
            if(!progId){
                progId="Word.Document";
            }
            webOfficeOCX = loadWebOfficeOCX(webOfficeOCX);
            // webOfficeOCX.Menubar = false; //不显示工具条
            webOfficeOCX.CreateNew(progId);
        }
        function loadOfficeFromUrl(opt,webOfficeOCX) {
            webOfficeOCX = loadWebOfficeOCX(webOfficeOCX);
            webOfficeOCX.Menubar = false; //不显示菜单栏
            if(!opt.editAble){
                webOfficeOCX.ToolBars = false; //不显示工具栏
            }
            webOfficeOCX.BeginOpenFromURL(opt.loadDocumentActionPath);
        }

        function saveWebOfficeToURL(options,webOfficeOCX) {
            var  opt = angular.extend({}, defaultOptions, options);
            webOfficeOCX = loadWebOfficeOCX(webOfficeOCX);
            return webOfficeOCX.SaveToURL(opt.saveDocumentActionPath, opt.postFile, opt.postData, opt.fileName, opt.postFormId,false);
        }

        function loadAttachFile(params) {
             return $http({
                url: rootPath+'Sys_attachfile/LoadAttachFile.do',
                headers:{"RequestType":SYSTEM.RequestParamType},
                method: 'POST',
                data: params
            })
        }
        
        function  loadWebOfficeOCX(webOfficeOCX) {
            if(!webOfficeOCX){
                webOfficeOCX = document.getElementById("TANGER_OCX");
            }
            return webOfficeOCX;
        }

    }
})("../");