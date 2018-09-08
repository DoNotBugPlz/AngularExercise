/*
全局变量定义
*/
var rootPath = "../../"; //页面根路径
var editIndex = undefined; //记录当前编辑的行id
var tempId = 0; //用于构造新增行的临时id，持久化之前始终是负数
var destroyIdArray = [];//用于记录持久化过的待删除的行记录
var isOrNoDatas = [{ id: 0, value: '0', text: '否' }, { id: 1, value: '1', text: '是'}]; //定义boolean类型下拉框数据源
var collectRuleData = [{ value: 'sum', text: '求和' }, { value: 'avg', text: '平均值'}];
var currentTableName = ""; //当前物理表名称
var currentPageListid = 0; //当前配置列表主键标识
var colDatas = []; //自定义列表使用的列

var columnIndex = {
colnameIndex : 0,  //字段名列索引
showtimeIndex : 6,  //显示时间列索引
enablecollectIndex : 8,  //启用汇总列索引
collectruleIndex: 9,  //汇总规则列索引
insearchIndex: 10,  //搜索条件列索引
labelname:11,//条件标签列索引
controlwidth:12,//条件控件宽度列索引
compareoptionIndex : 13,  //比较符列索引
iskeyIndex : 14,  //关键字列索引
ismultiselectIndex : 15};  //多选列索引

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
        case "chinaname":
            $("#unitid").val(ids);
            break;
        case "searchUnitName":
            $("#searchUnitid").val(ids);
            break;
    }
}

/*
组织机构树相关脚本
*/
//单击物理表列表行，加载配置列表
function clickTablesRow(row) {
    switch (row.showtype) {
        case "tableinfo":
            currentTableName = row.id;
            $('#divTab').tabs('select', "通用查询配置列表");
            updatePageListTab(); //添加通用查询配置列表TAB
            break;
        case "addlistconfig":
            break;
    }
}
//更新通用查询配置列表Tab
function updatePageListTab() {
    var temp = $('#divTab').tabs('getTab', "通用查询配置列表");
    $('#divTab').tabs('update', {
        tab: temp,
        options: {
            href: rootPath + "platform/PageListManager/PageList.htm"
        }
    });
}

/*
pagelist列表相关脚本
*/
//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}
//查询
function searchPageList() {
    $('#dgPageList').datagrid('load', {
        keyname: $('#keyname').val(),
        unitid: $('#searchUnitid').val()
    });
}
//新增
function creatPageList() {
    if (currentTableName == "") {
        GlobalTools.tip("请选择一个物理表");
        return;
    }
    currentPageListid = 0;
    //变更配置列表Tab
    changePageListInfoTab();
}
//修改
function editPageList() {
    var rowData = $('#dgPageList').datagrid('getSelected');
    if (!rowData) {
        GlobalTools.tip("请选择一个配置进行编辑");
        return;
    }
    currentPageListid = rowData.id;
    currentTableName = rowData.tablename;
    //变更配置列表Tab
    changePageListInfoTab();
}

//变更Tab
function changePageListInfoTab() { 
    if (!$('#divTab').tabs('exists', "自定义列表配置")) {//如果不存在，则新增
        $('#divTab').tabs('add', {
            title: "自定义列表配置",
            id: "newPageList",
            href: rootPath + "platform/PageListManager/PageListConfig.htm",
            onLoad: loadForm
        });
    }
    else {//如果存在，则更新
        $('#divTab').tabs('select', "自定义列表配置");
        $('#divTab').tabs('update', {
            tab: $('#divTab').tabs('getTab', "自定义列表配置"),
            options: {
                href: rootPath + "platform/PageListManager/PageListConfig.htm",
                onLoad: loadForm
            }
        });
    }
}

//双击行进行编辑
function tailorFormDblClickRow(rowIndex, rowData) {
    editPageList();
}
//禁用配置列表
function deletePageList() {
    GlobalTools.deleteGridList($('#dgPageList'), { url: rootPath + "Sys_pagelist/DeleteList.do" });
}
//启用配置列表
function undeletePageList() {
    GlobalTools.unDeleteGridList($('#dgPageList'), { url: rootPath + "Sys_pagelist/UnDeleteList.do" });
}

/******************************************************************pagelistconfig*******************************************************/
var number_filterOperationDatas = [//数字_计算规则
				            {id: "equal", value: "equal", text: "等于" },
				            { id: "notequal", value: "notequal", text: "不等于" },
				            { id: "greater", value: "greater", text: "大于" },
				            { id: "greaterorequal", value: "greaterorequal", text: "大于等于" },
				            { id: "less", value: "less", text: "小于" },
				            { id: "lessorequal", value: "lessorequal", text: "小于等于"}];
var varchar_filterOperationDatas = [//文字_计算规则
				            {id: "equal", value: "equal", text: "等于" },
				            { id: "notequal", value: "notequal", text: "不等于" },
				            /*{ id: "isnull", value: "isnull", text: "空值" },
				            { id: "isnotnull", value: "isnotnull", text: "非空值" },*/
				            { id: "like", value: "like", text: "包含文字" },
				            { id: "notlike", value: "notlike", text: "不包含文字" },
				            { id: "startwith", value: "startwith", text: "以…开始" },
				            { id: "endwith", value: "endwith", text: "以…结束"}];
var combox_filterOperationDatas = [//字典_计算规则
				            {id: "equal", value: "equal", text: "等于" },
				            { id: "notequal", value: "notequal", text: "不等于" }];

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
//加载表单
function loadForm() {
    $("#constname").blur(function () {
        var forbidpagehref = $("#forbidpagehref").val();
        if (forbidpagehref.indexOf("?") > 0)
            forbidpagehref = forbidpagehref.substring(0, forbidpagehref.lastIndexOf("?"));
        $("#forbidpagehref").val(forbidpagehref + "?constname=" + $("#constname").val());

        var url = $("#url").val();
        if (url.indexOf("?") > 0)
            url = url.substring(0, url.lastIndexOf("?"));
        $("#url").val(url + "?constname=" + $("#constname").val());
    });
    GlobalTools.loadForm($("#pageListForm"), {
        url: rootPath + "Sys_pagelist/LoadForm.do?pagelistid=" + currentPageListid,
        isNormalModel: false
    }, loadComplete);
}
//表单数据加载完成后
function loadComplete(data) {
    if ($("#tablename").val() == "") $("#tablename").val(currentTableName);
    if ($("#url").val() == "") $("#url").val("Form/LoadPageList.do?constname=");
    if ($("#forbidpagehref").val() == "") $("#forbidpagehref").val("Form/DeleteList.do");
    $("#pageListForm").form("load"); //矫正校验提醒
    initSortDialog(); //初始化排序对话框    
    InitialColDatas(); //初始化子表使用列
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

//格式化水平对齐方式
function formatterAlign(value, rowData, rowIndex) {
	switch (value) {
	case 'left':
		return '左对齐';
	case 'center':
		return '居中对齐';
	case 'right':
		return '右对齐';
	default:
		return '居中对齐';
	}
}

//格式化boolean类型下拉框数据
function formatterIsOrNo(value, rowData, rowIndex) {
	switch (String(value)) {
	case '0':
		return '否';
	case '1':
		return '是';
	default:
		return '否';
	}
}

//格式化比较符列
function formatCompareoption(value, row, index) {
    switch (value) {
        case 'equal':
            return '等于';
        case 'notequal':
            return '不等于';
        case 'greater':
            return '大于';
        case 'greaterorequal':
            return '大于等于';
        case 'less':
            return '小于';
        case 'lessorequal':
            return '小于等于';
       /* case 'isnull':
            return '空值';
        case 'isnotnull':
            return '非空值';*/
        case 'like':
            return '包含文字';
        case 'notlike':
            return '不包含文字';
        case 'startwith':
            return '以…开始';
        case 'endwith':
            return '以…结束';
        default:
            return null;
    }
}

//格式化比较值列
function formatCompareValue(value, rowData, index) {
    var retValue = value;
    if (retValue && rowData.categoryconstname) {
        switch (rowData.categoryconstname.toUpperCase()) {
            case "SYSDEPT": //绑定组织机构字典
                GlobalTools.ajax({
                    async:false,
                    dataType: "json",
                    url: rootPath + "Sys_dept/LoadForm.do",
                    data: { "id": value },
                    success: function (data, msg) {
                        retValue = data.sys_dept.chinaname;
                    }
                });
                break;
            case "SYSUSER": //绑定用户字典
                GlobalTools.ajax({
                    async: false,
                    dataType: "json",
                    url: rootPath + "Sys_user/LoadForm.do",
                    data: { "sys_user.id": value },
                    success: function (data, msg) {
                        retValue = data.sys_user.chinaname;
                    }
                });
                break;
            default: //绑定普通字典
                GlobalTools.ajax({
                    async: false,
                    dataType: "json",
                    url: rootPath + "Sys_category/LoadCategoryValue.do",
                    data: { "constname": rowData.categoryconstname, "refid": value },
                    success: function (data, msg) {
                        if (data)
                            retValue = data.chinaname;
                    }
                });
                break;
        }
    }
    return retValue;
}

//获取指定单元格的编辑器
function getEditor(rowIndex, colIndex) {
    var editors = $('#pageListColsDataGrid').datagrid('getEditors', rowIndex);
    return $(editors[colIndex].target);
}
//双击列表行事件
function onDbClickRowImp(rowIndex, rowData) {
    openEditor(rowIndex, rowData); //激活该行编辑器
}

//激活编辑器
function openEditor(rowIndex, rowData) {
    if (editIndex != rowIndex) {//如果不是同一行,需要关闭其他行的编辑器
        if (!endEditing()) {
            GlobalTools.tip("数据验证未通过，请检查！"); //未能关闭其他行编辑器
            return;
        }
    }
    editIndex = rowIndex; //记录当前行索引
    $('#pageListColsDataGrid').datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex); //选中行并打开编辑器

    getEditor(editIndex, columnIndex.compareoptionIndex).combobox('loadData', getCompareOperationDatas(rowData));

    getEditor(editIndex, columnIndex.colnameIndex).combobox('loadData', colDatas);
    if (rowData) {
        getEditor(editIndex, columnIndex.colnameIndex).combobox('select', rowData.colname);
        getEditor(editIndex, columnIndex.insearchIndex).combobox('select', rowData.insearch);
    }
}


//根据是否搜索条件和列类型，动态修改比较符列、条件标签列、条件控件宽度列编辑器
function changeCompareOption(record) {
    $('#pageListColsDataGrid').datagrid('unselectAll');
    $('#pageListColsDataGrid').datagrid('selectRow',editIndex);
    var rowData = $('#pageListColsDataGrid').datagrid('getSelected');
    if (rowData.coltype=='datetime') {//日期列不需要比较符编辑器
        disableEditor('combobox',editIndex,columnIndex.compareoptionIndex);
        enableEditor('validatebox',editIndex,columnIndex.labelname);
    	enableEditor('numberbox',editIndex,columnIndex.controlwidth);
    }else if(record.value == "0"){//非搜索条件列，禁用比较符列、条件标签列、条件控件宽度列编辑器
        disableEditor('combobox',editIndex,columnIndex.compareoptionIndex);
        disableEditor('validatebox',editIndex,columnIndex.labelname);
        disableEditor('numberbox',editIndex,columnIndex.controlwidth);
    }else {//搜索条件列
    	enableEditor('combobox',editIndex,columnIndex.compareoptionIndex);
    	enableEditor('validatebox',editIndex,columnIndex.labelname);
    	enableEditor('numberbox',editIndex,columnIndex.controlwidth);
    }
}

//禁用编辑器
//type:easyUI编辑器类型; rowIndex:行索引; colIndex:列索引
function disableEditor(type, rowIndex, colIndex) {
    switch (type) {
        case "checkbox":
            getEditor(rowIndex, colIndex).attr("checked", false);
            getEditor(rowIndex, colIndex).attr("disabled", "disabled");
            break;
        case "validatebox":
            getEditor(rowIndex, colIndex).validatebox("disableValidation");
            getEditor(rowIndex, colIndex).val("");
            getEditor(rowIndex, colIndex).attr("disabled", "disabled");
            break;
        case "combobox":
            getEditor(rowIndex, colIndex).combobox("disableValidation");
            getEditor(rowIndex, colIndex).combobox("setValue", "").combobox("setValues", []);
            getEditor(rowIndex, colIndex).combobox("disable");
            break;
        case "numberbox":
            getEditor(rowIndex, colIndex).numberbox("disableValidation");
            getEditor(rowIndex, colIndex).numberbox("setValue", "");
            getEditor(rowIndex, colIndex).numberbox("disable");
            break;
        default:
            GlobalTools.tip("暂不支持该类型控件的禁用！");
            break;
    }
}

//启用编辑器
//type:easyUI编辑器类型; rowIndex:行索引; colIndex:列索引
function enableEditor(type,rowIndex,colIndex){
	switch(type){
	case "validatebox":
		getEditor(rowIndex,colIndex).validatebox("enableValidation");
        getEditor(rowIndex,colIndex).removeAttr("disabled");
		break;
	case "combobox":
		getEditor(rowIndex,colIndex).combobox("enableValidation");
	    getEditor(rowIndex,colIndex).combobox("enable");
		break;
	case "numberbox":
		getEditor(rowIndex,colIndex).numberbox("enableValidation");
	    getEditor(rowIndex,colIndex).numberbox("enable");
		break;
	default:
        GlobalTools.tip("暂不支持该类型控件的禁用！");
		break;
	}
}

//关闭通过验证的编辑器
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#pageListColsDataGrid').datagrid('validateRow', editIndex)) {
		$('#pageListColsDataGrid').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

//保存基本信息配置
function savePageList() {
    GlobalTools.submitForm($("#pageListForm"), {
        success: function (data) {
            currentPageListid = data.id;
            $("#id").val(data.id); //回写页面的主键控件 
            savePageListCols(); //确保基本信息保存成功后，才能保存列信息配置
        },
        error: function (msg) {
            GlobalTools.tip(msg);
        }
    });
}

//保存列信息配置
function savePageListCols() {
    var changeDatas = $("#pageListColsDataGrid").datagrid("getChanges"); //获取做了修改的数据

    GlobalTools.ajax({
        url: rootPath + "Sys_pagelistcols/SaveForm.do",
        data: {
            changeDatas: JSON2.stringify(changeDatas),
            pagelistid: currentPageListid
        },
        success: function (data, msg) {
            buildAndSaveScriptContent(); //根据配置信息构建脚本并保存
            $('#pageListColsDataGrid').datagrid('reload');
            GlobalTools.tip("保存成功。");
        }
    });
}

//根据配置信息构建脚本并保存
function buildAndSaveScriptContent() {
    GlobalTools.ajax({
		url : rootPath + "Sys_pagelist/BuildAndSaveScriptContent.do?pagelistid=" + currentPageListid
	});
}

/*****************************************************按钮函数调用**********************************************************/
//预览
function previewPageListShow() {
	$("#showIframe").attr("src","PageListShow.htm?ispreview=true");
	$('#show').window('open');
}

//保存
function savePageListConfig() {
	if (!endEditing()) {//关闭通过验证的编辑器
		GlobalTools.tip("数据验证未通过，请检查！");
		return;
	}
	savePageList();//保存基本信息配置
}

//生成HTML
function generateHtmlContent() {
    var fileWindow = "<div id='filePanel'><div id='fileListWindow' class='easyui-window' title='列表源码' data-options='modal:true,closed:true,border:false,iconCls:\"icon-view\"' style='width: 800px; height: 550px;'></div></div>";
    if ($('#filePanel')) $('#filePanel').remove();
    $("body").append(fileWindow);
    $.parser.parse("#filePanel"); //easyui格式化工具
    var winContent = "<iframe style='width:100%;height:100%;border:0;' src='" + rootPath + "platform/PageListManager/PageListViewHtml.htm?constname=" + $("#constname").val() + "'></iframe>";
    $('#fileListWindow').html(winContent);
    $('#fileListWindow').window('open');
}

//删除
function destroyList() {
	$.messager.confirm('操作确认', '确定删除？', function(result) {
		if (result) {
			var row, rowIndex;
			var rows = $('#pageListColsDataGrid').datagrid('getSelections');
			if (rows.length == 0) {
				GlobalTools.tip("请至少选择一行记录！");
				return;
			}
			for ( var i = 0; i < rows.length;) {
				row = rows[i];
				rowIndex = $('#pageListColsDataGrid').datagrid('getRowIndex',row);
				//保存后如果没有刷新整个页面，虽然选择了一行记录，但是这行记录的持久化前的记录仍然会追加到getSelections方法的结果中，导致rowIndex有可能为-1；
				//这时候如果不处理就直接调用deleteRow方法，就会报错
				if(rowIndex==-1) {
					i++;
					continue;
				}
				$('#pageListColsDataGrid').datagrid("deleteRow", rowIndex);
				if (row.id <= 0)
					continue;//如果删除的节点是新增的行,不记录
				destroyIdArray.push(row.id);//初始化数组
			}
			if (destroyIdArray.length != 0) {
				GlobalTools.ajax({//删除数据库记录
					url : rootPath + "Sys_pagelistcols/DestroyList.do",
					data : {
						ids : destroyIdArray.join(",")
					},
					success : function(data, msg) {
						destroyIdArray = [];//清空数组
						$('#pageListColsDataGrid').datagrid('reload');
						GlobalTools.tip(msg);
					}
				});
			}
		}
	});
}

//添加
function addList() {
	if (!endEditing()) {
		GlobalTools.tip("数据验证未通过，请检查！");//未能关闭其他行编辑器
		return;
	}
	tempId--; //构造新增行的id
	$('#pageListColsDataGrid').datagrid('appendRow', {
		id : tempId,
		colname : '',
		displaytext : '',
		sortindex : '',
		colwidth : 80,
		textalign : 'center',
		ishide : 0,
		insearch : 0,
		labelname : '',
		controlwidth : '',
		showtime : 0,
		compareoption:'',
		iskey:'0',
		ismultiselect : 0,
		tablename : currentTableName
	});
	openEditor($('#pageListColsDataGrid').datagrid('getRowIndex', tempId)); //激活该行编辑器
}

/************************************************排序对话框相关函数******************************************************/
var sortid=0;//排序对话框列表临时id
var sort_editIndex = undefined;//排序对话框列表编辑行索引

//初始化排序对话框
function initSortDialog(){
	$("#sortDialog").dialog({
	    title: '排序规则',
	    width: 300,
	    height: 300,
	    closed: true,
	    animate: true,
	    modal: true,
	    buttons: '#sort_dlg-buttons'
	});
}

//显示排序对话框
function showSortDialog(){
	removeAll();//清空缓存数据
	//初始化数据行
	var sortrules = $("#sortrules").combobox("getValue");
	if(sortrules){
		var sorts = sortrules.split(",");
		$.each(sorts,function(i,item){
			sortid--;
			$('#sortDataGrid').datagrid('appendRow', {
				id : sortid,
				colname : item.substring(0,item.indexOf(" ")),
				sortorder : item.substring(item.indexOf(" ")+1)
			});
		});
	}
	//隐藏原有下拉框
	$("#sortrules").combobox("hidePanel");
	//显示对话框
	$("#sortDialog").dialog("open");
}

//格式化排序列
function formatterSort(value, rowData, rowIndex) {
	switch (value) {
	case 'desc':
		return '降序';
	default:
		return '升序';
	}
}

//编辑行
function editSortGrid(rowIndex, rowData){
	if (sort_editIndex != rowIndex) {//如果不是同一行,需要关闭其他行的编辑器
		if (!endSortEditing()) {
			GlobalTools.tip("数据验证未通过，请检查！");//未能关闭其他行编辑器
			return;
		}
	}
	openSortEditor(rowIndex);
}

//激活编辑器
function openSortEditor(rowIndex) {
	sort_editIndex = rowIndex; //记录当前行索引
	$('#sortDataGrid').datagrid('selectRow', rowIndex).datagrid(
			'beginEdit', rowIndex); //选中行并打开编辑器
}

//关闭通过验证的编辑器
function endSortEditing() {
	if (sort_editIndex == undefined) {
		return true;
	}
	if ($('#sortDataGrid').datagrid('validateRow', sort_editIndex)) {
		$('#sortDataGrid').datagrid('endEdit', sort_editIndex);
		sort_editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

//得到当前选中行的索引
function getCurrentRowIndex(){
	var row = $('#sortDataGrid').datagrid("getSelected");
	return $('#sortDataGrid').datagrid("getRowIndex",row);
}

/***************************************************排序对话框按钮事件**********************************************************/
//确定
function confirmSort(){
	if (!endSortEditing()) {
		GlobalTools.tip("数据验证未通过，请检查！");//未能关闭其他行编辑器
		return;
	}
	var data = $('#sortDataGrid').datagrid("getChanges");
	var sortrules = "";
	$.each(data,function(index,item){
		sortrules += sortrules==""?item.colname+" "+item.sortorder:","+item.colname+" "+item.sortorder;
	});
	$("#sortrules").combobox("setValue",sortrules);
	$("#sortDialog").dialog("close");
}

//删除
function removeSort(){
	$('#sortDataGrid').datagrid("deleteRow",getCurrentRowIndex());
}

//新增
function addSort(){
	if (!endSortEditing()) {
		GlobalTools.tip("数据验证未通过，请检查！");//未能关闭其他行编辑器
		return;
	}
	sortid--;
	var row = {id : sortid,colname : '',sortorder : 'asc'};
	$('#sortDataGrid').datagrid('appendRow', row);
	openSortEditor($('#sortDataGrid').datagrid("getRowIndex",row));
}

//取消
function cancelSort(){
	var rowIndex = getCurrentRowIndex();
	if ($('#sortDataGrid').datagrid('validateRow', sort_editIndex)) {
		$('#sortDataGrid').datagrid("endEdit",rowIndex);
	} else {
		removeSort();
	}
	sort_editIndex = undefined;
}

//清空
function removeAll(){
	$('#sortDataGrid').datagrid("selectAll");
	var allRows = $('#sortDataGrid').datagrid("getSelections");
	if(allRows.length != 0){
		 while(allRows.length>0){
			$('#sortDataGrid').datagrid("deleteRow",$('#sortDataGrid').datagrid("getRowIndex",allRows[0]));
			$('#sortDataGrid').datagrid("selectAll");
			allRows = $('#sortDataGrid').datagrid("getSelections");
		 }
	}
}

/***********************汇总相关脚本************************/
//格式化书签字段单元格
function formatterEnableCollectCell(value, rowData, rowIndex) {
    return (value && value > 0 ? "是" : "否");
}

//格式化子表列汇总方式
function formatterCollectRuleCell(value, row, index) {
    var retValue = "";
    $(collectRuleData).each(function (index, item) {
        if (value && value.indexOf(item.value) >= 0) {
            retValue += (retValue != "" ? "," : "") + item.text;
            return true; //返回false终止循环，返回true进入下次循环
        }
    });
    return retValue;
}

//根据列类型判断是否启用
function dynamicEditor(rowData) {
    var editors = $('#pageListColsDataGrid').datagrid('getEditors', editIndex);
    //给比较符赋选项
    getEditor(editIndex, columnIndex.compareoptionIndex).combobox('loadData', getCompareOperationDatas(rowData));
    //是否启用时间选项
    if (rowData.coltype == "datetime") {
        enableEditor('combobox', editIndex, columnIndex.showtimeIndex);
        disableEditor('combobox', editIndex, columnIndex.compareoptionIndex);
    }
    else {
        disableEditor('combobox', editIndex, columnIndex.showtimeIndex);
        enableEditor('combobox', editIndex, columnIndex.compareoptionIndex);
    }
    //是否启用汇总选项
    if (!rowData.categoryconstname && (rowData.coltype == "int" || rowData.coltype == 'float')) {
        enableEditor('checkbox', editIndex, columnIndex.enablecollectIndex);
        enableEditor('combobox', editIndex, columnIndex.collectruleIndex);
    }
    else {
        disableEditor('checkbox', editIndex, columnIndex.enablecollectIndex);
        disableEditor('combobox', editIndex, columnIndex.collectruleIndex);
    }
    //是否启关键字
    if (rowData.coltype == "varchar") {
        enableEditor('combobox', editIndex, columnIndex.iskeyIndex);
    }
    else {
        disableEditor('combobox', editIndex, columnIndex.iskeyIndex);
    }
    //是否启多选
    if (rowData.categoryconstname) {
        enableEditor('combobox', editIndex, columnIndex.ismultiselectIndex);
    }
    else {
        disableEditor('combobox', editIndex, columnIndex.ismultiselectIndex);
    }
}
function getCompareOperationDatas(colRemark) {
    if (!colRemark) return [];
    if (colRemark.categoryconstname) {//绑定字典
        return combox_filterOperationDatas;
    } else if (colRemark.coltype == "int" || colRemark.coltype == "float") {//整型格式、浮点型格式
        return number_filterOperationDatas;
    } else {
        return varchar_filterOperationDatas;
    }
}