###前端向接收发送date用实体类（column  type of java.util.date）接收时###
    在column上添加@JsonForm(pattern="yyyy-MM-dd")   
    例如：  
        @Column(name = "WRITE_TIME")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private Date write_time;

####前端页面 列表的check 处理例子
     <a href="javascript:;" class="ipt_check " ng-class="{'true':'checked','false':''}[n.selected]"></a>
     
###  插件引入 
    core.config.js文件会有引入，找到自己所需要的插件。
    比如z-tree：
     name:'ng-zTree',
                    files:[
                        './utils/app.ztree.js',
                        './lib/ztree/css/zTreeStyle/zTreeStyle.css',
                        './lib/ztree/js/jquery.ztree.all.js'
                    ]
     引入时：
      return $ocLazyLoad.load([
                                 'ng-zTree'
                             ]);
###文件上传时显示的按钮
                    /* opDetail: {
                                                downLoadOpShow: true,//显示下载
                                                deleteOpShow: !vm.is_view,//显示删除
                                                uploadOpShow: !vm.is_view,//显示上传
                                                viewOpShow: true//显示预览
                    },*/            
###防止table文字超出当前格式,超过部分省略号
       <table class="table_word_space"   >
        <tr>
            <td width="5%" class="word_space"            