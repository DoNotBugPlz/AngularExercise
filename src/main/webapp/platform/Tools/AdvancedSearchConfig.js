var rootPath = "../../../"; //项目根路径
var destroyIdArray = new Array();
var searchTable = ""; //当前查询条件使用的表名称
var tempId = 0; //用于构造新增行的id，持久化之前始终是负数
var editIndex = undefined; //记录当前编辑的行id
var colList = []; //查询使用的列
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
            { id: "notequal", value: "notequal", text: "不等于"}];

/*
表单子表配置信息相关脚本
*/
//初始化书签使用字段
function initSearchColList() {
    $.ajax({
        type: "GET",
        async: false,
        url: rootPath + 'Sys_colsremark/LoadColsByTableName.do?tablename=' + currentTableName,
        success: function (data) {
            colList = data;
        },
        error: function (message) {
            GlobalTools.tip("获取列出错：" + message);
        }
    });
}
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
    $(".combo-text", $(sourceElement).parent()).val(text);
}
//点击  选择 分管领导 可展开的节点，加载子节点
function showUserTreeGrid() {
    //初始化人员选择对话框
    OrganizationTools.user_Init({ rootPath: rootPath, deptid: "", title: "选择人员", onOKClick: selectUserOK });
    var sourceElement = this;
    $(sourceElement).combobox("hidePanel");
    OrganizationTools.user_ShowSelectDialog({ sourceElement: sourceElement });
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
    $(".combo-text", $(sourceElement).parent()).val(text);
}
//单击列表行
function onClickRowImp(row) {
    addAndOpenEditor(row); //添加并激活该编辑器
}

//新增节点 
function createNewCondition(flag) {
    var currentNode = $('#conditionList').treegrid("getSelected");
    if (flag == 1) {//分组
        if (getAllNodes().length == 0) {//没有任何节点
            addGroupNode({ id: 0}); //新增分组节点
            return;
        }  else if (currentNode.isgroup == 0) {
            GlobalTools.tip("条件节点下不能新增任何节点！");
            return;
        }
        if (!endEditing()) {
            GlobalTools.tip("数据验证未通过，请检查！");
            return;
        }
        addGroupNode(currentNode); //直接新增分组节点

    } else if (flag == 0) {//条件
        if (!currentNode) {
            GlobalTools.tip("请选择一个组！");
            return;
        }  else if (currentNode.isgroup == 0) {
            GlobalTools.tip("条件节点下不能新增任何节点！");
            return;
        }
        if (!endEditing()) {
            GlobalTools.tip("数据验证未通过，请检查！");
            return;
        }
        addConditionNode(currentNode); //直接新增条件节点
    }
}

//新增分组节点
function addGroupNode(parentNode) {
    tempId++; //构造新增分组节点的id
    $('#conditionList').treegrid('append', { parent: parentNode.id,
        data: [{ 
            id: tempId,
            parentid: parentNode.id,
            tablename:searchTable,
            colname: '条件组',
            coltype: '',
            compareoption: '',
            comparevalue: '',
            relation: '',
            isgroup: 1
        }]
    });
    addAndOpenEditor($('#conditionList').treegrid("find", tempId)); //添加并激活该分组节点编辑器
}

//新增条件节点
function addConditionNode(parentNode) {
    tempId++; //构造新增条件节点的id
    $('#conditionList').treegrid('append', { parent: parentNode.id,
        data: [{ 
            id: tempId,
            parentid: parentNode.id,
            tablename: searchTable,
            colname: '',
            coltype: '',
            compareoption: '',
            comparevalue: '',
            relation: '',
            isgroup: 0
        }]
    });
    addAndOpenEditor($('#conditionList').treegrid("find", tempId)); //添加并激活该条件节点编辑器
}

//添加并激活编辑器
function addAndOpenEditor(row) {
    if (editIndex != row.id) {//如果不是同一行,需要关闭其他行的编辑器
        if (!endEditing()) return; //未能关闭其他行编辑器
    }
    editIndex = row.id; //记录当前行id
    if (row.isgroup == 1) {//分组节点
        addGroupEditor(row); //为分组节点添加编辑器
    } else if (row.isgroup == 0) {
        addConditionEditor($('#conditionList').treegrid("getParent", row.id), row.id); //为条件节点添加编辑器
    }
    $('#conditionList').treegrid('select', row.id);
    $('#conditionList').treegrid('beginEdit', row.id); //选中行并打开编辑器
}

//关闭通过验证的编辑器
function endEditing() {
    if (editIndex == undefined) { return true; }
    if ($('#conditionList').treegrid('validateRow', editIndex)) {
        $('#conditionList').treegrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

//为分组节点添加编辑器
function addGroupEditor(parentNode) {
//    移除相关的editor
    removeEditor();
    $("#conditionList").treegrid('addEditor', { field: 'relation', editor: {
        type: 'combobox',
        options: {
            required: true,
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
    var currentNode = $("#conditionList").treegrid("find", currentNodeId);
    //移除相关的editor
    removeEditor();
    //tailorformcolchinaname列添加editor
    $("#conditionList").treegrid('addEditor', { field: 'colname', editor: {
        type: 'combobox',
        options: {
            required: true,
            editable: false,
            data:colList,
            panelHeight: 'auto',
            valueField: 'colname',
            textField: 'alias',
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
    $("#conditionList").treegrid('addEditor', { field: 'compareoption', editor: {
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
    $("#conditionList").treegrid('addEditor', { field: 'comparevalue', editor: {
        type: typeValue,
        options: optionsValue
    }
    });
}

//根据列类型，动态修改计算值编辑器
function dynamicAddComparevalueEditor(record) {
    var currentNode = $("#conditionList").treegrid("find", editIndex); //当前的条件节点
    //获取列类型
    GlobalTools.ajax({
        dataType: "json",
        url: rootPath + "Sys_colsremark/GetColType.do",
        data: { tablename: searchTable, colname: record.colname },
        success: function (data, msg) {
            currentNode.coltype = data.coltype; //同步列类型
            currentNode.categoryconstname = data.categoryconstname; //字段绑定字典标识
            currentNode.colname = record.colname; //给表单字段名称赋值
            var tempNode = { id: currentNode.id + '_' }; //临时占位节点
            insertSelfAtSelfIndex(currentNode, tempNode); //刷新节点
            addAndOpenEditor(currentNode); //添加并激活该条件节点编辑器
            //updateDatasTemp = currentNode;//记录该节点为修改的节点
        }
    });
}

//当你想刷新一个节点，但是editor的验证又无法通过的时候可以使用该方法
function insertSelfAtSelfIndex(currentNode, tempNode) {//currentNode：待刷新的节点，tempNode:临时占位节点,id和currentNode必须不同
    $("#conditionList").treegrid("insert", { after: currentNode.id, data: tempNode });
    $("#conditionList").treegrid("remove", currentNode.id);
    $("#conditionList").treegrid("insert", { after: tempNode.id, data: currentNode });
    $("#conditionList").treegrid("remove", tempNode.id);
}

//移除相关的editor
function removeEditor() {
    $("#conditionList").treegrid('removeEditor', 'colname');
    $("#conditionList").treegrid('removeEditor', 'compareoption');
    $("#conditionList").treegrid('removeEditor', 'comparevalue');
    $("#conditionList").treegrid('removeEditor', 'relation');
}

function destroyCondition() {
    var node = $('#conditionList').treegrid('getSelected');
    if (!node) {
        GlobalTools.tip("请选择节点！");
        return;
    }
    $('#conditionList').treegrid("remove", node.id);
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

//获取所有节点
function getAllNodes() {
    var node = $('#conditionList').treegrid("getSelected");
    $('#conditionList').treegrid("selectAll");
    var allDatas = $('#conditionList').treegrid("getSelections");
    $('#conditionList').treegrid("unselectAll");
    if (node) {
        $('#conditionList').treegrid("select", node.id);
    }
    return allDatas;
}
//格式化列名称
function formatColName(value, row, index) {
    var retValue = value;
    $(colList).each(function (index, item) {
        if (item.colname == value) {
            retValue = item.alias;
            return false; //返回false终止循环，返回true进入下次循环
        }
    });
    return retValue;
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
    if (rowData.categoryconstname && value != null && value!="") {
        switch (rowData.categoryconstname.toUpperCase()) {
            case "SYSDEPT": //绑定组织机构字典
                GlobalTools.ajax({
                    async: false,
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

//获取高级查询组合的列
function getCondition() {
    if (!endEditing()) {
        GlobalTools.tip("数据验证未通过！请检查！");
        return false;
    }
    return getAllNodes(); //获取所有节点
}