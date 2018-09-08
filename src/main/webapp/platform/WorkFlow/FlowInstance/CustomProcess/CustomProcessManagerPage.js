var rootPath = "../../../../";
var insprocessid = Request("insprocessid");
var insactivityid = Request("insactivityid");
var recordid = Request("recordid");
var tabtitle = decodeURI(Request("tabtitle"));
var customRectInfos;
var customPathInfos;
var alloweditformcols = null;
var activityformid = null;
var whichNode;
var whichPath;
var isCustom = true;

$(function () {
    loadStartWorkflowButton();
    loadCustomProcess();
    //初始化人员选择对话框
    OrganizationTools.user_Init({ rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectUserOK });
});

function loadStartWorkflowButton() {
    $("#startFlowButtonToolbar").css("float", "right");
    //载入是否是新开启的自定义流程(是否需要显示启动节点)
    GlobalTools.ajax({
        url: rootPath + "Sys_ins_activity/IsShowStartButton.do",
        data: { currentinsactivityid: insactivityid },
        success: buildStartButton
    });
}

function buildStartButton(data) {
    if (data) {
        isCustom = false;
        $("#startFlowButtonToolbar").append("<a href=\"javascript:void(0)\" id=\"startFlowButton\" class=\"easyui-linkbutton\" onclick=\"startFlowButton()\"  data-options=\"plain:true,iconCls:'icon-ok'\">启动流程</a>");
        $("#startFlowButton").linkbutton();
    }
}

function startFlowButton() {
    GlobalTools.ajax({
        url: rootPath + "Sys_ins_activity/StartUpCustomFlow.do",
        data: { currentinsactivityid: insactivityid },
        success: startUpSuccess
    });
}

function startUpSuccess() {
    $("#startFlowButtonToolbar").empty();
    refreshFormPage();//刷新表单页面
    GlobalTools.tip("启动成功");
}

function refreshFormPage(){
    var tab = top.$("#tabs").tabs('getTab', tabtitle);
    var url = $(tab.panel('options').content).attr('src');
    url += url.lastIndexOf("?")!=-1?"&insactivityid="+insactivityid+"&recordid="+recordid:"?insactivityid="+insactivityid+"&recordid="+recordid;
    top.refreshTab(tabtitle,url);
}

//选择人员后回调函数
function selectUserOK(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text += ',';
            ids += ',';
        }
        text += item.text;
        ids += item.id.toString().ReplaceAll("user_", "");
    });
    $(sourceElement).combobox("setValue", text);
    // $(sourceElement).val(text);
    $(".combo-text", $(sourceElement).parent()).val(text);
    $("#actors").val(ids);
}

function loadCustomProcess() {
    GetCustomRectInfos();
    GetCustomPathInfos();
    if (isCustom) {
        getHistoryActiveRects();
        loadWorkFlowMap();
    }
    else {
        loadCustomWorkFlowMap();
    }
}

function GetCustomRectInfos() {
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        url: rootPath + "Sys_custom_activity/GetCustomRectInfos.do",
        data: { "insactivityid": insactivityid },
        success: function (data) {
            if (typeof data == "string") {
                if (data) {
                    customRectInfos = data;
                }
            }
            else {
                customRectInfos = "";
            }
        }
    });
}

function GetCustomPathInfos() {
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        url: rootPath + "Sys_custom_transition/GetCustomPathInfos.do",
        data: { "insactivityid": insactivityid },
        success: function (data) {
            if (typeof data == "string") {
                if (data) {
                    customPathInfos = data;
                }
            }
            else {
                customPathInfos = "";
            }
        }
    });
}
//获取历史和在办的节点信息
function getHistoryActiveRects() {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: rootPath + "Sys_ins_process/GetWFViewInfos.do",
        data: {insactivityid: insactivityid,insprocessid:insprocessid},
        success: function (data) {
            info = eval("(" + data + ")");
        }
    });
}

//绘制流程图
function loadCustomWorkFlowMap() {
    try {
        var restore = "{states:{},paths:{}}";
        if (customRectInfos) {
            if (customPathInfos) {
                restore = "{states:{" + customRectInfos + "},paths:{" + customPathInfos + "}}";
            }
            else {
                restore = "{states:{" + customRectInfos + "}}";
            }
        }
        $("#myflow").html(""); //清除上一次的图
        $('#myflow').myflow(
            {
                basePath: "",
                restore: eval("(" + restore + ")")
            });
    }
    catch (e)
    { alert(e); }
}

//加载流程图 包括历史和激活的
function loadWorkFlowMap() {
    try {
        var restore = "{states:{},paths:{}}";
        if (customRectInfos) {
            if (customPathInfos) {
                restore = "{states:{" + customRectInfos + "},paths:{" + customPathInfos + "}}";
            }
            else {
                restore = "{states:{" + customRectInfos + "}}";
            }
        }
        $("#myflow").html(""); //清除上一次的图
        $('#myflow').myflow(
            {
                basePath: "",
                restore: eval("(" + restore + ")"),
                activeRects: {// 当前激活状态
                    rects: eval("([" + info.activeRects + "])")
                },
                historyRects: {// 历史激活状态
                    rects: eval("([" + info.historyRects + "])")
                }
            });
    }
    catch (e)
    { alert(e); }
}

//节点所有信息的编辑tab
function addCustomAcitvityEditPages() {
    $("#editPanel").panel({ href: "CustomActivityInfo.htm", onLoad: loadCustomActivityInfo });
}
function addCustomTransitionEditPage() {
    $("#editPanel").panel({ href: "CustomTransitionInfo.htm", onLoad: loadCustomActivityTransitionInfo });
}


function loadCustomActivityTransitionInfo() {
    if (whichPath && whichPath.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#customTransitionform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_custom_transition/LoadForm.do",
            data: { id: whichPath.props.id.value }
        });
        if (!whichPath.editable) {
            hideCustomTransitionButtons();
        }
    }
}

function loadCustomActivityInfo() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#customActivityform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_custom_activity/LoadForm.do",
            data: { id: whichNode.props.id.value }
        }, loadGrid);
        if (!whichNode.editable) {
            hideCustomActvityInfoButtons();
        }
    }
}

var requriedCols = null;
function loadGrid(data) {
    if (data.sys_custom_activityform) {
        var tailorformid = data.sys_custom_activityform.tailorformid;
        alloweditformcols = data.sys_custom_activityform.alloweditformcols;
        activityformid = data.sys_custom_activityform.id;

        GlobalTools.ajax({
            async: false,
            url: rootPath + "Sys_custom_activityform/LoadForm.do",
            data: { id: activityformid },
            success: function (data) {
                if (data && data.requiredcols) {
                    requriedCols = data.requiredcols;
                }
            }
        });

        $.ajax({
            url: rootPath + "Sys_def_tailorformcol/LoadTailorFormColUsedList.do?tailorformid=" + tailorformid,
            type: "get",
            success: function (data) {
                for (var index in data) {
                    data[index].required = setRequiredValue(data[index].tablename.toLowerCase() + "." + data[index].colname.toLowerCase());
                }
                $('#divSelectFormCols').datagrid('loadData', data);
            }
        });
    }
}

function setRequiredValue(colValue) {
    if (alloweditformcols && requriedCols && isExistStr(requriedCols, colValue)) {
        return 1;
    }
    else
        return null;
}
//用于字段列表初始化时判断是否已经选择
function isExistStr(source, target) {
    if (("," + source + ",").indexOf("," + target + ",") >= 0) {
        return true;
    }
    return false;
}
function loadAllowEditCols(data) {
    if (alloweditformcols && data && data.total > 0) {
        for (var i in data.rows) {
            if (isExistStr(alloweditformcols.toLowerCase(), (data.rows[i].tablename + "." + data.rows[i].colname).toLowerCase())) {
                $('#divSelectFormCols').datagrid('selectRow', i);
            }

        }
    }
}

function formatterColType(value, row, index) {
    var result = "";
    switch (row.tablename) {
        case "virtualsubtable":
            result = "子表";
            break;
        case "virtualmindtable":
            result = "意见字段";
            break;
        default:
            if (row.formuserule == 1) {
                result = "表字段（显示使用）";
            }
            else if (row.formuserule == 2) {
                result = "表字段（隐藏使用）";
            }
            break;
    }
    return result;
}

function actornamesClick() {
    var type = $("#customactivitytype").val();
    var isMulti = false;
    if (type && type == "countersign") {
        isMulti = true;
    }
    $(this).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ sourceElement: this, sigleSelect: !isMulti });
}

function saveCustomTransitionform() {
    GlobalTools.submitForm($("#customTransitionform"), { success: saveCustomTransitoinSuccess, error: saveFormError });
}
function saveCustomActivityform() {
    GlobalTools.submitForm($("#customActivityform"), { success: saveCustomActivityFormSuccess, error: saveFormError });
}

function saveCustomTransitoinSuccess(data) {

    var isNeedChange = false;
    var paths = eval("({" + customPathInfos + "})");
    for (var index in paths) {
        if (paths[index].props.id.value == data.sys_custom_transition.id && paths[index].text.text != data.sys_custom_transition.chinaname) {
            paths[index].text.text = data.sys_custom_transition.chinaname;
            isNeedChange = true;
            break;
        }
    }
    if (isNeedChange) {
        customPathInfos = getPathJsonStr(paths);
        loadCustomWorkFlowMap();
    }
}

//节点保存成功 更新流程图中对应节点
function saveCustomActivityFormSuccess(data) {
    var isNeedChange = false;
    var nodes = eval("({" + customRectInfos + "})");
    for (var index in nodes) {
        if (nodes[index].props.id.value == data.sys_custom_activity.id && nodes[index].text.text != data.sys_custom_activity.chinaname) {
            nodes[index].text.text = data.sys_custom_activity.chinaname;
            isNeedChange = true;
            break;
        }
    }
    if (isNeedChange) {
        customRectInfos = getRectJsonStr(nodes);
        loadCustomWorkFlowMap();
    }
    refreshFormPage();//每保存一个步骤节点信息都必须刷新一下表单页面，以便重载按钮
}
function getRectJsonStr(nodes) {
    var tempRectStr = "";
    for (var index in nodes) {

        tempRectStr += index + ":{type:'" + nodes[index].type + "',text:{text:'" + nodes[index].text.text + "'}, attr:{ x:" + nodes[index].attr.x + ", y:" + nodes[index].attr.y + ", width:" + nodes[index].attr.width + ", height:" + nodes[index].attr.height + "}, editable:" + nodes[index].editable + ",iscurrentrect:" + nodes[index].iscurrentrect + ",props:{id:{value:'" + nodes[index].props.id.value + "'}}},";
    }
    if (tempRectStr.substring(tempRectStr.length - 1, tempRectStr.length) == ',') {
        tempRectStr = tempRectStr.substring(0, tempRectStr.length - 1);
    }
    return tempRectStr;
}


function saveCustomActivityColsform() {
    $('#divSelectFormCols').datagrid("acceptChanges");

    var selectdata = $("#divSelectFormCols").datagrid('getSelections');
    var selectArray = new Array();
    var requiredcols = new Array();
    for (var i in selectdata) {
        selectArray.push((selectdata[i].tablename + "." + selectdata[i].colname).toLowerCase());
        if (selectdata[i].required == 1) {
            requiredcols.push((selectdata[i].tablename + "." + selectdata[i].colname).toLowerCase());
        }
    }
    GlobalTools.ajax({
        url: rootPath + "Sys_custom_activityform/UpdateEditableCols.do",
        data: { id: activityformid, alloweditformcols: selectArray.join(","), requiredcols: requiredcols.join(",") }
    });

}

function saveFormError() {
    GlobalTools.tip("保存失败");
}

function getPathJsonStr(paths) {
    var tempPathStr = "";
    for (var index in paths) {
        tempPathStr += index + ":{from:'" + paths[index].from + "',to:'" + paths[index].to + "', dots:[" + getDotsStr(paths[index].dots) + "],text:{text:'" + paths[index].text.text + "'},textPos:{x:" + paths[index].textPos.x + ",y:" + paths[index].textPos.y + "}, props:{id:{value:'" + paths[index].props.id.value + "'},startcustomactivityid:{value:'" + paths[index].props.startcustomactivityid.value + "'},endcustomactivityid:{value:'" + paths[index].props.endcustomactivityid.value + "'}}},";
    }
    if (tempPathStr.substring(tempPathStr.length - 1, tempPathStr.length) == ',') {
        tempPathStr = tempPathStr.substring(0, tempPathStr.length - 1);
    }
    return tempPathStr;
}
function getDotsStr(obj) {
    var str = "";
    if (obj && obj.length > 0) {
        for (var index in obj) {
            str += "{x:" + obj[index].x + ",y:" + obj[index].y + "},";
        }
    }
    if (str.substring(str.length - 1, str.length) == ',') {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

function hideCustomActvityInfoButtons() {
    $("#saveCustomActivityForm").linkbutton("disable");
    $("#saveCustomActivityColsForm").linkbutton("disable");
    $("#customActivityChinaname").attr("disabled", "disabled");
    $("#sys_custom_activityTimelimit").attr("disabled", "disabled");
    $("#sys_custom_activityLimitunit").combobox("disable");
    $("#actornames").combobox("disable");
}
function hideCustomTransitionButtons() {
    $("#saveCustomTransitionForm").linkbutton("disable");
}

//单击列表行
function onClickColsListRow(index, rowData) {
    $('#divSelectFormCols').datagrid('beginEdit', index);
}