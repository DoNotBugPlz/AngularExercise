(function ($) {
    var UploadFileTools = window['UploadFileTools'] = {
        SWFUploadOCX: null,
        ToolsDefault: {}, //上传控件扩展配置
        _defaults: {
            rootPath: "../../", //页面根路径
            upload_url: "Sys_attachfile/UploadFile.do", //接受文件地址
            saveFileData_url: "Sys_attachfile/SaveForm.do", //接受文件地址
            destroyFile_url:"Sys_attachfile/DestroyList.do",//删除文件请求
            file_types: "*.*", //允许上传的文件类型
            file_types_description: "All Files", //允许上传文件描述
            file_size_limit: "0", //单个文件允许最大值，0不限制 可用的单位有B,KB,MB,GB 默认KB
            file_upload_limit: 0, //允许上传的最多文件数量 0不限制
            file_queue_limit: 0, //文件上传队列中等待文件的最大数量限制
            flash_url: "platform/ScriptSource/SWFUpload/Source/UploadFile.swf", //flash文件地址
            flash_cab_url: "platform/ScriptSource/SWFUpload/Source/Swflash.cab", //flash插件安装地址
            button_image_url: "platform/ScriptSource/SWFUpload/Style/UploadBtn.png", //上传按钮图片
            button_text: "选择文件", //置Flash Button中显示的文字，支持HTML。  “文件选择”按钮的显示文字
            setPostParams: null, //设置保存数据时传递的参数，JSON格式对象键/值对
            saveServerData: null, //保存文件记录到数据库服务器
            uploadSuccess: null, //上传成功之后回调函数
            uploadError: null, //上传失败之后回调函数
            store_path: "", //附件存储文件夹的相对路径（针对于部署目录如webstie下的AttachFolder目录下的temp文件夹 可写成"AttachFolder\\temp"）
            use_FileStorePathRule: true//是否使用GloablConfig.xml中的FileStorePathRule文件存储的文件夹路径创建规则
        },
        //初始化控件参数
        init: function (options) {
            if (options) {
                $.extend(UploadFileTools.ToolsDefault, UploadFileTools._defaults, options);
            }
            else if (parent.InitUploadFileConfig
                && typeof (parent.InitUploadFileConfig) == "function" ) {
                $.extend(UploadFileTools.ToolsDefault, UploadFileTools._defaults, parent.InitUploadFileConfig());
            }
            if (!UploadFileTools.ToolsDefault.saveServerData) {
                UploadFileTools.ToolsDefault.saveServerData = UploadFileTools.saveServerData;
            }
            UploadFileTools._SetSWFUploadOptions();
        },

        //上传控件回调函数集合
        Uploader: {
            Result: $.extend({
                File_FAILED: -310, //上传的文件无效
                SERVER_ERROR: -320 //服务器端操作附件发生异常
            }, SWFUpload.UPLOAD_ERROR || {}),
            getFileSize: function (num) {
                if (isNaN(num)) {
                    return false;
                }
                num = parseInt(num);
                var units = [" B", " KB", " MB", " GB"];
                for (var i = 0; i < units.length; i += 1) {
                    if (num < 1024) {
                        num = num + "";
                        if (num.indexOf(".") != -1 && num.indexOf(".") != 3) {
                            num = num.substring(0, 4);
                        } else {
                            num = num.substring(0, 3);
                        }
                        break;
                    } else {
                        num = num / 1024;
                    }
                }
                return num + units[i];
            },

            updateStatus: function (file, html) {
                //更正当前速度和时间
                UploadFileTools.ChangeStatusBar(file);
                $("#FileSpan_" + file.id).text(html);
                $("#FileSpan_" + file.id).attr("title", html);
                $("#FileProcess_" + file.id).text(html);
                $("#FileProcess_" + file.id).css("width", html);
            },

            Handler: {
                InitBtnEvent: function () {
                    //初始时开始上传按钮不可用
                    $("#Btn_Start").attr("disabled", "disabled");
                    //初始时清空列表按钮不可用
                    $("#Btn_Clear").attr("disabled", "disabled");
                },
                dialogComplete: function (chooseCount, addingQueueCount, inQueueCoune) {
                    if (chooseCount > 0) {
                        //选择文件后绑定相关事件
                        $("#Btn_Start").removeAttr("disabled").unbind().click(function () { UploadFileTools.StartUploadFile(); });
                        $("#Btn_Clear").removeAttr("disabled").unbind().click(function () { UploadFileTools.ClearGridData(); });
                        //记录上传文件个数
                        $("#Span_TotalFileCount").text(inQueueCoune);
                    }
                },
                fileQueued: function (file) {
                    $('#SWFUploadGrid').datagrid('appendRow', {
                        id: file.id,
                        FileDataId:'',
                        FileName: file.name,
                        FileProcess: '0%',
                        FileStatus: "等候上传",
                        FileSize: UploadFileTools.Uploader.getFileSize(file.size)
                    });
                },
                fileQueueError: function (file, errorCode, message) {
                    var errorMsg = "";
                    try {
                        switch (errorCode) {
                            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                                if (message > 0) {
                                    errorMsg = ",您只能上传" + message + "个文件！";
                                } else {
                                    errorMsg = ",您不可继续上传文件！";
                                }
                                break;
                            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                                errorMsg = ",文件不可大于" + this.settings.file_size_limit;
                                break;
                            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                                errorMsg = ",您不可上传0字节的文件！";
                                break;
                            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                                errorMsg = ",您上传的文件格式不正确！";
                                break;
                            default:
                                errorMsg = ",未知错误！";
                                break;
                        }
                    }
                    catch (exMsg) {
                        errorMsg = exMsg;
                    }
                    alert(errorMsg);
                },
                //递归实现自动批量上传
                uploadComplete: function (file) {
                    if (this.getStats().files_queued == 0) {//队列中等待上传的文件数位0
                        $("#Btn_Start").find('.l-btn-text').text("开始上传")
                        $("#Btn_Start").unbind().attr("disabled", "disabled");
                        $("#Btn_Clear").removeAttr("disabled").unbind().click(function () { UploadFileTools.ClearGridData(); });
                        $("#UploadStatus").html("");
                    }
                    else {
                        //继续上传下一个文件
                        this.startUpload();
                    }
                },
                //开始上传文件
                uploadStart: function (file) {
                    UploadFileTools.Uploader.updateStatus(file, "开始上传");
                },
                //单个文件上传进度
                uploadProgress: function (file, bytesLoaded, bytesTotal) {
                    var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
                    UploadFileTools.Uploader.updateStatus(file, percent + "%");
                    if (percent == 100) {
                        UploadFileTools.Uploader.updateStatus(file, "正在保存");
                    }
                },
                //单个文件上传成功
                uploadSuccess: function (file, serverData) {
                    try {
                        if (typeof serverData === 'string') {
                            serverData = JSON.parse(serverData);
                            //某些版本的浏览器上一行解析后仍然是字符串，所以作此处理
                            if(typeof serverData === 'string'){
                            	serverData = JSON.parse(serverData);
                            }
                        }
                    }
                    catch (e) {
                        if (typeof serverData === 'string') {
                            serverData = eval("(" + serverData + ")");
                        }
                    }
                    if (serverData.code && serverData.code != -1000) {//上传出错了
                        UploadFileTools.Uploader.Handler.uploadError(file, serverData.code, serverData.message);
                    }
                    else {
                        UploadFileTools.Uploader.updateStatus(file, "上传成功！");
                        UploadFileTools.Uploader.Handler.saveServerData(file, serverData);
                    }
                },
                //单个文件上传失败
                uploadError: function (file, errorCode, message) {
                    if (errorCode) {
                        var errorName = "";
                        switch (errorCode) {
                            case UploadFileTools.Uploader.Result.HTTP_ERROR:
                                errorName = errorCode + "--" + message || "应用服务器错误！";
                                break;
                            case UploadFileTools.Uploader.Result.MISSING_UPLOAD_URL:
                                errorName = errorCode + "--" + message || "文件接收地址无效！";
                                break;
                            case UploadFileTools.Uploader.Result.IO_ERROR:
                                errorName = errorCode + "--" + message || "文件写入错误！";
                                break;
                            case UploadFileTools.Uploader.Result.SECURITY_ERROR:
                                errorName = errorCode + "--" + message || "网络安全限制！";
                                break;
                            case UploadFileTools.Uploader.Result.UPLOAD_LIMIT_EXCEEDED:
                                errorName = errorCode + "--您只能上传" + message + "个文件！";
                                break;
                            case UploadFileTools.Uploader.Result.UPLOAD_FAILED:
                                errorName = errorCode + "--" + message || "上传失败！";
                                break;
                            case UploadFileTools.Uploader.Result.SPECIFIED_FILE_ID_NOT_FOUND:
                                errorName = errorCode + "--" + message || "配置信息错误！";
                                break;
                            case UploadFileTools.Uploader.Result.FILE_VALIDATION_FAILED:
                                errorName = errorCode + "--" + message || "文件格式不正确！";
                                break;
                            case UploadFileTools.Uploader.Result.FILE_CANCELLED:
                                errorName = errorCode + "--" + message || "取消上传！";
                                break;
                            case UploadFileTools.Uploader.Result.UPLOAD_STOPPED:
                                errorName = errorCode + "--" + message || "停止上传！";
                                break;
                            case UploadFileTools.Uploader.Result.SUCCESS:
                                errorName = message;
                                break;
                            case UploadFileTools.Uploader.Result.File_FAILED:
                                errorName = errorCode + "--" + message || "上传文件无效！";
                                break;
                            case UploadFileTools.Uploader.Result.SERVER_ERROR:
                                errorName = errorCode + "--" + message || "服务器端操作附件发生异常！";
                                break;
                            default:
                                errorName = errorCode + "--" + message || "未知错误！";
                                break;
                        }
                        UploadFileTools.Uploader.updateStatus(file, errorName);
                    }
                },
                //保存服务器数据
                saveServerData: function (file, fileData) {
                    if (UploadFileTools.ToolsDefault.saveServerData)
                        UploadFileTools.ToolsDefault.saveServerData(file, fileData);
                }
            }
        },

        //控件配置
        _SetSWFUploadOptions: function () {
            var swfUploadOptions = {};
            //swfUploadOptions.upload_url = UploadFileTools.ToolsDefault.rootPath + UploadFileTools.ToolsDefault.upload_url || "Sys_attachfile/UploadFile.do"; //接受文件地址
            var usepathrule;
            if (UploadFileTools.ToolsDefault.use_FileStorePathRule) {
                usepathrule = UploadFileTools.ToolsDefault.use_FileStorePathRule;
            }
            else {
                usepathrule = UploadFileTools._defaults.use_FileStorePathRule;
            }
            var key = GlobalTools.cookies.get("access_token");
        	var val = GlobalTools.cookies.get(key);
        	if(val){
        		val = urlEncode(val);
        	}
        	
        	var root = UploadFileTools.ToolsDefault.rootPath;//默认是上传附件所在页面的相对路径
            var _uploadUrl = (UploadFileTools.ToolsDefault.upload_url || UploadFileTools._defaults.upload_url);
        	var urlStr = (UploadFileTools.ToolsDefault.rootPath + _uploadUrl) +((_uploadUrl.indexOf("?")!=-1?"&":"?")+
                	"key="+key+"&val="+val+"&usepathrule=" + usepathrule + "&storepath=" + (UploadFileTools.ToolsDefault.store_path || UploadFileTools._defaults.store_path) + "&" + getAccessTokenName() + "=" + getAccessTokenCookie());
        	swfUploadOptions.upload_url = urlStr; //接受文件地址
            swfUploadOptions.flash_url = root + (UploadFileTools.ToolsDefault.flash_url || UploadFileTools._defaults.flash_url); //flash文件地址
            swfUploadOptions.flash_cab_url = root + (UploadFileTools.ToolsDefault.flash_cab_url || UploadFileTools._defaults.flash_cab_url); //flash插件安装地址

           /* alert(swfUploadOptions.upload_url);
            alert(swfUploadOptions.flash_url);*/
            //alert(swfUploadOptions.flash_cab_url);

            swfUploadOptions.file_types = UploadFileTools.ToolsDefault.file_types || "*.*"; //允许上传的文件类型
            swfUploadOptions.file_types_description = UploadFileTools.ToolsDefault.file_types_description || "All Files"; //允许上传文件描述
            swfUploadOptions.file_size_limit = UploadFileTools.ToolsDefault.file_size_limit || 0; //单个文件允许最大值，0不限制 可用的单位有B,KB,MB,GB 默认KB
            swfUploadOptions.file_upload_limit = UploadFileTools.ToolsDefault.file_upload_limit || 0; //允许上传的最多文件数量 0不限制
            swfUploadOptions.file_queue_limit = UploadFileTools.ToolsDefault.file_queue_limit || 0; //文件上传队列中等待文件的最大数量限制
            swfUploadOptions.file_post_name = "Filedata";

            swfUploadOptions.button_placeholder_id = "BtnFindFiles"; //指定了swfupload.swf将要替换的页面内的DOM元素的ID值。
            swfUploadOptions.button_width = 55; //设置该SWF的宽度属性
            swfUploadOptions.button_height = 20; //设置该SWF的高度属性
            swfUploadOptions.button_text = UploadFileTools.ToolsDefault.button_text || UploadFileTools._defaults.button_text; //置Flash Button中显示的文字，支持HTML。
            swfUploadOptions.button_action = SWFUpload.BUTTON_ACTION.SELECT_FILES;
            swfUploadOptions.button_text_style = ""; //置Flash Button中显示的文字CSS样式。
            swfUploadOptions.button_image_url = UploadFileTools.ToolsDefault.rootPath + (UploadFileTools.ToolsDefault.flash_cab_url || UploadFileTools._defaults.button_image_url); //上传按钮图片
            swfUploadOptions.button_text_top_padding = 2; //设置Flash Button上文字距离顶部的距离，可以使用负值。
            swfUploadOptions.button_text_left_padding = 3; //设置Flash Button上文字距离左侧的距离，可以使用负值。
            swfUploadOptions.button_cursor = SWFUpload.CURSOR.HAND;
            //handler
            swfUploadOptions.swfupload_loaded_handler = UploadFileTools.Uploader.Handler.InitBtnEvent; //Flash元素加载完毕后
            swfUploadOptions.file_dialog_complete_handler = UploadFileTools.Uploader.Handler.dialogComplete; //文件选择完成后
            swfUploadOptions.file_queued_handler = UploadFileTools.Uploader.Handler.fileQueued; //文件队列加载完成后
            swfUploadOptions.file_queue_error_handler = UploadFileTools.Uploader.Handler.fileQueueError; //文件队列加载失败时
            swfUploadOptions.upload_start_handler = UploadFileTools.Uploader.Handler.uploadStart; //开始上传时
            swfUploadOptions.upload_progress_handler = UploadFileTools.Uploader.Handler.uploadProgress; //单个文件上传进度
            swfUploadOptions.upload_success_handler = UploadFileTools.Uploader.Handler.uploadSuccess; //单个文件上传成功了
            swfUploadOptions.upload_error_handler = UploadFileTools.Uploader.Handler.uploadError; //单个文件上传失败
            swfUploadOptions.upload_complete_handler = UploadFileTools.Uploader.Handler.uploadComplete; //单个文件上传完成，包含失败和成功
            
            //swfUploadOptions.preserve_relative_urls = false; //
           // swfUploadOptions.prevent_swf_caching = false; //
            

            UploadFileTools.SWFUploadOCX = new SWFUpload(swfUploadOptions);
        },
        //更新附件上传状态
        ChangeStatusBar: function (file) {
            $("#Span_CurrentSpeed").text(SWFUpload.speed.formatBytes(file.currentSpeed));
            $("#Span_AvgSpeed").text(SWFUpload.speed.formatBytes(file.averageSpeed));
            $("#Span_Remaining").text(SWFUpload.speed.formatTime(file.timeRemaining));
            $("#Span_Elapsed").text(SWFUpload.speed.formatTime(file.timeElapsed));
        },
        //选择文件
        SelectFiles: function () {
            UploadFileTools.SWFUploadOCX.UploadFileTools.SelectFiles();
        },
        //删除文件
        DeleteUploadFile: function (it) {
            $.messager.confirm('操作确认', '确定删除?', function (result) {
                if (result) {
                    var fileDataId;
                    var fileid = $(it).attr("recordid");
                    UploadFileTools.SWFUploadOCX.cancelUpload(fileid, false);

                    var row = $('#SWFUploadGrid').datagrid('getSelected');
                    if (row) {
                        fileDataId = row.FileDataId;
                        $('#SWFUploadGrid').datagrid('deleteRow', $('#SWFUploadGrid').datagrid('getRowIndex', row));
                    }
                    /*if (UploadFileTools.SWFUploadOCX.getStats().files_queued == 0) {
                     $('#SWFUploadGrid').datagrid("loadData", []);
                     UploadFileTools.ResetDefault();
                     }
                     else {
                     //记录上传文件个数
                     $("#Span_TotalFileCount").text(UploadFileTools.SWFUploadOCX.getStats().files_queued);
                     }*/
                    //记录上传文件个数
                    $("#Span_TotalFileCount").text($("#Span_TotalFileCount").text()-1);
                    if(fileDataId && fileDataId.length!=0){
                        $.ajax({
                            url:UploadFileTools.ToolsDefault.rootPath + UploadFileTools.ToolsDefault.destroyFile_url,
                            type:"POST",
                            data:{ids:row.FileDataId}
                        });
                    }
                }
            });
        },
        //取消上传
        CancelUploadFile: function () {
            var fileRows = $('#SWFUploadGrid').datagrid("getRows");
            for (var index = 0; index < fileRows.length; index++) {
                if (fileRows[index].id) {
                    UploadFileTools.SWFUploadOCX.cancelUpload(fileRows[index].id);
                }
            }
            $("#Btn_Start").find('.l-btn-text').text("开始上传")
            $("#Btn_Start").unbind().attr("disabled", "disabled");
            $("#Btn_Start_Icon").removeClass("l-icon-back").addClass("l-icon-up");
            $("#Btn_Clear").removeAttr("disabled").unbind().click(function () { UploadFileTools.ClearGridData(); });
            $("#UploadStatus").html("");
        },
        //清空列表
        ClearGridData: function () {
            var fileRows = $('#SWFUploadGrid').datagrid("getRows");
            for (var index = 0; index < fileRows.length; index++) {
                if (fileRows[index].id) {
                    UploadFileTools.SWFUploadOCX.cancelUpload(fileRows[index].id, false);
                }
            }

            $('#SWFUploadGrid').datagrid("loadData", []);
            UploadFileTools.ResetDefault();
        },
        //开始上传
        StartUploadFile: function () {
            //开始上传后将按钮名称修改为取消上传，同时将事件修改为取消事件
            $("#Btn_Start").find('.l-btn-text').text("取消上传")
            $("#Btn_Start").unbind().click(function () { UploadFileTools.CancelUploadFile(); });
            $("#UploadStatus").html("<img src='" + UploadFileTools.ToolsDefault.rootPath + "platform/ScriptSource/SWFUpload/Style/Uploading.gif' style='width: 22px; height: 22px' />").attr("title", "正在上传中……");
            $("#Btn_Clear").unbind().attr("disabled", "disabled");

            UploadFileTools.SWFUploadOCX.startUpload();
        },
        //恢复默认设置
        ResetDefault: function () {
            $("#Btn_Start").find('.l-btn-text').text("开始上传")
            $("#Btn_Start").unbind().attr("disabled", "disabled");
            $("#Btn_Start_Icon").removeClass("l-icon-back").addClass("l-icon-up");
            $("#Btn_Clear").unbind().attr("disabled", "disabled");
            $("#UploadStatus").html("");

            //记录上传文件个数
            $("#Span_TotalFileCount").text("0");
            //当前速度
            $("#Span_CurrentSpeed").text("0 KB/S");
            //平均速度
            $("#Span_AvgSpeed").text("0 KB/S");
            //剩余时间
            $("#Span_Remaining").text("0 S");
            //已用时间
            $("#Span_Elapsed").text("0 S");
        },
        //保存数据
        saveServerData: function (file, fileData) {
            UploadFileTools.Uploader.updateStatus(file, "正在写入数据库...");
            /*
            此处发送Ajax请求，将附件在服务器存储信息保存到服务器
            */
            var postParams = {};
            if (UploadFileTools.ToolsDefault.setPostParams)
                postParams = $.extend({}, UploadFileTools.ToolsDefault.setPostParams());
            postParams.filename = fileData.filename;
            postParams.extname = fileData.extname;
            postParams.contenttype = fileData.contenttype;
            postParams.filesize = fileData.filesize;
            postParams.storename = fileData.filestorename;
            postParams.storepath = fileData.filestorepath;
            postParams.filestorefullpath = fileData.filestorefullpath;
            postParams.isabsolutepath = fileData.isabsolutepath;
            GlobalTools.ajax({
                url: UploadFileTools.ToolsDefault.rootPath + UploadFileTools.ToolsDefault.saveFileData_url,
                type: "post",
                data: postParams,
                success: function (data, message) {
                    UploadFileTools.Uploader.updateStatus(file, "保存成功");
                    $("#SWFUploadGrid").datagrid("selectRecord",file.id)
                        .datagrid("getSelected").FileDataId=data.id;
                    if (UploadFileTools.ToolsDefault.uploadSuccess)
                        UploadFileTools.ToolsDefault.uploadSuccess(data, message);
                },
                error: function (message) {
                    UploadFileTools.Uploader.updateStatus(file, "保存失败");
                    if (UploadFileTools.ToolsDefault.uploadError)
                        UploadFileTools.ToolsDefault.uploadError(message);
                }
            });
        }
    };
})(jQuery);

$(function () {
    if (!UploadFileTools.ToolsDefault.upload_url) {
        UploadFileTools.init();
    }
});
//格式化进度条
function formatFileProcess(value, row, index) {
    return "<div id='FileProcess_" + row.id + "' style='height:100%;width:0%; background-color:Green;text-align:center;' >" + value + "</div>";
}
//格式化上传状态
function formatFileStatus(value, row, index) {
    return "<div id='FileSpan_" + row.id + "' style='width:100%; height:100%;'>" + value + "</div>";
}
//格式删除单元格
function formatFileDelete(value, row, index) {
    return "<img dataid='"+row.dataid+"' recordid='" + row.id + "' src='../../../platform/ScriptSource/SWFUpload/Style/delete.png' style='cursor:pointer;' onclick='this.parentNode.parentNode.click();UploadFileTools.DeleteUploadFile(this);' />";
}