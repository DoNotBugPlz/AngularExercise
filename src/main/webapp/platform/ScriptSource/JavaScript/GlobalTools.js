var rootPath = window.location.host+"/"+getWebSiteName()+"/";//项目【带】工程名的时候使用该行代码
//var rootPath = window.location.host+"/";//项目【不带】工程名的时候使用该行代码
//获取配置的网站、虚拟目录名
function getWebSiteName() {
    var pagePath = window.location.pathname;
    return pagePath.substr(1, pagePath.substr(1).indexOf('/'));
}

function getAccessTokenName() {
    var webSiteName = getWebSiteName();
    if (webSiteName) {
        webSiteName = "_" + webSiteName;
    }
    else {
        webSiteName = "";
    }
    return "access_token" + webSiteName.toLowerCase();
}

//获取access_token的cookie值
function getAccessTokenCookie() {
    return GetCookie(getAccessTokenName())
}

//处理url中的转义字符
function urlEncode(sStr)
{
    return encodeURI(encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F'));
}

//根据rgb获取颜色的hex值
$.fn.getBackgroundColor = function() {
    var rgb = $(this).css('background-color');
    if(!rgb){
        return;
    }
    if(rgb.indexOf("#")!=-1) return rgb;//如果是一个hex值则直接返回
    else{
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if(rgb){
            function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
            rgb= "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    }
    return rgb;
}

/**
 * 时间验证
 * 如果开始时间和结束时间都不为空，才引发判断
 *
 */
function CheckDate(beginDate, endDate)//beginDate endDate为标准的时间格式（2012-9-9 12:12:00）
{
    if ((beginDate != "") && (endDate != "") && StringToLongDate(formatDate(endDate, "yyyy-MM-dd HH:mm")) < StringToLongDate(formatDate(beginDate, "yyyy-MM-dd HH:mm"))) {
        return false;
    }
    return true;
}

function StringToLongDate(dateString) {
    if (dateString != "") {
        var date = dateString.substring(0, dateString.indexOf(" "));
        var time = dateString.substring(dateString.indexOf(" "));
        date = date.replace(/-/g, '/');
        var retValue = new Date();
        retValue = Date.parse(date + time);
        return retValue;
    }
}

/**
 * 字符串转日期，并格式化
 */
function formatterStringToDate(dateStr, formatStr) {
    return new Date(StringToLongDate(dateStr)).Format(formatStr);
}

/*
 根据生日计算年龄
 */
function getAgeBybirthday(dateString) {
    if (dateString == null) {
        return "生日错误";
    }
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 *
 *根据正则表达式替换所有符合的字符
 *
 */
String.prototype.ReplaceAll = function (key, value) {
    if (!RegExp.prototype.isPrototypeOf(key)) {
        return this.replace(new RegExp(key, "g"), value);
    }
    else {
        return this.replace(key, value);
    }
};

/*   
 函数：格式化日期
 参数：formatStr-格式化字符串
 d：将日显示为不带前导零的数字，如1
 dd：将日显示为带前导零的数字，如01
 ddd：将日显示为缩写形式，如Sun
 dddd：将日显示为全名，如Sunday
 M：将月份显示为不带前导零的数字，如一月显示为1
 MM：将月份显示为带前导零的数字，如01
 MMM：将月份显示为缩写形式，如Jan
 MMMM：将月份显示为完整月份名，如January
 yy：以两位数字格式显示年份
 yyyy：以四位数字格式显示年份
 h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
 hh：使用12小时制将小时显示为带前导零的数字
 H：使用24小时制将小时显示为不带前导零的数字
 HH：使用24小时制将小时显示为带前导零的数字
 m：将分钟显示为不带前导零的数字
 mm：将分钟显示为带前导零的数字
 s：将秒显示为不带前导零的数字
 ss：将秒显示为带前导零的数字
 l：将毫秒显示为不带前导零的数字
 ll：将毫秒显示为带前导零的数字
 tt：显示am/pm
 TT：显示AM/PM
 返回：格式化后的日期
 */
Date.prototype.Format = function (formatStr) {
    var date = this;
    /*  
     函数：填充0字符
     参数：value-需要填充的字符串, length-总长度
     返回：填充后的字符串
     */
    var zeroize = function (value, length) {
        if (!length) {
            length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g,
        function ($0) {
            switch ($0) {
                case 'd': return date.getDate();
                case 'dd': return zeroize(date.getDate());
                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                case 'M': return date.getMonth() + 1;
                case 'MM': return zeroize(date.getMonth() + 1);
                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                case 'yy': return new String(date.getFullYear()).substr(2);
                case 'yyyy': return date.getFullYear();
                case 'h': return date.getHours() % 12 || 12;
                case 'hh': return zeroize(date.getHours() % 12 || 12);
                case 'H': return date.getHours();
                case 'HH': return zeroize(date.getHours());
                case 'm': return date.getMinutes();
                case 'mm': return zeroize(date.getMinutes());
                case 's': return date.getSeconds();
                case 'ss': return zeroize(date.getSeconds());
                case 'l': return date.getMilliseconds();
                case 'll': return zeroize(date.getMilliseconds());
                case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
                case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
            }
        });
};
function formatDate(date, format) {
    var _date = new Date((date + "").ReplaceAll("-", "/").ReplaceAll("年", "/").ReplaceAll("月", "/").ReplaceAll("日", " ").ReplaceAll("时", ":").ReplaceAll("分", ":").ReplaceAll("秒", "")); //时间的年月日部门必须是：yyyy/MM/DD格式，否则校验为：Invalid Date

    if (_date == "Invalid Date" || _date == "NaN") {
        return date;
    }
    return _date.Format(format);
}
function formatNormalDate(date) {

    return formatDate(date, 'yyyy-MM-dd');
}

/**
 *
 *指定的字符串是否是纯数字字符
 *
 */
function isNumber(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 0x0030 || str.charCodeAt(i) > 0x0039) {
            return false;
        }
    }
    return true;
}
/**
 *
 *取得一个字符串的字节数长度
 *
 */
function GetStringCharCount(m_str) {
    if (m_str == null) {
        return 0;
    }
    var cnt = 0;
    for (var i = 0; i < m_str.length; i++) {
        if (m_str.charCodeAt(i) < 128) {
            cnt++;
        }
        else {
            cnt += 2;
        }
    }
    return cnt;
}

/**
 *
 *截取字符串
 *
 */
function GetSubstr(m_str, m_len) {
    var len = parseInt(m_len, 10);
    var str = m_str.toString();
    if (str == null || str == "") {
        return "";
    }
    if (len == null || isNaN(len) || len < 10 || len > 200) {
        len = 20;
    }
    if (str.length < (len / 2) + 2) {
        return str;
    }
    var s = "";
    for (var i = 0, cnt = 0; i < str.length && cnt < len; i++) {
        if (str.charCodeAt(i) < 128) {
            cnt++;
        }
        else {
            cnt += 2;
        }
        if (cnt >= len - 2 && i < str.length - 2) {
            return s + "...";
        }
        s += str.charAt(i);
    }
    return s;
}

/**
 *
 *滤除所有的特殊字符
 *
 */
function TrimHTML(it) {
    var sText;
    if (typeof (it) == "string") {
        sText = it;
    }
    else {
        sText = it.value;
    }
    sText = sText.replace(/\</g, "").replace(/\>/g, "").replace(/\?/g, "").replace(/\|/g, "");
    sText = sText.replace(/\\/g, "").replace(/\;/g, "").replace(/\"/g, "").replace(/\//g, "");
    sText = sText.replace(/\'/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\{/g, "");
    sText = sText.replace(/\}/g, "").replace(/\+/g, "").replace(/\&/g, "").replace(/\%/g, "");
    sText = sText.replace(/\#/g, "").replace(/\@/g, "").replace(/\!/g, "").replace(/\ = /g, "");
    if (typeof (it) == "string") {
        return sText;
    }
    else {
        it.value = sText;
    }
}

/**
 *
 *取得一个querystring
 *
 */
function Request(key) {
    var retValue = (window.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    return (retValue == null ? "" : retValue);
}

function getUrlParam(key) {
    var retValue = (window.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    return (retValue == null ? "" : retValue);
}

/**
 *
 *ReloadMe
 *
 */
function ReloadMe() {
    window.location = window.location.href;
}

/**
 * 删除左右两端的空格
 */
function Trim(str) {
    return str.replace(/(^\s*)(\s*$)/g, '');
}

/**
 * 删除左边的空格
 */
function TrimLeft(str) {
    return str.replace(/(^\s*)/g, '');
}

/**
 * 删除右边的空格
 */
function TrimRight(str) {
    return str.replace(/(\s*$)/g, '');
}

//设置客户端Cookie
function SetCookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间 
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

//获取Cookie
function GetCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

/***********************************EasyUI异常通用处理方法*****************************************/
//Ajax异步请求失败后
function ajaxRequestError(XMLHttpRequest, textStatus, errorThrown) {
    alert("Ajax异步请求失败后");
    if (errorThrown == "Forbidden") {
        window.location = rootPath + "MainPage/Login.htm?parentpath=" + window.location.href;
    }
    else {
        GlobalTools.showError('发现系统错误 <BR>错误码：' + textStatus + ' <BR>错误描述：' + XMLHttpRequest.responseText);
    }
}
//Ztree异步请求失败后
function ztreeAsyncError(event, treeid, treeNode, XMLHttpRequest, textStatus, errorThrown) {
    if (errorThrown == "Forbidden") {
        window.location = rootPath + "MainPage/Login.htm?parentpath=" + window.location.href;
    }
    else {
        GlobalTools.showError('发现系统错误 <BR>错误码：' + textStatus + ' <BR>错误描述：' + XMLHttpRequest.responseText);
    }
}
//EasyUI DataGrid异步获取数据出错
function gridLoadError(errorData) {
    //alert("EasyUI DataGrid异步获取数据出错");
    if (errorData.statusText == "Forbidden") {
        window.location = rootPath + "MainPage/Login.htm?parentpath=" + window.location.href;
    }
    else {
        //GlobalTools.showError('发现系统错误 <BR>错误码：' + errorData.status + ' <BR>错误描述：' + errorData.responseText);
        var url;//异常提示页面的url
        switch (errorData.status){
            case 404:
                url = rootPath + "platform/exceptions/404/404.html";
                break;
            default :
                var text = errorData.responseText;
                if(text){
                    text = text.substring(0,3000);
                }
                url = encodeURI(rootPath + "platform/exceptions/500/500.html?error_status="+errorData.status+"&error_text="+text);//默认的url指向一个默认的错误展示页
                break;
        }
        //GlobalTools.openErrorWindow("出错啦",errorData.responseText , {});
        GlobalTools.openWindow("出错啦",url, {maximized:false,height:620,width:990});
    }
}

//定义全局对象，GlobalTools，方便一些基础操作
(function ($) {

    //全局系统对象
    window['GlobalTools'] = {};
    //var win = window;

    //GlobalTools.WebsiteUrlPath = "http://32.1.2.65/skyspace/";
    // GlobalTools.WebsiteUrlPath = "http://127.0.0.1:8080/webModule/";

    GlobalTools.cookies = (function () {
        var fn = function () {
        };
        fn.prototype.get = function (name) {
            var cookieValue = "";
            var search = name + "=";
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search);
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) end = document.cookie.length;
                    cookieValue = decodeURIComponent(document.cookie.substring(offset, end));
                }
            }
            return cookieValue;
        };
        fn.prototype.set = function (cookieName, cookieValue, DayValue) {
            var expire = "";
            var day_value = 1;
            if (DayValue != null) {
                day_value = DayValue;
            }
            expire = new Date((new Date()).getTime() + day_value * 86400000);
            expire = "; expires=" + expire.toGMTString();
            document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";path=/" + expire;
        };
        fn.prototype.remvoe = function (cookieName) {
            var expire = "";
            expire = new Date((new Date()).getTime() - 1);
            expire = "; expires=" + expire.toGMTString();
            document.cookie = cookieName + "=" + escape("") + ";path=/" + expire;
            /*path=/*/
        };

        return new fn();
    })();

    //右下角的提示框
    GlobalTools.tip = function (message) {
        $.messager.show({ msg: message, title: '提示信息' });
    };

    //显示loading
    GlobalTools.showLoading = function (message) {
        message = message || "正在加载中...";
        $.messager.progress({ title: '正在加载', msg: message });
    };
    //隐藏loading
    GlobalTools.hideLoading = function (message) {
        $.messager.progress('close');
    };
    //显示成功提示窗口
    GlobalTools.showSuccess = function (message, callback) {
        $.messager.alert("成功啦！", message, "info", callback);
    };
    //显示失败提示窗口
    GlobalTools.showError = function (message, callback) {
        $.messager.alert('出错啦！', message, 'error', callback);
    };
    //弹出窗口
    GlobalTools.openWindow = function (title, url, options) {
        var p = {};
        options = options || {};
        default_options = {
            modal: true, //默认以模式窗口打开
            closable: true, //默认带关闭按钮
            collapsible: true, //默认带折叠按钮
            minimizable: true, //默认带最小化按钮
            maximizable: true, //默认带最大化按钮
            minimized: false, //默认不最小化
            maximized: false, //默认不最大化
            border: false, //默认不显示边框
            iconCls: 'icon-view', //默认标题左侧的图标
            top:null,
            left:null,
            height: 400, //默认高
            width: 550,//默认宽
            onClose:function(){}//关闭事件
        };
        //default_options.top = ($(win).height()- (options.height?options.height:default_options.height))/2;//默认垂直居中
        // default_options.left = ($(win).width()- (options.width?options.width:default_options.width))/2;//默认水平居中
        $.extend(p, default_options, options);
        /*$(win).scroll(function() {
         $("#_Window").window({top: p.top+win.document.documentElement.scrollTop,left:p.left+win.document.documentElement.scrollLeft});
         });*/

        var window = "<div id='_div'><div id='_Window' class='easyui-window' title='" + title + "' " +
            "data-options='onClose:"+ p.onClose+",modal:" + p.modal + ",closable:" + p.closable + ",collapsible:" + p.collapsible + ",minimizable:" + p.minimizable + ",maximizable:" + p.maximizable + ",maximized:" + p.maximized + ",minimized:" + p.minimized + ",border:" + p.border + ",iconCls:\"" + p.iconCls + "\",top:" + p.top + ",left:" + p.left + ",height:" + p.height + ",width:" + p.width + "' ></div></div>";
        $("body").append(window);
        var $Window=$('#_Window');
        if ($Window.html() == undefined) {
            var winContent = "<iframe style='width:100%;height:100%;border:0;' src='" + url + "'></iframe>";
            $Window.html(winContent);
            $.parser.parse("#_div"); //easyui格式化工具
        }else{
            $Window.empty().window({
                title:title,
                onClose:p.onClose,
                modal:p.modal,
                closable:p.closable ,
                collapsible:p.collapsible,
                minimizable: p.minimizable ,
                maximizable: p.maximizable  ,
                maximized:p.maximized  ,
                minimized: p.minimized  ,
                border: p.border  ,
                iconCls:p.iconCls ,
                top:  p.top ,
                left:p.left ,
                height: p.height ,
                width:p.width
            });
            var winContent = "<iframe style='width:100%;height:100%;border:0;' src='" + url + "'></iframe>";
            $Window.html(winContent);
        }
        return $Window.window({
            onMaximize:function(){
                $Window.window('center');
            }
        }).window('center').window('open');
    };

    //弹出异常信息的显示窗口
    GlobalTools.openErrorWindow = function (title, text, options) {
        var p = {};
        options = options || {};
        default_options = {
            modal: true, //默认以模式窗口打开
            closable: true, //默认带关闭按钮
            collapsible: false, //默认不带折叠按钮
            minimizable: false, //默认不带最小化按钮
            maximizable: true, //默认带最大化按钮
            minimized: false, //默认不最小化
            maximized: false, //默认不最大化
            border: false, //默认不显示边框
            iconCls: 'icon-view', //默认标题左侧的图标
            top: null, //默认不设置顶边距
            left: null, //默认不设置左边距
            height: 400, //默认高
            width: 550//默认宽
        };
        $.extend(p, default_options, options);
        var window = "<div id='_div'><div id='_Window' class='easyui-window' style='background-color: #e2efff;width: 100%;height:100%' title='" + title + "' " +
            "data-options='modal:" + p.modal + ",closable:" + p.closable + ",collapsible:" + p.collapsible + ",minimizable:" + p.minimizable + ",maximizable:" + p.maximizable + ",maximized:" + p.maximized + ",minimized:" + p.minimized + ",border:" + p.border + ",iconCls:\"" + p.iconCls + "\",top:" + p.top + ",left:" + p.left + ",height:" + p.height + ",width:" + p.width + "' ></div></div>";
        if ($('#_Window').html() == undefined) {
            $("body").append(window);
            $.parser.parse("#_div"); //easyui格式化工具
            $('#_Window').html(text);
        }
        $('#_Window').window('open');
    };

    /*
     将数据集合导出Excel
     options={url:'XXXXXX',parameters:{}}
     url:导出数据请求地址
     parameters:传递的参数，一般是列表查询条件参数
     */
    GlobalTools.ExportExcel = function (options) {
        var form = $("<form style = 'display:none' method='post' action='" + options.url + "'>"); //创建一个表单
        if (options.parameters) {
            for (var key in options.parameters) {
                var textarea = $("<textarea type='hidden' name='" + key + "'></textarea>");
                textarea.val(options.parameters[key]);
                form.append(textarea);
            }
        }
        $("body").append(form);
        form.submit(); //提交表单进行下载文件
        form.remove(); //移除表单
    };

    //提交服务器请求
    //返回json格式
    //1,提交给类 options.type  方法 options.method 处理
    //2,并返回 AjaxResult(这也是一个类)类型的的序列化好的字符串
    GlobalTools.ajax = function (options) {
        var p = options || {};
        $.ajax({
            async: p.async === false ? false : true,
            url: p.url,
            data: p.data,
            dataType: 'json',
            contentType: p.contentType||'application/x-www-form-urlencoded;charset=UTF-8',
            type: p.type||'post',
            beforeSend: function () {
                if (p.beforeSend)
                    p.beforeSend();
                if (p.loading) {
                    try { GlobalTools.showLoading(p.loading); } catch (e) { }
                }
            },
            complete: function () {
                if (p.loading) {
                    try { GlobalTools.hideLoading(); } catch (e) { }
                }
                if (p.complete)
                    p.complete();
            },
            success: function (result) {
                if (!result) return;
                if (!result.iserror) {
                    if (p.success)
                        p.success(result.data, result.message);
                    else if (result.message)
                        GlobalTools.showSuccess(result.message);
                }
                else {
                    if (p.error)
                        p.error(result.message);
                    else if (result.message)
                        GlobalTools.showError(result.message);
                }
            },
            error: ajaxRequestError
        });
    };

    //填充表单数据
    GlobalTools.loadForm = function (mainform, options, callback) {
        options = options || {};
        if (!mainform)
            mainform = $("form:first");
        var p = $.extend({
            beforeSend: function () {
                GlobalTools.showLoading('正在加载表单数据中...');
            },
            complete: function () {
                GlobalTools.hideLoading();
            },
            success: function (data) {
                var isNormalModel = options.isNormalModel ? options.isNormalModel : false; //默认采用表名.列明的表单形式
                //var preID;
                if (typeof (data) == "string") {
                    data = eval("(" + data + ")");
                }
                //根据返回的属性名，找到相应ID的表单元素，并赋值
                GlobalTools.buildForm(mainform, data, isNormalModel);
                try {//消除表单验证警告样式，避免出现表单域有值却依然警示等情况
                    mainform.form("validate");
                    //mainform.form("load");
                }
                catch (e) { }

                if (callback)
                    callback(data);
            },
            error: function (message) {
                GlobalTools.showError('数据加载失败!错误信息：' + message);
            }
        }, options);
        GlobalTools.ajax(p);
    };
    //构造表单数据
    GlobalTools.buildForm = function (mainform, data, isNormalModel) {
        //根据返回的属性名，找到相应ID的表单元素，并赋值
        for (var p in data) {//如果！isNormalModel，那么p为表名，否则直接为属性名
            preID = (isNormalModel ? "" : ((p == 'otherelements') ? "" : (p + ".")));

            if (!isNormalModel) {
                var elements;
                if (data[p] instanceof Array) {
                    elements = data[p][0];
                }
                else {
                    elements = data[p]; //data[P]
                }
                for (var element in elements) {
                    var elementName = preID + element;
                    this.buildFormElement(mainform, elementName, elements[element]);
                }
            }
            else {
                this.buildFormElement(mainform, p, data[p]);
            }
        }
    };

    //为表单绑定事件
    GlobalTools.buildFormElement = function buildFormElement(mainform, elementName, value) {
        var f = mainform.find('input[numberboxName="' + elementName + '"]');
        if (f.length) {
            //如果是数字输入框
            f.numberbox('setValue', value);
        }
        else {
            //多选框或者单选框
            var checkOrradio = mainform.find(':radio[name="' + elementName + '"],:checkbox[name="' + elementName + '"]');
            if (checkOrradio.length > 0) {
                checkOrradio.each(function () {
                    if ($(this).val() == "on")//如果控件没有赋值（设置value=）则 控件默认值（value="on"）
                    {
                        if (parseInt(value) == 1)//选中
                        {
                            $(this).attr("checked", 'checked');
                        } else {
                            $(this).removeAttr("checked");
                        }
                    }
                    else {
                        if ((',' + value + ',').indexOf(',' + $(this).val() + ',') >= 0)
                        { $(this).attr("checked", 'checked'); }
                    }
                });
                return;
            }
            $('input[name="' + elementName + '"]', mainform).val(value);
            $('textarea[name="' + elementName + '"]', mainform).val(value);
            $('select[name="' + elementName + '"]', mainform).val(value);
        }
        var c = mainform.find('[comboName="' + elementName + '"]');

        if (c.length) {
            var cc = ['combobox', 'combotree', 'combogrid', 'datetimebox', 'datebox'];
            for (var i = 0; i < cc.length; i++) {
                if (c.hasClass(cc[i] + '-f')) {
                    if (c[cc[i]]('options').multiple) {
                        if (value != null && value != "")
                            c[cc[i]]('setValues', value.split(','));
                        else
                            c[cc[i]]('setValues', []);
                    }
                    else {

                        if (i == 4 && value != null) {
                            value = value.slice(0, 10); //datetime只截取年月日
                        }
                        if (value != null) {
                            c[cc[i]]('setValue', value);
                        }
                    }
                }
            }
        }
    };

    //带验证、带loading的提交
    GlobalTools.submitForm = function (mainform, options) {
        var p = options || {};
        if (!mainform) mainform = $("form:first");
        if (!mainform.form("validate")) { return; }
        mainform.ajaxSubmit({
            async: p.async === false ? false : true,
            dataType: 'json',
            submiturl: p.submiturl ? p.submiturl : '', //此属性专属于流程表单
            beforeSubmit: function (formData, mainform, options) {
                //针对复选框和单选框 处理  主要是将一组同名的合并为一个name中 进行传输
                var chkRad = new Array(); //记录唯一的name
                $(":checkbox,:radio", mainform).each(function () {
                    if (this.name) {
                        var indexFormData = existInFormData(formData, this.name); //出现在formData中的位置
                        var indexChkRad = existInFormData(chkRad, this.name); //出现在chkRad中的位置
                        if (indexChkRad == -1) {
                            if (this.checked) {//选中赋值，若没有value，默认为1
                                chkRad.push({ name: this.name, type: this.type, value: (this.value&&this.value!='on') ? this.value : 1 });
                            }
                            else {//未选中 赋默认值（未选中时的值），若没有defaultvalue，默认为0
                                if(this.type=="checkbox"){
                                    chkRad.push({ name: this.name, type: this.type, value: (this.defaultvalue) ? this.defaultvalue : 0 });
                                }
                            }
                        }
                        else//有重名的checkbox(一般用于一组checkbox)
                        {
                            if (this.checked) {
                                if (chkRad[indexChkRad].value == null)
                                    chkRad[indexChkRad].value = this.value; // 排除第一个空值
                                else
                                    chkRad[indexChkRad].value = chkRad[indexChkRad].value + "," + this.value;
                            }
                        }
                        if (indexFormData > -1) {
                            formData.splice(indexFormData, 1); //从formData中移除
                        }
                    }
                });
                for (var i = 0, l = chkRad.length; i < l; i++) {
                    formData.push(chkRad[i]); //加入formData
                }
            },
            beforeSend: p.beforeSend || function (a, b, c) { GlobalTools.showLoading('正在保存数据中...'); },
            success: function (result) {
                try { GlobalTools.hideLoading(); } catch (e) { }
                if (!result) return;
                if (!result.iserror) {
                    if (p.success)
                        p.success(result.data, result.message);
                    else
                        GlobalTools.showError(result.message);
                }
                else {
                    if (p.error)
                        p.error(result.message);
                    else
                        GlobalTools.showError(result.message);
                }
            },
            error: ajaxRequestError
        });
        function existInFormData(formData, name) {
            for (var i = 0, l = formData.length; i < l; i++) {
                var o = formData[i];
                if (o.name == name) return i;
            }
            return -1;
        }
    };

    //批量禁用DataGrid记录
    GlobalTools.deleteGridList = function (mainGrid, options) {
        var p = options || {};
        var deleteDatas = mainGrid.datagrid('getSelections');
        if (!deleteDatas || deleteDatas.length == 0) return;
        $.messager.confirm('操作确认', '确定要禁用选中的记录吗?', function (result) {
            if (result) {
                var idArr = new Array();
                for (index in deleteDatas) {
                    idArr.push(deleteDatas[index].id);
                }

                GlobalTools.ajax({
                    async: p.async,
                    dataType: "json",
                    url: p.url,
                    data: $.extend({ ids: idArr.join(',') }, p.data),
                    success: function (result, message) {
                        if (p.success)
                            p.success(result, message);
                        else
                            mainGrid.datagrid('reload');

                    },
                    error: function (message) {
                        if (p.error)
                            p.error(message);
                        else if (message)
                            GlobalTools.showError(message);
                    }
                });
            }
        });
    };
    //批量启用DataGrid记录
    GlobalTools.unDeleteGridList = function (mainGrid, options) {
        var p = options || {};
        var deleteDatas = mainGrid.datagrid('getSelections');
        if (!deleteDatas || deleteDatas.length == 0) return;
        $.messager.confirm('操作确认', '确定要启用选中的记录吗?', function (result) {
            if (result) {
                var idArr = new Array();
                for (index in deleteDatas) {
                    idArr.push(deleteDatas[index].id);
                }

                GlobalTools.ajax({
                    dataType: "json",
                    url: p.url,
                    data: $.extend({ ids: idArr.join(',') }, p.data),
                    success: function (result, message) {
                        if (p.success)
                            p.success(result, message);
                        else
                            mainGrid.datagrid('reload');

                    },
                    error: function (message) {
                        if (p.error)
                            p.error(message);
                        else if (message)
                            GlobalTools.showError(message);
                    }
                });
            }
        });
    };
    //批量销毁DataGrid记录
    GlobalTools.destroyGridList = function (mainGrid, options) {
        var p = options || {};
        var deleteDatas = mainGrid.datagrid('getSelections');
        if (!deleteDatas || deleteDatas.length == 0) return;
        $.messager.confirm('操作确认', '确定要彻底销毁选中的记录吗?', function (result) {
            if (result) {
                var idArr = new Array();
                for (index in deleteDatas) {
                    idArr.push(deleteDatas[index].id);
                }
                GlobalTools.ajax({
                    dataType: "json",
                    url: p.url,
                    data: $.extend({ ids: idArr.join(',') }, p.data),
                    success: function (result, message) {
                        if (p.success)
                            p.success(result, message);
                        else
                            mainGrid.datagrid('reload');

                    },
                    error: function (message) {
                        if (p.error)
                            p.error(message);
                        else if (message)
                            GlobalTools.showError(message);
                    }
                });
            }
        });
    };


    //批量禁用TreeGrid记录
    GlobalTools.deleteTreeGridList = function (mainTreeGrid, options) {
        var p = options || {};
        var deleteDatas = mainTreeGrid.treegrid('getSelections');
        if (!deleteDatas || deleteDatas.length == 0) return;
        $.messager.confirm('操作确认', '确定要禁用选中的记录吗?', function (result) {
            if (result) {
                var idArr = new Array();
                for (index in deleteDatas) {
                    idArr.push(deleteDatas[index].id);
                }
                GlobalTools.ajax({
                    dataType: "json",
                    url: p.url,
                    data: $.extend({ ids: idArr.join(',') }, p.data),
                    success: function (result, message) {
                        if (p.success)
                            p.success(result, message);
                        else
                            mainTreeGrid.treegrid('reload');

                    },
                    error: function (message) {
                        if (p.error)
                            p.error(message);
                        else if (message)
                            GlobalTools.showError(message);
                    }
                });
            }
        });
    };
    //批量启用TreeGrid记录
    GlobalTools.unDeleteTreeGridList = function (mainTreeGrid, options) {
        var p = options || {};
        var deleteDatas = mainTreeGrid.treegrid('getSelections');
        if (!deleteDatas || deleteDatas.length == 0) return;
        $.messager.confirm('操作确认', '确定要启用选中的记录吗?', function (result) {
            if (result) {
                var idArr = new Array();
                for (index in deleteDatas) {
                    idArr.push(deleteDatas[index].id);
                }
                GlobalTools.ajax({
                    dataType: "json",
                    url: p.url,
                    data: $.extend({ ids: idArr.join(',') }, p.data),
                    success: function (result, message) {
                        if (p.success)
                            p.success(result, message);
                        else
                            mainTreeGrid.treegrid('reload');

                    },
                    error: function (message) {
                        if (p.error)
                            p.error(message);
                        else if (message)
                            GlobalTools.showError(message);
                    }
                });
            }
        });
    };
    //批量销毁TreeGrid记录
    GlobalTools.destroyTreeGridList = function (mainTreeGrid, options) {
        var p = options || {};
        var destroyDatas = mainTreeGrid.treegrid('getSelections');
        if (!destroyDatas || destroyDatas.length == 0) return;
        $.messager.confirm('操作确认', '确定要彻底销毁选中的记录吗?', function (result) {
            if (result) {
                var idArr = new Array();
                for (index in destroyDatas) {
                    idArr.push(destroyDatas[index].id);
                }
                GlobalTools.ajax({
                    dataType: "json",
                    url: p.url,
                    data: $.extend({ ids: idArr.join(',') }, p.data),
                    success: function (result, message) {
                        if (p.success)
                            p.success(result, message);
                        else
                            mainTreeGrid.treegrid('reload');

                    },
                    error: function (message) {
                        if (p.error)
                            p.error(message);
                        else if (message)
                            GlobalTools.showError(message);
                    }
                });
            }
        });
    };
})(jQuery);

/*****************************************以下是页面元素权限控制20141106zjb********************************************/
/**
 * 说明：页面加载完成的时候调用PageElementPrivilege.init()方法即可，
 * 对于那些在页面加载完成后才构造的页面元素，
 * 可以使用PageElementPrivilege.isshow(controlled)方法来进行权限控制；
 * 需要权限控制的元素必须新增 controlled 属性： controlled 唯一标识了这个元素
 * 新增属性的目的是为了不影响其它脚本对目标元素的引用
 * 受控制的操作元素的 controlled 属性值要和数据库中对应的受控标识(主键)的值一样
 * 目前角色和用户都可以独自分配页面元素的权限，其最终权限是2者的并集
 */
(function($){
    //页面元素权限控制对象
    window['PageElementPrivilege'] = {};
    var idstrs = "";//有权限的操作编码集合字符串
    var elementsByControl ;//需要受控的页面元素集合
    //初始化操作权限
    PageElementPrivilege.init = function(){
        elementsByControl = $("*[controlled]");
        $.each(elementsByControl, function(index, item) {
            $(item).css("display","none");
        });
        this.getPageElements();
    };
    //获取登录用户有权限的元素
    PageElementPrivilege.getPageElements = function(){
        GlobalTools.ajax({
            async:false,
            type : "POST",
            url : rootPath + "/Sys_menuoperation/GetMenuElementsFromSession.do",
            success : function(data){//将该用户有权限的元素可见，无权限的元素移除
                if (data != null) {
                    idstrs = "";
                    $.each(data, function(index, item) {
                        idstrs += "," + item.constname;
                    });
                    idstrs += ",";
                    $.each(elementsByControl, function(index, item) {
                        if (PageElementPrivilege.isshow($(item).attr('controlled'))) {//拥有当前元素的权限
                            $(item).css("display","");
                        }else{
                            $(item).replaceWith("");
                        }
                    });
                }else{
                    $.each(elementsByControl, function(index, item) {
                        $(item).replaceWith("");
                    });
                    idstrs = "";
                }
            },
            error:function(message){
                //GlobalTools.tip(message);
            }
        });
    };
    //判断拥有的操作权限编码中是否含有当前操作编码
    PageElementPrivilege.isshow = function(controlled){
        return idstrs.indexOf("," + controlled + ",") != -1;
    };
})(jQuery);
/*****************************************以上是操作权限控制********************************************/


if (!this.JSON2) {
    this.JSON2 = {};
}

(function ($) {
    "use strict";
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
            this.getUTCFullYear() + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate()) + 'T' +
            f(this.getUTCHours()) + ':' +
            f(this.getUTCMinutes()) + ':' +
            f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {
        if (string == "" || string == "null") return null;
        escapable.lastIndex = 0;
        return escapable.test(string) ?
        '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' :
        '"' + string + '"';
    }

    function str(key, holder) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : null;
            case 'boolean':
                return (value == true ? 1 : 0);
            case 'null':
                return null;
            case 'object':
                if (!value) {
                    return null;
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                        partial.join(',\n' + gap) + '\n' +
                        mind + ']' :
                        '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            //                            if (v) {
                            //                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            //                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            //                            if (v) {
                            //                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            //                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                    mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof JSON2.stringify !== 'function') {
        JSON2.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
                throw new Error('JSON2.stringify');
            }
            return str('', { '': value });
        };
    }
    if (typeof JSON2.parse !== 'function') {
        JSON2.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ?
                    walk({ '': j }, '') : j;
            }
            throw new SyntaxError('JSON2.parse');
        };
    }
})(jQuery);

$(function(){
    preventKeydown();
});

/**
 * 如果文本框设置了readonly属性
 * 必须取消其键盘点击事件，以防止按回退键的时候导致退回到上一页
 */
function preventKeydown(){
    $("input[type='text'][readonly]").keydown(function(e){
        if($.browser.msie || $.browser.webkit){
            e.preventDefault();
        }
    });
    $("textarea[readonly]").keydown(function(e){
        if($.browser.msie || $.browser.webkit){
            e.preventDefault();
        }
    });
}