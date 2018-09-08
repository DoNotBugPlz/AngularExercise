var rootPath = "../../", //页面的根路径
 editingIndex, //当前编辑的行索引
 checkMainFormDataHandler = null, //外部接口，用于判断主表数据是否保存，根据返回值判断是否执行子表保存动作，返回true，执行子表保存动作，否则不执行
 tableName;

function initAttachList(){
    $("div[type='AttachFileList']").each(function(index,item){
        var $this=$(this);
        var tableId="filelist_"+$this.attr("id");
        $this.html("<table id=\""+tableId+"\" name=\""+$this.attr("constname")+"."+$this.attr("colname")+"\" constname=\""+$this.attr("constname")+"\" type=\""+$this.attr("type")+"\" title=\"附件列表\" showToolBar=\"false\"</table>");


        $('#'+tableId).datagrid({
            singleSelect: false,
            fit: true,
            loadMsg: '数据加载中……',
            fitColumns: true,
            rownumbers: true,
            pageSize: 10,
            pagination: true,
            idField: 'id',
            onLoadError: gridLoadError,
            columns:[[
                {field:'ck',title:'',checkbox:true},
                {field:'filename',title:'文 件 名 称',width:140,halign:'center',formatter:formatFileName}
            ]]
        });


    });
    $("#filelist_notice_uploaded").datagrid({});
}

//格式化页面中所有附件
function formatAttachFile(editAble) {
    if (currentRecordId) {
        $("table[type='AttachFileList']").each(function (index, item) {
            creatAttachFileTable(item, editAble);
        });
    }
}

//弹出窗口式附件管理
function fileListManager() {
    if (currentRecordId) {
        //弹出窗口方法，参数：(窗口标题，url，窗口样式控制)
        GlobalTools.openWindow("附件上传", rootPath+"platform/ScriptSource/SWFUpload/UploadFileIframe.htm");
    }
    else {
        GlobalTools.tip("请先保存表单，再上传附件");
    }
}

//创建附件
function creatAttachFileTable(attachTable, editAble) {
    drawAttachGrid($(attachTable),editAble);
}
//attachObj  JQuery对象
function drawAttachGrid(attachObj,editAble){
    tableName = attachObj.attr("constname");
    var gridDefault = {};
    //判断是否需要创建工具条
    if (attachObj.attr("showToolBar") && attachObj.attr("showToolBar") == "true") {
        if (editAble && $("#attachFile_" + tableName).length == 0) {//如果按钮工具条不存在则创建。
            var subTableToolBar = "";
            subTableToolBar += "<div id=\"attachFile_" + tableName + "\"  class=\"datagrid-toolbar\">";
            subTableToolBar += "<a id=\"aUpLoadFile\" href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"fileListManager()\" data-options=\"plain:true,iconCls:'icon-save'\">上传附件</a>";
            subTableToolBar += "<a id=\"aDeleteFile\" href=\"javascript:void(0)\" class=\"easyui-linkbutton\" onclick=\"deleteAttachFiles()\" data-options=\"plain:true,iconCls:'icon-save'\">删除</a>";
            subTableToolBar += "</div>";
            $("body").append(subTableToolBar);
            $.parser.parse("#attachFile_" + tableName);
        }
        gridDefault.toolbar = "#attachFile_" + tableName;
    }
    var insActivityId = "";
    if( currentInsActivityId!=undefined&&currentInsActivityId!=null&&currentInsActivityId!=""){
        insActivityId = currentInsActivityId;
    }
    if( parentRecordId!=undefined&&parentRecordId!=null&&parentRecordId!=""){
        currentRecordId = parentRecordId;
    }
    if( parentTableName!=undefined&&parentTableName!=null&&parentTableName!=""){
        tableName = parentTableName;
    }
    gridDefault.url = rootPath + 'Sys_attachfile/LoadPageList.do?tablename=' + attachObj.attr("constname") + "&recordid=" + currentRecordId+ "&colname=uploaded&insActivityId=" + insActivityId;
    var gridOptions = $.extend(gridOptions, gridDefault);
    attachObj.datagrid(gridOptions);

}


//格式化文件名
function formatFileName(value, row, index) {
    return "<a href='" + rootPath + "Sys_attachfile/DownLoadFile.do?fileid=" + row.id + "'>" + value + "</a>"
}

//删除附件
function deleteAttachFiles() {
    var objGrid = $("table[type='AttachFileList'][constname='" + tableName + "']");
    var deleteDatas = objGrid.datagrid('getSelections');
    if (!deleteDatas || deleteDatas.length == 0) return;
    $.messager.confirm('操作确认', '确定要删除选中的记录吗?', function (result) {
        if (result) {
            var idArr = new Array();
            for (index in deleteDatas) {
                idArr.push(deleteDatas[index].id);
            }
            GlobalTools.ajax({
                dataType: "json",
                url: rootPath + 'Sys_attachfile/DeleteList.do',
                data: { ids: idArr.join(',') },
                success: function (result, message) {
                    objGrid.datagrid('reload');
                }
            });
        }
    });
}

function InitUploadFileConfig() {
    var UploadFileConfig = {};
    UploadFileConfig.rootPath = "../../../";
    UploadFileConfig.setPostParams = setPostParams;
    UploadFileConfig.uploadSuccess = uploadSuccess;
    return UploadFileConfig;
}

//设置提交参数
function setPostParams() {
    return { tablename: tableName, colname: "uploaded", recordid: currentRecordId };
}
//数据保存成功后回调函数
function uploadSuccess(data, message) {
    $("table[type='AttachFileList'][constname='" + tableName + "']").datagrid('reload');
}

 