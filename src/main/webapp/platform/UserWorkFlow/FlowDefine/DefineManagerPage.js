var rootPath = "../../../";
var isSelected = false; //是否处于“选择”状态（点击“选择”）
var processid = Request("processid");
var processconstname = Request("constname");
var currentUnitId = Request("currentunitid"); //当前用户所在单位id
var rectPathIsFlowCustom = false; //节点和连线是否的标识是否由myflow重新定义过
var rectInfos = "";
var pathInfos = "";

$(function () {
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, sigleSelect: false, cascadeCheck: false, deptid: "", title: "选择单位", onOKClick: selectPointUnit, onCancelClick: cancelPointUnit });
    if (processid == null || processid == "") {
        GlobalTools.tip("流程不存在");
    }
    else {
        initMyFlow();
    }
});
/*流程初始化 获取流程数据*/
function initMyFlow() {
    GetRectInfos(processid);
    GetPathInfos(processid);
    loadWorkFlowMap();
    rectPathIsFlowCustom = false;
}
//绘制流程图
function loadWorkFlowMap() {
    try {
        var restore = "{states:{},paths:{}}";
        if (rectInfos != "") {
            if (pathInfos != "") {
                restore = "{states:{" + rectInfos + "},paths:{" + pathInfos + "}}";
            }
            else {
                restore = "{states:{" + rectInfos + "}}";
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

//获取节点
function GetRectInfos(processid) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: rootPath + "Sys_def_activity/GetRectInfos.do",
        data: "processdefineid=" + processid,
        success: function (data) {
            if (typeof data == "string") {
                if (data != "") {
                    rectInfos = data;
                }
            }
            else {
                rectInfos = "";
            }
        }
    });
}
//获取连线
function GetPathInfos(processid) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: rootPath + "Sys_def_transition/GetPathInfos.do",
        data: "processdefineid=" + processid,
        success: function (data) {
            if (typeof data == "string") {
                if (data != "") {
                    pathInfos = data;
                }
            }
            else {
                pathInfos = "";
            }
        }
    });
}

/*
流程模型基本信息相关     
*/
//保存流程模型基本信息
function saveDefProcessForm() {
    $("#mdlProcessChinaname").val($("#mdlProcessConstname").val());
    GlobalTools.submitForm($("#processForm"), { success: saveFormSuccess, error: saveFormError });
}

function saveFormSuccess() {
    GlobalTools.tip("保存成功");
}

function saveFormError() {
    GlobalTools.tip("保存失败");
}

//加载流程模型基本信息
function loaddefProcessform() {
    GlobalTools.loadForm($("#processForm"), {
        ansyc: false,
        type: "GET",
        url: rootPath + "Sys_def_process/LoadForm.do",
        data: { id: processid }
    });
}

function showDefDeptTreeGrid() {
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: currentUnitId, title: "选择单位", onOKClick: selectDefDeptOK });
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement });
}

function selectDefDeptOK(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text += ',';
            ids += ',';
        }
        text += item.text;
        ids += item.id.toString().ReplaceAll("dept_", "");
    });
    $(sourceElement).combobox("setValue", text);
    $("#defProcessUnitid").val(ids);
    $("#defProcessUnitname").val(text);
}

function addDefProcessEditPage() {
    $("#editPanel").html("");
    var nodeTab = $("<div id='nodeTabs'   class='easyui-tabs' data-options='border:false,fit:true'>");
    nodeTab.append("<div title='流程基本信息' data-options=\"href:'../../UserWorkFlow/FlowDefine/DefineProcessInfo.htm',closable:false,onLoad:loaddefProcessform \"></div>");

    $("#editPanel").append(nodeTab);
    nodeTab.tabs();
    $("#editPanel").panel();
}

/*
流程节点基本信息 sys_def_activity  
*/
var whichNode
function savedefActivityform() {
    GlobalTools.submitForm($("#defActivityform"), { success: savedefActivityFormSuccess, error: saveFormError });
}
//节点保存成功 更新流程图中对应节点
function savedefActivityFormSuccess(data) {
    var isNeedChange = false;
    var nodes = eval("({" + rectInfos + "})");
    for (var index in nodes) {
        if (nodes[index].props.id.value == data.sys_def_activity.id && nodes[index].text.text != data.sys_def_activity.chinaname) {
            nodes[index].text.text = data.sys_def_activity.chinaname;
            isNeedChange = true;
            break;
        }
    }
    if (isNeedChange) {
        rectInfos = getRectJsonStr(nodes);
        loadWorkFlowMap();
    }
}

function getRectJsonStr(nodes) {
    var tempRectStr = "";
    for (var index in nodes) {
        tempRectStr += index + ":{type:'" + nodes[index].type + "',text:{text:'" + nodes[index].text.text + "'}, attr:{ x:" + nodes[index].attr.x + ", y:" + nodes[index].attr.y + ", width:" + nodes[index].attr.width + ", height:" + nodes[index].attr.height + "}, props:{id:{value:'" + nodes[index].props.id.value + "'}}},";
    }
    if (tempRectStr.substring(tempRectStr.length - 1, tempRectStr.length) == ',') {
        tempRectStr = tempRectStr.substring(0, tempRectStr.length - 1);
    }
    return tempRectStr;
}

//加载流程模型节点基本信息
function loaddefActivityform() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#defActivityform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_def_activity/LoadForm.do",
            data: { id: whichNode.props.id.value }
        }, afterLoadDefActivityForm);
    }
    else {
        $("#processdefineid").val(processid);
    }
}

function afterLoadDefActivityForm(data) {

    switch (data.sys_def_activity.type) {
        case "start":
            $("[trtype='commondate']").show();
            $("[trtype='common']").show();
            $("td[tdtype='tdBack']").hide();
            break;
        default:
            $("[trtype='commondate']").show();
            $("[trtype='common']").show();
            break;
    }
}

function beforeExpand(rowData) {
    $('#defProcessList').treegrid('options').url = rootPath+'Sys_def_process/LoadPageList.do?constname=' + escape(rowData.constname);
    return true;
}

//格式化流程版本单元格
function formatterVersionCell(value, rowData, index) {
    return "V" + rowData.version;
}

function addDefAcitivtyEditPages(nodetype) {
    $("#editPanel").html("");
    var nodeTab = $("<div id='nodeTabs'   class='easyui-tabs' data-options='border:false,fit:true'>");
    nodeTab.append("<div title='基本信息' data-options=\"href:'../../UserWorkFlow/FlowDefine/DefineActivityInfo.htm',closable:false,onLoad:loaddefActivityform \" ></div>");
    nodeTab.append("<div title='选择人员' data-options=\"href:'../../UserWorkFlow/FlowDefine/DefineActivityChooseOperator.htm',closable:false,onLoad:loaddefActivityChooseOperatorform \" ></div>");
    nodeTab.append("<div title='表单配置' data-options=\"href:'../../UserWorkFlow/FlowDefine/DefineActivityForm.htm',closable:false,onLoad:loaddefActivityForm \"></div>");

    $("#editPanel").append(nodeTab);
    nodeTab.tabs();
    $("#editPanel").panel();
}

/*
表单配置相关
*/
var timerDatagrid;
//加载表单
function loaddefActivityForm() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        var $tmp=$('#activityFormList');
        $tmp.datagrid('options').url = rootPath+'Sys_def_activityform/LoadPageList.do?activitydefineid=' + whichNode.props.id.value;
        $tmp.datagrid('load');
    }
    closeSelectFormDialog();
    closeSelectFormColsDialog();
}

function formatterFormType(value) {
    switch (value) {
        case 0:
            return "普通表单";
            break;
        case 1:
            return "文书";
            break;
        case 2:
            return "展示表单";
            break;
    }
}
function formatterAddmanyType(value, rowData) {
    switch (value) {
        case 0:
            return "1次";
            break;
        case 1:
            return "不限";
            break;
        default:
            return "1次";
            break;
    }
}
function formatterIsMustCell(value) {
    switch (value) {
        case 0:
            return "否";
            break;
        case 1:
            return "是";
            break;
        default:
            return "否";
            break;
    }
}
function openSelectFormDialog() {
    $('#divSelectForms').dialog({
        title: '表单选择',
        iconCls: 'icon-save',
        animate: true,
        buttons: '#divSelectFormsButtons',
        width: 400,
        height: 500,
        closed: true,
        cache: false,
        href: '../../UserWorkFlow/FlowDefine/DefineActivitySelectForm.htm',
        modal: true
    });

    $("#divSelectForms").dialog('open');
}

function closeSelectFormDialog() {
    $("#divSelectForms").dialog('close');
}

function onCheckSelectTailorForm(rowIndex, rowData) {
    if (selectFormIsExist(rowData.id)) {
        $("#divSelectTailorForm").datagrid("unselectRow", rowIndex);
        GlobalTools.tip("该表单已经存在");
    }
}
//判断选取的表单是否已经存在
function selectFormIsExist(tailorformid) {
    var flag = false;
    var datas = $("#activityFormList").datagrid("getData");
    for (var index in datas.rows) {
        if (datas.rows[index].tailorformid == tailorformid) {
            flag = true;
            break;
        }
    }
    return flag;
}
//查询
function searchSelectForms() {
    $('#divSelectTailorForm').datagrid('load', {
        keyvalue: $('#title').val()
    });
}
function saveCheckedForms() {
    var dataChecked = $("#divSelectTailorForm").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择表单");
    }
    var selectForminfo = new Array();
    for (var index in dataChecked) {
        selectForminfo.push({ tailorformid: dataChecked[index].id, tailorformname: dataChecked[index].chinaname, tailorformtype: (dataChecked[index].formtype == "文书" ? 1 : 0), tablename: dataChecked[index].tablename, processdefineid: processid, activitydefineid: whichNode.props.id.value });
    }
    $.messager.confirm('确认提示', '表单选择结束?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SaveSelectedForms.do",
                data: { selectformsinfo: JSON2.stringify(selectForminfo) },
                success: function (data) {
                    GlobalTools.tip("表单保存成功");
                    closeSelectFormDialog();
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}

//禁用表单
function deleteActivityForms() {
    var ids = getSelectDefActivityFormIds(0);
    if (ids == "") {
        GlobalTools.tip("请选择可以禁用表单");
        return;
    }
    $.messager.confirm('确认提示', '确定禁用选择的表单?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/DeleteList.do",
                data: { ids: ids },
                success: function (data) {
                    GlobalTools.tip("表单禁用成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}
//启用表单
function undeleteActivityForms() {
    var ids = getSelectDefActivityFormIds(1);
    if (ids == "") {
        GlobalTools.tip("请选择可以启用表单");
        return;
    }
    $.messager.confirm('确认提示', '确定启用选择的表单?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/UnDeleteList.do",
                data: { ids: ids },
                success: function (data) {
                    GlobalTools.tip("表单启用成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}
//获取配置表单中活动定义表单配置列表选中的记录id
function getSelectDefActivityFormIds(delstatus) {
    var ids = "";
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked != null && dataChecked.length > 0) {
        for (var index in dataChecked) {
            if (dataChecked[index].delstatus == delstatus) {
                if (ids != "") {
                    ids += ",";
                }
                ids += dataChecked[index].id;
            }
        }
    }
    return ids;
}

//消毁表单
function destroyActivityForms() {
    var ids = "";
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked != null && dataChecked.length > 0) {
        for (var index in dataChecked) {
            if (ids != "") {
                ids += ",";
            }
            ids += dataChecked[index].id;
        }
    }
    if (ids == "") {
        GlobalTools.tip("请选择表单");
        return;
    }
    $.messager.confirm('确认提示', '确定彻底删除选择的表单?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/DestroyList.do",
                data: { ids: ids },
                success: function (data) {
                    GlobalTools.tip("表单删除成功");
                    $('#activityFormList').datagrid('reload').datagrid("uncheckAll");
                }
            });
        }
    });
}
//设置显示表单
function setMainShowForms() {
    var id = "";
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择表单");
        return;
    }
    if (dataChecked != null && dataChecked.length > 1) {
        GlobalTools.tip("只能选择一个普通表单作为显示表单");
        return;
    }
    if (!(dataChecked[0].delstatus = 1 && dataChecked[0].tailorformtype == 0)) {
        GlobalTools.tip("请选择可用的普通表单");
        return;
    }

    id = dataChecked[0].id;
    if (id == "") {
        GlobalTools.tip("请选择表单");
        return;
    }
    $.messager.confirm('确认提示', '确定将选中的表单【' + dataChecked[0].tailorformname + '】置为显示表单?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SetMainShowForm.do",
                data: { id: id },
                success: function (data) {
                    GlobalTools.tip("表单设置成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}
//设置文书填多次
function setSubFormsMany() {
    var ids = new Array();
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }

    for (var index in dataChecked) {
        if (dataChecked[index].delstatus == 0 && dataChecked[index].tailorformtype == 1) {
            ids.push(dataChecked[index].id);
        }
    }

    if (ids.length < 1) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }
    $.messager.confirm('确认提示', '确定将选中的文书表单置为可填写多次?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SetSubFormsMany.do",
                data: { ids: ids.join(',') },
                success: function (data) {
                    GlobalTools.tip("表单设置成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}

//设置文书填一次
function setSubFormsOnly() {
    var ids = new Array();
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }

    for (var index in dataChecked) {
        if (dataChecked[index].delstatus == 0 && dataChecked[index].tailorformtype == 1) {
            ids.push(dataChecked[index].id);
        }
    }

    if (ids.length < 1) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }
    $.messager.confirm('确认提示', '确定将选中的文书表单置为只填写一次?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SetSubFormsOnly.do",
                data: { ids: ids.join(',') },
                success: function (data) {
                    GlobalTools.tip("表单设置成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}

//设置文书必填
function setSubFormsIsMust() {
    var ids = new Array();
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }

    for (var index in dataChecked) {
        if (dataChecked[index].delstatus == 0 && dataChecked[index].tailorformtype == 1) {
            ids.push(dataChecked[index].id);
        }
    }

    if (ids.length < 1) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }
    $.messager.confirm('确认提示', '确定将选中的文书表单置为必填?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SetSubFormsIsMust.do",
                data: { ids: ids.join(',') },
                success: function (data) {
                    GlobalTools.tip("表单设置成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}
//设置文书不必填
function setSubFormsNotMust() {
    var ids = new Array();
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }

    for (var index in dataChecked) {
        if (dataChecked[index].delstatus == 0 && dataChecked[index].tailorformtype == 1) {
            ids.push(dataChecked[index].id);
        }
    }

    if (ids.length < 1) {
        GlobalTools.tip("请选择可用的文书");
        return;
    }
    $.messager.confirm('确认提示', '确定将选中的文书表单置为不必填?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SetSubFormsNotMust.do",
                data: { ids: ids.join(',') },
                success: function (data) {
                    GlobalTools.tip("表单设置成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}
//编辑列  
function openFormColsConfig() {
    var dataChecked = $("#activityFormList").datagrid("getChecked");
    if (dataChecked == null || dataChecked.length == 0) {
        GlobalTools.tip("请选择表单");
        return;
    }
    if (dataChecked != null && dataChecked.length > 1) {
        GlobalTools.tip("只能选择一个表单进行编辑");
        return;
    }

    if (dataChecked[0].tailorformid == "") {
        GlobalTools.tip("请选择表单");
        return;
    }
    openSelectFormColsDialog(dataChecked[0].tailorformid);
}

//打开列设置窗口
function openSelectFormColsDialog(formid) {
    $('#divSelectCols').dialog({
        title: '表单列设置',
        iconCls: 'icon-save',
        animate: true,
        buttons: '#divSelectColsButtons',
        width: 400,
        height: 500,
        closed: true,
        cache: false,
        href: '../../UserWorkFlow/FlowDefine/DefineActivityFormColsConfig.htm',
        modal: true
    });

    $("#divSelectCols").dialog('open');
    timerDatagrid = setTimeout("loadFormCols(" + formid + ")", 200);
}

var editFormCols;
//加载表单使用字段列表
function loadFormCols(formid) {
    GlobalTools.ajax({
        async: false,
        url: rootPath + "Sys_def_activityform/LoadAllowEditFormCols.do",
        data: { defactivityformid: $("#activityFormList").datagrid("getChecked")[0].id },
        success: function (data) {
            editFormCols = data;
        }
    });

    $.ajax({
        url: rootPath + "Sys_def_tailorformcol/LoadTailorFormAllColList.do?tailorformid=" + formid,
        type: "get",
        success: function (data) {
            for (var index in data) {
                data[index].required = setRequiredValue(data[index].tablename.toLowerCase() + "." + data[index].colname.toLowerCase());
            }
            $('#divSelectFormCols').datagrid('loadData', data);
            loadAllowEditCols(data);
            clearTimeout(timerDatagrid);
        }
    });
}

function setRequiredValue(colValue) {
    if (editFormCols && editFormCols.requiredcols && isExistStr(editFormCols.requiredcols, colValue)) {
        return 1;
    }
    else
        return null;
}
//加载已经选择的列
function loadAllowEditCols(allCols) {
    if (allCols && editFormCols && editFormCols.alloweditformcols != "") {
        $(allCols).each(function (index, _data) {
            if (isExistStr(editFormCols.alloweditformcols, this.tablename.toLowerCase() + "." + this.colname.toLowerCase())) {
                $('#divSelectFormCols').datagrid('selectRow', $('#divSelectFormCols').datagrid('getRowIndex', this));
            }
        });
    }
}
//用于字段列表初始化时判断是否已经选择
function isExistStr(source, target) {
    if (("," + source + ",").indexOf("," + target + ",") >= 0) {
        return true;
    }
    return false;
}

//关闭列设置弹窗
function closeSelectFormColsDialog() {
    $("#divSelectCols").dialog('close');
}
//保存列设置
function saveCols() {
    $('#divSelectFormCols').datagrid("acceptChanges");
    var tableColnames = "";
    var requiredcols = "";
    var dataChecked = $('#divSelectFormCols').datagrid("getChecked");
    for (var index in dataChecked) {
        if (tableColnames != "") {
            tableColnames += ","
        }
        tableColnames += dataChecked[index].tablename.toLowerCase() + "." + dataChecked[index].colname.toLowerCase();

        if (dataChecked[index].required == 1) {
            if (requiredcols != "") {
                requiredcols += ",";
            }
            requiredcols += dataChecked[index].tablename.toLowerCase() + "." + dataChecked[index].colname.toLowerCase();
        }
    }
    $.messager.confirm('确认提示', '确定保存设置?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_def_activityform/SaveSelectedFormCols.do",
                data: { defactivityformid: $("#activityFormList").datagrid("getChecked")[0].id, alloweditformcols: tableColnames, requiredcols: requiredcols },
                success: function (data) {
                    GlobalTools.tip("设置成功");
                    closeSelectFormColsDialog();
                }
            });
        }
    });
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

/*
流程连线基本操作
*/
var whichPath;
//加载流程定义连线基本信息
function loaddefTransitionform() {
    if (whichPath && whichPath.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#defTransitionform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_def_transition/LoadForm.do",
            data: { id: whichPath.props.id.value }
        });
    }
}
//加载流程连线条件
function loadDefTransConditionList() {
    if (whichPath && whichPath.props.id.value.toString().length > 0) {
        transitiondefineid = whichPath.props.id.value;
        var $tmp = $('#transitionConditionList');
        $tmp.treegrid('options').url = rootPath+'Sys_def_transcondition/LoadPageList.do?transitiondefineid=' + whichPath.props.id.value;
        $tmp.treegrid('reload');
    }
}
/*  流程连线基本信息 sys_def_transition  */
function savedefTransitionform() {
    GlobalTools.submitForm($("#defTransitionform"), { success: savedefTransitionFormSuccess, error: saveFormError });
}
//节点保存成功 更新流程图中对应节点
function savedefTransitionFormSuccess(data) {
    var isNeedChange = false;
    var paths = eval("({" + pathInfos + "})");
    for (var index in paths) {
        if (paths[index].props.id.value == data.sys_def_transition.id && paths[index].text.text != data.sys_def_transition.chinaname) {
            paths[index].text.text = data.sys_def_transition.chinaname;
            isNeedChange = true;
            break;
        }
    }
    if (isNeedChange) {
        pathInfos = getPathJsonStr(paths);
        loadWorkFlowMap();
    }
}

function getPathJsonStr(paths) {
    var tempPathStr = "";
    for (var index in paths) {
        tempPathStr += index + ":{from:'" + paths[index].from + "',to:'" + paths[index].to + "', dots:[" + getDotsStr(paths[index].dots) + "],text:{text:'" + paths[index].text.text + "'},textPos:{x:" + paths[index].textPos.x + ",y:" + paths[index].textPos.y + "}, props:{id:{value:'" + paths[index].props.id.value + "'},startactivitydefineid:{value:'" + paths[index].props.startactivitydefineid.value + "'},endactivitydefineid:{value:'" + paths[index].props.endactivitydefineid.value + "'}}},";
    }
    if (tempPathStr.substring(tempPathStr.length - 1, tempPathStr.length) == ',') {
        tempPathStr = tempPathStr.substring(0, tempPathStr.length - 1);
    }
    return tempPathStr;
}
//dots {x:403,y:65},{x:431,y:111}
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
//连线编辑页面
function addDefTransitionEditPage() {
    $("#editPanel").html("");
    var nodeTab = $("<div id='nodeTabs'   class='easyui-tabs' data-options='border:false,fit:true'>");
    nodeTab.append("<div title='流程连线基本信息' data-options=\"href:'../../UserWorkFlow/FlowDefine/DefineTransitionInfo.htm',closable:false,onLoad:loaddefTransitionform \"></div>");

    nodeTab.append("<div title='条件设置' data-options=\"href:'../../UserWorkFlow/FlowDefine/DefineTransConditionList.htm',closable:false,onLoad:loadDefTransConditionList \"></div>");

    $("#editPanel").append(nodeTab);
    nodeTab.tabs();
    $("#editPanel").panel();
}

/*
节点人员选择基本操作
*/
//加载流程选人信息
function loaddefActivityChooseOperatorform() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#defActivityChooseOperatorform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_def_actorcondition/LoadForm.do",
            data: { activitydefineid: whichNode.props.id.value }
        }, afterLoadDefActivityChooseOperatorForm);
    }
}
function afterLoadDefActivityChooseOperatorForm(data) {
    $("#activitydefineid").val(whichNode.props.id.value);
    if (data.sys_def_actorcondition && data.sys_def_actorcondition.referprevactivity && data.sys_def_actorcondition.referprevactivity == 0) {
        $("#referprevactivity").combobox("setValue", "")
    }
    changeOperatorStatus();
}

function savedefActivityChooseOperatorform() {
    var postData = {};
    postData.defaultconfig = $("#defaultconfig").combobox("getValue");
    postData.referprevactivity = $("#referprevactivity").combobox("getValue") || 0;
    postData.pointunitnames = $("[name='sys_def_actorcondition.pointunitnames']").val();
    postData.pointunit = $("#pointunit").val();
    postData.actorroles = $("#actorroles").combobox("getValues").join(',');
    postData.activitydefineid = $("#activitydefineid").val();
    postData.id = $("#Sys_def_actorconditionid").val();
    postData.useactivityids = $("#useactivityids").combobox("getValues").join(',');
    postData.multiselect = $("#multiselect").combobox("getValue") || 1;
    /*if (postData.actorroles) {
        if (!postData.pointunit && postData.referprevactivity == 0) {
            GlobalTools.tip("角色不能单独使用");
            return;
        }
    }*/
    GlobalTools.ajax({
        url: rootPath+'Sys_def_actorcondition/SaveForm.do',
        data: postData,
        success: savedefActivityChooseOperatorSuccess
    });
}
function savedefActivityChooseOperatorSuccess(data) {
    $("[name='sys_def_actorcondition.id']").val(data.sys_def_actorcondition.id);
    $("[name='sys_def_actorcondition.activitydefineid']").val(data.sys_def_actorcondition.activitydefineid);
    GlobalTools.tip("保存成功");
}

//更改控件选择状态
function changeOperatorStatus() {
    var defaustConfig = $("#defaultconfig").combobox("getValue");
    var referprevactivity = $("#referprevactivity").combobox("getValue");
    var pointunit = $("#pointunit").val();
    var actorroles = $("#actorroles").combobox("getValues");
    var useactivityids = $("#useactivityids").combobox("getValues");

    if (defaustConfig && defaustConfig > 0) { //选择了默认值
        $("#referprevactivity").combobox("setValue", "");
        $("#referprevactivity").combobox("disable");

        $("#unitchinaname").combobox("setValues", []);
        $("#pointunit").val("");
        $("#unitchinaname").combobox("disable");

        $("#actorroles").combobox("setValues", []);
        $("#actorroles").combobox("disable");

        $("#useactivityids").combobox("setValues", []);
        $("#useactivityids").combobox("disable");
    }
    else if (referprevactivity && referprevactivity > 0) { //参照前一岗位 
        $("#defaultconfig").combobox("setValue", "");
        $("#defaultconfig").combobox("disable");

        $("#unitchinaname").combobox("setValues", []);
        $("#pointunit").val("");
        $("#unitchinaname").combobox("disable");

        $("#useactivityids").combobox("setValues", []);
        $("#useactivityids").combobox("disable");
    }
    else if (pointunit.length > 0) {//选中了具体的单位
        $("#defaultconfig").combobox("setValue", "");
        $("#defaultconfig").combobox("disable");

        $("#referprevactivity").combobox("setValue", "");
        $("#referprevactivity").combobox("disable");

        $("#useactivityids").combobox("setValues", []);
        $("#useactivityids").combobox("disable");
    }
    else if (actorroles.length > 0) { //选中了角色
        $("#defaultconfig").combobox("setValue", "");
        $("#defaultconfig").combobox("disable");

        $("#useactivityids").combobox("setValues", []);
        $("#useactivityids").combobox("disable");

        if (referprevactivity) { //参照前一岗位
            $("#unitchinaname").combobox("setValues", []);
            $("#pointunit").val("");
            $("#unitchinaname").combobox("disable");
        }
        else if (pointunit.length > 0) {
            $("#referprevactivity").combobox("setValue", "");
            $("#referprevactivity").combobox("disable");
        }
        else {
            $("#referprevactivity").combobox("enable");
            $("#unitchinaname").combobox("enable");
        }
    }
    else if (useactivityids.length > 0) {//其他节点
        $("#defaultconfig").combobox("setValue", "");
        $("#defaultconfig").combobox("disable");

        $("#referprevactivity").combobox("setValue", "");
        $("#referprevactivity").combobox("disable");

        $("#unitchinaname").combobox("setValues", []);
        $("#pointunit").val("");
        $("#unitchinaname").combobox("disable");

        $("#actorroles").combobox("setValues", []);
        $("#actorroles").combobox("disable");
    }
    else {//无任何值
        $("#defaultconfig").combobox("enable");
        $("#defaultconfig").combobox("setValue", "");

        $("#referprevactivity").combobox("enable");
        $("#referprevactivity").combobox("setValue", "");

        $("#unitchinaname").combobox("enable");
        $("#unitchinaname").combobox("setValues", []);
        $("#pointunit").val("");

        $("#actorroles").combobox("enable");
        $("#actorroles").combobox("setValues", []);

        $("#useactivityids").combobox("enable");
        $("#useactivityids").combobox("setValues", []);
    }
}

//打开一个对话框，显示单位和部门treegrid
function showPointUnitTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement,loadDataUrl:"Sys_dept/LoadListDeptTreeWithUnitid.do" });
}
//选择组织机构后回调函数
function selectPointUnit(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text += ',';
            ids += ',';
        }
        text += item.text;
        ids += item.id.toString().ReplaceAll("dept_", "");
    });
    $(sourceElement).combobox("setValue", text);
    $("#pointunit").val(ids);
    $("[name='sys_def_actorcondition.pointunitnames']").val(text);

    //改变控件状态
    changeOperatorStatus();
}

function cancelPointUnit(sourceElement) {
    $(sourceElement).combobox("setValue", "");
    $("#pointunit").val("");
    $("[name='sys_def_actorcondition.pointunitnames']").val("");
    //改变控件状态
    changeOperatorStatus();
}


//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}


//单击列表行
function onClickColsListRow(index, rowData) {
    $('#divSelectFormCols').datagrid('beginEdit', index);
}

//打开新流程选择页面
function openSelectAnotherProcessDialog() {
    $('#divSelectAnotherprocess').dialog({
        title: '流程选择',
        iconCls: 'icon-save',
        animate: true,
        buttons: '#divSelectAnotherprocessButtons',
        width: 600,
        height: 500,
        closed: true,
        cache: false,
        href: '../../UserWorkFlow/FlowModel/ModelActivitySelectAnotherprocess.htm',
        modal: true
    });
    $('#divSelectAnotherprocess').dialog("open");
}
function saveCheckedAnotherProcess() {
    var dataSelected = $("#anotherDefProcessList").treegrid("getSelected");
    if (dataSelected != null) {
        $("#anotherprocessdefineid").val(dataSelected.id);
        $("#anotherprocessname").val(dataSelected.constname + "-" + dataSelected.chinaname + "-V" + dataSelected.version);
        closeSelectAnotherProcessDialog();
    }
    else {
        GlobalTools.tip("请选择流程");
    }
}
function clearAnotherprocess(){
    $("#anotherprocessdefineid").val("");
    $("#anotherprocessname").val("");
    $("#triggerbuttonname").val("");
    $('#iswaitanotherprocess').combobox('setValue', '0');
}
function closeSelectAnotherProcessDialog() {
    $('#divSelectAnotherprocess').dialog("close");
}
//查询可选新流程
function searchAnotherProcessList() {
    var $tmp = $('#anotherDefProcessList');
    $tmp.treegrid('options').url = rootPath+'Sys_def_process/LoadCanBeAnotherProcessList.do?constname=' + escape(processconstname) + '&keyname=' + $('#anotherkeyname').val();
    $tmp.treegrid('reload');
}
