var clickButtonInfo, //点击按钮时，该按钮的附加信息
 treeTabInfo = [], //选人的tab信息集合
 currentInsProcessId = Request("insprocessid"),
 currentInsActivityId = Request("insactivityid"),
 currentDefActivityId = Request("defactivityid"),
 currentWorkFlowConstName = Request("constname"),
 runInsActivityId = Request("runinsactid"), //用于回退产生的步骤中，用于后台判断文书能否再次编辑
 currentTaskTitle = "";
 isTrigger= Request("isTrigger"),
 triggerInsActivityId = Request("triggerInsActivityId");

$(function () {
    /*if (currentWorkFlowConstName && currentWorkFlowConstName != "") {
    startNewProcess();
    currentWorkFlowConstName = "";
    }
    */

    if(currentRecordId||currentSummaryRecordId){
        loadProcessButtons();
    }else{
        var funParam = "{constname:'save',nextactivityid:'',currentinsactivityid:'',transitionid:'',extraproperty:'',specialname:''}";
        var btnsHtml = "<div class='toolbar'><a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"doWorkFlowSave(" + funParam + ");\" constname=\"save\">保存</a> </div>";
        $("#toptoolbar").html(btnsHtml);
        $.parser.parse($("#toptoolbar")); //easyui渲染
    }

   // loadProcessButtons();
    /*
    if(isSuspend()){
        startMask();//启动遮罩
        GlobalTools.tip("流程被挂起！");
    }
    */
});
///表单打印
function doTailorFormPrint() {
    var printPath = "../TailorFormManager/TailorFormPrintViewPage.htm";
    GlobalTools.ajax({
        async: false,
        type: "POST",
        url: rootPath + "Sys_def_tailorform/LoadTailorForm.do",
        data: { tailorformid: $("#tailorformid").val() },
        success: function (data) {
            printPath = data.printpath;
        }
    });
    top.addTab(top.getTabTitle() + '-表单打印', printPath + '?recordid=' + currentRecordId + '&tailorformid=' + $("#tailorformid").val());
}

//文书目录
var divTailorFormList;
function doTailorFormList(obj) {
    if ($("#divTailorFormList").get(0)) {
        $("#divTailorFormList").remove();

    }

    try {
        if (obj && !currentInsActivityId) {
            currentInsActivityId = obj.currentinsactivityid;
        }
    }
    catch (e) { }

    divTailorFormList = $("<div id=\"divTailorForm\" class=\"easyui-window\" title=\"文书目录\"></div>");
    var gridNewList = "<div id=\"divTailorFormList\" class=\"easyui-tabs\" fit=\"true\" border=\"false\" style=\"height:300px;\">";
    if (!obj.extraproperty || (obj.extraproperty && obj.extraproperty != "readonly")) {
        gridNewList += " <div title='可添加表单'><table id=\"dgCanInsertTailorFormList\" class=\"easyui-datagrid\" data-options=\"url: rootPath+'Sys_def_activityform/LoadCanAddFormList.do?insactivityid='+ currentInsActivityId,singleSelect: false,fit: true,fitColumns: true,rownumbers: true,pageSize: 20,pagination: true,idField: 'id',onDblClickRow:addNewTailorForm,onLoadError: gridLoadError\"><thead><tr><th data-options=\"field:'tailorformname'\" width=\"140\">表单名称</th><th data-options=\"field:'tailorformtype',formatter: formatterFormType\" width=\"120\" align=\"center\">表单类型</th></tr></thead></table>\</div>";
    }
    gridNewList += "<div title='已存在表单'><table id=\"dgExistsTailorFormList\" class=\"easyui-datagrid\" data-options=\"url: rootPath+'Sys_ins_processtailorform/LoadExistFormList.do?insprocessid='+currentInsProcessId+'&insactivityid='+ currentInsActivityId,singleSelect: false,fit: true,fitColumns: true,rownumbers: true,pageSize: 20,pagination: true,idField: 'id',onDblClickRow:scanEditTailorForm,onLoadError: gridLoadError\"><thead><tr><th data-options=\"field:'tailorformname'\" width=\"200\">表单名称</th><th data-options=\"field:'canedit',formatter: formatterEditCell\" width=\"40\"></th></tr></thead></table>\</div>\</div>";
    divTailorFormList.append(gridNewList);
    divTailorFormList.window({
        modal: true,
        minimizable: false,
        maximizable: false,
        closed: true,
        iconCls: 'icon-save',
        width: 630,
        height: 410
    });

    $("#divTailorFormList").tabs();
    $("#dgCanInsertTailorFormList").datagrid();
    $("#dgExistsTailorFormList").datagrid();
    divTailorFormList.window('open');
}

function formatterEditCell(value, row, index) {
    if (value == "true") {
        return "<a href='#' onclick='deleteTailorForm(\"" + row.id + "\",\"" + row.tablename + "\",\"" + row.recordid + "\",\"" + index + "\")' title='删除该文书'> 删除 </a>";
    }
}

function deleteTailorForm(id, tablename, recordid, index) {
    $.messager.confirm('删除确认提示', '确定删除该文书?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_ins_processtailorform/Delete.do",
                data: { id: id },
                success: function (data) {
                    GlobalTools.ajax({
                        url: rootPath + "Form/DeleteForm.do",
                        data: { tablename: tablename, id: recordid },
                        success: function (data) {
                            GlobalTools.tip("删除成功！");
                        }
                    });
                    $("#dgExistsTailorFormList").datagrid("deleteRow", index);
                    $("#dgCanInsertTailorFormList").datagrid("reload");
                }
            });
        }
    });
}

//新增表单
function addNewTailorForm(rowIndex, rowData) {
    //判断 tailorformtype=0(普通表单是否已经登记过； 曲线解决登记普通表单不刷新文书目录)

    if (rowData.tailorformtype == 0) {//普通表单
        GlobalTools.ajax({
            type: "POST",
            url: rootPath + "Sys_ins_processtailorform/CanAddTailorForm.do",
            data: { tablename: rowData.tablename, insactivityid: currentInsActivityId },
            success: function () {
                addNewTailorFormMethod(rowData);
            },
            error: function () {
                GlobalTools.showError("表单已经添加。");
                $("#dgCanInsertTailorFormList").datagrid("reload");
            }
        });
    }
    else {//文书
        addNewTailorFormMethod(rowData);
    }
}
//根据表单ID获取表单定义对象
function addNewTailorFormMethod(rowData) {
    GlobalTools.ajax({
        type: "POST",
        url: rootPath + "Sys_def_tailorform/LoadTailorForm.do",
        data: { tailorformid: rowData.tailorformid },
        success: function (data) {
            if (data.path) {
                top.addTab(rowData.tailorformname, data.path + "?tailorformtype=nomain&summaryrecordid=" + currentRecordId + "&insactivityid=" + currentInsActivityId);
            }
            else
                GlobalTools.showError("表单定义无效。");
        }
    });
}

//查看、编辑表单/获取表单定义对象，并展示表单
function scanEditTailorForm(rowIndex, rowData) {
    //根据表单ID获取表单定义对象
    GlobalTools.ajax({
        type: "POST",
        url: rootPath + "Sys_def_tailorform/LoadTailorForm.do",
        data: { tailorformid: rowData.tailorformid },
        success: function (data) {
            if (data) {
                if (data.path) {
                    var pagePath = data.path + "?summaryrecordid=" + currentRecordId + "&insactivityid=" + rowData.insactivityid + "&runinsactid=" + currentInsActivityId; //runinsactid 用于回退产生的步骤中，用于后台判断文书能否再次编辑
                    if (rowData.recordid) {
                        pagePath += "&recordid=" + rowData.recordid;
                    }
                    top.addTab(data.chinaname + "-" + (rowIndex + 1), pagePath);
                }
                else
                    GlobalTools.showError("表单定义无效。");
            }
            else
                GlobalTools.showError("流程设置的主表单无效。");
        }
    });
}

function closeDivTailorFormList() {
    try {
        divTailorFormList.window('close');
    }
    catch (e)
    { }
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
//启动新流程
function startNewProcess(formData) {
    GlobalTools.ajax({
        async: false,
        type: "GET",
        url: rootPath + "Sys_ins_process/SaveProcessInstance.do",
        data: { constname: currentWorkFlowConstName, tasktitle: currentTaskTitle },
        success: function (data) {
            currentInsActivityId = data.sys_ins_activity.id;
            currentInsProcessId = data.sys_ins_activity.processinsid;
            if (formData) {
                saveProcessForm(formData); //如果是新绑的表单,记录该表单和当前流程的关系
            }
            refreshWorkFlowListPage();
        }
    });
}

//加载流程按钮
var constnamesButtons = ","+([//预定义按钮常量名
    "default","end","countersignend","subprocess","customprocess","tailorfromlist","traceflow","recall","scan","scanend","scantoscan","suspend"]
    .join())+",";
function loadProcessButtons() {
    var recordid = "";
    try {
        if (currentRecordId) {
            recordid = currentRecordId;
        }
    } catch (e) { }

    GlobalTools.ajax({
        type: "GET",
        url: rootPath + "Sys_ins_activity/LoadWorkFlowButtons.do",
        data: { insprocessid:currentInsProcessId,insactivityid: currentInsActivityId, recordid: recordid, tailorformid: $("#tailorformid").val(), runinsactivityid: runInsActivityId },
        success: function (data) {
            var btnsHtml = "<div class='toolbar'>";

            var funParam = "";
            for (var index in data) {
                if(constnamesButtons.indexOf(","+data[index].constname+",")!=-1){
                    funParam = "{constname:'" + data[index].constname + "',nextactivityid:'" + data[index].nextactivityid + "',currentinsactivityid:'" + data[index].currentinsactivityid + "',transitionid:'" + data[index].transitionid + "',extraproperty:'" + data[index].extraproperty + "',specialname:'"+data[index].specialname+"'}";
                    btnsHtml+="<a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-" + data[index].icon + "'\" onclick=\"" + data[index].functionname + "(" + funParam + ");\" constname=\"" + data[index].constname + "\">" + data[index].text + "</a> ";
                }
                else {
                    btnsHtml+="<a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-" + data[index].icon + "'\" onclick=\"" + data[index].functionname + "();\" constname=\"" + data[index].constname + "\">" + data[index].text + "</a> ";
                }
            }
            btnsHtml+="</div>";
            document.getElementById("toptoolbar").innerHTML=btnsHtml;
            //$("#toptoolbar").html(btnsHtml);
            // $("#toptoolbar .easyui-linkbutton").linkbutton();
            $.parser.parse($("#toptoolbar")); //easyui渲染
        }
    });
}

//默认流程处理（选择“下一步”接手人 ）
function doWorkFlowDefault(data) {
    if (!checkCurrentActCanDo()) {
        return;
    }
    if (!checkAllMustFormsDone()) {
        GlobalTools.tip("还有文书没有登记！");
        return;
    }
    clickButtonInfo = data;
    switch (data.constname) {
        case "end": //办结
            $.messager.confirm('确认提示', '办结流程，确定执行?', function (r) {
                if (r) {
                    realDoWorkFlow();
                }
            });
            break;
        case "countersignend": //会签中的办结
            $.messager.confirm('确认提示', '本步骤结束，确定执行?', function (r) {
                if (r) {
                    realDoWorkFlow();
                }
            });
            break;
        case "scanend": //传阅办结
            $.messager.confirm('确认提示', '确定阅览结束?', function (r) {
                if (r) {
                    realDoWorkFlow();
                }
            });
            break;
        default:
            selectProcessRecevier(); //人员选择页
            break;
    }
}

//关闭人员选择弹窗
function closeDivSelectReceiver() {
    try {
        divSelectReceiver.window('close');
    }
    catch (e)
    { }
}

//挂起
function suspend(){
    //弹出挂起事由填写对话框
    $.messager.prompt('提示信息', '请输入挂起原因(20字以内)：', function(r){
        if (r){
            if(r.length > 20){
                GlobalTools.tip("您输入的内容过长，请重新输入！");
                return;
            }
            //挂起流程图实例,新增挂起信息
            GlobalTools.ajax({
                url: rootPath + "Suspend_info/AddSuspendInfoAndSuspendProcess.do",
                data: { suspend_reason: r,current_insprocessid:currentInsProcessId,current_insactivityid:currentInsActivityId },
                success: function (data) {
                    //重新加载按钮
                    loadProcessButtons();
                    //启动遮罩
                    startMask();
                }
            });
        }
    });
}

//解挂、激活
function activate(){
    //激活流程图实例
    GlobalTools.ajax({
//        url: rootPath + "Sys_ins_process/ActivateLocatedInsProcess.do",
        url: rootPath + "Suspend_info/AddActiveInfoAndActiveProcess.do",
        data: { current_insprocessid:currentInsProcessId,current_insactivityid:currentInsActivityId},
        success: function (data) {
            //重新加载按钮
            loadProcessButtons();
            //取消遮罩
            cancelMask();
        }
    });
}

//启用遮罩
function startMask(){
    if($("#form_mask").length==0){
        $("#TailorForm").append("<div id='form_mask' class='window-mask' style='width: 100%;height: 100%;top:"+$("#toptoolbar").height()+"px;z-index: 9010'></div>")
    }
    $("#form_mask").css("display","block");
}

//取消遮罩
function cancelMask(){
    $("#form_mask").css("display","none");
}

//流程回退
function doWorkFlowBack() {
    if(!checkCurrentActCanDo()){
        return;
    }
    $.messager.confirm('确认提示', '确定回退?', function (r) {
        if (r) {
            doWorkFlowSave(); //保存表单
            GlobalTools.ajax({
                url: rootPath + "Sys_ins_activity/DoWorkFlowBack.do",
                data: { insactivityid: currentInsActivityId },
                success: function (data) {
                    if (refreshTailorFormPage(data)) {
                        loadProcessButtons();
                        refreshWorkFlowListPage();
                        closeDivSelectReceiver();
                    }
                }
            });
        }
    });
}

//判断必填文书是否都已登记
function checkAllMustFormsDone() {
    var flag = true;
    $.ajax({
        async: false,
        url: rootPath + "Sys_ins_processtailorform/AllMustFormsIsDone.do",
        data: { insactivityid: currentInsActivityId },
        success: function (data) {
            if (data == "alldone") {
                flag = true;
            }
            else {
                flag = false;
            }
        }
    });
    return flag;
}

//流程撤消
function doWorkFlowRecall(data) {
    var nextProcIds = "";
    if (data.extraproperty) {
        nextProcIds = data.extraproperty;
    }
    $.messager.confirm('确认提示', '确定撤销?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_ins_activity/DoWorkFlowRecallKeepRecord.do",
                data: { currentinsactid: currentInsActivityId, nextinsactids: data.nextactivityid, nextinsprocids: nextProcIds },
                success: function (data,msg) {
                    if(data!=null){
                        GlobalTools.tip(msg);
                    }else if (refreshTailorFormPage(currentInsActivityId)) {
                        loadProcessButtons();
                    }
                }
            });
        }
    });
}

//流程强制撤消
function doWorkFlowRecallforce(data) {
    var nextProcIds = "";
    $.messager.confirm('确认提示', '注意：此操作会撤销掉后续所有的任务，确定撤销吗?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_ins_activity/DoWorkFlowRecallForceKeepRecord.do",
                data: { currentinsactid: currentInsActivityId },
                success: function (data,msg) {
                    if(data!=null){
                        GlobalTools.tip(msg);
                    }else if (refreshTailorFormPage(currentInsActivityId)) {
                        loadProcessButtons();
                    }
                }
            });
        }
    });
}

//流程补发
function doWorkFlowReissue(data) {
    $.messager.confirm('确认提示', '确定此操作吗?', function (r) {
        if (r) {
            GlobalTools.ajax({
                url: rootPath + "Sys_ins_activity/DoWorkFlowReissue.do",
                data: { currentinsactid: currentInsActivityId },
                success: function (data,msg) {
                    if(data!=null){
                        GlobalTools.tip(msg);
                    }else if (refreshTailorFormPage(currentInsActivityId)) {
                        loadProcessButtons();
                    }
                }
            });
        }
    });
}

//刷新页面（下一步的接手人是当前人）
function refreshTailorFormPage(newInsActivtyId) {
    var flag = true;
    if (newInsActivtyId && newInsActivtyId != "") {//data不为空，表示下一步的接手人是当前人
        if (window.location.pathname != null) {
            if (window.location.pathname.indexOf('/') == 0) {
                var pagePath = window.location.pathname;
                for (var index = 0; index < 2; index++) {
                    var strIndex = pagePath.indexOf('/');
                    if (strIndex >= 0) {
                        pagePath = pagePath.substring(strIndex + 1);
                    }
                }
                if (pagePath && pagePath != "") {
                    flag = false;
                    pagePath = "../../" + pagePath + "?insactivityid=" + newInsActivtyId + "&recordid=" + currentRecordId+"&insprocessid="+currentInsProcessId;
                    top.closeThenAddTab(top.getTabTitle(), pagePath);
                }
            }
        }
    }
    return flag;
}

//子流程
function doWorkFlowSubProcess(data) {
    if(!checkCurrentActCanDo()){
        return;
    }
    clickButtonInfo = data;
    GlobalTools.ajax({
        type: "POST",
        url: rootPath + "Sys_def_actorcondition/GetSubProcessAllowReceivers.do",
        data: { insactivityid: currentInsActivityId }, //当前活动实例id；
        success: function (data) {
            if (!checkRecevierData(data)) {
                return;
            }
            drawRecevierWindow(data);
        }
    });
}

//选择接手人
function selectProcessRecevier() {
    var recordid = "";
    if (currentRecordId) {
        recordid = currentRecordId;
    }
    GlobalTools.ajax({
        type: "POST",
        url: rootPath + "Sys_def_actorcondition/GetAllowReceivers.do",
        data: { insactivityid: currentInsActivityId, nextdefactivityid: clickButtonInfo.nextactivityid, recordid: recordid }, //当前活动实例id；下一个活动定义id
        success: function (data) {
            if (!checkRecevierData(data)) {
                return;
            }

            //下一步若是汇集时 且为 不需要弹出选人页面 (“任意一个 存在某个节点执行过” 或 “全部 某个节点未做（处当前节点）)” 
            //clickButtonInfo.nextactivitytype == "join" &&
            if (!data[0].ischoosereceiver) {
                $.messager.confirm('确认提示', '确定执行?', function (r) {
                    if (r) {
                        realDoWorkFlow();
                        return;
                    }
                });
            }
            else {
                drawRecevierWindow(data);
            }
        }
    });
}

//人员选择数据初始判断
function checkRecevierData(data) {

    if (data == null || data.length == 0) {
        GlobalTools.tip("未找到下一步接手人。可能原因：1、流程节点配置错误；2、获取数据出错！");
        return false;
    }

    if (treeTabInfo.length > 0) {
        treeTabInfo = new Array();
    }
    return true;
}

//人员选择页面
//
var divSelectReceiver;
function drawRecevierWindow(data) {
    if ($("#divSelectReceiver").get(0)) {
        $("#divSelectReceiver").remove();

    }
    divSelectReceiver = $("<div id=\"divSelectReceiver\" class=\"easyui-window\" title=\"选择接手人\" style=\" padding: 10px;\">\</div>");
    var tabsHtml = $("<div id=\"receiverTab\" class=\"easyui-tabs\" data-options=\"tools:[{iconCls:'icon-save',text:'确定',handler:function(){	doWorkFlowEvent();}	},{iconCls:'icon-remove',text:'关闭',handler:function(){closeDivSelectReceiver();}}]\" style=\"width:600px;height:350px\">");
    var treeHtml = "";
    for (var index = 0,len=data.length;index<len;index++) {
        treeTabInfo.push({ tabid: data[index].nextdefactivityid, tabname: data[index].nextdefactivityname, multiselect: data[index].multiselect });
        if (data[index].deptusers) {
            if (data[index].deptusers.length > 0) {
                if (data[index].isasyncloaduser) {
                    if (data[index].deptusers && data[index].deptusers.length > 0) {
                        treeHtml = " <div title='" + data[index].nextdefactivityname + "' id='tree-" + data[index].nextdefactivityid + "' style='padding:0px'> <ul id='ul-tree-" + data[index].nextdefactivityid + "' class='easyui-tree' data-options='url:rootPath+\"Sys_dept/LoadDeptUserTree.do?deptids=" + data[index].deptusers[0].id + "&roles=" + data[index].deptusers[0].roles + "\",animate:true,checkbox:" + data[index].multiselect + ",onlyLeafCheck:true'></ul></div>";
                    }
                    else {
                        treeHtml = " <div title=\"" + data[index].nextdefactivityname + "\" id=\"tree-" + data[index].nextdefactivityid + "\" style=\"padding:0px\"> <ul>无符合条件的人员。可能原因：人员配置错误！请联系管理员！</ul></div>";
                    }
                }
                else {
                    treeHtml = " <div title='" + data[index].nextdefactivityname + "' id='tree-" + data[index].nextdefactivityid + "' style='padding:0px'> <ul class='easyui-tree' id='ul-tree-"+data[index].nextdefactivityid+"' data-options='data:" + JSON2.stringify(data[index].deptusers) + ",animate:true,onLoadSuccess:loadDeptUserSuccess,checkbox:" + data[index].multiselect + ",onlyLeafCheck:false,loadFilter: function(rows){return convert(rows);}'></ul></div>";
                }
            }
            else {
                treeHtml = " <div title=\"" + data[index].nextdefactivityname + "\" id=\"tree-" + data[index].nextdefactivityid + "\" style=\"padding:0px\"> <ul>无符合条件的人员。可能原因：人员配置错误！请联系管理员！</ul></div>";
            }
        }
        else {
            treeHtml = " <div title=\"" + data[index].nextdefactivityname + "\" id=\"tree-" + data[index].nextdefactivityid + "\" style=\"padding:0px\"> <ul>无符合条件的人员。可能原因：流程活动节点 人员配置错误或条件配置错误！请联系管理员！</ul></div>";
        }
        tabsHtml.append(treeHtml);
    }

   // var tabButtons = "<div id=\"tab-tools\"><a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"doWorkFlowEvent()\">确定</a><a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\" onclick=\"closeDivSelectReceiver()\">关闭</a></div>";
    //tabsHtml.append(tabButtons);
    divSelectReceiver.append(tabsHtml);
    divSelectReceiver.window({
        modal: true,
        minimizable: false,
        maximizable: false,
        closed: true,
        iconCls: 'icon-save',
        width: 630,
        height: 410
    });

    $("#tab-tools a").linkbutton();
    $("#receiverTab ul").tree();
    $("#receiverTab").tabs();

    // $.parser.parse($("#divSelectReceiver")); //easyui渲染


    divSelectReceiver.window('open');
}

function loadDeptUserSuccess(node, data) {
    var leafCount = 0;
    var leafid;
    if (data) {
        var treeid = $(this).parent().attr("id");
        $(data).each(
            function (index, _data) {
                if (this.state == 'closed') {
                    $('#ul-' + treeid).tree('expandAll');
                }
                var $ulTree=$('#ul-' + treeid);
                $($ulTree.tree('getChildren', $ulTree.tree('find', _data.id).target)).each(function (indexC, dataC) {
                    if (dataC.id.indexOf("user_") >= 0) {
                        leafid = this.id;
                        leafCount++;
                    }
                });
            }
        );
    }
    if (leafCount == 1) {
        defaultChkSel(treeid, leafid);
        //setTimeout("defaultChkSel('" + treeid + "','" + leafid + "')", 500);
    }
}
function defaultChkSel(treeid, leafid) {
    try {
        var treeObj = $('div #' + treeid + " ul");
        var nodeTarget = treeObj.tree('find', leafid).target;
        if (treeObj.tree("options").checkbox) {
            treeObj.tree('check', nodeTarget);
        }
        else {
            treeObj.tree('select', nodeTarget);
        }
    }
    catch (e)
    { }
}

function deptLoadSuccess(node, data) {
    if (data) {
        var treeid = $(this).parent().attr("id");
        $(data).each(
            function (index, _data) {
                if (this.state == 'closed') {
                    $('#ul-' + treeid).tree('expandAll');
                }
            }
        );
    }
}
function expanded(node) {
    var treeid = $(this).parent().attr("id");
    var childrenNodes = $('#ul-' + treeid).tree('getChildren', node.target);
    var parentNode = $('#ul-' + treeid).tree('getParent', node.target);
    if (childrenNodes.length == 0) {
        $('#ul-' + treeid).tree('remove', node.target);
        removeEmptyNode(parentNode, treeid);
    }
}

function removeEmptyNode(node, treeid) {
    if (!node) return;
    try {
        var childrenNodes = $('#ul-' + treeid).tree('getChildren', node.target);
        var parentNode = $('#ul-' + treeid).tree('getParent', node.target);

        if (childrenNodes.length == 0) {
            $('#ul-' + treeid).tree('remove', node.target);
            removeEmptyNode(parentNode, treeid);
        }
    }
    catch (se) { }
}

//执行流程
function doWorkFlowEvent() {
    //获取选中的接手人
    var nextactivityinfo = new Array();
    var noselect = "";
    for (var index= 0,lenTab=treeTabInfo.length;index<lenTab;index++) {
        var nodes;
        var userids = '';
        var ulTree=$('#ul-tree-' + treeTabInfo[index].tabid);
        if (treeTabInfo[index].multiselect) {
            // return;
            nodes = ulTree.tree('getChecked');
            for (var i = 0,nodesLen=nodes.length; i < nodesLen; i++) {
                var nodeId = nodes[i].id;
                if(nodeId.substring(0,nodeId.indexOf("_")) == "user"){
                    if (userids != '') userids += ',';
                    userids += nodeId.ReplaceAll("user_", "");
                }
            }
        }
        else {
            nodes = ulTree.tree('getSelected');
            if (nodes && nodes.id && !nodes.state && nodes.id.substring(0,nodes.id.indexOf("_")) == "user"){
                userids = nodes.id.ReplaceAll("user_", "");
            }
        }
        if (userids.length != 0) {
              noselect += "《" + treeTabInfo[index].tabname + "》 ";
        }
        nextactivityinfo.push({ defactivityid: treeTabInfo[index].tabid, receiverids: userids });
    }
    if (noselect.length == 0) {
        GlobalTools.tip(noselect + "未选择接手人");
        return;
    }
    $.messager.confirm('确认提示', '确定执行?', function (r) {
        if (r) {
            realDoWorkFlow(JSON2.stringify(nextactivityinfo));
        }
    });
}
//提交后台 执行流程
function realDoWorkFlow(nextactinfo) {
    var wfInfo;
    if (clickButtonInfo.constname == "scan" || clickButtonInfo.constname == "scantoscan") {
        wfInfo = "{ insactivityid: " + clickButtonInfo.currentinsactivityid + ", deftransitionid: " + clickButtonInfo.transitionid + ", nextactivityinfo: " + nextactinfo + "}";
        GlobalTools.ajax({
            type: "POST",
            url: rootPath + "Sys_ins_activity/DoWorkFlowScan.do",
            data: { wfinfo: wfInfo },
            success: function (data) {
                GlobalTools.tip("发送成功！");
                closeDivSelectReceiver();

                if (clickButtonInfo.constname == "scantoscan") {
                    loadProcessButtons();
                }
            }
        });
    }
    else if (clickButtonInfo.constname == "scanend") {
        GlobalTools.ajax({
            type: "post",
            url: rootPath + "Sys_ins_activity/DoWorkFlowScanEnd.do",
            data: { "insactivityid": clickButtonInfo.currentinsactivityid },
            success: function (data) {
                // loadProcessButtons();
                $("a[constname='scanend']").remove(); //移除“办结”按钮
                setAllControlsDisable();
                refreshWorkFlowListPage();
            }
        });
    }
    else {
        doWorkFlowSave(); //保存表单

        switch (clickButtonInfo.constname) {
            case "subprocess": //子流程
                wfInfo = "{insactivityid:" + clickButtonInfo.currentinsactivityid + ",nextactivityinfo:" + nextactinfo + "}";
                GlobalTools.ajax({
                    type: "POST",
                    url: rootPath + "Sys_ins_activity/DoWorkFlowSubProcess.do",
                    data: { wfinfo: wfInfo },
                    success: function (data) {
                        if (refreshTailorFormPage(data)) {
                            closeDivSelectReceiver();
                            loadProcessButtons();
                            setAllControlsDisable();
                            refreshWorkFlowListPage();
                        }
                    }
                });
                break;
            case "countersignend": //会签中的办结
                wfInfo = "{insactivityid:" + clickButtonInfo.currentinsactivityid + "}";
                GlobalTools.ajax({
                    type: "POST",
                    url: rootPath + "Sys_ins_activity/DoWorkFlowDefault.do",
                    data: { wfinfo: wfInfo },
                    success: function (data) {
                        if (refreshTailorFormPage(data)) {
                            loadProcessButtons();
                            setAllControlsDisable();
                            refreshWorkFlowListPage();
                        }
                    }
                });
                break;
            default: //默认
                wfInfo = "{ insactivityid: " + clickButtonInfo.currentinsactivityid + ", deftransitionid: " + clickButtonInfo.transitionid + ", nextactivityinfo: " + nextactinfo + "}";
                GlobalTools.ajax({
                    type: "POST",
                    url: rootPath + "Sys_ins_activity/DoWorkFlowDefault.do",
                    data: { wfinfo: wfInfo },
                    success: function (data) {
                        if (refreshTailorFormPage(data)) {
                            closeDivSelectReceiver();
                            loadProcessButtons();
                            setAllControlsDisable();
                            refreshWorkFlowListPage();
                        }
                    }
                });
                break;
        }
    }
}

//刷新列表页面
function refreshWorkFlowListPage() {
    top.refreshTab("流程测试列表", "../WorkFlow/FlowInstance/WorkFlowList.htm");
}

//打开步骤监控
function doInsactivityTrace(obj) {
    try {
        if (obj && !currentInsActivityId) {
            currentInsActivityId = obj.currentinsactivityid;
        }
    }
    catch (e) { }
    top.addTab(top.getTabTitle() + '-步骤监控', '../WorkFlow/FlowInstance/InsActivityMonitoring.htm?insactivityid=' + currentInsActivityId + '&insprocessid=' + currentInsProcessId);
}

//打开流程监控页面
function doWorkFlowTrace(obj) {
    try {
        if (obj && !currentInsActivityId) {
            currentInsActivityId = obj.currentinsactivityid;
        }
    }
    catch (e) { }
    top.addTab(top.getTabTitle() + '-流程监控', '../WorkFlow/FlowInstance/DefineManagerViewPage.htm?insactivityid=' + currentInsActivityId + '&insprocessid=' + currentInsProcessId);
}

//编辑自定义流程图
function doCustomProcessTrace() {
    doWorkFlowSave(); //保存表单
    top.addTab(top.getTabTitle() + '-自定义流程', '../WorkFlow/FlowInstance/CustomProcess/CustomProcessManagerPage.htm?recordid='+currentRecordId+'&insactivityid=' + currentInsActivityId + '&insprocessid=' + currentInsProcessId+"&tabtitle="+encodeURI(top.getTabTitle()));
}

//自定义流程送下一步
function doCustomProcess(data) {
    $.messager.confirm('确认提示', '确定执行?', function (r) {
        doWorkFlowSave(); //保存表单
        if (r) {
            GlobalTools.ajax({
                type: "post",
                url: rootPath + "Sys_ins_activity/DoWorkFlowCustomDefault.do",
                data: { "insactivityid": +data.currentinsactivityid, "nextcustomactivityid": +data.nextactivityid },
                success: function (data) {
                    loadProcessButtons();
                    setAllControlsDisable();
                    refreshWorkFlowListPage();
                }
            })
        }
    });
}
//自定义流程回退
function doCustomProcessBack(data) {
    $.messager.confirm('确认提示', '确定回退?', function (r) {
        doWorkFlowSave(); //保存表单
        if (r) {
            GlobalTools.ajax({
                type: "post",
                url: rootPath + "Sys_ins_activity/DoWorkFlowCustomBack.do",
                data: { "insactivityid": +data.currentinsactivityid },
                success: function (data) {
                    loadProcessButtons();
                    setAllControlsDisable();
                    refreshWorkFlowListPage();
                }
            })
        }
    });
}
//自定义流程办结
function doCustomProcessEnd(data) {
    if (!checkCurrentActCanDo()) {
        return;
    }
    $.messager.confirm('确认提示', '确定办结?', function (r) {
        if(isCanSave()){
            doWorkFlowSave();//保存表单
            if (r) {
                GlobalTools.ajax({
                    type: "post",
                    url: rootPath + "Sys_ins_activity/DoWorkFlowCustomEnd.do",
                    data: { "insactivityid": +data.currentinsactivityid },
                    success: function (data) {
                        loadProcessButtons();
                        setAllControlsDisable();
                        refreshWorkFlowListPage();
                    }
                })
            }
        }
    });
}

//当前流程步是否可以操作
function currentActCanDo() {
    var flag = true;
    GlobalTools.ajax({
        async: false,
        url: rootPath + 'Sys_ins_activity/GetInsActivityStatus.do',
        data: { insactivityid: currentInsActivityId },
        success: function (data) {
            if (data.status == "complete" || data.status == "waitcountersign"
                || data.status == "waitsubprocess" || data.status == "pause"
                || data.status == "stop" || isSuspend()) {
                flag = false;
            }
        }
    });
    return flag;
}

function checkCurrentActCanDo() {
    if (!currentActCanDo()) {
        closeDivSelectReceiver();
        closeDivTailorFormList();
        loadProcessButtons();
        setAllControlsDisable();
        GlobalTools.tip("禁止操作，请检查当前流程或步骤的状态！");
        return false;
    }
    return true;
}

//验证表单是否可以保存
function isCanSave(){
    return $("#TailorForm").form("validate");
}

//easyui-treegrid的扩展使用
function convert(rows) {
    function exists(rows, parentid) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].id == parentid) return true;
        }
        return false;
    }

    var nodes = [];
    // get the top level nodes
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row.parentid)) {
            nodes.push({
                id: row.id,
                text: row.text
            });
        }
    }

    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        var node = toDo.shift(); // the parent node
        // get the children nodes
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.parentid == node.id) {
                var child = { id: row.id, text: row.text };
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}

//打开触发的新流程表单
function openAnotherProcessForm(){
    if(!checkCurrentActCanDo()){
        return;
    }
    GlobalTools.ajax({
        type: "POST",
        url: rootPath + "Sys_def_process/LoadAnotherTailorFormID.do",
        data: { currentInsActivityId: currentInsActivityId },
        success: function (data) {
            if (data) {
                if (data.tailorformid)
                    loadAnotherTailorFormPath(data.tailorformid,data.constname);
            }
            else
                GlobalTools.showError("流程未未设置主表单。");
        }
    });
}
function loadAnotherTailorFormPath(anotherTailorformid,anotherConstname) {
    var options = {
        modal:true,//默认以模式窗口打开
        closable:true,//默认带关闭按钮
        collapsible:true,//默认带折叠按钮
        minimizable:true,//默认带最小化按钮
        maximizable:true,//默认带最大化按钮
        border:false,//默认不显示边框
        iconCls:"icon-view",//默认标题左侧的图标
        top:null,//默认不设置顶边距
        left:null,//默认不设置左边距
        height:600,//默认高
        width:900//默认宽
    };
    GlobalTools.ajax({
        type: "POST",
        url: rootPath + "Sys_def_tailorform/LoadTailorForm.do",
        data: { tailorformid: anotherTailorformid },
        success: function (data) {
            if (data && $.trim(data.path)) {
                var localtionHref = window.location.href;
                var pagePath = $.trim(data.path)+"?isTrigger=yes&constname="+anotherConstname+"&triggerInsActivityId="+currentInsActivityId;
                GlobalTools.openWindow(data.chinaname,pagePath, options);
            }
            else
                GlobalTools.showError("流程设置的主表单无效。");
        }
    });
}
function triggerAnotherProcess(formData){
    GlobalTools.ajax({
        async: false,
        type: "GET",
        url: rootPath + "Sys_ins_activity/TriggerAnotherProcess.do",
        data: {tasktitle: currentTaskTitle,currentInsActivityId:triggerInsActivityId },
        success: function (data) {
            currentInsActivityId = data.sys_ins_activity.id;
            if (formData) {
                saveProcessForm(formData); //如果是新绑的表单,记录该表单和当前流程的关系
            }
            refreshWorkFlowListPage();
            parent.loadProcessButtons();
        }
    });
}
//
function inorderend() {
    doWorkFlowSave(); //保存表单
    GlobalTools.ajax({
        url: rootPath + "Sys_ins_activity/DoInorderEnd.do",
        data: {insactivityid: currentInsActivityId},
        success: function (data) {
            $("a[constname='save']").remove();
            $("a[constname='inorderend']").remove();
            setAllControlsDisable();
            refreshWorkFlowListPage();
        }
    });
}
//加签
var divSkipActSelectReceiver, allDeptData;
function doAddnewact() {
    $.ajax({
        url: rootPath + "Sys_dept/LoadAllDepts.do",
        async: false,
        success: function (data) {
            allDeptData = data.rows;
        }
    });
    if ($("#divSkipActSelectReceiver").get(0)) {
        $("#divSkipActSelectReceiver").remove();
    }
    divSkipActSelectReceiver = $("<div id=\"divSkipActSelectReceiver\" class=\"easyui-window\" title=\"选择接手人\" style=\" padding: 10px;\">\</div>");
    var tabsHtml = $("<div id=\"alldeptReceiverTab\" class=\"easyui-tabs\" data-options=\"tools:[{iconCls:'icon-save',text:'确定',handler:function(){	doAddWorkFlowEvent();}	},{iconCls:'icon-remove',text:'关闭',handler:function(){closeSkipDivSelectReceiver();}}]\" style=\"width:670px;height:500px\">");
    var treeHtml = " <div title='加签' id='tree-" + currentInsActivityId + "' style='padding:0px'><div style=\"float: left;width: 240px;margin-left:5px;margin-right: 5px; \"><table class='depttree' id=\"deptlist_" + currentInsActivityId + "\"  data-options=\" idField: 'id', treeField:'text', fitColumns: true,singleSelect: true,pagination: false,border: true,data: allDeptData,onClickRow:clickSkipDeptListRow,loadFilter: function(rows){return convert(rows);},height:460,toolbar:[{id:'btnskipSelAllDepts',text:'全选',iconCls:'icon-add',handler:selectSkipAllDepts}]\"> <thead><tr><th data-options=\"field:'text',align:'left',halign:'center'\" width=\"50\">部门</th></tr></thead></table></div>" +
        "<div style=\"float: left;width: 200px;margin-right: 5px;height: 450px;overflow:auto;\"><table class='usergrid' id=\"canselusr_" + currentInsActivityId + "\"  data-options=\" idField: 'id',rownumbers: true, fitColumns: true,singleSelect: true,pagination: false,border: true,onSelect:selectSkipOneCallUsersRow ,height:450,toolbar:[{id:'btnskipSelAllCanUsers',text:'全选',iconCls:'icon-add',handler:selSkipCanAllUsers}]\"> <thead><tr><th data-options=\"field:'chinaname',align:'center',halign:'center'\" width=\"50\">待选人员</th></tr></thead></table></div>" +
        "<div style=\"float: left;width: 200px;\"><table class='usergrid' id=\"selected_" + currentInsActivityId + "\" data-options=\" idField: 'id',rownumbers: true, fitColumns: true,singleSelect: false,pagination: false,border: true,toolbar:[{id:'btnskipDelUsers',text:'删除',iconCls:'icon-delete',handler:deleteSkipUsers}],height:460 \"> <thead><tr><th data-options=\"field:'ck',checkbox:true\"></th><th data-options=\"field:'chinaname',align:'center',halign:'center'\" width=\"50\">已选人员</th></tr></thead></table></div></div>";
    tabsHtml.append(treeHtml);

    divSkipActSelectReceiver.append(tabsHtml);
    divSkipActSelectReceiver.window({
        modal: true,
        minimizable: false,
        maximizable: false,
        closed: true,
        iconCls: 'icon-save',
        width: 700,
        height: 560
    });

    var usrTab = $("#alldeptReceiverTab");
    usrTab.find('table.depttree').treegrid();
    usrTab.find('table.usergrid').datagrid();
    usrTab.tabs();
    divSkipActSelectReceiver.window('open');
}
function closeSkipDivSelectReceiver() {
    try {
        divSkipActSelectReceiver.window('close');
    }
    catch (e) {
    }
}
function clickSkipDeptListRow(row) {
    setCanSelectUsrGridData(row.id);
}

//全选部门
function selectSkipAllDepts() {
    setCanSelectUsrGridData("");
    $("#deptlist_" + currentInsActivityId).treegrid('unselectAll');
}
function setCanSelectUsrGridData(deptid) {
    var canSelUsersGrid = $("#canselusr_" + currentInsActivityId);
    canSelUsersGrid.datagrid('loadData', getCanSelectUsers(deptid));
    canSelUsersGrid.datagrid("clearSelections").datagrid("clearChecked");
}
function getCanSelectUsers(deptid) {
    var userData = getUsersByDept(deptid).rows;
    var selectedUsersGrid = $("#selected_" + currentInsActivityId);
    var selectedUsers = selectedUsersGrid.datagrid("getData").rows;
    _.forEach(selectedUsers, function (usr) {
        userData = delUserFromCollection(userData, usr.id);
    });
    return userData;
}
function getUsersByDept(deptid) {
    var userData;
    $.ajax({
        async: false,
        url: rootPath + 'Sys_user/LoadUserByDept.do',
        data: {'deptid': deptid},
        success: function (data) {
            userData = data;
        }
    });
    return userData;
}
// 全选 待选人员 列表    即：触发列表的全选事件（点击全选的checkbox）
function selSkipCanAllUsers() {
    var canSelUsersGrid = $("#canselusr_" + currentInsActivityId);
    var allUsers = canSelUsersGrid.datagrid('getData').rows;
    if (allUsers && allUsers.length > 0) {
        var selectedUsersGrid = $("#selected_" + currentInsActivityId);
        _.forEach(allUsers, function (user) {
            selectedUsersGrid.datagrid('appendRow', {
                'id': user.id,
                'state': user.state,
                'chinaname': user.chinaname,
                'deptid': user.deptid
            });
        });
        delAllGridData(canSelUsersGrid);
    }
}
//选择一行 待选人员
function selectSkipOneCallUsersRow(index) {
    var canSelUsersGrid = $("#canselusr_" + currentInsActivityId);
    var checkedUser = canSelUsersGrid.datagrid('getSelected');
    var newUserData = [{
        'id': checkedUser.id,
        'state': checkedUser.state,
        'chinaname': checkedUser.chinaname,
        'deptid': checkedUser.deptid
    }];
    var selectedUsersGrid = $("#selected_" + currentInsActivityId);
    selectedUsersGrid.datagrid('appendRow', newUserData[0]);

    var newSelectedUser = canSelUsersGrid.datagrid("getData").rows;
    newSelectedUser = delUserFromCollection(newSelectedUser, checkedUser.id);
    if (newSelectedUser.length == 0) {
        canSelUsersGrid.datagrid('uncheckAll');
    }
    canSelUsersGrid.datagrid('loadData', newSelectedUser);
    canSelUsersGrid.datagrid('clearChecked');
}
//删除已选人员
function deleteSkipUsers() {
    var selectedUserGrid = $("#selected_" + currentInsActivityId);
    var checkedSelectedUsers = selectedUserGrid.datagrid('getChecked');
    if (checkedSelectedUsers && checkedSelectedUsers.length > 0) {
        var checkedUsers = [];
        for (var index = 0, len = checkedSelectedUsers.length; index < len; index++) {
            checkedUsers.push({deptid: checkedSelectedUsers[index].deptid});
        }

        var allSelectedUsers = selectedUserGrid.datagrid("getData");
        if (allSelectedUsers.rows.length == checkedSelectedUsers.length) {
            delAllGridData(selectedUserGrid);
        } else {
            var newSelectedUser = allSelectedUsers.rows;
            _.forEach(checkedSelectedUsers, function (user) {
                newSelectedUser = delUserFromCollection(newSelectedUser, user.id);
            });
            selectedUserGrid.datagrid('loadData', newSelectedUser);
            selectedUserGrid.datagrid('clearChecked');
        }

        loadCanSelectUserGrid(checkedUsers);
    }
}
function loadCanSelectUserGrid(checkedSelectedUsers) {
    var deptSelected = $("#deptlist_" + currentInsActivityId).treegrid('getSelected');
    if (deptSelected && deptSelected.id) {
        var flag = false;
        for (var index = 0, len = checkedSelectedUsers.length; index < len; index++) {
            if (checkedSelectedUsers[index].deptid == deptSelected.id) {
                flag = true;
                break;
            }
        }
        if (flag) {
            clickSkipDeptListRow(deptSelected);
        }
    }
}
//减签
function doSkipact() {
    GlobalTools.ajax({
        url: rootPath + "Sys_ins_activity/GetCanSkipActs.do",
        data: {insactivityid: currentInsActivityId},
        success: function (data) {
            if (data && data.length > 0) {
                showNextWorkstep(data);
            }
        }
    });
}
//执行加签
function doAddWorkFlowEvent() {
    var selectedUsersGrid = $('#selected_' + currentInsActivityId);
    var nodes = selectedUsersGrid.datagrid('getData').rows;
    var userids = '';
    for (var i = 0, nodesLen = nodes.length; i < nodesLen; i++) {
        if (userids != '') {
            userids += ',';
        }
        userids += nodes[i].id;
    }
    if (userids.length == 0) {
        GlobalTools.tip("未选择接手人");
        return;
    }

    $.messager.confirm('确认提示', '确定执行加签操作?', function (r) {
        if (r) {
            $.ajax({
                async: false,
                url: rootPath + "Sys_ins_activity/DoAddtoInsActs.do",
                data: {insactivityid: currentInsActivityId, userids: userids},
                success: function () {
                    divSkipActSelectReceiver.window('close');
                    $("a[constname='save']").remove();
                    refreshWorkFlowListPage();
                }
            });
        }
    });
}
//加签产生的步骤 完成
function addtoinsactdone() {
    doWorkFlowSave(); //保存表单
    GlobalTools.ajax({
        url: rootPath + "Sys_ins_activity/DoneInsActByAddto.do",
        data: {insactivityid: currentInsActivityId},
        success: function (data) {
            $("a[constname='save']").remove();
            $("a[constname='addtoinsactdone']").remove();
            setAllControlsDisable();
            refreshWorkFlowListPage();
        }
    });
}