var rootPath = "../../", //页面的根路径
 editingIndex, //当前编辑的行索引
 relationShipRecord = "1", //主表主键值，用于子表数据和主表数据建立关系
 checkMainFormDataHandler = null; //外部接口，用于判断主表数据是否保存，根据返回值判断是否执行子表保存动作，返回true，执行子表保存动作，否则不执行
$(function () {
    //初始化人员选择对话框
    OrganizationTools.user_Init({ id: "subTableUser", rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectSubTableUserOK });
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ id: "subTableDept", rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectSubTableDeptOK });
});

//打开一个对话框，显示单位和部门treegrid
function showSubTableDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ id: "subTableDept", sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple, onOKClick: selectSubTableDeptOK });
}
//选择组织机构后回调函数
function selectSubTableDeptOK(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text +=',';
            ids +=',';
        }
        text =text + item.text;
        ids = ids +item.id.toString().ReplaceAll("dept_", "");
    });

    $(".combo-value", $(sourceElement).parent()).val(ids);
    $(".combo-text", $(sourceElement).parent()).val(text);
}

//点击  选择人员 可展开的节点，加载子节点
function showSubTableUserTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ id: "subTableUser", sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple, onOKClick: selectSubTableUserOK });
}
//选择人员后回调函数
function selectSubTableUserOK(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text +=',';
            ids +=',';
        }
        text = text +item.text;
        ids =ids + item.id.toString().ReplaceAll("user_", "");
    });
    $(".combo-value", $(sourceElement).parent()).val(ids);
    $(".combo-text", $(sourceElement).parent()).val(text);
}

//格式化页面中所有子表
function formatSubTailorForm() {
    $("table[type='VirtualSubTable']").each(function (index, item) {
        creatSubTable(item);
    });
}

//格式化子表字典列
function formatCategoryValue(value, rowData, rowIndex, sourceDatas, categoryConstname) {
    if (!value) return "";
    var retValue = "";
    switch (categoryConstname) {
        case "SYSDEPT":
            $.ajax({
                async: false,
                url: rootPath + "Sys_dept/GetDeptChinaname.do",
                data: { deptid: value },
                success: function (result) {
                    if (result && result.iserror)
                        retValue = "";
                    else
                        retValue = result;
                }
            });
            break;
        case "SYSUSER":
            $.ajax({
                async: false,
                url: rootPath + "Sys_user/GetUserChinaname.do",
                data: { userid: value },
                success: function (result) {
                    if (result && result.iserror)
                        retValue = "";
                    else
                        retValue = result;
                }
            });
            break;
        default:
            $(sourceDatas).each(function (index, item) {
                if (item.value == value) {
                    retValue = item.text;
                    return false; //返回false终止循环，返回true进入下次循环
                }
            });
            break;
    }
    return retValue;
}
//创建子表
function creatSubTable(subTable) {
    var constName = $(subTable).attr("constname");
    var gridDefault = { queryParams: { relationshiprecord: relationShipRecord }, onDblClickRow: dblClickSubTableRow, onRowContextMenu: subTableContextMenu };
    //判断是否需要创建工具条
    if ($(subTable).attr("showToolBar") && $(subTable).attr("showToolBar") == "true" && relationShipRecord != "") {
        if ($("#subTable_" + constName).length == 0) {//如果按钮工具条不存在则创建。
            var subTableToolBar = "";
            subTableToolBar += "<div id=\"subTable_" + constName + "\"  class=\"datagrid-toolbar\">";
            subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"saveSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-save'\">保存</a>";
            subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"creatSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-add'\">新增</a>";
            subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"cancelSubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-undo'\">取消</a>";
            subTableToolBar += "<a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"destroySubTailorForm('" + constName + "')\" data-options=\"plain:true,iconCls:'icon-delete'\">删除</a>";
            subTableToolBar += "<font color=red>[友情提醒：双击或右击进入行编辑模式。]</font>";
            subTableToolBar += "</div>";
            $("body").append(subTableToolBar);
            $.parser.parse("#subTable_" + constName);
        }
        gridDefault.toolbar = "#subTable_" + constName;
    }

    GlobalTools.ajax({
        async: false,
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

//双击进行编辑
function dblClickSubTableRow(rowIndex, rowData) {
    var constName = $(this).attr("constname");
    if (!endEditing(constName)) return;
    editingIndex = rowIndex;
    $(this).datagrid("unselectAll");
    $(this).datagrid('beginEdit', rowIndex);
    $(this).datagrid('selectRow', editingIndex);
}

//右键启用行编辑状态
function subTableContextMenu(e, rowIndex, rowData) {
    e.preventDefault(); //取消IE右键事件
    var constName = $(this).attr("constname");
    if (!endEditing(constName)) return;
    editingIndex = rowIndex;
    $(this).datagrid("unselectAll");
    $(this).datagrid('beginEdit', rowIndex);
    $(this).datagrid('selectRow', editingIndex);
}

//结束编辑
function endEditing(constname) {
    var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
    if (editingIndex == undefined) { return true }

    if (objGrid.datagrid('validateRow', editingIndex)) {
        objGrid.datagrid('endEdit', editingIndex);
        editingIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//创建新记录
function creatSubTailorForm(constname) {
    var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
    var newData = objGrid.attr("newdata");
    if (newData != null) newData = eval("(" + newData + ")");

    if (!endEditing(constname)) return;
    objGrid.datagrid("unselectAll");
    objGrid.datagrid('appendRow', newData);

    editingIndex = objGrid.datagrid('getRows').length - 1;
    objGrid.datagrid('beginEdit', editingIndex);
    objGrid.datagrid('selectRow', editingIndex);
}

//取消编辑
function cancelSubTailorForm(constname) {
    var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
    var row = objGrid.datagrid('getSelected');
    if (!row) {
        GlobalTools.tip("请选择记录。");
        return;
    }
    editingIndex = objGrid.datagrid('getRowIndex', row);
    if (row.id > 0) {
        objGrid.datagrid('unselectRow', editingIndex);
        objGrid.datagrid('cancelEdit', editingIndex);
    }
    else {
        objGrid.datagrid('deleteRow', editingIndex);
    }
    editingIndex = undefined;
}

//物理删除数据
function destroySubTailorForm(constname) {
    var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
    var deleteDatas = objGrid.datagrid('getSelections');
    if (!deleteDatas || deleteDatas.length == 0) return;
    $.messager.confirm('操作确认', '确定要彻底销毁选中的记录吗?', function (result) {
        if (result) {
            var idArr = new Array();
            for (index in deleteDatas) {
                idArr.push(deleteDatas[index].id);
            }
            GlobalTools.ajax({
                dataType: "json",
                url: rootPath + objGrid.attr("destroydataaction"),
                data: { constname: constname, ids: idArr.join(',') },
                success: function (result, message) {
                    objGrid.datagrid('reload');
                }
            });
        }
    });
}

//保存子表数据
function saveSubTailorForm(constname) {
    if (checkMainFormDataHandler && typeof (checkMainFormDataHandler) == "function" && !checkMainFormDataHandler()) {
        GlobalTools.tip("请先保存父表单，再保存子表单。");
        return;
    }
    var objGrid = $("table[type='VirtualSubTable'][constname='" + constname + "']");
    if (!endEditing(constname)) return;
    var listData = objGrid.datagrid('getChanges');
    if (!listData || listData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        async: false,
        url: rootPath + objGrid.attr("savedataaction"),
        data: { constname: constname, listData: JSON2.stringify(listData), relationshiprecord: relationShipRecord },
        success: function (data, msg) {
            objGrid.datagrid('reload');
            objGrid.datagrid('acceptChanges');
            objGrid.datagrid('unselectAll');
        }
    });
}
 