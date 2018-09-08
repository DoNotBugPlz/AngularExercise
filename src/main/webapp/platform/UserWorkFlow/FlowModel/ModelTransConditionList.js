var rootPath = "../../../"; //项目根路径
var destroyIdArray = new Array();
var transitionmodelid = 0; //当前流向模型id
var tempId = 0; //用于构造新增行的id，持久化之前始终是负数
var editIndex = undefined; //记录当前编辑的行id
var filterRelationDatas = [{ id: "and", value: "and", text: "并且" }, { id: "or", value: "or", text: "或者"}]; //规则关系
var filterOperationDatas = [//计算规则
            {id: "equal", value: "equal", text: "等于" },
            { id: "notequal", value: "notequal", text: "不等于" },
            { id: "greater", value: "greater", text: "大于" },
            { id: "greaterorequal", value: "greaterorequal", text: "大于等于" },
            { id: "less", value: "less", text: "小于" },
            { id: "lessorequal", value: "lessorequal", text: "小于等于" },
            { id: "isnull", value: "isnull", text: "空值" },
            { id: "isnotnull", value: "isnotnull", text: "非空值" },
            { id: "like", value: "like", text: "包含文字" },
            { id: "notlike", value: "notlike", text: "不包含文字" },
            { id: "startwith", value: "startwith", text: "以…开始" },
            { id: "endwith", value: "endwith", text: "以…结束"}];
var number_filterOperationDatas = [//数字_计算规则
            {id: "equal", value: "equal", text: "等于" },
            { id: "notequal", value: "notequal", text: "不等于" },
            { id: "greater", value: "greater", text: "大于" },
            { id: "greaterorequal", value: "greaterorequal", text: "大于等于" },
            { id: "less", value: "less", text: "小于" },
            { id: "lessorequal", value: "lessorequal", text: "小于等于"}];
var varchar_filterOperationDatas = [//文字_计算规则
            {id: "equal", value: "equal", text: "等于" },
            { id: "notequal", value: "notequal", text: "不等于" },
            { id: "isnull", value: "isnull", text: "空值" },
            { id: "isnotnull", value: "isnotnull", text: "非空值" },
            { id: "like", value: "like", text: "包含文字" },
            { id: "notlike", value: "notlike", text: "不包含文字" },
            { id: "startwith", value: "startwith", text: "以…开始" },
            { id: "endwith", value: "endwith", text: "以…结束"}];
var datetime_filterOperationDatas = [//日期_计算规则
            {id: "equal", value: "equal", text: "等于" },
            { id: "notequal", value: "notequal", text: "不等于" },
            { id: "greater", value: "greater", text: "大于" },
            { id: "greaterorequal", value: "greaterorequal", text: "大于等于" },
            { id: "less", value: "less", text: "小于" },
            { id: "lessorequal", value: "lessorequal", text: "小于等于"}];
var combox_filterOperationDatas = [//数字_计算规则
            {id: "equal", value: "equal", text: "等于" },
            { id: "notequal", value: "notequal", text: "不等于" }];

//打开选择组织机构对话框
function showDeptTreeGrid() {
    //初始化组织机构选择对话框
    OrganizationTools.dept_Init({ rootPath: rootPath, deptid: "", title: "选择单位", onOKClick: selectDeptOK });
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.dept_ShowSelectDialog({ sourceElement: sourceElement });
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

    $(sourceElement).combobox("setValue", ids);
    $(".combo-text",$(sourceElement).parent("td")).val(text);
}
//点击  选择 分管领导 可展开的节点，加载子节点
function showUserTreeGrid() {
    //初始化人员选择对话框
    OrganizationTools.user_Init({ rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectUserOK });
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ sourceElement: sourceElement});
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
    $(sourceElement).combobox("setValue", ids);
    $(sourceElement).val(text);
    $(".combo-text", $(sourceElement).parent("td")).val(text);
}
//单击列表行
function onClickRowImp(row) {
    addAndOpenEditor(row); //添加并激活该编辑器
}

//新增节点 
function createNewCondition(flag) {
    var currentNode = $('#transitionConditionList').treegrid("getSelected");
    if (flag == 1) {//分组
        if (getAllNodes().length == 0) {//没有任何节点
            addGroupNode({ id: 0 }); //新增分组节点
            return;
        } else if (!currentNode) {
            GlobalTools.tip("请选择一个父节点！");
            return;
        } else if (currentNode.isgroup == 0) {
            GlobalTools.tip("条件节点下不能新增任何节点！");
            return;
        } else if (currentNode.tablename) {
            //GlobalTools.tip("已选择表单的节点下不能再新增分组！");
            //return;
        }
        if (!endEditing()) {
            GlobalTools.tip("数据验证未通过，请检查！");
            return;
        }
        if (currentNode.id <= 0) {//未保存过的节点
            saveCondition(flag); //先保存再新增分组节点
        } else {
            addGroupNode(currentNode); //直接新增分组节点
        }
    } else if (flag == 0) {//条件
        if (!currentNode) {
            GlobalTools.tip("请选择一个父节点！");
            return;
        } else if (!currentNode.tailorformchinaname) {
            GlobalTools.tip("要增加条件节点必须先选择表单名称！");
            return;
        } else if (currentNode.isgroup == 0) {
            GlobalTools.tip("条件节点下不能新增任何节点！");
            return;
        }
        if (!endEditing()) {
            GlobalTools.tip("数据验证未通过，请检查！");
            return;
        }
        if (currentNode.id <= 0) {//未保存过的节点
            saveCondition(flag); //先保存再新增条件节点
        } else {
            addConditionNode(currentNode); //直接新增条件节点
        }
    }
}

//新增分组节点
function addGroupNode(parentNode) {
    tempId--; //构造新增分组节点的id
    $('#transitionConditionList').treegrid('append', { parent: parentNode.id,
        data: [{ id: tempId,
            parentid: parentNode.id,
            delstatus: 0,
            tailorformchinaname: parentNode.tailorformchinaname,
            tailorformcolchinaname: '',
            coltype: '',
            compareoption: '',
            comparevalue: '',
            relation: '',
            isgroup: 1,
            transitionmodelid: transitionmodelid,
            tailorformid: parentNode.tailorformid,
            tablename: parentNode.tablename,
            colname: ''
        }]
    });
    addAndOpenEditor($('#transitionConditionList').treegrid("find", tempId)); //添加并激活该分组节点编辑器
}

//新增条件节点
function addConditionNode(parentNode) {
    tempId--; //构造新增条件节点的id
    $('#transitionConditionList').treegrid('append', { parent: parentNode.id,
        data: [{ id: tempId,
            parentid: parentNode.id,
            delstatus: 0,
            tailorformchinaname: parentNode.tailorformchinaname,
            tailorformcolchinaname: '',
            coltype: '',
            compareoption: '',
            comparevalue: '',
            relation: '',
            isgroup: 0,
            transitionmodelid: transitionmodelid,
            tailorformid: parentNode.tailorformid,
            tablename: parentNode.tablename,
            colname: ''
        }]
    });
    addAndOpenEditor($('#transitionConditionList').treegrid("find", tempId)); //添加并激活该条件节点编辑器
}

//添加并激活编辑器
function addAndOpenEditor(row) {
    if (editIndex != row.id) {//如果不是同一行,需要关闭其他行的编辑器
        if (!endEditing()) return; //未能关闭其他行编辑器
    }
    editIndex = row.id; //记录当前行id
    if (row.isgroup == 1) {//分组节点
        if (row.id <= 0) {//没保存过的节点
            addGroupEditor(row); //为分组节点添加编辑器
        } else {
            removeEditor(); //移除相关的editor
        }
    } else if (row.isgroup == 0) {
        addConditionEditor($('#transitionConditionList').treegrid("getParent", row.id), row.id); //为条件节点添加编辑器
    }
    $('#transitionConditionList').treegrid('select', row.id).treegrid('beginEdit', row.id); //选中行并打开编辑器
}

//关闭通过验证的编辑器
function endEditing() {
    if (editIndex == undefined) { return true; }
    if ($('#transitionConditionList').treegrid('validateRow', editIndex)) {
        $('#transitionConditionList').treegrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

//为分组节点添加编辑器
function addGroupEditor(parentNode) {
    //移除相关的editor
    removeEditor();
    if (!parentNode.tablename) {
        //获取流程条件可以使用的表单
        GlobalTools.ajax({
            async: false,
            dataType: "json",
            url: rootPath + "Sys_mdl_activityform/LoadTailorformIds.do",
            data: { processmodelid: processid },
            success: function (data, msg) {
                //tailorformchinaname列添加editor
                $("#transitionConditionList").treegrid('addEditor', { field: 'tailorformchinaname', editor: {
                    type: 'combobox',
                    options: {
                        url: rootPath + 'Sys_def_tailorform/LoadTailorformList.do?ids=' + data.tailorformids,
                        editable: false,
                        required: true,
                        panelHeight: 'auto',
                        valueField: 'chinaname',
                        textField: 'chinaname',
                        onSelect: function (record) {//根据当前根节点选择的表单名给的tailorformid列赋值
                            var node = $("#transitionConditionList").treegrid("find", parentNode.id);
                            node.tailorformid = record.id; //给tailorformid列赋值
                            node.tablename = record.tablename; //给tablename列赋值
                            node.tailorformchinaname = record.chinaname; //给tailorformchinaname列赋值
                        }
                    }
                }
                });
            }
        });
    }

    //relation列添加editor
    $("#transitionConditionList").treegrid('addEditor', { field: 'relation', editor: {
            type: 'combobox',
            options: {
                required: true,
                editable: false,
                data: filterRelationDatas,
                valueField: 'value',
                textField: 'text',
                panelHeight: 50
            }
        }
    });
}

//为条件节点添加编辑器
function addConditionEditor(parentNode, currentNodeId) {//参数parentNode为父节点对象,currentNodeId为当前新增的条件节点id
    var currentNode = $("#transitionConditionList").treegrid("find", currentNodeId);
    //移除相关的editor
    removeEditor();
    //tailorformcolchinaname列添加editor
    $("#transitionConditionList").treegrid('addEditor', { field: 'tailorformcolchinaname', editor: {
        type: 'combobox',
        options: {
            url: rootPath + 'Sys_def_tailorformcol/LoadTailorFormColList.do?tailorformid=' + parentNode.tailorformid,
            required: true,
            editable: false,
            panelHeight: 'auto',
            valueField: 'id',
            textField: 'chinaname',
            onSelect: dynamicAddComparevalueEditor
        }
    }
    });

    //compareoption列添加editor
    var datas = [];
    if (currentNode.categoryconstname) {//绑定字典
        datas = combox_filterOperationDatas; 
    } else if (currentNode.coltype == "datetime") {//日期格式
        datas = datetime_filterOperationDatas;
    } else if (currentNode.coltype == "int" || currentNode.coltype == "float") {//整型格式、浮点型格式
        datas = number_filterOperationDatas;
    } else {
        datas = varchar_filterOperationDatas;
    }
    $("#transitionConditionList").treegrid('addEditor', { field: 'compareoption', editor: {
            type: 'combobox',
            options: {
                required: true,
                editable: false,
                panelHeight: 'auto',
                data: datas,
                valueField: 'value',
                textField: 'text'
            }
        }
    });

    //comparevalue列添加editor
    var typeValue = 'validatebox';
    var optionsValue = { required: false };
    if (currentNode.categoryconstname) {
        typeValue = "combobox";
        switch (currentNode.categoryconstname.toUpperCase()) {
            case "SYSDEPT": //绑定组织机构字典
                optionsValue = {
                    onShowPanel: showDeptTreeGrid
                };
                break;
            case "SYSUSER": //绑定用户字典
                optionsValue = {
                    onShowPanel: showUserTreeGrid
                };
                break;
            default: //绑定普通字典
                optionsValue = {
                    url: rootPath + 'Sys_categoryvalue/GetCategoryValues.do?constname=' + currentNode.categoryconstname,
                    panelHeight: 'auto',
                    valueField: 'id',
                    textField: 'chinaname'
                };
                break;
        }
    }
    else {
        switch (currentNode.coltype) {
            case "datetime": //日期格式
                typeValue = "datebox";
                optionsValue = {
                    required: true,
                    editable: false,
                    formatter: formatNormalDate
                };
                break;
            case "int": //整型
                typeValue = "numberbox";
                optionsValue = {
                    required: true
                };
                break;
            case "float": //浮点型
                typeValue = "numberbox";
                optionsValue = {
                    required: true,
                    precision: 2
                };
                break;
        }
    }
    $("#transitionConditionList").treegrid('addEditor', { field: 'comparevalue', editor: {
            type: typeValue,
            options: optionsValue
        }
    });
}

//根据列类型，动态修改计算值编辑器
function dynamicAddComparevalueEditor(record) {
    var currentNode = $("#transitionConditionList").treegrid("find", editIndex); //当前的条件节点
    //获取列类型
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_colsremark/GetColType.do",
        data: { tablename: record.tablename, colname: record.colname },
        success: function (data, msg) {
            currentNode.coltype = data.coltype; //同步列类型
            currentNode.categoryconstname = data.categoryconstname; //字段绑定字典标识
            currentNode.tailorformcolchinaname = record.chinaname; //给表单字段名称赋值
            currentNode.colname = record.colname; //给表单字段名称赋值
            currentNode.tablename = record.tablename; //给表单名称赋值
            var tempNode = { id: currentNode.id + '_' }; //临时占位节点
            insertSelfAtSelfIndex(currentNode, tempNode); //刷新节点
            addAndOpenEditor(currentNode); //添加并激活该条件节点编辑器
            //updateDatasTemp = currentNode;//记录该节点为修改的节点
        }
    });
}

//当你想刷新一个节点，但是editor的验证又无法通过的时候可以使用该方法
function insertSelfAtSelfIndex(currentNode, tempNode) {//currentNode：待刷新的节点，tempNode:临时占位节点,id和currentNode必须不同
    $("#transitionConditionList").treegrid("insert", { after: currentNode.id, data: tempNode });
    $("#transitionConditionList").treegrid("remove", currentNode.id);
    $("#transitionConditionList").treegrid("insert", { after: tempNode.id, data: currentNode });
    $("#transitionConditionList").treegrid("remove", tempNode.id);
}

//移除相关的editor
function removeEditor() {
    $("#transitionConditionList").treegrid('removeEditor', 'tailorformchinaname');
    $("#transitionConditionList").treegrid('removeEditor', 'tailorformcolchinaname');
    $("#transitionConditionList").treegrid('removeEditor', 'compareoption');
    $("#transitionConditionList").treegrid('removeEditor', 'comparevalue');
    $("#transitionConditionList").treegrid('removeEditor', 'relation');
}

//保存条件配置
function saveCondition(flag) {//flag表示保存成功后   1:需要添加分组节点   0 :需要添加条件节点  2：不需要添加节点
    if (!cancelEditCondition()) return; //取消编辑状态失败
    var currentNode = $('#transitionConditionList').treegrid("getSelected"); //获取当前选择的节点作为父节点
    var allDatas = getAllNodes(); //获取所有节点
    var changeDatas = allDatas; //正常保存必须是保存所有数据
    var params = { transitionmodelid: transitionmodelid, changeDatas: JSON2.stringify(changeDatas),allDatas: JSON2.stringify(allDatas) };
    if (flag != 2) {//表示要新增分组节点或者条件节点
        changeDatas = [currentNode]; //只保存新增的父节点数据
        params = { transitionmodelid: transitionmodelid, parentidTemp: currentNode.id, changeDatas: JSON2.stringify(changeDatas), allDatas: JSON2.stringify(allDatas) };
    }
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_mdl_transcondition/SaveTranscondition.do",
        data: params,
        success: function (data, msg) {
            if (flag != 2) {//表示要新增分组节点或者条件节点
                if (data.parentnode != null) {
                    var p = data.parentnode.parentid; //记录当前节点的父节点id，否则easyui-insert方法会将其父节点id清空，不知道为何
                    var tempNode = { id: currentNode.id + '_' }; //临时占位节点
                    $("#transitionConditionList").treegrid("insert", { after: currentNode.id, data: tempNode });
                    $("#transitionConditionList").treegrid("remove", currentNode.id);
                    $("#transitionConditionList").treegrid("insert", { after: tempNode.id, data: data.parentnode });
                    $("#transitionConditionList").treegrid("remove", tempNode.id);
                    $("#transitionConditionList").treegrid("find", data.parentnode.id).parentid = p; //重置父节点id
                    if (flag == 0) {
                        addConditionNode(data.parentnode); //添加条件节点
                    } else if (flag == 1) {
                        addGroupNode(data.parentnode); //添加分组节点
                    }
                }
            } else {
                $('#transitionConditionList').treegrid('reload');
                GlobalTools.tip("保存成功。");
            }
            $('#transitionConditionList').treegrid('acceptChanges');
        }
    });
}

function destroyCondition() {
    var node = $('#transitionConditionList').treegrid('getSelected');
    if (!node) {
        GlobalTools.tip("请选择节点！");
        return;
    }
    $.messager.confirm('操作确认', '确定要删除这些条件吗？  删除后将无法恢复。', function (result) {
        if (result) {
            $('#transitionConditionList').treegrid("remove", node.id);
            if (node.id <= 0) return; //如果删除的节点是新增的节点，就不记录
            //清空数组
            destroyIdArray = [];
            //初始化数组
            setDelNodes(node);
            //删除数据库记录
            GlobalTools.ajax({
                dataType: "json",
                url: rootPath + "Sys_mdl_transcondition/DestroyList.do",
                data: { transitionmodelid: transitionmodelid, ids: destroyIdArray.join(',') },
                success: function (data, msg) {
                    $('#transitionConditionList').treegrid('reload');
                }
            });
        }
    });
}

//递归记录删除的节点对象
function setDelNodes(node) {
    destroyIdArray.push(node.id);
    var childrenNode = node.children;
    if (childrenNode) {
        for (var i = 0; i < childrenNode.length; i++) {
            setDelNodes(childrenNode[i]);
        }
    }
}
//取消编辑状态
function cancelEditCondition() {
    if (!endEditing()) {
        GlobalTools.tip("数据验证未通过！请检查！");
        return false;
    }
    return true;
}

//展开所有节点
function expandAllNodes() {
    $('#transitionConditionList').treegrid("expandAll");
}

//获取所有节点
function getAllNodes() {
    var node = $('#transitionConditionList').treegrid("getSelected");
    $('#transitionConditionList').treegrid("selectAll");
    var allDatas = $('#transitionConditionList').treegrid("getSelections");
    $('#transitionConditionList').treegrid("unselectAll");
    if (node) {
        $('#transitionConditionList').treegrid("select", node.id);
    }
    return allDatas;
}

//格式化表单名称列
function formatTailorformchinaname(value, row, index) {
    return value ? value : '分组';
}

//格式化计算规则列
function formatCompareoption(value, row, index) {
    switch (value) {
        case 'equal':
            return '等于';
        case 'notequal':
            return '不等于';
        case 'greater':
            return '大于';
        case 'greaterorequal':
            return '大于等于';
        case 'less':
            return '小于';
        case 'lessorequal':
            return '小于等于';
        case 'isnull':
            return '空值';
        case 'isnotnull':
            return '非空值';
        case 'like':
            return '包含文字';
        case 'notlike':
            return '不包含文字';
        case 'startwith':
            return '以…开始';
        case 'endwith':
            return '以…结束';
        default:
            return null;
    }
}

//格式化规则关系列
function formatRelation(value, row, index) {
    if (row.isgroup == 0) {//如果是条件节点
        return '';
    }
    switch (value) {
        case 'and':
            return '并且';
        case 'or':
            return '或者';
        default:
            return '并且';
    }
}

//格式化计算值列
function formatCompareValue(value, rowData, index) {
    var retValue = value;
    if (rowData.categoryconstname) {
        switch (rowData.categoryconstname.toUpperCase()) {
            case "SYSDEPT": //绑定组织机构字典
                GlobalTools.ajax({
                    async:false,
                    dataType: "json",
                    url: rootPath + "Sys_dept/LoadForm.do",
                    data: { "id": value },
                    success: function (data, msg) {
                        retValue = data.sys_dept.chinaname;
                    }
                });
                break;
            case "SYSUSER": //绑定用户字典
                GlobalTools.ajax({
                    async: false,
                    dataType: "json",
                    url: rootPath + "Sys_user/LoadForm.do",
                    data: { "sys_user.id": value },
                    success: function (data, msg) {
                        retValue = data.sys_user.chinaname;
                    }
                });
                break;
            default: //绑定普通字典
                GlobalTools.ajax({
                    async: false,
                    dataType: "json",
                    url: rootPath + "Sys_category/LoadCategoryValue.do",
                    data: { "constname": rowData.categoryconstname, "refid": value },
                    success: function (data, msg) {
                        if (data)
                            retValue = data.chinaname;
                    }
                });
                break;
        }
    }
    return retValue;
}