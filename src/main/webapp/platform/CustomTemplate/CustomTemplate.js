/*
全局变量定义
*/
var rootPath = "../../"; //页面根路径
var editingIndex; //记录正则编辑的行
var currentTemplateid = 0; //当前模板主键标识
var currentUnitID = 0; //当前单位主键标识
var colDatas = [];

//格式化是否禁用单元格
function formatterBookMarkCell(value, row, index) {
    return "<img src='../Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}

//格式化字段单元格
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


/*
模板列表相关脚本
*/
//格式化是否禁用单元格
function formatterTemplateCell(value, row, index) {
    return "<img src='../Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
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

//双击行进行编辑
function templateDblClickRow(rowIndex, rowData) {
    currentTemplateid = rowData.id;

    //变更模板基本信息Tab
    changeTemplateDesignTab(rowData.chinaname + "模板编辑", rowData.templatetype);
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
function changeTemplateDesignTab(title, filetype) {
    top.addTab(title,'CustomTemplateDesign.htm?templateid=' + currentTemplateid + "&filetype=" + filetype);
}
function closeTemplateDesignTab() {
    //取消模板设计Tab的关闭前事件
    $('#divTab').tabs({ onBeforeClose: function (title, index) { } });
    $('#divTab').tabs('close', "模板设计");
}

//更新模板列表
function updateTemplateListTab() {
    top.refreshTab("自定义模板管理",  "CustomTemplate_list.htm");
}

//新增
function creatTemplate(templatetype) {
    currentTemplateid = 0;
    //变更模板基本信息Tab
    changeTemplateDesignTab("新增" + templatetype + "模板", templatetype);
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