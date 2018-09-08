/*
全局变量定义
*/
var rootPath = "../../"; //页面根路径
var editingIndex; //记录正则编辑的行
var currentTableName = ""; //当前物理表名称
var currentSubTailorFormid = 0; //当前表单主键标识
var currentUnitID = 0; //当前单位主键标识
var colDatas = []; //子表使用的列
var alignData = [{ value: 'left', text: '居左' }, { value: 'center', text: '居中' }, { value: 'right', text: '居右'}];
var collectRuleData = [{ value: 'sum', text: '求和' }, { value: 'avg', text: '平均值'}];
$(function () {
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK });
});

//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement });
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
            $('#divTab').tabs('select', "子表列表");
            updateSubTailorFormListTab(); //添加子表列表TAB
            break;
        case "addlistconfig":
            break;
    }
}
//更新子表列表
function updateSubTailorFormListTab() {
    var temp = $('#divTab').tabs('getTab', "子表列表");

    $('#divTab').tabs('update', {
        tab: $('#divTab').tabs('getTab', "子表列表"),
        options: {
            href: rootPath + "platform/SubTailorFormManager/SubTailorFormList.htm"
        }
    });
}

/*
物理子表列表相关脚本
*/
//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}
//查询
function searchSubTailorFormList() {
    $('#dgSubTailorForm').datagrid('load', {
        keyname: $('#keyname').val(),
        unitid: $('#searchUnitid').val()
    });
}
//新增
function creatSubTailorForm() {
    if (currentTableName == "") {
        GlobalTools.tip("请选择一个物理表");
        return;
    }
    currentSubTailorFormid = 0;
    //变更表单子表配置Tab
    changeSubTailorFormInfoTab();
}
//修改
function editTailorForm() {
    var rowData = $('#dgSubTailorForm').datagrid('getSelected');
    if (!rowData) {
        GlobalTools.tip("请选择一个表单进行编辑");
        return;
    }
    currentSubTailorFormid = rowData.id;
    currentTableName = rowData.tablename;
    //变更表单子表配置Tab
    changeSubTailorFormInfoTab();
}

//变更表单子表配置Tab
function changeSubTailorFormInfoTab() { //表单子表配置
    if (!$('#divTab').tabs('exists', "子表配置")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "子表配置",
            id: "newSubTailorForm",
            href: rootPath + "platform/SubTailorFormManager/VirtualSubTableConfig.htm",
            onLoad: loadSubTailorForm
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "子表配置");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "子表配置"),
            options: {
                href: rootPath + "platform/SubTailorFormManager/VirtualSubTableConfig.htm",
                onLoad: loadSubTailorForm
            }
        });
    }
}

//双击行进行编辑
function tailorFormDblClickRow(rowIndex, rowData) {
    editTailorForm();
}
//禁用电子表单
function deleteTailorForm() {
    GlobalTools.deleteGridList($('#dgSubTailorForm'), { url: rootPath + "Sys_virtualsubtable/DeleteList.do" });
}
//启用电子表单
function unDeleteTailorForm() {
    GlobalTools.unDeleteGridList($('#dgSubTailorForm'), { url: rootPath + "Sys_virtualsubtable/UnDeleteList.do" });
}

/*
表单子表基本信息相关脚本
*/
//加载表基本信息表单数据
function loadSubTailorForm() {
    $("#constname").blur(function () {
        var loaddataaction = $("#loaddataaction").val();
        if (loaddataaction.indexOf("?") > 0)
            loaddataaction = loaddataaction.substring(0, loaddataaction.lastIndexOf("?"));
        $("#loaddataaction").val(loaddataaction + "?constname=" + $("#constname").val());
    });
  
    	GlobalTools.loadForm($("#subTailorForm"), {
    		url: rootPath + 'Sys_virtualsubtable/LoadForm.do?subtailorformid=' + currentSubTailorFormid, isNormalModel: false
    	}, loadComplete);
    
}

//表单数据加载完成后
function loadComplete(data) {
    if ($("#tablename").val() == "") $("#tablename").val(currentTableName);
    if ($("#loaddataaction").val() == "") $("#loaddataaction").val("Form/LoadSubTablePageList.do?constname=");
    if ($("#savedataaction").val() == "") $("#savedataaction").val("Form/SaveSubTableData.do");
    if ($("#destroydataaction").val() == "") $("#destroydataaction").val("Form/DestroySubDataList.do");
    InitialColDatas(); //初始化子表使用列
}

//保存表基本信息
function saveSubTailorForm() {
    GlobalTools.submitForm($("#subTailorForm"), {
        success: function (data) {
            currentSubTailorFormid = data.subtailorformid;
            $("#subTailorFormid").val(currentSubTailorFormid);
            saveSubTailorFormColDatas(); //保存子表字段配置信息
            syncSubTailorFormConfig(); //同步子表配置信息，后台生成Grid数据
            updateSubTailorFormListTab();
            GlobalTools.tip("保存成功！");
        },
        error: function (message) {
            GlobalTools.tip("保存失败！原因：" + message);
        }
    });
}



/*
表单子表配置信息相关脚本
*/
//初始化书签使用字段
function InitialColDatas() {
    $.ajax({
        type: "GET",
        async: false,
        url: rootPath + 'Sys_colsremark/LoadColsByTableName.do?tablename=' + currentTableName,
        success: function (data) {
            colDatas = data;
        },
        error: function (message) {
            GlobalTools.tip("获取子表列出错：" + message);
        }
    });
}

//格式化子表单元格对齐方式
function formatterSubTailorFormAlignCell(value, row, index) {
    var retValue = "";
    $(alignData).each(function (index, item) {
        if (item.value == value) {
            retValue = item.text;
            return false; //返回false终止循环，返回true进入下次循环
        }
    });
    return retValue;
}

//格式化子表列汇总方式
function formatterSubTailorFormCollectRuleCell(value, row, index) {
    var retValue = "";
    $(collectRuleData).each(function (index, item) {
        if (value && value.indexOf(item.value) >= 0) {
            retValue += (retValue != "" ? "," : "") + item.text;
            return true; //返回false终止循环，返回true进入下次循环
        }
    });
    return retValue;
}

//格式化书签字段单元格
function formatterColNameCell(value, rowData, rowIndex) {
    if (value == null || value.length == 0) {
        return;
    }
    var text = value;
    $.each(colDatas, function (index, item) {
        if (value == item.colname) {
            text = item.alias;
            return false;
        }
    });
    return text;
}

//格式化书签字段单元格
function formatterEnableCollectCell(value, rowData, rowIndex) {
    return (value && value > 0 ? "是" : "否");
}

//结束编辑
function endEditing() {
    if (editingIndex == undefined) { return true }
    if ($('#dgSubTailorFormConfig').datagrid('validateRow', editingIndex)) {
        $('#dgSubTailorFormConfig').datagrid('endEdit', editingIndex);
        editingIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//双击行进行编辑
function subTailorFormConfigDblClickRow(rowIndex, rowData) {
    $('#dgSubTailorFormConfig').datagrid("unselectAll");
    $('#dgSubTailorFormConfig').datagrid('selectRow', rowIndex);
    if (editingIndex == rowIndex) return;
    if (!endEditing()) return;
    editingIndex = rowIndex;
    $('#dgSubTailorFormConfig').datagrid('beginEdit', editingIndex);
    var editor = $('#dgSubTailorFormConfig').datagrid('getEditor', { index: editingIndex, field: 'colname' });
    $(editor.target).combobox('loadData', colDatas);
    $(editor.target).combobox('select', rowData.colname);
}

//进行编辑
function editColumn() {
    if (!endEditing()) return;
    var row = $('#dgSubTailorFormConfig').datagrid('getSelected');
    if (row) {
        editingIndex = $('#dgSubTailorFormConfig').datagrid('getRowIndex', row);
        $('#dgSubTailorFormConfig').datagrid('beginEdit', editingIndex);
        var editor = $('#dgSubTailorFormConfig').datagrid('getEditor', { index: editingIndex, field: 'colname' });
        $(editor.target).combobox('loadData', colDatas);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}

function dynamicEditor(rowData) {
    var editors = $('#dgSubTailorFormConfig').datagrid('getEditors', editingIndex);
    
    if (!rowData.categoryconstname && (rowData.coltype=="int" || rowData.coltype=='float')) {
        $(editors[5].target).removeAttr("disabled");
        $(editors[6].target).combobox("enable");
    }
    else {
        $(editors[5].target).attr("checked", false);
        $(editors[6].target).combobox("setValues", []);
        $(editors[5].target).attr("disabled", "disabled");
        $(editors[6].target).combobox("disable");
    }
}
//取消编辑
function cancelEditColumn() {
    var row = $('#dgSubTailorFormConfig').datagrid('getSelected');
    if (!row) {
        GlobalTools.tip("请选择记录。");
        return;
    }
    editingIndex = $('#dgSubTailorFormConfig').datagrid('getRowIndex', row);
    if (row.id > 0) {
        $('#dgSubTailorFormConfig').datagrid('cancelEdit', editingIndex);
    }
    else {
        $('#dgSubTailorFormConfig').datagrid('deleteRow', editingIndex);
    }
    editingIndex = undefined;
}

//新增数据列
function creatNewColumn() {
    if (currentTableName == "") {
        GlobalTools.tip("请选择一个物理表");
        return;
    }
    if (currentSubTailorFormid && currentSubTailorFormid<=0) {
        GlobalTools.tip("请先保存子表基本信息，再配置子表字段。");
        return;
    }
    if (!endEditing()) return;
    $('#dgSubTailorFormConfig').datagrid("unselectAll");
    $('#dgSubTailorFormConfig').datagrid('appendRow', { id: null,
        delstatus: 0,
        tablename: currentTableName,
        colname: "",
        chinaname: "",
        colwidth: "50",
        textalign: "center",
        sortindex: "50",
        subtableid: currentSubTailorFormid,
        enablecollect: "0",
        collectrule: ""
    });
    editingIndex = $('#dgSubTailorFormConfig').datagrid('getRows').length - 1;
    $('#dgSubTailorFormConfig').datagrid('beginEdit', editingIndex);
    $('#dgSubTailorFormConfig').datagrid('selectRow', editingIndex);
    var editor = $('#dgSubTailorFormConfig').datagrid('getEditor', { index: editingIndex, field: 'colname' });
    $(editor.target).combobox('loadData', colDatas);
}

//保存子表配置信息
function saveSubTailorFormColDatas() {
    if (!endEditing()) return;
    var changesData = $('#dgSubTailorFormConfig').datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        async:false,
        url: rootPath + "Sys_virtualsubtablecol/SaveForm.do",
        data: {changeDatas: JSON2.stringify(changesData) },
        success: function (data, msg) {
            $('#dgSubTailorFormConfig').datagrid('reload');
            $('#dgSubTailorFormConfig').datagrid('acceptChanges');
        }
    });
}

//同步子表配置信息，后台生成Grid数据
function syncSubTailorFormConfig() {
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_virtualsubtablecol/SyncSubTailorFormConfig.do",
        data: { subtailorformid:currentSubTailorFormid }
    });
}
//销毁数据列
function destroyColumn() {
    GlobalTools.destroyGridList($('#dgSubTailorFormConfig'), { url: rootPath + "Sys_virtualsubtablecol/DestroyList.do" });
}