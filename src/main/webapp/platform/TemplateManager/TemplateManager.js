/*
全局变量定义
*/
var rootPath = "../../"; //页面根路径
var editingIndex; //记录正则编辑的行
var currentTableName = ""; //当前物理表名称
var currentTemplateid = 0; //当前模板主键标识
var currentUnitID = 0; //当前单位主键标识
var colDatas = [];
//因为页面闪烁原因，暂时关闭列表分页控件的单页数量设置选择框
//$.fn.pagination.defaults.showPageList = false;
$(function () {
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK });
});
/*
书签列表相关脚本
*/
//单击物理表列表行，加载模板
function clickTablesRow(row) {
    switch (row.showtype) {
        case "tableinfo":
            currentTableName = row.id;
            InitialBookMarkColDatas();
            $('#dgBookMark').datagrid('load', {
                tablename: currentTableName
            });
            updateTemplateListTab();

            break;
        case "addlistconfig":
            break;
    }
}

/*
书签列表相关脚本
*/
//初始化书签使用字段
function InitialBookMarkColDatas() {
    $.ajax({
        type: "GET",
        async: false,
        url: rootPath + 'Sys_colsremark/LoadColsByTableName.do?tablename=' + currentTableName,
        success: function (data) {
            colDatas = data;
        },
        error: function (message) {
            GlobalTools.tip("获取模板列出错：" + message);
        }
    });
}
//格式化是否禁用单元格
function formatterBookMarkCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
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

//结束编辑
function endEditing() {
    if (editingIndex == undefined) { return true }
    if ($('#dgBookMark').datagrid('validateRow', editingIndex)) {
        $('#dgBookMark').datagrid('endEdit', editingIndex);
        editingIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//双击行进行编辑
function bookMarkDblClickRow(rowIndex, rowData) {
    $('#dgBookMark').datagrid("unselectAll");
    $('#dgBookMark').datagrid('selectRow', rowIndex);
    if (editingIndex == rowIndex) return;
    if (!endEditing()) return;
    editingIndex = rowIndex;
    $('#dgBookMark').datagrid('beginEdit', editingIndex);
    var editor = $('#dgBookMark').datagrid('getEditor', { index: editingIndex, field: 'colname' });
    $(editor.target).combobox('loadData', colDatas);
}

//进行编辑
function editBookMark() {
    if (!endEditing()) return;
    var row = $('#dgBookMark').datagrid('getSelected');
    if (row) {
        editingIndex = $('#dgBookMark').datagrid('getRowIndex', row);
        $('#dgBookMark').datagrid('beginEdit', editingIndex);
        var editor = $('#dgBookMark').datagrid('getEditor', { index: editingIndex, field: 'colname' });
        $(editor.target).combobox('loadData', colDatas);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}

//取消编辑
function cancelEditBookMark() {
    var row = $('#dgBookMark').datagrid('getSelected');
    if (!row) {
        GlobalTools.tip("请选择记录。");
        return;
    }
    editingIndex = $('#dgBookMark').datagrid('getRowIndex', row);
    if (row.id > 0) {
        $('#dgBookMark').datagrid('cancelEdit', editingIndex);
    }
    else {
        $('#dgBookMark').datagrid('deleteRow', editingIndex);
    }
    editingIndex = undefined;
}

//新增书签
function creatNewBookMark() {
    if (currentTableName == "") {
        GlobalTools.tip("请选择一个物理表");
        return;
    }
    if(!endEditing())return;
    $('#dgBookMark').datagrid("unselectAll");
    $('#dgBookMark').datagrid('appendRow', { id: null,
        delstatus: 0,
        constname: "",
        chinaname: "",
        tablename: currentTableName,
        colname: "",
        description: ""
    });
    editingIndex = $('#dgBookMark').datagrid('getRows').length - 1;
    $('#dgBookMark').datagrid('beginEdit', editingIndex);
    $('#dgBookMark').datagrid('selectRow', editingIndex);
    var editor = $('#dgBookMark').datagrid('getEditor', { index: editingIndex, field: 'colname' });
    $(editor.target).combobox('loadData', colDatas);
}

//保存模板字段配置信息
function saveBookMarkData() {
    if (!endEditing()) return;
    var changesData = $('#dgBookMark').datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_bookmark/SaveForm.do",
        data: { changeDatas: JSON2.stringify(changesData) },
        success: function (data, msg) {
            $('#dgBookMark').datagrid('reload');
            $('#dgBookMark').datagrid('acceptChanges');
        }
    });
}

//禁用书签
function deleteBookMark() {
    GlobalTools.deleteGridList($('#dgBookMark'), { url: rootPath + "Sys_bookmark/DeleteList.do" });
}
//启用书签
function unDeleteBookMark() {
    GlobalTools.unDeleteGridList($('#dgBookMark'), { url: rootPath + "Sys_bookmark/UnDeleteList.do" });
}
//销毁书签
function destroyBookMark() {
    GlobalTools.destroyGridList($('#dgBookMark'), { url: rootPath + "Sys_bookmark/DestroyList.do" });
}


/*
模板列表相关脚本
*/
//格式化是否禁用单元格
function formatterTemplateCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}
//查询
function searchTemplateList() {
    $('#dgTemplate').datagrid('load', {
        keyname: $('#keyname').val(),
        unitid: $('#searchUnitid').val()
    });
}
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
            $("#TemplateUnitid").val(ids);
            break;
        case "searchUnitName":
            $("#searchUnitid").val(ids);
            break;
    }
}
//新增
function creatTemplate() {
    if (currentTableName == "") {
        GlobalTools.tip("请选择一个物理表");
        return;
    }
    currentTemplateid = 0;
    //变更模板基本信息Tab
    changeTemplateDesignTab();
}
//双击行进行编辑
function templateDblClickRow(rowIndex, rowData) {
    currentTemplateid = rowData.id;
    currentTableName = rowData.tablename;
    //变更模板基本信息Tab
    changeTemplateDesignTab();
}
//禁用电子模板
function deleteTemplate() {
    GlobalTools.deleteGridList($('#dgTemplate'), { url: rootPath + "Sys_booktemplate/DeleteList.do" });
}
//启用电子模板
function unDeleteTemplate() {
    GlobalTools.unDeleteGridList($('#dgTemplate'), { url: rootPath + "Sys_booktemplate/UnDeleteList.do" });
}

/*
模板编辑相关脚本
*/
//变更模板信息Tab
function changeTemplateDesignTab() {
    $('#divTab').tabs({
        onBeforeClose: function (title, index) {
            frameTemplateDesign.window.checkDocumentStatus();//火狐某些版本下会出现找不到checkDocumentStatus方法的问题
            return false; //组织关闭
        }
    });
    if (!$('#divTab').tabs('exists', "模板设计")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "模板设计",
            id: "newTemplate",
            closable: true,
            content: '<iframe id="frameTemplateDesign" name="frameTemplateDesign" scrolling="auto" frameborder="0"  src="' + rootPath + 'platform/TemplateManager/TemplateDesign.htm?tablename=' + currentTableName + '&templateid=' + currentTemplateid + '"  style="width:100%;height:100%;"></iframe>',
            onLoad: loadTemplate
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "模板设计");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "模板设计"),
            options: {
                closable: true,
                content: '<iframe id="frameTemplateDesign" name="frameTemplateDesign" scrolling="auto" frameborder="0"  src="' + rootPath + 'platform/TemplateManager/TemplateDesign.htm?tablename=' + currentTableName + '&templateid=' + currentTemplateid + '"  style="width:100%;height:100%;"></iframe>',
                onLoad: loadTemplate
            }
        });
    }
}
function closeTemplateDesignTab() {
    //取消模板设计Tab的关闭前事件
    $('#divTab').tabs({onBeforeClose: function (title, index) {}});
    $('#divTab').tabs('close', "模板设计");
}

//更新模板列表
function updateTemplateListTab() {
    $('#divTab').tabs('update', {
        tab: $('#divTab').tabs('getTab', "模板列表"),
        options: {
            href: rootPath + "platform/TemplateManager/TemplateList.htm"
        }
    });
}
//加载模板信息数据
function loadTemplate() {
    GlobalTools.loadForm($("#Template"), {
        url: rootPath + 'Sys_booktemplate/LoadForm.do?templateid=' + currentTemplateid, isNormalModel: false
    }, loadComplete);
}

//模板数据加载完成后
function loadComplete(data) {
    if ($("#tablename").val() == "") $("#tablename").val(currentTableName);
}
//保存模板基本信息
function saveTemplate() {
    GlobalTools.submitForm($("#Template"), {
        success: function (data) {
            currentTemplateid = data.templateid;
            $("#templateid").val(data.templateid);
            updateTemplateListTab();
            GlobalTools.tip("保存成功！");
        },
        error: function (message) {
            GlobalTools.tip("保存失败！原因：" + message);
        }
    });
}
function refreshList(){
	$('#dgTemplate').datagrid('load');
}