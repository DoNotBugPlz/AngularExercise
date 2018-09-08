/*
文件说明：
icon选取

接口方法：
1，打开窗口方法：f_openIconsWin
2，保存下拉框ligerui对象：currentComboBox

例子：
可以这样使用(选择ICON完了以后，会把icon src保存到下拉框的inputText和valueField)：
onBeforeOpen: function ()
{
currentComboBox = this;
f_openIconsWin();
return false;
}

*/

//图标
var jiconlist, winicons, SourceComboBox;IconFolderName="";
$(function() {
    jiconlist = $("body > .iconlist:first");
    if (!jiconlist.length) jiconlist = $('<ul class="iconlist"></ul>').appendTo('#winIcons');
});

$(".iconlist li").live('mouseover', function() {
    $(this).addClass("over");
}).live('mouseout', function() {
    $(this).removeClass("over");
}).live('click', function() {
    if (!winicons) return;
    var src = $("img", this).attr("src");
    src = src.replace(/^([\.\/]+)/, '');

    if (SourceComboBox) {
        $(SourceComboBox).combobox("setText", src);
        $(SourceComboBox).combobox("setValue", src);
    }
    $('#winIcons').window('close');  // close a window  
});

function f_openIconsWin() {
    var folderName = (IconFolderName == "deskicon" ? "DeskIcon" : "MenuIcon");
    winicons = $('#winIcons').window({
        title: '选取图标',
        width: 470, height: 280, modal: true
    });

    GlobalTools.ajax({
        loading: '正在加载图标...',
        url: rootPath + "Sys_menu/GetIcons.do",
        data: { folderName: folderName },
        success: function(data) {
            $("li", jiconlist).remove();
            for (var i = 0, l = data.length; i < l; i++) {
                var src = data[i];
                var s = rootPath + "platform/Styles/" + folderName + "/" + src;
                jiconlist.append("<li><img src='" + s + "' /></li>");
            }
            jiconlist.attr("loaded", true);
        }
    });

    return false;
}



