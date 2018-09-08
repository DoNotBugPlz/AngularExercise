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
var ruleDatas =
[
{ id: "0", text: "不使用" },
{ id: "1", text: "显示使用" },
{ id: "2", text: "隐藏使用" }
];
$(function () {
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK,sigleSelect:false });
});
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
            href: rootPath + "platform/TailorFormManager/TailorFormList.htm"
        }
    });
}

//变更表单基本信息Tab
function changeTailorFormInfoTab() { //表单基本信息
    if (!$('#divTab').tabs('exists', "基本信息")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "基本信息",
            id: "newTailorForm",
            href: rootPath + "platform/TailorFormManager/TailorFormInfo.htm",
            onLoad: loadTailorForm
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "基本信息");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "基本信息"),
            options: {
                href: rootPath + "platform/TailorFormManager/TailorFormInfo.htm",
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
            href: rootPath + "platform/TailorFormManager/TailorFormColConfig.htm"
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "字段配置");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "字段配置"),
            options: {
                href: rootPath + "platform/TailorFormManager/TailorFormColConfig.htm"
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
            href: rootPath + "platform/TailorFormManager/TailorFormDesign.htm"
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
    if ($("#printpath").val() == "") $("#printpath").val("../TailorFormManager/TailorFormPrintViewPage.htm");
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

//格式化绑定隐藏域单元格
function formatterHidCell(value, rowData, rowIndex) {
    var retValue = "";
    $(formColDatas).each(function (index, item) {
        if (item.colname == value) {
            retValue = item.alias;
            return false; //返回false终止循环，返回true进入下次循环
        }
    });
    return retValue;
}

//双击表单字段配置列表行事件
function tailorFormColClickRow(rowIndex, rowData) {
    if (editingIndex == rowIndex) return;
    if (!endEditing()) return;
    editingIndex = rowIndex;
    $('#tailorFormColListGrid').datagrid('beginEdit', editingIndex);
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
    $('#tailorFormColListGrid').datagrid('beginEdit', editingIndex);
    $('#tailorFormColListGrid').datagrid('selectRow', editingIndex);
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
                    content: '<iframe id="frameTailorFormPrint" name="frameTailorFormPrint" scrolling="auto" frameborder="0"  src="' + rootPath + 'platform/TailorFormManager/TailorFormPrint.htm?tablename=' + currentTableName + '&templateid=' + currentTemplateid + '&tailorformid=' + currentTailorFormid + '"  style="width:100%;height:100%;"></iframe>'
                });
            }
            else {
                $('#divTab').tabs('select', "文书套打");
            }
        }
    });
}

/*
表单子表设置脚本
*/
//单击物理表列表行，加载表单
function clickSubTablesRow(row) {
    switch (row.showtype) {
        case "tableinfo":
            $('#dgSubTailorForm').datagrid('options').url = '../Sys_virtualsubtable/LoadPageList.do?tablename=' + row.id;
            $('#dgSubTailorForm').datagrid('reload');
            break;
        case "addlistconfig":
            break;
    }
}

//查询子表
function searchSubTailorFormList() {
    $('#dgSubTailorForm').datagrid('load', {
        keyname: $('#subKeyName').val(),
        unitid: $('#searchSubUnitid').val()
    });
}

function addSubTable() {
    if (!endEditing()) return;
    $('#tailorFormColListGrid').datagrid("unselectAll");
    $('#InsertSubTable').window({ width: 750, height: 450, href: rootPath + 'platform/TailorFormManager/InsertSubTable.htm' });
    $('#InsertSubTable').window('open');
}

function insertSubTable() {
    var datas = $('#dgSubTailorForm').datagrid('getSelections');
    if (datas && (datas.length == 0 || datas.length > 1)) {
        GlobalTools.tip("请选择一个子表。");
        return false;
    }
    $('#tailorFormColListGrid').datagrid('appendRow', { id: null, tablename: 'virtualsubtable', colname: datas[0].constname.toLowerCase(), alias: datas[0].chinaname, coltypealias: '多行列表', tailorformid: currentTailorFormid, ismindcol: '2', chinaname: datas[0].chinaname, formuserule: '1', sourcecol: '' });
    editingIndex = $('#tailorFormColListGrid').datagrid('getRows').length - 1;
    $('#tailorFormColListGrid').datagrid('beginEdit', editingIndex);
    $('#tailorFormColListGrid').datagrid('selectRow', editingIndex);
}