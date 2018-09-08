/**
 * Created by zjb on 15-8-17.
 */

//获取Cookie
function get_Cookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}
/**
 *
 *取得一个querystring
 *
 */
function RequestParam(key) {
    var retValue = (window.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    return (retValue == null ? "" : retValue);
}
var rootPath = get_Cookie("rootpath");
var prefix = document.location.protocol+"//"+document.location.host+rootPath+"/";
document.write("<link href=\"" + prefix + "platform/ScriptSource/EasyUI/Skins/default/easyui.css\" rel=\"stylesheet\" type=\"text/css\" />");
document.write("<link href=\"" + prefix + "platform/ScriptSource/EasyUI/Skins/icon.css\" rel=\"stylesheet\" type=\"text/css\" />");
document.write("<link href=\"" + prefix + "platform/Styles/TailorFormField/TailorForm.css\" rel=\"stylesheet\" type=\"text/css\" />");
document.write("<script src=\"" + prefix + "platform/ScriptSource/JQuery/jquery.min.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/JavaScript/handlebars-v4.0.5.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/EasyUI/jquery.easyui.min.js\" type=\"text/javascript\"></script>");
//document.write("<script src=\"" + prefix + "platform/ScriptSource/EasyUI/jquery.easyui.extend.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/JQuery/jquery.form.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/JavaScript/SkyUtil.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/JavaScript/OrganizationTools.js\" type=\"text/javascript\"></script>");

if(!RequestParam("constname") && !RequestParam("insactivityid")){
    document.write("<script src=\"" + prefix + "platform/ScriptSource/TailorForm/TailorFormForComom.js\" type=\"text/javascript\"></script>");
}else{
document.write("<script src=\"" + prefix + "platform/ScriptSource/TailorForm/VirtualSubTable.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/TailorForm/AttachFiles.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/TailorForm/TailorFormTools.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/TailorForm/TailorFormButtons.js\" type=\"text/javascript\"></script>");
document.write("<script src=\"" + prefix + "platform/ScriptSource/TailorForm/WorkFlowFormOtherTools.js\" type=\"text/javascript\"></script>");
}
