var fieldList, //字段列表
 timeOut, //延时计时器
 currentRecordId = Request("recordid"), //当前表单记录主键
 currentSummaryRecordId = Request("summaryrecordid"); //当前表单对应的父表记录的id（用于文书的可能）

$(function () {
    getFormData(); //获取表单数据
    if (fieldList != null && fieldList.length > 0) {
        timeOut = setTimeout(setControlValue, 500); //控件赋值
    }
});

$(function () {
    //初始化人员选择对话框
    OrganizationTools.user_Init({ rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectUserOK });
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK });
});

//保存表单
function doFormSave() {
    GlobalTools.submitForm($("#TailorForm"), { submiturl: rootPath + 'Form/SaveForm.do?summaryrecordid=' + currentSummaryRecordId, success: saveFormSuccess });
}

function saveFormSuccess(formData) {
    GlobalTools.buildForm($("#TailorForm"), formData, true);
}

//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple });
}

//点击  选择人员 可展开的节点，加载子节点
function showUserTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple });
}


//打开一个对话框，显示单位和部门treegrid
function showDeptTreeGrid() {
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple });
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
    OrganizationTools.user_ShowSelectDialog({ sourceElement: sourceElement, sigleSelect: !$(sourceElement).combobox("options").multiple });
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
    var tailorformid = $("#tailorformid").val();
    if (currentRecordId && tailorformid) {
        GlobalTools.ajax({
            async: false,
            url: rootPath + 'Form/LoadForm.do',
            data: { recordid: currentRecordId, tailorformid: tailorformid },
            loading: '正在加载表单数据中...',
            success: function (data) {
                fieldList = data;
                if (typeof (fieldList) == "string") {
                    fieldList = eval("(" + fieldList + ")");
                }
            }
        });
    }
}

//找到相应name的表单元素，并赋值
function setControlValue() {
    var mainform = $("#TailorForm");
    for (var index in fieldList) {
        //        if (fieldList[index].fieldvalue == null) {
        //            continue;
        //        }

        switch (fieldList[index].fieldtype) {
            case "hiddeninput":
            case "textinput":
            case "multitextinput":
                mainform.find('[name="' + fieldList[index].fieldname + '"]').val(fieldList[index].fieldvalue);
                break;
            case "intnumberinput":
            case "floatnumberinput":
                mainform.find('[numberboxname="' + fieldList[index].fieldname + '"]').numberbox('setValue', fieldList[index].fieldvalue);
                //  $('input[numberboxname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            case "dateinput":
                mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datebox('setValue', fieldList[index].fieldvalue);
                //  $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            case "datetimeinput":
                mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datetimebox('setValue', fieldList[index].fieldvalue);
                //                        $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            case "singleselectinput":
                setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setValue', fieldList[index].fieldvalue);
                //                        $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            case "multiselectinput":
                setDatatoCombobox(mainform, fieldList[index].fieldname, fieldList[index].datasource);
                mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('setValues', (fieldList[index].fieldvalue ? fieldList[index].fieldvalue.split(',') : []));
                //  $('input[comboname="' + fieldList[index].fieldname + '"]', mainform).val(fieldList[index].fieldvalue);
                break;
            case "filelistcontrol":
                break;
            case "importdocument":
                break;
            case "virtualsubtable":
                break;
        }
    }
    clearTimeout(timeOut);
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

//设置所有的控件不可编辑
function setAllControlsDisable() {
    var mainform = $("#TailorForm");
    if (fieldList != null) {
        try {
            for (var index in fieldList) {
                try {
                    switch (fieldList[index].fieldtype) {
                        case "textinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').attr("readonly", "readonly");
                            break;
                        case "multitextinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').attr("readonly", "readonly");
                            break;
                        case "intnumberinput":
                        case "floatnumberinput":
                            mainform.find("[numberboxname='" + fieldList[index].fieldname + "']").numberbox("disable");
                            break;
                        case "dateinput":
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datebox('disable');
                            break;
                        case "datetimeinput":
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').datetimebox("disable");
                            break;
                        case "singleselectinput":
                        case "multiselectinput":
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('disable');
                            break;
                        case "filelistcontrol":
                            break;
                        case "importdocument":
                            break;
                        case "virtualsubtable":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').attr({ showToolBar: false });
                            var objGrid = $("table[constname='" + constname + "']");
                            objGrid.datagrid({ toolbar: [] });
                            break;
                    }
                }
                catch (e) { }
            }
        }
        catch (e) { }
    }
}

//用值替换只读控件
function replaceReadOnlyControlWithDivValue() {
    var mainform = $("#TailorForm");
    var formatCellStr = "&nbsp;"//"<div style='border:1px solid #99bbe8;width:98%;height:100%;vertical-align:middle'>&nbsp;FieldValue</div>";
    try {
        for (var index in fieldList) {
            if (!isExsit(canEditFieldList, fieldList[index].fieldname)) {
                try {
                    switch (fieldList[index].fieldtype) {
                        case "textinput":
                        case "multitextinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').replaceWith(formatCellStr.ReplaceAll("FieldValue", fieldList[index].FieldValue));
                            break;
                        case "intnumberinput":
                        case "floatnumberinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').replaceWith(formatCellStr.ReplaceAll("FieldValue", fieldList[index].FieldValue));
                            mainform.find('[numberboxname="' + fieldList[index].fieldname + '"]').replaceWith("");
                            break;
                        case "dateinput":
                        case "datetimeinput":
                            mainform.find('[name="' + fieldList[index].fieldname + '"]').parents('span').replaceWith(formatCellStr.ReplaceAll("FieldValue", fieldList[index].FieldValue));
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').replaceWith("");
                            break;
                        case "singleselectinput":
                        case "multiselectinput":
                            mainform.find('[comboname="' + fieldList[index].fieldname + '"]').parents('td').html(formatCellStr + mainform.find('[comboname="' + fieldList[index].fieldname + '"]').combobox('getText'));
                            break;
                        case "filelistcontrol":
                            break;
                        case "importdocument":
                            break;
                        case "virtualsubtable":
                            break;
                    }
                }
                catch (element)
                        { }
            }
        }
    }
    catch (e)
            { }
}
