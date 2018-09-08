var fieldList, //字段列表
    canEditFieldList, //可编辑的字段集合
    requiredFieldList, //必填字段集合
    timeOut,//延时计时器
    currentRecordId = Request("recordid"), //当前表单记录主键
    currentSummaryRecordId = Request("summaryrecordid"), //当前表单对应的父表记录的id（用于文书的可能）
    tailorFormType = Request("tailorformtype"), //表单类型 在添加非主表单时有用
    parentRecordId = Request("temprecordid"),
    parentTableName =  Request("temptablename");

/*$(function () {
 getFormData(); //获取表单数据
 getCanEditFieldList(); //获取可编辑的控件
 setControlStatus(); //设置只读控件和可编辑控件样式
 checkMainFormDataHandler = checkFormDataIsExist; //设置子表校验父表函数处理程序
 timeOut = setTimeout(setControlValue, 500); //控件赋值
 });*/
function getMyFormData() {
    GlobalTools.ajax({
        async: true,
        url: rootPath + 'WorkFlowFormCommon/LoadFormByTablenamePkvalue.do',
        data: { "tablename":"notice","recordid":currentRecordId }, //id 具体表的记录id
        loading: '正在加载表单数据中...',
        success: function (data) {
//            fieldList=data.formdata;
//            canEditFieldList = data.caneditcols;
//            requiredFieldList = data.requiredcols;
//            setValueStatus();
//            setInputFull();
            // setControlValue();
            //setControlStatus();
        }
    });
}
function getWfFormData() {
    GlobalTools.ajax({
        async: true,
        url: rootPath + 'WorkFlowFormCommon/LoadFormData.do',
        data: { recordid: currentRecordId, tailorformid: $("#tailorformid").val(), insactivityid: currentInsActivityId, constname: currentWorkFlowConstName,insprocessid:currentInsProcessId }, //id 具体表的记录id
        loading: '正在加载表单数据中...',
        success: function (data) {
            fieldList=data.formdata;
            canEditFieldList = data.caneditcols;
            requiredFieldList = data.requiredcols;
            setValueStatus();
            setInputFull();
            // setControlValue();
            //setControlStatus();
        }
    });
}
window.onload = function(){
    loadMind();
    getWfFormData();
    try{
        initAttachList();
    }catch(e){

    }
    //getFormData(); //获取表单数据
    //getCanEditFieldList(); //获取可编辑的控件
    checkMainFormDataHandler = checkFormDataIsExist; //设置子表校验父表函数处理程序
//    timeOut = setTimeout(setControlValue, 500); //控件赋值
    //setControlValue();
}
//让input框看上去像填满td的样子;.canEdit-style是设置了可编辑的控件的默认背景色样式
function setInputFull(){
    $("input,span").css({"border":"0"});
    $.each($("td:has(input)"),function(index,item){
        $(item).css("background-color",$($(item).find(".canEdit-style")[0]).getBackgroundColor());
    });
    $.each($("td:has(span)"),function(index,item){
        $(item).css("background-color",$($(item).find(".canEdit-style")[0]).getBackgroundColor());
    });
}
//让意见框看上去像填满td的样子
function setMindFull(){
    $.each($("td:has(div)"),function(index,item){
        $(item).css("background-color",$($($($(item).children()[0]).children()[0]).children()[0]).getBackgroundColor());
    });
}

$(function () {
    //初始化人员选择对话框
    OrganizationTools.user_Init({ id: "tailorFormUser", rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectUserOK });
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ id: "tailorFormDept", rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK });
});

//表单验证是否通过
function isValidate(){
    return $("#TailorForm").form("validate");
}

//判断流程图实例是否挂起
function isSuspend(){
    var flag = false;
    GlobalTools.ajax({
        async: false,
        url: rootPath + 'Sys_ins_process/IsInsProcessSuspend.do',
        data: { insprocessid: currentInsProcessId },
        success: function (data) {
            if (data=="true" || data==true) {//true表示挂起
                flag = true;
            }
        }
    });
    return flag;
}

//保存表单
function doWorkFlowSave() {
    //判断是否允许保存表单
    if(!isValidate()){
        GlobalTools.tip("表单验证未通过，不能保存！");
        return;
    }
    if(isSuspend()){
        GlobalTools.tip("主流程实例被挂起，不能保存！");
        return;
    }
    //先保存表单，表单保存成功之后再启动流程
    GlobalTools.submitForm($("#TailorForm"), { async:true,
        submiturl: rootPath + 'Form/SaveForm.do?summaryrecordid=' + currentSummaryRecordId, success: saveFormSuccess });
}
/*function saveParentAttach(formData){
 var childRecordId =formData.recordid;
 GlobalTools.ajax({
 url: rootPath + "Sys_attachfile/SaveParentAttach.do",
 data: { recordid:childRecordId,tailorformid: $("#tailorformid").val(),parentTableName:parentTableName,parentRecordId:parentRecordId }
 });
 }*/
function saveFormSuccess(formData) {
    /*if(parentTableName!=undefined&&parentTableName!=null&&parentTableName!=""){
     saveParentAttach(formData);
     }*/
    currentTaskTitle = formData.tasktitle;
    if (!currentRecordId) {
        currentRecordId = formData.recordid;
    }
    //判断流程是否已经启动，未启动则启动流程
    if (!currentInsActivityId) {
        if (currentWorkFlowConstName) {
            $("input[fieldtype='maintablekey']").val(formData.recordid);
            if(isTrigger=="yes"){//触发新流程标志
                triggerAnotherProcess(formData);
            }else{
                startNewProcess(formData);
            }
        }
    } else{
        if (formData.isnewdata) {
            $("input[fieldtype='maintablekey']").val(formData.recordid);
            if (!(tailorFormType && tailorFormType == "nomain")) {
                saveProcessForm(formData); //如果是新绑的主表单,记录该主表和当前流程的关系
            }
        }
        if (!(tailorFormType && tailorFormType == "nomain")) {
            updateTaskTitle(currentInsActivityId, currentTaskTitle);//  主表单时更新当前步骤的待办标题，工作表单不更新
        }
    }
    saveProcessTailorform(formData);
    saveMind();
    saveInsActProxyInfo();
    GlobalTools.buildForm($("#TailorForm"), formData, true);

    relationShipRecord = $("input[fieldtype='maintablekey']").val();
    /* try {
     formatSubTailorForm(); //初始化表单子表控件
     }
     catch (e)
     { }*/
    try {
        // formatAttachFile(true); //格式化附件控件
        if (currentRecordId) {
            $("table[type='AttachFileList']").each(function (index, item) {
                if (!isExsit(canEditFieldList, this.name)) {
                    drawAttachGrid($(this), true);
                }
            });
        }
    }
    catch (e)
    { }
}

//更新当前步骤的待办标题
function updateTaskTitle(currentInsActivityId,currentTaskTitle){
    GlobalTools.ajax({
        url: rootPath + "Sys_ins_activity/UpdateTaskTitle.do",
        data: { insActivityId:currentInsActivityId,taskTitle:currentTaskTitle },
        success:function(data){

        }
    });
}

//保存活动实例代理信息
function saveInsActProxyInfo() {
    /*GlobalTools.ajax({
     url: rootPath + 'Sys_ins_activity/ChangeProxyActivityRecord.do',
     data: { insactivityid: currentInsActivityId },
     success: function (data) {
     }
     });*/
}

//绑定流程表单关系
function saveProcessForm(formData) {
    GlobalTools.ajax({
        url: rootPath + 'Sys_ins_processform/SaveProcessForm.do',
        data: { tablename: formData.tablename, recordid: formData.recordid, insactivityid: currentInsActivityId },
        success: function (data) {
            loadProcessButtons();
            loadMind();
            refreshWorkFlowListPage();
        }
    });
}
//保存流程表单记录
function saveProcessTailorform(formData) {
    GlobalTools.ajax({
        url: rootPath + 'Sys_ins_processtailorform/SaveProcessTailorForm.do',
        data: { tablename: formData.tablename, recordid: formData.recordid, insactivityid: currentInsActivityId, tailorformid: $("#tailorformid").val() },
        success: function (data) {
        }
    });
}

//保存意见
function saveMind() {
    var mindArr = new Array();
    $("#TailorForm").find("textarea[name^='virtualmindtable']").each(function () {
        //zjb20160826
        var isallow = "false";
        var isallowRadios = $("input[name^="+$(this).attr('name')+'_isallow'+"]");//找出同意不同意的radio
        var len = isallowRadios.length;
        for(var i=0;i<len;i++){
            if(($(isallowRadios[i]).attr('checked') && $(isallowRadios[i]).attr('id').indexOf('yes')!=-1)
                || (!$(isallowRadios[i]).attr('checked') && $(isallowRadios[i]).attr('id').indexOf('no')!=-1)){
                isallow="true";
            }
        }
        mindArr.push({
            isallow:isallow,//zjb20160826
            mindname: $(this).attr('name').replace('_', '.'),
            mindvalue: $(this).val() == '' ? '已阅' : $(this).val() });
    });

    if (mindArr.length > 0) {
        GlobalTools.ajax({
            url: rootPath + 'Sys_ins_activitymind/SaveMind.do',
            data: { tailorformid: $("#tailorformid").val(), insactivityid: currentInsActivityId, mindinfo: JSON2.stringify(mindArr) }, //currentInsActivityId在tailorformbuttons.js中定义
            loading: '正在保存意见信息...',
            success: function (data) {

            }
        });
    }
}

//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ id: "tailorFormDept", sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple, onOKClick: selectDeptOK });
}
//选择组织机构后回调函数
function selectDeptOK(treeNodes, sourceElement) {
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
    $("[name='" + $(sourceElement).attr("comboname") + "']").val(text);
    $("[name='" + $(sourceElement).attr("valuefieldname") + "']").val(ids);
}

//点击  选择人员 可展开的节点，加载子节点
function showUserTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ id: "tailorFormUser", sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple, onOKClick: selectUserOK });
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
    $(sourceElement).combobox("setText", text);
    $("[name='" + $(sourceElement).attr("comboname") + "']").val(text);
    $("[name='" + $(sourceElement).attr("valuefieldname") + "']").val(ids);
}

//获取表单控件信息
function getFormData() {
    GlobalTools.ajax({
        async: false,
        url: rootPath + 'Form/LoadForm.do',
        data: { recordid: currentRecordId, summaryrecordid: currentSummaryRecordId, tailorformid: $("#tailorformid").val() }, //id 具体表的记录id
        loading: '正在加载表单数据中...',
        success: function (data) {
            fieldList = data;
            if (typeof (fieldList) == "string") {
                fieldList = eval("(" + fieldList + ")");
            }
        }
    });
}

//获取可编辑的控件
function getCanEditFieldList() {
    loadIsOriginal();
    GlobalTools.ajax({
        async: false,
        url: rootPath + 'Sys_def_activityform/LoadControlsStatus.do',
        //url: rootPath + 'Sys_def_activityform/LoadIsOriginal.do',
        data: { tailorformid: $("#tailorformid").val(), insactivityid: currentInsActivityId, constname: currentWorkFlowConstName, runinsactivityid: runInsActivityId }, //currentWorkFlowConstName.js中定义
        success: function (data,message) {
            if (data) {
                if (typeof (data) == "string") {
                    data = eval("(" + data + ")");
                }
                canEditFieldList = data.caneditcols;
                requiredFieldList = data.requiredcols;
                if(isSuspend()){//挂起后所有字段不可编辑
                    canEditFieldList=null;
                }
            }
        }
    });
}

//获取是否正本
function loadIsOriginal() {

    GlobalTools.ajax({
        async: false,
        // url: rootPath + 'Sys_def_activityform/LoadControlsStatus.do',
        url: rootPath + 'Sys_def_activityform/LoadIsOriginal.do',
        data: { tailorformid: $("#tailorformid").val(), insactivityid: currentInsActivityId, constname: currentWorkFlowConstName, runinsactivityid: runInsActivityId }, //currentWorkFlowConstName.js中定义
        success: function (data,message) {

            if (data) {
                GlobalTools.tip(message);
            }
        }
    });
}

//找到相应name的表单元素，并赋值；加载意见
function setControlValue() {
    var mainform = $("#TailorForm");
    for (var index in fieldList) {
        if (fieldList[index].fieldvalue == null && fieldList[index].fieldtype != "singleselectinput" && fieldList[index].fieldtype != "multiselectinput" && fieldList[index].fieldtype != "filelistcontrol" && fieldList[index].fieldtype != "importdocument") {
            continue;
        }

        switch (fieldList[index].fieldtype) {
            case "textinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                        if (this.type == "checkbox" || this.type == "radio") {
                            if ((',' + fieldList[index].fieldvalue + ',').indexOf(',' + this.value + ',') >= 0) {
                                $(this).attr("checked", 'checked');
                            }
                        }
                        else {
                            $(this).val(fieldList[index].fieldvalue);
                        }
                    });
                }
                break;
            case "hiddeninput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[name="' + fieldList[index].fieldname + '"]').val(fieldList[index].fieldvalue);
                }
                break;
            case "multitextinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[name="' + fieldList[index].fieldname + '"]').val(fieldList[index].fieldvalue).removeClass("validatebox-invalid");
                }
                break;
            case "intnumberinput":
            case "floatnumberinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    var tempJqueryObj = mainform.find("[numberboxname='" + fieldList[index].fieldname + "']");
                    try {
                        if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                            tempJqueryObj.numberspinner('setValue', fieldList[index].fieldvalue);
                        }
                        else {
                            tempJqueryObj.numberbox('setValue', fieldList[index].fieldvalue);
                        }
                    }
                    catch (e) { }
                    //  $('input[numberboxname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                }
                break;
            case "dateinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datebox('setValue', fieldList[index].fieldvalue);
                    //  $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                }
                break;
            case "datetimeinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datetimebox('setValue', fieldList[index].fieldvalue);
                    //                        $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                }
                break;
            case "singleselectinput":
                if (fieldList[index].datasource && fieldList[index].datasource.length > 0) {
                    setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                    if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setValue', fieldList[index].fieldvalue);
                    }
                }
                else {
                    if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setText', fieldList[index].fieldvalue);
                    }
                }
                //                        $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            case "multiselectinput":
                if (fieldList[index].datasource && fieldList[index].datasource.length > 0) {
                    setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                    mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setValues', (fieldList[index].fieldvalue ? fieldList[index].fieldvalue.split(',') : []));
                }
                else {
                    if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setText', fieldList[index].fieldvalue);
                    }
                }
                //  $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            //            case "filelistcontrol":
            //                break;
            //            case "importdocument":
            //                break;

        }
    }
    if (currentSummaryRecordId) {//外键赋值
        mainform.find("input[fieldtype='foreigntablekey']").val(currentSummaryRecordId);
    }
    relationShipRecord = $("input[fieldtype='maintablekey']").val();

    try {
        formatSubTailorForm(); //初始化表单子表控件(引用VirtualSubTable.js)
    }
    catch (e)
    { }

    clearTimeout(timeOut);
    //fieldList = null;
    //canEditFieldList = null;
//    timeOut = setTimeout(loadMind, 500);
    //loadMind();
}
//加载意见
function loadMind() {
    if (currentInsActivityId) {
        var mainform = $("#TailorForm");
        GlobalTools.ajax({
            url: rootPath + 'Sys_ins_activitymind/LoadMind.do',
            data: { tailorformid: $("#tailorformid").val(), insactivityid: currentInsActivityId, insprocessid: currentInsProcessId, runinsactivityid: runInsActivityId }, //currentInsActivityId,currentInsProcessId在tailorformbuttons.js中定义  publishtimedesc 用于指定意见按publishtime的倒序或正序排列
            loading: '正在加载意见信息...',
            success: function (data) {
                if (typeof (data) == "string") {
                    data = eval("(" + data + ")");
                }
                var element, fieldName;
                for (var index in data) {
                    var oldfieldName = data[index].fieldname;//zjb20160826
                    element = mainform.find("[id='Mind_" + oldfieldName + "']");//zjb20160826
                    fieldName = data[index].fieldname.replace('.', '_');
                    element.html(""); //清除意见 重新加载
                    if (data[index].enable)//意见可编辑，当前操作人允许编辑的意见字段
                    {
                        //还需判断可编辑的意见字段的历史记录（非当前操作人填写的）
                        var divPanl = $("<DIV id='Div_" + fieldName + "' targetObj='" + fieldName + "' class='l-form-mind' style='width:100%; height:100%;cursor:pointer;' ></DIV>");
                        /*zjb20160826divPanl.unbind().bind("click", function () {
                            $(this).hide();
                            $("[id='" + $(this).attr("targetObj") + "']").show();
                            var height = '120px';
                            if ($(this).parents('td').css('height')) {
                                height = $(this).parents('td').css('height')
                            }
                            $("[id='" + $(this).attr("targetObj") + "']").css('height', height).focus();
                        });*/
                        element.append(divPanl);

                        var editArea = $("<TEXTAREA id='" + fieldName + "' name='" + fieldName + "' targetObj='Div_" + fieldName + "' class='l-textarea' style='display:none;overflow:auto;' maxlength='100' title='意见最多填写100字符'></TEXTAREA>");
                        editArea.unbind().bind("focus", function () {
                            $(this).val($(this).val().ReplaceAll('<BR>', '\\n'));
                        }).bind("blur", function () {
                            $(this).hide();
                            $("[id='" + $(this).attr("targetObj") + "']").show();
                            $('#Fnt_' + fieldName.ReplaceAll(/\./g, '_')).html(($(this).val() != '' ? $(this).val().ReplaceAll('\\n', '<BR>') : ($(this).hasClass("easyui-validatebox") ? '<p style="color: Red;">请录入意见</p>' : '请录入意见')));
                        }).bind("contextmenu", function (e) {
                            e.preventDefault();
                            OpenOfficediction(this);
                        });
                        element.append(editArea);
                        var mindRequerid = false;
                        if (isExsit(requiredFieldList, oldfieldName)) {//意见必填//zjb20160826
                            mindRequerid = true;
                            editArea.addClass("easyui-validatebox").validatebox({ 'required': true });
                        }

                        for (var indexmind in data[index].fieldvalue) {
                            if (indexmind > 0) {
                                divPanl.append("<br>");
                            }
                            if (data[index].fieldvalue[indexmind].enable)//当前人可操作的意见
                            {
                                editArea.text(data[index].fieldvalue[indexmind].mind);
                                //var mindModle = "<div class='canEdit-style'><opmind><br>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<opusrid>&nbsp; &nbsp;<finishtime><div>";
                                //加入同意还是不同意的radio,并重新排版 zjb20160826
                                var mindModle = "" +
                                 "<table width='100%' cellpadding='0' cellspacing='0'>" +
                                 "<tr width='100%'><td width='40%'>" +
                                 "<span><input onclick='setIsallowVal(this,"+fieldName+")' type='radio' flag='yes' id='yes"+fieldName+indexmind+"' name='"+fieldName+"_isallow"+indexmind+"'/>同意</span>" +
                                 "<span><input onclick='setIsallowVal(this,"+fieldName+")' type='radio' flag='no' id='no"+fieldName+indexmind+"'  name='"+fieldName+"_isallow"+indexmind+"'/>不同意</span>" +
                                 "</td>" +
                                 "<td><opusrid>&nbsp; &nbsp;<finishtime></td></tr>" +
                                 "<tr>" +
                                 "<td colspan='2'>" +
                                 "<div class='canEdit-style' onclick='editMind("+fieldName+")'>" +
                                 "<opmind>" +
                                 "</div>" +
                                 "</td></tr>" +
                                 "</tabel>";
                                mindModle = mindModle.ReplaceAll("<opmind>", "<font id='Fnt_" + fieldName.ReplaceAll(/\./g, '_') + "'>" + (data[index].fieldvalue[indexmind].mind ? data[index].fieldvalue[indexmind].mind.ReplaceAll('\\n', '<BR>') : (mindRequerid ? "<p style='color: Red;'>请录入意见</p>" : "可录入意见")) + "</font>");
                                if (data[index].fieldvalue[indexmind].proxyername) {
                                    mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username + "(" + data[index].fieldvalue[indexmind].proxyername + " 代)");
                                }
                                else {
                                    mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username);
                                }
                                if (data[index].fieldvalue[indexmind].mindtime) {
                                    mindModle = mindModle.ReplaceAll("<finishtime>", data[index].fieldvalue[indexmind].mindtime);
                                }
                                else {
                                    mindModle = mindModle.ReplaceAll("<finishtime>", "正在阅处");
                                }
                                divPanl.append(mindModle);
                                //选中同意还是不同意 zjb20160826
                                if(data[index].fieldvalue[indexmind].isallow==null || data[index].fieldvalue[indexmind].isallow=='true'){
                                    $("#yes"+fieldName+indexmind).attr("checked","checked");
                                }else{
                                    $("#no"+fieldName+indexmind).attr("checked","checked");
                                }
                            }
                            else//历史意见
                            {
                                //var mindModle = "<opmind><br>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<opusrid>&nbsp; &nbsp;<finishtime><br>";
                                //加入同意还是不同意的radio,并重新排版 zjb20160826
                                var mindModle = "" +
                                    "<table width='100%' cellpadding='0' cellspacing='0'>" +
                                    "<tr width='100%'><td width='40%'>" +
                                    "<span><input disabled type='radio' id='yes"+fieldName+indexmind+"' name='"+fieldName+"_isallow"+indexmind+"'/>同意</span>" +
                                    "<span><input disabled type='radio' id='no"+fieldName+indexmind+"'  name='"+fieldName+"_isallow"+indexmind+"'/>不同意</span>" +
                                    "</td><td><opusrid>&nbsp; &nbsp;<finishtime></td></tr>" +
                                    "<tr>" +
                                    "<td colspan='2' style='padding-top: 5px;padding-left:3px'>" +
                                    "<opmind><hr style='border:1px dashed gray' width='98%'>" +
                                    "</td></tr>" +
                                    "</table>";
                                mindModle = mindModle.ReplaceAll("<opmind>", data[index].fieldvalue[indexmind].mind.ReplaceAll('\\n', '<BR>'));
                                //文本签名使用
                                if (data[index].fieldvalue[indexmind].proxyername) {
                                    mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username + "(" + data[index].fieldvalue[indexmind].proxyername + " 代)");
                                }
                                else {
                                    mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username);
                                }
                                //图片签名使用mindModle = mindModle.ReplaceAll("<opusrid>", "<img src='" + rootPath + data[index].fieldvalue[indexmind].signimagepath + "' width='60' height='30'>");
                                mindModle = mindModle.ReplaceAll("<finishtime>", data[index].fieldvalue[indexmind].mindtime);
                                divPanl.append(mindModle);
                                //选中同意还是不同意 zjb20160826
                                if(data[index].fieldvalue[indexmind].isallow=='true'){
                                    $("#yes"+fieldName+indexmind).attr("checked","checked");
                                }else{
                                    $("#no"+fieldName+indexmind).attr("checked","checked");
                                }
                            }
                        }
                    }
                    else//有记录，但不可编辑的意见字段
                    {
                        for (var indexmind in data[index].fieldvalue) {
                            //var mindModle = "<opmind><br>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<opusrid>&nbsp; &nbsp;<finishtime><br>";
                            //加入同意还是不同意的radio,并重新排版 zjb20160826
                            var mindModle = "" +
                                "<table width='100%' cellpadding='0' cellspacing='0'>" +
                                "<tr width='100%'><td width='40%'>" +
                                "<span><input disabled type='radio' id='yes"+fieldName+indexmind+"' name='"+fieldName+"_isallow"+indexmind+"'/>同意</span>" +
                                "<span><input disabled type='radio' id='no"+fieldName+indexmind+"'  name='"+fieldName+"_isallow"+indexmind+"'/>不同意</span>" +
                                "</td>" +
                                "<td align='right'><opusrid>&nbsp; &nbsp;<finishtime></td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td colspan='2' style='padding-top: 5px;padding-left:3px'>" +
                                "<opmind><hr style='border:1px dashed gray' width='98%'>" +
                                "</td></tr>" +
                                "</table>";
                            mindModle = mindModle.ReplaceAll("<opmind>", data[index].fieldvalue[indexmind].mind);
                            //文本签名使用
                            if (data[index].fieldvalue[indexmind].proxyername) {
                                mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username + "(" + data[index].fieldvalue[indexmind].proxyername + " 代)");
                            }
                            else {
                                mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username);
                            }
                            /*图片签名使用
                             if (data[index].fieldvalue[indexmind].enable) {
                             mindModle = mindModle.ReplaceAll("<opusrid>", data[index].fieldvalue[indexmind].username);
                             }
                             else {
                             mindModle = mindModle.ReplaceAll("<opusrid>", "<img src='" + rootPath + data[index].fieldvalue[indexmind].signimagepath + "' width='60' height='30'>");
                             }*/
                            mindModle = mindModle.ReplaceAll("<finishtime>", data[index].fieldvalue[indexmind].mindtime);
                            element.html(element.html()+mindModle);
                            //选中同意还是不同意 zjb20160826
                            if(data[index].fieldvalue[indexmind].isallow=='true'){
                                $("#yes"+fieldName+indexmind).attr("checked","checked");
                            }else{
                                $("#no"+fieldName+indexmind).attr("checked","checked");
                            }
                        }
                    }
                }
                setMindFull();
                //clearTimeout(timeOut);
            }
        });
    }
    //setControlStatus(); //设置只读控件和可编辑控件样式
}

//zjb20160826
function editMind(fieldName){
    var name = $(fieldName).attr("name");
    $("#Div_"+name).hide();
    $("[id='" + name + "']").show();
    /*var height = '120px';
    if ($(obj).parents('td').css('height')) {
        height = $(obj).parents('td').css('height')
    }
    $("[id='" + fieldName + "']").css('height', height).focus();*/
}

//zjb20160826
function setIsallowVal(isallowRadio,textarea){
    if($(isallowRadio).attr("flag") == 'yes'){
        textarea.value = '拟同意，呈请领导审批。';
    }else{
        textarea.value = '不同意，退回修改。';
    }
    $('#Fnt_' + textarea.id.ReplaceAll(/\./g, '_')).html(textarea.value.ReplaceAll('\\n', '<BR>'));
}

//设置下拉框的选项集合
function setDatatoCombobox(mainform, comboname, datas) {
    if (datas) {
        var dataSource = datas;
        if (typeof (dataSource) == "string") {
            eval("(" + dataSource + ")");
        }
        // mainform.find('[name="' + comboname + '"]').combobox({data:dataSource});
        mainform.find('[comboname="' + comboname + '"]').combobox('loadData', dataSource);
    }
}

//设置控件只读和可编辑样式
function setControlStatus() {
    var mainform = $("#TailorForm");
    var tempJqueryObj;
    try {
        for (var index in fieldList) {
            //设置只读
            if (!isExsit(canEditFieldList, fieldList[index].fieldname)) {
                try {
                    switch (fieldList[index].fieldtype) {
                        case "textinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                                if (this.type == "checkbox" || this.type == "radio") {
                                    $(this).attr("disabled", "disabled");
                                }
                                else {
                                    $(this).validatebox({ 'required': false });
//                                    $(this).attr("disabled",true);

                                    $(this).replaceWith("<td>"+$(this).val()+"</td>");
                                }
                            });
                            break;
                        case "multitextinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').attr("readonly", "readonly");
                            break;
                        case "intnumberinput":
                        case "floatnumberinput":
                            tempJqueryObj = mainform.find("[numberboxname='" + fieldList[index].fieldname + "']");
                            try {
                                if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                                    tempJqueryObj.numberspinner({ 'required': false });
                                    tempJqueryObj.numberspinner("disable");
                                }
                                else {
                                    tempJqueryObj.numberbox({ 'required': false });
                                    tempJqueryObj.numberbox("disable");
                                    tempJqueryObj.replaceWith("<td>"+tempJqueryObj.numberbox('getValue')+"</td>");
                                }
                            }
                            catch (e) { }
                            break;
                        case "dateinput":
                            tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                            tempJqueryObj.datebox({ 'required': false });
                            tempJqueryObj.datebox('disable');
                            tempJqueryObj.parent().html("<td>"+tempJqueryObj.datebox('getText')+"</td>");
                            break;
                        case "datetimeinput":
                            tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                            var temp_value = tempJqueryObj.datetimebox("getValue");
                            tempJqueryObj.datetimebox({ 'required': false }).datetimebox("disable");
                            tempJqueryObj.parent().html("<td>"+temp_value+"</td>");
                            break;
                        case "singleselectinput":
                        case "multiselectinput":
                            tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                            tempJqueryObj.combobox({ 'required': false });
                            tempJqueryObj.combobox('disable');
                            tempJqueryObj.parent().html("<td>"+tempJqueryObj.combobox('getText')+"</td>");
                            break;
                        case "filelistcontrol":
                            try {
                                mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false });
                                formatAttachFile(false); //初始化附件列表控件
                            }
                            catch (e) { }
                            break;
                        case "importdocument":
                            break;
                        case "virtualsubtable":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').attr("showToolBar", "false");
                            break;
                    }
                }
                catch (e) { }
            }
            else {//可编辑控件样式
                try {
                    var required = false;
                    if (isExsit(requiredFieldList, fieldList[index].fieldname)) {
                        required = true;
                    }

                    switch (fieldList[index].fieldtype) {//canEdit-style  可编辑控件底色
                        case "textinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                                if (this.type != "checkbox" && this.type != "radio") {
                                    //$(this).addClass("canEdit-style").validatebox({ 'required': required });
                                    var obj = $(this);
                                    var temp_val = obj.val();
                                    obj.addClass("canEdit-style").validatebox({ 'required': required });
                                }
                            });

                            // mainform.find('[name="' + fieldList[index].fieldname + '"]').addClass("canEdit-style").validatebox({ 'required': required });


                            break;
                        case "multitextinput":
                            //mainform.find('[name="' + fieldList[index].fieldname + '"]').addClass("easyui-validatebox").addClass("canEdit-style").validatebox({ 'required': required });
                            var obj = mainform.find('[name="' + fieldList[index].fieldname + '"]');

                            obj.addClass("easyui-validatebox").addClass("canEdit-style").validatebox({ 'required': required });

                            break;
                        case "intnumberinput":
                        case "floatnumberinput":
                            tempJqueryObj = mainform.find("[numberboxname='" + fieldList[index].fieldname + "']");
                            tempJqueryObj.addClass("canEdit-style");
                            try {
                                if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                                    //tempJqueryObj.numberspinner({ 'required': required });
                                    var obj = tempJqueryObj;
                                    var temp_val = obj.numberspinner("getValue");
                                    obj.numberspinner({ 'required': required });
                                    tempJqueryObj = obj.numberspinner("setValue",temp_val);
                                }
                                else {
                                    //tempJqueryObj.numberbox({ 'required': required });
                                    var obj = tempJqueryObj;
                                    var temp_val = obj.numberbox("getValue");
                                    obj.numberbox({ 'required': required });
                                    tempJqueryObj = obj.numberbox("setValue",temp_val);
                                }
                            }
                            catch (e) { }

                            break;
                        case "dateinput":
                            mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");
                            var obj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                            var temp_val = obj.datebox("getValue");
                            obj.datebox({ 'required': required });
                            tempJqueryObj = obj.datebox("setValue",temp_val);
                            break;
                        case "datetimeinput":
                            mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");
                            var obj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                            var temp_val = obj.datetimebox("getValue");
                            obj.datetimebox({ 'required': required });
                            tempJqueryObj = obj.datetimebox("setValue",temp_val);
                            break;
                        case "singleselectinput":
                        case "multiselectinput":
                            mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");
//                            tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox({ 'required': required });
                            var obj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                            var temp_val = obj.combobox("getValue");
                            if(!temp_val){
                                temp_val = obj.combobox("getText");//针对选择人员对话框的场景
                            }
                            obj.combobox({ 'required': required });
                            tempJqueryObj = obj.combobox("setValue",temp_val);
                            break;

                        case "filelistcontrol":
                            try {
                                mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: true });
                                formatAttachFile(true); //附件列表控件展示
                            }
                            catch (e) { }
                            break;
                        case "importdocument":
                        case "virtualsubtable":
                            break;
                    }
                }
                catch (e) { }
            }
        }
    }
    catch (e) { }
    setInputFull();
}
//设置所有的控件不可编辑 一般在送下一步之后
function setAllControlsDisable() {
    var mainform = $("#TailorForm");
    if (fieldList != null) {
        GlobalTools.ajax({
            async: false,
            url: rootPath + 'Sys_ins_activity/GetInsActivityStatus.do',
            data: { insactivityid: currentInsActivityId }, //currentInsActivityId在tailorformbuttons.js中定义
            success: function (data) {
                if (data.status == "complete" || data.status == "waitcountersign" || data.status == "waitsubprocess" || data.status == "pause" || data.status == "stop" || isSuspend()) {
                    try {
                        for (var index in fieldList) {
                            try {
                                switch (fieldList[index].fieldtype) {
                                    case "textinput":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                                            if (this.type!=undefined && (this.type == "checkbox" || this.type == "radio")) {
                                                $(this).attr("disabled", "disabled");
                                            }
                                            else {
                                                $(this).validatebox({ 'required': false });
                                                // $(this).validatebox("disable");
                                                $(this).attr("disabled",true);
                                            }
                                        });

                                        //mainform.find('[name="' + fieldList[index].fieldname + '"]').attr("readonly", "readonly");
                                        //mainform.find('[name="' + fieldList[index].fieldname + '"]').validatebox("disable");
                                        break;
                                    case "multitextinput":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').attr("readonly", "readonly");
                                        break;
                                    case "intnumberinput":
                                    case "floatnumberinput":
                                        var tempJqueryObj = mainform.find("[numberboxname='" + fieldList[index].fieldname + "']");
                                        if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                                            tempJqueryObj.numberspinner("disable");
                                        }
                                        else {
                                            tempJqueryObj.numberbox("disable");
                                        }
                                        break;
                                    case "dateinput":
                                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datebox('disable');
                                        break;
                                    case "datetimeinput":
                                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datetimebox("disable");
                                        break;
                                    case "singleselectinput":
                                    case "multiselectinput":
                                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('disable');
                                        break;
                                    case "filelistcontrol":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false }).datagrid({ toolbar: [] });
                                        //                                        var objGrid = $("table[type='AttachFileList'][constname='" + constname + "']");
                                        //                                        objGrid.datagrid({ toolbar: [] });
                                        break;
                                    case "importdocument":
                                        break;
                                    case "virtualsubtable":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false });
                                        var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
                                        objGrid.datagrid({ toolbar: [] });
                                        break;
                                }
                            }
                            catch (e) { }
                        }
                    }
                    catch (e) { }
                }
            }
        });
    }
    mainform.find("DIV[id^='Div_virtualmindtable.']").each(function () {
        $(this).unbind();
    });
}

//判断ctrlName是否在canEditList中
function isExsit(canEditList, ctrlName) {
    var result = false;
    if (canEditList != null) {
        for (var index in canEditList) {
            if (canEditList[index].toLowerCase() == ctrlName.toLowerCase() || (canEditList[index].toLowerCase() + "_text") == ctrlName.toLowerCase()) {
                result = true;
                break;
            }
        }
    }
    return result;
}

//用值替换所有控件 一般在送下一步之后
function setAllControlsWithValue() {
    var mainform = $("#TailorForm");
    if (fieldList != null) {
        GlobalTools.ajax({
            async: false,
            url: rootPath + 'Sys_ins_activity/GetInsActivityStatus.do',
            data: { insactivityid: currentInsActivityId }, //currentInsActivityId在tailorformbuttons.js中定义
            success: function (data) {
                if (data.status == "complete" || data.status == "waitcountersign" || data.status == "waitsubprocess" || data.status == "pause" || data.status == "stop") {
                    try {
                        var mainform = $("#TailorForm");
                        var formatCellStr = "&nbsp;FieldValue";
                        var elementField;
                        for (var index in fieldList) {
                            try {
                                elementField = mainform.find('[name="' + fieldList[index].fieldname + '"]');
                                switch (fieldList[index].fieldtype) {
                                    case "textinput":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                                            if (this.type == "checkbox" || this.type == "radio") {
                                                $(this).attr("disabled", "disabled");
                                            }
                                            else {
                                                elementField.replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.val()));
                                            }
                                        });
                                        break;
                                    case "multitextinput":
                                        elementField.replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.val()));
                                        break;
                                    case "intnumberinput":
                                    case "floatnumberinput":
                                        elementField.replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.numberbox('getText')));
                                        mainform.find('[numberboxname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                                        break;
                                    case "dateinput":
                                        elementField.parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.datebox('getText')));
                                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                                        break;
                                    case "datetimeinput":
                                        elementField.parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.datetimebox('getText')));
                                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                                        break;
                                    case "singleselectinput":
                                    case "multiselectinput":
                                        elementField.parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('getText')));
                                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                                        break;
                                    case "filelistcontrol":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false }).datagrid({ toolbar: [] });
                                        //                                        var objGrid = $("table[type='AttachFileList'][constname='" + constname + "']");
                                        //                                        objGrid.datagrid({ toolbar: [] });
                                        break;
                                    case "importdocument":
                                        break;
                                    case "virtualsubtable":
                                        mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false });
                                        var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
                                        objGrid.datagrid({ toolbar: [] });
                                        break;
                                }
                            }
                            catch (e) { }
                        }
                    }
                    catch (e) { }
                }
            }
        });
    }
    mainform.find("DIV[id^='Div_virtualmindtable.']").each(function () {
        $(this).unbind();
    });
}
//用值替换只读控件
function replaceReadOnlyControlWithValue() {
    var mainform = $("#TailorForm");
    var formatCellStr = "&nbsp;FieldValue"; //"<div style='border:1px solid #99bbe8;width:98%;height:100%;vertical-align:middle'>&nbsp;FieldValue</div>";
    try {
        var elementField;
        for (var index in fieldList) {
            if (!isExsit(canEditFieldList, fieldList[index].fieldname)) {
                try {
                    elementField = mainform.find('[name="' + fieldList[index].fieldname + '"]');
                    switch (fieldList[index].fieldtype) {
                        case "textinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                                if (this.type == "checkbox" || this.type == "radio") {
                                    $(this).attr("disabled", "disabled");
                                }
                                else {
                                    elementField.replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.val()));
                                }
                            });
                            break;
                        case "multitextinput":
                            elementField.replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.val()));
                            break;
                        case "intnumberinput":
                        case "floatnumberinput":
                            elementField.replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.numberbox('getText')));
                            mainform.find('[numberboxname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                            break;
                        case "dateinput":
                            elementField.parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.datebox('getText')));
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                            break;
                        case "datetimeinput":
                            elementField.parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", elementField.datetimebox('getText')));
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                            break;
                        case "singleselectinput":
                        case "multiselectinput":
                            elementField.parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('getText')));
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').remove(); //.replaceWith("");
                            break;
                        case "filelistcontrol":
                            try {
                                mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false });
                                formatAttachFile(false); //初始化附件列表控件
                            }
                            catch (e) { }
                            break;
                        case "importdocument":
                            break;
                        case "virtualsubtable":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false });
                            var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
                            objGrid.datagrid({ toolbar: [] });
                            break;
                    }
                }
                catch (element)
                { }
            }
        }
    }
    catch (e)
    { }
}

var objForDiction;
var divDictionList;
function OpenOfficediction(obj) {
    if ($("#divDictionForm").get(0)) {
        $("#divDictionForm").remove();
    }
    objForDiction = obj;
    divDictionList = $("<div id=\"divDictionForm\" class=\"easyui-window\" title=\"办公用语\"></div>");
    var gridNewList = "<table id=\"dgDictionList\" class=\"easyui-datagrid\" data-options=\"url: rootPath+'Officediction/LoadPageList.do?delstatus=0',nowrap:false,singleSelect: true,fit: true,fitColumns: true,rownumbers: true,pageSize: 20,pagination: true,idField: 'id',onDblClickRow:useDiction,onLoadError: gridLoadError\"><thead><tr><th data-options=\"field:'diction'\" width=\"340\">办公用语</th></tr></thead></table>";
    divDictionList.append(gridNewList);
    divDictionList.window({
        modal: true,
        minimizable: false,
        maximizable: false,
        closed: true,
        iconCls: 'icon-save',
        width: 350,
        height: 400
    });
    $("#dgDictionList").datagrid();
    divDictionList.window('open');
}
function useDiction(rowIndex, rowData) {
    divDictionList.window('close');
    var tempObj = document.getElementById(objForDiction.id);
    tempObj.value += rowData.diction;
    $('#Fnt_' + tempObj.id.ReplaceAll(/\./g, '_')).html(tempObj.value.ReplaceAll('\\n', '<BR>'));
}

//保存子表前先判断所属主表是否存在
function checkFormDataIsExist() {
    var mainTableField = $("input[fieldtype='maintablekey']");
    if (mainTableField && mainTableField.val() == "") {
        return false;
    }
    else {
        relationShipRecord = mainTableField.val();
        return true;
    }
}


function setValueStatus() {//canEdit-style  可编辑控件底色
    var mainform = $("#TailorForm");
    var valueCheck = false; //是否有值
    var canEdit = false; //是否可编辑
    var required = false; //是否必填
    var tempJqueryObj;
    var subJqueryObj;

    for (var index in fieldList) {

        valueCheck = (fieldList[index].fieldvalue || fieldList[index].fieldvalue == 0);

        if (fieldList[index].fieldtype == "hiddeninput") {//隐藏控件无需设置状态
            if (valueCheck) {
                mainform.find('[name="' + fieldList[index].fieldname + '"]').val(fieldList[index].fieldvalue);
            }
        } else {

            if (canEditFieldList&&isExsit(canEditFieldList, fieldList[index].fieldname)) {
                canEdit = true; //可编辑
            } else {
                canEdit = false;
            }

            if (requiredFieldList&&isExsit(requiredFieldList, fieldList[index].fieldname)) {
                required = true; //必填
            } else {
                required = false;
            }

            switch (fieldList[index].fieldtype) {
                case "textinput":
                    tempJqueryObj = mainform.find('[name="' + fieldList[index].fieldname + '"]');
                    if (canEdit) {
                        tempJqueryObj.each(function () {
                            subJqueryObj = $(this);
                            if (this.type != "checkbox" && this.type != "radio") {
                                if (valueCheck) {
                                    subJqueryObj.val(fieldList[index].fieldvalue);
                                }
                                subJqueryObj.addClass("canEdit-style");

                                if (required) {
                                    subJqueryObj.validatebox({ 'required': true });
                                }
                            } else {
                                if (valueCheck) {
                                    if ((',' + fieldList[index].fieldvalue + ',').indexOf(',' + this.value + ',') >= 0) {
                                        subJqueryObj.attr("checked", 'checked');
                                    }
                                }
                            }
                        });
                    } else {
                        tempJqueryObj.each(function () {
                            subJqueryObj = $(this);
                            if (this.type == "checkbox" || this.type == "radio") {
                                if (valueCheck) {
                                    if ((',' + fieldList[index].fieldvalue + ',').indexOf(',' + this.value + ',') >= 0) {
                                        subJqueryObj.attr("checked", 'checked');
                                    }
                                }
                                subJqueryObj.attr("disabled", "disabled");
                            }
                            else {
                                if (valueCheck) {
                                    subJqueryObj.val(fieldList[index].fieldvalue);
                                }
                                subJqueryObj.attr("readonly", "readonly");
                            }
                        });
                    }
                    break;
                case "multitextinput":
                    tempJqueryObj = mainform.find('[name="' + fieldList[index].fieldname + '"]');
                    if (canEdit) {
                        tempJqueryObj.each(function () {
                            subJqueryObj = $(this);
                            if (valueCheck) {
                                subJqueryObj.val(fieldList[index].fieldvalue);
                            }
                            subJqueryObj.addClass("easyui-validatebox canEdit-style");

                            if (required) {
                                subJqueryObj.validatebox({ 'required': true });
                            }
                        });
                    } else {
                        tempJqueryObj.each(function () {
                            subJqueryObj = $(this);
                            if (valueCheck) {
                                subJqueryObj.val(fieldList[index].fieldvalue);
                            }
                            subJqueryObj.attr("readonly", "readonly");
                        });
                    }
                    break;
                case "intnumberinput":
                case "floatnumberinput":
                    tempJqueryObj = mainform.find("[numberboxname='" + fieldList[index].fieldname + "']");
                    if (canEdit) {
                        tempJqueryObj.addClass("canEdit-style");
                        try {
                            if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                                if (valueCheck) {
                                    tempJqueryObj.numberspinner('setValue', fieldList[index].fieldvalue);
                                }
                                if (required) {
                                    tempJqueryObj.numberspinner({ 'required': true });
                                }
                            }
                            else {
                                if (valueCheck) {
                                    tempJqueryObj.numberbox('setValue', fieldList[index].fieldvalue);
                                }
                                if (required) {
                                    tempJqueryObj.numberbox({ 'required': true });
                                }
                            }
                        }
                        catch (e) { }
                    } else {
                        try {
                            if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                                if (valueCheck) {
                                    tempJqueryObj.numberspinner('setValue', fieldList[index].fieldvalue);
                                }
                                tempJqueryObj.numberspinner("disable");
                            }
                            else {
                                if (valueCheck) {
                                    tempJqueryObj.numberbox('setValue', fieldList[index].fieldvalue);
                                }
                                tempJqueryObj.numberbox("disable");
                            }
                        }
                        catch (e) { }
                    }
                    break;
                case "dateinput":
                    tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                    if (canEdit) {
                        mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");
                        if (valueCheck) {
                            tempJqueryObj.datebox('setValue', fieldList[index].fieldvalue);
                        }
                        if (required) {
                            tempJqueryObj.datebox({ 'required': true });
                        }

                    } else {
                        if (valueCheck) {
                            tempJqueryObj.datebox('setValue', fieldList[index].fieldvalue);
                        }
                        tempJqueryObj.datebox('disable');
                    }

                    break;
                case "datetimeinput":
                    tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');
                    if (canEdit) {
                        mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");
                        if (valueCheck) {
                            tempJqueryObj.datetimebox('setValue', fieldList[index].fieldvalue);
                        }
                        if (required) {
                            tempJqueryObj.datetimebox({ 'required': true });
                        }

                    } else {
                        if (valueCheck) {
                            tempJqueryObj.datetimebox('setValue', fieldList[index].fieldvalue);
                        }
                        tempJqueryObj.datetimebox('disable');
                    }
                    break;
                case "singleselectinput":
                    tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');

                    if (fieldList[index].datasource && fieldList[index].datasource.length > 0) {
                        setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                        if (valueCheck) {
                            tempJqueryObj.combobox('setValue', fieldList[index].fieldvalue);
                        }
                    }
                    else {
                        if (valueCheck) {
                            tempJqueryObj.combobox('setText', fieldList[index].fieldvalue);
                        }
                    }

                    if (canEdit) {
                        mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");

                        if (required) {
                            tempJqueryObj.combobox({ 'required': true });
                        }

                    } else {
                        tempJqueryObj.combobox('disable');
                    }
                    break;
                case "multiselectinput":
                    tempJqueryObj = mainform.find('[comboname="' + fieldList[index].fieldname + '"]');

                    if (fieldList[index].datasource && fieldList[index].datasource.length > 0) {
                        setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                        if (valueCheck) {
                            tempJqueryObj.combobox('setValues',fieldList[index].fieldvalue.split(','));
                        }
                    }
                    else {
                        if (valueCheck) {
                            tempJqueryObj.combobox('setText', fieldList[index].fieldvalue);
                        }
                    }

                    if (canEdit) {
                        mainform.find('input[name="' + fieldList[index].fieldname + '"]').parent().children("input.combo-text").addClass("canEdit-style");

                        if (required) {
                            tempJqueryObj.combobox({ 'required': true });
                        }

                    } else {
                        tempJqueryObj.combobox('disable');
                    }
                    break;
                case "filelistcontrol":
                    try {
                        mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: true });
                        formatAttachFile(true); //附件列表控件展示
                    }
                    catch (e) { }
                    break;
            }
        }
    }
    if (currentSummaryRecordId) {//外键赋值
        mainform.find("input[fieldtype='foreigntablekey']").val(currentSummaryRecordId);
    }
    relationShipRecord = $("input[fieldtype='maintablekey']").val();

    try {
        formatSubTailorForm(); //初始化表单子表控件(引用VirtualSubTable.js)
    }
    catch (e)
    { }
}