var basePath = "/tlgada/";
var cabPath = "ScriptSource/NTKOWebOffice/OfficeControl.cab";
var xpiPath = "ScriptSource/NTKOWebOffice/ntkoplugins.xpi";
var crxPath = "ScriptSource/NTKOWebOffice/ntkoplugins.crx";
var classid = 'C9BC4DFF-4248-4a3c-8A49-63A7D317F404';
var codebase = basePath + cabPath + '#version=5,0,2,5';
var ProductCaption = '铁路公安局（公安部十局）档案信息管理系统（江苏擎天信息科技有限公司技术支持）';
var ProductKey = '28E510F54AF2E42ACB81A56744470FF90D2E0A11';

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
if (browserMatch.browser) {
    browser = browserMatch.browser;
    version = browserMatch.version;
}
//document.write(browser);
/*
谷歌浏览器事件接管
*/
function OnSaveToURL(type, code, html) {
    //alert(type);
    //alert(code);
    //alert(html);
    //alert("SaveToURL成功回调\ntype=" +type+" \n code="+code+" \n html="+html);
	var retData;
    if (WebOfficeOCX.StatusCode == 0) {
        retData = eval("(" + html + ")");
        // alert(JSON2.stringify(retData));
        if (retData.iserror) {
            GlobalTools.showError("保存失败！原因：" + retData.message);
            return null;
        }
        else {
            if(saveDocumentToServerCallback && typeof saveDocumentToServerCallback == "function"){
            	saveDocumentToServerCallback(retData);
            }
            GlobalTools.tip("保存成功！");
            return retData.data;
        }
        GlobalTools.tip("保存成功！");
        return retData;
    }
    else {
        GlobalTools.showError("保存失败！");
        return null;
    }
}
function OnBeginOpenFromURL(type, code, html) {
    //alert(type);
    //alert(code);
    //alert(html);
    //alert("BeginOpenFromURL成功回调\ntype=" +type+" \n code="+code+" \n html="+html);
}
function AfterOpenFromURL(doc) {
	//alert("AfterOpenFromURL成功回调\n doc=" +doc);
	if(WebOfficeOCX.callback){
		WebOfficeOCX.callback();
	}
}
function Ondocumentopened(str, doc) {
    WebOfficeOCX.activeDocument.saved = true; //saved属性用来判断文档是否被修改过,文档打开的时候设置成ture,当文档被修改,自动被设置为false,该属性由office提供.
    //	WebOfficeOCX.SetReadOnly(true,"");
    //WebOfficeOCX.ActiveDocument.Protect(1,true,"123");
    //获取文档控件中打开的文档的文档类型
    switch (WebOfficeOCX.doctype) {
        case 1:
            fileType = "Word.Document";
            fileTypeSimple = "wrod";
            break;
        case 2:
            fileType = "Excel.Sheet";
            fileTypeSimple = "excel";
            break;
        case 3:
            fileType = "PowerPoint.Show";
            fileTypeSimple = "ppt";
            break;
        case 4:
            fileType = "Visio.Drawing";
            break;
        case 5:
            fileType = "MSProject.Project";
            break;
        case 6:
            fileType = "WPS Doc";
            fileTypeSimple = "wps";
            break;
        case 7:
            fileType = "Kingsoft Sheet";
            fileTypeSimple = "et";
            break;
        default:
            fileType = "unkownfiletype";
            fileTypeSimple = "unkownfiletype";
    }

    //alert("ondocumentopened成功回调");
}
function publishashtml(type, code, html) {
    //alert(html);
    //alert("Onpublishashtmltourl成功回调");
}
function publishaspdf(type, code, html) {
    //alert(html);
    //alert("Onpublishaspdftourl成功回调");
}
function saveasotherurl(type, code, html) {
    //alert(html);
    //alert("SaveAsOtherformattourl成功回调");
}
function dowebget(type, code, html) {
    //alert(html);
    //alert("OnDoWebGet成功回调");
}
function webExecute(type, code, html) {
    //alert(html);
    //alert("OnDoWebExecute成功回调");
}
function webExecute2(type, code, html) {
    //alert(html);
    //alert("OnDoWebExecute2成功回调");
}
function FileCommand(TANGER_OCX_str, TANGER_OCX_obj) {
    if (TANGER_OCX_str == 3) {
        //alert("不能保存！");
    	if(NTKOWebOffice.WebOfficeOCX){
    		NTKOWebOffice.WebOfficeOCX.CancelLastCommand = true;
    	}
    }
}
function CustomMenuCmd(menuPos, submenuPos, subsubmenuPos, menuCaption, menuID) {
    alert("第" + menuPos + "," + submenuPos + "," + subsubmenuPos + "个菜单项,menuID=" + menuID + ",菜单标题为\"" + menuCaption + "\"的命令被执行.");
}


if (browser == "IE") {
    document.write('<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ');
    document.write('<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ');
    document.write('<object id="TANGER_OCX" classid="clsid:' + classid + '"');
    document.write('codebase="' + codebase + '" width="100%" height="100%">   ');
    document.write('<param name="IsUseUTF8URL" value="-1">   ');
    document.write('<param name="IsUseUTF8Data" value="-1">   ');
    document.write('<param name="BorderStyle" value="1">   ');
    document.write('<param name="BorderColor" value="14402205">   ');
    document.write('<param name="TitlebarColor" value="15658734">   ');
    document.write('<param name="isoptforopenspeed" value="0">   ');

    document.write('<param name="MakerCaption" value="南京擎天科技有限公司"> ');
    document.write('<param name="MakerKey" value="AC46EBA5038A52C83483978A976AA5AA624C1802"> ');
    document.write('<param name="ProductCaption" value="' + ProductCaption + '">  ');
    document.write('<param name="ProductKey" value="' + ProductKey + '"> ');


    document.write('<param name="TitlebarTextColor" value="0">   ');
    document.write('<param name="MenubarColor" value="14402205">   ');
    document.write('<param name="MenuButtonColor" VALUE="16180947">   ');
    document.write('<param name="MenuBarStyle" value="3">   ');
    document.write('<param name="MenuButtonStyle" value="7">   ');
    document.write('<param name="WebUserName" value="NTKO">   ');
    document.write('<param name="Caption" value="' + ProductCaption + '">   ');
    document.write('<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ');
    document.write('</object>');
}
else if (browser == "firefox") {
    document.write('<object id="TANGER_OCX" type="application/ntko-plug"  codebase="' + codebase + '" width="100%" height="100%" ForOnSaveToURL="OnSaveToURL" ForOnBeginOpenFromURL="OnBeginOpenFromURL" ForAfterOpenFromURL="AfterOpenFromURL" ForOndocumentopened="Ondocumentopened"');
    document.write('ForOnpublishAshtmltourl="publishashtml"');
    document.write('ForOnpublishAspdftourl="publishaspdf"');
    document.write('ForOnSaveAsOtherFormatToUrl="saveasotherurl"');
    document.write('ForOnDoWebGet="dowebget"');
    document.write('ForOnDoWebExecute="webExecute"');
    document.write('ForOnDoWebExecute2="webExecute2"');
    document.write('ForOnFileCommand="FileCommand"');
    document.write('ForOnCustomMenuCmd2="CustomMenuCmd"');
    document.write('_IsUseUTF8URL="-1"   ');
    
    document.write('_MakerCaption="南京擎天科技有限公司" ');
    document.write('_MakerKey="AC46EBA5038A52C83483978A976AA5AA624C1802" ');
    document.write('_ProductCaption="' + ProductCaption + '"  ');
    document.write('_ProductKey="' + ProductKey + '" ');

    document.write('_IsUseUTF8Data="-1"   ');
    document.write('_BorderStyle="1"   ');
    document.write('_BorderColor="14402205"   ');
    document.write('_MenubarColor="14402205"   ');
    document.write('_MenuButtonColor="16180947"   ');
    document.write('_MenuBarStyle="3"  ');
    document.write('_MenuButtonStyle="7"   ');
    document.write('_WebUserName="NTKO"   ');
    document.write('_Caption="' + ProductCaption + '"');
    document.write('clsid="{' + classid + '}" >');
    document.write('<SPAN STYLE="color:red">尚未安装NTKO Web FireFox跨浏览器插件。请点击<a href="' + basePath + xpiPath + '">安装组件</a></SPAN>   ');
    document.write('</object>   ');
} else if (browser == "chrome") {
	document.write('<object id="TANGER_OCX" type="application/ntko-plug"  codebase="' + codebase + '" width="100%" height="100%" ForOnSaveToURL="OnSaveToURL" ForOnBeginOpenFromURL="OnBeginOpenFromURL" ForAfterOpenFromURL="AfterOpenFromURL" ForOndocumentopened="Ondocumentopened"');
    document.write('ForOnpublishAshtmltourl="publishashtml"');
    document.write('ForOnpublishAspdftourl="publishaspdf"');
    document.write('ForOnSaveAsOtherFormatToUrl="saveasotherurl"');
    document.write('ForOnDoWebGet="dowebget"');
    document.write('ForOnDoWebExecute="webExecute"');
    document.write('ForOnDoWebExecute2="webExecute2"');
    document.write('ForOnFileCommand="FileCommand"');
    document.write('ForOnCustomMenuCmd2="CustomMenuCmd"');
    document.write('_IsUseUTF8URL="-1"   ');
    
    document.write('_MakerCaption="南京擎天科技有限公司" ');
    document.write('_MakerKey="AC46EBA5038A52C83483978A976AA5AA624C1802" ');
    document.write('_ProductCaption="' + ProductCaption + '"  ');
    document.write('_ProductKey="' + ProductKey + '" ');

    document.write('_IsUseUTF8Data="-1"   ');
    document.write('_BorderStyle="1"   ');
    document.write('_BorderColor="14402205"   ');
    document.write('_MenubarColor="14402205"   ');
    document.write('_MenuButtonColor="16180947"   ');
    document.write('_MenuBarStyle="3"  ');
    document.write('_MenuButtonStyle="7"   ');
    document.write('_WebUserName="NTKO"   ');
    document.write('_Caption="' + ProductCaption + '"');
    document.write('clsid="{' + classid + '}" >');
    document.write('<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a href="' + basePath + crxPath + '">安装组件</a></SPAN>   ');
    document.write('</object>   ');
} else if (Sys.opera) {
    alert("sorry,ntko web印章暂时不支持opera!");
} else if (Sys.safari) {
    alert("sorry,ntko web印章暂时不支持safari!");
}