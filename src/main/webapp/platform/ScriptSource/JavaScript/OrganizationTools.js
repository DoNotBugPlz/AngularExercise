/**
 *
 *
 *
 *依赖JQuery EasyUI的Dialog和Tree控件
 *
 */
(function ($) {

    window['OrganizationTools'] = {}; //全局系统对象

    //#region 选择人员对话框
    var user_Defaults = {
        rootPath: "../",
        loadDataUrl: "Sys_dept/LoadListDeptUsersTree.do",
        id: "divSelectUser",
        sourceElement: null,
        title: "人员选择",
        width: 400,
        height: 500,
        deptid: "",//指定根节点
        basisCurrentUser: false, //树根节点根据当前用户获取（优先级高）
        sigleSelect: false, //人员选择是否单选
        maxLevel:null,
        onlyLeafCheck:false,
        /**
         *当单选时，在点击对应人员时触发；当复选时，点击确定按钮时触发
         *jsonNodes为node数组，形如：[{"id":user_1,"text":"名称1",...},{"id":user_2,"text":"名称2",...}]
         */
        onOKClick: function (jsonNodes, sourceElement) { },
        onCancelClick: function (jsonNodes, sourceElement) { }
    };

    _user_Options_init = function (setting) {
        return $.extend(user_Defaults, setting);
    };

    /**
     *初始化，在body的结尾加入必要的HTML标签
     */
    OrganizationTools.user_Init = function (setting) {
        var user_Options = _user_Options_init(setting);

        var htmlDialog = "";
        htmlDialog = "<div id=\"" + user_Options.id + "\" style=\"padding: 10px;\">";
        htmlDialog += "<ul id=\"" + user_Options.id + "_Tree\"></ul>";
        htmlDialog += "</div>";
        $("body").append(htmlDialog);
        //if (!user_Options.sigleSelect) {
        var htmlDlgButtons = "";
        htmlDlgButtons = "<div id=\"" + user_Options.id + "_dlg-buttons\">";
        htmlDlgButtons += "<a href=\"javascript:void(0)\" id=\"linkOkBtn_" + user_Options.id + "\" class=\"easyui-linkbutton\">确定</a>";
        htmlDlgButtons += "<a href=\"javascript:void(0)\" id=\"linkCancelBtn_" + user_Options.id + "\" class=\"easyui-linkbutton\"> 取消</a>";
        htmlDlgButtons += "</div>";
        $("body").append(htmlDlgButtons);

        $('#linkOkBtn_' + user_Options.id).linkbutton({
            iconCls: 'icon-ok'
        });

        $('#linkCancelBtn_' + user_Options.id).linkbutton({
            iconCls: 'icon-cancel'
        });

        //}
        $("#" + user_Options.id).dialog({
            title: user_Options.title,
            width: user_Options.width,
            height: user_Options.height,
            closed: true,
            iconCls: 'icon-save',
            animate: true,
            modal: true,
            buttons: '#' + user_Options.id + '_dlg-buttons'
        });
    };
    /**
     *调用选择人员对话框
     */
    OrganizationTools.user_ShowSelectDialog = function (options) {
        var user_Options = _user_Options_init(options);
        //确认和取消按钮添加回调事件
        $("#linkOkBtn_" + user_Options.id).unbind("click").click(function () {
            var nodes = $("#" + user_Options.id + "_Tree").tree('getChecked');

            var jsonResult = [];
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id.indexOf("dept") < 0) {
                    jsonResult.splice(0, 0, nodes[i]);
                }
            }

            user_Options.onOKClick(jsonResult, user_Options.sourceElement);
            $("#" + user_Options.id).dialog("close");
        });
        $("#linkCancelBtn_" + user_Options.id).unbind("click").click(function () {
            user_Options.onCancelClick( user_Options.sourceElement);
            $("#" + user_Options.id).dialog("close");
        });

        var strUrl = user_Options.rootPath + user_Options.loadDataUrl;
        if (user_Options.deptid != "") {
            strUrl += "?deptid=" + user_Options.deptid;
        }
        if (user_Options.basisCurrentUser) {//限定当前用户所在的部门，需要后台根据布尔类型的basisCurrentUser参数进行判断
            strUrl += (strUrl.indexOf('?') >= 0 ? "&" : "?") + "basisCurrentUser=" + user_Options.basisCurrentUser;
        }
        if (user_Options.sigleSelect) {
            $("#" + user_Options.id + "_Tree").tree({
                url: strUrl,
                checkbox: false,
                onBeforeSelect: function (node) {
                    if (node.id.indexOf("dept") < 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                onSelect: function (node) {
                    var jsonResult = [];
                    jsonResult.splice(0, 0, node);
                    user_Options.onOKClick(jsonResult, user_Options.sourceElement);
                    $("#" + user_Options.id).dialog("close");
                },
                onBeforeExpand:limitLevel
            });
        }
        else {
            $("#" + user_Options.id + "_Tree").tree({
                url: strUrl,
                onlyLeafCheck: user_Options.onlyLeafCheck,
                checkbox: true,
                onBeforeExpand:limitLevel,
                //                onBeforeCheck: function (node, checked) {
                //                    $("#" + user_Options.id + "_Tree").tree('expandAll', node.target);
                //                    $("#" + user_Options.id + "_Tree").tree('check', node.target);
                //                },
                onBeforeLoad: function (node, data) {
                    //                if(node!=null)
                    //                    alert(node.text);
                    //                    var parentNode = $("#" + user_Options.id + "_Tree").tree('getParent', node.target);
                    //                    if (parentNode.checked) {
                    //                        $("#" + user_Options.id + "_Tree").tree('check', node.target);
                    //                    }
                }
            });
        }
        /**
         * 限制部门人员树层级访问
         * @param node
         * @returns {boolean}
         */
        function limitLevel(node){
            if(user_Options.maxLevel && $(this).tree("getLevel",node.target) >= user_Options.maxLevel){
                return false;
            }
        }
        $("#" + user_Options.id).dialog("open");
    };
    //#endregion 选择人员对话框

    //#region 选择单位对话框
    var dept_Defaults = {
        rootPath: "../",
        id: "divSelectDept",
        loadDataUrl: "Sys_dept/LoadListDeptTree.do",
        sourceElement: null,
        title: "单位选择",
        width: 400,
        height: 500,
        sigleSelect: true,
        cascadeCheck: true,
        deptid: "",
        maxLevel:null,
        //basisCurrentUser: false, //树根节点根据当前用户获取
        onOKClick: function (jsonNodes, sourceElement) { },
        onCancelClick: function (jsonNodes, sourceElement) { }
    };

    _dept_Options_init = function (setting) {
        return $.extend(dept_Defaults, setting);
    };

    /**
     *初始化，在body的结尾加入必要的HTML标签
     */
    OrganizationTools.dept_Init = function (setting) {
        var dept_Options = _dept_Options_init(setting);

        var htmlDialog = "";
        htmlDialog = "<div id=\"" + dept_Options.id + "\" style=\"padding: 10px;\">";
        htmlDialog += "<ul id=\"" + dept_Options.id + "_Tree\"></ul>";
        htmlDialog += "</div>";
        $("body").append(htmlDialog);

        if (!dept_Options.sigleSelect) {
            var htmlDlgButtons = "";
            htmlDlgButtons = "<div id=\"" + dept_Options.id + "_dlg-buttons\">";
            htmlDlgButtons += "<a href=\"javascript:void(0)\" id=\"linkOkBtn_" + dept_Options.id + "\" class=\"easyui-linkbutton\">确定</a>";
            htmlDlgButtons += "<a href=\"javascript:void(0)\" id=\"linkCancelBtn_" + dept_Options.id + "\" class=\"easyui-linkbutton\"> 取消</a>";
            htmlDlgButtons += "</div>";
            $("body").append(htmlDlgButtons);

            $('#linkOkBtn_' + dept_Options.id).linkbutton({
                iconCls: 'icon-ok'
            });

            $('#linkCancelBtn_' + dept_Options.id).linkbutton({
                iconCls: 'icon-cancel'
            });
        }

        $("#" + dept_Options.id).dialog({
            title: dept_Options.title,
            width: dept_Options.width,
            height: dept_Options.height,
            closed: true,
            modal: true,
            iconCls: 'icon-save',
            buttons: '#' + dept_Options.id + '_dlg-buttons'
        });
    };

    /**
     *调用选择单位对话框
     */
    OrganizationTools.dept_ShowSelectDialog = function (options) {
        var dept_Options = _dept_Options_init(options);

        //确认和取消按钮添加回调事件
        $("#linkOkBtn_" + dept_Options.id).unbind("click").click(function () {
            var jsonResult = $("#" + dept_Options.id + "_Tree").tree('getChecked');
            dept_Options.onOKClick(jsonResult, dept_Options.sourceElement);
            $("#" + dept_Options.id).dialog("close");
        });
        $("#linkCancelBtn_" + dept_Options.id).unbind("click").click(function () {
            dept_Options.onCancelClick(dept_Options.sourceElement);
            $("#" + dept_Options.id).dialog("close");
        });

        var strUrl = dept_Options.rootPath + dept_Options.loadDataUrl;
        if (dept_Options.deptid != "") {
            strUrl += "?deptid=" + dept_Options.deptid;
        }
        /*if (dept_Options.basisCurrentUser) {
         strUrl += (strUrl.indexOf('?') >= 0 ? "&" : "?") + "basisCurrentUser=" + dept_Options.basisCurrentUser;
         }*/

        if (dept_Options.sigleSelect) {
            $("#" + dept_Options.id + "_Tree").tree({
                url: strUrl,
                checkbox: false,
                onSelect: function (node) {
                    var jsonResult = [];
                    jsonResult.splice(0, 0, node);
                    dept_Options.onOKClick(jsonResult, dept_Options.sourceElement);
                    $("#" + dept_Options.id).dialog("close");
                },
                onBeforeExpand:limitLevel
            });
        }
        else {
            $("#" + dept_Options.id + "_Tree").tree({
                url: strUrl,
                cascadeCheck: dept_Options.cascadeCheck,
                //              onlyLeafCheck: true,//叶子节点显示复选框
                checkbox: true,
                onBeforeExpand:limitLevel
            });
        }

        /**
         * 限制部门树层级访问
         * @param node
         * @returns {boolean}
         */
        function limitLevel(node){
            if(dept_Options.maxLevel && $(this).tree("getLevel",node.target) >= dept_Options.maxLevel){
                return false;
            }
        }


        $("#" + dept_Options.id).dialog("open");
    };

    //#endregion 选择单位对话框

})(jQuery);
