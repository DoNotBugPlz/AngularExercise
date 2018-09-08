var rootPath = "../../"; //根目录路径
var currentTableName = "notice";//表名Request("tablename")
var constname = "const_notice";//常量标识Request("const_notice")
var pagelist = {};//查询列表基础信息
var pagelistcols = [];//查询列配置列表信息
var currentId = 0; //当前表主键标识
var queryParam = {};//查询条件对象
var ispreview = !Request("ispreview")?false:Request("ispreview");//是否是预览状态，默认不是

$(function () {
	//获取查询列表基础信息sys_pagelist
	getPagelist();
	//动态构造查询列表datagrid
    buildSearchList();
});

//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ id: "selectDept", rootPath: rootPath, sigleSelect: !$(sourceElement).combobox("options").multiple, deptid: "", title: "选择单位" });
    OrganizationTools.dept_ShowSelectDialog({ id: "selectDept", sourceElement: sourceElement,  onOKClick: selectDeptOK });
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
    $(sourceElement).combobox("setText", text);
    $("#dept_" + $(sourceElement).attr("id")).val(ids);
}

//点击  选择人员 可展开的节点，加载子节点
function showUserTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    //初始化人员选择对话框
    OrganizationTools.user_Init({ id: "selectUser", rootPath: rootPath, sigleSelect: !$(sourceElement).combobox("options").multiple, deptid: "", title: "选择人员" });
    OrganizationTools.user_ShowSelectDialog({ id: "selectUser", sourceElement: sourceElement, onOKClick: selectUserOK });
}
//选择人员后回调函数
function selectUserOK(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text += ',';
            ids += ',';
        }
        text += item.text;
        ids += item.id.toString().ReplaceAll("user_", "");
    });
    $(sourceElement).combobox("setText", text);
    $("#user_" + $(sourceElement).attr("id")).val(ids);
}

//获取查询列表基础信息sys_pagelist
function getPagelist(){
	GlobalTools.ajax({
        url: rootPath + "Sys_pagelist/LoadFormByConstname.do?constname="+constname,
        success: function (data) {
        	//查询列表基础信息
        	pagelist = data.sys_pagelist;
        	//获取查询列配置信息sys_pagelistcols
	   		getPagelistcols(pagelist.id);
        }
     });
}

//获取查询列配置列表信息sys_pagelistcols
function getPagelistcols(id){
	$.ajax({
		dataType: 'json',
        type: 'post',
        url: rootPath + "Sys_pagelistcols/LoadPageList.do?pagelistid="+id,
        success: function (data) {
        	//查询列配置列表信息
        	pagelistcols = data.rows;
        	//动态构造form中的控件
		    buildFormField();
        }
     });
}

//动态构造form中的控件
function buildFormField() {
    var $conditionTable = $("#conditionTable"); //获取搜索条件表格
    var keylabelname = undefined; //用于判断是否构造过关键字条件输入框
    var td, categoryconstname;
    var rowIndex = 0,itemCount=0; //筛选条件的行计数，同时作为行的ID
    $.each(pagelistcols, function (index, item) {
        categoryconstname = item.categoryconstname; //字典常量
        if (item.insearch == 1) {//是否列入搜索条件
            if (categoryconstname) { //是绑定字典控件
                switch (categoryconstname) {
                    case 'SYSUSER':
                        //初始化人员选择框
                        td = "<td>" + item.labelname + "：</td><td><intput id='user_" + item.colname + "' type='hidden' /><input class='easyui-combobox' type='text' id='" + item.colname + "' name='" + item.colname + "' colname='" + item.colname + "' constname='" + categoryconstname + "' data-options='multiple:" + (item.ismultiselect == 0 ? false : true) + ",onShowPanel:showUserTreeGrid' style='width: " + Number(item.controlwidth) + "px;' /></td>";
                        break;
                    case 'SYSDEPT':
                        //初始化部门选择框
                        td = "<td>" + item.labelname + "：</td><td><intput id='dept_" + item.colname + "' type='hidden' /><input class='easyui-combobox' type='text' id='" + item.colname + "' name='" + item.colname + "' colname='" + item.colname + "' constname='" + categoryconstname + "' data-options='multiple:" + (item.ismultiselect == 0 ? false : true) + ",onShowPanel:showDeptTreeGrid' style='width: " + Number(item.controlwidth) + "px;' /></td>";
                        break;
                    default:
                        td = "<td>" + item.labelname + "：</td><td><input class='easyui-combobox' type='text' id='" + item.colname + "' name='" + item.colname + "' colname='" + item.colname + "' constname='" + categoryconstname + "' data-options=\"multiple:" + (item.ismultiselect == 0 ? false : true) + ",url:'" + rootPath + "Sys_categoryvalue/GetCategoryValues.do?constname=" + categoryconstname + "',valueField: 'id',textField: 'chinaname',panelHeight: 'auto'\" style='width: " + Number(item.controlwidth) + "px;' /></td>";
                        break;
                }
            }
            else if (item.coltype == "datetime") {//如果是日期列
                itemCount++; //遇到日期加1，为了避免开始时间和结束时间被跨行显示
                if (item.showtime == 1) {//带时间
                    td = "<td>" + item.labelname + "：</td><td>" +
    				"<input class='easyui-datetimebox'  id='start_" + item.colname + "' name='start_" + item.colname + "' colname='" + item.colname + "' data-options='editable: false,formatter: formatNormalDateTime' style='width: " + Number(item.controlwidth) + "px;' />" +
    				" </td><td>&nbsp;&nbsp;至&nbsp;&nbsp;</td><td><input  class='easyui-datetimebox' id='end_" + item.colname + "' name='end_" + item.colname + "' colname='" + item.colname + "'  data-options='editable: false,formatter: formatNormalDateTime' style='width: " + Number(item.controlwidth) + "px;' />" +
    				"</td>";
                }
                else {//不带时间
                    td = "<td>" + item.labelname + "：</td><td>" +
    				"<input class='easyui-datebox'  id='start_" + item.colname + "' name='start_" + item.colname + "' colname='" + item.colname + "' data-options='editable: false,formatter: formatNormalDate' style='width: " + Number(item.controlwidth) + "px;' />" +
    				" </td><td>&nbsp;&nbsp;至&nbsp;&nbsp;</td><td><input  class='easyui-datebox' id='end_" + item.colname + "' name='end_" + item.colname + "' colname='" + item.colname + "'  data-options='editable: false,formatter: formatNormalDate' style='width: " + Number(item.controlwidth) + "px;' />" +
    				"</td>";
                }
            }
            else if (item.iskey == 1) {//如果该列是关键字
                if (!keylabelname) {//如果还没有构造过关键字条件输入框
                    keylabelname = item.colname;
                    td = "<td>关键字：</td><td><input class='easyui-validatebox' id='_key_' name='_key_' colname='_key_'  style='width: " + Number(item.controlwidth) + "px;' /></td>";
                }
                else {
                    return true;
                }
            }
            else {//既不是字典也不是日期也不是关键字
                td = "<td>" + item.labelname + "：</td><td><input class='easyui-validatebox' id='" + item.colname + "'  name='" + item.colname + "' colname='" + item.colname + "' style='width: " + Number(item.controlwidth) + "px;' /></td>";
            }

            //控制换行
            if (itemCount % 5 == 0) {//每4列换一行
                rowIndex++;
                $conditionTable.append("<tr id=tr_" + rowIndex + ">" + td + "</tr>");
            }
            else {
                $("#tr_" + rowIndex).append(td);
            }
            itemCount++;
        }
    });

    //构造搜索按钮
    if (itemCount % 5 == 0) {//每4列换一行,遇到日期直接换行
        $conditionTable.append("<tr><td colspan=8  align='right'><a href='javascript:void(0)' class='easyui-linkbutton' onclick='doSearch();' data-options=\"iconCls:'icon-search'\" >搜索</a></td></tr>");
    }
    else {
        $("#tr_" + rowIndex).append("<td  colspan=2  align='right'><a href='javascript:void(0)' class='easyui-linkbutton' onclick='doSearch();' data-options=\"iconCls:'icon-search'\" >搜索</a></td>");
    }
    $.parser.parse($conditionTable); //easyui渲染

    if (itemCount == 0) {//表示没有搜索条件，需要重新调整样式以保证列表填满整个页面
        $("#conditionDiv").remove();
        $('div:first').remove();
        $('div:first')[0].style.top = '0px';
    }
}

//动态构造查询列表datagrid
function buildSearchList(){
	GlobalTools.ajax({
        url: rootPath + "Sys_pagelist/LoadSearchlistscript.do?constname="+constname,
        success: function (data) {
        	eval("$('#listDataGrid').datagrid("+data.datagrid+");");
        }
    });
}

//格式化日期，去掉时间
function dateFormatNoTime(value, rowData, rowIndex) {
	return value==null?"":formatterStringToDate(value,"yyyy-MM-dd");
}

//格式化时间
function formatNormalDateTime(datetime) {
    return formatDate(datetime, 'yyyy-MM-dd HH:ss:mm');
}

//格式化状态列
function formatterDelstatusCell(value, rowData, rowIndex) {
    if (value==0 || value==1) {
        return "<img src='../Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
    }
    else return "";
}

/************************************************按钮函数调用********************************************************/
//搜索
function doSearch() {
    var inputObjects = $("form input[id]");
    $.each(inputObjects, function (index, item) {
        item = $(item);
        if (item.attr("type") && item.attr("type") == "hidden") return true; //如果是隐藏框，则跳出本次循环
        //构造搜索条件对象
        if (item.hasClass("easyui-combobox")) {//是字典列
            switch (item.attr("constname").toUpperCase()) {
                case 'SYSUSER':
                    queryParam[item.attr("colname")] = $('#user_' + item.attr("colname")).val();
                    break;
                case 'SYSDEPT':
                    queryParam[item.attr("colname")] = $('#dept_' + item.attr("colname")).val();
                    break;
                default:
                    if (item.ismultiselect > 0) {
                        queryParam[item.attr("colname")] = $('#' + item.attr("colname")).combobox('getValues').join(',');
                    }
                    else {
                        queryParam[item.attr("colname")] = $('#' + item.attr("colname")).combobox('getValue');
                    }
                    break;
            }
        }
        else if (item.hasClass("easyui-datetimebox")) {//时间条件
            queryParam['start_' + item.attr("colname")] = $('#start_' + item.attr("colname")).datetimebox('getValue');
            queryParam['end_' + item.attr("colname")] = $('#end_' + item.attr("colname")).datetimebox('getValue');
        }
        else if (item.hasClass("easyui-datebox")) {//日期条件
            queryParam['start_' + item.attr("colname")] = $('#start_' + item.attr("colname")).datebox('getValue');
            queryParam['end_' + item.attr("colname")] = $('#end_' + item.attr("colname")).datebox('getValue');
        }
        else if (item.hasClass("easyui-validatebox")) {//基本输入框
            queryParam[item.attr("colname")] = $('#' + item.attr("colname")).val();
        }
    });
    $('#listDataGrid').datagrid("reload", { "queryParam": JSON2.stringify(queryParam)});
}

//新增
function addNewData(){
	if(!ispreview){
		currentId = 0;//重置主键
		top.addTab("新增",rootPath + pagelist.addpagehref);//变更Tab
	}
}

//双击行进行编辑
function editData(rowIndex, rowData) {
    if (!ispreview) {
        currentId = rowData.id;
        top.addTab("编辑", rootPath + pagelist.modpagehref + "?recordid=" + currentId); //变更Tab
    }
}

//逻辑删除
function deleteData() {
	if(!ispreview) GlobalTools.deleteGridList($('#listDataGrid'),{url:rootPath + pagelist.forbidpagehref});
}

