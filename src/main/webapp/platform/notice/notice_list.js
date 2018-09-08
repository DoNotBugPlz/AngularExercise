(function ($, rootPath) {
    'use strict';

    //引用的外部页面
    var pages_external = {
        notice_add : rootPath + 'platform/notice/notice_add.html'
    };

    //通知列表相关控制
    var NoticeList = {
        render: function () {
            $('#notices_list').datagrid({
                url: rootPath + 'notice/list',
                columns: [[
                    {field: 'ck', checkbox: true},
                    {field: 'title', title: '标题', formatter: formatterTitleCell, width: 140},
                    {field: 'add_time', title: '登记时间', width: 120, align: 'center'},
                    {field: 'pub_text', title: '是否公开', width: 50, align: 'center'},
                    {field: 'adder_deptid_text', title: '单位', width: 50, align: 'center'},
                    {field: 'adder_text', title: '发起人', width: 50, align: 'center'}
                ]],
                singleSelect: false,
                fit: true,
                loadMsg: '数据加载中……',
                fitColumns: true,
                rownumbers: true,
                pageSize: 20,
                pagination: true,
                showFooter: true,
                idField: 'id',
                toolbar: '#gridToolBar',
                onLoadError: gridLoadError
            });
            function formatterTitleCell(value, row) {
                //构造标题超链接
                var onclick = "top.addTab_v1('" + row.title + "', 'platform/notice/notice_add.html?id=" + row.id + "');";
                return "<a id='showAddPage' href='#' onclick=\"" + onclick + "\"  title='查看详细信息'>" + value + "</a>";
            }
        },
        search: function () {
            $('#notices_list').datagrid('load', {
                "notice.title": $('#title').val(),
                "notice.is_public": $('#is_public').combobox('getValue')
            });
        },
        add: function () {
            top.addTab('新增通知', pages_external.notice_add);
        },
        destroy: function () {
            GlobalTools.destroyGridList($('#notices_list'), {url: rootPath + "notice/list/destroy"});
        },
        reload: function () {
            $("#notices_list").datagrid("reload");
        },
        bindEvent: function () {
            $("#addNotice").bind("click", NoticeList.add);
            $("#destroyNotices").bind("click", NoticeList.destroy);
            $("#reloadNotices").bind("click", NoticeList.reload);
            $("#searchNotice").bind("click", NoticeList.search);
        }
    };

    $(function () {
        NoticeList.render();
        NoticeList.bindEvent();
    });

})(jQuery, "../../");