
var rootPath = "../../";
var editIndex;
var deptname,deptid;
$(function () {
    $("#roleGrid").datagrid("getPager").pagination({
        displayMsg: ""
    });
});

//结束编辑
function endEditing() {
    if (editIndex == undefined) { return true }
    if ($('#roleGrid').datagrid('validateRow', editIndex)) {
        $('#roleGrid').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//右击弹出菜单
function onContextMenu(e, rowIndex, rowData) {
    e.preventDefault(); //取消IE右键事件
    $('#contextMenuToolBar').menu('removeItem', $('#dynamicButton'));
    $('#roleGrid').datagrid("unselectAll");
    $('#roleGrid').datagrid('selectRow', rowIndex);
    //添加禁用和启用
    if (rowData.delstatus && rowData.delstatus == 1) {//已经禁用
        $('#contextMenuToolBar').menu('appendItem', { 'text': '启用', 'id': 'dynamicButton', iconCls: 'icon-pause', onclick: unDeleteRole });
    }
    else {

        $('#contextMenuToolBar').menu('appendItem', { 'text': '禁用', 'id': 'dynamicButton', iconCls: 'icon-pause', onclick: deleteRole });
    }
    $('#contextMenuToolBar').menu('show', {
        left: e.pageX,
        top: e.pageY
    });
}
//角色列表双击事件 编辑状态
function dblClickCell(rowIndex, field, value) {
    if (editIndex == rowIndex) return;
    if (!endEditing()) return;
    editIndex = rowIndex;
    $('#roleGrid').datagrid('beginEdit', editIndex);
}
//角色列表双击事件 编辑状态
function editorRole() {
    if (!endEditing()) return;
    var row = $('#roleGrid').datagrid('getSelected');
    if (row) {
        editIndex = $('#roleGrid').datagrid('getRowIndex', row);
        $('#roleGrid').datagrid('beginEdit', editIndex);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}
//保存角色
function saveRoleData() {
    if (!endEditing()) return;
    var changesData = $('#roleGrid').datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_roles/SaveForm.do",
        data: { changeDatas: JSON2.stringify(changesData) },
        success: function (data, msg) {
            $('#roleGrid').datagrid('reload');
            $('#roleGrid').datagrid('acceptChanges');
        }
    });
}

//新增角色
function creatNewRole() {
    if (!endEditing()) return;
    $('#roleGrid').datagrid("unselectAll");
    $('#roleGrid').datagrid('appendRow', { id: null, chinaname: "", sortindex: "50", delstatus: "0" });
    editIndex = $('#roleGrid').datagrid('getRows').length - 1;
    $('#roleGrid').datagrid('beginEdit', editIndex);
    $('#roleGrid').datagrid('selectRow', editIndex);
}

//撤销
function cancelEditor() {
    if (editIndex == undefined) return;
    var row = $('#roleGrid').datagrid('getSelected');
    if (row && row.id) {
        $('#roleGrid').datagrid('cancelEdit', editIndex);
    }
    else {
        $('#roleGrid').datagrid('deleteRow', editIndex);
    }
    editIndex = undefined;
}
//禁用角色
function deleteRole() {
    GlobalTools.deleteGridList($('#roleGrid'), { url: rootPath + "Sys_roles/DeleteList.do" });
}
//启用角色
function unDeleteRole() {
    GlobalTools.unDeleteGridList($('#roleGrid'), { url: rootPath + "Sys_roles/UnDeleteList.do" });
}
//销毁角色
function destroyRole() {
    GlobalTools.destroyGridList($('#roleGrid'), { url: rootPath + "Sys_roles/DestroyList.do" });
}

//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}

//可分配的角色列表加载成功后
function loadCanUseRolesSuccess(data) {
    $('#canUseRoleGrid').datagrid("uncheckAll").datagrid("unselectAll");
    if(data.rows){
        for(var i in data.rows){
            if(data.rows[i].checked == 'true') {
                $('#canUseRoleGrid').datagrid("selectRecord",data.rows[i].id);
            }
        }
    }
}

//菜单加载成功后
function loadSuccess(row, data) {
	if(data.rows){
		for(var i in data.rows){
			if(data.rows[i].checked == 'true') {
                $('#menuList').treegrid("select",data.rows[i].id);
            }
		}
	}
}

//角色列表行单击事件
function clickRoles(rowIndex, rowData) {
    //加载可使用的角色列表
    $("#canUseRoleGrid").datagrid("options").url = rootPath + 'Sys_roles/LoadCanUseRolesList.do?id='+rowData.id;
    $("#canUseRoleGrid").datagrid("load");
    //加载菜单权限
	$("#menuList").treegrid("options").url = rootPath + 'Sys_menu/LoadRolesMenusList.do?roleId='+rowData.id;
    $("#menuList").treegrid("reload");
}

/*******权限相关*******/
function initMenuListStatus(menuPermString) {
	if(!menuPermString){
		return null;
	}
    $('#menuList').treegrid('clearChecked');
    var menuPerms = menuPermString.split(',');
    for (index in menuPerms) {
        if ($('#menuList').treegrid('find', menuPerms[index])) {
            $('#menuList').treegrid('checkRow', menuPerms[index]);
        }
    }
}

//保存能使用的角色
function saveCanUseRole(){
    var roleRow = $('#roleGrid').datagrid('getSelected');
    if (!roleRow) {
        GlobalTools.tip("请先选择哪个角色来使用这些角色！");
        return;
    }
    var canUserRoles = $('#canUseRoleGrid').datagrid('getSelections');
    var idArr = new Array();
    for (index in canUserRoles) {
        idArr.push(canUserRoles[index].id);
    }
    var roleData = {};
    roleData.id = roleRow.id;
    roleData.can_use_roleids = (idArr.length > 0 ? idArr.join(',') : null);

    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_roles/SaveCanUseRoles.do",
        data: roleData,
        success: function (data, msg) {
            GlobalTools.tip("保存成功。");
        }
    });
}

function saveRoleMenuPerm() {//保存菜单权限

    var roleRow = $('#roleGrid').datagrid('getSelected');
    if (!roleRow) {
        GlobalTools.tip("请选择角色。");
        return;
    }

    var menuNodes = $('#menuList').treegrid('getSelections');
    var idArr = new Array();
    for (index in menuNodes) {
        idArr.push(menuNodes[index].id);
    }
    var roleData = {};
    roleData.id = roleRow.id;
    roleData.permstring = (idArr.length > 0 ? idArr.join(',') : ",0,");

    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_roles/SaveRoleMenuPerms.do",
        data: roleData,
        success: function (data, msg) {
            GlobalTools.tip("保存成功。");
        }
    });
}
/*********操作权限相关**********/
var menuOperations =
[
{ id: "0",text: "私人" },
{ id: "1",text: "所属部门" },
{ id: "2",text: "所属单位" },
{ id: "3",text: "全系统",selected:true}
];

function formatterOperationrangeCell(value, row, index){
	switch(value){
	case 0:
		return "私人";
	case 1:
		return "所属部门";
	case 2:
		return "所属单位";
	case 3:
		return "全系统";
	default:
		return "";
	}
}

function loadMenuOperation(rowData) {
    bindMenuOperationList(rowData.id);
}

//checkedbox选中事件
function checkControl(node){
	$("#menuList").treegrid("options").onCheck=function(){};
	//选中所有子节点
	var nodes = node.children;
	if(nodes){
		var length = nodes.length;
		for(var i=0;i<length;i++){
			$("#menuList").treegrid("checkRow",nodes[i].id);
		}
	}
	//选中父节点
	if(node.parentid){//有父节点
		$("#menuList").treegrid("checkRow",node.parentid);
	}
	$("#menuList").treegrid("options").onCheck=checkControl;
}
//checkedbox取消选中事件
function uncheckControl(node){
	$("#menuList").treegrid("options").onUncheck=function(){};
	//取消选中所有子节点
	var nodes = node.children;
	if(nodes){
		var length = nodes.length;
		for(var i=0;i<length;i++){
			$("#menuList").treegrid("uncheckRow",nodes[i].id);
		}
	}
	$("#menuList").treegrid("options").onUncheck=uncheckControl;
}


//绑定菜单操作列表
function bindMenuOperationList(menuid) {
    var roleRow = $('#roleGrid').datagrid('getSelected');
    if (!roleRow) {
        GlobalTools.tip("请选择角色。");
        return;
    }
    $("#Hid_CurrentMenuID").val(menuid);
    
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_authority/LoadPageList.do",
        data: {
            menuid: menuid,
            authoritylevel: "ROLES",
            relationid: roleRow.id
        },
        success: function (data) {
        	$('#menuOperationList').datagrid("clearSelections")
            					   .datagrid({data: data});
        }
    });
}

function menuOperationChecked(index) {
    $('#menuOperationList').datagrid('beginEdit', index);
}
function menuOperationUnChecked(index) {
    $('#menuOperationList').datagrid('cancelEdit', index);
}
function menuOperationLoadSuccess(data) {
    if (data) {
        $(data.rows).each(
            function (index, _data) {
                if (this.checkstate == 'true') {
                    $('#menuOperationList').datagrid('selectRow', $('#menuOperationList').datagrid('getRowIndex', this));
                }
            });
    }
}
function saveMenuOperationPerm() {
    var roleRow = $('#roleGrid').datagrid('getSelected');
    if (!roleRow) {
        GlobalTools.tip("请选择角色。");
        return;
    }
    var menuOperationData = $('#menuOperationList').datagrid('getSelections');
    /*if (menuOperationData.length == 0) {
        GlobalTools.tip("请选择操作权限。");
        return;
    }*/
    for (index in menuOperationData) {
        $('#menuOperationList').datagrid('endEdit', $('#menuOperationList').datagrid('getRowIndex', menuOperationData[index]));
    }

    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_authority/SaveMenuOperationAuthority.do",
        data: { authoritylevel: "ROLES", relationid: roleRow.id,menuid:$("#Hid_CurrentMenuID").val(), menuoperationdata: JSON2.stringify(menuOperationData) },
        loading:true,
        success: function (data, msg) {
            GlobalTools.tip("保存成功。");

            /* 效率低，暂时去掉for (index in menuOperationData) {
                $('#menuOperationList').datagrid('beginEdit', $('#menuOperationList').datagrid('getRowIndex', menuOperationData[index]));
            }*/
        }
    });
}