var rootPath = "../../../";
var deleteRules =
[
{ id: "YEAR", text: "整年" },
{ id: "TIMESPAN", text: "时间段" },
{ id: "ALL", text: "全部" }
];
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

    $(sourceElement).combobox("setValue", ids);
    $(".combo-text", $(sourceElement).parent()).val(text);
}
//格式化日期列
function formatterCell(value, row, index) {
    return formatDate(value,'yyyy年MM月dd日hh时mm分');
}
//执行查询
function doSearchList() {
    $('#dgOperateLog').datagrid('load', {
        unitid: $('#unitid').combobox('getValue'),
        beg_operatetime: $('#beg_operatetime').datebox('getValue'),
        end_operatetime: $('#end_operatetime').datebox('getValue')
    });
}

/*
删除相关脚本
*/
//高级删除
function advancedDeleteLog() {
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_operationlog/DestroyDataList.do",
        data: { deleteRules: $("#deleteRule").combobox("getValue"), intYear: $("#intYear").combobox("getValue"), begDateTime: $("#beg_time").datebox("getValue"), endDateTime: $("#end_time").datebox("getValue") },
        success: function (data, msg) {
            $('#deleteDialog').window('close');
            $('#dgOperateLog').datagrid('reload');
        }
    });
}
//一般删除
function commodDeleteLog() {
    GlobalTools.destroyGridList($('#dgOperateLog'), { url: rootPath + "Sys_operationlog/DestroyList.do" });
}
//打开日志删除对话框
function showDialog() { 
    $('#deleteDialog').window({ href: rootPath + 'platform/SystemManager/SystemLogManager/SelectDate_page.htm' });
    $('#deleteDialog').window('open');
}
//初始化删除日志对话框
function loadDeleteDialog() {
    $("#TR_IntYear").hide();
    $("#TR_TimeSpan").hide();
    $("#intYear").combobox({
        url: rootPath + "Sys_operationlog/LoadDataYears.do", 
        panelHeight: 'auto',
        valueField: 'id',
        textField: 'text'
    });
}
//删除规则事件
function selectRule(record) {
    switch (record.id) {
        case "YEAR":
            $("#TR_IntYear").show();
            $("#TR_TimeSpan").hide();           
            break;
        case "TIMESPAN":
            $("#TR_IntYear").hide();
            $("#TR_TimeSpan").show();
            break;
        case "ALL":
            $("#TR_IntYear").hide();
            $("#TR_TimeSpan").hide();
            break;
        default: break;
    }
}