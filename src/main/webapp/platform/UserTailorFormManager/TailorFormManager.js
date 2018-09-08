/*
全局变量定义
*/
var rootPath = "../../"; //页面根路径
var editingIndex; //记录正则编辑的行
var currentTableName = ""; //当前物理表名称
var currentTailorFormid = 0; //当前表单主键标识
var currentUnitID = 0; //当前单位主键标识
var currentTailorFormDesigner = null; //当前表单编辑器
var currentTemplateid = 0; //当前模板主键标识
var formColDatas = [];
var categoryListData; //所有的字典项集合（sys_cateogry中的）
var ruleDatas =[{ id: "0", text: "不使用" },{ id: "1", text: "显示使用" }];//[{ id: "0", text: "不使用" },{ id: "1", text: "显示使用" },{ id: "2", text: "隐藏使用" }];
var coltypeDatas;
var datetimeCategoryData; //时间格式字典项值
var validataCategoryData; //数据校验规则字典项值
$(function () {
    $.ajax({
        type: "GET",
        url: rootPath + "Sys_categoryvalue/GetCategoryValues.do?constname=COLTYPE",
        success: function(data){
            coltypeDatas=data;
        }
    });
    GlobalTools.ajax({
        type: "GET",
        url: rootPath + "Sys_category/LoadAllCategory.do",
        success: function (data) {
            categoryListData = data;
        }
    });
    $.ajax({
        type: "GET",
        url: rootPath + "Sys_categoryvalue/GetCategoryValues.do?constname=USERDATE_FMTTYPES",
        success: function (data) {
            datetimeCategoryData = data;
        }
    });
    $.ajax({
        type: "GET",
        url: rootPath + "Sys_categoryvalue/GetCategoryValues.do?constname=FIELD_VALIDATOR",
        success: function (data) {
            validataCategoryData = data;
        }
    });
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK,sigleSelect:false  });

});

//格式 列维护信息中的数据验证选项
function formatValiddata(value, row) {
    if (value == null || value.length == 0) {
        return;
    }
    for (var index = 0; index < validataCategoryData.length; index++) {
        if (validataCategoryData[index].id == value) {
            return validataCategoryData[index].chinaname;
        }
    }
}
/*
组织机构树相关脚本
*/
//单击物理表列表行，加载表单
function clickTablesRow(row) {
    switch (row.showtype) {
        case "tableinfo":
            currentTableName = row.id;
            $('#divTab').tabs('select', "表单列表");
            updateTailorFormListTab(); //添加表单列表TAB
            break;
        case "addlistconfig":
            break;
    }
}

/*
物理表单列表相关脚本
*/
//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}

//格式化单元格 显示“是”、“否”
function formatterRequiredCell(value, row, index) {
    return (value == 1 ? "是" : "否");
}

//查询
function searchTailorFormList() {
    $('#dgTailorForm').datagrid('load', {
        keyname: $('#keyname').val(),
        unitid: $('#searchUnitid').val()
    });
}
//新增
function creatTailorForm() {
    if (currentTableName == "") {
        GlobalTools.tip("请选择一个物理表");
        return;
    }
    currentTailorFormid = 0;
    //变更表单基本信息Tab
    changeTailorFormInfoTab();

    if ($('#divTab').tabs('exists', "字段配置")) {//如果存在，则关闭
        $('#divTab').tabs('close', "字段配置");
    }
    if ($('#divTab').tabs('exists', "布局设置")) {//如果存在，则关闭
        $('#divTab').tabs('close', "布局设置");
    }
    if ($('#divTab').tabs('exists', "文书套打")) {//如果存在，则关闭
        $('#divTab').tabs('close', "文书套打");
    }
}
//修改
function editTailorForm() {
    var rowData = $('#dgTailorForm').datagrid('getSelected');
    if (!rowData) {
        GlobalTools.tip("请选择一个表单进行编辑");
        return;
    }
    currentTailorFormid = rowData.id;
    currentTableName = rowData.tablename;

    InitialFormColDatas(); //获取当前表的所有列信息
    //变更表单基本信息Tab
    changeTailorFormInfoTab();
    //变更表单字段配置的Tab
    changeTailorFormColTab();
    //变更表单布局配置的Tab
    changeTailorFormDesignTab();
}
//更新表单列表
function updateTailorFormListTab() {
    var temp = $('#divTab').tabs('getTab', "表单列表");

    $('#divTab').tabs('update', {
        tab: $('#divTab').tabs('getTab', "表单列表"),
        options: {
            href: rootPath + "platform/UserTailorFormManager/TailorFormList.htm"
        }
    });
}

//变更表单基本信息Tab
function changeTailorFormInfoTab() { //表单基本信息
    if (!$('#divTab').tabs('exists', "基本信息")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "基本信息",
            id: "newTailorForm",
            href: rootPath + "platform/UserTailorFormManager/TailorFormInfo.htm",
            onLoad: loadTailorForm
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "基本信息");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "基本信息"),
            options: {
                href: rootPath + "platform/UserTailorFormManager/TailorFormInfo.htm",
                onLoad: loadTailorForm
            }
        });
    }
}

//变更表单字段配置的Tab
function changeTailorFormColTab() {
    //表单字段配置
    if (!$('#divTab').tabs('exists', "字段配置")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "字段配置",
            id: "newTailorFormCol",
            href: rootPath + "platform/UserTailorFormManager/TailorFormColConfig.htm"
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "字段配置");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "字段配置"),
            options: {
                href: rootPath + "platform/UserTailorFormManager/TailorFormColConfig.htm"
            }
        });
    }
}

//变更表单布局配置的Tab
function changeTailorFormDesignTab() {
    //表单布局配置
    if (!$('#divTab').tabs('exists', "布局设置")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "布局设置",
            id: "newTailorFormDesign",
            href: rootPath + "platform/UserTailorFormManager/TailorFormDesign.htm"
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "布局设置");
        ResetFormDesignerContent();
    }
}

//双击行进行编辑
function tailorFormDblClickRow(rowIndex, rowData) {
    editTailorForm();
}
//禁用电子表单
function deleteTailorForm() {
    GlobalTools.deleteGridList($('#dgTailorForm'), { url: rootPath + "Sys_def_tailorform/DeleteList.do" });
}
//启用电子表单
function unDeleteTailorForm() {
    GlobalTools.unDeleteGridList($('#dgTailorForm'), { url: rootPath + "Sys_def_tailorform/UnDeleteList.do" });
}

/*
物理表单基本信息相关脚本
*/
//加载表基本信息表单数据
function loadTailorForm() {
    GlobalTools.loadForm($("#tailorForm"), {
        url: rootPath + 'Sys_def_tailorform/LoadForm.do?tailorformid=' + currentTailorFormid, isNormalModel: false
    }, loadComplete);
}

//表单数据加载完成后
function loadComplete(data) {
    if ($("#tablename").val() == "") $("#tablename").val(currentTableName);
    if ($("#printpath").val() == "") $("#printpath").val("../UserTailorFormManager/TailorFormPrintViewPage.htm");
}
//保存表基本信息
function saveTailorForm() {
    GlobalTools.submitForm($("#tailorForm"), {
        success: function (data) {
            currentTailorFormid = data.tailorformid;
            $("#tailorformid").val(data.tailorformid);
            updateTailorFormListTab();
            changeTailorFormColTab();
            changeTailorFormDesignTab();
            GlobalTools.tip("保存成功！");
        },
        error: function (message) {
            GlobalTools.tip("保存失败！原因：" + message);
        }
    });
}

//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement,loadDataUrl:"Sys_dept/LoadListDeptTreeWithUnitid.do"});
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
    switch ($(sourceElement).attr("id")) {
        case "unitname":
            $("#tailorFormUnitid").val(ids);
            break;
        case "searchUnitName":
            $("#searchUnitid").val(ids);
            break;
        case "searchSubUnitName":
            $("#searchSubUnitid").val(ids);
            break;
    }
}

/*
物理表单基列配置相关脚本
*/
function InitialFormColDatas() {
    $.ajax({
        type: "GET",
        async: false,
        url: rootPath + 'Sys_colsremark/LoadColsByTableName.do?tablename=' + currentTableName,
        success: function (data) {
            formColDatas = data;
        },
        error: function (message) {
            GlobalTools.tip("获取表单列出错：" + message);
        }
    });
}

//格式化使用规则单元格
function formatterUseRuleCell(value, rowData, rowIndex) {
    switch (String(value)) {
        case "1":
            return '<font color=blue><b>显示使用</b></font>';
        case "2":
            return '<font color=green><b>隐藏使用</b></font>';
        default:
            return '<font color="#B6B6B6">不使用</font>';
    }
}
function addColtypeEditor() {
    $("#tailorFormColListGrid").datagrid('addEditor', { field: 'col_type', editor: {
        type: 'combobox',
        options: {
            valueField: 'id',
            required:true,
            value:'',
            textField: 'chinaname',
            data: coltypeDatas,
            panelHeight:'150',
            onSelect:selectColTye
        }
    }
    });
}
//colsListGrid 中字段添加editor
function addCategoryidEditor() {
    $("#tailorFormColListGrid").datagrid('addEditor', { field: 'categoryconstname', editor: {
        type: 'combobox',
        options: {
            valueField: 'constname',
            textField: 'chinaname',
            data: categoryListData
        }
    }
    });
}

function selectColTye(record){
    switch (record.id){
        case "0"://下拉单选框(0),
        case "1"://下拉多选框(1),
            setCategoryEnable(editingIndex);
            setDateTimeDisabled(editingIndex);
            setValidDataDisabled(editingIndex);
            break;
        case "2"://单行文本框(2),
            setCategoryDisabled(editingIndex);
            setDateTimeDisabled(editingIndex);
            setValidDataEnable(editingIndex);
            break;
        case "6"://日期时间选择器(6),
            setCategoryDisabled(editingIndex);
            setDateTimeEnable(editingIndex);
            setValidDataDisabled(editingIndex);
            break;
        default :
            setCategoryDisabled(editingIndex);
            setDateTimeDisabled(editingIndex);
            setValidDataDisabled(editingIndex);
            break;
    }
}
//启用字典选项
function setCategoryEnable(editIndex){
    var ed= $("#tailorFormColListGrid").datagrid("getEditor",{index:editIndex,field:"categoryconstname"});
    if(ed)
    $(ed.target).combobox("enable");
}
//禁用字典选项
function setCategoryDisabled(editIndex){
    var ed= $("#tailorFormColListGrid").datagrid("getEditor",{index:editIndex,field:"categoryconstname"});
    if(ed){
    var $obj=$(ed.target);
        $obj.combobox("setValue","");
        $obj.combobox("disable");
    }
}
//启用日期
function setDateTimeEnable(editIndex){
    var ed= $("#tailorFormColListGrid").datagrid("getEditor",{index:editIndex,field:"fmttypetime"});
    if(ed)
        $(ed.target).combobox("enable");
}
//禁用日期
function setDateTimeDisabled(editIndex){
    var ed= $("#tailorFormColListGrid").datagrid("getEditor",{index:editIndex,field:"fmttypetime"});
    if(ed){
        var $obj=$(ed.target);
        $obj.combobox("setValue","");
        $obj.combobox("disable");
    }
}

//启用数据格式验证
function setValidDataEnable(editIndex){
    var ed= $("#tailorFormColListGrid").datagrid("getEditor",{index:editIndex,field:"validdata"});
    if(ed)
        $(ed.target).combobox("enable");
}
//禁用数据格式验证
function setValidDataDisabled(editIndex){
    var ed= $("#tailorFormColListGrid").datagrid("getEditor",{index:editIndex,field:"validdata"});
    if(ed){
        var $obj=$(ed.target);
        $obj.combobox("setValue","");
        $obj.combobox("disable");
    }
}

//格式 列维护信息中的日期格式选项
function formatFmttypetime(value, row) {
    if (value == null || value.length == 0 || value == 0) {
        return "";
    }
    for (var index = 0; index < datetimeCategoryData.length; index++) {
        if (datetimeCategoryData[index].id == value) {
            return datetimeCategoryData[index].chinaname;
        }
    }
}
function removeColtypeEditor() {
    $("#tailorFormColListGrid").datagrid('removeEditor', 'col_type');
}
//格式 列维护信息中的字典项选项
function formatCategory(value, row) {
    if (value == null || value.length == 0) {
        return;
    }
    for (var index = 0; index < categoryListData.length; index++) {
        if (categoryListData[index].constname == value) {
            return categoryListData[index].chinaname;
        }
    }
}

//双击表单字段配置列表行事件
function tailorFormColClickRow(rowIndex, rowData) {
    if (editingIndex == rowIndex) return;
    if (!endEditing()) return;
    try{
        removeColtypeEditor();
    }catch (e){}
    if(rowData.tablename=='virtual_col'){
        addColtypeEditor();
    }

    $('#tailorFormColListGrid').datagrid('beginEdit', rowIndex);
    editingIndex = rowIndex;
    if(rowData.tablename=="virtual_col"){//虚拟字段启用
        setCategoryEnable(rowIndex);

        switch (rowData.col_type){
            case "2"://单行文本
                setDateTimeDisabled(rowIndex);
                setValidDataEnable(rowIndex);
                break;
            case "6"://日期时间控件
                setDateTimeEnable(rowIndex);
                setValidDataDisabled(rowIndex);
                break;
            default :
                setDateTimeDisabled(rowIndex);
                setValidDataDisabled(rowIndex);
                break;
        }
    }else{
        setCategoryDisabled(rowIndex);
        setDateTimeDisabled(rowIndex);
    }
}

//结束编辑
function endEditing() {
    if (editingIndex == undefined) { return true }
    if ($('#tailorFormColListGrid').datagrid('validateRow', editingIndex)) {
        $('#tailorFormColListGrid').datagrid('endEdit', editingIndex);
        editingIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//保存表单字段配置信息
function saveTailorFormCols() {
    if (!endEditing()) return;
    var changesData = $('#tailorFormColListGrid').datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    for(var index= 0,len=changesData.length;index<len;index++){
        if(changesData[index].tablename=='virtual_col' && (changesData[index].colname==null||changesData[index].colname.length==0)){
            changesData[index].colname="virtualcol_"+getPY_str(changesData[index].chinaname).toLowerCase();
        }
    }

    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_def_tailorformcol/SaveForm.do",
        data: { tailorformid: currentTailorFormid, changeDatas: JSON2.stringify(changesData) },
        success: function (data, msg) {
            $('#tailorFormColListGrid').datagrid('reload');
            $('#tailorFormColListGrid').datagrid('acceptChanges');
        }
    });
}

//添加意见字段
function addMindCol() {
    if (!endEditing()) return;
    $('#tailorFormColListGrid').datagrid("unselectAll");
    $('#tailorFormColListGrid').datagrid('appendRow', { id: null, tablename: 'virtualmindtable', colname: '新增意见字段', alias: '意见字段', coltypealias: '多行文本', tailorformid: currentTailorFormid, ismindcol: '1', chinaname: '审批意见', formuserule: '1', sourcecol: '' });
    editingIndex = $('#tailorFormColListGrid').datagrid('getRows').length - 1;
    removeColtypeEditor();

    $('#tailorFormColListGrid').datagrid('beginEdit', editingIndex);
    $('#tailorFormColListGrid').datagrid('selectRow', editingIndex);
    setCategoryDisabled(editingIndex);
    setDateTimeDisabled(editingIndex);
}

function cancelEditMindCol() {
    if (editingIndex == undefined) return;
    var row = $('#tailorFormColListGrid').datagrid('getSelected');
    if (!row) return;
    if (row.ismindcol == 0) {//非意见字段只能取消编辑
        $('#tailorFormColListGrid').datagrid('cancelEdit', editingIndex);
    }
    else if (row.ismindcol == 1 && row.id > 0) {
        $('#tailorFormColListGrid').datagrid('cancelEdit', editingIndex);
    }
    else if (row.ismindcol == 1 && row.id == 0) {
        $('#tailorFormColListGrid').datagrid('deleteRow', editingIndex);
    }
    editingIndex = undefined;
}

/*
物理表单布局配置相关脚本
*/
function ResetFormDesignerContent() {
    if (!currentTailorFormDesigner)
        currentTailorFormDesigner = UE.getEditor('tailorFormDesigner');
    currentTailorFormDesigner.ready(function () {
        GlobalTools.ajax({
            url: rootPath + "Sys_def_tailorformcontent/LoadForm.do",
            data: { tailorformid: currentTailorFormid },
            success: function (result) {
                currentTailorFormDesigner.setContent(result.formcontent);
            }
        });
    });
}
function setFormDesignerSize(width, height) {
    if ($("#tailorFormDesigner").children().eq(0).attr("id")) {
        $("#tailorFormDesigner").attr("width", width - 5);
        $("#tailorFormDesigner").children().eq(0).css("width", width - 5);
        $("#tailorFormDesigner").children().eq(0).children().eq(1).css("width", width - 5);
    }
}
//保存电子表单内容
function saveTailorFormContent() {
    if (!currentTailorFormDesigner.hasContents()) {
        GlobalTools.tip("请先绘制表单。");
        return;
    }
    GlobalTools.ajax({
        url: rootPath + "Sys_def_tailorformcontent/SaveForm.do",
        data: { tailorformid: currentTailorFormid, formcontent: currentTailorFormDesigner.getContent() },
        loading: "提交保存中……",
        success: function (result) {
            GlobalTools.tip("物理表单生成成功。");
        }
    });
}

/*
打印模板相关脚本
*/
//变更表单文书套打模板的Tab
function changeTailorFormPrintTab() {
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_booktemplate/FindTemplate.do",
        data: { tailorformid: currentTailorFormid, time: Math.round(Math.random() * 1000) },
        success: function (data, msg) {
            if (data != null) {
                currentTemplateid = data.id;
            }
            //表单文书套打配置
            if (!$('#divTab').tabs('exists', "文书套打")) {//如果不存在，则新增
                $('#divTab').tabs('add', {
                    title: "文书套打",
                    id: "newTailorFormPrint",
                    closable: true,
                    content: '<iframe id="frameTailorFormPrint" name="frameTailorFormPrint" scrolling="auto" frameborder="0"  src="' + rootPath + 'platform/UserTailorFormManager/TailorFormPrint.htm?tablename=' + currentTableName + '&templateid=' + currentTemplateid + '&tailorformid=' + currentTailorFormid + '"  style="width:100%;height:100%;"></iframe>'
                });
            }
            else {
                $('#divTab').tabs('select', "文书套打");
            }
        }
    });
}
//添加普通字段(虚拟)
function addCommonCol(){
    if (!endEditing()) return;
    $('#tailorFormColListGrid').datagrid("unselectAll");
    $('#tailorFormColListGrid').datagrid('appendRow', { id: null, tablename: 'virtual_col', colname: '', alias: 'virtual_col', coltypealias: '', tailorformid: currentTailorFormid, ismindcol: '0', chinaname: '新增字段', formuserule: '1', sourcecol: '',col_type:'1',categoryconstname:'',fmttypetime:'',required:'',validdata:'' });
    addColtypeEditor();

    editingIndex = $('#tailorFormColListGrid').datagrid('getRows').length - 1;
    $('#tailorFormColListGrid').datagrid('beginEdit', editingIndex);
    $('#tailorFormColListGrid').datagrid('selectRow', editingIndex);
}

//格式 列维护信息中的字段类型选项
function formatColType(value, row) {
    if (value == null || value.length == 0) {
        return;
    }
    for (var index = 0,len=coltypeDatas.length; index < len; index++) {
        if (coltypeDatas[index].id == value) {
            return coltypeDatas[index].chinaname;
        }
    }
}

