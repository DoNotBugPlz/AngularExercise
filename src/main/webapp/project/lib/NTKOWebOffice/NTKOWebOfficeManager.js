/**
*
*
创建NTKOWebOffice控件，初始化工具类以及业务逻辑处理类
*
*/
(function ($) {
    window['WEBOFFICE_CONFIG'] = {}; //系统全局配置项
    var NTKOWebOffice = window['NTKOWebOffice'] = {
        WebOfficeOCX: null, //文档控件
        browser:"",
        defaults: {
            loadEmptyDocument: false, //默认不加载空word
//            rootPath: "http://localhost:8080/tlgada/", //只提供给loadServerDocument用
            rootPath: "", //只提供给loadServerDocument用
            webOfficeId: "TANGER_OCX",
            initDocumentType: 1, //1:Word.Document;2:Excel.Sheet;3:PowerPoint.Show;4:Visio.Drawing;5:MSProject.Project;6:WPS Doc;7:KingsoftSheet;
            postFile: "Filedata", //文档内容以PostFile发送到服务器时使用的名称
            postData: "", //发送至服务器的参数，格式：key1=value1&key2=value2&key3=value3
            fileName: "", //文件名称
            postFormId: "", //连带发送到服务器的Form控件ID，默认：""
            saveDocumentActionPath: "", //保存Office内容的服务器请求Url地址
            loadDocumentActionPath: "lib/NTKOWebOffice/Template.doc", //下载Office内容的服务器请求Url地址
            coverRedHeadPath: "",//下载Office内容的服务器请求Url地址
            onSaveSuccess:null////保存文档到服务器的回调函数
        },
        //获取全局配置参数对象
        getOptions: function (options) {
            return $.extend({}, NTKOWebOffice.defaults, WEBOFFICE_CONFIG, options);
        },
        //初始化控件参数
        init: function (options) {
            var opt = NTKOWebOffice.getOptions(options);
            WebOfficeOCX = NTKOWebOffice.WebOfficeOCX = document.getElementById("TANGER_OCX");
            if(NTKOWebOffice.browser=="IE"){
                NTKOWebOffice.initIEEvent();
            }
            WebOfficeOCX.Menubar = false; //不显示工具条
            if (opt.loadEmptyDocument){
            	NTKOWebOffice.loadServerDocument({ loadDocumentActionPath: opt.rootPath + opt.loadDocumentActionPath||NTKOWebOffice.defaults.loadDocumentActionPath });
            }
        },
        initIEEvent:function(){
            // addEventListener
            //注册打开文本结束事件
            WebOfficeOCX.attachEvent("AfterOpenFromURL",function () {
                EventBus.dispatch('NTKOWebOffice_AfterOpenFromURL');
            });
            //注册保存文本结束事件
            WebOfficeOCX.attachEvent("OnSaveToURL",function (){
                EventBus.dispatch('NTKOWebOffice_OnSaveToURL');
            });
        },
        //设置文档编辑状态
        setDocumentSaveStatus: function (boolSaved) {
            //Office自己的属性
            WebOfficeOCX.ActiveDocument.Saved = boolSaved;
        },
        //获取当前文档编辑状态
        getDocumentSaveStatus: function () {
            return WebOfficeOCX.ActiveDocument.Saved;
        },
        //设置文档是否允许打印
        setDocumentAllowPrint: function (blnAllow) {
            WebOfficeOCX.fileprint = blnAllow;
        },
        //设置文档是否允许另存为
        setDocumentAllowSaveAs: function (blnAllow) {
            WebOfficeOCX.FileSaveAs = blnAllow;
        },
        //设置是否保留痕迹
        setDocumentReviewMode: function (blnReview) {
            if (WebOfficeOCX.doctype == 1) {//只有Word文档才能设置是否保留痕迹
                WebOfficeOCX.ActiveDocument.TrackRevisions = blnReview;
            }
        },
        //设置是否显示痕迹
        setDocumentShowRevisions: function (blnShow) {
            if (WebOfficeOCX.doctype == 1) {//只有Word文档才能设置是否显示痕迹
                WebOfficeOCX.ActiveDocument.ShowRevisions = blnShow;
            }
        },
        //接受或者取消所有修订
        acceptAllRevisions: function (blnAccept) {
            if (blnAccept) {
                WebOfficeOCX.ActiveDocument.AcceptAllRevisions(); //接受所有的痕迹修订
            }
            else {
                WebOfficeOCX.ActiveDocument.Application.WordBasic.RejectAllChangesInDoc(); //拒绝所有的痕迹修订
            }
        },
        //加载服务器文档
        loadServerDocument: function (options, callback) {
            var opt = NTKOWebOffice.getOptions(options);
            try {
                var doctype = "word.document";
                switch (opt.initDocumentType) {
                    case 1:
                        doctype = "word.document";
                        break;
                    case 2:
                        doctype = "Excel.Sheet";
                        break;
                    case 3:
                        doctype = "powerpoint.show";
                        break;
                }
                if(callback){//callback将在OnComplete中被执行，是为了保证填充发生在模版加载完成之后
                	WebOfficeOCX.callback = callback;
                }
                WebOfficeOCX.BeginOpenFromURL(opt.rootPath + opt.loadDocumentActionPath,doctype);
                if(callback){//IE下OnComplete方法不能被执行，所以再填充一次,兼容IE
                	setTimeout(callback, 3000);
                }
            } catch (e) { }
        },

        //保存文档到服务器
        saveDocumentToServer: function (options) {
            var opt = NTKOWebOffice.getOptions(options);
            if(opt.onSaveSuccess && typeof opt.onSaveSuccess == "function"){
            	saveDocumentToServerCallback = opt.onSaveSuccess;//全局的变量，为了在异步调用的情况下 OnSaveToURL回调方法能利用saveDocumentToServerCallback变量
            }
            var retData = WebOfficeOCX.SaveToURL(opt.saveDocumentActionPath, opt.postFile, opt.postData, opt.fileName, opt.postFormId,false);
            // if (NTKOWebOffice.browser == "IE") {
            //     if (WebOfficeOCX.StatusCode == 0) {
            //         if (retData && !retData.iserror) {
            //             retData = eval("(" + retData + ")");
            //             if(opt.onSaveSuccess && typeof opt.onSaveSuccess == "function"){
            //             	opt.onSaveSuccess(retData);
            //             }
            //             AppTools.successTips("保存成功！");
            //             return retData.data;
            //         } else {
            //             AppTools.errorTips("保存失败！原因：" + retData.message);
            //             return null;
            //         }
            //     } else {
            //         AppTools.errorTips("保存失败！");
            //         return null;
            //     }
            // }
        },
        //加载本地文档
        loadLocalDocument: function (options) {
            var opt = NTKOWebOffice.getOptions(options);
            WebOfficeOCX.ShowDialog(1); //0：新建对象;1：打开;2：保存;3：另存为;4：打印;5：打印设置;	6：文件属性;
        },
        isBookMarkExists:function(bookMarkValue) {
            var bkmkObjs = WebOfficeOCX.ActiveDocument.BookMarks;
            if (bkmkObjs.count > 0) {
                if (bkmkObjs.Exists(bookMarkValue)) {
                    return true;
                }
            }
            return false;
        },
        //插入书签
        insertBookMark: function (bookMarkName, bookMarkValue) {
            try {
                var document = WebOfficeOCX.ActiveDocument;
                var curSelection = document.Application.Selection;
                var curRange = curSelection.Range;
                curSelection.TypeText(" ");
                curRange.Text = "[" + bookMarkName + "]"; //设置书签内容
                document.Bookmarks.Add(bookMarkValue, curRange); //在光标位置插入书签
            }
            catch (Error) {
                AppTools.errorTips("插入书签错误：" + Error.Description);
            }
        },
        //设置书签内容
        setBookMarkValue: function (bookMarkName, bookMarkValue) {
            WebOfficeOCX.SetBookmarkValue(bookMarkName, bookMarkValue);
        },
        //删除书签
        deleteBookMark: function (bookMarkName) {
            try {
            	var document = WebOfficeOCX.ActiveDocument;
                //document.Bookmarks(bookMarkName).Range.Delete();
                document.Bookmarks.Item(bookMarkName).Range.Delete();
            }
            catch (Error) {
                AppTools.errorTips("删除书签错误：" + Error.Description);
            }
        },
        //通过服务器文档内容替换书签
        replaceBookMark: function (bookMarks, options) {
            var opt = NTKOWebOffice.getOptions(options);
            try {
                var document = WebOfficeOCX.ActiveDocument;
                var curPosition = document.Application.Selection;
                //循环替换书签
                var item;
                var docMarks=document.BookMarks;
                var docMarkNames=[];
                for(i=1,scount=docMarks.Count;i<=scount;i++){
                    item=null;
                    for(var tmpIndex in bookMarks) {
                        if(bookMarks[tmpIndex].bookmarkname==docMarks.Item(i).Name){
                            item=bookMarks[tmpIndex];
                            break;
                        }
                    }
                   if(item){
                       if (item.bookmarkname.toLowerCase() == "content") {
                           if (!opt.coverRedHeadPath || opt.coverRedHeadPath == "") { AppTools.errorTips("书签地址无效。"); return; }
                           curPosition.Goto(-1, 0, 0, item.bookmarkname); //光标定位到书签的位置
                           WebOfficeOCX.addtemplatefromurl(opt.coverRedHeadPath);
                       }
                       else {
                           if(item.bookmarkvalue) {
                               WebOfficeOCX.SetBookmarkValue(item.bookmarkname, item.bookmarkvalue);
                           }else{
                               WebOfficeOCX.SetBookmarkValue(item.bookmarkname, "");
                           }
                       }
                   }else{
                       WebOfficeOCX.SetBookmarkValue(docMarks.Item(i).Name, "");
                   }
                }

/*
                for (var index in bookMarks) {
                    item = bookMarks[index];
                    if (!document.BookMarks.Exists(item.bookmarkname)) { continue; }
                    if (item.bookmarkname.toLowerCase() == "content") {
                        if (!opt.coverRedHeadPath || opt.coverRedHeadPath == "") { AppTools.errorTips("书签地址无效。"); return; }
                        curPosition.Goto(-1, 0, 0, item.bookmarkname); //光标定位到书签的位置
                        WebOfficeOCX.addtemplatefromurl(opt.coverRedHeadPath);
                    }
                    else {
                        WebOfficeOCX.SetBookmarkValue(item.bookmarkname, item.bookmarkvalue);
                    }
                }*/
            }
            catch (Error) {
                AppTools.errorTips("替换书签错误：" + Error.Description);
            }
        },
        setValueToExcel: function (rangeName, varValue) {
            WebOfficeOCX.SetRangeValue(1, rangeName, varValue);
        },
        getValueFromExcel: function (rangeName) {
            try {
                WebOfficeOCX.GetRangeValue(1, rangeName);
            }
            catch (e) { }
        },
        setDocReadOnly: function (readOnly) {
            try {
                WebOfficeOCX.SetReadOnly(readOnly, "");
            }
            catch (e) { }
        },
        setFullScreen: function (fullscreen) {
        	try {
        		WebOfficeOCX.FullScreenMode = fullscreen;
        	}
        	catch (e) { }
        }
    };
})(jQuery);

var saveDocumentToServerCallback;
function NTKOWebOffice_OnSaveToURL(type, code, html) {
    var retData;
    if (WebOfficeOCX.StatusCode == 0) {
        retData = eval("(" + html + ")");
        if (retData.iserror) {
            AppTools.errorTips("保存失败！原因：" + retData.message);
            return null;
        } else {
            if(saveDocumentToServerCallback && typeof saveDocumentToServerCallback == "function"){
                saveDocumentToServerCallback(retData);
            }
            AppTools.successTips("保存成功！");
            return retData.data;
        }
    }
}

//AfterOpenFromURL.$inject = ['$scope'];
function NTKOWebOffice_AfterOpenFromURL() {
    //console.log(2);
}