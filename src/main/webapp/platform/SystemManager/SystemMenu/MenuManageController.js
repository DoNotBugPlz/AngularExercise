var rootPath = "../../../";
/********************************************导航菜单维护相关功能函数*****************************************************/
//格式化是否禁用单元格
function formatterCell(value, row, index) {
    return "<img src='" + rootPath + "platform/Styles/ButtonIcons/" + (value && value > 0 ? "busy.gif" : "check.gif") + "'>";
}
//格式化图标地址
function formatterImgCell(value, row) {
    return (value && value.length > 0 ? "<img src='" + rootPath + value + "'>" : "");
}
//选择图标
function selectIcon() {
    $(this).combobox("hidePanel");
    SourceComboBox = this;
    IconFolderName = this.id;
    f_openIconsWin();
    return false;
}
//右击弹出菜单
function menuContextMenu(e, row) {
    e.preventDefault(); //取消IE右键事件
    $('#menuToolBar').menu('removeItem', $('#dynamicButton'));
    $(this).treegrid('unselectAll');
    $(this).treegrid('select', row.id);
    //添加禁用和启用
    if (row.delstatus && row.delstatus == 1) {//已经禁用
        $('#menuToolBar').menu('appendItem', { 'text': '启用', 'id': 'dynamicButton', iconCls: 'icon-pause', onclick: unDeleteMenu });
    }
    else {

        $('#menuToolBar').menu('appendItem', { 'text': '禁用', 'id': 'dynamicButton', iconCls: 'icon-pause', onclick: deleteMenu });
    }
    $('#menuToolBar').menu('show', {
        left: e.pageX,
        top: e.pageY
    });
}

//保存导航
function saveMenuForm() {
    GlobalTools.submitForm($("#menuForm"), {
        success: function (data, msg) {
            $("#menuid").val(data.sys_menu.id);
            var parentNode = $('#menuList').treegrid('find', data.sys_menu.parentid);
            if (parentNode && parentNode.parentid > 0)
                $('#menuList').treegrid('reload', data.sys_menu.parentid);
            else
                $('#menuList').treegrid('reload');
        },
        complete: function () {
            $('#menuList').treegrid('select', $("#menuid").val());
            bindMenuOperationList($("#menuid").val());
        }
    });
}
//编辑导航
function editorMenu(row) {
    if (row) {
    	$(this).treegrid("unselectAll");
    	$(this).treegrid('select',row.id);
        bindMenuOperationList(row.id);
        GlobalTools.loadForm($("#menuForm"), {
            url: rootPath + "Sys_menu/LoadForm.do",
            data: { id: row.id }
        });

    }
}
//新增菜单
function creatNewMenu(isChildren) {
    if (isChildren) { //添加下级菜单
        var currentNode = $('#menuList').treegrid('getSelected');
        if (!currentNode || $('#menuList').treegrid('getSelections').length > 1) {
            GlobalTools.tip("请选择唯一一个父级导航。");
            return;
        }
        $('#menuForm').form('clear');
        $("#parentid").val(currentNode.id);
        
    }
    else{
        $('#menuForm').form('clear');
    }
    bindMenuOperationList();
}
//禁用菜单
function deleteMenu() {
    GlobalTools.deleteTreeGridList($('#menuList'), { url: rootPath + "Sys_menu/DeleteList.do" });
}

//启用菜单
function unDeleteMenu() {
    GlobalTools.unDeleteTreeGridList($('#menuList'), { url: rootPath + "Sys_menu/UnDeleteList.do" });
}
//销毁菜单
function destroyMenu() {
    GlobalTools.destroyTreeGridList($('#menuList'), { url: rootPath + "Sys_menu/DestroyList.do" });
}
/********************************************导航菜单维护相关功能函数*****************************************************/



/********************************************菜单页面操作相关功能函数*****************************************************/
var iconDatas = 
[
{ iconid: "icon-archives", iconvalue: "icon-archives", imgsrc: "icons/archives.gif" },
{ iconid: "icon-attibutes", iconvalue: "icon-attibutes", imgsrc: "icons/attibutes.gif" },
{ iconid: "icon-back", iconvalue: "icon-back", imgsrc: "icons/back.gif" },
{ iconid: "icon-cancel", iconvalue: "icon-cancel", imgsrc: "icons/cancel.png" },
{ iconid: "icon-config", iconvalue: "icon-config", imgsrc: "icons/config.gif" },
{ iconid: "icon-customers", iconvalue: "icon-customers", imgsrc: "icons/customers.gif" },
{ iconid: "icon-cut", iconvalue: "icon-cut", imgsrc: "icons/cut.png" },
{ iconid: "icon-database", iconvalue: "icon-database", imgsrc: "icons/database.gif" },
{ iconid: "icon-add", iconvalue: "icon-add", imgsrc: "icons/edit_add.png" },
{ iconid: "icon-remove", iconvalue: "icon-remove", imgsrc: "icons/edit_remove.png" },
{ iconid: "icon-delete", iconvalue: "icon-delete", imgsrc: "icons/no.png" },
{ iconid: "icon-save", iconvalue: "icon-save", imgsrc: "icons/filesave.png" },
{ iconid: "icon-help", iconvalue: "icon-help", imgsrc: "icons/help.png" },
{ iconid: "icon-pause", iconvalue: "icon-pause", imgsrc: "icons/no.png" },
{ iconid: "icon-ok", iconvalue: "icon-ok", imgsrc: "icons/ok.png" },
{ iconid: "icon-edit", iconvalue: "icon-edit", imgsrc: "icons/pencil.png" },
{ iconid: "icon-print", iconvalue: "icon-print", imgsrc: "icons/print.png" },
{ iconid: "icon-redo", iconvalue: "icon-redo", imgsrc: "icons/redo.png" },
{ iconid: "icon-undo", iconvalue: "icon-undo", imgsrc: "icons/undo.png" },
{ iconid: "icon-reload", iconvalue: "icon-reload", imgsrc: "icons/reload.png" },
{ iconid: "icon-search", iconvalue: "icon-search", imgsrc: "icons/search.png" },
{ iconid: "icon-tip", iconvalue: "icon-tip", imgsrc: "icons/tip.png" },
{ iconid: "icon-sum", iconvalue: "icon-sum", imgsrc: "icons/sum.png" },
{ iconid: "icon-view", iconvalue: "icon-view", imgsrc: "icons/view.png" },
{ iconid: "icon-pause", iconvalue: "icon-pause", imgsrc: "icons/pause.gif" }
];
//选择按钮图标
function formatItem(item) {
    return "<img src='" + rootPath + "platform/ScriptSource/EasyUI/Skins/" + item.imgsrc + "' />";
}

//格式化按钮图标地址
function formatterButtonIconCell(value, row) {
    return (value && value.length > 0 ? "<span class='" + value + "' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>" : "");
}
//绑定菜单操作列表
function bindMenuOperationList(menuid) {
    $('#menuOperationList').datagrid('load', {
        menuid: menuid
    });
}

var editIndex;
//结束编辑
function endEditing() {
    if (editIndex == undefined) { return true }
    if ($('#menuOperationList').datagrid('validateRow', editIndex)) {
        $('#menuOperationList').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        GlobalTools.tip("数据校验失败，请检查数据格式。");
        return false;
    }
}

//右击弹出菜单
function menuOperationContextMenu(e, rowIndex, rowData) {
    e.preventDefault(); //取消IE右键事件
    $('#contextMenuToolBar').menu('removeItem', $('#dynamicButton'));
    $('#menuOperationList').datagrid("unselectAll");
    $('#menuOperationList').datagrid('selectRow', rowIndex);
    //添加禁用和启用
    if (rowData.delstatus && rowData.delstatus == 1) {//已经禁用
        $('#contextMenuToolBar').menu('appendItem', { 'text': '启用', 'id': 'dynamicButton', iconCls: 'icon-ok', onclick: unDeleteMenuOperation });
    }
    else {

        $('#contextMenuToolBar').menu('appendItem', { 'text': '禁用', 'id': 'dynamicButton', iconCls: 'icon-pause', onclick: deleteMenuOperation });
    }
    $('#contextMenuToolBar').menu('show', {
        left: e.pageX,
        top: e.pageY
    });
}
//菜单操作配置列表双击事件 编辑状态
function dblClickMenuOperation(rowIndex, field, value) {
    if (editIndex == rowIndex) return;
    if (!endEditing()) return;
    $('#menuOperationList').datagrid("unselectAll");
    $("#menuOperationList").datagrid('selectRow', rowIndex);
    editIndex = rowIndex;
    $('#menuOperationList').datagrid('beginEdit', editIndex);
    var row = $('#menuOperationList').datagrid('getSelected');
    if (row) {
        setConstnameFiledEvent(editIndex,row.id);
    }
}

//编辑菜单操作配置
function editorMenuOperation() {
    if (!endEditing()) return;
    var row = $('#menuOperationList').datagrid('getSelected');
    if (row) {
        editIndex = $('#menuOperationList').datagrid('getRowIndex', row);
        $('#menuOperationList').datagrid('beginEdit', editIndex);
        setConstnameFiledEvent(editIndex,row.id);
    }
    else {
        GlobalTools.tip("请选择需要编辑的行。");
    }
}
//保存菜单操作配置
function saveMenuOperation() {
    if (!endEditing()) return;
    var changesData = $('#menuOperationList').datagrid('getChanges');
    if (!changesData || changesData.length == 0) return;
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_menuoperation/SaveForm.do",
        data: { changeDatas: JSON2.stringify(changesData) },
        success: function (data, msg) {
            $('#menuOperationList').datagrid('reload');
            $('#menuOperationList').datagrid('acceptChanges');
        }
    });
}

//新增菜单操作配置
function creatMenuOperation() {
    if (!endEditing()) return;
    var menuid = $('#menuid').val();
    if (!menuid) {
        GlobalTools.tip("请选择一个导航菜单。");
        return;
    }

    $('#menuOperationList').datagrid("unselectAll");
    $('#menuOperationList').datagrid('appendRow', { id: null, menuid: menuid, chinaname: "", elementid: "", webapipath: "", iconcls: "icon-ok", sortindex: "50", delstatus: "0",constname:"" });
    editIndex = $('#menuOperationList').datagrid('getRows').length - 1;
    $('#menuOperationList').datagrid('beginEdit', editIndex);
    setConstnameFiledEvent(editIndex,"");
}

function setConstnameFiledEvent(rwoIndex,id){
    var constEditor=$("#menuOperationList").datagrid("getEditor",{index:rwoIndex,field:"constname"});
    constEditor.target.bind("change",function(){
        if(this.value){
        if( !validConstname(this.value,id)){
            GlobalTools.tip("唯一标识已经存在，请重新填写。");
            constEditor.target.val(null);
        }
        }
    })
}

function validConstname(constname,id){
    var result;
    $.ajax({
        url:rootPath+"Sys_menuoperation/ValidConstName.do",
        type:"POST",
        async:false,
        data:{constname:constname,id:id},
        success:function(data){
            result=data;
        }
    });
   return result;
}

//撤销
function cancelEditor() {
    if (editIndex == undefined) return;
    $('#menuOperationList').datagrid('selectRow', editIndex);
    var row = $('#menuOperationList').datagrid('getSelected');
    if (row && row.id) {
        $('#menuOperationList').datagrid('cancelEdit', editIndex);
    }
    else {
        $('#menuOperationList').datagrid('deleteRow', editIndex);
    }
    editIndex = undefined;
}
//禁用菜单操作配置
function deleteMenuOperation() {
    GlobalTools.deleteGridList($('#menuOperationList'), { url: rootPath + "Sys_menuoperation/DeleteList.do" });
}
//启用菜单操作配置
function unDeleteMenuOperation() {
    GlobalTools.unDeleteGridList($('#menuOperationList'), { url: rootPath + "Sys_menuoperation/UnDeleteList.do" });
}
//销毁菜单操作配置
function destroyMenuOperation() {
    GlobalTools.destroyGridList($('#menuOperationList'), { url: rootPath + "Sys_menuoperation/DestroyList.do" });
}

function onStartDargClick(row){
    $("#oldpid").val(row.parentid);

}
function onCropClick(targetRow,sourceRow,point){
    var tpid = "";
    var spid = "";
    var tindex = targetRow.sortindex;
    var sindex = sourceRow.sortindex;
    if(targetRow.parentid == null || targetRow.parentid == "" || targetRow.parentid == 'undefined'){
        tpid = "-1";
    }else{
        tpid = targetRow.parentid;
    }

    if($("#oldpid").val() != "" && (targetRow.parentid != null && targetRow.parentid != "" && targetRow.parentid != 'undefined')){
        if($("#oldpid").val() == targetRow.parentid){
            spid = sourceRow.parentid;
        }
    }else{
        if($("#oldpid").val() == ""){
            if(sourceRow.parentid == null || sourceRow.parentid == "" || sourceRow.parentid == 'undefined'){
                spid = "-1";
            }else{
                spid = sourceRow.parentid;
            }
        }else{
            spid = $("#oldpid").val();
        }
    }
    $.ajax({
        type: "post",
        url:rootPath+"Common/onDropMenu.do",
        async:false,
        data: {
            sourceRowId:sourceRow.id, // 拖拽行ID
            sourceRowPid:sourceRow.parentid,
            oldpid:$("#oldpid").val(),
            point:point,
            tpid:tpid,
            spid:spid,
            tindex:tindex,
            sindex:sindex
        },
        success:function(){
            $('#menuList').treegrid('reload');
        }

    });
}