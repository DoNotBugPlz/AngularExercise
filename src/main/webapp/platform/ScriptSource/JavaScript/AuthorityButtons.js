$(function () {
    showHideBtns(["gridToolBar"]);
})

//获取页面的相对路径
function getPathUrl() {
    var pagePath = window.location.pathname;
    return ".." + pagePath.substr(pagePath.substr(1).indexOf('/') + 1);
}

//btnContainerIds 按钮所在的区域
function showHideBtns(btnContainerIds) {
    $.ajax({
        url: rootPath + "Sys_authority/GetCanOperateButtons.do?mainurl=" + getPathUrl(),
        success: function (data) {
            if (data.length > 0) {
                var selector = "";
                for (var index in data) {
                    selector += "[id!='" + data[index].buttonname + "']";
                }
                if (btnContainerIds && btnContainerIds.length > 0) {
                    for (var tmp in btnContainerIds) {
                        $("a.easyui-linkbutton" + selector, $("#" + btnContainerIds[tmp])).remove();
                    }
                }
                else {
                    $("a.easyui-linkbutton" + selector).remove();
                }
            }
        }
    });
}