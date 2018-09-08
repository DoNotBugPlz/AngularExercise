var rootPath = "../../../";
var isSelected = false; //是否处于“选择”状态（点击“选择”）
var processid = Request("processid");
var processconstname = Request("constname");
var currentUnitId = Request("currentunitid");//当前用户所在单位id
var rectPathIsFlowCustom = false; //节点和连线是否的标识是否由myflow重新定义过
var rectInfos = "";
var pathInfos = "";
var dialogDiv=$("<div id='dialogDiv'>");//用于弹出框
$(function () {
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, sigleSelect: false, cascadeCheck: false, deptid: "", title: "选择单位", onOKClick: selectPointUnit });
    if (processid == null || processid == "") {
        /*新增流程*/
        $.post(rootPath + "Sys_mdl_process/SaveForm.do").done(function (result) {
            processid = result.data.id;
            initMyFlow();
        }).fail(function(){
            GlobalTools.tip("流程创建失败");
        });
         /*GlobalTools.ajax({
            type: "POST",
            url: rootPath + "Sys_mdl_process/SaveForm.do",
            success: function (data) {
                processid = data.id;
                initMyFlow();
            },
            error: function () {
                GlobalTools.tip("流程创建失败");
            }
        });*/
    }
    else {
        initMyFlow();
    }
});

/*流程初始化 获取流程数据*/
function initMyFlow() {
    GlobalTools.ajax({
        cache: false,
        type: "POST",
        url: rootPath + "WorkFlowFormCommon/GetMdlRectPath.do",
        data: "processmodelid=" + processid,
        success: function (data) {
            rectInfos=data.rects;
            pathInfos=data.paths;
            loadWorkFlowMap();
        }
    });

    rectPathIsFlowCustom = false;
}

//绘制流程图
function loadWorkFlowMap() {
    try {
        var restore = "{states:{},paths:{}}";
        if (rectInfos) {
            if (pathInfos) {
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
        type: "GET",
        async: false,
        url: rootPath + "Sys_mdl_activity/GetRectInfos.do",
        data: "processmodelid=" + processid,
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
        type: "GET",
        async: false,
        url: rootPath + "Sys_mdl_transition/GetPathInfos.do",
        data: "processmodelid=" + processid,
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

function addMdlProcessEditPage() {
    $("#editPanel").html("");
    var nodeTab = $("<div id='nodeTabs'   class='easyui-tabs' data-options='border:false,fit:true'>");
    nodeTab.append("<div title='流程基本信息' data-options=\"href:'../../WorkFlow/FlowModel/ModelProcessInfo.htm',closable:false,onLoad:loadmodProcessform \"></div>");

    $("#editPanel").append(nodeTab);
    nodeTab.tabs();
    $("#editPanel").panel();
}

/*
 流程模型基本信息相关
 */
//保存流程模型基本信息
function saveMdlProcessForm() {
    GlobalTools.submitForm($("#processForm"), { success: saveFormSuccess, error: saveFormError });
}

function saveFormSuccess() {
    GlobalTools.tip("保存成功");
}

function saveFormError() {
    GlobalTools.tip("保存失败");
}

//加载流程模型基本信息
function loadmodProcessform() {
    GlobalTools.loadForm($("#processForm"), {
        ansyc: false,
        type: "GET",
        url: rootPath + "Sys_mdl_process/LoadForm.do",
        data: { id: processid }
    });
}

function showMdlDeptTreeGrid() {
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: currentUnitId, title: "选择单位", onOKClick: selectMdlDeptOK });
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement });
}

function selectMdlDeptOK(treeNodes, sourceElement) {
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
    $("#mdlProcessUnitid").val(ids);
    $("#mdlProcessUnitname").val(text);
}

function setProcessUnitName(data) {
    if (data.sys_mdl_process.unitid && data.sys_mdl_process.unitid > 0) {
        $.ajax({
            url: rootPath + "Sys_dept/GetDeptChinaname.do",
            data: { deptid: data.sys_mdl_process.unitid },
            success: function (data) {
                $("[name='sys_mdl_process.unitname']").combobox("setText", data);
            }
        });
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
    $("[name='sys_mdl_actorcondition.pointunitnames']").val(text);
    changeOperatorStatus();
}

/*
 流程节点基本信息 sys_mdl_activity
 */
var whichNode;
function savemdlActivityform() {
    GlobalTools.submitForm($("#mdlActivityform"), { success: savemdlActivityFormSuccess, error: saveFormError });
}

//节点保存成功 更新流程图中对应节点
function savemdlActivityFormSuccess(data) {
    var isNeedChange = false;
    var nodes = eval("({" + rectInfos + "})");
    for (var index in nodes) {
        if (nodes[index].props.id.value == data.sys_mdl_activity.id && nodes[index].text.text != data.sys_mdl_activity.chinaname) {
            nodes[index].text.text = data.sys_mdl_activity.chinaname;
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
function loadmdlActivityform() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#mdlActivityform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_mdl_activity/LoadForm.do",
            data: { id: whichNode.props.id.value }
        }, afterLoadMdlActivityForm);

    }
    else {
        $("#processmodelid").val(processid);
    }
}

function afterLoadMdlActivityForm(data) {
    switch (data.sys_mdl_activity.type) {
        case "start":
            $("[trtype='commondate']").show();
            $("[trtype='common']").show();
            $("[trtype='join']").hide();
            $("[comboname='sys_mdl_activity.jointype']").combobox({ required: false });
            if (data.sys_mdl_activity.subprocessname != null) {
                $("#trIsWaitSubProcess").show();
            }
            $("td[tdtype='tdBack']").hide();
            break;
        case "join":
            $("[trtype='commondate']").hide();
            $("[trtype='common']").hide();
            $('#jointype').combobox({ required: true });
            if (data.sys_mdl_activity.jointype != null && data.sys_mdl_activity.jointype != "") {
                $('#jointype').combobox('setValues', data.sys_mdl_activity.jointype);
            }
            break;
        case "fork":
            $("[trtype='commondate']").hide();
            $("[trtype='common']").hide();
            $("[trtype='join']").hide();
            $("[comboname='sys_mdl_activity.jointype']").combobox({ required: false });
            break;
        case "scan":
            $("[trtype='commondate']").show();
            $("[trtype='common']").hide();
            $("[trtype='join']").hide();
            $("[comboname='sys_mdl_activity.jointype']").combobox({ required: false });
            break;
        case "countersign":
            $("[trtype='countersign']").show();
            $("[trtype='commondate']").show();
            $("[trtype='common']").show();
            $("[trtype='join']").hide();
            $("[comboname='sys_mdl_activity.jointype']").combobox({ required: false });
            break;
        default:
            $("[trtype='commondate']").show();
            $("[trtype='common']").show();
            $("[trtype='join']").hide();
            $("[comboname='sys_mdl_activity.jointype']").combobox({ required: false });
            if (data.sys_mdl_activity.subprocessname != null) {
                $("#trIsWaitSubProcess").show();
            }
            break;
    }

    if (data.sys_mdl_activity.type == "subprocess") {
        $("tr[subprocess='true']").show();
        $("#subprocessname").unbind().bind("focus", function () {
            openSelectSubProcessDialog();
        });
    }
    else {
        $("tr[subprocess='true']").hide();

    }
}

function openSelectSubProcessDialog() {
    dialogDiv.dialog({
        title: '流程选择',
        iconCls: 'icon-save',
        animate: true,
        //buttons: '#divSelectSubprocessButtons',
        width: 600,
        height: 500,
        closed: true,
        cache: false,
        href: '../../WorkFlow/FlowModel/ModelActivitySelectSubprocess.htm',
        modal: true,
        buttons: [{
            text:'确定',
            //iconCls:'icon-ok',
            handler:function(){
                saveCheckedSubProcess();
            }
        },{
            text:'取消',
           // iconCls:'icon-cancel',
            handler:function(){
                closeSelectSubProcessDialog();
            }
        }]
    });
    dialogDiv.dialog("open");
}
function closeSelectSubProcessDialog() {
    dialogDiv.dialog("close");
}
function beforeExpand(rowData) {
    $('#defProcessList').treegrid('options').url = rootPath+'Sys_def_process/LoadPageList.do?constname=' + escape(rowData.constname);
    return true;
}
function searchSubProcessList() {
    var $tmp=$('#defProcessList');
    $tmp.treegrid('options').url = rootPath+'Sys_def_process/LoadCanBeSubProcessList.do?constname=' + escape(processconstname) + '&keyname=' + $('#keyname').val();
    $tmp.treegrid('reload');
}
//格式化流程版本单元格
function formatterVersionCell(value, rowData, index) {
    return "V" + rowData.version;
}

function saveCheckedSubProcess() {
    var dataSelected = $("#defProcessList").treegrid("getSelected");
    if (dataSelected != null) {
        $("#subprocessid").val(dataSelected.id);
        $("#subprocessname").val(dataSelected.constname + "-" + dataSelected.chinaname + "-V" + dataSelected.version);
        closeSelectSubProcessDialog();
    }
    else {
        GlobalTools.tip("请选择流程");
    }
}

function toggleTrIsWaitSubProcess() {
    if ($.trim($("#subprocessname").val()) != "") {
        $("#trIsWaitSubProcess").show();
    }
    else {
        $("#trIsWaitSubProcess").hide();
    }
}

/*
 节点人员选择
 */
//加载流程选人信息
function loadmdlActivityChooseOperatorform() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#mdlActivityChooseOperatorform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_mdl_actorcondition/LoadForm.do",
            data: { activitymodelid: whichNode.props.id.value }
        }, afterLoadMdlActivityChooseOperatorForm);
    }
}
function afterLoadMdlActivityChooseOperatorForm(data) {
    $("#activitymodelid").val(whichNode.props.id.value);
    if (data.sys_mdl_actorcondition && data.sys_mdl_actorcondition.referprevactivity && data.sys_mdl_actorcondition.referprevactivity == 0) {
        $("#referprevactivity").combobox("setValue", "")
    }
    changeOperatorStatus();
}

function savemdlActivityChooseOperatorform() {
    var postData = {};
    postData.defaultconfig = $("#defaultconfig").combobox("getValue");
    postData.referprevactivity = $("#referprevactivity").combobox("getValue") || 0;
    postData.referprevactivitydeptlevel = $("#referprevactivitydeptlevel").combobox("getValue");
    postData.pointunitnames = $("[name='sys_mdl_actorcondition.pointunitnames']").val();
    postData.pointunit = $("#pointunit").val();
    postData.actorroles = $("#actorroles").combobox("getValues").join(',');
    postData.activitymodelid = $("#activitymodelid").val();
    postData.id = $("#sys_mdl_actorconditionid").val();
    postData.useactivityids = $("#useactivityids").combobox("getValues").join(',');
    postData.multiselect = $("#multiselect").combobox("getValue") || 1;
    postData.custom_config = $("#customConfig").combobox("getValue");
    /*if (postData.actorroles) {
        if (!postData.pointunit && postData.referprevactivity == 0) {
            GlobalTools.tip("角色不能单独使用");
            return;
        }
    }*/
    GlobalTools.ajax({
        url: rootPath+'Sys_mdl_actorcondition/SaveForm.do',
        data: postData,
        success: savemdlActivityChooseOperatorSuccess
    });
}

function savemdlActivityChooseOperatorSuccess(data) {
    $("[name='sys_mdl_actorcondition.id']").val(data.sys_mdl_actorcondition.id);
    $("[name='sys_mdl_actorcondition.activitymodelid']").val(data.sys_mdl_actorcondition.activitymodelid);
    GlobalTools.tip("保存成功");
}
var changeCustomConfigFlag=false;
function changeCustomConfig(){
    changeCustomConfigFlag=true;
    var customConfig=$("#customConfig").combobox("getValue");
    if(customConfig&&customConfig.length>0){
        $("#defaultconfig").combobox("setValue", "");
        $("#defaultconfig").combobox("disable");

        $("#referprevactivity").combobox("setValue", "");
        $("#referprevactivity").combobox("disable");

        $("#unitchinaname").combobox("setValues", []);
        $("#pointunit").val("");
        $("#unitchinaname").combobox("disable");

        $("#actorroles").combobox("setValues", []);
        $("#actorroles").combobox("disable");

        $("#referprevactivitydeptlevel").combobox("setValue", "");
        $("#referprevactivitydeptlevel").combobox("disable");
        $("#useactivityids").combobox("setValues", []);
        $("#useactivityids").combobox("disable");
    }else{
        $("#defaultconfig").combobox("enable");
        $("#defaultconfig").combobox("setValue", "");

        $("#referprevactivity").combobox("enable");
        $("#referprevactivity").combobox("setValue", "");

        $("#unitchinaname").combobox("enable");
        $("#unitchinaname").combobox("setValues", []);
        $("#pointunit").val("");

        $("#referprevactivitydeptlevel").combobox("enable");
        $("#referprevactivitydeptlevel").combobox("setValue", "");

        $("#actorroles").combobox("enable");
        $("#actorroles").combobox("setValues", []);

        $("#useactivityids").combobox("enable");
        $("#useactivityids").combobox("setValues", []);
    }
    changeCustomConfigFlag=false;
}
//更改控件选择状态
function changeOperatorStatus() {
    if(changeCustomConfigFlag){
        return;
    }
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


/*
 节点事件相关操作
 */
//加载流程事件
function loadmdlActivityEventform() {

    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#mdlActivityEventform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_mdl_activityevent/LoadForm.do",
            data: { activitymodelid: whichNode.props.id.value }
        }, afterLoadMdlActivityEventForm);
    }
    else {
        $("#processmodelid").val(processid);
    }
}

function afterLoadMdlActivityEventForm(data) {
    $("#sys_mdl_activityevent_end_activitymodelid").val(whichNode.props.id.value);
    $("#sys_mdl_activityevent_start_activitymodelid").val(whichNode.props.id.value);

}

function savemdlActivityeventform() {
    GlobalTools.submitForm($("#mdlActivityEventform"), { success: savemdlActivityEventSuccess, error: saveFormError });
}

function savemdlActivityEventSuccess(data) {
    if (data.sys_mdl_activityevent_start) {
        $("[name='sys_mdl_activityevent_start.activitydefineid']").val(data.sys_mdl_activityevent_start.activitydefineid);
        $("[name='sys_mdl_activityevent_start.id']").val(data.sys_mdl_activityevent_start.id);
    }
    if (data.sys_mdl_activityevent_end) {
        $("[name='sys_mdl_activityevent_end.activitydefineid']").val(data.sys_mdl_activityevent_end.activitydefineid);
        $("[name='sys_mdl_activityevent_end.id']").val(data.sys_mdl_activityevent_end.id);
    }
    GlobalTools.tip("保存成功");
}
//删除开始事件
function destroyStartEvent() {
    var eventid = $('#sys_mdl_activityevent_start_id').val();
    if (eventid) {
        GlobalTools.ajax({
            type: 'POST',
            url: rootPath + 'Sys_mdl_activityevent/Destroy.do',
            data: { id: eventid },
            success: function () {
                $('#sys_mdl_activityevent_start_id').val('');
                $('#sys_mdl_activityevent_start_activitymodelid').val('');
                $('#sys_mdl_activityevent_start_chinaname').val('');
                $('#sys_mdl_activityevent_start_assemblyname').val('');
                $('#sys_mdl_activityevent_start_classpath').val('');
                $('#sys_mdl_activityevent_start_description').val('');
                $('#sys_mdl_activityevent_start_isallowexecute').combobox('setValue', '');
                GlobalTools.tip("删除成功");
            }
        });
    }
}
//删除结束事件
function destroyEndEvent() {
    var eventid = $('#sys_mdl_activityevent_end_id').val();
    if (eventid) {
        GlobalTools.ajax({
            type: 'POST',
            url: rootPath + 'Sys_mdl_activityevent/Destroy.do',
            data: { id: eventid },
            success: function () {
                $('#sys_mdl_activityevent_end_id').val('');
                $('#sys_mdl_activityevent_end_activitymodelid').val('');
                $('#sys_mdl_activityevent_end_chinaname').val('');
                $('#sys_mdl_activityevent_end_assemblyname').val('');
                $('#sys_mdl_activityevent_end_classpath').val('');
                $('#sys_mdl_activityevent_end_description').val('');
                $('#sys_mdl_activityevent_end_isallowexecute').combobox('setValue', '');
                GlobalTools.tip("删除成功");
            }
        });
    }
}

//节点所有信息的编辑tab
function addMdlAcitvityEditPages(nodetype) {
    $("#editPanel").html("");
    var nodeTab = $("<div id='nodeTabs'   class='easyui-tabs' data-options='border:false,fit:true'>");
    nodeTab.append("<div title='基本信息' data-options=\"href:'../../WorkFlow/FlowModel/ModelActivityInfo.htm',closable:false,onLoad:loadmdlActivityform \"></div>");
    if (nodetype != "join" && nodetype != "fork") {
        nodeTab.append("<div title='选择人员' data-options=\"href:'../../WorkFlow/FlowModel/ModelActivityChooseOperator.htm',closable:false,onLoad:loadmdlActivityChooseOperatorform \"></div>");
        nodeTab.append("<div title='活动操作配置' data-options=\"href:'../../WorkFlow/FlowModel/ModelActivityOperationList.htm',closable:false,onLoad:loadmdlActivityOperation \"></div>");
        nodeTab.append("<div title='表单配置' data-options=\"href:'../../WorkFlow/FlowModel/ModelActivityForm.htm',closable:false,onLoad:loadmdlActivityForm \"></div>");
        if (nodetype != "scan") {
            nodeTab.append("<div title='活动事件' data-options=\"href:'../../WorkFlow/FlowModel/ModelActivityEvent.htm',closable:false,onLoad:loadmdlActivityEventform \"></div>");
        }
        nodeTab.append("<div title='操作顺序配置' data-options=\"href:'../../WorkFlow/FlowModel/ModelButtonsSortList.htm',closable:false,onLoad:loadButtonsSortList \"></div>");
    }

    $("#editPanel").append(nodeTab);
    nodeTab.tabs();
    $("#editPanel").panel();
}

/*
 表单配置相关
 */
var timerDatagrid;
//加载表单
function loadmdlActivityForm() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        var $tmp=$('#activityFormList');
        $tmp.datagrid('options').url = rootPath+'Sys_mdl_activityform/LoadPageList.do?activitymodelid=' + whichNode.props.id.value;
        $tmp.datagrid('load');
    }
}

function formatterFormType(value, rowData) {
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
    dialogDiv.dialog({
        title: '表单选择',
        iconCls: 'icon-save',
        animate: true,
        //buttons: '#divSelectFormsButtons',
        width: 400,
        height: 500,
        closed: true,
        cache: false,
        href: '../../WorkFlow/FlowModel/ModelActivitySelectForm.htm',
        modal: true,
        buttons:[{
            text:'确定',
            // iconCls:'icon-ok',
            handler:function(){
                saveCheckedForms();
            }
        },{
            text:'取消',
            // iconCls:'icon-cancel',
            handler:function(){
                closeSelectFormDialog();
            }
        }]
    });

    dialogDiv.dialog('open');
}

function closeSelectFormDialog() {
    dialogDiv.dialog('close');
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
        selectForminfo.push({ tailorformid: dataChecked[index].id, tailorformname: dataChecked[index].chinaname, tailorformtype: (dataChecked[index].formtype == "文书" ? 1 : 0), tablename: dataChecked[index].tablename, processmodelid: processid, activitymodelid: whichNode.props.id.value });
    }
    $.messager.confirm('确认提示', '表单选择结束?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_mdl_activityform/SaveSelectedForms.do",
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
    var ids = getSelectMdlActivityFormIds(0);
    if (ids == "") {
        GlobalTools.tip("请选择可以禁用表单");
        return;
    }
    $.messager.confirm('确认提示', '确定禁用选择的表单?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_mdl_activityform/DeleteList.do",
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
    var ids = getSelectMdlActivityFormIds(1);
    if (ids == "") {
        GlobalTools.tip("请选择可以启用表单");
        return;
    }
    $.messager.confirm('确认提示', '确定启用选择的表单?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_mdl_activityform/UnDeleteList.do",
                data: { ids: ids },
                success: function (data) {
                    GlobalTools.tip("表单启用成功");
                    $('#activityFormList').datagrid('reload');
                }
            });
        }
    });
}

//获取配置表单中活动模型表单配置列表选中的记录id
function getSelectMdlActivityFormIds(delstatus) {
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
                url: rootPath + "Sys_mdl_activityform/DestroyList.do",
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
                url: rootPath + "Sys_mdl_activityform/SetMainShowForm.do",
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
                url: rootPath + "Sys_mdl_activityform/SetSubFormsMany.do",
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
                url: rootPath + "Sys_mdl_activityform/SetSubFormsOnly.do",
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
                url: rootPath + "Sys_mdl_activityform/SetSubFormsIsMust.do",
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
                url: rootPath + "Sys_mdl_activityform/SetSubFormsNotMust.do",
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
    dialogDiv.dialog({
        title: '表单列设置',
        iconCls: 'icon-save',
        animate: true,
        width: 400,
        height: 500,
        closed: true,
        cache: false,
        href: '../../WorkFlow/FlowModel/ModelActivityFormColsConfig.htm',
        modal: true,
        buttons:[{
            text:'确定',
            // iconCls:'icon-ok',
            handler:function(){
                saveCols();
            }
        },{
            text:'取消',
            // iconCls:'icon-cancel',
            handler:function(){
                closeSelectFormColsDialog();
            }
        }]
    });

    dialogDiv.dialog('open');
    timerDatagrid = setTimeout("loadFormCols(" + formid + ")", 200);
}

//加载表单使用字段列表
function loadFormCols(formid) {
    GlobalTools.ajax({
        async: false,
        url: rootPath + "Sys_mdl_activityform/LoadAllowEditFormCols.do",
        data: { mdlactivityformid: $("#activityFormList").datagrid("getChecked")[0].id  },
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

function setRequiredValue(colValue) {
    if (editFormCols && editFormCols.requiredcols && isExistStr(editFormCols.requiredcols, colValue)) {
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

//关闭列设置弹窗
function closeSelectFormColsDialog() {
    dialogDiv.dialog('close');
}

//保存列设置
function saveCols() {
    $('#divSelectFormCols').datagrid("acceptChanges");
    var tableColnames = "",requiredcols = "";
    var dataChecked = $('#divSelectFormCols').datagrid("getChecked");
    for (var index in dataChecked) {
        if (tableColnames != "") {
            tableColnames += ",";
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
                url: rootPath + "Sys_mdl_activityform/SaveSelectedFormCols.do",
                data: { mdlactivityformid: $("#activityFormList").datagrid("getChecked")[0].id, alloweditformcols: tableColnames, requiredcols: requiredcols },
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
 流程连线相关操作函数
 */
var whichPath;
//加载流程模型连线基本信息
function loadmodTransitionform() {
    if (whichPath && whichPath.props.id.value.toString().length > 0) {
        GlobalTools.loadForm($("#modTransitionform"), {
            ansyc: false,
            type: "GET",
            url: rootPath + "Sys_mdl_transition/LoadForm.do",
            data: { id: whichPath.props.id.value }
        });
    }
}
//加载流程连线条件
function loadModTransConditionList() {
    if (whichPath && whichPath.props.id.value.toString().length > 0) {
        transitionmodelid = whichPath.props.id.value;
        var $tmp=$('#transitionConditionList');
        $tmp.treegrid('options').url = rootPath+'Sys_mdl_transcondition/LoadPageList.do?transitionmodelid=' + whichPath.props.id.value;
        $tmp.treegrid('reload');
    }
}

/*  流程连线基本信息 sys_mdl_transition  */
function savemdlTransitionform() {
    GlobalTools.submitForm($("#modTransitionform"), { success: savemdlTransitionFormSuccess, error: saveFormError });
}

//节点保存成功 更新流程图中对应节点
function savemdlTransitionFormSuccess(data) {
    var isNeedChange = false;
    var paths = eval("({" + pathInfos + "})");
    for (var index in paths) {
        if (paths[index].props.id.value == data.sys_mdl_transition.id && paths[index].text.text != data.sys_mdl_transition.chinaname) {
            paths[index].text.text = data.sys_mdl_transition.chinaname;
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
        tempPathStr += index + ":{from:'" + paths[index].from + "',to:'" + paths[index].to + "', dots:[" + getDotsStr(paths[index].dots) + "],text:{text:'" + paths[index].text.text + "'},textPos:{x:" + paths[index].textPos.x + ",y:" + paths[index].textPos.y + "}, props:{id:{value:'" + paths[index].props.id.value + "'},startactivitymodelid:{value:'" + paths[index].props.startactivitymodelid.value + "'},endactivitymodelid:{value:'" + paths[index].props.endactivitymodelid.value + "'}}},";
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

function addMdlTransitionEditPage() {
    $("#editPanel").html("");
    var nodeTab = $("<div id='nodeTabs'   class='easyui-tabs' data-options='border:false,fit:true'>");
    nodeTab.append("<div title='流程连线基本信息' data-options=\"href:'../../WorkFlow/FlowModel/ModelTransitionInfo.htm',closable:false,onLoad:loadmodTransitionform \"></div>");

    nodeTab.append("<div title='条件设置' data-options=\"href:'../../WorkFlow/FlowModel/ModelTransConditionList.htm',closable:false,onLoad:loadModTransConditionList \"></div>");

    $("#editPanel").append(nodeTab);
    nodeTab.tabs();
    $("#editPanel").panel();
}


/*
 活动操作操作相关功能函数
 */
var iconDatas =
    [
        { iconid: "archives", iconvalue: "archives", imgsrc: "icons/archives.gif" },
        { iconid: "attibutes", iconvalue: "attibutes", imgsrc: "icons/attibutes.gif" },
        { iconid: "back", iconvalue: "back", imgsrc: "icons/back.gif" },
        { iconid: "cancel", iconvalue: "cancel", imgsrc: "icons/cancel.png" },
        { iconid: "config", iconvalue: "config", imgsrc: "icons/config.gif" },
        { iconid: "customers", iconvalue: "customers", imgsrc: "icons/customers.gif" },
        { iconid: "cut", iconvalue: "cut", imgsrc: "icons/cut.png" },
        { iconid: "database", iconvalue: "database", imgsrc: "icons/database.gif" },
        { iconid: "add", iconvalue: "add", imgsrc: "icons/edit_add.png" },
        { iconid: "remove", iconvalue: "remove", imgsrc: "icons/edit_remove.png" },
        { iconid: "save", iconvalue: "save", imgsrc: "icons/filesave.png" },
        { iconid: "help", iconvalue: "help", imgsrc: "icons/help.png" },
        { iconid: "no", iconvalue: "no", imgsrc: "icons/no.png" },
        { iconid: "ok", iconvalue: "ok", imgsrc: "icons/ok.png" },
        { iconid: "edit", iconvalue: "edit", imgsrc: "icons/pencil.png" },
        { iconid: "print", iconvalue: "print", imgsrc: "icons/print.png" },
        { iconid: "redo", iconvalue: "redo", imgsrc: "icons/redo.png" },
        { iconid: "undo", iconvalue: "undo", imgsrc: "icons/undo.png" },
        { iconid: "reload", iconvalue: "reload", imgsrc: "icons/reload.png" },
        { iconid: "search", iconvalue: "search", imgsrc: "icons/search.png" },
        { iconid: "tip", iconvalue: "tip", imgsrc: "icons/tip.png" },
        { iconid: "sum", iconvalue: "sum", imgsrc: "icons/sum.png" },
        { iconid: "view", iconvalue: "view", imgsrc: "icons/view.png" }
    ];
var showTypeDatas =
    [
        { showtypeid: "0", showtypevalue: "办理中" },
        { showtypeid: "1", showtypevalue: "结束后" },
        { showtypeid: "2", showtypevalue: "一直"}];

function loadmdlActivityOperation() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        var $tmp=$('#activityOperationList');
        $tmp.datagrid('options').url = rootPath+'Sys_mdl_activityoperation/LoadPageList.do?activitymodelid=' + whichNode.props.id.value;
        $tmp.datagrid('load');
    }
}

//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='../../Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}

//选择按钮图标
function formatItem(item) {
    return "<img src='../../ScriptSource/EasyUI/Skins/" + item.imgsrc + "' />";
}
//格式化何时显示单元格
function formatterShowtypeCell(value) {
    return getShowtypeText(value);
}

function getShowtypeText(value) {
    var textStr = "";
    for (var index in showTypeDatas) {
        if (showTypeDatas[index].showtypeid == value) {
            textStr = showTypeDatas[index].showtypevalue;
            break;
        }
    }
    return textStr;
}
//格式化按钮图标地址
function formatterButtonIconCell(value, row) {
    return (value && value.length > 0 ? "<span class='icon-" + value + "' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>" : "");
}

//活动操作配置列表双击事件 编辑状态
function dblClickOperation(rowIndex, field, value) {
    if (editOperationIndex == rowIndex) return;
    if (!endOperationEditing()) return;
    $('#activityOperationList').datagrid("unselectAll");
    editOperationIndex = rowIndex;
    $('#activityOperationList').datagrid('beginEdit', editOperationIndex);
}

//右击弹出活动
function menuOperationContextMenu(e, rowIndex, rowData) {
    e.preventDefault(); //取消IE右键事件
    $('#contextOperationMenuToolBar').menu('removeItem', $('#mdlOperationButton'));
    $('#activityOperationList').datagrid("unselectAll");
    $('#activityOperationList').datagrid('selectRow', rowIndex);
    //添加禁用和启用
    if (rowData.delstatus && rowData.delstatus == 1) {//已经禁用
        $('#contextOperationMenuToolBar').menu('appendItem', { 'text': '启用', 'id': 'mdlOperationButton', iconCls: 'icon-ok', onclick: undeleteActivityOperation });
    }
    else {

        $('#contextOperationMenuToolBar').menu('appendItem', { 'text': '禁用', 'id': 'mdlOperationButton', iconCls: 'icon-pause', onclick: deleteActivityOperation });
    }
    $('#contextOperationMenuToolBar').menu('show', {
        left: e.pageX,
        top: e.pageY
    });
}

var editOperationIndex;
//结束活动操作编辑
function endOperationEditing() {
    if (editOperationIndex == undefined) { return true }
    if ($('#activityOperationList').datagrid('validateRow', editOperationIndex)) {
        $('#activityOperationList').datagrid('endEdit', editOperationIndex);
        editOperationIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//保存活动操作配置
function saveActivityOperation() {
    if (!endOperationEditing()) return;
    var changesData = $('#activityOperationList').datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_mdl_activityoperation/SaveForm.do",
        data: { changeDatas: JSON2.stringify(changesData) },
        success: function (data, msg) {
            $('#activityOperationList').datagrid('reload');
            $('#activityOperationList').datagrid('acceptChanges');
            GlobalTools.tip("保存成功");
        }
    });
}

//新增活动操作配置
function creatActivityOperation() {
    if (!endOperationEditing()) return;
    $('#activityOperationList').datagrid("unselectAll");
    $('#activityOperationList').datagrid('appendRow', { id:null, activitymodelid: whichNode.props.id.value, chinaname: "", constname: "", functionname: "", iconcls: "icon-add", delstatus: "0", showtype: "0" });
    editOperationIndex = $('#activityOperationList').datagrid('getRows').length - 1;
    $('#activityOperationList').datagrid('beginEdit', editOperationIndex);
}

//编辑活动操作配置
function editorActivityOperation() {
    if (!endOperationEditing()) return;
    var row = $('#activityOperationList').datagrid('getSelected');
    if (row) {
        editOperationIndex = $('#activityOperationList').datagrid('getRowIndex', row);
        $('#activityOperationList').datagrid('beginEdit', editOperationIndex);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}

//撤销
function cancelEditorActivityOperation() {
    if (editOperationIndex == undefined) return;
    $('#activityOperationList').datagrid('selectRow', editOperationIndex);
    var row = $('#activityOperationList').datagrid('getSelected');
    if (row && row.id > 0) {
        $('#activityOperationList').datagrid('cancelEdit', editOperationIndex);
    }
    else {
        $('#activityOperationList').datagrid('deleteRow', editOperationIndex);
    }
    editOperationIndex = undefined;
}

//禁用活动操作配置
function deleteActivityOperation() {
    GlobalTools.deleteGridList($('#activityOperationList'), { url: rootPath + "Sys_mdl_activityoperation/DeleteList.do" });
}

//启用活动操作配置
function undeleteActivityOperation() {
    GlobalTools.unDeleteGridList($('#activityOperationList'), { url: rootPath + "Sys_mdl_activityoperation/UnDeleteList.do" });
}

//销毁活动操作配置
function destroyActivityOperation() {
    GlobalTools.destroyGridList($('#activityOperationList'), { url: rootPath + "Sys_mdl_activityoperation/DestroyList.do" });
}

//单击列表行
function onClickColsListRow(index, rowData) {
    $('#divSelectFormCols').datagrid('beginEdit', index);
}

//触发新流程
function openSelectAnotherProcessDialog() {
    dialogDiv.dialog({
        title: '流程选择',
        iconCls: 'icon-save',
        animate: true,
       // buttons: '#divSelectAnotherprocessButtons',
        width: 600,
        height: 500,
        closed: true,
        cache: false,
        href: '../../WorkFlow/FlowModel/ModelActivitySelectAnotherprocess.htm',
        modal: true,
        buttons: [{
            text:'确定',
           // iconCls:'icon-ok',
            handler:function(){
                saveCheckedAnotherProcess();
            }
        },{
            text:'取消',
           // iconCls:'icon-cancel',
            handler:function(){
                closeSelectAnotherProcessDialog();
            }
        }]
    });
    dialogDiv.dialog("open");
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
    dialogDiv.dialog("close");
}
//查询可选新流程
function searchAnotherProcessList() {
    $('#anotherDefProcessList').treegrid('options').url =rootPath+ 'Sys_def_process/LoadCanBeAnotherProcessList.do?constname=' + escape(processconstname) + '&keyname=' + $('#anotherkeyname').val();
    $('#anotherDefProcessList').treegrid('reload');
}

//按钮顺序tab页加载完成后的事件
function loadButtonsSortList() {
    if (whichNode && whichNode.props.id.value.toString().length > 0) {
        var btnSortList=$('#buttonsSortList');
        btnSortList.datagrid('options').url = rootPath+'Sys_mdl_transition/LoadButtonsList.do?mdlactivityId=' + whichNode.props.id.value;
        btnSortList.datagrid('load');
    }
}
//按钮顺序配置列表双击事件 编辑状态
function dblClickButtonsSort(rowIndex, field, value) {
    if (editOperationIndex == rowIndex) return;
    if (!endButtonsSortEditing()) return;
    var $tmp=$('#buttonsSortList');
    $tmp.datagrid("unselectAll");
    editOperationIndex = rowIndex;
    $tmp.datagrid('beginEdit', editOperationIndex);
}
//保存按钮顺序
function saveButtonsSort(){
    if (!endButtonsSortEditing()) return;
    var $tmp=$('#buttonsSortList');
    var changesData = $tmp.datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_mdl_transition/SaveButtonsList.do",
        data: { changeDatas: JSON2.stringify(changesData) ,mdlactid:whichNode.props.id.value },
        success: function (data, msg) {
            $tmp.datagrid('reload');
            $tmp.datagrid('acceptChanges');
            SkyUtil.EasyUiUtil.showTip(msg);
            $tmp.datagrid('endEdit', editOperationIndex);
            $tmp.datagrid('acceptChanges');
            $tmp.datagrid('reload');
            editOperationIndex = undefined;
            $tmp.datagrid('unselectAll')
        }
    });
}
//编辑按钮顺序
function editorButtonsSort(){
    if (!endButtonsSortEditing()) return;
    var $tmp=$('#buttonsSortList');
    var row = $tmp.datagrid('getSelected');
    if (row) {
        editOperationIndex = $tmp.datagrid('getRowIndex', row);
        $tmp.datagrid('beginEdit', editOperationIndex);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}
//取消编辑按钮顺序
function cancelEditorButtonsSort(){
    if (editOperationIndex == undefined) return;
    $('#buttonsSortList').datagrid('selectRow', editOperationIndex)
        .datagrid('cancelEdit', editOperationIndex);
    editOperationIndex = undefined;
}
//结束编辑按钮顺序
function endButtonsSortEditing() {
    if (editOperationIndex == undefined) { return true }
    var $tmp=$('#buttonsSortList');
    if ($tmp.datagrid('validateRow', editOperationIndex)) {
        $tmp.datagrid('endEdit', editOperationIndex);
        editOperationIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}