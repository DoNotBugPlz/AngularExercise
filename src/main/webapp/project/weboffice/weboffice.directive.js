/**
 * weboffice yzr
 */
(function (rootPath) {

    'use strict';
    var browserMatch = getBrowserMatch();//获取浏览器信息
    angular
        .module('app.webOffice')
        .constant("WEB_OFFICE_CONFIG",{
            classid:"A64E3073-2016-4baf-A89D-FFE1FAA10EC2",
            classidx64:"A64E3073-2016-4baf-A89D-FFE1FAA10EE2",
            xpiPath:"lib/NTKOWebOffice/NtkoAllControlSetup.zip",
            crxPath:"lib/NTKOWebOffice/NtkoAllControlSetup.zip",
            codebase:"lib/NTKOWebOffice/ofctnewclsid.cab#version=5,0,3,9",
            codebase64:"lib/NTKOWebOffice/ofctnewclsidx64.cab#version=5,0,3,9",
            ProductCaption:"江苏省价格监控平台（南京擎天信息科技有限公司技术支持）",
            ProductKey:"4CC1CA9699ABF7453151F20B975BA42A34B6F90A",
            browserMatch:browserMatch,
            defaults:{
                loadDocumentActionPath:rootPath+"Common/DownLoadFile.do?fileid="
            }

        })
        .directive('webOffice', webOffice);

    webOffice.$inject = ['$',"$timeout",'SYSTEM','$compile','WEB_OFFICE_CONFIG','webOfficeService'];
    /* @ngInject */
    function webOffice($,$timeout,SYSTEM,$compile,WEB_OFFICE_CONFIG,webOfficeService) {

        var webOfficeDirective = {
            link:link,
            template: templateFun,
            restrict: 'EA',
            scope:{
                "webOffice":"="
            }
        };
        return webOfficeDirective;
        function link(scope, element, attrs) {
            scope.$watch("webOffice",function (value) {
                if(value){
                    webOfficeInit();//初始化
                    if(value.createNew){
                        webOfficeService.creatNewOffice(value.newOfficeType);
                    }else{
                        var loadDocumentActionPath = value.loadDocumentActionPath?value.loadDocumentActionPath:WEB_OFFICE_CONFIG.defaults.loadDocumentActionPath+value.officeId;
                        webOfficeService.loadOfficeFromUrl({
                            editAble:value.editAble,
                            loadDocumentActionPath:loadDocumentActionPath
                        });
                    }
                }
            },true);
        }
        function webOfficeInit() {
            if(WEB_OFFICE_CONFIG.browserMatch.browser=='IE'){//不支持IE 11
                var webOfficeOCX = webOfficeService.loadWebOfficeOCX();
                //注册打开文本结束事件
                webOfficeOCX.attachEvent("AfterOpenFromURL",function () {
                    EventBus.dispatch('NTKOWebOffice_AfterOpenFromURL');
                });
                // //注册保存文本结束事件
                // webOfficeOCX.attachEvent("OnSaveToURL",function (){
                //     EventBus.dispatch('NTKOWebOffice_OnSaveToURL');
                // });
            }
        }
        function templateFun() {
            var webOfficeHtml = "";
            switch (WEB_OFFICE_CONFIG.browserMatch.browser){
                case "IE":
                    if(WEB_OFFICE_CONFIG.browserMatch.platform =='Win32'){
                        webOfficeHtml = IEWebOifficeHtml();
                    }
                    if(WEB_OFFICE_CONFIG.browserMatch.platform =='Win64'){
                        webOfficeHtml = IE64WebOifficeHtml();
                    }
                    break;
                case "firefox":
                    webOfficeHtml = firefoxWebOifficeHtml();
                    break;
                case "chrome":
                    webOfficeHtml = ChromeWebOifficeHtml();
                    break;
                default:
                    AppTools.errorTips("浏览器不支持！");
                    break;
            }
            return webOfficeHtml;
        }
        function IEWebOifficeHtml() {
            var officeHtml = "";
            officeHtml +='<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ';
            officeHtml +='<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ';
            officeHtml +='<object id="TANGER_OCX"  classid="clsid:' + WEB_OFFICE_CONFIG.classid + '"';
            officeHtml +='codebase="' + WEB_OFFICE_CONFIG.codebase + '" width="100%" height="100%">   ';
            officeHtml +='<param name="IsUseUTF8URL" value="-1">   ';
            officeHtml +='<param name="IsUseUTF8Data" value="-1">   ';
            officeHtml +='<param name="BorderStyle" value="1">   ';
            officeHtml +='<param name="BorderColor" value="14402205">   ';
            officeHtml +='<param name="TitlebarColor" value="15658734">   ';
            officeHtml +='<param name="isoptforopenspeed" value="0">   ';

            officeHtml +='<param name="MakerCaption" value="南京擎天科技有限公司"> ';
            officeHtml +='<param name="MakerKey" value="AC46EBA5038A52C83483978A976AA5AA624C1802"> ';
            officeHtml +='<param name="ProductCaption" value="' + WEB_OFFICE_CONFIG.ProductCaption + '">  ';
            officeHtml +='<param name="ProductKey" value="' + WEB_OFFICE_CONFIG.ProductKey + '"> ';


            officeHtml +='<param name="TitlebarTextColor" value="0">   ';
            officeHtml +='<param name="MenubarColor" value="14402205">   ';
            officeHtml +='<param name="MenuButtonColor" VALUE="16180947">   ';
            officeHtml +='<param name="MenuBarStyle" value="3">   ';
            officeHtml +='<param name="MenuButtonStyle" value="7">   ';
            officeHtml +='<param name="WebUserName" value="NTKO">   ';
            officeHtml +='<param name="Caption" value="' + WEB_OFFICE_CONFIG.ProductCaption + '">   ';
            officeHtml +='<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ';
            officeHtml +='</object>';
            return officeHtml;
        }
        function IE64WebOifficeHtml() {
            var officeHtml = "";
            officeHtml +='<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ';
            officeHtml +='<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ';
            officeHtml +='<object id="TANGER_OCX"  classid="clsid:' + WEB_OFFICE_CONFIG.classidx64 + '"';
            officeHtml +='codebase="' + WEB_OFFICE_CONFIG.codebase64 + '" width="100%" height="100%">   ';
            officeHtml +='<param name="IsUseUTF8URL" value="-1">   ';
            officeHtml +='<param name="IsUseUTF8Data" value="-1">   ';
            officeHtml +='<param name="BorderStyle" value="1">   ';
            officeHtml +='<param name="BorderColor" value="14402205">   ';
            officeHtml +='<param name="TitlebarColor" value="15658734">   ';
            officeHtml +='<param name="isoptforopenspeed" value="0">   ';

            officeHtml +='<param name="MakerCaption" value="南京擎天科技有限公司"> ';
            officeHtml +='<param name="MakerKey" value="AC46EBA5038A52C83483978A976AA5AA624C1802"> ';
            officeHtml +='<param name="ProductCaption" value="' + WEB_OFFICE_CONFIG.ProductCaption + '">  ';
            officeHtml +='<param name="ProductKey" value="' + WEB_OFFICE_CONFIG.ProductKey + '"> ';

            officeHtml +='<param name="isoptforopenspeed" value="0">   ';
            officeHtml +='<param name="TitlebarTextColor" value="0">   ';
            officeHtml +='<param name="MenubarColor" value="14402205">   ';
            officeHtml +='<param name="MenuButtonColor" VALUE="16180947">   ';
            officeHtml +='<param name="MenuBarStyle" value="3">   ';
            officeHtml +='<param name="MenuButtonStyle" value="7">   ';
            officeHtml +='<param name="WebUserName" value="NTKO">   ';
            officeHtml +='<param name="Caption" value="' + WEB_OFFICE_CONFIG.ProductCaption + '">   ';
            officeHtml +='<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ';
            officeHtml +='</object>';
            return officeHtml;
        }
        function ChromeWebOifficeHtml() {
            var officeHtml = "";
            officeHtml +='<object id="TANGER_OCX" type="application/ntko-plug"  ' +
                ' codebase="' + WEB_OFFICE_CONFIG.codebase + '" width="100%" height="100%" ' +
                ' ForOnSaveToURL="NTKOWebOffice_OnSaveToURL" ' +
                ' ForOnBeginOpenFromURL="OnBeginOpenFromURL" ' +
                ' ForAfterOpenFromURL="NTKOWebOffice_AfterOpenFromURL"' +
                ' ForOndocumentopened="Ondocumentopened" ';
            officeHtml +='ForOnpublishAshtmltourl="publishashtml" ';
            officeHtml +='ForOnpublishAspdftourl="publishaspdf" ';
            officeHtml +='ForOnSaveAsOtherFormatToUrl="saveasotherurl" ';
            officeHtml +='ForOnDoWebGet="dowebget" ';
            officeHtml +='ForOnDoWebExecute="webExecute" ';
            officeHtml +='ForOnDoWebExecute2="webExecute2" ';
            officeHtml +='ForOnFileCommand="FileCommand" ';
            officeHtml +='ForOnCustomMenuCmd2="CustomMenuCmd" ';
            officeHtml +='_IsUseUTF8URL="-1"   ';

            officeHtml +='_MakerCaption="南京擎天科技有限公司" ';
            officeHtml +='_MakerKey="AC46EBA5038A52C83483978A976AA5AA624C1802" ';
            officeHtml +='_ProductCaption="' + WEB_OFFICE_CONFIG.ProductCaption + '"  ';
            officeHtml +='_ProductKey="' + WEB_OFFICE_CONFIG.ProductKey + '" ';

            officeHtml +='_IsUseUTF8Data="-1"   ';
            officeHtml +='_BorderStyle="1"   ';
            officeHtml +='_BorderColor="14402205"   ';
            officeHtml +='_MenubarColor="14402205"   ';
            officeHtml +='_MenuButtonColor="16180947"   ';
            officeHtml +='_MenuBarStyle="3"  ';
            officeHtml +='_MenuButtonStyle="7"   ';
            officeHtml +='_WebUserName="NTKO"   ';
            officeHtml +='_Caption="' + WEB_OFFICE_CONFIG.ProductCaption + '"';
            officeHtml +='clsid="{' + WEB_OFFICE_CONFIG.classid + '}" >';
            officeHtml +='<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a href="' + WEB_OFFICE_CONFIG.crxPath + '">安装组件</a></SPAN>   ';
            officeHtml +='</object>   ';
            return officeHtml;
        }
        function firefoxWebOifficeHtml() {
            var officeHtml = "";
            officeHtml +='<object id="TANGER_OCX" type="application/ntko-plug" ' +
                '  codebase="' + WEB_OFFICE_CONFIG.codebase + '" ' +
                ' width="100%" height="100%" ' +
                ' ForOnSaveToURL="OnSaveToURL" ' +
                ' ForOnBeginOpenFromURL="OnBeginOpenFromURL" ' +
                ' ForAfterOpenFromURL="AfterOpenFromURL" ' +
                ' ForOndocumentopened="Ondocumentopened" ';
            officeHtml +='ForOnpublishAshtmltourl="publishashtml" ';
            officeHtml +='ForOnpublishAspdftourl="publishaspdf" ';
            officeHtml +='ForOnSaveAsOtherFormatToUrl="saveasotherurl" ';
            officeHtml +='ForOnDoWebGet="dowebget" ';
            officeHtml +='ForOnDoWebExecute="webExecute" ';
            officeHtml +='ForOnDoWebExecute2="webExecute2" ';
            officeHtml +='ForOnFileCommand="FileCommand" ';
            officeHtml +='ForOnCustomMenuCmd2="CustomMenuCmd" ';
            officeHtml +='_IsUseUTF8URL="-1"   ';

            officeHtml +='_MakerCaption="南京擎天科技有限公司" ';
            officeHtml +='_MakerKey="AC46EBA5038A52C83483978A976AA5AA624C1802" ';
            officeHtml +='_ProductCaption="' + WEB_OFFICE_CONFIG.ProductCaption + '"  ';
            officeHtml +='_ProductKey="' + WEB_OFFICE_CONFIG.ProductKey + '" ';

            officeHtml +='_IsUseUTF8Data="-1"   ';
            officeHtml +='_BorderStyle="1"   ';
            officeHtml +='_BorderColor="14402205"   ';
            officeHtml +='_MenubarColor="14402205"   ';
            officeHtml +='_MenuButtonColor="16180947"   ';
            officeHtml +='_MenuBarStyle="3"  ';
            officeHtml +='_MenuButtonStyle="7"   ';
            officeHtml +='_WebUserName="NTKO"   ';
            officeHtml +='_Caption="' + WEB_OFFICE_CONFIG.ProductCaption + '"';
            officeHtml +='clsid="{' + WEB_OFFICE_CONFIG.classid + '}" >';
            officeHtml +='<SPAN STYLE="color:red">尚未安装NTKO Web FireFox跨浏览器插件。请点击<a href="' + WEB_OFFICE_CONFIG.xpiPath + '">安装组件</a></SPAN>   ';
            officeHtml +='</object>   ';
            return officeHtml;
        }

    }
    function getBrowserMatch() {
        // 请勿修改，否则可能出错
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var browser;
        var version;
        var ua = userAgent.toLowerCase();
        function uaMatch(ua) {
            var match = rMsie.exec(ua);
            if (match != null) {
                return { browser: "IE", version: match[2] || "0" };
            }
            var match = rFirefox.exec(ua);
            if (match != null) {
                return { browser: match[1] || "firefox", version: match[2] || "0" };
            }
            var match = rOpera.exec(ua);
            if (match != null) {
                return { browser: match[1] || "", version: match[2] || "0" };
            }
            var match = rChrome.exec(ua);
            if (match != null) {
                return { browser: match[1] || "chrome", version: match[2] || "0" };
            }
            var match = rSafari.exec(ua);
            if (match != null) {
                return { browser: match[2] || "", version: match[1] || "0" };
            }
            if (match != null) {
                return { browser: "", version: "0" };
            }
        }
        var browserMatch = uaMatch(userAgent.toLowerCase());
        browserMatch.platform = navigator.platform;
        return browserMatch;
    }

})('../');

function NTKOWebOffice_OnSaveToURL(type, code, html) {
    EventBus.dispatch('NTKOWebOffice_OnSaveToURL',html);
}
//AfterOpenFromURL.$inject = ['$scope'];
function NTKOWebOffice_AfterOpenFromURL() {
    EventBus.dispatch('NTKOWebOffice_AfterOpenFromURL');
}





