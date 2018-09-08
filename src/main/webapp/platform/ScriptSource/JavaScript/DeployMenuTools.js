var rootPath = '../../';
var currentUserPerm = "";
function initDeployMenuTools() {
    clockon(); //开启时钟
    //getUserInfo(); //用户名
    DeployInitLeftMenu(); //正式发布时使用的菜单
    tabClose();
    tabCloseEven();
}

var treeMenuSetting = {
    view: {
        showLine: false,
        selectedMulti: false,
        dblClickExpand: false,
        showTitle: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: false,
            idKey: "id",
            pIdKey: "parentid"
        }
    },
    async: {//异步加载
        enable: true, //开启异步加载\
        url: rootPath + "Sys_menu/LoadChildMenuList.do",
        dataFilter: ajaxDataFilter,
        autoParam: ["id=menuid"]
    },
    callback: {
        onClick: treeLeftMenu_onClick
    }
};
function addDiyDom(treeId, treeNode) {
    var spaceWidth = 5;
    var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);

    if (treeNode.level > 1) {
        var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
        switchObj.before(spaceStr);
    }
}
function treeLeftMenu_onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeLeftMenu");
    zTree.expandNode(treeNode);
    if (treeNode.mainurl != undefined) {
        addTab(treeNode.name, (rootPath + treeNode.mainurl));
    }
}
function ajaxDataFilter(treeid, parentNode, childNodes) {
    if (!childNodes) return null;
    for (var i = 0; i < childNodes.length; i++) {
        childNodes[i].icon = rootPath + childNodes[i].menuicon;
        childNodes[i].isParent = (childNodes[i].state == "closed");
    }
    return childNodes;
}

//正式发布时使用的菜单
function DeployInitLeftMenu() {
    initFirstMenus();
}

//初始化一级菜单（正式发布使用）
function initFirstMenus() {
    var firstMenuList;
    GlobalTools.ajax({
        dataType: "json",
        async: false,
        url: rootPath + "Sys_user/GetCurrentUserPerm.do",
        success: function (data, msg) {
            currentUserPerm = data.userperm;
        }
    });
    if (currentUserPerm == "") return;
    GlobalTools.ajax({
        dataType: "json",
        async: false,
        data: { permstring: currentUserPerm },
        url: rootPath + "Sys_menu/LoadFirstMenuList.do",
        success: function (data, msg) {
            firstMenuList = (typeof data == 'string') ? eval('(' + data + ')') : data;
        }
    });


    $("#firstMenu").empty(); //清空一级菜单div
    var firstMenusHtml = "";
    $.each(firstMenuList, function (i, item) {
        firstMenusHtml += "<a href='#' id='aFirstMenu" + item.id + "' class='easyui-linkbutton'  onclick=\'loadChildMenuList(" + JSON2.stringify(item) + "); tabClickStyleChange(this);' data-options='plain:true' >" + item.name + "</a>";
        if (i == 0) {
            loadChildMenuList(item);
        }
    });
    $("#firstMenu").append(firstMenusHtml);
    $.parser.parse($("#firstMenu"));
}
//点击一级菜单后，样式的变化
function tabClickStyleChange(item) {
    var $this = $(item);
    $this.prevAll().css("background-color", "");
    $this.nextAll().css("background-color", "");
    $(item).css("background-color", "green");
}

//动态改变左侧子菜单树（正式发布使用）
function loadChildMenuList(menu) {
    var menuPanel = $("#west").parent();
    menuPanel.find("div.panel-title").text(menu.name);
    treeMenuSetting.async.otherParam = { menurootid: menu.id, permstring: currentUserPerm };

    $.fn.zTree.init($("#treeLeftMenu"), treeMenuSetting);

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

//将相对根路径推迟到本js中添加
function addTab_v1(subtitle, url) {
    url = rootPath+url;
    addTab(subtitle, url);
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

//开启时钟
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

//先关闭tab页，然后再打开tab页
function closeThenAddTab(tabTitle, url) {
    var currentTabIndex = getCurrentTab();
    top.closeTab(currentTabIndex);
    addTab(tabTitle, url);
}

//获取用户信息
function getUserInfo() {
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_user/GetCurrentUserInfo.do",
        success: function (data) {
            if (data.rolechinanames)
                $("#loginname").html(data.rolechinanames.split(',')[0] + "&nbsp;&nbsp;" + data.chinaname);
            else
                $("#loginname").html(data.chinaname);
        }
    });
}