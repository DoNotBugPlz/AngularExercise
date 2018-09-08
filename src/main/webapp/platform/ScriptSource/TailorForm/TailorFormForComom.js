var fieldList;
window.onload = function(){

        currentRecordId = Request("recordid");//当前表单记录主键
        currentSummaryRecordId = Request("summaryrecordid"); //当前表单对应的父表记录的id（用于文书的可能）
        tailorFormType = Request("tailorformtype"); //表单类型 在添加非主表单时有用
        parentRecordId = Request("temprecordid");
        parentTableName =  Request("temptablename");
  var  btnsHtml="<a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"saveTailorForm();\">保存</a> ";
    $("#toptoolbar").append(btnsHtml);
    $.parser.parse($("#toptoolbar")); //easyui渲染

    getFormData(); //获取表单数据
    setControlValue();
}
//让input框看上去像填满td的样子;.canEdit-style是设置了可编辑的控件的默认背景色样式
function setInputFull(){
    $("input,span").css({"border":"0"});
    $.each($("td:has(input)"),function(index,item){
        $(item).css("background-color",$($(item).find(".canEdit-style")[0]).getBackgroundColor());
    });
    $.each($("td:has(span)"),function(index,item){
        $(item).css("background-color",$($(item).find(".canEdit-style")[0]).getBackgroundColor());
    });
}

$(function () {
    //初始化人员选择对话框
    OrganizationTools.user_Init({ id: "tailorFormUser", rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectUserOK });
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ id: "tailorFormDept", rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK });
});

//表单验证是否通过
function isValidate(){
    return $("#TailorForm").form("validate");
}

//保存表单
function saveTailorForm() {
    //判断是否允许保存表单
    if(!isValidate()){
        GlobalTools.tip("表单验证未通过，不能保存！");
        return;
    }
    GlobalTools.submitForm($("#TailorForm"), { async:false,
        submiturl: rootPath + 'Form/SaveForm.do?summaryrecordid=' + currentSummaryRecordId, success: saveFormSuccess });
}

function saveFormSuccess(formData) {
    GlobalTools.tip("保存成功");
    GlobalTools.buildForm($("#TailorForm"), formData, true);
}

//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ id: "tailorFormDept", sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple, onOKClick: selectDeptOK });
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
    $("[name='" + $(sourceElement).attr("comboname") + "']").val(text);
    $("[name='" + $(sourceElement).attr("valuefieldname") + "']").val(ids);
}

//点击  选择人员 可展开的节点，加载子节点
function showUserTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ id: "tailorFormUser", sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple, onOKClick: selectUserOK });
}
//选择人员后回调函数
function selectUserOK(treeNodes, sourceElement) {
    var text = "", ids = "";
    $.each(treeNodes, function (index, item) {
        if (ids != '') {
            text += ',';
            ids += ',';
        }
        text += item.text;
        ids += item.id.toString().ReplaceAll("user_", "");
    });
    $(sourceElement).combobox("setText", text);
    $("[name='" + $(sourceElement).attr("comboname") + "']").val(text);
    $("[name='" + $(sourceElement).attr("valuefieldname") + "']").val(ids);
}

//获取表单控件信息
function getFormData() {
    GlobalTools.ajax({
        async: false,
        url: rootPath + 'Form/LoadForm.do',
        data: { recordid: currentRecordId, summaryrecordid: currentSummaryRecordId, tailorformid: $("#tailorformid").val() }, //id 具体表的记录id
        loading: '正在加载表单数据中...',
        success: function (data) {
            fieldList = data;
            if (typeof (fieldList) == "string") {
                fieldList = eval("(" + fieldList + ")");
            }
        }
    });
}

//找到相应name的表单元素，并赋值；
function setControlValue() {
    var mainform = $("#TailorForm");
    for (var index in fieldList) {
        if (fieldList[index].fieldvalue == null && fieldList[index].fieldtype != "singleselectinput" && fieldList[index].fieldtype != "multiselectinput" && fieldList[index].fieldtype != "filelistcontrol" && fieldList[index].fieldtype != "importdocument") {
            continue;
        }

        switch (fieldList[index].fieldtype) {
            case "textinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[name="' + fieldList[index].fieldname + '"]').each(function () {
                        if (this.type == "checkbox" || this.type == "radio") {
                            if ((',' + fieldList[index].fieldvalue + ',').indexOf(',' + this.value + ',') >= 0) {
                                $(this).attr("checked", 'checked');
                            }
                        }
                        else {
                            $(this).val(fieldList[index].fieldvalue);
                        }
                    });
                }
                break;
            case "hiddeninput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[name="' + fieldList[index].fieldname + '"]').val(fieldList[index].fieldvalue);
                }
                break;
            case "multitextinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[name="' + fieldList[index].fieldname + '"]').val(fieldList[index].fieldvalue).removeClass("validatebox-invalid");
                }
                break;
            case "intnumberinput":
            case "floatnumberinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    var tempJqueryObj = mainform.find("[numberboxname='" + fieldList[index].fieldname + "']");
                    try {
                        if (tempJqueryObj.hasClass("easyui-numberspinner")) {
                            tempJqueryObj.numberspinner('setValue', fieldList[index].fieldvalue);
                        }
                        else {
                            tempJqueryObj.numberbox('setValue', fieldList[index].fieldvalue);
                        }
                    }
                    catch (e) { }
                    //  $('input[numberboxname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                }
                break;
            case "dateinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datebox('setValue', fieldList[index].fieldvalue);
                    //  $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                }
                break;
            case "datetimeinput":
                if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                    mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datetimebox('setValue', fieldList[index].fieldvalue);
                    //                        $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                }
                break;
            case "singleselectinput":
                if (fieldList[index].datasource && fieldList[index].datasource.length > 0) {
                    setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                    if (fieldList[index].fieldvalue) {
                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setValue', fieldList[index].fieldvalue);
                    }
                }
                else {
                    if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setText', fieldList[index].fieldvalue);
                    }
                }
                break;
            case "multiselectinput":
                if (fieldList[index].datasource && fieldList[index].datasource.length > 0) {
                    setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                    mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setValues', (fieldList[index].fieldvalue ? fieldList[index].fieldvalue.split(',') : []));
                }
                else {
                    if (fieldList[index].fieldvalue || fieldList[index].fieldvalue ==0) {
                        mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setText', fieldList[index].fieldvalue);
                    }
                }
                break;

        }
    }
    if (currentSummaryRecordId) {//外键赋值
        mainform.find("input[fieldtype='foreigntablekey']").val(currentSummaryRecordId);
    }
}

//设置下拉框的选项集合
function setDatatoCombobox(mainform, comboname, datas) {
    if (datas) {
        var dataSource = datas;
        if (typeof (dataSource) == "string") {
            eval("(" + dataSource + ")");
        }
        mainform.find('[comboname="' + comboname + '"]').combobox('loadData', dataSource);
    }
}