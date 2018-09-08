var rootPath = "../../";
var editingIndex;
$(function () {
    formatSubTailorForm();
});

//格式化页面中所有子表
function formatSubTailorForm() {    
    $("table[type='virtualsubtable']").each(function (index, item) {
        creatSubTable(item);
    });
}

function creatSubTable(subTable) {
    var constName = $(subTable).attr("constname");
    var subTableToolBar = "";
    subTableToolBar += "<div id=\"subTable_" + constName + "\"  class=\"datagrid-toolbar\">";
    subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"saveSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-save'\">保存</a>";
    subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"creatSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-add'\">新增</a>";
    subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"editSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-edit'\">编辑</a>";
    subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"cancelSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-undo'\">取消</a>";
    subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"destroySubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-delete'\">删除</a>";
    subTableToolBar += "</div>";
    $("body").append(subTableToolBar);
    $.parser.parse("#subTable_" + constName);

    var gridDefault = { queryParams: { recordid: 1 }, toolbar: "#subTable_" + constName }
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_virtualsubtable/LoadSubTableConfig.do",
        data: { constname: $(subTable).attr("constname") },
        success: function (data, msg) {
            rootPath = data.pagerootpath;
            $(subTable).attr({ "destroydataaction": data.destroydataaction, "savedataaction": data.savedataaction, newdata: data.newdata });
            var gridOptions = eval("(" + data.subtableconfig + ")");
            if (!gridOptions) {
                GlobalTools.tip("子表配置无效。");
                return;
            }
            gridOptions = $.extend(gridOptions, gridDefault);
            $(subTable).datagrid(gridOptions);
        }
    });
}

//结束编辑
function endEditing(constname) {
    var objGrid = $("table[constname='" + constname + "']");
    if (editingIndex == undefined) { return true }
    if ($(objGrid).datagrid('validateRow', editingIndex)) {
        $(objGrid).datagrid('endEdit', editingIndex);
        editingIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//创建新记录
function creatSubTailorForm(constname) {
    var objGrid = $("table[constname='" + constname + "']");
    var newData = $(objGrid).attr("newdata");
    if (newData != null) newData = eval("(" + newData + ")");

    if (!endEditing(constname)) return;
    $(objGrid).datagrid("unselectAll");
    $(objGrid).datagrid('appendRow', newData);

    editingIndex = $(objGrid).datagrid('getRows').length - 1;
    $(objGrid).datagrid('beginEdit', editingIndex);
    $(objGrid).datagrid('selectRow', editingIndex);
}

//编辑记录
function editSubTailorForm(constname) {
    var objGrid = $("table[constname='" + constname + "']");
    if (!endEditing(constname)) return;
    var row = $(objGrid).datagrid('getSelected');
    if (row) {
        editingIndex = $(objGrid).datagrid('getRowIndex', row);
        $(objGrid).datagrid('beginEdit', editingIndex);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}

//取消编辑
function cancelSubTailorForm(constname) {
    var objGrid = $("table[constname='" + constname + "']");
    var row = $(objGrid).datagrid('getSelected');
    if (!row) {
        GlobalTools.tip("请选择记录。");
        return;
    }
    editingIndex = $(objGrid).datagrid('getRowIndex', row);
    if (row.id > 0) {
        $(objGrid).datagrid('cancelEdit', editingIndex);
    }
    else {
        $(objGrid).datagrid('deleteRow', editingIndex);
    }
    editingIndex = undefined;
}

//物理删除数据
function destroySubTailorForm(constname) {
    var objGrid = $("table[constname='" + constname + "']");
    GlobalTools.destroyGridList($(objGrid), { url: rootPath + $(objGrid).attr("destroydataaction") });
}

//保存子表数据
function saveSubTailorForm(constname) {
    var objGrid = $("table[constname='" + constname + "']");
    if (!endEditing(constname)) return;
    var listData = $(objGrid).datagrid('getChanges');
    if (!listData || listData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        async: false,
        url: rootPath + $(objGrid).attr("savedataaction"),
        data: { listData: JSON2.stringify(listData) },
        success: function (data, msg) {
            $(objGrid).datagrid('reload');
            $(objGrid).datagrid('acceptChanges');
        }
    });
}
 