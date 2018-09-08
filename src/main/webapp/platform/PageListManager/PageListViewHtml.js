var rootPath = "../../"; //页面根路径
var pagelist = {}; //查询列表基础信息
var pagelistcols = []; //查询列配置列表信息

$(function () {
    getPagelist();
});

//获取列表配置
function getPagelist() {
    GlobalTools.ajax({
        url: rootPath + "Sys_pagelist/LoadFormByConstname.do?constname=" + Request("constname"),
        success: function (data) {
            //查询列表基础信息
            pagelist = data.sys_pagelist;
            //获取查询列配置信息sys_pagelistcols
            getPagelistcols(pagelist.id);
        }
    });
}
//获取查询列配置列表信息sys_pagelistcols
function getPagelistcols(id) {
    $.ajax({
        dataType: 'json',
        type: 'post',
        url: rootPath + "Sys_pagelistcols/LoadPageList.do?pagelistid=" + id,
        success: function (data) {
            //查询列配置列表信息
            pagelistcols = data.rows;
            //动态构造form中的控件
            buildHtmlContent();
        }
    });
}

function buildHtmlContent() {
    var htmlContent = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n"
+ "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n"
+ "<head>\n"
+ "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n"
+ "    <link href=\"" + pagelist.pagerootpath + "platform/ScriptSource/EasyUI/Skins/default/easyui.css\" rel=\"stylesheet\" type=\"text/css\" />\n"
+ "    <link href=\"" + pagelist.pagerootpath + "platform/ScriptSource/EasyUI/Skins/icon.css\" rel=\"stylesheet\" type=\"text/css\" />\n"
+ "    <script src=\"" + pagelist.pagerootpath + "platform/ScriptSource/JQuery/jquery.min.js\" type=\"text/javascript\"></script>\n"
+ "    <script src=\"" + pagelist.pagerootpath + "platform/ScriptSource/JQuery/jquery.form.js\" type=\"text/javascript\"></script>\n"
+ "    <script src=\"" + pagelist.pagerootpath + "platform/ScriptSource/EasyUI/jquery.easyui.min.js\" type=\"text/javascript\"></script>\n"
+ "    <script src=\"" + pagelist.pagerootpath + "platform/ScriptSource/JavaScript/GlobalTools.js\" type=\"text/javascript\"></script>\n"
+ "    <script src=\"" + pagelist.pagerootpath + "platform/ScriptSource/JavaScript/OrganizationTools.js\" type=\"text/javascript\"></script>\n"
+ "    <script language=\"javascript\" type=\"text/javascript\">\n"
+       buildScritp() + "\n"
+ "    </script>\n"
+ "</head>\n"
+ "<body class=\"easyui-layout\" data-options=\"fit:true\">\n"
+       buildFormField() + "\n"
+ "    <div id=\"listDiv\" data-options=\"region:'center',border:false\" >\n"
+ "        <table id=\"listDataGrid\">\n"
+ "        </table>\n"
+ "    </div>\n"
+ "    <div id=\"gridToolBar\" class=\"datagrid-toolbar\">\n"
+ "        <a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"addNewData();\" data-options=\"plain:true,iconCls:'icon-add'\">\n"
+ "            新增</a> <a href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"deleteData();\" data-options=\"plain:true,iconCls:'icon-pause'\">删除</a>\n"
+ "    </div>\n"
+ "</body>\n"
+ "</html>\n";
    $("#preCSharp").text(htmlContent);

    SyntaxHighlighter.highlight();
}

//创建脚本
function buildScritp() {
    var scritp =
" var rootPath = '" + pagelist.pagerootpath + "';//根目录路径\n"
+" var queryParam = {};//查询条件对象\n"
+"$(function () {\n"
+ "    //获取查询列表基础信息sys_pagelist\n"
+ "    buildGridList();\n"
+ "});\n\n"
+ "//打开一个对话框，显示单位和部门treegrid\n"
+ "function buildGridList() {\n"
+ "   var gridConfig = " + pagelist.searchlistscript.ReplaceAll("},", "},\n") + ";\n"
+ "   $('#listDataGrid').datagrid(gridConfig);\n"
+ " }\n\n"
+ "//打开一个对话框，显示单位和部门treegrid\n"
+ "function showDeptTreeGrid() {\n"
+ "    var sourceElement = this;\n"
+ "    $(sourceElement).combobox('hidePanel');\n"
+ "     $(sourceElement).combobox('hidePanel');\n"
+ "     //初始化组织机构选择对话框\n"
+ "     OrganizationTools.dept_Init({ id: 'selectDept', rootPath: rootPath, sigleSelect: !$(sourceElement).combobox('options').multiple, deptid: '', title: '选择单位' });\n"
+ "     OrganizationTools.dept_ShowSelectDialog({ id: 'selectDept', sourceElement: sourceElement,  onOKClick: selectDeptOK });\n"
+ " }\n\n"
+ "//选择组织机构后回调函数\n"
+ "function selectDeptOK(treeNodes, sourceElement) {\n"
+ "    var text = '', ids = '';\n"
+ "    $.each(treeNodes, function (index, item) {\n"
+ "        if (ids != '') {\n"
+ "            text += ',';\n"
+ "            ids += ',';\n"
+ "        }\n"
+ "        text += item.text;\n"
+ "        ids += item.id.toString().ReplaceAll('dept_', '');\n"
+ "    });\n"
+ "    $(sourceElement).combobox('setText', text);\n"
+ "    $('#dept_' + $(sourceElement).attr('id')).val(ids);\n"
+ "}\n\n"
+ "//点击  选择人员 可展开的节点，加载子节点\n"
+ "function showUserTreeGrid() {\n"
+ "    var sourceElement = this;\n"
+ "    $(sourceElement).combobox('hidePanel');\n"
+ "    //初始化人员选择对话框\n"
+ "    OrganizationTools.user_Init({ id: 'selectUser', rootPath: rootPath, sigleSelect: !$(sourceElement).combobox('options').multiple, deptid: '', title: '选择人员' });\n"
+ "    OrganizationTools.user_ShowSelectDialog({ id: 'selectUser', sourceElement: sourceElement, onOKClick: selectUserOK });\n"
+ "}\n\n"
+ "//选择人员后回调函数\n"
+ "function selectUserOK(treeNodes, sourceElement) {\n"
+ "    var text = '', ids = '';\n"
+ "    $.each(treeNodes, function (index, item) {\n"
+ "        if (ids != '') {\n"
+ "            text += ',';\n"
+ "            ids += ',';\n"
+ "        }\n"
+ "        text += item.text\n;"
+ "        ids += item.id.toString().ReplaceAll('user_', '');\n"
+ "    });\n"
+ "    $(sourceElement).combobox('setText', text);\n"
+ "    $('#user_' + $(sourceElement).attr('id')).val(ids);\n"
+ "}\n\n"
+ "//格式化日期，去掉时间\n"
+ "function dateFormatNoTime(value, rowData, rowIndex) {\n"
+ "	return value==null?'':formatterStringToDate(value,'yyyy-MM-dd');\n"
+ "}\n\n"
+ "//格式化时间\n"
+ "function formatNormalDateTime(datetime) {\n"
+ "    return formatDate(datetime, 'yyyy-MM-dd HH:ss:mm');\n"
+ "}\n\n"
+ "//格式化状态列\n"
+ "function formatterDelstatusCell(value, rowData, rowIndex) {\n"
+ "    if (value) {\n"
+ "        return '<img src=' + rootPath + 'platform/Styles/ButtonIcons/' + (value && value > 0 ? 'busy.gif' : 'check.gif') + '>';\n"
+ "    }\n"
+ "    else return '';\n"
+ "}\n\n"
+ "/************************************************按钮函数调用********************************************************/\n"
+ "//搜索\n"
+ "function doSearch() {\n"
+ "    var inputObjects = $('form input[id]');\n"
+ "    $.each(inputObjects, function (index, item) {\n"
+ "        item = $(item);\n"
+ "        if (item.attr('type') && item.attr('type') == 'hidden') return true; //如果是隐藏框，则跳出本次循环\n"
+ "        //构造搜索条件对象\n"
+ "        if (item.hasClass('easyui-combobox')) {//是字典列\n"
+ "            switch (item.attr('constname').toUpperCase()) {\n"
+ "                case 'SYSUSER':\n"
+ "                    queryParam[item.attr('colname')] = $('#user_' + item.attr('colname')).val();\n"
+ "                    break;\n"
+ "                case 'SYSDEPT':\n"
+ "                    queryParam[item.attr('colname')] = $('#dept_' + item.attr('colname')).val();\n"
+ "                    break;\n"
+ "                default:\n"
+ "                    if (item.ismultiselect > 0) {\n"
+ "                        queryParam[item.attr('colname')] = $('#' + item.attr('colname')).combobox('getValues').join(',');\n"
+ "                    }\n"
+ "                    else {\n"
+ "                        queryParam[item.attr('colname')] = $('#' + item.attr('colname')).combobox('getValue');\n"
+ "                    }\n"
+ "                    break;\n"
+ "            }\n"
+ "        }\n"
+ "        else if (item.hasClass('easyui-datetimebox')) {//时间条件\n"
+ "            queryParam['start_' + item.attr('colname')] = $('#start_' + item.attr('colname')).datetimebox('getValue');\n"
+ "            queryParam['end_' + item.attr('colname')] = $('#end_' + item.attr('colname')).datetimebox('getValue');\n"
+ "        }\n"
+ "        else if (item.hasClass('easyui-datebox')) {//日期条件\n"
+ "            queryParam['start_' + item.attr('colname')] = $('#start_' + item.attr('colname')).datebox('getValue');\n"
+ "            queryParam['end_' + item.attr('colname')] = $('#end_' + item.attr('colname')).datebox('getValue');\n"
+ "        }\n"
+ "        else if (item.hasClass('easyui-validatebox')) {//基本输入框\n"
+ "            queryParam[item.attr('colname')] = $('#' + item.attr('colname')).val();\n"
+ "        }\n"
+ "    });\n"
+ "    $('#listDataGrid').datagrid('reload', { 'queryParam': JSON2.stringify(queryParam) });\n"
+ "}\n\n"
+ "//新增\n"
+ "function addNewData(){\n"
+ "		currentId = 0;//重置主键\n"
+ "		top.addTab('新增',rootPath + pagelist.addpagehref);//变更Tab\n"
+ "}\n\n"
+ "//双击行进行编辑\n"
+ "function editData(rowIndex, rowData){\n"
+ "		currentId = rowData.id;\n"
+ "		top.addTab('编辑',rootPath + pagelist.modpagehref +'?recordid='+currentId);//变更Tab\n"
+ "}\n\n"
+ "//逻辑删除\n"
+ "function deleteData() {\n"
+ "     GlobalTools.deleteGridList($('#listDataGrid'),{url:rootPath + pagelist.forbidpagehref});\n"
+ "}\n\n";

return scritp;
}

//动态构造form中的控件
function buildFormField() {
    var $conditionTable = $("<table id='conditionTable'  cellspacing=10 cellpadding=0 border=0></table>"); //获取搜索条件表格
    var queryButton = undefined; //用于判断搜索按钮是否构造
    var keylabelname = undefined; //用于判断是否构造过关键字条件输入框
    var td, categoryconstname;
    var rowIndex = 0, itemCount = 0; //筛选条件的行计数，同时作为行的ID

    //调整conditionDiv高度
    $.each(pagelistcols, function (index, item) {
        categoryconstname = item.categoryconstname; //字典常量
        if (item.insearch == 1) {//是否列入搜索条件
            if (categoryconstname) { //是绑定字典控件
                switch (categoryconstname) {
                    case 'SYSUSER':
                        //初始化人员选择框
                        td = "<td>" + item.labelname + "：</td>\n<td><intput id='user_" + item.colname + "'type='hidden' /><input class='easyui-combobox' type='text' id='" + item.colname + "' name='" + item.colname + "' colname='" + item.colname + "' constname='" + categoryconstname + "'  data-options='multiple:" + (item.ismultiselect == 0 ? false : true) + ",onShowPanel:showUserTreeGrid' style='width: " + Number(item.controlwidth) + "px;' /></td>\n";
                        break;
                    case 'SYSDEPT':
                        //初始化部门选择框
                        td = "<td>" + item.labelname + "：</td>\n<td><intput id='dept_" + item.colname + "' type='hidden' /><input class='easyui-combobox' type='text' id='" + item.colname + "' name='" + item.colname + "'  colname='" + item.colname + "' constname='" + categoryconstname + "'  data-options='multiple:" + (item.ismultiselect == 0 ? false : true) + ",onShowPanel:showDeptTreeGrid' style='width: " + Number(item.controlwidth) + "px;' /></td>\n";
                        break;
                    default:
                        td = "<td>" + item.labelname + "：</td>\n<td><input class='easyui-combobox' type='text' id='" + item.colname + "' name='" + item.colname + "'  colname='" + item.colname + "' constname='" + categoryconstname + "'  data-options=\"multiple:" + (item.ismultiselect == 0 ? false : true) + ",url:'" + rootPath + "Sys_categoryvalue/GetCategoryValues.do?constname=" + categoryconstname + "',valueField: 'id',textField: 'chinaname',panelHeight: 'auto'\" style='width: " + Number(item.controlwidth) + "px;' /></td>\n";
                        break;
                }
            }
            else if (item.coltype == "datetime") {//如果是日期列
                itemCount++;
                if (item.showtime == 1) {//带时间
                    td = "<td>" + item.labelname + "：</td>\n<td>" +
    				"<input class='easyui-datetimebox'  id='start_" + item.colname + "' name='start_" + item.colname + "'  colname='" + item.colname + "' data-options='editable: false,formatter: formatNormalDateTime' style='width: " + Number(item.controlwidth) + "px;' />" +
    				" </td>\n<td>&nbsp;&nbsp;至&nbsp;&nbsp;</td>\n<td><input  class='easyui-datetimebox' id='end_" + item.colname + "' name='end_" + item.colname + "'  colname='" + item.colname + "' data-options='editable: false,formatter: formatNormalDateTime' style='width: " + Number(item.controlwidth) + "px;' />" +
    				"</td>\n";
                }
                else {//不带时间
                    td = "<td>" + item.labelname + "：</td>\n<td>" +
    				"<input class='easyui-datebox'  id='start_" + item.colname + "' name='start_" + item.colname + "' colname='" + item.colname + "' data-options='editable: false,formatter: formatNormalDate' style='width: " + Number(item.controlwidth) + "px;' />" +
    				" </td>\n<td>&nbsp;&nbsp;至&nbsp;&nbsp;</td>\n<td><input  class='easyui-datebox' id='end_" + item.colname + "' name='end_" + item.colname + "'  colname='" + item.colname + "' data-options='editable: false,formatter: formatNormalDate' style='width: " + Number(item.controlwidth) + "px;' />" +
    				"</td>\n";
                }
            }
            else if (item.iskey == 1) {//如果该列是关键字,并且还没有构造过关键字条件输入框
                if (!keylabelname) {
                    keylabelname = item.colname;
                    td = "<td>关键字：</td>\n<td><input class='easyui-validatebox' id='_key_' name='_key_'  colname='_key_'  style='width: " + Number(item.controlwidth) + "px;' /></td>";
                }
                else {
                    return true;
                }
            }
            else {//既不是字典也不是日期也不是关键字
                td = "<td>" + item.labelname + "：</td>\n<td><input class='easyui-validatebox' id='" + item.colname + "'  name='" + item.colname + "'  colname='" + item.colname + "'  style='width: " + Number(item.controlwidth) + "px;' /></td>";
            }

            //控制换行
            if (itemCount % 4 == 0) {//每3列换一行,遇到日期直接换行
                rowIndex++;
                $conditionTable.append("<tr id=tr_" + rowIndex + ">\n" + td + "\n</tr>\n");
            }
            else {
                $("#tr_" + rowIndex, $conditionTable).append(td);
            }
            itemCount++;
        }
    });
    //构造搜索按钮
    if (itemCount % 4 == 0) {//每3列换一行,遇到日期直接换行
        $conditionTable.append("<tr><td colspan=8  align='right'><a href='javascript:void(0)' class='easyui-linkbutton' onclick='doSearch();' data-options=\"iconCls:'icon-search'\" >搜索</a></td></tr>\n");
    }
    else {
        $("#tr_" + rowIndex, $conditionTable).append("<td  colspan=2  align='right'><a href='javascript:void(0)' class='easyui-linkbutton' onclick='doSearch();' data-options=\"iconCls:'icon-search'\" >搜索</a></td>\n");
    }

    if (itemCount == 0) {//表示没有搜索条件，需要重新调整样式以保证列表填满整个页面
        return "";
    }
    else {
        return "<div id=\"conditionDiv\" name=\"conditionDiv\" data-options=\"region:'north',border:false\" style=\"height:120px\" >\n"
        + "        <form method=\"post\">\n"
        + "        <table id=\"conditionTable\"  cellspacing=\"10\" cellpadding=0 border=0>\n"
        + $conditionTable.html()
        + "        </table>\n"
        + "        </form>\n"
        + "    </div>\n";
    }
}

