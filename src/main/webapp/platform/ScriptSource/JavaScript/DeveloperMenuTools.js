var rootPath = '../../';
var _menus = { "menus": [
						{ "menuid": "1", "icon": "icon-sys", "menuname": "系统管理",
						    "menus": [{ "menuname": "菜单管理", "icon": "icon-nav", "url": rootPath + "platform/SystemManager/SystemMenu/MenuManagePage.htm" },
									  { "menuname": "字典管理", "icon": "icon-add", "url": rootPath + "platform/SystemManager/Category/CategoryManagerPage.htm" },
                                      { "menuname": "单位管理", "icon": "icon-dept", "url": rootPath + "platform/Organization/Dept_manager_page.htm" },
                                      { "menuname": "用户管理", "icon": "icon-users", "url": rootPath + "platform/Organization/User_manager_page.htm" },
									  { "menuname": "API管理", "icon": "icon-users", "url": rootPath + "platform/SystemManager/ApiDescriptionPage.htm" },
									  { "menuname": "API权限管理", "icon": "icon-users", "url": rootPath + "platform/Authority/ApiManagerPage.htm" },
									  { "menuname": "角色管理", "icon": "icon-role", "url": rootPath + "platform/Authority/RoleManagerPage.htm" },
									  { "menuname": "权限设置", "icon": "icon-set", "url": "demo.html" },
									  { "menuname": "系统操作日志", "icon": "icon-log", "url": rootPath + "platform/SystemManager/SystemLogManager/OperationlogManager.htm" },
									  { "menuname": "系统异常日志", "icon": "icon-log", "url": rootPath + "platform/SystemManager/SystemLogManager/ExceptionLogManager.htm" },
									  { "menuname": "系统数据维护", "icon": "icon-log", "url": rootPath + "platform/SystemManager/DataBaseManager/DataBaseManager.htm" },
									  { "menuname": "物理表列表", "icon": "icon-log", "url": rootPath + "platform/SystemManager/TablesStruck/TablesRemarkManagePage.htm" },
									  { "menuname": "有效工作日管理", "icon": "icon-log", "url": rootPath + "platform/SystemManager/EffectDateConfigEditPage.htm" },
									  { "menuname": "办公用语管理", "icon": "icon-log", "url": rootPath + "platform/OfficeDiction/Officediction_list_page.htm" },
									  { "menuname": "所有代理人管理", "icon": "icon-log", "url": rootPath + "platform/ProxyerManage/Proxyer_list_page.htm" },
									  { "menuname": "登录人的代理人管理", "icon": "icon-log", "url": rootPath + "platform/ProxyerManage/Proxyer_current_list_page.htm"}]
						},
                        { "menuid": "8", "icon": "icon-sys", "menuname": "通知管理",
                            "menus": [{ "menuname": "通知登记", "icon": "icon-add", "url": rootPath + "platform/NoticeBulletin/Notice_reg_page.htm" },
									  { "menuname": "通知列表", "icon": "icon-nav", "url": rootPath + "platform/NoticeBulletin/Notice_list_page.htm" },
									  { "menuname": "铁路封页打印", "icon": "icon-nav", "url": rootPath + "platform/Tlga/tlgaPrint.htm" }, { "menuname": "铁路背签word打印", "icon": "icon-nav", "url": rootPath + "platform/Tlga/tlga_bjq_print.htm" }, { "menuname": "铁路背签excel打印", "icon": "icon-nav", "url": rootPath + "Tlga/tlga_bjq_xls_print.htm" }, { "menuname": "铁路档案打印", "icon": "icon-nav", "url": rootPath + "Tlga/tlga_da_print.htm" }, { "menuname": "铁路档案号excel打印", "icon": "icon-nav", "url": rootPath + "Tlga/tlga_dah_print.htm"}]
                        },
                        { "menuid": "56", "icon": "icon-sys", "menuname": "工作流模型管理",
                            "menus": [{ "menuname": "工作流绘制", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowModel/ModelManagerPage.htm" },
                                      { "menuname": "工作流模型列表", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowModel/ModelProcessList.htm" },
                                      { "menuname": "活动操作配置", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowModel/ModelActivityOperationList.htm" },
                                      { "menuname": "迁移条件配置", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowModel/ModelTransConditionList.htm"}]
                        },
                        { "menuid": "56", "icon": "icon-sys", "menuname": "工作流定义管理",
                            "menus": [{ "menuname": "工作流定义列表", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowDefine/DefineProcessList.htm"}]
                        },
                        { "menuid": "28", "icon": "icon-sys", "menuname": "电子表单管理",
                            "menus": [{ "menuname": "表单定制", "icon": "icon-nav", "url": rootPath + "platform/TailorFormManager/TailorFormManagerPage.htm" },
                                      { "menuname": "表单子表配置", "icon": "icon-nav", "url": rootPath + "platform/SubTailorFormManager/SubTailorFormManager.htm" },
                                      { "menuname": "表单子表测试", "icon": "icon-nav", "url": rootPath + "platform/SubTailorFormManager/VirtualSubTable.htm" },
						   			  { "menuname": "书签管理", "icon": "icon-nav", "url": rootPath + "platform/TemplateManager/BookMarkeManager.htm" },
						   			  { "menuname": "自定义模板管理", "icon": "icon-nav", "url": rootPath + "platform/CustomTemplate/CustomTemplate_list.htm" },
						   			  { "menuname": "WebOffice", "icon": "icon-nav", "url": rootPath + "platform/TemplateManager/BookMarkeInsert.htm" },
									  { "menuname": "电子表单测试", "icon": "icon-nav", "url": rootPath + "platform/TailorFormFolder/notice_reg.htm" },
									  { "menuname": "电子表单测试1", "icon": "icon-nav", "url": rootPath + "platform/TailorFormFolder/test.htm" },
                                      { "menuname": "自定义列表配置", "icon": "icon-nav", "url": rootPath + "platform/PageListManager/PageListManager.htm" },
                                      { "menuname": "自定义列表测试", "icon": "icon-nav", "url": rootPath + "platform/Demo/AutoPageListTest.htm"}]
                        },
                        { "menuid": "39", "icon": "icon-sys", "menuname": "流程测试",
                            "menus": [
									  { "menuname": "流程代办列表", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowInstance/WorkFlowList.htm" },
                                      { "menuname": "流程代办代理列表", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowInstance/WorkFlow_list_proxyer.htm" },
									  { "menuname": "电子表单测试", "icon": "icon-nav", "url": "/shop/orders.aspx" },
									  { "menuname": "表单流程测试", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowInstance/TailorFormWorkFlow.htm?constname=Constname" },
                                      { "menuname": "测试多连线", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowInstance/TailorFormWorkFlow.htm?constname=simpleworkflow" },
									  { "menuname": "表单模板打印测试", "icon": "icon-nav", "url": rootPath + "platform/WorkFlow/FlowInstance/TailorFormWorkFlow.htm?constname=printtemp"}]
                        },
                        { "menuid": "40", "icon": "icon-sys", "menuname": "系统工具",
                            "menus": [{ "menuname": "加解密工具", "icon": "icon-nav", "url": rootPath + "platform/Tools/SkyEnCodeToolPage.htm" },
						   			  { "menuname": "附件管理", "icon": "icon-nav", "url": rootPath + "platform/Demo/UploadFileDemo.htm" }, { "menuname": "导入测试", "icon": "icon-nav", "url": rootPath + "platform/Organization/import_user_info.htm"}]
                        }
                        ]
};
$(function () {
    clockon(); //开启时钟
    DeveloperInitLeftMenu(); //研发阶段使用的菜单
    tabClose();
    tabCloseEven();
});

//研发阶段使用的菜单，仅支持两级
function DeveloperInitLeftMenu() {
    $("#menuListAccordion").empty();
    var menulist = "";

    $.each(_menus.menus, function (i, n) {
        menulist += '<div title="' + n.menuname + '"  icon="' + n.icon + '" style="overflow:auto;">';
        menulist += '<ul>';
        $.each(n.menus, function (j, o) {
            menulist += '<li><a pageUrl="' + o.url + '" style="cursor:pointer;" ><span class="icon ' + o.icon + '" ></span>' + o.menuname + '</a></li> ';
        })
        menulist += '</ul></div>';
    })

    $("#menuListAccordion").append(menulist);

    $('#menuListAccordion li a').click(function () {
        var tabTitle = $(this).text();
        var url = $(this).attr("pageUrl");
        addTab(tabTitle, url);
        $('#menuListAccordion li div').removeClass("selected");
        $(this).parent().addClass("selected");
    }).hover(function () {
        $(this).parent().addClass("hover");
    }, function () {
        $(this).parent().removeClass("hover");
    });

    $("#menuListAccordion").attr("class", "easyui-accordion");
    $("#menuListAccordion").accordion();
}

function addTab(subtitle, url) {
    if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            title: subtitle,
            content: createFrame(url),
            closable: true,
            width: $('#mainPanle').width() - 10,
            height: $('#mainPanle').height() - 26
        });
    } else {
        $('#tabs').tabs('select', subtitle);
        $('#tabs').tabs('update', {
            tab: $('#tabs').tabs('getTab', subtitle),
            options: {
                title: subtitle,
                content: createFrame(url),
                closable: true,
                width: $('#mainPanle').width() - 10,
                height: $('#mainPanle').height() - 26
            }
        });
    }
    tabClose();
}
//关闭Tab
function closeTab(subtitle) {
    $('#tabs').tabs('close', subtitle);
}
function getCurrentTab() {
    var tab = $('#tabs').tabs('getSelected');
    if (tab) {
        return $('#tabs').tabs('getTabIndex', tab);
    }
}
function getTabTitle() {
    var tab = $('#tabs').tabs('getSelected');
    if (tab) {
        return tab.panel('options').title;
    }
}
function createFrame(url) {
    var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
    return s;
}

function tabClose() {
    /*双击关闭TAB选项卡*/
    $(".tabs-inner").dblclick(function () {
        var subtitle = $(this).children("span").text();
        $('#tabs').tabs('close', subtitle);
    })

    $(".tabs-inner").bind('contextmenu', function (e) {
        $('#mm').menu('show', {
            left: e.pageX,
            top: e.pageY
        });

        var subtitle = $(this).children("span").text();
        $('#mm').data("currtab", subtitle);

        return false;
    });
}
//绑定右键菜单事件
function tabCloseEven() {
    //关闭当前
    $('#mm-tabclose').click(function () {
        var currtab_title = $('#mm').data("currtab");
        $('#tabs').tabs('close', currtab_title);
    })
    //全部关闭
    $('#mm-tabcloseall').click(function () {
        $('.tabs-inner span').each(function (i, n) {
            var t = $(n).text();
            $('#tabs').tabs('close', t);
        });
    });
    //关闭除当前之外的TAB
    $('#mm-tabcloseother').click(function () {
        var currtab_title = $('#mm').data("currtab");
        $('.tabs-inner span').each(function (i, n) {
            var t = $(n).text();
            if (t != currtab_title)
                $('#tabs').tabs('close', t);
        });
    });
    //关闭当前右侧的TAB
    $('#mm-tabcloseright').click(function () {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length == 0) {
            GlobalTools.tip("后边没有啦~~");
            return false;
        }
        nextall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });
    //关闭当前左侧的TAB
    $('#mm-tabcloseleft').click(function () {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length == 0) {
            GlobalTools.tip("到头了，前边没有啦~~");
            return false;
        }
        prevall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });

    //退出
    $("#mm-exit").click(function () {
        $('#mm').menu('hide');
    });

    //刷新
    $("#mm-refresh").click(function () {
        $('#tabs').tabs('select', $('#mm').data("currtab"));
        var frame = $("iframe", $('#tabs').tabs('getSelected'));
        if (frame.length > 0) {
            frame[0].contentWindow.location.reload();
        }
    });
}

//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
    $.messager.alert(title, msgString, msgType);
}

function clockon() {
    var now = new Date();
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;

    $("#bgclock").html(time);

    var timer = setTimeout("clockon()", 200);
}
//重新加载指定tab页 （title：tab页的title，url：链接地址）
function refreshTab(tabTitle, url) {
    if ($('#tabs').tabs('exists', tabTitle)) {
        var tab = $("#tabs").tabs('getTab', tabTitle);
        $('#tabs').tabs('update', {
            tab: tab,
            options: {
                title: tabTitle,
                content: '<iframe scrolling="auto" frameborder="0"  src="' + url + '"  style="width:100%;height:100%;"></iframe>',
                fit: true,
                selected: true
            }
        });
    }
}

function closeThenAddTab(tabTitle, url) {
    var currentTabIndex = getCurrentTab();
    top.closeTab(currentTabIndex);

    addTab(tabTitle, url);
}