var rootPath = "../../../";
var insactivityid = Request("insactivityid");
var insprocessid = Request("insprocessid");
var rectPathIsFlowCustom = true; //节点和连线是否的标识是否由myflow重新定义过
var info;
$(function () {
    initMyFlow();
    $.ajax({
        async: true,
        url: rootPath + 'Sys_ins_process/GetDefProcessInfo.do',
        data: {insprocessid: insprocessid},
        success: function (data) {
            if (data && data.data) {
                var str = "<b>" + data.data.chinaname + " V" + data.data.version + "</b><br> <font color=\"green\">绿色</font>：办理结束的环节<br /> <font color=\"red\">红色</font>：正在办理的环节";
                $.messager.show({msg: str, title: '提示信息', timeout: 0});
            }
        }
    });
});
function Request(key) {
    var retValue = (window.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    return (retValue == null ? "" : retValue);
}
/*流程初始化 获取流程数据*/
function initMyFlow() {
    $.ajax({
        cache: false,
        type: "POST",
        async: true,
        url: rootPath + "WorkFlowFormCommon/GetRectPathInfos.do",
        data: {insactivityid: insactivityid, insprocessid: insprocessid},
        dataType: 'json',
        success: function (data) {
            if (typeof data != "object") {
                //info = eval("([" + data + "])")[0];
                data = eval("(" + data + ")");
            }
            info = data.data;
            loadWorkFlowMap();
            rectPathIsFlowCustom = true;
        }
    });

}
//绘制流程图

function loadWorkFlowMap() {
    try {
        $("#myflow").html(""); //清除上一次的图
        $('#myflow').myflow(
            {
                basePath: "",
                restore: eval("({states:{" + info.rects + "},paths:{" + info.paths + "}})"),
                editable: false,
                activeRects: {// 当前激活状态
                    rects: eval("([" + info.activeRects + "])")
                },
                historyRects: {// 历史激活状态
                    rects: eval("([" + info.historyRects + "])")
                }
            });
    }
    catch (e) {
        alert(e);
    }
}

function getInsActStatus(status) {
    switch (status) {
        case "running":
            return "正在执行";
            break;
        case "complete":
            return "已办结";
            break;
        case "pause":
            return "暂停、挂起";
            break;
        case "stop":
            return "终止";
            break;
        case "waitundertake":
            return "待接手";
            break;
        case "waitsubprocess":
            return "等待子流程办结";
            break;
        case "hassentsubprocess":
            return "已发送子流程";
            break;
        case "waitcountersign":
            return "主持人等其他会签人办结";
        case "waitcustomprocess":
            return "等待自定义流程办结";
            break;
        case "hassentcustomprocess":
            return "已发送自定义流程";
            break;
    }
}
function showDivInsActInfo(defActid, title) {
    var divShowInsActs = $('#divShowInsActInfo');
    divShowInsActs.html(null);
    $.ajax({
        url: rootPath + "Sys_ins_process/GetInsActInfos?defactid=" + defActid + "&inprocessid=" + insprocessid,
        type: "GET",
        success: function (data) {
            var html = "";
            if (data.length > 0) {
                html = "";
                for (var index = 0, len = data.length; index < len; index++) {
                    if (index > 0) {
                        html += "<hr>";
                    }
                    if (data[index].type == "start") {
                        html += "<span>登记人：</span><span style='color:#0000ff'>"+data[index].receivername+"</span>；<span>登记时间：</span><span style='color:#0000ff'>"+data[index].receivetime+"</span><br><span>办理状态：</span><span style='color:#0000ff'>"+getInsActStatus(data[index].status)+"</span>；";
                        if(data[index].status=='complete'){
                            html+="<span>完成时间：</span><span style='color:#0000ff'>"+data[index].factfinishtime+"</span>";
                        }
                    } else {
                        html += "<span>发送人：</span><span style='color:#0000ff'>"+data[index].sendername+"</span>；<span>发送时间：</span><span style='color:#0000ff'>"+data[index].sendtime+"</span>";
                        if(data[index].receivername){
                            html += "<br><span>接收人：</span><span style='color:#0000ff'>"+data[index].receivername+"</span>；<span>接收时间：</span><span style='color:#0000ff'>"+data[index].receivetime+"</span>";
                        }else{
                            html += "<br><span>待接收人：</span><span style='color:#0000ff'>"+data[index].allowreceivernames+"</span>";
                        }
                        html+="<br><span>办理状态：</span><span style='color:#0000ff'>"+getInsActStatus(data[index].status)+"</span>；";
                        if(data[index].status=='complete'){
                            html+="<span>完成时间：</span><span style='color:#0000ff'>"+data[index].factfinishtime+"</span>";
                        }
                    }
                }
            }
            divShowInsActs.html(html);

            divShowInsActs.show().dialog({
                title: title + ' 办理信息',
                width: 400,
                height: 280,
                closed: false,
                cache: false,
                modal: true
            });
        }
    });
}


