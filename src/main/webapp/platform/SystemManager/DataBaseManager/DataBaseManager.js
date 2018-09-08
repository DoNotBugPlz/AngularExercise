/*
全局变量定义
*/
var rootPath = "../../../"; //页面根路径
var currentTableName = ""; //当前物理表名称

/*
物理表列表相关脚本
*/
//单击物理表列表行，加载表单
function clickTablesRow(row) {
    switch (row.showtype) {
        case "tableinfo":
            currentTableName = row.id;
            searchTable = row.id;
            //初始化查询条件使用字段
            initSearchColList(); //初始化查询条件使用的列
            $('#divTab').tabs('select', "子表列表");
            updateSubTailorFormListTab(); //添加子表列表TAB
            break;
        case "addlistconfig":
            break;
    }
}

//更新子表列表
function updateSubTailorFormListTab() {
    var temp = $('#divTab').tabs('getTab', "数据管理");

    $('#divTab').tabs('update', {
        tab: $('#divTab').tabs('getTab', "数据管理"),
        options: {
            href: rootPath + "platform/SystemManager/DataBaseManager/TableDataList.htm"
        }
    });
}

//根据选择的列进行动态创建列表
function creatDataGrid() {
    var colNameList = $("#colListConfig").combobox("getValues");
    var colTextList = $("#colListConfig").combobox("getText").split(',');

    var columns = []; 
    var column = {};
    column.field = "ck";
    column.checkbox = true;
    columns.push(column);
    for (var index = 0; index < colNameList.length; index++) {
        var column = {};
        column.field = colNameList[index];
        column.title = colTextList[index];
        column.width = 50;
        column.halign = 'center';
        columns.push(column);
    }

    $("#dgDataList").datagrid({
        url: rootPath + "Form/LoadDataWareHousePageList.do",
        queryParams:{tablename:currentTableName,collist:colNameList.join(',')},
        fit: true,
        border: false,
        loadMsg: '数据加载中……',
        fitColumns: true,
        rownumbers: true,
        pageSize: 20,
        pagination: true,
        idField: 'id',
        toolbar: '#subTailorFormListToolBar',
        columns: [columns],
        onLoadError: gridLoadError
    });
}

//根据查询条件查询数据
function doSearch() {
    var colNameList = $("#colListConfig").combobox("getValues");
    if (colNameList.length == 0) {
        GlobalTools.tip("请设置数据表展示列！");
        return false;
    }
    var parms = getCondition();
    $('#dgDataList').datagrid('load', {
        filterRules: JSON2.stringify(parms),
        tablename: currentTableName, 
        collist: colNameList.join(',')
    });
}

//禁用数据
function deleteDatas() {
    GlobalTools.deleteGridList($('#dgDataList'), { url: rootPath + "Form/DeleteDataWareHouseDataList.do", data: { tablename: currentTableName} });
}
//启用数据
function unDeleteDatas() {
    GlobalTools.unDeleteGridList($('#dgDataList'), { url: rootPath + "Form/UnDeleteDataWareHouseDataList.do", data: { tablename: currentTableName} });
}
//彻底销毁数据
function destroyDatas() {
    GlobalTools.unDeleteGridList($('#dgDataList'), { url: rootPath + "Form/DestroyDataWareHouseDataList.do", data: { tablename: currentTableName} });
}
