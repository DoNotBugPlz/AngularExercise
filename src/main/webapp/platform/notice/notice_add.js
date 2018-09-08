(function ($,rootPath) {
    'use strict';

    //通知表单相关控制
    var NoticeForm = {
        reset : function () {
            $("#noticeid").val("");
            $("#txtTitle").val("");
            var nowDate = new Date();
            $("#txtRegdatetime").val(formatDate(nowDate, "yyyy/MM/dd HH:mm:ss"));
            $("#chkIspublic").attr("checked", false);
            $("#hidReceiverids").val("");
            $("#txtReceiverNames").val("");
            $("#txtContent").val("");
        },
        validate : function(){
            if(!$("#txtReceiverNames").val()){
                $.messager.show({
                    title:'提示信息',
                    msg:'请选择接收人！',
                    timeout:1000,
                    showType:'slide'
                });
                return false;
            }
            if(!$("#txtContent").val()){
                $.messager.show({
                    title:'提示信息',
                    msg:'请填写通知内容！',
                    timeout:1000,
                    showType:'slide'
                });
                return false;
            }
            if($("#txtContent").val().length > 500){
                $.messager.show({
                    title:'提示信息',
                    msg:'通知内容限于500字！',
                    timeout:1000,
                    showType:'slide'
                });
                return false;
            }
            return true;
        },
        save : function () {
            if(!NoticeForm.validate()){
                return;
            }
            $("#noticeForm").attr("action",rootPath+"notice/save");
            GlobalTools.submitForm($("#noticeForm"), {success: success, error: error});
            function success(data) {
                $("#noticeid").val(data); //将新添加的记录id写入
                $.messager.show({
                    title:'提示信息',
                    msg:'通知信息保存成功！',
                    timeout:3000,
                    showType:'slide'
                });
            }
            function error() {
                $.messager.alert("提示信息", "通知信息保存失败！", "error");
            }
        },
        bindEvent : function(){
            var that = this;
            $("#saveNotice").bind("click",that.save);
            $("#addNotice").bind("click",that.reset);
        }
    };

    //接收人相关控制
    var Receiver = {
        openUserCheckDialog : function () {
            $("#userSelectTree").tree({
                url: rootPath + "Sys_dept/LoadListDeptUsersTree",
                cascadeCheck: true,
                checkbox: true
            });
            $("#divSelectUser").dialog("open");
        },
        fillCheckedUsers : function () {
            var nodes = $('#userSelectTree').tree('getChecked');
            var leaderName = '';
            var leaderId = '';
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id.indexOf("dept") < 0)//排除部门
                {
                    if (leaderName != '') {
                        leaderName += ',';
                        leaderId += ',';
                    }
                    leaderName += nodes[i].text;
                    leaderId += nodes[i].id.replace("user_", "");
                }
            }
            $("#hidReceiverids").val(leaderId);
            $("#txtReceiverNames").val(leaderName);
            Receiver.closeUserCheckDialog();
        },
        closeUserCheckDialog : function () {
            $("#divSelectUser").dialog("close");
        },
        bindEvent : function(){
            var that = this;
            $("#checkedUsersOk").bind("click",that.fillCheckedUsers);
            $("#checkedUsersCancel").bind("click",that.closeUserCheckDialog);
            $("#txtReceiverNames").bind("click", that.openUserCheckDialog);
        }
    };

    $(function () {
        loadNoticeForm();
        NoticeForm.bindEvent();
        Receiver.bindEvent();

        //easyui的dialog默认是一开始就会显示的且没有相关属性可以修改默认，所以需要显示调用一下关闭方法
        Receiver.closeUserCheckDialog();
    });

    //加载通知表单
    function loadNoticeForm(){
        var noticeId = getUrlParam("id");
        if (noticeId) {
            GlobalTools.loadForm($("#noticeForm"), {
                url: rootPath + "notice/form/" + noticeId,
                isNormalModel: false
            });
        }
        else {
            $("#aDelete").hide();
            GlobalTools.ajax({
                type: "GET",
                url: rootPath + "Sys_user/GetRegerInfo",
                success: function(data){
                    $("#hidRegerid").val(data.userid);
                    $("#txtRegername").val(data.username);
                    $("#hidRegerdeptid").val(data.deptid);
                    $("#txtRegerdeptname").val(data.deptname);
                    $("#txtRegdatetime").val(data.datetime);
                }
            });
        }
    }

})(jQuery,"../../");