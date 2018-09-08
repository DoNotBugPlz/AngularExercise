create table web_angularjs.LOG_A
(
  eventdate        DATE,
  log_level        VARCHAR2(100),
  logger           VARCHAR2(50),
  message          VARCHAR2(500),
  exception        VARCHAR2(500),
  host_address     VARCHAR2(200),
  request_url      VARCHAR2(1000),
  request_serialno NUMBER(10)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.LOG_A
  is '日志表（log4j2.xml配置）';
comment on column web_angularjs.LOG_A.eventdate
  is '时间';
comment on column web_angularjs.LOG_A.log_level
  is '日志级别';
comment on column web_angularjs.LOG_A.logger
  is '记录者';
comment on column web_angularjs.LOG_A.message
  is '内容';
comment on column web_angularjs.LOG_A.exception
  is '异常信息';
comment on column web_angularjs.LOG_A.host_address
  is 'ip地址';
comment on column web_angularjs.LOG_A.request_url
  is '请求的url';
comment on column web_angularjs.LOG_A.request_serialno
  is '请求的序列号';

-- Create table
create table web_angularjs.NOTICE
(
  ID             VARCHAR2(50) not null,
  TITLE          VARCHAR2(2000) not null,
  CONTENT        VARCHAR2(2000) not null,
  RECEIVER_IDS   VARCHAR2(1000) not null,
  RECEIVER_NAMES VARCHAR2(2000) not null,
  IS_PUBLIC      NUMBER(1) default 0 not null,
  DELSTATUS      NUMBER(1) default 0 not null,
  ADDER          VARCHAR2(50) not null,
  ADDER_DEPTID   VARCHAR2(50) not null,
  ADD_TIME       DATE not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table
comment on table web_angularjs.NOTICE
  is '通知公告表';
-- Add comments to the columns
comment on column web_angularjs.NOTICE.ID
  is '主键';
comment on column web_angularjs.NOTICE.TITLE
  is '标题';
comment on column web_angularjs.NOTICE.CONTENT
  is '通知内容';
comment on column web_angularjs.NOTICE.RECEIVER_IDS
  is '接收人';
comment on column web_angularjs.NOTICE.RECEIVER_NAMES
  is '接收人姓名';
comment on column web_angularjs.NOTICE.IS_PUBLIC
  is '是否公开';
comment on column web_angularjs.NOTICE.DELSTATUS
  is '删除标志';
comment on column web_angularjs.NOTICE.ADDER
  is '添加人';
comment on column web_angularjs.NOTICE.ADDER_DEPTID
  is '添加人所在部门id';
comment on column web_angularjs.NOTICE.ADD_TIME
  is '登记时间';
-- Create/Recreate primary, unique and foreign key constraints
alter table web_angularjs.NOTICE
  add constraint PK_NOTICE_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate indexes
create index ADD_TIME_INDEX on web_angularjs.NOTICE (ADD_TIME)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.NOTICESUB
(
  id        VARCHAR2(50) not null,
  name      VARCHAR2(30),
  age       NUMBER(3),
  birth     DATE,
  delstatus NUMBER(10),
  noticeid  VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.NOTICESUB
  is '通知子表-测试使用';
comment on column web_angularjs.NOTICESUB.id
  is '主键';
comment on column web_angularjs.NOTICESUB.name
  is '姓名';
comment on column web_angularjs.NOTICESUB.age
  is '年龄';
comment on column web_angularjs.NOTICESUB.birth
  is '出生';
comment on column web_angularjs.NOTICESUB.delstatus
  is '删除标志';
comment on column web_angularjs.NOTICESUB.noticeid
  is 'notice.id';

create table web_angularjs.OFFICEDICTION
(
  id        VARCHAR2(50) not null,
  diction   VARCHAR2(200) not null,
  delstatus NUMBER(1) default 0 not null,
  userid    VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.OFFICEDICTION
  is '办公用语表';
comment on column web_angularjs.OFFICEDICTION.id
  is '主键';
comment on column web_angularjs.OFFICEDICTION.diction
  is '办公用语';
comment on column web_angularjs.OFFICEDICTION.delstatus
  is '删除标志';
comment on column web_angularjs.OFFICEDICTION.userid
  is '用户id';
alter table web_angularjs.OFFICEDICTION
  add constraint PK_OFFICEDICTION primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

create table web_angularjs.SYS_ATTACHFILE
(
  id               VARCHAR2(50) not null,
  delstatus        NUMBER(1) default 0,
  filename         VARCHAR2(100) not null,
  storename        VARCHAR2(50) not null,
  storepath        VARCHAR2(100) not null,
  tablename        VARCHAR2(50),
  colname          VARCHAR2(50),
  recordid         VARCHAR2(50),
  contenttype      VARCHAR2(200) default 0 not null,
  filesize         NUMBER(10),
  extname          VARCHAR2(10),
  isabsolutepath   NUMBER(1) default 1,
  uploadtime       DATE default sysdate,
  uploaderid       VARCHAR2(50),
  uploadername     VARCHAR2(50),
  modifytime       DATE,
  modifyerid       VARCHAR2(50),
  modifyername     VARCHAR2(50),
  maintype         VARCHAR2(30),
  subtype          VARCHAR2(30),
  iscertificateion NUMBER(1),
  the_file         BLOB,
  ftpfilename      VARCHAR2(50),
  ftpfilepath      VARCHAR2(500),
  remark           VARCHAR2(100)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_ATTACHFILE
  is '附件表';
comment on column web_angularjs.SYS_ATTACHFILE.id
  is '主键';
comment on column web_angularjs.SYS_ATTACHFILE.delstatus
  is '删除标志';
comment on column web_angularjs.SYS_ATTACHFILE.filename
  is '文件名';
comment on column web_angularjs.SYS_ATTACHFILE.storename
  is '存储名（物理存储）';
comment on column web_angularjs.SYS_ATTACHFILE.storepath
  is '存储路径';
comment on column web_angularjs.SYS_ATTACHFILE.tablename
  is '使用附件的业务表名';
comment on column web_angularjs.SYS_ATTACHFILE.colname
  is '使用附件的业务表的对应字段名';
comment on column web_angularjs.SYS_ATTACHFILE.recordid
  is '使用附件的业务表的对应记录id';
comment on column web_angularjs.SYS_ATTACHFILE.contenttype
  is '附件类型';
comment on column web_angularjs.SYS_ATTACHFILE.filesize
  is '附件大小';
comment on column web_angularjs.SYS_ATTACHFILE.extname
  is '扩展名';
comment on column web_angularjs.SYS_ATTACHFILE.isabsolutepath
  is '是否绝对路径（针对storpath）';
comment on column web_angularjs.SYS_ATTACHFILE.uploadtime
  is '附件上传时间';
comment on column web_angularjs.SYS_ATTACHFILE.uploaderid
  is '上传人id';
comment on column web_angularjs.SYS_ATTACHFILE.uploadername
  is '上传人姓名';
comment on column web_angularjs.SYS_ATTACHFILE.modifytime
  is '修改时间';
comment on column web_angularjs.SYS_ATTACHFILE.modifyerid
  is '修改人id';
comment on column web_angularjs.SYS_ATTACHFILE.modifyername
  is '修改人姓名';
comment on column web_angularjs.SYS_ATTACHFILE.maintype
  is '（字典项）附件主类型  比如 正文、普通附件、要件材料      ';
comment on column web_angularjs.SYS_ATTACHFILE.subtype
  is '（字典项）附件子类型 比如 要件材料下的身份证，营业执照等 ';
comment on column web_angularjs.SYS_ATTACHFILE.iscertificateion
  is '是否认证（0：未认证，1：已认证）';
comment on column web_angularjs.SYS_ATTACHFILE.the_file
  is '附件内容（二进制）';
comment on column web_angularjs.SYS_ATTACHFILE.ftpfilename
  is 'ftp文件名';
comment on column web_angularjs.SYS_ATTACHFILE.ftpfilepath
  is 'ftp文件目录';
comment on column web_angularjs.SYS_ATTACHFILE.remark
  is '附件备注';
create index web_angularjs.IX_SYS_ATTACHFILE on web_angularjs.SYS_ATTACHFILE (TABLENAME, RECORDID)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_ATTACHFILE
  add constraint PK_SYS_ATTACHFILE primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_AUTHORITY
(
  id              NUMBER(10) not null,
  authoritylevel  VARCHAR2(20) not null,
  operationrange  NUMBER(10) default 0 not null,
  delstatus       NUMBER(1) default 0 not null,
  relationid      VARCHAR2(50),
  menuoperationid VARCHAR2(50),
  menuid          VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_AUTHORITY
  is '用户、角色权限表';
comment on column web_angularjs.SYS_AUTHORITY.id
  is '主键';
comment on column web_angularjs.SYS_AUTHORITY.authoritylevel
  is '权限级别(USER/ROLES)';
comment on column web_angularjs.SYS_AUTHORITY.operationrange
  is '操作范围';
comment on column web_angularjs.SYS_AUTHORITY.delstatus
  is '删除标识 ';
comment on column web_angularjs.SYS_AUTHORITY.relationid
  is 'user或roles的ID';
comment on column web_angularjs.SYS_AUTHORITY.menuoperationid
  is '模块操作ID';
comment on column web_angularjs.SYS_AUTHORITY.menuid
  is '导航菜单ID';
alter table web_angularjs.SYS_AUTHORITY
  add constraint PK_SYS_AUTHORITY primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_BOOKMARK
(
  id          NUMBER(10) not null,
  delstatus   NUMBER(3) default 0 not null,
  constname   VARCHAR2(50) not null,
  chinaname   VARCHAR2(50) not null,
  tablename   VARCHAR2(100),
  colname     VARCHAR2(50),
  description VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_BOOKMARK
  is '书签表';
comment on column web_angularjs.SYS_BOOKMARK.id
  is '主键';
comment on column web_angularjs.SYS_BOOKMARK.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_BOOKMARK.constname
  is '书签标识';
comment on column web_angularjs.SYS_BOOKMARK.chinaname
  is '书签名称';
comment on column web_angularjs.SYS_BOOKMARK.tablename
  is '书签使用的表名';
comment on column web_angularjs.SYS_BOOKMARK.colname
  is '书签使用字段';
comment on column web_angularjs.SYS_BOOKMARK.description
  is '书签描述';
create index web_angularjs.IX_SYS_BOOKMARK_TABLENAME on web_angularjs.SYS_BOOKMARK (TABLENAME, DELSTATUS)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;
alter table web_angularjs.SYS_BOOKMARK
  add constraint PK_SYS_BOOKMARK primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_BOOKTEMPLATE
(
  id           NUMBER(10) not null,
  delstatus    NUMBER(3) default 0 not null,
  chinaname    VARCHAR2(50) not null,
  tablename    VARCHAR2(100),
  description  VARCHAR2(50),
  unitid       VARCHAR2(50),
  tailorformid NUMBER(10) default 0 not null,
  uploadfile   VARCHAR2(50) default 0 not null,
  templatetype VARCHAR2(20) default 'word',
  iscustom     NUMBER(1) default 0
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_BOOKTEMPLATE
  is '文书模板表';
comment on column web_angularjs.SYS_BOOKTEMPLATE.id
  is '主键';
comment on column web_angularjs.SYS_BOOKTEMPLATE.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_BOOKTEMPLATE.chinaname
  is '模板名称';
comment on column web_angularjs.SYS_BOOKTEMPLATE.tablename
  is '模板使用的表名';
comment on column web_angularjs.SYS_BOOKTEMPLATE.description
  is '模板描述';
comment on column web_angularjs.SYS_BOOKTEMPLATE.unitid
  is '所属单位';
comment on column web_angularjs.SYS_BOOKTEMPLATE.tailorformid
  is '电子表单主键';
comment on column web_angularjs.SYS_BOOKTEMPLATE.uploadfile
  is '附件主键';
comment on column web_angularjs.SYS_BOOKTEMPLATE.templatetype
  is '模板类型';
comment on column web_angularjs.SYS_BOOKTEMPLATE.iscustom
  is '是否是自定义模板';
create index web_angularjs.IX_SYS_BOOKTEMPLATE_TABLENAME on web_angularjs.SYS_BOOKTEMPLATE (TABLENAME, DELSTATUS, UNITID)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_BOOKTEMPLATE
  add constraint PK_SYS_BOOKTEMPLATE primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_CATEGORY
(
  id                NUMBER(10) not null,
  chinaname         VARCHAR2(255) not null,
  constname         VARCHAR2(50) not null,
  delstatus         NUMBER(1) default 0 not null,
  extchar1name      VARCHAR2(50),
  extchar2name      VARCHAR2(50),
  extchar3name      VARCHAR2(50),
  extchar4name      VARCHAR2(50),
  extint1categoryid NUMBER(10),
  extint1name       VARCHAR2(50),
  extint2categoryid NUMBER(10),
  extint2name       VARCHAR2(50),
  extint3categoryid NUMBER(10),
  extint3name       VARCHAR2(50),
  remark            VARCHAR2(1000),
  sortindex         NUMBER(10) default 50 not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_CATEGORY
  is '字典主表';
comment on column web_angularjs.SYS_CATEGORY.id
  is '主键';
comment on column web_angularjs.SYS_CATEGORY.chinaname
  is '字典名称';
comment on column web_angularjs.SYS_CATEGORY.constname
  is '字典常量';
comment on column web_angularjs.SYS_CATEGORY.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_CATEGORY.extchar1name
  is '扩展字符属性1';
comment on column web_angularjs.SYS_CATEGORY.extchar2name
  is '扩展字符属性2';
comment on column web_angularjs.SYS_CATEGORY.extchar3name
  is '扩展字符属性3';
comment on column web_angularjs.SYS_CATEGORY.extchar4name
  is '扩展字符属性4';
comment on column web_angularjs.SYS_CATEGORY.extint1categoryid
  is '扩展数字属性1本身所引用的下拉选框ID';
comment on column web_angularjs.SYS_CATEGORY.extint1name
  is '扩展数字属性1';
comment on column web_angularjs.SYS_CATEGORY.extint2categoryid
  is '扩展数字属性2本身所引用的下拉选框ID';
comment on column web_angularjs.SYS_CATEGORY.extint2name
  is '扩展数字属性2';
comment on column web_angularjs.SYS_CATEGORY.extint3categoryid
  is '扩展数字属性3本身所引用的下拉选框ID';
comment on column web_angularjs.SYS_CATEGORY.extint3name
  is '扩展数字属性3';
comment on column web_angularjs.SYS_CATEGORY.remark
  is '备注';
comment on column web_angularjs.SYS_CATEGORY.sortindex
  is '排序号';
alter table web_angularjs.SYS_CATEGORY
  add constraint PK_SYS_CATEGORY primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_CATEGORY
  add constraint UQ_SYS_CATEGORY unique (CONSTNAME)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_CATEGORYVALUE
(
  id         NUMBER(10) not null,
  categoryid NUMBER(10) not null,
  parentid   NUMBER(10),
  refid      VARCHAR2(50) not null,
  chinaname  VARCHAR2(255) not null,
  extchar1   VARCHAR2(400),
  extchar2   VARCHAR2(400),
  extchar3   VARCHAR2(255),
  extchar4   VARCHAR2(255),
  extint1    VARCHAR2(255),
  extint2    VARCHAR2(255),
  extint3    VARCHAR2(255),
  remark     VARCHAR2(2000),
  sortindex  NUMBER(10) default 50 not null,
  delstatus  NUMBER(1) default 0 not null,
  isparent   VARCHAR2(5) default 'false' not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_CATEGORYVALUE
  is '字典子表';
comment on column web_angularjs.SYS_CATEGORYVALUE.id
  is '主键';
comment on column web_angularjs.SYS_CATEGORYVALUE.categoryid
  is '字典ID';
comment on column web_angularjs.SYS_CATEGORYVALUE.parentid
  is '父节点';
comment on column web_angularjs.SYS_CATEGORYVALUE.refid
  is '字段值';
comment on column web_angularjs.SYS_CATEGORYVALUE.chinaname
  is '字典值名称';
comment on column web_angularjs.SYS_CATEGORYVALUE.extchar1
  is '扩展字符属性1';
comment on column web_angularjs.SYS_CATEGORYVALUE.extchar2
  is '扩展字符属性2';
comment on column web_angularjs.SYS_CATEGORYVALUE.extchar3
  is '扩展字符属性3';
comment on column web_angularjs.SYS_CATEGORYVALUE.extchar4
  is '扩展字符属性4';
comment on column web_angularjs.SYS_CATEGORYVALUE.extint1
  is '扩展数字属性1';
comment on column web_angularjs.SYS_CATEGORYVALUE.extint2
  is '扩展数字属性2';
comment on column web_angularjs.SYS_CATEGORYVALUE.extint3
  is '扩展数字属性3';
comment on column web_angularjs.SYS_CATEGORYVALUE.remark
  is '备注';
comment on column web_angularjs.SYS_CATEGORYVALUE.sortindex
  is '排序号';
comment on column web_angularjs.SYS_CATEGORYVALUE.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_CATEGORYVALUE.isparent
  is '是否为父节点ture/false';
alter table web_angularjs.SYS_CATEGORYVALUE
  add constraint PK_SYS_CATEGORYVALUE primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_COLSREMARK
(
  alias             VARCHAR2(200),
  autono            NUMBER(3),
  categoryid        NUMBER(10),
  colname           VARCHAR2(50) not null,
  coltype           VARCHAR2(50),
  coltypealias      VARCHAR2(50),
  fmttypetime       NUMBER(3) default 0 not null,
  id                VARCHAR2(125) not null,
  multilines        NUMBER(3) default 0 not null,
  multiselected     NUMBER(3) default 0 not null,
  required          NUMBER(3) default 0 not null,
  rigor             NUMBER(3),
  tablename         VARCHAR2(50) not null,
  validdata         VARCHAR2(100),
  datalength        NUMBER(10),
  sourcecoltype     VARCHAR2(50),
  defaultvalue      VARCHAR2(50),
  nullable          CHAR(1),
  categoryconstname VARCHAR2(50),
  isclientuse       NUMBER(1) default 0 not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_COLSREMARK
  is '物理表字段信息表';
comment on column web_angularjs.SYS_COLSREMARK.alias
  is '别名';
comment on column web_angularjs.SYS_COLSREMARK.autono
  is '自动编号规则';
comment on column web_angularjs.SYS_COLSREMARK.categoryid
  is '绑定字典';
comment on column web_angularjs.SYS_COLSREMARK.colname
  is '字段名';
comment on column web_angularjs.SYS_COLSREMARK.coltype
  is '字段类型(用于与使用控件相关)';
comment on column web_angularjs.SYS_COLSREMARK.coltypealias
  is '字段类型描述';
comment on column web_angularjs.SYS_COLSREMARK.fmttypetime
  is '时间格式';
comment on column web_angularjs.SYS_COLSREMARK.id
  is '主键';
comment on column web_angularjs.SYS_COLSREMARK.multilines
  is '多行';
comment on column web_angularjs.SYS_COLSREMARK.multiselected
  is '多选框';
comment on column web_angularjs.SYS_COLSREMARK.required
  is '必填项';
comment on column web_angularjs.SYS_COLSREMARK.rigor
  is '精度';
comment on column web_angularjs.SYS_COLSREMARK.tablename
  is '表名';
comment on column web_angularjs.SYS_COLSREMARK.validdata
  is '数据校验格式';
comment on column web_angularjs.SYS_COLSREMARK.datalength
  is '内容长度';
comment on column web_angularjs.SYS_COLSREMARK.sourcecoltype
  is '物理表中的字段类型';
comment on column web_angularjs.SYS_COLSREMARK.defaultvalue
  is '默认值';
comment on column web_angularjs.SYS_COLSREMARK.nullable
  is '是否允许空';
comment on column web_angularjs.SYS_COLSREMARK.categoryconstname
  is '绑定字典项标识';
comment on column web_angularjs.SYS_COLSREMARK.isclientuse
  is '是否客户使用（普通用户绘制表单使用）';
alter table web_angularjs.SYS_COLSREMARK
  add constraint PK_SYS_COLSREMARK primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_DATAS_PRIVILEGE
(
  id                VARCHAR2(50) not null,
  simple_name       VARCHAR2(50) not null,
  const_name_or_url VARCHAR2(100) not null,
  group_id          VARCHAR2(50) not null,
  column_name       VARCHAR2(60),
  sql_condition     VARCHAR2(1000)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DATAS_PRIVILEGE
  is '数据权限表';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE.id
  is '主键';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE.simple_name
  is '权限简称';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE.const_name_or_url
  is '权限常量标识,。也可以存权限源ur';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE.group_id
  is '所属权限组的id';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE.column_name
  is '权限字段';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE.sql_condition
  is '权限条件sql 比如 ispublic>=1 and ispublic<=5 ';
alter table web_angularjs.SYS_DATAS_PRIVILEGE
  add constraint SYS_DATAS_PRIVILEGE_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_DATAS_PRIVILEGE
  add constraint SYS_DATAS_PRIVILEGE_C_N unique (CONST_NAME_OR_URL)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_DATAS_PRIVILEGEGROUP
(
  id                  VARCHAR2(50) not null,
  simple_name         VARCHAR2(50) not null,
  sqlhander_constname VARCHAR2(50),
  iscontext           NUMBER(1) default 0,
  descriptions        VARCHAR2(500),
  privilegecolumnname VARCHAR2(50),
  delstatus           NUMBER(1) default 0 not null,
  isdefault           NUMBER(1) default 0 not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DATAS_PRIVILEGEGROUP
  is '数据权限组信息';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.id
  is '主键';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.simple_name
  is '简称';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.sqlhander_constname
  is 'sql处理器常量标识';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.iscontext
  is '0：表示默认授权  1：表示基于语境的授权             （程序将根据此标识展示权限树  0：根据设定的url展示权限 1：展示配置的语境权限）';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.descriptions
  is '权限组描述';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.privilegecolumnname
  is '权限字段';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.delstatus
  is '禁用标识0：启用 1：禁用';
comment on column web_angularjs.SYS_DATAS_PRIVILEGEGROUP.isdefault
  is '默认权限组,只能有一个';
alter table web_angularjs.SYS_DATAS_PRIVILEGEGROUP
  add constraint SYS_DATAS_PRIVILEGEGROUP_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_DATAS_PRIVILEGEGROUP
  add constraint SYS_DATAS_PRIVILEGEGROUP_UQ unique (SQLHANDER_CONSTNAME)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_DATAS_PRIVILEGE_GRANT
(
  id                  VARCHAR2(50) not null,
  resourceid          VARCHAR2(50) not null,
  sqlhander_constname VARCHAR2(50),
  privilegeflags      VARCHAR2(4000),
  grant_objectid      VARCHAR2(50) not null,
  groupid             VARCHAR2(50) not null,
  delstatus           NUMBER(1) default 0 not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DATAS_PRIVILEGE_GRANT
  is '授权信息记录表';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.id
  is '主键';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.resourceid
  is '资源id';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.sqlhander_constname
  is '权限组sql处理器标识';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.privilegeflags
  is '对于范围设定表示权限常量标识，对于精确设定表示权限值';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.grant_objectid
  is '被授权对象的id 可能是角色id、部门id等';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.groupid
  is '权限组id';
comment on column web_angularjs.SYS_DATAS_PRIVILEGE_GRANT.delstatus
  is '禁用标识 0：启用 1：禁用';
alter table web_angularjs.SYS_DATAS_PRIVILEGE_GRANT
  add constraint PRIVILEGE_GRANT_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_DATAS_PRIVILEGE_GRANT
  add constraint PRIVILEGE_GRANT_UQ unique (RESOURCEID, GRANT_OBJECTID, GROUPID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_DEF_TAILORFORM
(
  id              NUMBER(10) not null,
  delstatus       NUMBER(1) default 0 not null,
  chinaname       VARCHAR2(100) not null,
  path            VARCHAR2(100),
  tablename       VARCHAR2(50) not null,
  tasktitlecolumn VARCHAR2(50),
  tasktitleprefix VARCHAR2(1000),
  printpath       VARCHAR2(100),
  adder           VARCHAR2(50) default 0 not null,
  addtime         DATE default sysdate not null,
  moder           VARCHAR2(50) default 0 not null,
  modtime         DATE default sysdate not null,
  adderdeptid     VARCHAR2(50),
  adderunitid     VARCHAR2(50),
  unitid          CLOB,
  unitname        CLOB
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DEF_TAILORFORM
  is '电子表单定义表';
comment on column web_angularjs.SYS_DEF_TAILORFORM.id
  is '主键';
comment on column web_angularjs.SYS_DEF_TAILORFORM.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_DEF_TAILORFORM.chinaname
  is '表单名称';
comment on column web_angularjs.SYS_DEF_TAILORFORM.path
  is '表单保存路径';
comment on column web_angularjs.SYS_DEF_TAILORFORM.tablename
  is '物理表名称';
comment on column web_angularjs.SYS_DEF_TAILORFORM.tasktitlecolumn
  is '任务标题字段';
comment on column web_angularjs.SYS_DEF_TAILORFORM.tasktitleprefix
  is '任务标题前缀';
comment on column web_angularjs.SYS_DEF_TAILORFORM.printpath
  is '表单打印路径';
comment on column web_angularjs.SYS_DEF_TAILORFORM.adder
  is '添加人';
comment on column web_angularjs.SYS_DEF_TAILORFORM.addtime
  is '增加时间';
comment on column web_angularjs.SYS_DEF_TAILORFORM.moder
  is '最后修改者';
comment on column web_angularjs.SYS_DEF_TAILORFORM.modtime
  is '最后修改时间';
comment on column web_angularjs.SYS_DEF_TAILORFORM.adderdeptid
  is '所属单位';
comment on column web_angularjs.SYS_DEF_TAILORFORM.adderunitid
  is '所属部门';
comment on column web_angularjs.SYS_DEF_TAILORFORM.unitid
  is '使用单位';
comment on column web_angularjs.SYS_DEF_TAILORFORM.unitname
  is '使用单位名称';
alter table web_angularjs.SYS_DEF_TAILORFORM
  add constraint PK_SYS_DEF_TAILORFORM primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_DEF_TAILORFORMCOL
(
  id                NUMBER(10) not null,
  delstatus         NUMBER(1) default 0 not null,
  tailorformid      NUMBER(10),
  chinaname         VARCHAR2(100) not null,
  tablename         VARCHAR2(50),
  colname           VARCHAR2(50),
  ismindcol         NUMBER(1) default 0 not null,
  formuserule       NUMBER(3) default 1 not null,
  sourcecol         VARCHAR2(100),
  col_type          NUMBER(2),
  categoryconstname VARCHAR2(50),
  fmttypetime       VARCHAR2(50) default 'default',
  required          NUMBER(3) default 0,
  validdata         VARCHAR2(100)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DEF_TAILORFORMCOL
  is '电子表单字段定义表';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.id
  is '主键';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.tailorformid
  is '表单主键';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.chinaname
  is '表单显示的列名称';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.tablename
  is '物理表名称';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.colname
  is '物理表列名称';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.ismindcol
  is '是否意见字段';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.formuserule
  is '表单使用规则';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.sourcecol
  is '绑定列源';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.col_type
  is '字段类型，可以根据此列的值，构造对应的表单控件';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.categoryconstname
  is '绑定字典项标识';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.fmttypetime
  is '时间格式';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.required
  is '必填项';
comment on column web_angularjs.SYS_DEF_TAILORFORMCOL.validdata
  is '数据校验格式';
create index web_angularjs.IX_DEF_FORMCOL_TAILORFORMID on web_angularjs.SYS_DEF_TAILORFORMCOL (TAILORFORMID, DELSTATUS)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_DEF_TAILORFORMCOL
  add constraint PK_SYS_DEF_TAILORFORMCOL primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_DEF_TAILORFORMCONTENT
(
  id           NUMBER(10) not null,
  delstatus    NUMBER(1) default 0 not null,
  tailorformid NUMBER(10) not null,
  formcontent  CLOB
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DEF_TAILORFORMCONTENT
  is '电子表单定义表';
comment on column web_angularjs.SYS_DEF_TAILORFORMCONTENT.id
  is '主键';
comment on column web_angularjs.SYS_DEF_TAILORFORMCONTENT.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_DEF_TAILORFORMCONTENT.tailorformid
  is '表单主键';
comment on column web_angularjs.SYS_DEF_TAILORFORMCONTENT.formcontent
  is '表单内容';
create index web_angularjs.IX_DEF_FORMCONTENT on web_angularjs.SYS_DEF_TAILORFORMCONTENT (TAILORFORMID)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_DEF_TAILORFORMCONTENT
  add constraint PK_SYS_DEF_TAILORFORMCONTENT primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_DEPT
(
  id              VARCHAR2(50) default sys_guid() not null,
  unitcode        VARCHAR2(200),
  deptlevel       NUMBER(1) default 0,
  deptleaders     VARCHAR2(50),
  delstatus       NUMBER(1) default 0 not null,
  sortindex       NUMBER(10) default 50 not null,
  searchcode      VARCHAR2(50),
  permstring      CLOB default ',0,',
  simplechinaname VARCHAR2(50),
  chinaname       VARCHAR2(50) not null,
  parentid        VARCHAR2(50),
  unitid          VARCHAR2(50),
  faxphone        VARCHAR2(15),
  phonetic        VARCHAR2(20),
  contactphone    VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_DEPT
  is '单位部门表';
comment on column web_angularjs.SYS_DEPT.id
  is '主键';
comment on column web_angularjs.SYS_DEPT.unitcode
  is '部门编码';
comment on column web_angularjs.SYS_DEPT.deptlevel
  is '部门级别 单位/部门/科室';
comment on column web_angularjs.SYS_DEPT.deptleaders
  is '部门负责人';
comment on column web_angularjs.SYS_DEPT.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_DEPT.sortindex
  is '排序号';
comment on column web_angularjs.SYS_DEPT.searchcode
  is '快速查询编码    使用该字段可以不用递归即可获取到指定部门下所有子部门   规则：   第一层第一个节点：001   第二层第一个节点：001001';
comment on column web_angularjs.SYS_DEPT.permstring
  is '部门拥有的菜单';
comment on column web_angularjs.SYS_DEPT.simplechinaname
  is '部门简称';
comment on column web_angularjs.SYS_DEPT.chinaname
  is '部门名称';
comment on column web_angularjs.SYS_DEPT.parentid
  is '上级部门';
comment on column web_angularjs.SYS_DEPT.unitid
  is '所属单位';
comment on column web_angularjs.SYS_DEPT.faxphone
  is '传真号码';
comment on column web_angularjs.SYS_DEPT.phonetic
  is '名称首字母';
comment on column web_angularjs.SYS_DEPT.contactphone
  is '联系方式';
create index web_angularjs.IX_SYS_DEPT on web_angularjs.SYS_DEPT (SORTINDEX)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_DEPT
  add constraint PK_SYS_DEPT_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_EFFECTDATE
(
  workdate DATE not null,
  isvalid  NUMBER default 0,
  year     NUMBER(4) not null,
  month    NUMBER(2) not null,
  day      NUMBER(2) not null,
  id       VARCHAR2(50) not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_EFFECTDATE
  is '工作日设置表';
comment on column web_angularjs.SYS_EFFECTDATE.workdate
  is '日期';
comment on column web_angularjs.SYS_EFFECTDATE.isvalid
  is '是否是有效工作日';
comment on column web_angularjs.SYS_EFFECTDATE.year
  is '年';
comment on column web_angularjs.SYS_EFFECTDATE.month
  is '月';
comment on column web_angularjs.SYS_EFFECTDATE.day
  is '日';
comment on column web_angularjs.SYS_EFFECTDATE.id
  is '主键';
alter table web_angularjs.SYS_EFFECTDATE
  add constraint SYS_EFFECTDATE_PK primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;
alter table web_angularjs.SYS_EFFECTDATE
  add constraint UK_EFFECTDATE unique (WORKDATE)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_EXCEPTIONLOG
(
  id            NUMBER(10) not null,
  userid        NUMBER(10) not null,
  username      VARCHAR2(50) not null,
  exceptiontime DATE not null,
  classname     VARCHAR2(100) not null,
  methodname    VARCHAR2(100) not null,
  unitid        NUMBER(10) not null,
  deptid        NUMBER(10) not null,
  description   CLOB
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_EXCEPTIONLOG
  is '异常日志表';
comment on column web_angularjs.SYS_EXCEPTIONLOG.id
  is '主键';
comment on column web_angularjs.SYS_EXCEPTIONLOG.userid
  is '操作者主键';
comment on column web_angularjs.SYS_EXCEPTIONLOG.username
  is '操作者姓名';
comment on column web_angularjs.SYS_EXCEPTIONLOG.exceptiontime
  is '异常时间';
comment on column web_angularjs.SYS_EXCEPTIONLOG.classname
  is '异常类路径';
comment on column web_angularjs.SYS_EXCEPTIONLOG.methodname
  is '异常方法';
comment on column web_angularjs.SYS_EXCEPTIONLOG.unitid
  is '单位ID';
comment on column web_angularjs.SYS_EXCEPTIONLOG.deptid
  is '部门ID';
comment on column web_angularjs.SYS_EXCEPTIONLOG.description
  is '异常信息';
create index web_angularjs.IX_EXCEPTIONLOG_USERID on web_angularjs.SYS_EXCEPTIONLOG (USERID)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;
alter table web_angularjs.SYS_EXCEPTIONLOG
  add constraint PK_SYS_EXCEPTIONLOG primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

create table web_angularjs.SYS_MENU
(
  name      VARCHAR2(50),
  mainurl   VARCHAR2(500),
  sortindex NUMBER(10) default 50,
  deskicon  VARCHAR2(100),
  menuicon  VARCHAR2(100),
  isparent  VARCHAR2(5) default 'false' not null,
  delstatus NUMBER(1) default 0 not null,
  id        VARCHAR2(50),
  parentid  VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_MENU
  is '菜单表';
comment on column web_angularjs.SYS_MENU.name
  is '菜单名称';
comment on column web_angularjs.SYS_MENU.mainurl
  is '菜单主页';
comment on column web_angularjs.SYS_MENU.sortindex
  is '排序号';
comment on column web_angularjs.SYS_MENU.deskicon
  is '桌面图标';
comment on column web_angularjs.SYS_MENU.menuicon
  is '菜单图标';
comment on column web_angularjs.SYS_MENU.isparent
  is '是否是父节点,true or false';
comment on column web_angularjs.SYS_MENU.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_MENU.id
  is '主键';
comment on column web_angularjs.SYS_MENU.parentid
  is '父id';
alter table web_angularjs.SYS_MENU
add constraint PK_SYS_MENU_ID primary key (ID)
using index
tablespace web_angularjs
pctfree 10
initrans 2
maxtrans 255
storage
(
  initial 64K
  next 1M
  minextents 1
  maxextents unlimited
);


create table web_angularjs.SYS_MENUOPERATION
(
  elementid  VARCHAR2(36) not null,
  chinaname  VARCHAR2(100) not null,
  webapipath VARCHAR2(100),
  iconcls    VARCHAR2(20),
  delstatus  NUMBER(1) default 0 not null,
  sortindex  NUMBER(10) default 50 not null,
  jsfunction VARCHAR2(50),
  id         VARCHAR2(50),
  menuid     VARCHAR2(50),
  constname  VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_MENUOPERATION
  is '菜单对应页面的操作按钮信息表';
comment on column web_angularjs.SYS_MENUOPERATION.elementid
  is '元素id值，来自于元素在页面使用的id值';
comment on column web_angularjs.SYS_MENUOPERATION.chinaname
  is '元素中文描述';
comment on column web_angularjs.SYS_MENUOPERATION.webapipath
  is 'Controller+Action';
comment on column web_angularjs.SYS_MENUOPERATION.iconcls
  is '按钮图标';
comment on column web_angularjs.SYS_MENUOPERATION.delstatus
  is '删除标识 ';
comment on column web_angularjs.SYS_MENUOPERATION.sortindex
  is '排序号';
comment on column web_angularjs.SYS_MENUOPERATION.jsfunction
  is '前台js函数名';
comment on column web_angularjs.SYS_MENUOPERATION.menuid
  is '菜单id';
comment on column web_angularjs.SYS_MENUOPERATION.constname
  is '唯一标识';
alter table web_angularjs.SYS_MENUOPERATION
add constraint PK_SYS_MENUOPERATION_ID primary key (ID)
using index
tablespace web_angularjs
pctfree 10
initrans 2
maxtrans 255
storage
(
  initial 64K
  next 1M
  minextents 1
  maxextents unlimited
);


create table web_angularjs.SYS_MODEL_PK_NUMBER
(
  id       NUMBER(10) not null,
  id_value NUMBER(10),
  id_name VARCHAR2(20)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_MODEL_PK_NUMBER
  is '数字类型的主键表';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER.id
  is '主键';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER.id_value
  is '主键值';
  comment on column web_angularjs.SYS_MODEL_PK_NUMBER.id_name
  is '主键名';
alter table web_angularjs.SYS_MODEL_PK_NUMBER
  add constraint PK_ID_NUMBER primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_MODEL_PK_NUMBER_DETAIL
(
  transfer_detail_pk NUMBER(10) not null,
  id_name            VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_MODEL_PK_NUMBER_DETAIL
  is '数字类型的主键表';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_DETAIL.transfer_detail_pk
  is '主键';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_DETAIL.id_name
  is '主键名';
alter table web_angularjs.SYS_MODEL_PK_NUMBER_DETAIL
  add constraint PK_ID_NUMBER_DETAIL primary key (TRANSFER_DETAIL_PK)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_MODEL_PK_NUMBER_JUDGE
(
  judge_id NUMBER(10) not null,
  id_name  VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_MODEL_PK_NUMBER_JUDGE
  is '数字类型的主键表';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_JUDGE.judge_id
  is '主键';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_JUDGE.id_name
  is '主键名';
alter table web_angularjs.SYS_MODEL_PK_NUMBER_JUDGE
  add constraint PK_ID_NUMBER_JUDGE primary key (JUDGE_ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_MODEL_PK_NUMBER_LOG
(
  num_id  NUMBER(10),
  id_name VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_MODEL_PK_NUMBER_LOG
  is '数字类型的主键表';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_LOG.num_id
  is '主键';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_LOG.id_name
  is '主键名';


create table web_angularjs.SYS_MODEL_PK_NUMBER_QZHLOG
(
  tid     NUMBER(10) not null,
  id_name VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_MODEL_PK_NUMBER_QZHLOG
  is '数字类型的主键表';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_QZHLOG.tid
  is '主键';
comment on column web_angularjs.SYS_MODEL_PK_NUMBER_QZHLOG.id_name
  is '主键名';
alter table web_angularjs.SYS_MODEL_PK_NUMBER_QZHLOG
  add constraint PK_ID_NUMBER_QZHLOG primary key (TID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_MODEL_PK_STRING
(
  id      VARCHAR2(50) not null,
  id_name VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_MODEL_PK_STRING
  is '字符类型的主键表';
comment on column web_angularjs.SYS_MODEL_PK_STRING.id
  is '主键';
comment on column web_angularjs.SYS_MODEL_PK_STRING.id_name
  is '主键名';
alter table web_angularjs.SYS_MODEL_PK_STRING
  add constraint PK_ID_STRING primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_OPERATIONLOG
(
  id              NUMBER(10) not null,
  userid          NUMBER(10) not null,
  username        VARCHAR2(10) not null,
  operatetime     DATE not null,
  classname       VARCHAR2(100) not null,
  methodname      VARCHAR2(100) not null,
  description     VARCHAR2(100),
  unitid          NUMBER(10) not null,
  deptid          NUMBER(10) not null,
  parametersvalue CLOB
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_OPERATIONLOG
  is '操作日志记录表';
comment on column web_angularjs.SYS_OPERATIONLOG.id
  is '主键';
comment on column web_angularjs.SYS_OPERATIONLOG.userid
  is '操作者主键';
comment on column web_angularjs.SYS_OPERATIONLOG.username
  is '操作者姓名';
comment on column web_angularjs.SYS_OPERATIONLOG.operatetime
  is '操作时间';
comment on column web_angularjs.SYS_OPERATIONLOG.classname
  is '操作类路径';
comment on column web_angularjs.SYS_OPERATIONLOG.methodname
  is '操作方法';
comment on column web_angularjs.SYS_OPERATIONLOG.description
  is '方法描述';
comment on column web_angularjs.SYS_OPERATIONLOG.unitid
  is '单位ID';
comment on column web_angularjs.SYS_OPERATIONLOG.deptid
  is '部门ID';
comment on column web_angularjs.SYS_OPERATIONLOG.parametersvalue
  is '方法参数值';
create index web_angularjs.IX_OPERATIONLOG_USERID on web_angularjs.SYS_OPERATIONLOG (USERID)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;
alter table web_angularjs.SYS_OPERATIONLOG
  add constraint PK_SYS_OPERATIONLOG primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

create table web_angularjs.SYS_PRIVILEGE
(
  id          NUMBER(10) not null,
  master      VARCHAR2(2000) not null,
  mastervalue VARCHAR2(2000) not null,
  accessvalue VARCHAR2(2000),
  operation   VARCHAR2(2000),
  access_     VARCHAR2(2000) not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
alter table web_angularjs.SYS_PRIVILEGE
  add constraint SYS_PRIVILEGE_PK_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_ROLES
(
  chinaname       VARCHAR2(50) not null,
  delstatus       NUMBER(1) default 0,
  sortindex       NUMBER(10) not null,
  permstring      CLOB default ',0,',
  constname       VARCHAR2(20),
  id              VARCHAR2(50) not null,
  can_use_roleids CLOB,
  addid           VARCHAR2(50) not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_ROLES
  is '角色表';
comment on column web_angularjs.SYS_ROLES.chinaname
  is '角色名称';
comment on column web_angularjs.SYS_ROLES.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_ROLES.sortindex
  is '排序号';
comment on column web_angularjs.SYS_ROLES.permstring
  is '菜单权限';
comment on column web_angularjs.SYS_ROLES.constname
  is '角色标识';
comment on column web_angularjs.SYS_ROLES.id
  is '主键';
comment on column web_angularjs.SYS_ROLES.can_use_roleids
  is '当前角色可以给用户分配的角色  防止通过角色的分配来越权';
comment on column web_angularjs.SYS_ROLES.addid
  is '添加用户的主键';
alter table web_angularjs.SYS_ROLES
  add constraint PK_ROLES_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_TABLESREMARK
(
  alias             VARCHAR2(255) default '未定义' not null,
  candeletedata     NUMBER(3) default 0,
  foldertype        NUMBER(10) default 0 not null,
  filenamecol       VARCHAR2(500),
  sortcolname       VARCHAR2(100) default 'id' not null,
  tablename         VARCHAR2(50) not null,
  tabletype         NUMBER(3) default 0 not null,
  remark            VARCHAR2(300),
  pkname            VARCHAR2(50),
  summarytable      VARCHAR2(50),
  summarycol        VARCHAR2(100),
  assemblyname      VARCHAR2(50),
  fullclassname     VARCHAR2(100),
  javafullclassname VARCHAR2(100)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_TABLESREMARK
  is '物理表信息表';
comment on column web_angularjs.SYS_TABLESREMARK.alias
  is '别名';
comment on column web_angularjs.SYS_TABLESREMARK.candeletedata
  is '是否可以清除数据0否1是';
comment on column web_angularjs.SYS_TABLESREMARK.foldertype
  is '所处目录';
comment on column web_angularjs.SYS_TABLESREMARK.filenamecol
  is '保存正文使用那些列作为文件名';
comment on column web_angularjs.SYS_TABLESREMARK.sortcolname
  is '第一排序字段';
comment on column web_angularjs.SYS_TABLESREMARK.tablename
  is '表名';
comment on column web_angularjs.SYS_TABLESREMARK.tabletype
  is '物理表类型';
comment on column web_angularjs.SYS_TABLESREMARK.remark
  is '备注';
comment on column web_angularjs.SYS_TABLESREMARK.pkname
  is '主键列名';
comment on column web_angularjs.SYS_TABLESREMARK.summarytable
  is 'Summarytable';
comment on column web_angularjs.SYS_TABLESREMARK.summarycol
  is '关联主表主键的外键';
comment on column web_angularjs.SYS_TABLESREMARK.assemblyname
  is 'model所在的程序集名称';
comment on column web_angularjs.SYS_TABLESREMARK.fullclassname
  is 'model类的完全限定名（即包括命名空间）';
comment on column web_angularjs.SYS_TABLESREMARK.javafullclassname
  is 'java用model类的完全限定名（即包括包名）';
alter table web_angularjs.SYS_TABLESREMARK
  add constraint PK_SYS_TABLESREMARK primary key (TABLENAME)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


create table web_angularjs.SYS_TEMPLATEBOOKMARKS
(
  id         NUMBER(10) not null,
  delstatus  NUMBER(3) default 0 not null,
  templateid NUMBER(10) not null,
  bookmarkid NUMBER(10) not null,
  colname    VARCHAR2(50) not null,
  constname  VARCHAR2(50) not null,
  chinaname  VARCHAR2(50) not null,
  tablename  VARCHAR2(100)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_TEMPLATEBOOKMARKS
  is '书签模板关系表';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.id
  is '主键';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.templateid
  is '模板主键';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.bookmarkid
  is '书签主键或者tailorformcolid';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.colname
  is '书签使用字段';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.constname
  is '书签标识';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.chinaname
  is '书签名称';
comment on column web_angularjs.SYS_TEMPLATEBOOKMARKS.tablename
  is '书签使用的表名';
create index web_angularjs.IX_SYS_TEMPLATEBOOKMARKS on web_angularjs.SYS_TEMPLATEBOOKMARKS (TEMPLATEID)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;
alter table web_angularjs.SYS_TEMPLATEBOOKMARKS
  add constraint PK_SYS_TEMPLATEBOOKMARKS primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;


create table web_angularjs.SYS_URL_RESOURCES
(
  id          VARCHAR2(50) not null,
  simplename  VARCHAR2(50),
  url         VARCHAR2(100),
  description VARCHAR2(500),
  delstatus   NUMBER(1) not null,
  addtime     DATE
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_URL_RESOURCES
  is '资源url';
comment on column web_angularjs.SYS_URL_RESOURCES.id
  is '主键';
comment on column web_angularjs.SYS_URL_RESOURCES.simplename
  is '资源简称';
comment on column web_angularjs.SYS_URL_RESOURCES.url
  is '资源url';
comment on column web_angularjs.SYS_URL_RESOURCES.description
  is '资源描述';
comment on column web_angularjs.SYS_URL_RESOURCES.delstatus
  is '禁用标识0：启用 1：禁用';
comment on column web_angularjs.SYS_URL_RESOURCES.addtime
  is '扫描时间';
alter table web_angularjs.SYS_URL_RESOURCES
  add constraint URL_RESOURCES_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_URL_RESOURCES
  add constraint URL_RESOURCES_UQ unique (URL)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_USER
(
  delstatus     NUMBER(1) default 0 not null,
  chinaname     VARCHAR2(20) not null,
  loginname     VARCHAR2(20) not null,
  birth         DATE,
  sex           NUMBER(3) default 0 not null,
  password      VARCHAR2(64) default '' not null,
  mail          VARCHAR2(128),
  mobile        VARCHAR2(50),
  phonedept     VARCHAR2(50),
  phonehome     VARCHAR2(50),
  personroles   VARCHAR2(1000),
  sortindex     NUMBER(10) default 50 not null,
  identitynum   VARCHAR2(18),
  permstring    CLOB default ',0,',
  signimagepath VARCHAR2(200),
  nameindept    VARCHAR2(200),
  id            VARCHAR2(50) not null,
  deptid        VARCHAR2(50),
  unitid        VARCHAR2(50),
  userindex     NUMBER(6)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 8K
    minextents 1
    maxextents unlimited
  );
comment on table web_angularjs.SYS_USER
  is '系统用户表';
comment on column web_angularjs.SYS_USER.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_USER.chinaname
  is '姓名';
comment on column web_angularjs.SYS_USER.loginname
  is '登录名';
comment on column web_angularjs.SYS_USER.birth
  is '出生年月';
comment on column web_angularjs.SYS_USER.sex
  is '性别';
comment on column web_angularjs.SYS_USER.password
  is '密码';
comment on column web_angularjs.SYS_USER.mail
  is '电子邮件';
comment on column web_angularjs.SYS_USER.mobile
  is '移动电话';
comment on column web_angularjs.SYS_USER.phonedept
  is '单位电话';
comment on column web_angularjs.SYS_USER.phonehome
  is '家庭电话';
comment on column web_angularjs.SYS_USER.personroles
  is '人员角色';
comment on column web_angularjs.SYS_USER.sortindex
  is '在部门中的排序号';
comment on column web_angularjs.SYS_USER.identitynum
  is '身份证号';
comment on column web_angularjs.SYS_USER.permstring
  is '菜单权限';
comment on column web_angularjs.SYS_USER.signimagepath
  is '用户签名图片存放路径';
comment on column web_angularjs.SYS_USER.nameindept
  is '用户在单位中的称呼';
comment on column web_angularjs.SYS_USER.id
  is '主键';
comment on column web_angularjs.SYS_USER.deptid
  is '所属部门id（直接父）';
comment on column web_angularjs.SYS_USER.unitid
  is '所属单位id';
comment on column web_angularjs.SYS_USER.userindex
  is '人员之间的排序号';
create index web_angularjs.IX_SYS_USER on web_angularjs.SYS_USER (LOGINNAME)
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table web_angularjs.SYS_USER
  add constraint PK_USER_ID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

create table web_angularjs.SYS_USER_GROUP
(
  id        VARCHAR2(50) not null,
  groupid   VARCHAR2(50),
  userid    VARCHAR2(50),
  delstatus NUMBER(1) default 0 not null,
  creatid   VARCHAR2(50),
  creatdate DATE
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_USER_GROUP
  is '账号关联关系表';
comment on column web_angularjs.SYS_USER_GROUP.id
  is '主键';
comment on column web_angularjs.SYS_USER_GROUP.groupid
  is '关联账号组id';
comment on column web_angularjs.SYS_USER_GROUP.userid
  is '账号id';
comment on column web_angularjs.SYS_USER_GROUP.delstatus
  is '删除标识';
comment on column web_angularjs.SYS_USER_GROUP.creatid
  is '添加人';
comment on column web_angularjs.SYS_USER_GROUP.creatdate
  is '创建时间';
alter table web_angularjs.SYS_USER_GROUP
  add constraint USERGROUPID primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

create table web_angularjs.SYS_VIRTUALSUBTABLE
(
  id                  NUMBER(10) not null,
  delstatus           NUMBER(1) default 0 not null,
  chinaname           VARCHAR2(100) not null,
  tablename           VARCHAR2(50) not null,
  shownumber          NUMBER(3) default 0 not null,
  multiselect         NUMBER(3) default 0 not null,
  pagination          NUMBER(3),
  pagesize            NUMBER(3),
  showfooter          NUMBER(3),
  constname           VARCHAR2(50) not null,
  subtableconfig      CLOB,
  savedataaction      VARCHAR2(100),
  destroydataaction   VARCHAR2(100),
  newdata             VARCHAR2(1000),
  loaddataaction      VARCHAR2(100),
  pagerootpath        VARCHAR2(50),
  foreignkeycolumn    VARCHAR2(50),
  collectdisplayfield VARCHAR2(50),
  unitid              VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_VIRTUALSUBTABLE
  is '电子表单定义表';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.id
  is '主键';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.chinaname
  is '子表名称';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.tablename
  is '物理表名称';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.shownumber
  is '是否显示行号';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.multiselect
  is '是否允许多选';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.pagination
  is '是否显示分页';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.pagesize
  is '页大小';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.showfooter
  is '是否显示汇总行';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.constname
  is '标识常量';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.subtableconfig
  is '子表配置信息';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.savedataaction
  is '保存数据请求地址';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.destroydataaction
  is '物理删除数据请求地址';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.newdata
  is '新数据格式';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.loaddataaction
  is '获取数据的请求地址';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.pagerootpath
  is '列表页面所在目录距离根目录的层级，如：若一级：../  二级：../../  以此类推';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.foreignkeycolumn
  is '关联父表的列名称';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.collectdisplayfield
  is '汇总限制标题列';
comment on column web_angularjs.SYS_VIRTUALSUBTABLE.unitid
  is '所属单位id';
alter table web_angularjs.SYS_VIRTUALSUBTABLE
  add constraint PK_SYS_VIRTUALSUBTABLE primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

create table web_angularjs.SYS_VIRTUALSUBTABLECOL
(
  id            NUMBER(10) not null,
  delstatus     NUMBER(1) default 0 not null,
  tablename     VARCHAR2(50) not null,
  colname       VARCHAR2(50) default 0 not null,
  chinaname     VARCHAR2(100) not null,
  colwidth      VARCHAR2(50) default '' not null,
  textalign     VARCHAR2(50) default 'left' not null,
  sortindex     NUMBER(4),
  subtableid    NUMBER(10) not null,
  enablecollect NUMBER(1) default 0 not null,
  collectrule   VARCHAR2(50)
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_VIRTUALSUBTABLECOL
  is '电子表单子表列设置表';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.id
  is '主键';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.delstatus
  is '禁用标识';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.tablename
  is '物理表名称';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.colname
  is '列名称';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.chinaname
  is '子表名称';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.colwidth
  is '列的宽度';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.textalign
  is '单元格对齐方式(left;center;right)';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.sortindex
  is '排序编号';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.subtableid
  is '字表主键';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.enablecollect
  is '是否启用汇总';
comment on column web_angularjs.SYS_VIRTUALSUBTABLECOL.collectrule
  is '汇总规则';
alter table web_angularjs.SYS_VIRTUALSUBTABLECOL
  add constraint PK_SYS_VIRTUALSUBTABLECOL primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

create table web_angularjs.SYS_VIRTUAL_COL_VALUE
(
  id               VARCHAR2(50) not null,
  col_value        VARCHAR2(500),
  col_big_value    CLOB,
  tailorformcol_id VARCHAR2(50) not null,
  record_id        VARCHAR2(50) not null
)
tablespace web_angularjs
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table web_angularjs.SYS_VIRTUAL_COL_VALUE
  is '使用的虚拟字段存储的值';
comment on column web_angularjs.SYS_VIRTUAL_COL_VALUE.id
  is '????';
comment on column web_angularjs.SYS_VIRTUAL_COL_VALUE.col_value
  is '字段的值';
comment on column web_angularjs.SYS_VIRTUAL_COL_VALUE.col_big_value
  is '大文本字段值';
comment on column web_angularjs.SYS_VIRTUAL_COL_VALUE.tailorformcol_id
  is '该虚拟字段所属表单字段表的主键';
comment on column web_angularjs.SYS_VIRTUAL_COL_VALUE.record_id
  is '业务表对应记录的主键';
alter table web_angularjs.SYS_VIRTUAL_COL_VALUE
  add constraint VIRTUAL_COL_VALUE_ID_PK primary key (ID)
  using index
  tablespace web_angularjs
  pctfree 10
  initrans 2
  maxtrans 255;

CREATE OR REPLACE PROCEDURE SYNCCOLDEFAULTVALUE IS     BEGIN           FOR R IN (       SELECT TABLE_NAME, COLUMN_NAME, DATA_DEFAULT, NULLABLE         FROM USER_TAB_COLUMNS UTAB        INNER JOIN SYS_TABLESREMARK TREMARK ON LOWER(UTAB.TABLE_NAME) =                                               LOWER(TREMARK.TABLENAME)) LOOP        UPDATE SYS_COLSREMARK CREMARK SET DEFAULTVALUE = REPLACE(R.DATA_DEFAULT, '''', ''), NULLABLE = R.NULLABLE        WHERE LOWER(CREMARK.TABLENAME) = LOWER(R.TABLE_NAME)          AND LOWER(CREMARK.COLNAME) = LOWER(R.COLUMN_NAME);   END LOOP;   UPDATE SYS_COLSREMARK      SET DEFAULTVALUE = NULL    WHERE LOWER(DEFAULTVALUE) LIKE 'null%'       OR DEFAULTVALUE = '';   UPDATE SYS_COLSREMARK      SET DEFAULTVALUE = REPLACE(DEFAULTVALUE,CHR(10),'')    WHERE DEFAULTVALUE IS NOT NULL; END;;