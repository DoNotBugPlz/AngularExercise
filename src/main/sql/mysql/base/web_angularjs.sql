/*
Navicat MySQL Data Transfer

Source Server         : web_module@mysql
Source Server Version : 50615
Source Host           : localhost:3306
Source Database       : web_module

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2017-04-28 15:05:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for log_a
-- ----------------------------
-- -- DROP TABLE IF EXISTS `log_a`;
CREATE TABLE `log_a` (
  `EVENTDATE` datetime DEFAULT NULL COMMENT '时间',
  `LOG_LEVEL` varchar(100) DEFAULT NULL COMMENT '日志级别',
  `LOGGER` varchar(50) DEFAULT NULL COMMENT '记录者',
  `MESSAGE` varchar(500) COMMENT '内容',
  `EXCEPTION` varchar(500) COMMENT '异常信息',
  `HOST_ADDRESS` varchar(200) DEFAULT NULL COMMENT 'ip地址',
  `REQUEST_URL` varchar(255) COMMENT '请求的url',
  `REQUEST_SERIALNO` bigint DEFAULT NULL COMMENT '请求的序列号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日志表（log4j2.xml配置）';

-- ----------------------------
-- Records of log_a
-- ----------------------------

-- ----------------------------
-- Table structure for notice
-- ----------------------------
-- -- DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `TITLE` varchar(500) NOT NULL COMMENT '标题',
  `CONTENT` varchar(500) NOT NULL COMMENT '通知内容',
  `RECEIVER_IDS` varchar(500) NOT NULL COMMENT '接收人',
  `RECEIVER_NAMES` varchar(500) NOT NULL COMMENT '接收人姓名',
  `IS_PUBLIC` int NOT NULL default 0 COMMENT '是否公开',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标志',
  `ADDER` varchar(50) NOT NULL COMMENT '添加人',
  `ADDER_DEPTID` varchar(50) NOT NULL COMMENT '添加人所在部门id',
  `ADD_TIME` datetime NOT NULL COMMENT '登记时间',
  PRIMARY KEY (`ID`),
  KEY `ADD_TIME_INDEX` (`ADD_TIME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通知公告表';

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('a08182bd5b8a350f015b8a363f6c0001151422', '通知032', '通知032', 'a08182c156264ae101562652f45e0002162945', '人员2', '1', '0', 'a08182bd4b3494b2014b34a48ae70000154253', 'a08182ea499e8d3301499e9a2050000f192541', '2017-04-20 15:14:12.000000');
INSERT INTO `notice` VALUES ('a08182bd5b8a350f015b8a3680830002151439', '通知033', '点点滴滴', 'a08182bd4b3494b2014b34a48ae70000154253,a08182c156264ae101562652f45e0002162945', '超级管理员,人员2', '1', '0', 'a08182bd4b3494b2014b34a48ae70000154253', 'a08182ea499e8d3301499e9a2050000f192541', '2017-04-20 15:14:25.000000');
INSERT INTO `notice` VALUES ('a08182bd5b8a350f015b8a36ca750003151458', '通知034', '通知034', 'a08182c1558f659a01558f83d0c30001094028', '人员1', '1', '0', 'a08182bd4b3494b2014b34a48ae70000154253', 'a08182ea499e8d3301499e9a2050000f192541', '2017-04-20 15:14:47.000000');

-- ----------------------------
-- Table structure for noticesub
-- ----------------------------
-- -- DROP TABLE IF EXISTS `noticesub`;
CREATE TABLE `noticesub` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `NAME` varchar(30) DEFAULT NULL COMMENT '姓名',
  `AGE` int DEFAULT NULL COMMENT '年龄',
  `BIRTH` datetime DEFAULT NULL COMMENT '出生',
  `DELSTATUS` int DEFAULT NULL COMMENT '删除标志',
  `NOTICEID` varchar(50) DEFAULT NULL COMMENT 'notice.id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通知子表-测试使用';

-- ----------------------------
-- Records of noticesub
-- ----------------------------

-- ----------------------------
-- Table structure for officediction
-- ----------------------------
-- -- DROP TABLE IF EXISTS `officediction`;
CREATE TABLE `officediction` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `DICTION` varchar(200) NOT NULL COMMENT '办公用语',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标志',
  `USERID` varchar(50) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用语表';

-- ----------------------------
-- Records of officediction
-- ----------------------------

-- ----------------------------
-- Table structure for sys_attachfile
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_attachfile`;
CREATE TABLE `sys_attachfile` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `DELSTATUS` int default 0 COMMENT '删除标志',
  `FILENAME` varchar(100) NOT NULL COMMENT '文件名',
  `STORENAME` varchar(50) NOT NULL COMMENT '存储名（物理存储）',
  `STOREPATH` varchar(100) NOT NULL COMMENT '存储路径',
  `TABLENAME` varchar(50) DEFAULT NULL COMMENT '使用附件的业务表名',
  `COLNAME` varchar(50) DEFAULT NULL COMMENT '使用附件的业务表的对应字段名',
  `RECORDID` varchar(50) DEFAULT NULL COMMENT '使用附件的业务表的对应记录id',
  `CONTENTTYPE` varchar(200) NOT NULL default 0 COMMENT '附件类型',
  `FILESIZE` bigint DEFAULT NULL COMMENT '附件大小',
  `EXTNAME` varchar(10) DEFAULT NULL COMMENT '扩展名',
  `ISABSOLUTEPATH` int default 1 COMMENT '是否绝对路径（针对storpath）',
  `UPLOADTIME` datetime default CURRENT_TIMESTAMP COMMENT '附件上传时间',
  `UPLOADERID` varchar(50) DEFAULT NULL COMMENT '上传人id',
  `UPLOADERNAME` varchar(50) DEFAULT NULL COMMENT '上传人姓名',
  `MODIFYTIME` datetime DEFAULT NULL COMMENT '修改时间',
  `MODIFYERID` varchar(50) DEFAULT NULL COMMENT '修改人id',
  `MODIFYERNAME` varchar(50) DEFAULT NULL COMMENT '修改人姓名',
  `MAINTYPE` varchar(30) DEFAULT NULL COMMENT '（字典项）附件主类型  比如 正文、普通附件、要件材料      ',
  `SUBTYPE` varchar(30) DEFAULT NULL COMMENT '（字典项）附件子类型 比如 要件材料下的身份证，营业执照等 ',
  `ISCERTIFICATEION` int DEFAULT NULL COMMENT '是否认证（0：未认证，1：已认证）',
  `THE_FILE` longblob COMMENT '附件内容（二进制）',
  `FTPFILENAME` varchar(50) DEFAULT NULL COMMENT 'ftp文件名',
  `FTPFILEPATH` varchar(255) COMMENT 'ftp文件目录',
  `REMARK` varchar(100) DEFAULT NULL COMMENT '附件备注',
  PRIMARY KEY (`ID`),
  KEY `IX_SYS_ATTACHFILE` (`TABLENAME`,`RECORDID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='附件表';

-- ----------------------------
-- Records of sys_attachfile
-- ----------------------------

-- ----------------------------
-- Table structure for sys_authority
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_authority`;
CREATE TABLE `sys_authority` (
  `ID` bigint NOT NULL COMMENT '主键',
  `AUTHORITYLEVEL` varchar(20) NOT NULL COMMENT '权限级别(USER/ROLES)',
  `OPERATIONRANGE` bigint NOT NULL default 0 COMMENT '操作范围',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识 ',
  `RELATIONID` varchar(50) DEFAULT NULL COMMENT 'user或roles的ID',
  `MENUOPERATIONID` varchar(50) DEFAULT NULL COMMENT '模块操作ID',
  `MENUID` varchar(50) DEFAULT NULL COMMENT '导航菜单ID',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户、角色权限表';

-- ----------------------------
-- Records of sys_authority
-- ----------------------------

-- ----------------------------
-- Table structure for sys_bookmark
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_bookmark`;
CREATE TABLE `sys_bookmark` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `CONSTNAME` varchar(50) NOT NULL COMMENT '书签标识',
  `CHINANAME` varchar(50) NOT NULL COMMENT '书签名称',
  `TABLENAME` varchar(100) DEFAULT NULL COMMENT '书签使用的表名',
  `COLNAME` varchar(50) DEFAULT NULL COMMENT '书签使用字段',
  `DESCRIPTION` varchar(50) DEFAULT NULL COMMENT '书签描述',
  PRIMARY KEY (`ID`),
  KEY `IX_SYS_BOOKMARK_TABLENAME` (`TABLENAME`,`DELSTATUS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='书签表';

-- ----------------------------
-- Records of sys_bookmark
-- ----------------------------

-- ----------------------------
-- Table structure for sys_booktemplate
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_booktemplate`;
CREATE TABLE `sys_booktemplate` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `CHINANAME` varchar(50) NOT NULL COMMENT '模板名称',
  `TABLENAME` varchar(100) DEFAULT NULL COMMENT '模板使用的表名',
  `DESCRIPTION` varchar(50) DEFAULT NULL COMMENT '模板描述',
  `UNITID` varchar(50) DEFAULT NULL COMMENT '所属单位',
  `TAILORFORMID` bigint NOT NULL default 0 COMMENT '电子表单主键',
  `UPLOADFILE` varchar(50) NOT NULL default 0 COMMENT '附件主键',
  `TEMPLATETYPE` varchar(20) default 'word' COMMENT '模板类型',
  `ISCUSTOM` int DEFAULT NULL COMMENT '是否是自定义模板',
  PRIMARY KEY (`ID`),
  KEY `IX_SYS_BOOKTEMPLATE_TABLENAME` (`TABLENAME`,`DELSTATUS`,`UNITID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文书模板表';

-- ----------------------------
-- Records of sys_booktemplate
-- ----------------------------

-- ----------------------------
-- Table structure for sys_category
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_category`;
CREATE TABLE `sys_category` (
  `ID` bigint NOT NULL COMMENT '主键',
  `CHINANAME` varchar(255) NOT NULL COMMENT '字典名称',
  `CONSTNAME` varchar(50) NOT NULL COMMENT '字典常量',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识',
  `EXTCHAR1NAME` varchar(50) DEFAULT NULL COMMENT '扩展字符属性1',
  `EXTCHAR2NAME` varchar(50) DEFAULT NULL COMMENT '扩展字符属性2',
  `EXTCHAR3NAME` varchar(50) DEFAULT NULL COMMENT '扩展字符属性3',
  `EXTCHAR4NAME` varchar(50) DEFAULT NULL COMMENT '扩展字符属性4',
  `EXTINT1CATEGORYID` bigint DEFAULT NULL COMMENT '扩展数字属性1本身所引用的下拉选框ID',
  `EXTINT1NAME` varchar(50) DEFAULT NULL COMMENT '扩展数字属性1',
  `EXTINT2CATEGORYID` bigint DEFAULT NULL COMMENT '扩展数字属性2本身所引用的下拉选框ID',
  `EXTINT2NAME` varchar(50) DEFAULT NULL COMMENT '扩展数字属性2',
  `EXTINT3CATEGORYID` bigint DEFAULT NULL COMMENT '扩展数字属性3本身所引用的下拉选框ID',
  `EXTINT3NAME` varchar(50) DEFAULT NULL COMMENT '扩展数字属性3',
  `REMARK` varchar(255) COMMENT '备注',
  `SORTINDEX` bigint NOT NULL default 50 COMMENT '排序号',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典主表';

-- ----------------------------
-- Records of sys_category
-- ----------------------------
INSERT INTO `sys_category` VALUES ('2', '全局配置项', 'SYS_CONFIG', '0', '配置项值', null, null, null, null, null, null, null, null, null, null, '20');
INSERT INTO `sys_category` VALUES ('9', '流程自定义选人策略', 'WF_CUSTOM_CONFIG', '0', null, null, null, null, null, null, null, null, null, null, null, '105');
INSERT INTO `sys_category` VALUES ('25', '性别', 'USERSEX', '0', null, null, null, null, null, null, null, null, null, null, null, '35');
INSERT INTO `sys_category` VALUES ('43', '人员类别', 'USERTYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '95');
INSERT INTO `sys_category` VALUES ('48', '请假类型', 'LEAVETYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '100');
INSERT INTO `sys_category` VALUES ('51', '政治面貌', 'POLITICALSTATUS', '0', null, null, null, null, null, null, null, null, null, null, null, '40');
INSERT INTO `sys_category` VALUES ('55', '民族', 'NATION', '0', null, null, null, null, null, null, null, null, null, null, null, '45');
INSERT INTO `sys_category` VALUES ('60', '附件主类型', 'MAINTYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '60');
INSERT INTO `sys_category` VALUES ('61', '审核状态', 'STATUSTYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '50');
INSERT INTO `sys_category` VALUES ('62', '材料附件类型', 'CLATTACHTYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '55');
INSERT INTO `sys_category` VALUES ('84', '工作人员类别', 'WORKERTYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '30');
INSERT INTO `sys_category` VALUES ('87', '规则名称', 'RULE_NAME', '0', null, null, null, null, null, null, null, null, null, null, null, '25');
INSERT INTO `sys_category` VALUES ('126', '用户表单字段类型', 'COLTYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '1');
INSERT INTO `sys_category` VALUES ('146', '用户表单日期格式', 'USERDATE_FMTTYPES', '0', null, null, null, null, null, null, null, null, null, null, null, '110');
INSERT INTO `sys_category` VALUES ('195', '部门分组', 'DEPTLEVEL', '0', null, null, null, null, null, null, null, null, null, null, null, '90');
INSERT INTO `sys_category` VALUES ('249', '表所属目录', 'TABLE_CATEGORYID', '0', null, null, null, null, null, null, null, null, null, null, null, '70');
INSERT INTO `sys_category` VALUES ('254', '表类型', 'TABLE_TYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '65');
INSERT INTO `sys_category` VALUES ('273', '日期时间格式', 'MYDATE_FMTTYPES', '0', '中文注释', null, null, null, null, null, null, null, null, null, null, '120');
INSERT INTO `sys_category` VALUES ('274', '数据验证', 'FIELD_VALIDATOR', '0', null, null, null, null, null, null, null, null, null, null, null, '85');
INSERT INTO `sys_category` VALUES ('510', '工作流参与人默认配置', 'PROCESSJOINER', '0', null, null, null, null, null, null, null, null, null, null, '工作流参与人默认配置参与人默认配置(流程发起人/上一步操作人/所在单位分管领导)', '115');
INSERT INTO `sys_category` VALUES ('514', '表单字段使用规则', 'FORMCOL_USERULE', '0', null, null, null, null, null, null, null, null, null, null, null, '125');
INSERT INTO `sys_category` VALUES ('529', '是否', 'YESNO', '0', null, null, null, null, '529', '5', null, null, null, null, null, '10');
INSERT INTO `sys_category` VALUES ('532', '系统单位', 'SYSDEPT', '0', null, null, null, null, '121111111', null, null, null, null, null, null, '5');
INSERT INTO `sys_category` VALUES ('533', '系统人员', 'SYSUSER', '0', null, null, null, null, null, null, null, null, null, null, null, '15');
INSERT INTO `sys_category` VALUES ('877', '流程类型', 'PROCESS_TYPE', '0', null, null, null, null, null, null, null, null, null, null, null, '80');
INSERT INTO `sys_category` VALUES ('879', '参照前岗位', 'REFER_PRV', '0', null, null, null, null, null, null, null, null, null, null, null, '75');

-- ----------------------------
-- Table structure for sys_categoryvalue
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_categoryvalue`;
CREATE TABLE `sys_categoryvalue` (
  `ID` bigint NOT NULL COMMENT '主键',
  `CATEGORYID` bigint NOT NULL COMMENT '字典ID',
  `PARENTID` bigint DEFAULT NULL COMMENT '父节点',
  `REFID` varchar(50) NOT NULL COMMENT '字段值',
  `CHINANAME` varchar(255) NOT NULL COMMENT '字典值名称',
  `EXTCHAR1` varchar(255) COMMENT '扩展字符属性1',
  `EXTCHAR2` varchar(255) COMMENT '扩展字符属性2',
  `EXTCHAR3` varchar(255) DEFAULT NULL COMMENT '扩展字符属性3',
  `EXTCHAR4` varchar(255) DEFAULT NULL COMMENT '扩展字符属性4',
  `EXTINT1` varchar(255) DEFAULT NULL COMMENT '扩展数字属性1',
  `EXTINT2` varchar(255) DEFAULT NULL COMMENT '扩展数字属性2',
  `EXTINT3` varchar(255) DEFAULT NULL COMMENT '扩展数字属性3',
  `REMARK` varchar(255) COMMENT '备注',
  `SORTINDEX` bigint NOT NULL COMMENT '排序号',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识',
  `ISPARENT` varchar(5) NOT NULL default 'false' COMMENT '是否为父节点ture/false',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典子表';

-- ----------------------------
-- Records of sys_categoryvalue
-- ----------------------------
INSERT INTO `sys_categoryvalue` VALUES ('1', '195', null, '2', '第二组', null, null, null, null, null, null, null, null, '20', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('2', '195', null, '3', '第三组', null, null, null, null, null, null, null, null, '30', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('6', '25', null, '2', '未定义', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('10', '9', null, 'extendsSession1', '扩展自定义一', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('14', '510', null, '4', '流程图发起人', null, null, null, null, null, null, null, null, '4', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('26', '25', null, '0', '男', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('27', '25', null, '1', '女', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('44', '43', null, '0', '部门负责领导', null, null, null, null, null, null, null, '类别（0:部门负责领导、1:部门领导、2:办公室主任、3:机要员）', '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('45', '43', null, '1', '部门领导', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('46', '43', null, '2', '办公室主任', null, null, null, null, null, null, null, null, '3', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('47', '43', null, '3', '机要员', null, null, null, null, null, null, null, null, '4', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('49', '48', null, '0', '全程', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('50', '48', null, '1', '部分', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('52', '51', null, '0', '共青团员', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('53', '51', null, '1', '党员', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('54', '51', null, '2', '非党员', null, null, null, null, null, null, null, null, '3', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('56', '55', null, '0', '汉族', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('57', '55', null, '1', '回族', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('58', '55', null, '2', '维吾尔族', null, null, null, null, null, null, null, null, '3', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('59', '55', null, '3', '塔吉克族', null, null, null, null, null, null, null, null, '4', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('60', '55', null, '4', '满族', null, null, null, null, null, null, null, null, '5', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('61', '60', null, 'CLATTACHTYPE', '材料', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('62', '61', null, '0', '未审核', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('63', '60', null, 'OFFICIALDOCUMENT', '正文', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('64', '61', null, '1', '待审核', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('65', '61', null, '2', '审核通过', null, null, null, null, null, null, null, null, '3', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('66', '61', null, '3', '审核不通过', null, null, null, null, null, null, null, null, '4', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('67', '195', null, '4', '第四组', null, null, null, null, null, null, null, null, '40', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('70', '195', null, '5', '第五组', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('71', '195', null, '6', '第六组', null, null, null, null, null, null, null, null, '60', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('72', '195', null, '7', '第七组', null, null, null, null, null, null, null, null, '70', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('73', '195', null, '8', '第八组', null, null, null, null, null, null, null, null, '80', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('74', '195', null, '9', '第九组', null, null, null, null, null, null, null, null, '90', '1', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('75', '195', null, '101', '国企（一）', null, null, null, null, null, null, null, null, '110', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('76', '195', null, '102', '国企（二）', null, null, null, null, null, null, null, null, '120', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('77', '195', null, '103', '国企（三）', null, null, null, null, null, null, null, null, '130', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('78', '195', null, '104', '国企（四）', null, null, null, null, null, null, null, null, '140', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('79', '195', null, '201', '科研院校（一）', null, null, null, null, null, null, null, null, '210', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('80', '195', null, '202', '科研院校（二）', null, null, null, null, null, null, null, null, '220', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('81', '195', null, '203', '科研院校（三）', null, null, null, null, null, null, null, null, '230', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('82', '195', null, '1', '第一组', null, null, null, null, null, null, null, null, '10', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('85', '84', null, '1', '工作人员', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('86', '84', null, '2', '驾驶员', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('106', '105', null, '0', '全程', null, null, null, null, null, null, null, null, '0', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('107', '105', null, '1', '部分', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('127', '126', null, '2', '单行文本框', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('128', '126', null, '3', '多行文本框', null, null, null, null, null, null, null, null, '3', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('129', '126', null, '5', '含小数选择器', null, null, null, null, null, null, null, null, '5', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('130', '126', null, '6', '日期时间选择器', null, null, null, null, null, null, null, null, '6', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('132', '126', null, '7', '富文本编辑器', null, null, null, null, null, null, null, null, '7', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('139', '126', null, '0', '单选下拉框', null, null, null, null, null, null, null, null, '0', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('140', '126', null, '1', '多选下拉框', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('141', '126', null, '4', '整数输入框', null, null, null, null, null, null, null, null, '4', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('147', '146', null, 'YYYY_MM_DD_HH_MM_SS', 'YYYY-MM-DD hh:mm:ss', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('148', '146', null, 'YYYY_MM_DD_HH_MM_SS_CHS', 'YYYY年MM月DD日hh时mm分ss秒', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('149', '146', null, 'HH_MM', 'hh:mm', null, null, null, null, null, null, null, null, '80', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('150', '146', null, 'HH_MM_CHS', 'hh时mm分', null, null, null, null, null, null, null, null, '90', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('151', '146', null, 'MM_DD', 'MM-DD', null, null, null, null, null, null, null, null, '100', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('152', '146', null, 'MM_DD_CHS', 'MM月DD日', null, null, null, null, null, null, null, null, '70', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('153', '146', null, 'MM_DD_HH_MM', 'MM-DD hh:mm', null, null, null, null, null, null, null, null, '60', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('154', '146', null, 'MM_DD_HH_MM_CHS', 'MM月DD日hh时mm分', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('155', '146', null, 'YYYY_MM', 'YYYY-MM', null, null, null, null, null, null, null, null, '40', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('156', '146', null, 'YYYY_MM_CHS', 'YYYY年MM月', null, null, null, null, null, null, null, null, '30', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('157', '146', null, 'YYYY_MM_DD', 'YYYY-MM-DD', null, null, null, null, null, null, null, null, '20', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('158', '146', null, 'YYYY_MM_DD_CHS', 'YYYY年MM月DD日', null, null, null, null, null, null, null, null, '20', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('159', '146', null, 'YYYY_MM_DD_HH_MM_CHS', 'YYYY年MM月DD日hh时mm分', null, null, null, null, null, null, null, null, '6', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('250', '249', null, '0', '系统核心表', null, null, null, null, null, null, null, null, '10', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('251', '249', null, '1', '所有模块公用表', null, null, null, null, null, null, null, null, '20', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('252', '249', null, '2', '业务相关表', null, null, null, null, null, null, null, null, '30', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('253', '249', null, '3', '日常办公相关表', null, null, null, null, null, null, null, null, '40', '1', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('255', '254', null, '0', '核心表', null, null, null, null, null, null, null, null, '10', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('256', '254', null, '2', '表单主表', null, null, null, null, null, null, null, null, '20', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('258', '254', null, '3', '表单工作表', null, null, null, null, null, null, null, null, '40', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('275', '273', null, '0', 'Default', 'YYYY-MM-DD hh:mm:ss', null, null, null, null, null, null, null, '10', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('276', '273', null, '1', 'Default_CHS', 'YYYY年MM月DD日hh时mm分ss秒', null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('277', '273', null, '2', 'HH_MM', 'hh:mm', null, null, null, null, null, null, null, '100', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('278', '274', null, 'chinese', '汉字校验', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('279', '274', null, 'loginname', '账号校验', null, null, null, null, null, null, null, '由数字或26个英文字母或下划线组成的字符串', '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('280', '274', null, 'english', '英文和下划线', null, null, null, null, null, null, null, '英文字母或下划线组成的字符', '3', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('511', '510', null, '1', '流程发起人', null, null, null, null, null, null, null, '流程发起人', '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('512', '510', null, '2', '上一步操作人', null, null, null, null, null, null, null, '上一步操作人', '13', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('513', '510', null, '3', '发起人所在单位分管领导', null, null, null, null, null, null, null, '发起人所在单位分管领导', '30', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('515', '514', null, '0', '不使用', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('516', '514', null, '1', '显示使用', null, null, null, null, null, null, null, null, '100', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('517', '2', null, '附件相关类', '附件相关类', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('520', '254', null, '1', '业务表', null, null, null, null, null, null, null, '业务表', '51', '0', 'true');
INSERT INTO `sys_categoryvalue` VALUES ('530', '529', null, '0', '否', null, null, null, null, null, null, null, null, '1', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('531', '529', null, '1', '是', null, null, null, null, null, null, null, null, '2', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('878', '877', null, '1', '类型测试', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('880', '879', null, '1', '在同一部门', null, null, null, null, null, null, null, null, '50', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('881', '879', null, '2', '在同一单位', null, null, null, null, null, null, null, null, '100', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('882', '879', null, '3', '其上级部门', null, null, null, null, null, null, null, null, '150', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('883', '879', null, '4', '其下级部门', null, null, null, null, null, null, null, null, '200', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('929', '274', '280', 'email', 'Email地址', null, null, null, null, null, null, null, null, '200', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('930', '274', null, 'email', 'Email地址', null, null, null, null, null, null, null, null, '200', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('931', '274', null, 'url', '网址', null, null, null, null, null, null, null, null, '250', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('932', '274', null, 'phone', '固定电话', null, null, null, null, null, null, null, null, '300', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('933', '274', null, 'zipcode', '邮政编码', null, null, null, null, null, null, null, null, '350', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('934', '274', null, 'mobile', '手机号码', null, null, null, null, null, null, null, null, '400', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('935', '274', null, 'qq', 'QQ', null, null, null, null, null, null, null, null, '500', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('936', '274', null, 'safepass', '安全密码', null, null, null, null, null, null, null, null, '550', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('937', '274', null, 'idcard', '身份证号码', null, null, null, null, null, null, null, null, '600', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('938', '274', null, 'number', '数字', null, null, null, null, null, null, null, null, '600', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('939', '274', null, 'intnumber', '整型数字', null, null, null, null, null, null, null, null, '650', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('940', '274', null, 'linkphone', '任意联系电话', null, null, null, null, null, null, null, null, '700', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('941', '274', null, 'ip4', 'IP4地址', null, null, null, null, null, null, null, null, '750', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('942', '274', null, 'filepath', '文件路径', null, null, null, null, null, null, null, null, '800', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('944', '273', null, '4', 'MM_DD', 'MM-DD', null, null, null, null, null, null, null, '200', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('945', '273', null, '5', 'MM_DD_CHS', 'MM月DD日', null, null, null, null, null, null, null, '250', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('948', '273', null, '3', 'HH_MM_CHS', 'hh时mm分', null, null, null, null, null, null, null, '150', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('950', '273', null, '6', 'MM_DD_HH_MM', 'MM-DD hh:mm', null, null, null, null, null, null, null, '300', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('951', '273', null, '7', 'MM_DD_HH_MM_CHS', 'MM月DD日hh时mm分', null, null, null, null, null, null, null, '350', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('952', '273', null, '8', 'YYYY_MM', 'YYYY-MM', null, null, null, null, null, null, null, '400', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('953', '273', null, '9', 'YYYY_MM_CHS', 'YYYY年MM月', null, null, null, null, null, null, null, '450', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('954', '273', null, '10', 'YYYY_MM_DD', 'YYYY-MM-DD', null, null, null, null, null, null, null, '500', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('955', '273', null, '11', 'YYYY_MM_DD_CHS', 'YYYY年MM月DD日', null, null, null, null, null, null, null, '550', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('956', '273', null, '12', 'YYYY_MM_DD_HH_MM', 'YYYY-MM-DD hh:mm', null, null, null, null, null, null, null, '600', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('957', '273', null, '13', 'YYYY_MM_DD_HH_MM_CHS', 'YYYY年MM月DD日hh时mm分', null, null, null, null, null, null, null, '650', '0', 'false');
INSERT INTO `sys_categoryvalue` VALUES ('1257', '879', null, '5', '其上级部门（指定层级）', null, null, null, null, null, null, null, null, '250', '0', 'false');

-- ----------------------------
-- Table structure for sys_colsremark
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_colsremark`;
CREATE TABLE `sys_colsremark` (
  `ALIAS` varchar(200) DEFAULT NULL COMMENT '别名',
  `AUTONO` int DEFAULT NULL COMMENT '自动编号规则',
  `CATEGORYID` bigint DEFAULT NULL COMMENT '绑定字典',
  `COLNAME` varchar(50) NOT NULL COMMENT '字段名',
  `COLTYPE` varchar(50) DEFAULT NULL COMMENT '字段类型(用于与使用控件相关)',
  `COLTYPEALIAS` varchar(50) DEFAULT NULL COMMENT '字段类型描述',
  `FMTTYPETIME` int NOT NULL DEFAULT 0  COMMENT '时间格式',
  `ID` varchar(125) NOT NULL COMMENT '主键',
  `MULTILINES` int NOT NULL DEFAULT 0 COMMENT '多行',
  `MULTISELECTED` int NOT NULL DEFAULT 0  COMMENT '多选框',
  `REQUIRED` int NOT NULL DEFAULT 0  COMMENT '必填项',
  `RIGOR` int DEFAULT NULL COMMENT '精度',
  `TABLENAME` varchar(50) NOT NULL COMMENT '表名',
  `VALIDDATA` varchar(100) DEFAULT NULL COMMENT '数据校验格式',
  `DATALENGTH` bigint DEFAULT NULL COMMENT '内容长度',
  `SOURCECOLTYPE` varchar(50) DEFAULT NULL COMMENT '物理表中的字段类型',
  `DEFAULTVALUE` varchar(50) DEFAULT NULL COMMENT '默认值',
  `NULLABLE` char(1) DEFAULT NULL COMMENT '是否允许空',
  `CATEGORYCONSTNAME` varchar(50) DEFAULT NULL COMMENT '绑定字典项标识',
  `ISCLIENTUSE` int NOT NULL DEFAULT 0 COMMENT '是否客户使用（普通用户绘制表单使用）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='物理表字段信息表';

-- ----------------------------
-- Records of sys_colsremark
-- ----------------------------
INSERT INTO `sys_colsremark` VALUES ('时间', '1', null, 'eventdate', 'datetime', '日期时间', '0', 'log_a eventdate', '0', '0', '0', null, 'log_a', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('异常信息', '5', null, 'exception', 'varchar', '单行文本【250】', '0', 'log_a exception', '0', '0', '0', null, 'log_a', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('ip地址', '6', null, 'host_address', 'varchar', '单行文本【100】', '0', 'log_a host_address', '0', '0', '0', null, 'log_a', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('记录者', '3', null, 'logger', 'varchar', '单行文本【25】', '0', 'log_a logger', '0', '0', '0', null, 'log_a', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('日志级别', '2', null, 'log_level', 'varchar', '单行文本【50】', '0', 'log_a log_level', '0', '0', '0', null, 'log_a', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('内容', '4', null, 'message', 'varchar', '单行文本【250】', '0', 'log_a message', '0', '0', '0', null, 'log_a', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('请求的序列号', '8', null, 'request_serialno', 'int', '整型数字', '0', 'log_a request_serialno', '0', '0', '0', '0', 'log_a', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('请求的url', '7', null, 'request_url', 'varchar', '单行文本【500】', '0', 'log_a request_url', '0', '0', '0', null, 'log_a', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('添加人', null, '533', 'adder', 'varchar', '下拉选项【单选】', '0', 'notice adder', '0', '0', '0', null, 'notice', null, '25', 'VARCHAR2', null, 'N', 'SYSUSER', '0');
INSERT INTO `sys_colsremark` VALUES ('添加人所在部门id', null, '532', 'adder_deptid', 'varchar', '下拉选项【单选】', '0', 'notice adder_deptid', '0', '0', '0', null, 'notice', null, '25', 'VARCHAR2', null, 'N', 'SYSDEPT', '0');
INSERT INTO `sys_colsremark` VALUES ('登记时间', null, null, 'add_time', 'datetime', '日期时间', '0', 'notice add_time', '0', '0', '0', null, 'notice', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('内容', null, null, 'content', 'varchar', '单行文本【1】', '0', 'notice content', '0', '0', '0', null, 'notice', null, '1', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标志', null, null, 'delstatus', 'int', '整型数字', '0', 'notice delstatus', '0', '0', '0', '0', 'notice', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', null, null, 'id', 'varchar', '单行文本【25】', '0', 'notice id', '0', '0', '0', null, 'notice', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否公开', null, '529', 'is_public', 'int', '下拉选项【单选】', '0', 'notice is_public', '0', '0', '0', '0', 'notice', null, null, 'NUMBER', '0 ', 'N', 'YESNO', '0');
INSERT INTO `sys_colsremark` VALUES ('接收人', null, null, 'receiver_ids', 'varchar', '单行文本【500】', '0', 'notice receiver_ids', '0', '0', '0', null, 'notice', null, '500', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('接收人姓名', null, null, 'receiver_names', 'varchar', '单行文本【1000】', '0', 'notice receiver_names', '0', '0', '0', null, 'notice', null, '1000', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('标题', null, null, 'title', 'varchar', '单行文本【1000】', '0', 'notice title', '0', '0', '0', null, 'notice', null, '1000', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('年龄', '3', null, 'age', 'int', '整型数字', '0', 'noticesub age', '0', '0', '0', '0', 'noticesub', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('出生', '4', null, 'birth', 'datetime', '日期时间', '0', 'noticesub birth', '0', '0', '0', null, 'noticesub', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标志', '5', null, 'delstatus', 'int', '整型数字', '0', 'noticesub delstatus', '0', '0', '0', '0', 'noticesub', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'noticesub id', '0', '0', '0', null, 'noticesub', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('姓名', '2', null, 'name', 'varchar', '单行文本【15】', '0', 'noticesub name', '0', '0', '0', null, 'noticesub', null, '15', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('notice.id', '6', null, 'noticeid', 'varchar', '单行文本【25】', '0', 'noticesub noticeid', '0', '0', '0', null, 'noticesub', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标志', '3', null, 'delstatus', 'int', '整型数字', '0', 'officediction delstatus', '0', '0', '0', '0', 'officediction', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('办公用语', '2', null, 'diction', 'varchar', '单行文本【100】', '0', 'officediction diction', '0', '0', '0', null, 'officediction', null, '100', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键1', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'officediction id', '0', '0', '0', null, 'officediction', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户id', '4', null, 'userid', 'varchar', '单行文本【25】', '0', 'officediction userid', '0', '0', '0', null, 'officediction', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('解挂时间', '10', null, 'active_time', 'datetime', '日期时间', '0', 'suspend_info active_time', '0', '0', '0', null, 'suspend_info', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('解挂人id', '9', null, 'active_user_id', 'varchar', '单行文本【25】', '0', 'suspend_info active_user_id', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发挂起状态的活动实例id', '6', null, 'current_insactivityid', 'varchar', '单行文本【25】', '0', 'suspend_info current_insactivityid', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发挂起状态的流程实例id', '8', null, 'current_insprocessid', 'varchar', '单行文本【25】', '0', 'suspend_info current_insprocessid', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('被挂起的流程图实例id', '5', null, 'current_locatedinsprocessid', 'varchar', '单行文本【25】', '0', 'suspend_info current_locatedinsprocessid', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'suspend_info id', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('挂起持续时间', '11', null, 'suspend_duration', 'int', '整型数字', '0', 'suspend_info suspend_duration', '0', '0', '0', null, 'suspend_info', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('挂起事由，不超过20个字', '7', null, 'suspend_reason', 'varchar', '单行文本【15】', '0', 'suspend_info suspend_reason', '0', '0', '0', null, 'suspend_info', null, '15', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('挂起时间', '4', null, 'suspend_time', 'datetime', '日期时间', '0', 'suspend_info suspend_time', '0', '0', '0', null, 'suspend_info', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('挂起人id', '2', null, 'suspend_userid', 'varchar', '单行文本【25】', '0', 'suspend_info suspend_userid', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('挂起人姓名', '3', null, 'suspend_username', 'varchar', '单行文本【25】', '0', 'suspend_info suspend_username', '0', '0', '0', null, 'suspend_info', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用附件的业务表的对应字段名', '7', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_attachfile colname', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('附件类型', '9', null, 'contenttype', 'varchar', '单行文本【100】', '0', 'sys_attachfile contenttype', '0', '0', '0', null, 'sys_attachfile', null, '100', 'VARCHAR2', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标志', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_attachfile delstatus', '0', '0', '0', '0', 'sys_attachfile', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展名', '11', null, 'extname', 'varchar', '单行文本【5】', '0', 'sys_attachfile extname', '0', '0', '0', null, 'sys_attachfile', null, '5', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('文件名', '3', null, 'filename', 'varchar', '单行文本【50】', '0', 'sys_attachfile filename', '0', '0', '0', null, 'sys_attachfile', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('附件大小', '10', null, 'filesize', 'int', '整型数字', '0', 'sys_attachfile filesize', '0', '0', '0', '0', 'sys_attachfile', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('ftp文件名', '23', null, 'ftpfilename', 'varchar', '单行文本【25】', '0', 'sys_attachfile ftpfilename', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('ftp文件目录', '24', null, 'ftpfilepath', 'varchar', '单行文本【250】', '0', 'sys_attachfile ftpfilepath', '0', '0', '0', null, 'sys_attachfile', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_attachfile id', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否绝对路径（针对storpath）', '12', null, 'isabsolutepath', 'int', '整型数字', '0', 'sys_attachfile isabsolutepath', '0', '0', '0', '0', 'sys_attachfile', null, null, 'NUMBER', '1', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否认证（0：未认证，1：已认证）', '21', null, 'iscertificateion', 'int', '整型数字', '0', 'sys_attachfile iscertificateion', '0', '0', '0', '0', 'sys_attachfile', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('（字典项）附件主类型  比如 正文、普通附件、要件材料      ', '19', null, 'maintype', 'varchar', '单行文本【15】', '0', 'sys_attachfile maintype', '0', '0', '0', null, 'sys_attachfile', null, '15', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('修改人id', '17', null, 'modifyerid', 'varchar', '单行文本【25】', '0', 'sys_attachfile modifyerid', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('修改人姓名', '18', null, 'modifyername', 'varchar', '单行文本【25】', '0', 'sys_attachfile modifyername', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('修改时间', '16', null, 'modifytime', 'datetime', '日期时间', '0', 'sys_attachfile modifytime', '0', '0', '0', null, 'sys_attachfile', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用附件的业务表的对应记录id', '8', null, 'recordid', 'varchar', '单行文本【25】', '0', 'sys_attachfile recordid', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('附件备注', '25', null, 'remark', 'varchar', '单行文本【50】', '0', 'sys_attachfile remark', '0', '0', '0', null, 'sys_attachfile', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('存储名（物理存储）', '4', null, 'storename', 'varchar', '单行文本【25】', '0', 'sys_attachfile storename', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('存储路径', '5', null, 'storepath', 'varchar', '单行文本【50】', '0', 'sys_attachfile storepath', '0', '0', '0', null, 'sys_attachfile', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('（字典项）附件子类型 比如 要件材料下的身份证，营业执照等 ', '20', null, 'subtype', 'varchar', '单行文本【15】', '0', 'sys_attachfile subtype', '0', '0', '0', null, 'sys_attachfile', null, '15', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用附件的业务表名', '6', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_attachfile tablename', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('附件内容（二进制）', '22', null, 'the_file', 'binary', '超大容量二进制数据', '0', 'sys_attachfile the_file', '0', '0', '0', null, 'sys_attachfile', null, null, 'BLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('上传人id', '14', null, 'uploaderid', 'varchar', '单行文本【25】', '0', 'sys_attachfile uploaderid', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('上传人姓名', '15', null, 'uploadername', 'varchar', '单行文本【25】', '0', 'sys_attachfile uploadername', '0', '0', '0', null, 'sys_attachfile', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('附件上传时间', '13', null, 'uploadtime', 'datetime', '日期时间', '0', 'sys_attachfile uploadtime', '0', '0', '0', null, 'sys_attachfile', null, null, 'DATE', 'sysdate', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限级别(USER/ROLES)', '2', null, 'authoritylevel', 'varchar', '单行文本【10】', '0', 'sys_authority authoritylevel', '0', '0', '0', null, 'sys_authority', null, '10', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识 ', '4', null, 'delstatus', 'int', '整型数字', '0', 'sys_authority delstatus', '0', '0', '0', '0', 'sys_authority', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_authority id', '0', '0', '0', '0', 'sys_authority', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('导航菜单ID', '7', null, 'menuid', 'varchar', '单行文本【25】', '0', 'sys_authority menuid', '0', '0', '0', null, 'sys_authority', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('模块操作ID', '6', null, 'menuoperationid', 'varchar', '单行文本【25】', '0', 'sys_authority menuoperationid', '0', '0', '0', null, 'sys_authority', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作范围', '3', null, 'operationrange', 'int', '整型数字', '0', 'sys_authority operationrange', '0', '0', '0', '0', 'sys_authority', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('user或roles的ID', '5', null, 'relationid', 'varchar', '单行文本【25】', '0', 'sys_authority relationid', '0', '0', '0', null, 'sys_authority', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_bookmark chinaname', '0', '0', '0', null, 'sys_bookmark', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签使用字段', '6', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_bookmark colname', '0', '0', '0', null, 'sys_bookmark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签标识', '3', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_bookmark constname', '0', '0', '0', null, 'sys_bookmark', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_bookmark delstatus', '0', '0', '0', '0', 'sys_bookmark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签描述', '7', null, 'description', 'varchar', '单行文本【25】', '0', 'sys_bookmark description', '0', '0', '0', null, 'sys_bookmark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_bookmark id', '0', '0', '0', '0', 'sys_bookmark', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签使用的表名', '5', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_bookmark tablename', '0', '0', '0', null, 'sys_bookmark', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('模板名称', '3', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_booktemplate chinaname', '0', '0', '0', null, 'sys_booktemplate', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_booktemplate delstatus', '0', '0', '0', '0', 'sys_booktemplate', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('模板描述', '5', null, 'description', 'varchar', '单行文本【25】', '0', 'sys_booktemplate description', '0', '0', '0', null, 'sys_booktemplate', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_booktemplate id', '0', '0', '0', '0', 'sys_booktemplate', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否是自定义模板', '10', null, 'iscustom', 'int', '整型数字', '0', 'sys_booktemplate iscustom', '0', '0', '0', '0', 'sys_booktemplate', null, null, 'NUMBER', '0 ', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('模板使用的表名', '4', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_booktemplate tablename', '0', '0', '0', null, 'sys_booktemplate', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('电子表单主键', '7', null, 'tailorformid', 'int', '整型数字', '0', 'sys_booktemplate tailorformid', '0', '0', '0', '0', 'sys_booktemplate', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('模板类型', '9', null, 'templatetype', 'varchar', '单行文本【10】', '0', 'sys_booktemplate templatetype', '0', '0', '0', null, 'sys_booktemplate', null, '10', 'VARCHAR2', 'word', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位', '6', null, 'unitid', 'varchar', '单行文本【25】', '0', 'sys_booktemplate unitid', '0', '0', '0', null, 'sys_booktemplate', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('附件主键', '8', null, 'uploadfile', 'varchar', '单行文本【25】', '0', 'sys_booktemplate uploadfile', '0', '0', '0', null, 'sys_booktemplate', null, '25', 'VARCHAR2', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字典名称', '2', null, 'chinaname', 'varchar', '单行文本【127】', '0', 'sys_category chinaname', '0', '0', '0', null, 'sys_category', null, '127', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字典常量', '3', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_category constname', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '4', null, 'delstatus', 'int', '整型数字', '0', 'sys_category delstatus', '0', '0', '0', '0', 'sys_category', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性1', '5', null, 'extchar1name', 'varchar', '单行文本【25】', '0', 'sys_category extchar1name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性2', '6', null, 'extchar2name', 'varchar', '单行文本【25】', '0', 'sys_category extchar2name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性3', '7', null, 'extchar3name', 'varchar', '单行文本【25】', '0', 'sys_category extchar3name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性4', '8', null, 'extchar4name', 'varchar', '单行文本【25】', '0', 'sys_category extchar4name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性1本身所引用的下拉选框ID', '9', null, 'extint1categoryid', 'int', '整型数字', '0', 'sys_category extint1categoryid', '0', '0', '0', '0', 'sys_category', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性1', '10', null, 'extint1name', 'varchar', '单行文本【25】', '0', 'sys_category extint1name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性2本身所引用的下拉选框ID', '11', null, 'extint2categoryid', 'int', '整型数字', '0', 'sys_category extint2categoryid', '0', '0', '0', '0', 'sys_category', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性2', '12', null, 'extint2name', 'varchar', '单行文本【25】', '0', 'sys_category extint2name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性3本身所引用的下拉选框ID', '13', null, 'extint3categoryid', 'int', '整型数字', '0', 'sys_category extint3categoryid', '0', '0', '0', '0', 'sys_category', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性3', '14', null, 'extint3name', 'varchar', '单行文本【25】', '0', 'sys_category extint3name', '0', '0', '0', null, 'sys_category', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_category id', '0', '0', '0', '0', 'sys_category', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('备注', '15', null, 'remark', 'varchar', '单行文本【500】', '0', 'sys_category remark', '0', '0', '0', null, 'sys_category', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '16', null, 'sortindex', 'int', '整型数字', '0', 'sys_category sortindex', '0', '0', '0', '0', 'sys_category', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字典ID', '2', null, 'categoryid', 'int', '整型数字', '0', 'sys_categoryvalue categoryid', '0', '0', '0', '0', 'sys_categoryvalue', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字典值名称', '5', null, 'chinaname', 'varchar', '单行文本【127】', '0', 'sys_categoryvalue chinaname', '0', '0', '0', null, 'sys_categoryvalue', null, '127', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '15', null, 'delstatus', 'int', '整型数字', '0', 'sys_categoryvalue delstatus', '0', '0', '0', '0', 'sys_categoryvalue', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性1', '6', null, 'extchar1', 'varchar', '单行文本【200】', '0', 'sys_categoryvalue extchar1', '0', '0', '0', null, 'sys_categoryvalue', null, '200', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性2', '7', null, 'extchar2', 'varchar', '单行文本【200】', '0', 'sys_categoryvalue extchar2', '0', '0', '0', null, 'sys_categoryvalue', null, '200', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性3', '8', null, 'extchar3', 'varchar', '单行文本【127】', '0', 'sys_categoryvalue extchar3', '0', '0', '0', null, 'sys_categoryvalue', null, '127', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展字符属性4', '9', null, 'extchar4', 'varchar', '单行文本【127】', '0', 'sys_categoryvalue extchar4', '0', '0', '0', null, 'sys_categoryvalue', null, '127', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性1', '10', null, 'extint1', 'varchar', '单行文本【127】', '0', 'sys_categoryvalue extint1', '0', '0', '0', null, 'sys_categoryvalue', null, '127', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性2', '11', null, 'extint2', 'varchar', '单行文本【127】', '0', 'sys_categoryvalue extint2', '0', '0', '0', null, 'sys_categoryvalue', null, '127', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扩展数字属性3', '12', null, 'extint3', 'varchar', '单行文本【127】', '0', 'sys_categoryvalue extint3', '0', '0', '0', null, 'sys_categoryvalue', null, '127', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_categoryvalue id', '0', '0', '0', '0', 'sys_categoryvalue', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否为父节点ture/false', '16', null, 'isparent', 'varchar', '单行文本【2】', '0', 'sys_categoryvalue isparent', '0', '0', '0', null, 'sys_categoryvalue', null, '2', 'VARCHAR2', 'false ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('父节点', '3', null, 'parentid', 'int', '整型数字', '0', 'sys_categoryvalue parentid', '0', '0', '0', '0', 'sys_categoryvalue', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字段值', '4', null, 'refid', 'varchar', '单行文本【25】', '0', 'sys_categoryvalue refid', '0', '0', '0', null, 'sys_categoryvalue', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('备注', '13', null, 'remark', 'varchar', '单行文本【1000】', '0', 'sys_categoryvalue remark', '0', '0', '0', null, 'sys_categoryvalue', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '14', null, 'sortindex', 'int', '整型数字', '0', 'sys_categoryvalue sortindex', '0', '0', '0', '0', 'sys_categoryvalue', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('别名', '1', null, 'alias', 'varchar', '单行文本【100】', '0', 'sys_colsremark alias', '0', '0', '0', null, 'sys_colsremark', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('自动编号规则', '2', null, 'autono', 'int', '整型数字', '0', 'sys_colsremark autono', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('绑定字典项标识', '19', null, 'categoryconstname', 'varchar', '单行文本【25】', '0', 'sys_colsremark categoryconstname', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('绑定字典', '3', null, 'categoryid', 'int', '整型数字', '0', 'sys_colsremark categoryid', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字段名', '4', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_colsremark colname', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字段类型(用于与使用控件相关)', '5', null, 'coltype', 'varchar', '单行文本【25】', '0', 'sys_colsremark coltype', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字段类型描述', '6', null, 'coltypealias', 'varchar', '单行文本【25】', '0', 'sys_colsremark coltypealias', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('内容长度', '15', null, 'datalength', 'int', '整型数字', '0', 'sys_colsremark datalength', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('默认值', '17', null, 'defaultvalue', 'varchar', '单行文本【25】', '0', 'sys_colsremark defaultvalue', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('时间格式', '7', null, 'fmttypetime', 'int', '整型数字', '0', 'sys_colsremark fmttypetime', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '8', null, 'id', 'varchar', '单行文本【62】', '0', 'sys_colsremark id', '0', '0', '0', null, 'sys_colsremark', null, '62', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否客户使用（普通用户绘制表单使用）', '20', null, 'isclientuse', 'int', '整型数字', '0', 'sys_colsremark isclientuse', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('多行', '9', null, 'multilines', 'int', '整型数字', '0', 'sys_colsremark multilines', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('多选框', '10', null, 'multiselected', 'int', '整型数字', '0', 'sys_colsremark multiselected', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许空', '18', null, 'nullable', 'varchar', '单行文本【1】', '0', 'sys_colsremark nullable', '0', '0', '0', null, 'sys_colsremark', null, '1', 'CHAR', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('必填项', '11', null, 'required', 'int', '整型数字', '0', 'sys_colsremark required', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('精度', '12', null, 'rigor', 'int', '整型数字', '0', 'sys_colsremark rigor', '0', '0', '0', '0', 'sys_colsremark', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表中的字段类型', '16', null, 'sourcecoltype', 'varchar', '单行文本【25】', '0', 'sys_colsremark sourcecoltype', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表名', '13', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_colsremark tablename', '0', '0', '0', null, 'sys_colsremark', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('数据校验格式', '14', null, 'validdata', 'varchar', '单行文本【50】', '0', 'sys_colsremark validdata', '0', '0', '0', null, 'sys_colsremark', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('配置人id', '10', null, 'configerid', 'varchar', '单行文本【25】', '0', 'sys_consign configerid', '0', '0', '0', null, 'sys_consign', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('配置人姓名', '7', null, 'configername', 'varchar', '单行文本【25】', '0', 'sys_consign configername', '0', '0', '0', null, 'sys_consign', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托结束时间', '6', null, 'consignendtime', 'datetime', '日期时间', '0', 'sys_consign consignendtime', '0', '0', '0', null, 'sys_consign', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托人id', '8', null, 'consignerid', 'varchar', '单行文本【25】', '0', 'sys_consign consignerid', '0', '0', '0', null, 'sys_consign', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托人姓名', '3', null, 'consignername', 'varchar', '单行文本【25】', '0', 'sys_consign consignername', '0', '0', '0', null, 'sys_consign', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托开始时间', '5', null, 'consignstarttime', 'datetime', '日期时间', '0', 'sys_consign consignstarttime', '0', '0', '0', null, 'sys_consign', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托状态（0：启用；1：禁用）', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_consign delstatus', '0', '0', '0', '0', 'sys_consign', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_consign id', '0', '0', '0', '0', 'sys_consign', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('代理人id', '9', null, 'proxyerid', 'varchar', '单行文本【25】', '0', 'sys_consign proxyerid', '0', '0', '0', null, 'sys_consign', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('代理人姓名', '4', null, 'proxyername', 'varchar', '单行文本【25】', '0', 'sys_consign proxyername', '0', '0', '0', null, 'sys_consign', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('参与人员姓名', '14', null, 'actornames', 'varchar', '单行文本【500】', '0', 'sys_custom_activity actornames', '0', '0', '0', null, 'sys_custom_activity', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('参与人员id', '13', null, 'actors', 'varchar', '单行文本【100】', '0', 'sys_custom_activity actors', '0', '0', '0', null, 'sys_custom_activity', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_custom_activity chinaname', '0', '0', '0', null, 'sys_custom_activity', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_custom_activity delstatus', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('高度', '8', null, 'height', 'int', '整型数字', '0', 'sys_custom_activity height', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_custom_activity id', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发起的流程节点的主键', '15', null, 'insactivityid', 'int', '整型数字', '0', 'sys_custom_activity insactivityid', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '3', null, 'insprocessid', 'int', '整型数字', '0', 'sys_custom_activity insprocessid', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许回退', '11', null, 'isallowback', 'int', '整型数字', '0', 'sys_custom_activity isallowback', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('当前节点是否已经走过(走过则不可编辑)', '16', null, 'ishasfinished', 'int', '整型数字', '0', 'sys_custom_activity ishasfinished', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('期限单位', '10', null, 'limitunit', 'int', '整型数字', '0', 'sys_custom_activity limitunit', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('横坐标', '5', null, 'positionx', 'int', '整型数字', '0', 'sys_custom_activity positionx', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('竖坐标', '6', null, 'positiony', 'int', '整型数字', '0', 'sys_custom_activity positiony', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程类型', '17', null, 'processtype', 'varchar', '单行文本【10】', '0', 'sys_custom_activity processtype', '0', '0', '0', null, 'sys_custom_activity', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('办理期限', '9', null, 'timelimit', 'int', '整型数字', '0', 'sys_custom_activity timelimit', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动类型', '12', null, 'type', 'varchar', '单行文本【25】', '0', 'sys_custom_activity type', '0', '0', '0', null, 'sys_custom_activity', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('宽度', '7', null, 'width', 'int', '整型数字', '0', 'sys_custom_activity width', '0', '0', '0', '0', 'sys_custom_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('允许编辑的表单字段', '5', null, 'alloweditformcols', 'varchar', '单行文本【1000】', '0', 'sys_custom_activityform alloweditformcols', '0', '0', '0', null, 'sys_custom_activityform', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('自定义活动主键', '3', null, 'customactivityid', 'int', '整型数字', '0', 'sys_custom_activityform customactivityid', '0', '0', '0', '0', 'sys_custom_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_custom_activityform delstatus', '0', '0', '0', '0', 'sys_custom_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_custom_activityform id', '0', '0', '0', '0', 'sys_custom_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '6', null, 'insprocessid', 'int', '整型数字', '0', 'sys_custom_activityform insprocessid', '0', '0', '0', '0', 'sys_custom_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('必填表单字段', '10', null, 'requiredcols', 'varchar', '单行文本【1000】', '0', 'sys_custom_activityform requiredcols', '0', '0', '0', null, 'sys_custom_activityform', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单对应的物理表名', '9', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_custom_activityform tablename', '0', '0', '0', null, 'sys_custom_activityform', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '4', null, 'tailorformid', 'int', '整型数字', '0', 'sys_custom_activityform tailorformid', '0', '0', '0', '0', 'sys_custom_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单名称', '7', null, 'tailorformname', 'varchar', '单行文本【50】', '0', 'sys_custom_activityform tailorformname', '0', '0', '0', null, 'sys_custom_activityform', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单类型(0:普通表单；1:文书；2:展示表单)', '8', null, 'tailorformtype', 'int', '整型数字', '0', 'sys_custom_activityform tailorformtype', '0', '0', '0', '0', 'sys_custom_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_custom_transition chinaname', '0', '0', '0', null, 'sys_custom_transition', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_custom_transition delstatus', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线的调整位置参数', '7', null, 'dots', 'varchar', '单行文本【100】', '0', 'sys_custom_transition dots', '0', '0', '0', null, 'sys_custom_transition', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('结束活动定义主键', '6', null, 'endcustomactivityid', 'int', '整型数字', '0', 'sys_custom_transition endcustomactivityid', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_custom_transition id', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发起的流程节点的主键', '10', null, 'insactivityid', 'int', '整型数字', '0', 'sys_custom_transition insactivityid', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '3', null, 'insprocessid', 'int', '整型数字', '0', 'sys_custom_transition insprocessid', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('起始活动定义主键', '5', null, 'startcustomactivityid', 'int', '整型数字', '0', 'sys_custom_transition startcustomactivityid', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线显示内容的x轴位置', '8', null, 'textposx', 'int', '整型数字', '0', 'sys_custom_transition textposx', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线显示内容的y轴位置', '9', null, 'textposy', 'int', '整型数字', '0', 'sys_custom_transition textposy', '0', '0', '0', '0', 'sys_custom_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限字段', '5', null, 'column_name', 'varchar', '单行文本【30】', '0', 'sys_datas_privilege column_name', '0', '0', '0', null, 'sys_datas_privilege', null, '30', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限常量标识,。也可以存权限源ur', '3', null, 'const_name_or_url', 'varchar', '单行文本【50】', '0', 'sys_datas_privilege const_name_or_url', '0', '0', '0', null, 'sys_datas_privilege', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属权限组的id', '4', null, 'group_id', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege group_id', '0', '0', '0', null, 'sys_datas_privilege', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege id', '0', '0', '0', null, 'sys_datas_privilege', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限简称', '2', null, 'simple_name', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege simple_name', '0', '0', '0', null, 'sys_datas_privilege', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限条件sql 比如 ispublic>=1 and ispublic<=5 ', '6', null, 'sql_condition', 'varchar', '单行文本【500】', '0', 'sys_datas_privilege sql_condition', '0', '0', '0', null, 'sys_datas_privilege', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识0：启用 1：禁用', '7', null, 'delstatus', 'int', '整型数字', '0', 'sys_datas_privilegegroup delstatus', '0', '0', '0', '0', 'sys_datas_privilegegroup', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限组描述', '5', null, 'descriptions', 'varchar', '单行文本【250】', '0', 'sys_datas_privilegegroup descriptions', '0', '0', '0', null, 'sys_datas_privilegegroup', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_datas_privilegegroup id', '0', '0', '0', null, 'sys_datas_privilegegroup', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('0：表示默认授权  1：表示基于语境的授权             （程序将根据此标识展示权限树  0：根据设定的url展示权限 1：展示配置的语境权限）', '4', null, 'iscontext', 'int', '整型数字', '0', 'sys_datas_privilegegroup iscontext', '0', '0', '0', '0', 'sys_datas_privilegegroup', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('默认权限组,只能有一个', '8', null, 'isdefault', 'int', '整型数字', '0', 'sys_datas_privilegegroup isdefault', '0', '0', '0', '0', 'sys_datas_privilegegroup', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限字段', '6', null, 'privilegecolumnname', 'varchar', '单行文本【25】', '0', 'sys_datas_privilegegroup privilegecolumnname', '0', '0', '0', null, 'sys_datas_privilegegroup', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('简称', '2', null, 'simple_name', 'varchar', '单行文本【25】', '0', 'sys_datas_privilegegroup simple_name', '0', '0', '0', null, 'sys_datas_privilegegroup', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('sql处理器常量标识', '3', null, 'sqlhander_constname', 'varchar', '单行文本【25】', '0', 'sys_datas_privilegegroup sqlhander_constname', '0', '0', '0', null, 'sys_datas_privilegegroup', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识 0：启用 1：禁用', '7', null, 'delstatus', 'int', '整型数字', '0', 'sys_datas_privilege_grant delstatus', '0', '0', '0', '0', 'sys_datas_privilege_grant', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('被授权对象的id 可能是角色id、部门id等', '5', null, 'grant_objectid', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege_grant grant_objectid', '0', '0', '0', null, 'sys_datas_privilege_grant', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限组id', '6', null, 'groupid', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege_grant groupid', '0', '0', '0', null, 'sys_datas_privilege_grant', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege_grant id', '0', '0', '0', null, 'sys_datas_privilege_grant', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('对于范围设定表示权限常量标识，对于精确设定表示权限值', '4', null, 'privilegeflags', 'varchar', '单行文本【2000】', '0', 'sys_datas_privilege_grant privilegeflags', '0', '0', '0', null, 'sys_datas_privilege_grant', null, '2000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('资源id', '2', null, 'resourceid', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege_grant resourceid', '0', '0', '0', null, 'sys_datas_privilege_grant', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('权限组sql处理器标识', '3', null, 'sqlhander_constname', 'varchar', '单行文本【25】', '0', 'sys_datas_privilege_grant sqlhander_constname', '0', '0', '0', null, 'sys_datas_privilege_grant', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('新流程的流程定义主键', '23', null, 'anotherprocessdefineid', 'int', '整型数字', '0', 'sys_def_activity anotherprocessdefineid', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('在配置界面新流程文本框中的显示名称', '25', null, 'anotherprocessname', 'varchar', '单行文本【25】', '0', 'sys_def_activity anotherprocessname', '0', '0', '0', null, 'sys_def_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_def_activity chinaname', '0', '0', '0', null, 'sys_def_activity', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动标识，在整个流程轨迹中唯一', '34', null, 'constname', 'varchar', '单行文本【10】', '0', 'sys_def_activity constname', '0', '0', '0', null, 'sys_def_activity', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_activity delstatus', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('高度', '8', null, 'height', 'int', '整型数字', '0', 'sys_def_activity height', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_activity id', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许回退', '11', null, 'isallowback', 'int', '整型数字', '0', 'sys_def_activity isallowback', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许撤消', '19', null, 'isallowrecall', 'int', '整型数字', '0', 'sys_def_activity isallowrecall', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许强制撤消', '32', null, 'isallowrecallforce', 'int', '整型数字', '0', 'sys_def_activity isallowrecallforce', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否能启动自定义流程', '17', null, 'iscanstartcustomprocess', 'int', '整型数字', '0', 'sys_def_activity iscanstartcustomprocess', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否隔离意见', '30', null, 'isinsulatemind', 'int', '整型数字', '0', 'sys_def_activity isinsulatemind', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主持人可否填写该步骤的可编辑字段  0:不可  1：可以', '20', null, 'ismastercanedit', 'int', '整型数字', '0', 'sys_def_activity ismastercanedit', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否正本（0正常，1正本，2，副本）', '21', null, 'isoriginal', 'int', '整型数字', '0', 'sys_def_activity isoriginal', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否并行（0否，1是）', '22', null, 'isparallel', 'int', '整型数字', '0', 'sys_def_activity isparallel', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否等待新流程办结', '24', null, 'iswaitanotherprocess', 'int', '整型数字', '0', 'sys_def_activity iswaitanotherprocess', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否等待自定义流程', '18', null, 'iswaitcustom', 'int', '整型数字', '0', 'sys_def_activity iswaitcustom', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否等待子流程', '15', null, 'iswaitsubprocess', 'int', '整型数字', '0', 'sys_def_activity iswaitsubprocess', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许解挂', '31', null, 'is_allowed_active', 'int', '整型数字', '0', 'sys_def_activity is_allowed_active', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许补发', '33', null, 'is_allowed_reissue', 'int', '整型数字', '0', 'sys_def_activity is_allowed_reissue', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许触发流程挂起', '29', null, 'is_allowed_suspend', 'int', '整型数字', '0', 'sys_def_activity is_allowed_suspend', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('汇聚类型', '13', null, 'jointype', 'varchar', '单行文本【25】', '0', 'sys_def_activity jointype', '0', '0', '0', null, 'sys_def_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('期限单位', '10', null, 'limitunit', 'int', '整型数字', '0', 'sys_def_activity limitunit', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('横坐标', '5', null, 'positionx', 'int', '整型数字', '0', 'sys_def_activity positionx', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('竖坐标', '6', null, 'positiony', 'int', '整型数字', '0', 'sys_def_activity positiony', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程定义主键', '3', null, 'processdefineid', 'int', '整型数字', '0', 'sys_def_activity processdefineid', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('显示排序号', '27', null, 'showsort', 'int', '整型数字', '0', 'sys_def_activity showsort', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发子流程的按钮的名称', '28', null, 'subprocessbuttonname', 'varchar', '单行文本【25】', '0', 'sys_def_activity subprocessbuttonname', '0', '0', '0', null, 'sys_def_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子流程定义主键', '14', null, 'subprocessdefineid', 'int', '整型数字', '0', 'sys_def_activity subprocessdefineid', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子流程constname-chinaname-version', '16', null, 'subprocessname', 'varchar', '单行文本【50】', '0', 'sys_def_activity subprocessname', '0', '0', '0', null, 'sys_def_activity', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('办理期限', '9', null, 'timelimit', 'int', '整型数字', '0', 'sys_def_activity timelimit', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发新流程的按钮的名称', '26', null, 'triggerbuttonname', 'varchar', '单行文本【10】', '0', 'sys_def_activity triggerbuttonname', '0', '0', '0', null, 'sys_def_activity', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动类型', '12', null, 'type', 'varchar', '单行文本【25】', '0', 'sys_def_activity type', '0', '0', '0', null, 'sys_def_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('宽度', '7', null, 'width', 'int', '整型数字', '0', 'sys_def_activity width', '0', '0', '0', '0', 'sys_def_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义主键', '3', null, 'activitydefineid', 'int', '整型数字', '0', 'sys_def_activityevent activitydefineid', '0', '0', '0', '0', 'sys_def_activityevent', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('程序集', '6', null, 'assemblyname', 'varchar', '单行文本【50】', '0', 'sys_def_activityevent assemblyname', '0', '0', '0', null, 'sys_def_activityevent', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('事件名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_def_activityevent chinaname', '0', '0', '0', null, 'sys_def_activityevent', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('类路径', '7', null, 'classpath', 'varchar', '单行文本【50】', '0', 'sys_def_activityevent classpath', '0', '0', '0', null, 'sys_def_activityevent', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_activityevent delstatus', '0', '0', '0', '0', 'sys_def_activityevent', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('事件描述', '5', null, 'description', 'varchar', '单行文本【100】', '0', 'sys_def_activityevent description', '0', '0', '0', null, 'sys_def_activityevent', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_activityevent id', '0', '0', '0', '0', 'sys_def_activityevent', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许执行', '8', null, 'isallowexecute', 'int', '整型数字', '0', 'sys_def_activityevent isallowexecute', '0', '0', '0', '0', 'sys_def_activityevent', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('事件类型', '9', null, 'type', 'varchar', '单行文本【2】', '0', 'sys_def_activityevent type', '0', '0', '0', null, 'sys_def_activityevent', null, '2', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义主键', '3', null, 'activitydefineid', 'int', '整型数字', '0', 'sys_def_activityform activitydefineid', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('允许编辑的表单字段', '5', null, 'alloweditformcols', 'varchar', '单行文本【1000】', '0', 'sys_def_activityform alloweditformcols', '0', '0', '0', null, 'sys_def_activityform', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('能否添加多次(0:不能；1:可以)', '10', null, 'canaddmany', 'int', '整型数字', '0', 'sys_def_activityform canaddmany', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_activityform delstatus', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_activityform id', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否必填表单(0:不是；1:是)', '11', null, 'ismust', 'int', '整型数字', '0', 'sys_def_activityform ismust', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程定义主键', '6', null, 'processdefineid', 'int', '整型数字', '0', 'sys_def_activityform processdefineid', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('必填表单字段', '12', null, 'requiredcols', 'varchar', '单行文本【1000】', '0', 'sys_def_activityform requiredcols', '0', '0', '0', null, 'sys_def_activityform', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单对应的物理表名', '9', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_def_activityform tablename', '0', '0', '0', null, 'sys_def_activityform', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '4', null, 'tailorformid', 'int', '整型数字', '0', 'sys_def_activityform tailorformid', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单名称', '7', null, 'tailorformname', 'varchar', '单行文本【50】', '0', 'sys_def_activityform tailorformname', '0', '0', '0', null, 'sys_def_activityform', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单类型(0:普通表单；1:文书；2:展示表单)', '8', null, 'tailorformtype', 'int', '整型数字', '0', 'sys_def_activityform tailorformtype', '0', '0', '0', '0', 'sys_def_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义主键', '3', null, 'activitydefineid', 'int', '整型数字', '0', 'sys_def_activityoperation activitydefineid', '0', '0', '0', '0', 'sys_def_activityoperation', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_def_activityoperation chinaname', '0', '0', '0', null, 'sys_def_activityoperation', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作标识', '5', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_def_activityoperation constname', '0', '0', '0', null, 'sys_def_activityoperation', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_activityoperation delstatus', '0', '0', '0', '0', 'sys_def_activityoperation', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('函数名称', '6', null, 'functionname', 'varchar', '单行文本【25】', '0', 'sys_def_activityoperation functionname', '0', '0', '0', null, 'sys_def_activityoperation', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('按钮图标', '8', null, 'iconcls', 'varchar', '单行文本【10】', '0', 'sys_def_activityoperation iconcls', '0', '0', '0', null, 'sys_def_activityoperation', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_activityoperation id', '0', '0', '0', '0', 'sys_def_activityoperation', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('何时显示(0:办理中;1:办理结束后;2:一直)', '9', null, 'showtype', 'int', '整型数字', '0', 'sys_def_activityoperation showtype', '0', '0', '0', '0', 'sys_def_activityoperation', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序编号', '7', null, 'sortindex', 'int', '整型数字', '0', 'sys_def_activityoperation sortindex', '0', '0', '0', '0', 'sys_def_activityoperation', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义主键', '3', null, 'activitydefineid', 'int', '整型数字', '0', 'sys_def_actorcondition activitydefineid', '0', '0', '0', '0', 'sys_def_actorcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户角色集合', '5', null, 'actorroles', 'varchar', '单行文本【500】', '0', 'sys_def_actorcondition actorroles', '0', '0', '0', null, 'sys_def_actorcondition', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('自定义选人策略(字典项)', null, null, 'custom_config', 'varchar', '单行文本【25】', '0', 'sys_def_actorcondition custom_config', '0', '0', '0', null, 'sys_def_actorcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('参与人默认配置(流程发起人/上一步操作人/所在单位分管领导)', '4', null, 'defaultconfig', 'int', '整型数字', '0', 'sys_def_actorcondition defaultconfig', '0', '0', '0', '0', 'sys_def_actorcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否禁用', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_actorcondition delstatus', '0', '0', '0', '0', 'sys_def_actorcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【16】', '0', 'sys_def_actorcondition id', '0', '0', '0', null, 'sys_def_actorcondition', null, '16', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否多选', '10', null, 'multiselect', 'int', '整型数字', '0', 'sys_def_actorcondition multiselect', '0', '0', '0', '0', 'sys_def_actorcondition', null, null, 'NUMBER', '1 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('指定明确的部门ID集合', '6', null, 'pointunit', 'varchar', '单行文本【500】', '0', 'sys_def_actorcondition pointunit', '0', '0', '0', null, 'sys_def_actorcondition', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('指定明确的部门名集合', '7', null, 'pointunitnames', 'varchar', '单行文本【150】', '0', 'sys_def_actorcondition pointunitnames', '0', '0', '0', null, 'sys_def_actorcondition', null, '150', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('参照前岗位(同部门/同单位/上级单位/下级单位/上级单位指定层级)', '8', null, 'referprevactivity', 'int', '整型数字', '0', 'sys_def_actorcondition referprevactivity', '0', '0', '0', '0', 'sys_def_actorcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门层级', '11', null, 'referprevactivitydeptlevel', 'int', '整型数字', '0', 'sys_def_actorcondition referprevactivitydeptlevel', '0', '0', '0', '0', 'sys_def_actorcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用同流程的其他节点的接手人作为本节点的接手人', '9', null, 'useactivityids', 'varchar', '单行文本【50】', '0', 'sys_def_actorcondition useactivityids', '0', '0', '0', null, 'sys_def_actorcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程名称', '4', null, 'chinaname', 'varchar', '单行文本【100】', '0', 'sys_def_process chinaname', '0', '0', '0', null, 'sys_def_process', null, '100', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程标识', '3', null, 'constname', 'varchar', '单行文本【100】', '0', 'sys_def_process constname', '0', '0', '0', null, 'sys_def_process', null, '100', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('创建时间', '5', null, 'createtime', 'datetime', '日期时间', '0', 'sys_def_process createtime', '0', '0', '0', null, 'sys_def_process', null, null, 'DATE', 'SYSDATE ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_process delstatus', '0', '0', '0', '0', 'sys_def_process', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程描述', '6', null, 'description', 'varchar', '单行文本【100】', '0', 'sys_def_process description', '0', '0', '0', null, 'sys_def_process', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_process id', '0', '0', '0', '0', 'sys_def_process', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程分类类型', '9', null, 'processtype', 'varchar', '单行文本【10】', '0', 'sys_def_process processtype', '0', '0', '0', null, 'sys_def_process', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位id', '10', null, 'unitid', 'varchar', '单行文本【500】', '0', 'sys_def_process unitid', '0', '0', '0', null, 'sys_def_process', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位名称', '8', null, 'unitname', 'varchar', '单行文本【500】', '0', 'sys_def_process unitname', '0', '0', '0', null, 'sys_def_process', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程版本号', '7', null, 'version', 'int', '整型数字', '0', 'sys_def_process version', '0', '0', '0', '0', 'sys_def_process', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('添加人', '9', null, 'adder', 'varchar', '单行文本【25】', '0', 'sys_def_tailorform adder', '0', '0', '0', null, 'sys_def_tailorform', null, '25', 'VARCHAR2', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位', '13', null, 'adderdeptid', 'varchar', '单行文本【25】', '0', 'sys_def_tailorform adderdeptid', '0', '0', '0', null, 'sys_def_tailorform', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属部门', '14', null, 'adderunitid', 'varchar', '单行文本【25】', '0', 'sys_def_tailorform adderunitid', '0', '0', '0', null, 'sys_def_tailorform', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('增加时间', '10', null, 'addtime', 'datetime', '日期时间', '0', 'sys_def_tailorform addtime', '0', '0', '0', null, 'sys_def_tailorform', null, null, 'DATE', 'sysdate ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单名称', '3', null, 'chinaname', 'varchar', '单行文本【50】', '0', 'sys_def_tailorform chinaname', '0', '0', '0', null, 'sys_def_tailorform', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_tailorform delstatus', '0', '0', '0', '0', 'sys_def_tailorform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_tailorform id', '0', '0', '0', '0', 'sys_def_tailorform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('最后修改者', '11', null, 'moder', 'varchar', '单行文本【25】', '0', 'sys_def_tailorform moder', '0', '0', '0', null, 'sys_def_tailorform', null, '25', 'VARCHAR2', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('最后修改时间', '12', null, 'modtime', 'datetime', '日期时间', '0', 'sys_def_tailorform modtime', '0', '0', '0', null, 'sys_def_tailorform', null, null, 'DATE', 'sysdate ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单保存路径', '4', null, 'path', 'varchar', '单行文本【50】', '0', 'sys_def_tailorform path', '0', '0', '0', null, 'sys_def_tailorform', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单打印路径', '8', null, 'printpath', 'varchar', '单行文本【50】', '0', 'sys_def_tailorform printpath', '0', '0', '0', null, 'sys_def_tailorform', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表名称', '5', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_def_tailorform tablename', '0', '0', '0', null, 'sys_def_tailorform', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('任务标题字段', '6', null, 'tasktitlecolumn', 'varchar', '单行文本【25】', '0', 'sys_def_tailorform tasktitlecolumn', '0', '0', '0', null, 'sys_def_tailorform', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('任务标题前缀', '7', null, 'tasktitleprefix', 'varchar', '单行文本【500】', '0', 'sys_def_tailorform tasktitleprefix', '0', '0', '0', null, 'sys_def_tailorform', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用单位', '15', null, 'unitid', 'text', '多行文本', '0', 'sys_def_tailorform unitid', '0', '0', '0', null, 'sys_def_tailorform', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用单位名称', '16', null, 'unitname', 'text', '多行文本', '0', 'sys_def_tailorform unitname', '0', '0', '0', null, 'sys_def_tailorform', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('绑定字典项标识', '11', null, 'categoryconstname', 'varchar', '单行文本【25】', '0', 'sys_def_tailorformcol categoryconstname', '0', '0', '0', null, 'sys_def_tailorformcol', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单显示的列名称', '4', null, 'chinaname', 'varchar', '单行文本【50】', '0', 'sys_def_tailorformcol chinaname', '0', '0', '0', null, 'sys_def_tailorformcol', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表列名称', '6', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_def_tailorformcol colname', '0', '0', '0', null, 'sys_def_tailorformcol', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字段类型，可以根据此列的值，构造对应的表单控件', '10', null, 'col_type', 'int', '整型数字', '0', 'sys_def_tailorformcol col_type', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_tailorformcol delstatus', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('时间格式', '12', null, 'fmttypetime', 'varchar', '单行文本【25】', '0', 'sys_def_tailorformcol fmttypetime', '0', '0', '0', null, 'sys_def_tailorformcol', null, '25', 'VARCHAR2', 'default', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单使用规则', '8', null, 'formuserule', 'int', '整型数字', '0', 'sys_def_tailorformcol formuserule', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', '1 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_tailorformcol id', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否意见字段', '7', null, 'ismindcol', 'int', '整型数字', '0', 'sys_def_tailorformcol ismindcol', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('必填项', '13', null, 'required', 'int', '整型数字', '0', 'sys_def_tailorformcol required', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('绑定列源', '9', null, 'sourcecol', 'varchar', '单行文本【50】', '0', 'sys_def_tailorformcol sourcecol', '0', '0', '0', null, 'sys_def_tailorformcol', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表名称', '5', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_def_tailorformcol tablename', '0', '0', '0', null, 'sys_def_tailorformcol', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '3', null, 'tailorformid', 'int', '整型数字', '0', 'sys_def_tailorformcol tailorformid', '0', '0', '0', '0', 'sys_def_tailorformcol', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('数据校验格式', '14', null, 'validdata', 'varchar', '单行文本【50】', '0', 'sys_def_tailorformcol validdata', '0', '0', '0', null, 'sys_def_tailorformcol', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_tailorformcontent delstatus', '0', '0', '0', '0', 'sys_def_tailorformcontent', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单内容', '4', null, 'formcontent', 'text', '多行文本', '0', 'sys_def_tailorformcontent formcontent', '0', '0', '0', null, 'sys_def_tailorformcontent', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_tailorformcontent id', '0', '0', '0', '0', 'sys_def_tailorformcontent', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '3', null, 'tailorformid', 'int', '整型数字', '0', 'sys_def_tailorformcontent tailorformid', '0', '0', '0', '0', 'sys_def_tailorformcontent', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('绑定的字典标识', '15', null, 'categoryconstname', 'varchar', '单行文本【50】', '0', 'sys_def_transcondition categoryconstname', '0', '0', '0', null, 'sys_def_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用物理表字段名称', '6', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_def_transcondition colname', '0', '0', '0', null, 'sys_def_transcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用物理表字段类型', '11', null, 'coltype', 'varchar', '单行文本【25】', '0', 'sys_def_transcondition coltype', '0', '0', '0', null, 'sys_def_transcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('比较操作符', '7', null, 'compareoption', 'varchar', '单行文本【25】', '0', 'sys_def_transcondition compareoption', '0', '0', '0', null, 'sys_def_transcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('比较值', '8', null, 'comparevalue', 'varchar', '单行文本【50】', '0', 'sys_def_transcondition comparevalue', '0', '0', '0', null, 'sys_def_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_transcondition delstatus', '0', '0', '0', '0', 'sys_def_transcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_transcondition id', '0', '0', '0', '0', 'sys_def_transcondition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否分组', '10', null, 'isgroup', 'int', '整型数字', '0', 'sys_def_transcondition isgroup', '0', '0', '0', '0', 'sys_def_transcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('分组条件上级主键', '3', null, 'parentid', 'int', '整型数字', '0', 'sys_def_transcondition parentid', '0', '0', '0', '0', 'sys_def_transcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('条件关系(或者、并且)', '9', null, 'relation', 'varchar', '单行文本【5】', '0', 'sys_def_transcondition relation', '0', '0', '0', null, 'sys_def_transcondition', null, '5', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用物理表名称', '5', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_def_transcondition tablename', '0', '0', '0', null, 'sys_def_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单中文名', '13', null, 'tailorformchinaname', 'varchar', '单行文本【50】', '0', 'sys_def_transcondition tailorformchinaname', '0', '0', '0', null, 'sys_def_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单字段中文名', '14', null, 'tailorformcolchinaname', 'varchar', '单行文本【50】', '0', 'sys_def_transcondition tailorformcolchinaname', '0', '0', '0', null, 'sys_def_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '12', null, 'tailorformid', 'int', '整型数字', '0', 'sys_def_transcondition tailorformid', '0', '0', '0', '0', 'sys_def_transcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程流向定义主键', '4', null, 'transitiondefineid', 'int', '整型数字', '0', 'sys_def_transcondition transitiondefineid', '0', '0', '0', '0', 'sys_def_transcondition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户角色集合', '13', null, 'actorroles', 'varchar', '单行文本【500】', '0', 'sys_def_transition actorroles', '0', '0', '0', null, 'sys_def_transition', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_def_transition chinaname', '0', '0', '0', null, 'sys_def_transition', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_def_transition delstatus', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线的调整位置参数', '8', null, 'dots', 'varchar', '单行文本【100】', '0', 'sys_def_transition dots', '0', '0', '0', null, 'sys_def_transition', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('结束活动定义主键', '6', null, 'endactivitydefineid', 'int', '整型数字', '0', 'sys_def_transition endactivitydefineid', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_def_transition id', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程定义主键', '3', null, 'processdefineid', 'int', '整型数字', '0', 'sys_def_transition processdefineid', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '12', null, 'sortindex', 'int', '整型数字', '0', 'sys_def_transition sortindex', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向的特殊名称', '11', null, 'specialname', 'varchar', '单行文本【50】', '0', 'sys_def_transition specialname', '0', '0', '0', null, 'sys_def_transition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('起始活动定义主键', '5', null, 'startactivitydefineid', 'int', '整型数字', '0', 'sys_def_transition startactivitydefineid', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向条件', '7', null, 'tcondition', 'varchar', '单行文本【2000】', '0', 'sys_def_transition tcondition', '0', '0', '0', null, 'sys_def_transition', null, '2000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线显示内容的x轴位置', '9', null, 'textposx', 'int', '整型数字', '0', 'sys_def_transition textposx', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线显示内容的y轴位置', '10', null, 'textposy', 'int', '整型数字', '0', 'sys_def_transition textposy', '0', '0', '0', '0', 'sys_def_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门名称', '10', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_dept chinaname', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('联系方式', '15', null, 'contactphone', 'varchar', '单行文本【25】', '0', 'sys_dept contactphone', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '5', null, 'delstatus', 'int', '整型数字', '0', 'sys_dept delstatus', '0', '0', '0', '0', 'sys_dept', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门负责人', '4', null, 'deptleaders', 'varchar', '单行文本【25】', '0', 'sys_dept deptleaders', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门级别 单位/部门/科室', '3', null, 'deptlevel', 'int', '整型数字', '0', 'sys_dept deptlevel', '0', '0', '0', '0', 'sys_dept', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('传真号码', '13', null, 'faxphone', 'varchar', '单行文本【7】', '0', 'sys_dept faxphone', '0', '0', '0', null, 'sys_dept', null, '7', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_dept id', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', 'sys_guid() ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('上级部门', '11', null, 'parentid', 'varchar', '单行文本【25】', '0', 'sys_dept parentid', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门拥有的菜单', '8', null, 'permstring', 'text', '多行文本', '0', 'sys_dept permstring', '0', '0', '0', null, 'sys_dept', null, null, 'CLOB', ',0,', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('名称首字母', '14', null, 'phonetic', 'varchar', '单行文本【10】', '0', 'sys_dept phonetic', '0', '0', '0', null, 'sys_dept', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('快速查询编码    使用该字段可以不用递归即可获取到指定部门下所有子部门   规则：   第一层第一个节点：001   第二层第一个节点：001001', '7', null, 'searchcode', 'varchar', '单行文本【25】', '0', 'sys_dept searchcode', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门简称', '9', null, 'simplechinaname', 'varchar', '单行文本【25】', '0', 'sys_dept simplechinaname', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '6', null, 'sortindex', 'int', '整型数字', '0', 'sys_dept sortindex', '0', '0', '0', '0', 'sys_dept', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门编码', '2', null, 'unitcode', 'varchar', '单行文本【100】', '0', 'sys_dept unitcode', '0', '0', '0', null, 'sys_dept', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位', '12', null, 'unitid', 'varchar', '单行文本【25】', '0', 'sys_dept unitid', '0', '0', '0', null, 'sys_dept', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('日', '5', null, 'day', 'int', '整型数字', '0', 'sys_effectdate day', '0', '0', '0', '0', 'sys_effectdate', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '6', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_effectdate id', '0', '0', '0', null, 'sys_effectdate', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否是有效工作日', '2', null, 'isvalid', 'int', '整型数字', '0', 'sys_effectdate isvalid', '0', '0', '0', null, 'sys_effectdate', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('月', '4', null, 'month', 'int', '整型数字', '0', 'sys_effectdate month', '0', '0', '0', '0', 'sys_effectdate', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('日期', '1', null, 'workdate', 'datetime', '日期时间', '0', 'sys_effectdate workdate', '0', '0', '0', null, 'sys_effectdate', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('年', '3', null, 'year', 'int', '整型数字', '0', 'sys_effectdate year', '0', '0', '0', '0', 'sys_effectdate', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('异常类路径', '5', null, 'classname', 'varchar', '单行文本【50】', '0', 'sys_exceptionlog classname', '0', '0', '0', null, 'sys_exceptionlog', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门ID', '8', null, 'deptid', 'int', '整型数字', '0', 'sys_exceptionlog deptid', '0', '0', '0', '0', 'sys_exceptionlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('异常信息', '9', null, 'description', 'text', '多行文本', '0', 'sys_exceptionlog description', '0', '0', '0', null, 'sys_exceptionlog', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('异常时间', '4', null, 'exceptiontime', 'datetime', '日期时间', '0', 'sys_exceptionlog exceptiontime', '0', '0', '0', null, 'sys_exceptionlog', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_exceptionlog id', '0', '0', '0', '0', 'sys_exceptionlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('异常方法', '6', null, 'methodname', 'varchar', '单行文本【50】', '0', 'sys_exceptionlog methodname', '0', '0', '0', null, 'sys_exceptionlog', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('单位ID', '7', null, 'unitid', 'int', '整型数字', '0', 'sys_exceptionlog unitid', '0', '0', '0', '0', 'sys_exceptionlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作者主键', '2', null, 'userid', 'int', '整型数字', '0', 'sys_exceptionlog userid', '0', '0', '0', '0', 'sys_exceptionlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作者姓名', '3', null, 'username', 'varchar', '单行文本【25】', '0', 'sys_exceptionlog username', '0', '0', '0', null, 'sys_exceptionlog', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义主键', '4', null, 'activitydefineid', 'int', '整型数字', '0', 'sys_ins_activity activitydefineid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('允许的接收人', '21', null, 'allowreceivers', 'text', '多行文本', '0', 'sys_ins_activity allowreceivers', '0', '0', '0', null, 'sys_ins_activity', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('针对退回到达步骤：为了追溯当前步骤是从哪一步退回过来的', '20', null, 'backfrominsactivityid', 'int', '整型数字', '0', 'sys_ins_activity backfrominsactivityid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动名称', '6', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_ins_activity chinaname', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_activity delstatus', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('调度人id', '31', null, 'dispatcherid', 'varchar', '单行文本【25】', '0', 'sys_ins_activity dispatcherid', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('调度人姓名', '32', null, 'dispatchername', 'varchar', '单行文本【25】', '0', 'sys_ins_activity dispatchername', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('调度时间', '33', null, 'dispatchertime', 'datetime', '日期时间', '0', 'sys_ins_activity dispatchertime', '0', '0', '0', null, 'sys_ins_activity', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('调度卡口的流程步实例id', '34', null, 'dispatchinsactid', 'int', '整型数字', '0', 'sys_ins_activity dispatchinsactid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实际完成时间', '10', null, 'factfinishtime', 'datetime', '日期时间', '0', 'sys_ins_activity factfinishtime', '0', '0', '0', null, 'sys_ins_activity', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('期望完成时间', '9', null, 'hopefinishtime', 'datetime', '日期时间', '0', 'sys_ins_activity hopefinishtime', '0', '0', '0', null, 'sys_ins_activity', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_activity id', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('由哪些连线触发（in 进来）', '26', null, 'in_deftranid', 'varchar', '单行文本【250】', '0', 'sys_ins_activity in_deftranid', '0', '0', '0', null, 'sys_ins_activity', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('针对退回发起步骤：当前步骤是否是以退回的形式办结的  0：不是  1：是     此标识为了区分正常办结和退回办结', '19', null, 'isback', 'int', '整型数字', '0', 'sys_ins_activity isback', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否来自自定义流程 ', '17', null, 'iscustom', 'int', '整型数字', '0', 'sys_ins_activity iscustom', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否被调度', '35', null, 'isdispatch', 'int', '整型数字', '0', 'sys_ins_activity isdispatch', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否是主持人', '16', null, 'ismaster', 'int', '整型数字', '0', 'sys_ins_activity ismaster', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作人id', '29', null, 'moderid', 'varchar', '单行文本【25】', '0', 'sys_ins_activity moderid', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作人姓名', '30', null, 'modername', 'varchar', '单行文本【25】', '0', 'sys_ins_activity modername', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('哪个流程步实例操作', '28', null, 'modinsactid', 'int', '整型数字', '0', 'sys_ins_activity modinsactid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('修改时间', '27', null, 'modtime', 'datetime', '日期时间', '0', 'sys_ins_activity modtime', '0', '0', '0', null, 'sys_ins_activity', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发哪些连线（out出去）', '25', null, 'out_deftranid', 'varchar', '单行文本【250】', '0', 'sys_ins_activity out_deftranid', '0', '0', '0', null, 'sys_ins_activity', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('紧前活动主键集合', '12', null, 'previousactivityids', 'varchar', '单行文本【50】', '0', 'sys_ins_activity previousactivityids', '0', '0', '0', null, 'sys_ins_activity', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程定义主键', '3', null, 'processdefineid', 'int', '整型数字', '0', 'sys_ins_activity processdefineid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '5', null, 'processinsid', 'int', '整型数字', '0', 'sys_ins_activity processinsid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程类型', '18', null, 'processtype', 'varchar', '单行文本【10】', '0', 'sys_ins_activity processtype', '0', '0', '0', null, 'sys_ins_activity', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('真实紧前节点（针对join）', '24', null, 'real_prev_insactivityid', 'int', '整型数字', '0', 'sys_ins_activity real_prev_insactivityid', '0', '0', '0', '0', 'sys_ins_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实际接手人id', '23', null, 'receiver', 'varchar', '单行文本【25】', '0', 'sys_ins_activity receiver', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('接收人姓名', '14', null, 'receivername', 'varchar', '单行文本【25】', '0', 'sys_ins_activity receivername', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('接收时间', '8', null, 'receivetime', 'datetime', '日期时间', '0', 'sys_ins_activity receivetime', '0', '0', '0', null, 'sys_ins_activity', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发送人id', '22', null, 'sender', 'varchar', '单行文本【25】', '0', 'sys_ins_activity sender', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发送人姓名', '13', null, 'sendername', 'varchar', '单行文本【25】', '0', 'sys_ins_activity sendername', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发送时间', '7', null, 'sendtime', 'datetime', '日期时间', '0', 'sys_ins_activity sendtime', '0', '0', '0', null, 'sys_ins_activity', null, null, 'DATE', 'SYSDATE ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动状态', '11', null, 'status', 'varchar', '单行文本【25】', '0', 'sys_ins_activity status', '0', '0', '0', null, 'sys_ins_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('任务标题', '15', null, 'tasktitle', 'varchar', '单行文本【250】', '0', 'sys_ins_activity tasktitle', '0', '0', '0', null, 'sys_ins_activity', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动实例主键', '3', null, 'activityinsid', 'int', '整型数字', '0', 'sys_ins_activitymind activityinsid', '0', '0', '0', '0', 'sys_ins_activitymind', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_activitymind delstatus', '0', '0', '0', '0', 'sys_ins_activitymind', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单意见字段name', '6', null, 'formmindcolname', 'varchar', '单行文本【50】', '0', 'sys_ins_activitymind formmindcolname', '0', '0', '0', null, 'sys_ins_activitymind', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_activitymind id', '0', '0', '0', '0', 'sys_ins_activitymind', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否同意   true:同意  false:不同意', '12', null, 'isallow', 'varchar', '单行文本【2】', '0', 'sys_ins_activitymind isallow', '0', '0', '0', null, 'sys_ins_activitymind', null, '2', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('意见内容', '9', null, 'mindcontent', 'varchar', '单行文本【100】', '0', 'sys_ins_activitymind mindcontent', '0', '0', '0', null, 'sys_ins_activitymind', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '4', null, 'processinsid', 'int', '整型数字', '0', 'sys_ins_activitymind processinsid', '0', '0', '0', '0', 'sys_ins_activitymind', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('代理人id', null, null, 'proxyerid', 'varchar', '单行文本【25】', '0', 'sys_ins_activitymind proxyerid', '0', '0', '0', null, 'sys_ins_activitymind', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('代理人姓名', null, null, 'proxyername', 'varchar', '单行文本【25】', '0', 'sys_ins_activitymind proxyername', '0', '0', '0', null, 'sys_ins_activitymind', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发表人姓名', '7', null, 'publisher', 'varchar', '单行文本【50】', '0', 'sys_ins_activitymind publisher', '0', '0', '0', null, 'sys_ins_activitymind', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发表人id(如果是当前登陆人是代理人 这里就是其委托人的id)', '10', null, 'publisherid', 'varchar', '单行文本【25】', '0', 'sys_ins_activitymind publisherid', '0', '0', '0', null, 'sys_ins_activitymind', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发表时间', '8', null, 'publishtime', 'datetime', '日期时间', '0', 'sys_ins_activitymind publishtime', '0', '0', '0', null, 'sys_ins_activitymind', null, null, 'DATE', 'SYSDATE ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('意见来源：PC端 0 ，移动端 1', '11', null, 'source', 'int', '整型数字', '0', 'sys_ins_activitymind source', '0', '0', '0', '0', 'sys_ins_activitymind', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '5', null, 'tailorformid', 'int', '整型数字', '0', 'sys_ins_activitymind tailorformid', '0', '0', '0', '0', 'sys_ins_activitymind', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动定义主键', '4', null, 'activitydefineid', 'int', '整型数字', '0', 'sys_ins_activity_backlog activitydefineid', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('允许的接收人', '24', null, 'allowreceivers', 'text', '多行文本', '0', 'sys_ins_activity_backlog allowreceivers', '0', '0', '0', null, 'sys_ins_activity_backlog', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动名称', '6', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog chinaname', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_activity_backlog delstatus', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实际完成时间', '10', null, 'factfinishtime', 'datetime', '日期时间', '0', 'sys_ins_activity_backlog factfinishtime', '0', '0', '0', null, 'sys_ins_activity_backlog', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('期望完成时间', '9', null, 'hopefinishtime', 'datetime', '日期时间', '0', 'sys_ins_activity_backlog hopefinishtime', '0', '0', '0', null, 'sys_ins_activity_backlog', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_activity_backlog id', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否来自自定义流程 ', '17', null, 'iscustom', 'int', '整型数字', '0', 'sys_ins_activity_backlog iscustom', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否是主持人', '16', null, 'ismaster', 'int', '整型数字', '0', 'sys_ins_activity_backlog ismaster', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否正本（0正常，1正本，2，副本）', '21', null, 'isoriginal', 'int', '整型数字', '0', 'sys_ins_activity_backlog isoriginal', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('紧前活动主键集合', '12', null, 'previousactivityids', 'varchar', '单行文本【50】', '0', 'sys_ins_activity_backlog previousactivityids', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程定义主键', '3', null, 'processdefineid', 'int', '整型数字', '0', 'sys_ins_activity_backlog processdefineid', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '5', null, 'processinsid', 'int', '整型数字', '0', 'sys_ins_activity_backlog processinsid', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程类型', '18', null, 'processtype', 'varchar', '单行文本【10】', '0', 'sys_ins_activity_backlog processtype', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实际接手人id', '25', null, 'receiver', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog receiver', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('接收人姓名', '14', null, 'receivername', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog receivername', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('接收时间', '8', null, 'receivetime', 'datetime', '日期时间', '0', 'sys_ins_activity_backlog receivetime', '0', '0', '0', null, 'sys_ins_activity_backlog', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('业务事项表主键', '20', null, 'recordid', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog recordid', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发送人id', '23', null, 'sender', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog sender', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发送人姓名', '13', null, 'sendername', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog sendername', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('发送时间', '7', null, 'sendtime', 'datetime', '日期时间', '0', 'sys_ins_activity_backlog sendtime', '0', '0', '0', null, 'sys_ins_activity_backlog', null, null, 'DATE', 'SYSDATE ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序字段', '26', null, 'sortindex', 'int', '整型数字', '0', 'sys_ins_activity_backlog sortindex', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动状态', '11', null, 'status', 'varchar', '单行文本【25】', '0', 'sys_ins_activity_backlog status', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('业务事项表名称', '19', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_ins_activity_backlog tablename', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用的展示表单id', '22', null, 'tailorformid', 'int', '整型数字', '0', 'sys_ins_activity_backlog tailorformid', '0', '0', '0', '0', 'sys_ins_activity_backlog', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('任务标题', '15', null, 'tasktitle', 'varchar', '单行文本【250】', '0', 'sys_ins_activity_backlog tasktitle', '0', '0', '0', null, 'sys_ins_activity_backlog', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('业务流程名称', '6', null, 'chinaname', 'varchar', '单行文本【50】', '0', 'sys_ins_process chinaname', '0', '0', '0', null, 'sys_ins_process', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('记录并行分支的起始节点，一般是fork节点的下一层节点（会有多个），目前只针对并行分支时，各个分支节点也是并行处理的情况，以区分不同定义节点的并行任务', '18', null, 'defactivityid', 'varchar', '单行文本【25】', '0', 'sys_ins_process defactivityid', '0', '0', '0', null, 'sys_ins_process', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_process delstatus', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('结束时间', '8', null, 'endtime', 'datetime', '日期时间', '0', 'sys_ins_process endtime', '0', '0', '0', null, 'sys_ins_process', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_process id', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否正本（0正常，1正本，2，副本）', '14', null, 'isoriginal', 'int', '整型数字', '0', 'sys_ins_process isoriginal', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否挂起 0：激活   1：挂起', '19', null, 'issuspend', 'int', '整型数字', '0', 'sys_ins_process issuspend', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('当前流程所在的流程图的发起processinsid', '12', null, 'locatedprocessinsid', 'int', '整型数字', '0', 'sys_ins_process locatedprocessinsid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('父活动实例主键', '5', null, 'parentactivityinsid', 'int', '整型数字', '0', 'sys_ins_process parentactivityinsid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('父流程实例主键', '4', null, 'parentprocessinsid', 'int', '整型数字', '0', 'sys_ins_process parentprocessinsid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程定义主键', '3', null, 'processdefineid', 'int', '整型数字', '0', 'sys_ins_process processdefineid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程类型', '13', null, 'processtype', 'varchar', '单行文本【10】', '0', 'sys_ins_process processtype', '0', '0', '0', null, 'sys_ins_process', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('最根本的流程活动实例主键(所有的父子流程和并行流程共同的发起点)', '11', null, 'rootprocessinsid', 'int', '整型数字', '0', 'sys_ins_process rootprocessinsid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程启动人id', '15', null, 'starter', 'varchar', '单行文本【25】', '0', 'sys_ins_process starter', '0', '0', '0', null, 'sys_ins_process', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('启动人姓名', '10', null, 'startername', 'varchar', '单行文本【25】', '0', 'sys_ins_process startername', '0', '0', '0', null, 'sys_ins_process', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('启动时间', '7', null, 'starttime', 'datetime', '日期时间', '0', 'sys_ins_process starttime', '0', '0', '0', null, 'sys_ins_process', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程状态', '9', null, 'status', 'varchar', '单行文本【25】', '0', 'sys_ins_process status', '0', '0', '0', null, 'sys_ins_process', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发此流程的活动实例主键', '17', null, 'triggeractivityinsid', 'int', '整型数字', '0', 'sys_ins_process triggeractivityinsid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发此流程的流程实例主键', '16', null, 'triggerprocessinsid', 'int', '整型数字', '0', 'sys_ins_process triggerprocessinsid', '0', '0', '0', '0', 'sys_ins_process', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('创建时间', '6', null, 'createtime', 'datetime', '日期时间', '0', 'sys_ins_processform createtime', '0', '0', '0', null, 'sys_ins_processform', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_processform delstatus', '0', '0', '0', '0', 'sys_ins_processform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_processform id', '0', '0', '0', '0', 'sys_ins_processform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('修改时间', '7', null, 'modifytime', 'datetime', '日期时间', '0', 'sys_ins_processform modifytime', '0', '0', '0', null, 'sys_ins_processform', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程实例主键', '5', null, 'processinsid', 'int', '整型数字', '0', 'sys_ins_processform processinsid', '0', '0', '0', '0', 'sys_ins_processform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实例记录主键', '4', null, 'recordid', 'varchar', '单行文本【25】', '0', 'sys_ins_processform recordid', '0', '0', '0', null, 'sys_ins_processform', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实例记录表名称', '3', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_ins_processform tablename', '0', '0', '0', null, 'sys_ins_processform', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_processtailorform delstatus', '0', '0', '0', '0', 'sys_ins_processtailorform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_processtailorform id', '0', '0', '0', '0', 'sys_ins_processtailorform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动实例id', '7', null, 'insactivityid', 'int', '整型数字', '0', 'sys_ins_processtailorform insactivityid', '0', '0', '0', '0', 'sys_ins_processtailorform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('当前流程所在的流程图的发起processinsid', '8', null, 'locatedprocessinsid', 'int', '整型数字', '0', 'sys_ins_processtailorform locatedprocessinsid', '0', '0', '0', '0', 'sys_ins_processtailorform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实例记录主键', '4', null, 'recordid', 'varchar', '单行文本【25】', '0', 'sys_ins_processtailorform recordid', '0', '0', '0', null, 'sys_ins_processtailorform', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('实例记录表名称', '3', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_ins_processtailorform tablename', '0', '0', '0', null, 'sys_ins_processtailorform', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单id', '5', null, 'tailorformid', 'int', '整型数字', '0', 'sys_ins_processtailorform tailorformid', '0', '0', '0', '0', 'sys_ins_processtailorform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单名称', '6', null, 'tailorformname', 'varchar', '单行文本【50】', '0', 'sys_ins_processtailorform tailorformname', '0', '0', '0', null, 'sys_ins_processtailorform', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托人id', '7', null, 'consignerid', 'varchar', '单行文本【25】', '0', 'sys_ins_proxyactivity consignerid', '0', '0', '0', null, 'sys_ins_proxyactivity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('委托人姓名', '5', null, 'consignername', 'varchar', '单行文本【25】', '0', 'sys_ins_proxyactivity consignername', '0', '0', '0', null, 'sys_ins_proxyactivity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('最终办理情况（  0：当前代理人办理  1：委托人自己或其他代理人办理）', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_ins_proxyactivity delstatus', '0', '0', '0', '0', 'sys_ins_proxyactivity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_ins_proxyactivity id', '0', '0', '0', '0', 'sys_ins_proxyactivity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动实例id', '3', null, 'insactivityid', 'int', '整型数字', '0', 'sys_ins_proxyactivity insactivityid', '0', '0', '0', '0', 'sys_ins_proxyactivity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('代理人id', '6', null, 'proxyerid', 'varchar', '单行文本【25】', '0', 'sys_ins_proxyactivity proxyerid', '0', '0', '0', null, 'sys_ins_proxyactivity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('代理人姓名', '4', null, 'proxyername', 'varchar', '单行文本【25】', '0', 'sys_ins_proxyactivity proxyername', '0', '0', '0', null, 'sys_ins_proxyactivity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('新流程的流程定义主键', '22', null, 'anotherprocessdefineid', 'int', '整型数字', '0', 'sys_mdl_activity anotherprocessdefineid', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('在配置界面新流程文本框中的显示名称', '24', null, 'anotherprocessname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activity anotherprocessname', '0', '0', '0', null, 'sys_mdl_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动模型名称', '3', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activity chinaname', '0', '0', '0', null, 'sys_mdl_activity', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动标识，在整个流程轨迹中唯一', '34', null, 'constname', 'varchar', '单行文本【10】', '0', 'sys_mdl_activity constname', '0', '0', '0', null, 'sys_mdl_activity', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_activity delstatus', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('高度', '8', null, 'height', 'int', '整型数字', '0', 'sys_mdl_activity height', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_activity id', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许回退', '11', null, 'isallowback', 'int', '整型数字', '0', 'sys_mdl_activity isallowback', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许撤消', '19', null, 'isallowrecall', 'int', '整型数字', '0', 'sys_mdl_activity isallowrecall', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许强制撤消', '32', null, 'isallowrecallforce', 'int', '整型数字', '0', 'sys_mdl_activity isallowrecallforce', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否能启动自定义流程', '17', null, 'iscanstartcustomprocess', 'int', '整型数字', '0', 'sys_mdl_activity iscanstartcustomprocess', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否隔离意见', '30', null, 'isinsulatemind', 'int', '整型数字', '0', 'sys_mdl_activity isinsulatemind', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主持人可否填写该步骤的可编辑字段  0:不可  1：可以', '28', null, 'ismastercanedit', 'int', '整型数字', '0', 'sys_mdl_activity ismastercanedit', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否正本（0正常，1正本，2，副本）', '20', null, 'isoriginal', 'int', '整型数字', '0', 'sys_mdl_activity isoriginal', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否并行（0否，1是）', '21', null, 'isparallel', 'int', '整型数字', '0', 'sys_mdl_activity isparallel', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否等待新流程办结', '23', null, 'iswaitanotherprocess', 'int', '整型数字', '0', 'sys_mdl_activity iswaitanotherprocess', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否等待自定义流程', '18', null, 'iswaitcustom', 'int', '整型数字', '0', 'sys_mdl_activity iswaitcustom', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否等待子流程', '15', null, 'iswaitsubprocess', 'int', '整型数字', '0', 'sys_mdl_activity iswaitsubprocess', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许解挂', '31', null, 'is_allowed_active', 'int', '整型数字', '0', 'sys_mdl_activity is_allowed_active', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许补发', '33', null, 'is_allowed_reissue', 'int', '整型数字', '0', 'sys_mdl_activity is_allowed_reissue', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许触发挂起流程', '29', null, 'is_allowed_suspend', 'int', '整型数字', '0', 'sys_mdl_activity is_allowed_suspend', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('汇聚类型', '13', null, 'jointype', 'varchar', '单行文本【25】', '0', 'sys_mdl_activity jointype', '0', '0', '0', null, 'sys_mdl_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('期限单位', '10', null, 'limitunit', 'int', '整型数字', '0', 'sys_mdl_activity limitunit', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('横坐标', '5', null, 'positionx', 'int', '整型数字', '0', 'sys_mdl_activity positionx', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('竖坐标', '6', null, 'positiony', 'int', '整型数字', '0', 'sys_mdl_activity positiony', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程模型主键', '4', null, 'processmodelid', 'int', '整型数字', '0', 'sys_mdl_activity processmodelid', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('显示排序号', '26', null, 'showsort', 'int', '整型数字', '0', 'sys_mdl_activity showsort', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发子流程的按钮的名称', '27', null, 'subprocessbuttonname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activity subprocessbuttonname', '0', '0', '0', null, 'sys_mdl_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子流程主键', '14', null, 'subprocessid', 'int', '整型数字', '0', 'sys_mdl_activity subprocessid', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子流程constname-chinaname-version', '16', null, 'subprocessname', 'varchar', '单行文本【50】', '0', 'sys_mdl_activity subprocessname', '0', '0', '0', null, 'sys_mdl_activity', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('办理期限', '9', null, 'timelimit', 'int', '整型数字', '0', 'sys_mdl_activity timelimit', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('触发新流程的按钮名称', '25', null, 'triggerbuttonname', 'varchar', '单行文本【10】', '0', 'sys_mdl_activity triggerbuttonname', '0', '0', '0', null, 'sys_mdl_activity', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动类型', '12', null, 'type', 'varchar', '单行文本【25】', '0', 'sys_mdl_activity type', '0', '0', '0', null, 'sys_mdl_activity', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('宽度', '7', null, 'width', 'int', '整型数字', '0', 'sys_mdl_activity width', '0', '0', '0', '0', 'sys_mdl_activity', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动模型主键', '3', null, 'activitymodelid', 'int', '整型数字', '0', 'sys_mdl_activityevent activitymodelid', '0', '0', '0', '0', 'sys_mdl_activityevent', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('程序集', '6', null, 'assemblyname', 'varchar', '单行文本【50】', '0', 'sys_mdl_activityevent assemblyname', '0', '0', '0', null, 'sys_mdl_activityevent', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('事件名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activityevent chinaname', '0', '0', '0', null, 'sys_mdl_activityevent', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('类路径', '7', null, 'classpath', 'varchar', '单行文本【50】', '0', 'sys_mdl_activityevent classpath', '0', '0', '0', null, 'sys_mdl_activityevent', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_activityevent delstatus', '0', '0', '0', '0', 'sys_mdl_activityevent', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('事件描述', '5', null, 'description', 'varchar', '单行文本【100】', '0', 'sys_mdl_activityevent description', '0', '0', '0', null, 'sys_mdl_activityevent', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_activityevent id', '0', '0', '0', '0', 'sys_mdl_activityevent', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许执行', '8', null, 'isallowexecute', 'int', '整型数字', '0', 'sys_mdl_activityevent isallowexecute', '0', '0', '0', '0', 'sys_mdl_activityevent', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('事件类型   1.start  2.end', '9', null, 'type', 'varchar', '单行文本【2】', '0', 'sys_mdl_activityevent type', '0', '0', '0', null, 'sys_mdl_activityevent', null, '2', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动模型主键', '6', null, 'activitymodelid', 'int', '整型数字', '0', 'sys_mdl_activityform activitymodelid', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('允许编辑的表单字段', '4', null, 'alloweditformcols', 'varchar', '单行文本【1000】', '0', 'sys_mdl_activityform alloweditformcols', '0', '0', '0', null, 'sys_mdl_activityform', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('能否添加多次(0:不能；1:可以)', '10', null, 'canaddmany', 'int', '整型数字', '0', 'sys_mdl_activityform canaddmany', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_activityform delstatus', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_activityform id', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否必填表单(0:不是；1:是)', '11', null, 'ismust', 'int', '整型数字', '0', 'sys_mdl_activityform ismust', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程模型主键', '5', null, 'processmodelid', 'int', '整型数字', '0', 'sys_mdl_activityform processmodelid', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('必填字段', '12', null, 'requiredcols', 'varchar', '单行文本【1000】', '0', 'sys_mdl_activityform requiredcols', '0', '0', '0', null, 'sys_mdl_activityform', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单对应的物理表名', '9', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_mdl_activityform tablename', '0', '0', '0', null, 'sys_mdl_activityform', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '3', null, 'tailorformid', 'int', '整型数字', '0', 'sys_mdl_activityform tailorformid', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单名称', '7', null, 'tailorformname', 'varchar', '单行文本【50】', '0', 'sys_mdl_activityform tailorformname', '0', '0', '0', null, 'sys_mdl_activityform', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单类型(0:普通表单；1:文书；2:展示表单)', '8', null, 'tailorformtype', 'int', '整型数字', '0', 'sys_mdl_activityform tailorformtype', '0', '0', '0', '0', 'sys_mdl_activityform', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动模型主键', '8', null, 'activitymodelid', 'int', '整型数字', '0', 'sys_mdl_activityoperation activitymodelid', '0', '0', '0', '0', 'sys_mdl_activityoperation', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作名称', '3', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activityoperation chinaname', '0', '0', '0', null, 'sys_mdl_activityoperation', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作标识', '4', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activityoperation constname', '0', '0', '0', null, 'sys_mdl_activityoperation', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_activityoperation delstatus', '0', '0', '0', '0', 'sys_mdl_activityoperation', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('函数名称', '5', null, 'functionname', 'varchar', '单行文本【25】', '0', 'sys_mdl_activityoperation functionname', '0', '0', '0', null, 'sys_mdl_activityoperation', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('按钮图标', '7', null, 'iconcls', 'varchar', '单行文本【10】', '0', 'sys_mdl_activityoperation iconcls', '0', '0', '0', null, 'sys_mdl_activityoperation', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_activityoperation id', '0', '0', '0', '0', 'sys_mdl_activityoperation', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('何时显示(0:办理中;1:办理结束后;2:一直)', '9', null, 'showtype', 'int', '整型数字', '0', 'sys_mdl_activityoperation showtype', '0', '0', '0', '0', 'sys_mdl_activityoperation', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序编号', '6', null, 'sortindex', 'int', '整型数字', '0', 'sys_mdl_activityoperation sortindex', '0', '0', '0', '0', 'sys_mdl_activityoperation', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('活动模型主键', '3', null, 'activitymodelid', 'int', '整型数字', '0', 'sys_mdl_actorcondition activitymodelid', '0', '0', '0', '0', 'sys_mdl_actorcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户角色集合', '5', null, 'actorroles', 'varchar', '单行文本【500】', '0', 'sys_mdl_actorcondition actorroles', '0', '0', '0', null, 'sys_mdl_actorcondition', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('自定义选人策略(字典项)', null, null, 'custom_config', 'varchar', '单行文本【25】', '0', 'sys_mdl_actorcondition custom_config', '0', '0', '0', null, 'sys_mdl_actorcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('参与人默认配置(流程发起人/上一步操作人/所在单位分管领导)', '4', null, 'defaultconfig', 'int', '整型数字', '0', 'sys_mdl_actorcondition defaultconfig', '0', '0', '0', '0', 'sys_mdl_actorcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否禁用', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_actorcondition delstatus', '0', '0', '0', '0', 'sys_mdl_actorcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【16】', '0', 'sys_mdl_actorcondition id', '0', '0', '0', null, 'sys_mdl_actorcondition', null, '16', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否多选', '10', null, 'multiselect', 'int', '整型数字', '0', 'sys_mdl_actorcondition multiselect', '0', '0', '0', '0', 'sys_mdl_actorcondition', null, null, 'NUMBER', '1 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('指定明确的部门ID集合', '6', null, 'pointunit', 'varchar', '单行文本【500】', '0', 'sys_mdl_actorcondition pointunit', '0', '0', '0', null, 'sys_mdl_actorcondition', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('指定明确的部门名集合', '7', null, 'pointunitnames', 'varchar', '单行文本【150】', '0', 'sys_mdl_actorcondition pointunitnames', '0', '0', '0', null, 'sys_mdl_actorcondition', null, '150', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('参照前岗位(同部门/同单位/上级单位/下级单位)', '8', null, 'referprevactivity', 'int', '整型数字', '0', 'sys_mdl_actorcondition referprevactivity', '0', '0', '0', '0', 'sys_mdl_actorcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门层级', '11', null, 'referprevactivitydeptlevel', 'int', '整型数字', '0', 'sys_mdl_actorcondition referprevactivitydeptlevel', '0', '0', '0', '0', 'sys_mdl_actorcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用同流程的其他节点的接手人作为本节点的接手人', '9', null, 'useactivityids', 'varchar', '单行文本【50】', '0', 'sys_mdl_actorcondition useactivityids', '0', '0', '0', null, 'sys_mdl_actorcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程名称', '4', null, 'chinaname', 'varchar', '单行文本【100】', '0', 'sys_mdl_process chinaname', '0', '0', '0', null, 'sys_mdl_process', null, '100', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程标识', '3', null, 'constname', 'varchar', '单行文本【100】', '0', 'sys_mdl_process constname', '0', '0', '0', null, 'sys_mdl_process', null, '100', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('创建时间', '5', null, 'createtime', 'datetime', '日期时间', '0', 'sys_mdl_process createtime', '0', '0', '0', null, 'sys_mdl_process', null, null, 'DATE', 'SYSDATE ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_process delstatus', '0', '0', '0', '0', 'sys_mdl_process', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程描述', '6', null, 'description', 'varchar', '单行文本【100】', '0', 'sys_mdl_process description', '0', '0', '0', null, 'sys_mdl_process', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_process id', '0', '0', '0', '0', 'sys_mdl_process', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程分类类型', '8', null, 'processtype', 'varchar', '单行文本【10】', '0', 'sys_mdl_process processtype', '0', '0', '0', null, 'sys_mdl_process', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位id 多个以逗号隔开', '9', null, 'unitid', 'varchar', '单行文本【500】', '0', 'sys_mdl_process unitid', '0', '0', '0', null, 'sys_mdl_process', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位名称', '7', null, 'unitname', 'varchar', '单行文本【500】', '0', 'sys_mdl_process unitname', '0', '0', '0', null, 'sys_mdl_process', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('绑定的字典标识', '15', null, 'categoryconstname', 'varchar', '单行文本【50】', '0', 'sys_mdl_transcondition categoryconstname', '0', '0', '0', null, 'sys_mdl_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表列名', '14', null, 'colname', 'varchar', '单行文本【50】', '0', 'sys_mdl_transcondition colname', '0', '0', '0', null, 'sys_mdl_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('使用物理表字段类型', '9', null, 'coltype', 'varchar', '单行文本【25】', '0', 'sys_mdl_transcondition coltype', '0', '0', '0', null, 'sys_mdl_transcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('比较操作符', '5', null, 'compareoption', 'varchar', '单行文本【25】', '0', 'sys_mdl_transcondition compareoption', '0', '0', '0', null, 'sys_mdl_transcondition', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('比较值', '6', null, 'comparevalue', 'varchar', '单行文本【50】', '0', 'sys_mdl_transcondition comparevalue', '0', '0', '0', null, 'sys_mdl_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_transcondition delstatus', '0', '0', '0', '0', 'sys_mdl_transcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_transcondition id', '0', '0', '0', '0', 'sys_mdl_transcondition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否是组', '8', null, 'isgroup', 'int', '整型数字', '0', 'sys_mdl_transcondition isgroup', '0', '0', '0', '0', 'sys_mdl_transcondition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('分组条件上级主键', '3', null, 'parentid', 'int', '整型数字', '0', 'sys_mdl_transcondition parentid', '0', '0', '0', '0', 'sys_mdl_transcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('条件关系(或者、并且)', '7', null, 'relation', 'varchar', '单行文本【5】', '0', 'sys_mdl_transcondition relation', '0', '0', '0', null, 'sys_mdl_transcondition', null, '5', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表名', '13', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_mdl_transcondition tablename', '0', '0', '0', null, 'sys_mdl_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单中文名', '11', null, 'tailorformchinaname', 'varchar', '单行文本【50】', '0', 'sys_mdl_transcondition tailorformchinaname', '0', '0', '0', null, 'sys_mdl_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单字段中文名', '12', null, 'tailorformcolchinaname', 'varchar', '单行文本【50】', '0', 'sys_mdl_transcondition tailorformcolchinaname', '0', '0', '0', null, 'sys_mdl_transcondition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表单主键', '10', null, 'tailorformid', 'int', '整型数字', '0', 'sys_mdl_transcondition tailorformid', '0', '0', '0', '0', 'sys_mdl_transcondition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程流向模型主键', '4', null, 'transitionmodelid', 'int', '整型数字', '0', 'sys_mdl_transcondition transitionmodelid', '0', '0', '0', '0', 'sys_mdl_transcondition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户角色集合', '13', null, 'actorroles', 'varchar', '单行文本【500】', '0', 'sys_mdl_transition actorroles', '0', '0', '0', null, 'sys_mdl_transition', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向名称', '4', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_mdl_transition chinaname', '0', '0', '0', null, 'sys_mdl_transition', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_mdl_transition delstatus', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线的调整位置参数', '8', null, 'dots', 'varchar', '单行文本【100】', '0', 'sys_mdl_transition dots', '0', '0', '0', null, 'sys_mdl_transition', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('结束活动模型主键', '6', null, 'endactivitymodelid', 'int', '整型数字', '0', 'sys_mdl_transition endactivitymodelid', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_mdl_transition id', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流程模型主键', '3', null, 'processmodelid', 'int', '整型数字', '0', 'sys_mdl_transition processmodelid', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '12', null, 'sortindex', 'int', '整型数字', '0', 'sys_mdl_transition sortindex', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向的特殊名称', '11', null, 'specialname', 'varchar', '单行文本【50】', '0', 'sys_mdl_transition specialname', '0', '0', '0', null, 'sys_mdl_transition', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('起始活动模型主键', '5', null, 'startactivitymodelid', 'int', '整型数字', '0', 'sys_mdl_transition startactivitymodelid', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('流向条件', '7', null, 'tcondition', 'varchar', '单行文本【2000】', '0', 'sys_mdl_transition tcondition', '0', '0', '0', null, 'sys_mdl_transition', null, '2000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线显示内容的x轴位置', '9', null, 'textposx', 'int', '整型数字', '0', 'sys_mdl_transition textposx', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('连线显示内容的y轴位置', '10', null, 'textposy', 'int', '整型数字', '0', 'sys_mdl_transition textposy', '0', '0', '0', '0', 'sys_mdl_transition', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '7', null, 'delstatus', 'int', '整型数字', '0', 'sys_menu delstatus', '0', '0', '0', '0', 'sys_menu', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('桌面图标', '4', null, 'deskicon', 'varchar', '单行文本【50】', '0', 'sys_menu deskicon', '0', '0', '0', null, 'sys_menu', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '8', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_menu id', '0', '0', '0', null, 'sys_menu', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否是父节点,true or false', '6', null, 'isparent', 'varchar', '单行文本【2】', '0', 'sys_menu isparent', '0', '0', '0', null, 'sys_menu', null, '2', 'VARCHAR2', 'false ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('菜单主页', '2', null, 'mainurl', 'varchar', '单行文本【250】', '0', 'sys_menu mainurl', '0', '0', '0', null, 'sys_menu', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('菜单图标', '5', null, 'menuicon', 'varchar', '单行文本【50】', '0', 'sys_menu menuicon', '0', '0', '0', null, 'sys_menu', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('菜单名称', '1', null, 'name', 'varchar', '单行文本【25】', '0', 'sys_menu name', '0', '0', '0', null, 'sys_menu', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('父id', '9', null, 'parentid', 'varchar', '单行文本【25】', '0', 'sys_menu parentid', '0', '0', '0', null, 'sys_menu', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '3', null, 'sortindex', 'int', '整型数字', '0', 'sys_menu sortindex', '0', '0', '0', '0', 'sys_menu', null, null, 'NUMBER', '50', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('元素中文描述', '2', null, 'chinaname', 'varchar', '单行文本【50】', '0', 'sys_menuoperation chinaname', '0', '0', '0', null, 'sys_menuoperation', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('唯一标识', '10', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_menuoperation constname', '0', '0', '0', null, 'sys_menuoperation', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识 ', '5', null, 'delstatus', 'int', '整型数字', '0', 'sys_menuoperation delstatus', '0', '0', '0', '0', 'sys_menuoperation', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('元素id值，来自于元素在页面使用的id值', '1', null, 'elementid', 'varchar', '单行文本【18】', '0', 'sys_menuoperation elementid', '0', '0', '0', null, 'sys_menuoperation', null, '18', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('按钮图标', '4', null, 'iconcls', 'varchar', '单行文本【10】', '0', 'sys_menuoperation iconcls', '0', '0', '0', null, 'sys_menuoperation', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '8', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_menuoperation id', '0', '0', '0', null, 'sys_menuoperation', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('前台js函数名', '7', null, 'jsfunction', 'varchar', '单行文本【25】', '0', 'sys_menuoperation jsfunction', '0', '0', '0', null, 'sys_menuoperation', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('菜单id', '9', null, 'menuid', 'varchar', '单行文本【25】', '0', 'sys_menuoperation menuid', '0', '0', '0', null, 'sys_menuoperation', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '6', null, 'sortindex', 'int', '整型数字', '0', 'sys_menuoperation sortindex', '0', '0', '0', '0', 'sys_menuoperation', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('Controller+Action', '3', null, 'webapipath', 'varchar', '单行文本【50】', '0', 'sys_menuoperation webapipath', '0', '0', '0', null, 'sys_menuoperation', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_model_pk_number id', '0', '0', '0', '0', 'sys_model_pk_number', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_model_pk_number id_name', '0', '0', '0', null, 'sys_model_pk_number', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_model_pk_number_detail id_name', '0', '0', '0', null, 'sys_model_pk_number_detail', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'transfer_detail_pk', 'int', '整型数字', '0', 'sys_model_pk_number_detail transfer_detail_pk', '0', '0', '0', '0', 'sys_model_pk_number_detail', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_model_pk_number_judge id_name', '0', '0', '0', null, 'sys_model_pk_number_judge', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'judge_id', 'int', '整型数字', '0', 'sys_model_pk_number_judge judge_id', '0', '0', '0', '0', 'sys_model_pk_number_judge', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_model_pk_number_log id_name', '0', '0', '0', null, 'sys_model_pk_number_log', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'num_id', 'int', '整型数字', '0', 'sys_model_pk_number_log num_id', '0', '0', '0', '0', 'sys_model_pk_number_log', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_model_pk_number_qzhlog id_name', '0', '0', '0', null, 'sys_model_pk_number_qzhlog', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'tid', 'int', '整型数字', '0', 'sys_model_pk_number_qzhlog tid', '0', '0', '0', '0', 'sys_model_pk_number_qzhlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_model_pk_string id', '0', '0', '0', null, 'sys_model_pk_string', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_model_pk_string id_name', '0', '0', '0', null, 'sys_model_pk_string', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作类路径', '5', null, 'classname', 'varchar', '单行文本【50】', '0', 'sys_operationlog classname', '0', '0', '0', null, 'sys_operationlog', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('部门ID', '9', null, 'deptid', 'int', '整型数字', '0', 'sys_operationlog deptid', '0', '0', '0', '0', 'sys_operationlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('方法描述', '7', null, 'description', 'varchar', '单行文本【50】', '0', 'sys_operationlog description', '0', '0', '0', null, 'sys_operationlog', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_operationlog id', '0', '0', '0', '0', 'sys_operationlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作方法', '6', null, 'methodname', 'varchar', '单行文本【50】', '0', 'sys_operationlog methodname', '0', '0', '0', null, 'sys_operationlog', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作时间', '4', null, 'operatetime', 'datetime', '日期时间', '0', 'sys_operationlog operatetime', '0', '0', '0', null, 'sys_operationlog', null, null, 'DATE', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('方法参数值', '10', null, 'parametersvalue', 'text', '多行文本', '0', 'sys_operationlog parametersvalue', '0', '0', '0', null, 'sys_operationlog', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('单位ID', '8', null, 'unitid', 'int', '整型数字', '0', 'sys_operationlog unitid', '0', '0', '0', '0', 'sys_operationlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作者主键', '2', null, 'userid', 'int', '整型数字', '0', 'sys_operationlog userid', '0', '0', '0', '0', 'sys_operationlog', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('操作者姓名', '3', null, 'username', 'varchar', '单行文本【5】', '0', 'sys_operationlog username', '0', '0', '0', null, 'sys_operationlog', null, '5', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES (null, '4', null, 'accessvalue', 'varchar', '单行文本【1000】', '0', 'sys_privilege accessvalue', '0', '0', '0', null, 'sys_privilege', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES (null, '6', null, 'access_', 'varchar', '单行文本【1000】', '0', 'sys_privilege access_', '0', '0', '0', null, 'sys_privilege', null, '1000', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_privilege id', '0', '0', '0', '0', 'sys_privilege', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES (null, '2', null, 'master', 'varchar', '单行文本【1000】', '0', 'sys_privilege master', '0', '0', '0', null, 'sys_privilege', null, '1000', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES (null, '3', null, 'mastervalue', 'varchar', '单行文本【1000】', '0', 'sys_privilege mastervalue', '0', '0', '0', null, 'sys_privilege', null, '1000', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES (null, '5', null, 'operation', 'varchar', '单行文本【1000】', '0', 'sys_privilege operation', '0', '0', '0', null, 'sys_privilege', null, '1000', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('添加用户的主键', '8', null, 'addid', 'varchar', '单行文本【25】', '0', 'sys_roles addid', '0', '0', '0', null, 'sys_roles', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('当前角色可以给用户分配的角色  防止通过角色的分配来越权', '7', null, 'can_use_roleids', 'text', '多行文本', '0', 'sys_roles can_use_roleids', '0', '0', '0', null, 'sys_roles', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('角色名称', '1', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_roles chinaname', '0', '0', '0', null, 'sys_roles', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('角色标识', '5', null, 'constname', 'varchar', '单行文本【10】', '0', 'sys_roles constname', '0', '0', '0', null, 'sys_roles', null, '10', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_roles delstatus', '0', '0', '0', '0', 'sys_roles', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '6', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_roles id', '0', '0', '0', null, 'sys_roles', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('菜单权限', '4', null, 'permstring', 'text', '多行文本', '0', 'sys_roles permstring', '0', '0', '0', null, 'sys_roles', null, null, 'CLOB', ',0,', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序号', '3', null, 'sortindex', 'int', '整型数字', '0', 'sys_roles sortindex', '0', '0', '0', '0', 'sys_roles', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('别名', '1', null, 'alias', 'varchar', '单行文本【127】', '0', 'sys_tablesremark alias', '0', '0', '0', null, 'sys_tablesremark', null, '127', 'VARCHAR2', '?????? ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('model所在的程序集名称', '12', null, 'assemblyname', 'varchar', '单行文本【25】', '0', 'sys_tablesremark assemblyname', '0', '0', '0', null, 'sys_tablesremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否可以清除数据0否1是', '2', null, 'candeletedata', 'int', '整型数字', '0', 'sys_tablesremark candeletedata', '0', '0', '0', '0', 'sys_tablesremark', null, null, 'NUMBER', '0', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('保存正文使用那些列作为文件名', '4', null, 'filenamecol', 'varchar', '单行文本【250】', '0', 'sys_tablesremark filenamecol', '0', '0', '0', null, 'sys_tablesremark', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所处目录', '3', null, 'foldertype', 'int', '整型数字', '0', 'sys_tablesremark foldertype', '0', '0', '0', '0', 'sys_tablesremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('model类的完全限定名（即包括命名空间）', '13', null, 'fullclassname', 'varchar', '单行文本【50】', '0', 'sys_tablesremark fullclassname', '0', '0', '0', null, 'sys_tablesremark', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('java用model类的完全限定名（即包括包名）', '14', null, 'javafullclassname', 'varchar', '单行文本【50】', '0', 'sys_tablesremark javafullclassname', '0', '0', '0', null, 'sys_tablesremark', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键列名', '9', null, 'pkname', 'varchar', '单行文本【25】', '0', 'sys_tablesremark pkname', '0', '0', '0', null, 'sys_tablesremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('备注', '8', null, 'remark', 'varchar', '单行文本【150】', '0', 'sys_tablesremark remark', '0', '0', '0', null, 'sys_tablesremark', null, '150', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('第一排序字段', '5', null, 'sortcolname', 'varchar', '单行文本【50】', '0', 'sys_tablesremark sortcolname', '0', '0', '0', null, 'sys_tablesremark', null, '50', 'VARCHAR2', 'id ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('关联主表主键的外键', '11', null, 'summarycol', 'varchar', '单行文本【50】', '0', 'sys_tablesremark summarycol', '0', '0', '0', null, 'sys_tablesremark', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('Summarytable', '10', null, 'summarytable', 'varchar', '单行文本【25】', '0', 'sys_tablesremark summarytable', '0', '0', '0', null, 'sys_tablesremark', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('表名', '6', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_tablesremark tablename', '0', '0', '0', null, 'sys_tablesremark', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表类型', '7', null, 'tabletype', 'int', '整型数字', '0', 'sys_tablesremark tabletype', '0', '0', '0', '0', 'sys_tablesremark', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签主键或者tailorformcolid', '4', null, 'bookmarkid', 'int', '整型数字', '0', 'sys_templatebookmarks bookmarkid', '0', '0', '0', '0', 'sys_templatebookmarks', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签名称', '7', null, 'chinaname', 'varchar', '单行文本【25】', '0', 'sys_templatebookmarks chinaname', '0', '0', '0', null, 'sys_templatebookmarks', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签使用字段', '5', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_templatebookmarks colname', '0', '0', '0', null, 'sys_templatebookmarks', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签标识', '6', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_templatebookmarks constname', '0', '0', '0', null, 'sys_templatebookmarks', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_templatebookmarks delstatus', '0', '0', '0', '0', 'sys_templatebookmarks', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_templatebookmarks id', '0', '0', '0', '0', 'sys_templatebookmarks', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('书签使用的表名', '8', null, 'tablename', 'varchar', '单行文本【50】', '0', 'sys_templatebookmarks tablename', '0', '0', '0', null, 'sys_templatebookmarks', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('模板主键', '3', null, 'templateid', 'int', '整型数字', '0', 'sys_templatebookmarks templateid', '0', '0', '0', '0', 'sys_templatebookmarks', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('扫描时间', '6', null, 'addtime', 'datetime', '日期时间', '0', 'sys_url_resources addtime', '0', '0', '0', null, 'sys_url_resources', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识0：启用 1：禁用', '5', null, 'delstatus', 'int', '整型数字', '0', 'sys_url_resources delstatus', '0', '0', '0', '0', 'sys_url_resources', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('资源描述', '4', null, 'description', 'varchar', '单行文本【250】', '0', 'sys_url_resources description', '0', '0', '0', null, 'sys_url_resources', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_url_resources id', '0', '0', '0', null, 'sys_url_resources', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('资源简称', '2', null, 'simplename', 'varchar', '单行文本【25】', '0', 'sys_url_resources simplename', '0', '0', '0', null, 'sys_url_resources', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('资源url', '3', null, 'url', 'varchar', '单行文本【50】', '0', 'sys_url_resources url', '0', '0', '0', null, 'sys_url_resources', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('出生年月', '4', null, 'birth', 'datetime', '日期时间', '0', 'sys_user birth', '0', '0', '0', null, 'sys_user', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('姓名', '2', null, 'chinaname', 'varchar', '单行文本【10】', '0', 'sys_user chinaname', '0', '0', '0', null, 'sys_user', null, '10', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '1', null, 'delstatus', 'int', '整型数字', '0', 'sys_user delstatus', '0', '0', '0', '0', 'sys_user', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属部门id（直接父）', '18', null, 'deptid', 'varchar', '单行文本【25】', '0', 'sys_user deptid', '0', '0', '0', null, 'sys_user', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '17', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_user id', '0', '0', '0', null, 'sys_user', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('身份证号', '13', null, 'identitynum', 'varchar', '单行文本【9】', '0', 'sys_user identitynum', '0', '0', '0', null, 'sys_user', null, '9', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('登录名', '3', null, 'loginname', 'varchar', '单行文本【10】', '0', 'sys_user loginname', '0', '0', '0', null, 'sys_user', null, '10', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('电子邮件', '7', null, 'mail', 'varchar', '单行文本【64】', '0', 'sys_user mail', '0', '0', '0', null, 'sys_user', null, '64', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('移动电话', '8', null, 'mobile', 'varchar', '单行文本【25】', '0', 'sys_user mobile', '0', '0', '0', null, 'sys_user', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户在单位中的称呼', '16', null, 'nameindept', 'varchar', '单行文本【100】', '0', 'sys_user nameindept', '0', '0', '0', null, 'sys_user', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('密码', '6', null, 'password', 'varchar', '单行文本【32】', '0', 'sys_user password', '0', '0', '0', null, 'sys_user', null, '32', 'VARCHAR2', ' ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('菜单权限', '14', null, 'permstring', 'text', '多行文本', '0', 'sys_user permstring', '0', '0', '0', null, 'sys_user', null, null, 'CLOB', ',0,', 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('人员角色', '11', null, 'personroles', 'varchar', '单行文本【500】', '0', 'sys_user personroles', '0', '0', '0', null, 'sys_user', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('单位电话', '9', null, 'phonedept', 'varchar', '单行文本【25】', '0', 'sys_user phonedept', '0', '0', '0', null, 'sys_user', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('家庭电话', '10', null, 'phonehome', 'varchar', '单行文本【25】', '0', 'sys_user phonehome', '0', '0', '0', null, 'sys_user', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('性别', '5', null, 'sex', 'int', '整型数字', '0', 'sys_user sex', '0', '0', '0', '0', 'sys_user', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('用户签名图片存放路径', '15', null, 'signimagepath', 'varchar', '单行文本【100】', '0', 'sys_user signimagepath', '0', '0', '0', null, 'sys_user', null, '100', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('在部门中的排序号', '12', null, 'sortindex', 'int', '整型数字', '0', 'sys_user sortindex', '0', '0', '0', '0', 'sys_user', null, null, 'NUMBER', '50 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位id', '19', null, 'unitid', 'varchar', '单行文本【25】', '0', 'sys_user unitid', '0', '0', '0', null, 'sys_user', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('人员之间的排序号', '20', null, 'userindex', 'int', '整型数字', '0', 'sys_user userindex', '0', '0', '0', '0', 'sys_user', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('创建时间', '6', null, 'creatdate', 'datetime', '日期时间', '0', 'sys_user_group creatdate', '0', '0', '0', null, 'sys_user_group', null, null, 'DATE', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('添加人', '5', null, 'creatid', 'varchar', '单行文本【25】', '0', 'sys_user_group creatid', '0', '0', '0', null, 'sys_user_group', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('删除标识', '4', null, 'delstatus', 'int', '整型数字', '0', 'sys_user_group delstatus', '0', '0', '0', '0', 'sys_user_group', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('关联账号组id', '2', null, 'groupid', 'varchar', '单行文本【25】', '0', 'sys_user_group groupid', '0', '0', '0', null, 'sys_user_group', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_user_group id', '0', '0', '0', null, 'sys_user_group', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('账号id', '3', null, 'userid', 'varchar', '单行文本【25】', '0', 'sys_user_group userid', '0', '0', '0', null, 'sys_user_group', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子表名称', '3', null, 'chinaname', 'varchar', '单行文本【50】', '0', 'sys_virtualsubtable chinaname', '0', '0', '0', null, 'sys_virtualsubtable', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('汇总限制标题列', '18', null, 'collectdisplayfield', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtable collectdisplayfield', '0', '0', '0', null, 'sys_virtualsubtable', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('标识常量', '10', null, 'constname', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtable constname', '0', '0', '0', null, 'sys_virtualsubtable', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_virtualsubtable delstatus', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理删除数据请求地址', '13', null, 'destroydataaction', 'varchar', '单行文本【50】', '0', 'sys_virtualsubtable destroydataaction', '0', '0', '0', null, 'sys_virtualsubtable', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('关联父表的列名称', '17', null, 'foreignkeycolumn', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtable foreignkeycolumn', '0', '0', '0', null, 'sys_virtualsubtable', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_virtualsubtable id', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('获取数据的请求地址', '15', null, 'loaddataaction', 'varchar', '单行文本【50】', '0', 'sys_virtualsubtable loaddataaction', '0', '0', '0', null, 'sys_virtualsubtable', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否允许多选', '6', null, 'multiselect', 'int', '整型数字', '0', 'sys_virtualsubtable multiselect', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('新数据格式', '14', null, 'newdata', 'varchar', '单行文本【500】', '0', 'sys_virtualsubtable newdata', '0', '0', '0', null, 'sys_virtualsubtable', null, '500', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('列表页面所在目录距离根目录的层级，如：若一级：../  二级：../../  以此类推', '16', null, 'pagerootpath', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtable pagerootpath', '0', '0', '0', null, 'sys_virtualsubtable', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('页大小', '8', null, 'pagesize', 'int', '整型数字', '0', 'sys_virtualsubtable pagesize', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否显示分页', '7', null, 'pagination', 'int', '整型数字', '0', 'sys_virtualsubtable pagination', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('保存数据请求地址', '12', null, 'savedataaction', 'varchar', '单行文本【50】', '0', 'sys_virtualsubtable savedataaction', '0', '0', '0', null, 'sys_virtualsubtable', null, '50', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否显示汇总行', '9', null, 'showfooter', 'int', '整型数字', '0', 'sys_virtualsubtable showfooter', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否显示行号', '5', null, 'shownumber', 'int', '整型数字', '0', 'sys_virtualsubtable shownumber', '0', '0', '0', '0', 'sys_virtualsubtable', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子表配置信息', '11', null, 'subtableconfig', 'text', '多行文本', '0', 'sys_virtualsubtable subtableconfig', '0', '0', '0', null, 'sys_virtualsubtable', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表名称', '4', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtable tablename', '0', '0', '0', null, 'sys_virtualsubtable', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('所属单位id', '19', null, 'unitid', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtable unitid', '0', '0', '0', null, 'sys_virtualsubtable', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('子表名称', '5', null, 'chinaname', 'varchar', '单行文本【50】', '0', 'sys_virtualsubtablecol chinaname', '0', '0', '0', null, 'sys_virtualsubtablecol', null, '50', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('汇总规则', '11', null, 'collectrule', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtablecol collectrule', '0', '0', '0', null, 'sys_virtualsubtablecol', null, '25', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('列名称', '4', null, 'colname', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtablecol colname', '0', '0', '0', null, 'sys_virtualsubtablecol', null, '25', 'VARCHAR2', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('列的宽度', '6', null, 'colwidth', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtablecol colwidth', '0', '0', '0', null, 'sys_virtualsubtablecol', null, '25', 'VARCHAR2', ' ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('禁用标识', '2', null, 'delstatus', 'int', '整型数字', '0', 'sys_virtualsubtablecol delstatus', '0', '0', '0', '0', 'sys_virtualsubtablecol', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('是否启用汇总', '10', null, 'enablecollect', 'int', '整型数字', '0', 'sys_virtualsubtablecol enablecollect', '0', '0', '0', '0', 'sys_virtualsubtablecol', null, null, 'NUMBER', '0 ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_virtualsubtablecol id', '0', '0', '0', '0', 'sys_virtualsubtablecol', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('排序编号', '8', null, 'sortindex', 'int', '整型数字', '0', 'sys_virtualsubtablecol sortindex', '0', '0', '0', '0', 'sys_virtualsubtablecol', null, null, 'NUMBER', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字表主键', '9', null, 'subtableid', 'int', '整型数字', '0', 'sys_virtualsubtablecol subtableid', '0', '0', '0', '0', 'sys_virtualsubtablecol', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('物理表名称', '3', null, 'tablename', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtablecol tablename', '0', '0', '0', null, 'sys_virtualsubtablecol', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('单元格对齐方式(left;center;right)', '7', null, 'textalign', 'varchar', '单行文本【25】', '0', 'sys_virtualsubtablecol textalign', '0', '0', '0', null, 'sys_virtualsubtablecol', null, '25', 'VARCHAR2', 'left ', 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('大文本字段值', '3', null, 'col_big_value', 'text', '多行文本', '0', 'sys_virtual_col_value col_big_value', '0', '0', '0', null, 'sys_virtual_col_value', null, null, 'CLOB', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('字段的值', '2', null, 'col_value', 'varchar', '单行文本【250】', '0', 'sys_virtual_col_value col_value', '0', '0', '0', null, 'sys_virtual_col_value', null, '250', 'VARCHAR2', null, 'Y', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'varchar', '单行文本【25】', '0', 'sys_virtual_col_value id', '0', '0', '0', null, 'sys_virtual_col_value', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('业务表对应记录的主键', '5', null, 'record_id', 'varchar', '单行文本【25】', '0', 'sys_virtual_col_value record_id', '0', '0', '0', null, 'sys_virtual_col_value', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('该虚拟字段所属表单字段表的主键', '4', null, 'tailorformcol_id', 'varchar', '单行文本【25】', '0', 'sys_virtual_col_value tailorformcol_id', '0', '0', '0', null, 'sys_virtual_col_value', null, '25', 'VARCHAR2', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键', '1', null, 'id', 'int', '整型数字', '0', 'sys_workflow_pk_number id', '0', '0', '0', '0', 'sys_workflow_pk_number', null, null, 'NUMBER', null, 'N', null, '0');
INSERT INTO `sys_colsremark` VALUES ('主键名', '2', null, 'id_name', 'varchar', '单行文本【25】', '0', 'sys_workflow_pk_number id_name', '0', '0', '0', null, 'sys_workflow_pk_number', null, '25', 'VARCHAR2', null, 'Y', null, '0');

-- ----------------------------
-- Table structure for sys_datas_privilege
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_datas_privilege`;
CREATE TABLE `sys_datas_privilege` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `SIMPLE_NAME` varchar(50) NOT NULL COMMENT '权限简称',
  `CONST_NAME_OR_URL` varchar(100) NOT NULL COMMENT '权限常量标识,。也可以存权限源ur',
  `GROUP_ID` varchar(50) NOT NULL COMMENT '所属权限组的id',
  `COLUMN_NAME` varchar(60) DEFAULT NULL COMMENT '权限字段',
  `SQL_CONDITION` varchar(500) COMMENT '权限条件sql 比如 ispublic>=1 and ispublic<=5 ',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据权限表';

-- ----------------------------
-- Records of sys_datas_privilege
-- ----------------------------

-- ----------------------------
-- Table structure for sys_datas_privilegegroup
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_datas_privilegegroup`;
CREATE TABLE `sys_datas_privilegegroup` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `SIMPLE_NAME` varchar(50) NOT NULL COMMENT '简称',
  `SQLHANDER_CONSTNAME` varchar(50) DEFAULT NULL COMMENT 'sql处理器常量标识',
  `ISCONTEXT` int DEFAULT NULL COMMENT '0：表示默认授权  1：表示基于语境的授权             （程序将根据此标识展示权限树  0：根据设定的url展示权限 1：展示配置的语境权限）',
  `DESCRIPTIONS` varchar(255) COMMENT '权限组描述',
  `PRIVILEGECOLUMNNAME` varchar(50) DEFAULT NULL COMMENT '权限字段',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识0：启用 1：禁用',
  `ISDEFAULT` int NOT NULL default 0 COMMENT '默认权限组,只能有一个',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据权限组信息';

-- ----------------------------
-- Records of sys_datas_privilegegroup
-- ----------------------------

-- ----------------------------
-- Table structure for sys_datas_privilege_grant
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_datas_privilege_grant`;
CREATE TABLE `sys_datas_privilege_grant` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `RESOURCEID` varchar(50) NOT NULL COMMENT '资源id',
  `SQLHANDER_CONSTNAME` varchar(50) DEFAULT NULL COMMENT '权限组sql处理器标识',
  `PRIVILEGEFLAGS` varchar(255) COMMENT '对于范围设定表示权限常量标识，对于精确设定表示权限值',
  `GRANT_OBJECTID` varchar(50) NOT NULL COMMENT '被授权对象的id 可能是角色id、部门id等',
  `GROUPID` varchar(50) NOT NULL COMMENT '权限组id',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识 0：启用 1：禁用',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='授权信息记录表';

-- ----------------------------
-- Records of sys_datas_privilege_grant
-- ----------------------------



-- ----------------------------
-- Table structure for sys_def_tailorform
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_def_tailorform`;
CREATE TABLE `sys_def_tailorform` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `CHINANAME` varchar(100) NOT NULL COMMENT '表单名称',
  `PATH` varchar(100) DEFAULT NULL COMMENT '表单保存路径',
  `TABLENAME` varchar(50) NOT NULL COMMENT '物理表名称',
  `TASKTITLECOLUMN` varchar(50) DEFAULT NULL COMMENT '任务标题字段',
  `TASKTITLEPREFIX` varchar(255) COMMENT '任务标题前缀',
  `PRINTPATH` varchar(100) DEFAULT NULL COMMENT '表单打印路径',
  `ADDER` varchar(50) NOT NULL default 0 COMMENT '添加人',
  `ADDTIME` datetime NOT NULL default CURRENT_TIMESTAMP COMMENT '增加时间',
  `MODER` varchar(50) NOT NULL default 0 COMMENT '最后修改者',
  `MODTIME` datetime NOT NULL default CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `ADDERDEPTID` varchar(50) DEFAULT NULL COMMENT '所属单位',
  `ADDERUNITID` varchar(50) DEFAULT NULL COMMENT '所属部门',
  `UNITID` longtext COMMENT '使用单位',
  `UNITNAME` longtext COMMENT '使用单位名称',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='电子表单定义表';

-- ----------------------------
-- Records of sys_def_tailorform
-- ----------------------------

-- ----------------------------
-- Table structure for sys_def_tailorformcol
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_def_tailorformcol`;
CREATE TABLE `sys_def_tailorformcol` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL  default 0 COMMENT '禁用标识',
  `TAILORFORMID` bigint DEFAULT NULL COMMENT '表单主键',
  `CHINANAME` varchar(100) NOT NULL COMMENT '表单显示的列名称',
  `TABLENAME` varchar(50) DEFAULT NULL COMMENT '物理表名称',
  `COLNAME` varchar(50) DEFAULT NULL COMMENT '物理表列名称',
  `ISMINDCOL` int NOT NULL  default 0 COMMENT '是否意见字段',
  `FORMUSERULE` int NOT NULL  default 1 COMMENT '表单使用规则',
  `SOURCECOL` varchar(100) DEFAULT NULL COMMENT '绑定列源',
  `COL_TYPE` int DEFAULT NULL COMMENT '字段类型，可以根据此列的值，构造对应的表单控件',
  `CATEGORYCONSTNAME` varchar(50) DEFAULT NULL COMMENT '绑定字典项标识',
  `FMTTYPETIME` varchar(50) default 'default' COMMENT '时间格式',
  `REQUIRED` int DEFAULT 0 COMMENT '必填项',
  `VALIDDATA` varchar(100) DEFAULT NULL COMMENT '数据校验格式',
  PRIMARY KEY (`ID`),
  KEY `IX_DEF_FORMCOL_TAILORFORMID` (`TAILORFORMID`,`DELSTATUS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='电子表单字段定义表';

-- ----------------------------
-- Records of sys_def_tailorformcol
-- ----------------------------

-- ----------------------------
-- Table structure for sys_def_tailorformcontent
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_def_tailorformcontent`;
CREATE TABLE `sys_def_tailorformcontent` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `TAILORFORMID` bigint NOT NULL COMMENT '表单主键',
  `FORMCONTENT` longtext COMMENT '表单内容',
  PRIMARY KEY (`ID`),
  KEY `IX_DEF_FORMCONTENT` (`TAILORFORMID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='电子表单定义表';

-- ----------------------------
-- Records of sys_def_tailorformcontent
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `UNITCODE` varchar(200) DEFAULT NULL COMMENT '部门编码',
  `DEPTLEVEL` bigint DEFAULT 0 COMMENT '部门级别 单位/部门/科室',
  `DEPTLEADERS` varchar(50) DEFAULT 0  COMMENT '部门负责人',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识',
  `SORTINDEX` integer NOT NULL default 50 COMMENT '排序号',
  `SEARCHCODE` varchar(50) DEFAULT NULL COMMENT '快速查询编码    使用该字段可以不用递归即可获取到指定部门下所有子部门   规则：   第一层第一个节点：001   第二层第一个节点：001001',
  `PERMSTRING` longtext COMMENT '部门拥有的菜单',
  `SIMPLECHINANAME` varchar(50) DEFAULT NULL COMMENT '部门简称',
  `CHINANAME` varchar(50) NOT NULL COMMENT '部门名称',
  `PARENTID` varchar(50) DEFAULT NULL COMMENT '上级部门',
  `UNITID` varchar(50) DEFAULT NULL COMMENT '所属单位',
  `FAXPHONE` varchar(15) DEFAULT NULL COMMENT '传真号码',
  `PHONETIC` varchar(20) DEFAULT NULL COMMENT '名称首字母',
  `CONTACTPHONE` varchar(50) DEFAULT NULL COMMENT '联系方式',
  PRIMARY KEY (`ID`),
  KEY `IX_SYS_DEPT` (`SORTINDEX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='单位部门表';

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES ('a08182bd5b423915015b423bd9500000154750', null, '0', null, '0', '1', '000000000100001', ',0,', null, '泰山街道', 'a08182c1589943c401589980d59c0000112147', 'a08182ea499e8d3301499e9a2050000f192541', null, null, null);
INSERT INTO `sys_dept` VALUES ('a08182bd5b423915015b423e46600001155029', null, '0', null, '0', '1', '00000000010000100001', ',0,', null, '泰山社区1', 'a08182bd5b423915015b423bd9500000154750', 'a08182ea499e8d3301499e9a2050000f192541', null, null, null);
INSERT INTO `sys_dept` VALUES ('a08182bd5b423915015b423e911b0002155048', null, '0', null, '0', '2', '00000000010000100002', ',0,', null, '泰山社区2', 'a08182bd5b423915015b423bd9500000154750', 'a08182ea499e8d3301499e9a2050000f192541', null, null, null);
INSERT INTO `sys_dept` VALUES ('a08182bd5b423915015b423ec2560003155100', null, '0', null, '0', '3', '00000000010000100003', ',0,', null, '泰山社区3', 'a08182bd5b423915015b423bd9500000154750', 'a08182ea499e8d3301499e9a2050000f192541', null, null, null);
INSERT INTO `sys_dept` VALUES ('a08182c1589943c401589980d59c0000112147', null, '0', null, '0', '2', '0000000001', ',0,', null, '玄武区', 'a08182ea499e8d3301499e9a2050000f192541', 'a08182ea499e8d3301499e9a2050000f192541', null, null, null);
INSERT INTO `sys_dept` VALUES ('a08182ea499e8d3301499e9a2050000f192541', null, '1', null, '0', '0', '00000', ',0,', null, '南京市', '-1', null, null, null, null);

-- ----------------------------
-- Table structure for sys_effectdate
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_effectdate`;
CREATE TABLE `sys_effectdate` (
  `WORKDATE` datetime NOT NULL COMMENT '日期',
  `ISVALID` integer DEFAULT NULL COMMENT '是否是有效工作日',
  `YEAR` integer NOT NULL COMMENT '年',
  `MONTH` int NOT NULL COMMENT '月',
  `DAY` int NOT NULL COMMENT '日',
  `ID` varchar(50) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作日设置表';

-- ----------------------------
-- Records of sys_effectdate
-- ----------------------------

-- ----------------------------
-- Table structure for sys_exceptionlog
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_exceptionlog`;
CREATE TABLE `sys_exceptionlog` (
  `ID` bigint NOT NULL COMMENT '主键',
  `USERID` bigint NOT NULL COMMENT '操作者主键',
  `USERNAME` varchar(50) NOT NULL COMMENT '操作者姓名',
  `EXCEPTIONTIME` datetime NOT NULL COMMENT '异常时间',
  `CLASSNAME` varchar(100) NOT NULL COMMENT '异常类路径',
  `METHODNAME` varchar(100) NOT NULL COMMENT '异常方法',
  `UNITID` bigint NOT NULL COMMENT '单位ID',
  `DEPTID` bigint NOT NULL COMMENT '部门ID',
  `DESCRIPTION` longtext COMMENT '异常信息',
  PRIMARY KEY (`ID`),
  KEY `IX_EXCEPTIONLOG_USERID` (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='异常日志表';

-- ----------------------------
-- Records of sys_exceptionlog
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `NAME` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `MAINURL` varchar(250) COMMENT '菜单主页',
  `SORTINDEX` bigint DEFAULT 50 COMMENT '排序号',
  `DESKICON` varchar(100) DEFAULT NULL COMMENT '桌面图标',
  `MENUICON` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `ISPARENT` varchar(5) NOT NULL default 'false' COMMENT '是否是父节点,true or false',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识',
  `ID` varchar(50) not NULL COMMENT '主键',
  `PARENTID` varchar(50) DEFAULT NULL COMMENT '父id',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('自定义模板管理', 'platform/CustomTemplate/CustomTemplate_list.htm', '111', 'platform/Styles/DeskIcon/bgzp_icon4.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', '962', '913');
INSERT INTO `sys_menu` VALUES ('系统配置', 'platform/', '9999', 'platform/Styles/DeskIcon/bgzp_icon1.png', 'platform/Styles/MenuIcon/heart.png', 'true', '0', '1', null);
INSERT INTO `sys_menu` VALUES ('平台测试', 'platform/', '50', 'platform/Styles/DeskIcon/bgzp_icon1.png', 'platform/Styles/MenuIcon/magnifier.png', 'true', '0', '884', null);
INSERT INTO `sys_menu` VALUES ('单位管理', 'platform/Organization/Dept_manager_page.htm', '10', 'platform/Styles/DeskIcon/bgzp_icon1.png', 'platform/Styles/MenuIcon/book.png', 'false', '0', '872', '1');
INSERT INTO `sys_menu` VALUES ('物理表创建', 'platform/SystemManager/TableCreate/table_create.html', '50', 'platform/Styles/DeskIcon/bgzp_icon4.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', '1359', '1');
INSERT INTO `sys_menu` VALUES ('权限配置', 'platform/dataprivilege/privileges/privileges.html', '10', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/wrench_orange.png', 'false', '0', 'a08182bd4c72cd10014c738a3e9d0003', 'a08182bd4c3621e0014c366dd9860000');
INSERT INTO `sys_menu` VALUES ('用户自定义表单管理', 'platform/UserTailorFormManager/TailorFormManagerPage.htm', '0', 'platform/Styles/DeskIcon/bgzp_icon4.png', 'platform/Styles/MenuIcon/report.png', 'false', '0', 'a08182c14d8a5cb4014d8dcdbb7d0000', '913');
INSERT INTO `sys_menu` VALUES ('缓存测试', 'platform/cache/cache_test.html', '55', 'platform/Styles/DeskIcon/bgzp_icon1.png', 'platform/Styles/MenuIcon/building_edit.png', 'false', '0', '297e990152ee4ad20152ee561e7f0000', '884');
INSERT INTO `sys_menu` VALUES ('人员管理', 'platform/Organization/User_manager_page.htm', '2', 'platform/Styles/DeskIcon/bgzp_icon27.png', 'platform/Styles/MenuIcon/user_gray.png', 'false', '0', 'a08182c156264ae10156265227410001', '1');
INSERT INTO `sys_menu` VALUES ('UM文本编辑器', 'platform/texteditor/umeditor1_2_2/editor.htm', '15', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/color_wheel.png', 'false', '0', 'a08182bd4a955dd2014a95a2c8770000', '884');
INSERT INTO `sys_menu` VALUES ('权限管理', 'platform/', '70', 'platform/Styles/DeskIcon/bgzp_icon32.png', 'platform/Styles/MenuIcon/wrench.png', 'true', '0', 'a08182bd4c3621e0014c366dd9860000', null);
INSERT INTO `sys_menu` VALUES ('授权配置', 'platform/dataprivilege/grant/grant.html', '1', 'platform/Styles/DeskIcon/bgzp_icon1.png', 'platform/Styles/MenuIcon/wrench.png', 'false', '0', 'a08182bd4c464421014c498c9a880000', 'a08182bd4c3621e0014c366dd9860000');


INSERT INTO `sys_menu` VALUES ('加解密工具', 'platform/Tools/SkyEnCodeToolPage.htm', '1', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/wrench.png', 'false', '0', '923', '922');
INSERT INTO `sys_menu` VALUES ('UE文本编辑器', 'platform/texteditor/ueditor1_4_3/ueditor.htm', '20', 'platform/Styles/DeskIcon/bgzp_icon16.png', 'platform/Styles/MenuIcon/book_edit.png', 'false', '0', 'a08182bd4a98cce3014a98f396980000', '884');
INSERT INTO `sys_menu` VALUES ('资源配置', 'platform/dataprivilege/resourceConfig/resourceConfig.html', '5', 'platform/Styles/DeskIcon/bgzp_icon14.png', 'platform/Styles/MenuIcon/wrench_orange.png', 'false', '0', 'a081820b4c6873c4014c6882b1fd0000', 'a08182bd4c3621e0014c366dd9860000');
INSERT INTO `sys_menu` VALUES ('系统操作日志', 'platform/SystemManager/SystemLogManager/OperationlogManager.htm', '50', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', '905', '1');
INSERT INTO `sys_menu` VALUES ('系统数据维护', 'platform/SystemManager/DataBaseManager/DataBaseManager.htm', '60', 'platform/Styles/DeskIcon/bgzp_icon28.png', 'platform/Styles/MenuIcon/database_gear.png', 'false', '0', '907', '1');
INSERT INTO `sys_menu` VALUES ('表单定制', 'platform/TailorFormManager/TailorFormManagerPage.htm', '1', 'platform/Styles/DeskIcon/bgzp_icon19.png', 'platform/Styles/MenuIcon/book_edit.png', 'false', '0', '914', '913');
INSERT INTO `sys_menu` VALUES ('表单子表配置', 'platform/SubTailorFormManager/SubTailorFormManager.htm', '2', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/book_add.png', 'false', '0', '915', '913');
INSERT INTO `sys_menu` VALUES ('书签管理', 'platform/TemplateManager/BookMarkeManager.htm', '3', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/book.png', 'false', '0', '916', '913');
INSERT INTO `sys_menu` VALUES ('WebOffice', 'platform/TemplateManager/BookMarkeInsert.htm', '4', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/report.png', 'false', '1', '917', '913');
INSERT INTO `sys_menu` VALUES ('附件上传', 'platform/Demo/UploadFileDemo.htm', '1', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/bullet_disk.png', 'false', '0', '924', '884');
INSERT INTO `sys_menu` VALUES ('表单模板打印测试', 'platform/WorkFlow/FlowInstance/TailorFormWorkFlow.htm?constname=oldtest', '3', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/printer.png', 'false', '0', '926', '884');
INSERT INTO `sys_menu` VALUES ('表单子表测试', 'platform/SubTailorFormManager/VirtualSubTable.htm', '4', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/database_gear.png', 'false', '0', '927', '884');
INSERT INTO `sys_menu` VALUES ('自定义列表测试', 'platform/Demo/AutoPageListTest.htm', '5', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/book_delete.png', 'false', '0', '928', '884');
INSERT INTO `sys_menu` VALUES ('有效工作日管理', 'platform/SystemManager/EffectDateConfigEditPage.htm', '35', 'platform/Styles/DeskIcon/bgzp_icon16.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', '964', '1');
INSERT INTO `sys_menu` VALUES ('字典管理', 'platform/SystemManager/Category/CategoryManagerPage.htm', '25', 'platform/Styles/deskicon/bgzp_icon15.png', 'platform/Styles/MenuIcon/report.png', 'false', '0', '2', '1');
INSERT INTO `sys_menu` VALUES ('账号管理', 'platform/Organization/User_manager_page.htm', '20', 'platform/Styles/DeskIcon/bgzp_icon12.png', 'platform/Styles/MenuIcon/color_wheel.png', 'false', '0', '876', '1');
INSERT INTO `sys_menu` VALUES ('实施', 'platform/sdfsdf', '50', 'platform/Styles/DeskIcon/bgzp_icon16.png', 'platform/Styles/MenuIcon/user_green.png', 'true', '0', '901', '886');
INSERT INTO `sys_menu` VALUES ('API权限管理', 'platform/Authority/ApiManagerPage.htm', '45', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/rosette.png', 'false', '0', '904', '1');
INSERT INTO `sys_menu` VALUES ('系统异常日志', 'platform/SystemManager/SystemLogManager/ExceptionLogManager.htm', '55', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', '906', '1');
INSERT INTO `sys_menu` VALUES ('物理表列表', 'platform/SystemManager/TablesStruck/TablesRemarkManagePage.htm', '30', 'platform/Styles/DeskIcon/bgzp_icon17.png', 'platform/Styles/MenuIcon/application_cascade.png', 'false', '0', '908', '1');
INSERT INTO `sys_menu` VALUES ('书签管理-临时', 'platform/TemplateManager/BookMarkeManager.htm', '50', 'platform/Styles/DeskIcon/bgzp_icon7.png', 'platform/Styles/MenuIcon/chart_pie.png', 'false', '0', 'a08182d8557274f3015572baac470009', '1');
INSERT INTO `sys_menu` VALUES ('电子表单管理', 'platform/', '40', 'platform/Styles/DeskIcon/bgzp_icon4.png', 'platform/Styles/MenuIcon/application_cascade.png', 'true', '0', '913', null);
INSERT INTO `sys_menu` VALUES ('自定义列表配置', 'platform/PageListManager/PageListManager.htm', '5', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/application_cascade.png', 'false', '0', '918', '913');
INSERT INTO `sys_menu` VALUES ('首页', 'platform/', '8', 'platform/Styles/DeskIcon/bgzp_icon10.png', 'platform/Styles/MenuIcon/house.png', 'true', '0', '919', null);
INSERT INTO `sys_menu` VALUES ('修改密码', 'platform/MainPage/ChangePassword.htm', '11', 'platform/Styles/DeskIcon/bgzp_icon27.png', 'platform/Styles/MenuIcon/user.png', 'false', '0', '959', '1');
INSERT INTO `sys_menu` VALUES ('系统工具', 'platform/', '60', 'platform/Styles/DeskIcon/bgzp_icon28.png', 'platform/Styles/MenuIcon/cog.png', 'true', '0', '922', null);
INSERT INTO `sys_menu` VALUES ('菜单管理', 'platform/SystemManager/SystemMenu/MenuManagePage.htm', '5', 'platform/Styles/DeskIcon/bgzp_icon1.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', '871', '1');
INSERT INTO `sys_menu` VALUES ('角色管理', 'platform/Authority/RoleManagerPage.htm', '15', 'platform/Styles/DeskIcon/bgzp_icon17.png', 'platform/Styles/MenuIcon/award_star_add.png', 'false', '0', '874', '1');
INSERT INTO `sys_menu` VALUES ('通知公告', 'platform', '5', 'platform/Styles/DeskIcon/bgzp_icon19.png', 'platform/Styles/MenuIcon/award_star_bronze_2.png', 'true', '0', 'a08182bd5b6757d3015b675bdf0e0000', null);
INSERT INTO `sys_menu` VALUES ('登记通知', 'platform/notice/notice_add.html', '5', 'platform/Styles/DeskIcon/bgzp_icon17.png', 'platform/Styles/MenuIcon/book_edit.png', 'false', '0', 'a08182bd5b6757d3015b675d3ee30001', 'a08182bd5b6757d3015b675bdf0e0000');
INSERT INTO `sys_menu` VALUES ('查询通知', 'platform/notice/notice_list.html', '10', 'platform/Styles/DeskIcon/bgzp_icon17.png', 'platform/Styles/MenuIcon/application_view_columns.png', 'false', '0', 'a08182bd5b6757d3015b675d943a0002', 'a08182bd5b6757d3015b675bdf0e0000');

-- ----------------------------
-- Table structure for sys_menuoperation
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_menuoperation`;
CREATE TABLE `sys_menuoperation` (
  `ELEMENTID` varchar(36) NOT NULL COMMENT '元素id值，来自于元素在页面使用的id值',
  `CHINANAME` varchar(100) NOT NULL COMMENT '元素中文描述',
  `WEBAPIPATH` varchar(100) DEFAULT NULL COMMENT 'Controller+Action',
  `ICONCLS` varchar(20) DEFAULT NULL COMMENT '按钮图标',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识 ',
  `SORTINDEX` bigint NOT NULL default 50 COMMENT '排序号',
  `JSFUNCTION` varchar(50) DEFAULT NULL COMMENT '前台js函数名',
  `ID` varchar(50) not NULL,
  `MENUID` varchar(50) DEFAULT NULL COMMENT '菜单id',
  `CONSTNAME` varchar(50) DEFAULT NULL COMMENT '唯一标识',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单对应页面的操作按钮信息表';

-- ----------------------------
-- Records of sys_menuoperation
-- ----------------------------

-- ----------------------------
-- Table structure for sys_model_pk_number
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_model_pk_number`;
CREATE TABLE `sys_model_pk_number` (
  `ID` bigint(20) NOT NULL COMMENT '主键',
  `ID_value` bigint(20) COMMENT '主键值',
  `ID_Name` varchar(20) COMMENT '主键名',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数字类型的主键表';

-- ----------------------------
-- Records of sys_model_pk_number
-- ----------------------------
INSERT INTO `sys_model_pk_number` VALUES ('1258', '1258', 'default');

-- ----------------------------
-- Table structure for sys_model_pk_number_detail
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_model_pk_number_detail`;
CREATE TABLE `sys_model_pk_number_detail` (
  `TRANSFER_DETAIL_PK` bigint NOT NULL COMMENT '主键',
  `ID_NAME` varchar(50) DEFAULT NULL COMMENT '主键名',
  PRIMARY KEY (`TRANSFER_DETAIL_PK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数字类型的主键表';

-- ----------------------------
-- Records of sys_model_pk_number_detail
-- ----------------------------

-- ----------------------------
-- Table structure for sys_model_pk_number_judge
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_model_pk_number_judge`;
CREATE TABLE `sys_model_pk_number_judge` (
  `JUDGE_ID` bigint NOT NULL COMMENT '主键',
  `ID_NAME` varchar(50) DEFAULT NULL COMMENT '主键名',
  PRIMARY KEY (`JUDGE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数字类型的主键表';

-- ----------------------------
-- Records of sys_model_pk_number_judge
-- ----------------------------

-- ----------------------------
-- Table structure for sys_model_pk_number_log
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_model_pk_number_log`;
CREATE TABLE `sys_model_pk_number_log` (
  `NUM_ID` bigint DEFAULT NULL COMMENT '主键',
  `ID_NAME` varchar(50) DEFAULT NULL COMMENT '主键名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数字类型的主键表';

-- ----------------------------
-- Records of sys_model_pk_number_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_model_pk_number_qzhlog
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_model_pk_number_qzhlog`;
CREATE TABLE `sys_model_pk_number_qzhlog` (
  `TID` bigint NOT NULL COMMENT '主键',
  `ID_NAME` varchar(50) DEFAULT NULL COMMENT '主键名',
  PRIMARY KEY (`TID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数字类型的主键表';

-- ----------------------------
-- Records of sys_model_pk_number_qzhlog
-- ----------------------------

-- ----------------------------
-- Table structure for sys_model_pk_string
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_model_pk_string`;
CREATE TABLE `sys_model_pk_string` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `ID_NAME` varchar(50) DEFAULT NULL COMMENT '主键名',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字符类型的主键表';

-- ----------------------------
-- Records of sys_model_pk_string
-- ----------------------------

-- ----------------------------
-- Table structure for sys_operationlog
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_operationlog`;
CREATE TABLE `sys_operationlog` (
  `ID` bigint NOT NULL COMMENT '主键',
  `USERID` bigint NOT NULL COMMENT '操作者主键',
  `USERNAME` varchar(10) NOT NULL COMMENT '操作者姓名',
  `OPERATETIME` datetime NOT NULL COMMENT '操作时间',
  `CLASSNAME` varchar(100) NOT NULL COMMENT '操作类路径',
  `METHODNAME` varchar(100) NOT NULL COMMENT '操作方法',
  `DESCRIPTION` varchar(100) DEFAULT NULL COMMENT '方法描述',
  `UNITID` bigint NOT NULL COMMENT '单位ID',
  `DEPTID` bigint NOT NULL COMMENT '部门ID',
  `PARAMETERSVALUE` longtext COMMENT '方法参数值',
  PRIMARY KEY (`ID`),
  KEY `IX_OPERATIONLOG_USERID` (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作日志记录表';

-- ----------------------------
-- Records of sys_operationlog
-- ----------------------------

-- ----------------------------
-- Table structure for sys_roles
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_roles`;
CREATE TABLE `sys_roles` (
  `CHINANAME` varchar(50) NOT NULL COMMENT '角色名称',
  `DELSTATUS` int DEFAULT 0 COMMENT '删除标识',
  `SORTINDEX` bigint NOT NULL COMMENT '排序号',
  `PERMSTRING` longtext COMMENT '菜单权限',
  `CONSTNAME` varchar(20) DEFAULT NULL COMMENT '角色标识',
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `CAN_USE_ROLEIDS` longtext COMMENT '当前角色可以给用户分配的角色  防止通过角色的分配来越权',
  `ADDID` varchar(50) NOT NULL COMMENT '添加用户的主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of sys_roles
-- ----------------------------
INSERT INTO `sys_roles` VALUES ('超级管理员', '0', '1', 'a08182bd5b6757d3015b675bdf0e0000,a08182bd5b6757d3015b675d3ee30001,a08182bd5b6757d3015b675d943a0002,919,920,910,911,912,a08182c14d8f24fe014d8f8d500d0000,a08182c14d8f24fe014d8f8df9e80001,a08182bd529fd83f0152a098e0d80000,a08182c15746bdcc015746c2f2310000,913,a08182c14d8a5cb4014d8dcdbb7d0000,914,915,916,918,962,884,924,925,926,927,928,a08182bd4a2dc3a3014a2e1603e60001,a08182bd4a955dd2014a95a2c8770000,a08182bd4a98cce3014a98f396980000,a081820b4dd1f071014dd21f446a0008,297e990152ee4ad20152ee561e7f0000,922,923,a08182bd4c3621e0014c366dd9860000,a08182bd4c464421014c498c9a880000,a081820b4c6873c4014c6882b1fd0000,a08182bd4c72cd10014c738a3e9d0003,1,a08182c156264ae10156265227410001,871,872,959,874,876,2,908,964,904,1359,905,a08182d8557274f3015572baac470009,906,907', 'admin', '99999', '919,920,910,911,912,a08182c14d8f24fe014d8f8d500d0000,a08182c14d8f24fe014d8f8df9e80001,a08182bd529fd83f0152a098e0d80000,a08182c15746bdcc015746c2f2310000,913,a08182c14d8a5cb4014d8dcdbb7d0000,914,915,916,918,962,884,924,925,926,927,928,a08182bd4a2dc3a3014a2e1603e60001,a08182bd4a955dd2014a95a2c8770000,a08182bd4a98cce3014a98f396980000,a081820b4dd1f071014dd21f446a0008,297e990152ee4ad20152ee561e7f0000,922,923,a08182bd4c3621e0014c366dd9860000,a08182bd4c464421014c498c9a880000,a081820b4c6873c4014c6882b1fd0000,a08182bd4c72cd10014c738a3e9d0003,1,a08182c156264ae10156265227410001,871,872,959,874,876,2,908,964,904,1359,905,a08182d8557274f3015572baac470009,906,907', '99999');
INSERT INTO `sys_roles` VALUES ('泰山社区1管理员', '0', '50', ',0,', 'admin_tssq', 'a08182bd5b423915015b425a412d000e162102', null, 'a08182bd5b423915015b42528b50000a161237');
INSERT INTO `sys_roles` VALUES ('普通人员', '0', '50', ',0,', 'user', 'a08182c158a87bfc0158a87ddda70000091250', null, 'a08182bd4b3494b2014b34a48ae70000154253');
INSERT INTO `sys_roles` VALUES ('特殊人员', '0', '50', ',0,', 'sp_user', 'a08182c158a87bfc0158a87dde210001091250', null, 'a08182bd4b3494b2014b34a48ae70000154253');

-- ----------------------------
-- Table structure for sys_tablesremark
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_tablesremark`;
CREATE TABLE `sys_tablesremark` (
`ALIAS`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未定义' COMMENT '别名' ,
`CANDELETEDATA`  int(11) NULL DEFAULT NULL COMMENT '是否可以清除数据0否1是' ,
`FOLDERTYPE`  bigint(20) NOT NULL DEFAULT 0 COMMENT '所处目录' ,
`FILENAMECOL`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '保存正文使用那些列作为文件名' ,
`SORTCOLNAME`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'id' COMMENT '第一排序字段' ,
`TABLENAME`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '表名' ,
`TABLETYPE`  int(11) NOT NULL DEFAULT 0 COMMENT '物理表类型' ,
`REMARK`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`PKNAME`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '主键列名' ,
`SUMMARYTABLE`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Summarytable' ,
`SUMMARYCOL`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联主表主键的外键' ,
`ASSEMBLYNAME`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'model所在的程序集名称' ,
`FULLCLASSNAME`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'model类的完全限定名（即包括命名空间）' ,
`JAVAFULLCLASSNAME`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'java用model类的完全限定名（即包括包名）' ,
PRIMARY KEY (`TABLENAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='物理表信息表';

-- ----------------------------
-- Records of sys_tablesremark
-- ----------------------------
INSERT INTO `sys_tablesremark` VALUES ('日志表（log4j2.xml配置）', '0', '0', null, 'id', 'log_a', '0', null, null, null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('通知主表', '0', '0', null, 'id', 'notice', '0', null, 'ID', null, null, null, null, 'com.skytech.project.notice.model.Notice');
INSERT INTO `sys_tablesremark` VALUES ('通知子表-测试使用', '0', '0', null, 'id', 'noticesub', '0', null, null, null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('办公用语表', '0', '0', null, 'id', 'officediction', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程挂起信息记录表', '0', '0', null, 'id', 'suspend_info', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('附件表', '0', '0', null, 'id', 'sys_attachfile', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('用户、角色权限表', '0', '0', null, 'id', 'sys_authority', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('书签表', '0', '0', null, 'id', 'sys_bookmark', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('文书模板表', '0', '0', null, 'id', 'sys_booktemplate', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('字典主表', '0', '0', null, 'id', 'sys_category', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('字典子表', '0', '0', null, 'id', 'sys_categoryvalue', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('物理表字段信息表', '0', '0', null, 'id', 'sys_colsremark', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('委托代理设置表', '0', '0', null, 'id', 'sys_consign', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('自由流活动定义表', '0', '0', null, 'id', 'sys_custom_activity', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('自由流活动表单定义表', '0', '0', null, 'id', 'sys_custom_activityform', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('自由流流向定义表', '0', '0', null, 'id', 'sys_custom_transition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数据权限表', '0', '0', null, 'id', 'sys_datas_privilege', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数据权限组信息', '0', '0', null, 'id', 'sys_datas_privilegegroup', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('授权信息记录表', '0', '0', null, 'id', 'sys_datas_privilege_grant', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动定义表', '0', '0', null, 'id', 'sys_def_activity', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动事件定义表', '0', '0', null, 'id', 'sys_def_activityevent', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动表单定义表', '0', '0', null, 'id', 'sys_def_activityform', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动操作定义表', '0', '0', null, 'id', 'sys_def_activityoperation', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程定义人员选择条件表', '0', '0', null, 'id', 'sys_def_actorcondition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程定义表', '0', '0', null, 'id', 'sys_def_process', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('电子表单定义表', '0', '0', null, 'id', 'sys_def_tailorform', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('电子表单字段定义表', '0', '0', null, 'id', 'sys_def_tailorformcol', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('电子表单定义表', '0', '0', null, 'id', 'sys_def_tailorformcontent', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程流向条件定义表', '0', '0', null, 'id', 'sys_def_transcondition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程流向定义表', '0', '0', null, 'id', 'sys_def_transition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('单位部门表', '0', '0', null, 'id', 'sys_dept', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('工作日设置表', '0', '0', null, 'id', 'sys_effectdate', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('异常日志表', '0', '0', null, 'id', 'sys_exceptionlog', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动实例表', '0', '0', null, 'id', 'sys_ins_activity', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动实例意见表', '0', '0', null, 'id', 'sys_ins_activitymind', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('代办表', '0', '0', null, 'id', 'sys_ins_activity_backlog', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程实例表', '0', '0', null, 'id', 'sys_ins_process', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程实例表单表', '0', '0', null, 'id', 'sys_ins_processform', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程实例文书目录表', '0', '0', null, 'id', 'sys_ins_processtailorform', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动实例代理记录表', '0', '0', null, 'id', 'sys_ins_proxyactivity', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动模型表', '0', '0', null, 'id', 'sys_mdl_activity', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动事件模型表', '0', '0', null, 'id', 'sys_mdl_activityevent', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动表单模型表', '0', '0', null, 'id', 'sys_mdl_activityform', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程活动操作模型表', '0', '0', null, 'id', 'sys_mdl_activityoperation', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程模型中节点的人员选择条件', '0', '0', null, 'id', 'sys_mdl_actorcondition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程模型表', '0', '0', null, 'id', 'sys_mdl_process', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程流向条件模型表', '0', '0', null, 'id', 'sys_mdl_transcondition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('流程流向模型表', '0', '0', null, 'id', 'sys_mdl_transition', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('菜单表', '0', '0', null, 'id', 'sys_menu', '0', null, null, null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('菜单对应页面的操作按钮信息表', '0', '0', null, 'id', 'sys_menuoperation', '0', null, null, null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数字类型的主键表', '0', '0', null, 'id', 'sys_model_pk_number', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数字类型的主键表', '0', '0', null, 'id', 'sys_model_pk_number_detail', '0', null, 'TRANSFER_DETAIL_PK', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数字类型的主键表', '0', '0', null, 'id', 'sys_model_pk_number_judge', '0', null, 'JUDGE_ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数字类型的主键表', '0', '0', null, 'id', 'sys_model_pk_number_log', '0', null, null, null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数字类型的主键表', '0', '0', null, 'id', 'sys_model_pk_number_qzhlog', '0', null, 'TID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('字符类型的主键表', '0', '0', null, 'id', 'sys_model_pk_string', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('操作日志记录表', '0', '0', null, 'id', 'sys_operationlog', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('未定义', '0', '0', null, 'id', 'sys_privilege', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('角色表', '0', '0', null, 'id', 'sys_roles', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('物理表信息表', '0', '0', null, 'id', 'sys_tablesremark', '0', null, 'TABLENAME', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('书签模板关系表', '0', '0', null, 'id', 'sys_templatebookmarks', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('资源url', '0', '0', null, 'id', 'sys_url_resources', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('系统用户表', '0', '0', null, 'id', 'sys_user', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('账号关联关系表', '0', '0', null, 'id', 'sys_user_group', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('电子表单定义表', '0', '0', null, 'id', 'sys_virtualsubtable', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('电子表单子表列设置表', '0', '0', null, 'id', 'sys_virtualsubtablecol', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('使用的虚拟字段存储的值', '0', '0', null, 'id', 'sys_virtual_col_value', '0', null, 'ID', null, null, null, null, null);
INSERT INTO `sys_tablesremark` VALUES ('数字类型的主键表', '0', '0', null, 'id', 'sys_workflow_pk_number', '0', null, 'ID', null, null, null, null, null);

-- ----------------------------
-- Table structure for sys_templatebookmarks
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_templatebookmarks`;
CREATE TABLE `sys_templatebookmarks` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `TEMPLATEID` bigint NOT NULL COMMENT '模板主键',
  `BOOKMARKID` bigint NOT NULL COMMENT '书签主键或者tailorformcolid',
  `COLNAME` varchar(50) NOT NULL COMMENT '书签使用字段',
  `CONSTNAME` varchar(50) NOT NULL COMMENT '书签标识',
  `CHINANAME` varchar(50) NOT NULL COMMENT '书签名称',
  `TABLENAME` varchar(100) DEFAULT NULL COMMENT '书签使用的表名',
  PRIMARY KEY (`ID`),
  KEY `IX_SYS_TEMPLATEBOOKMARKS` (`TEMPLATEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='书签模板关系表';

-- ----------------------------
-- Records of sys_templatebookmarks
-- ----------------------------

-- ----------------------------
-- Table structure for sys_url_resources
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_url_resources`;
CREATE TABLE `sys_url_resources` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `SIMPLENAME` varchar(50) DEFAULT NULL COMMENT '资源简称',
  `URL` varchar(100) DEFAULT NULL COMMENT '资源url',
  `DESCRIPTION` varchar(255) COMMENT '资源描述',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识0：启用 1：禁用',
  `ADDTIME` datetime DEFAULT NULL COMMENT '扫描时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源url';

-- ----------------------------
-- Records of sys_url_resources
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识',
  `CHINANAME` varchar(20) NOT NULL COMMENT '姓名',
  `LOGINNAME` varchar(20) NOT NULL COMMENT '登录名',
  `BIRTH` date DEFAULT NULL COMMENT '出生年月',
  `SEX` int NOT NULL default 0 COMMENT '性别',
  `PASSWORD` varchar(64) NOT NULL default '' COMMENT '密码',
  `MAIL` varchar(128) DEFAULT NULL COMMENT '电子邮件',
  `MOBILE` varchar(50) DEFAULT NULL COMMENT '移动电话',
  `PHONEDEPT` varchar(50) DEFAULT NULL COMMENT '单位电话',
  `PHONEHOME` varchar(50) DEFAULT NULL COMMENT '家庭电话',
  `PERSONROLES` varchar(500) COMMENT '人员角色',
  `SORTINDEX` bigint NOT NULL default 50 COMMENT '在部门中的排序号',
  `IDENTITYNUM` varchar(18) DEFAULT NULL COMMENT '身份证号',
  `PERMSTRING` longtext COMMENT '菜单权限',
  `SIGNIMAGEPATH` varchar(200) DEFAULT NULL COMMENT '用户签名图片存放路径',
  `NAMEINDEPT` varchar(200) DEFAULT NULL COMMENT '用户在单位中的称呼',
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `DEPTID` varchar(50) DEFAULT NULL COMMENT '所属部门id（直接父）',
  `UNITID` varchar(50) DEFAULT NULL COMMENT '所属单位id',
  `USERINDEX` mediumint DEFAULT NULL COMMENT '人员之间的排序号',
  PRIMARY KEY (`ID`),
  KEY `IX_SYS_USER` (`LOGINNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('0', '超级管理员', 'admin', null, '0', 'OxgSE9ZMcClqH/81ZJDxzyrnwbKgeFmImEjrmZlVOfo=', null, null, null, null, '99999', '1', null, ',0,', null, null, 'a08182bd4b3494b2014b34a48ae70000154253', 'a08182ea499e8d3301499e9a2050000f192541', 'a08182ea499e8d3301499e9a2050000f192541', '2');
INSERT INTO `sys_user` VALUES ('0', '泰山街道管理员', 'admin_jd_ts', null, '0', 'BKzKf/E83gblDsMkjaK/Lhs9PLtK8VKW7MMO/02G6FY=', null, null, null, null, '99999', '1', null, null, null, null, 'a08182bd5b423915015b42520ba00009161204', 'a08182bd5b423915015b423bd9500000154750', 'a08182ea499e8d3301499e9a2050000f192541', null);
INSERT INTO `sys_user` VALUES ('0', '泰山社区1管理员', 'admin_sq_ts_1', null, '0', 'wnpYqXsj1yo+a1OIPb1PUOvIbswP81140DTGINqIDzI=', null, null, null, null, '99999', '1', null, null, null, null, 'a08182bd5b423915015b42528b50000a161237', 'a08182bd5b423915015b423e46600001155029', 'a08182ea499e8d3301499e9a2050000f192541', null);
INSERT INTO `sys_user` VALUES ('0', '泰山社区2管理员', 'admin_sq_ts_2', null, '0', 'Fvg/zZh3hn7U1Tank8iZtk2GFlCcHuiwPTVz41NlOHs=', null, null, null, null, '99999', '1', null, ',0,', null, null, 'a08182bd5b423915015b4253da8a000b161403', 'a08182bd5b423915015b423e911b0002155048', 'a08182ea499e8d3301499e9a2050000f192541', null);
INSERT INTO `sys_user` VALUES ('0', '泰山社区3管理员', 'admin_sq_ts_3', null, '0', 'pCWCB38TTt9Z3neMhL+bnWkgDucNDUbDXWq8YZTpDVA=', null, null, null, null, '99999', '1', null, ',0,', null, null, 'a08182bd5b423915015b425436ab000c161426', 'a08182bd5b423915015b423ec2560003155100', 'a08182ea499e8d3301499e9a2050000f192541', null);
INSERT INTO `sys_user` VALUES ('0', '社区人员1', 'person1', null, '0', 'qsCgcidqNdbiIotAFJ11kzkUx694I7dgCqHaoOqd0cY=', null, null, null, null, 'a08182c158a87bfc0158a87ddda70000091250', '1', null, ',0,', null, null, 'a08182bd5b423915015b42592873000d161951', 'a08182bd5b423915015b423e46600001155029', 'a08182bd5b423915015b423e46600001155029', null);
INSERT INTO `sys_user` VALUES ('0', '人员1', 'ry', null, '1', 'icpcVzxI4uXPKcoimT8OQqyiD26ulR9Wjk0oKc12uGA=', null, null, null, null, '99999', '2', null, ',0,', null, null, 'a08182c1558f659a01558f83d0c30001094028', 'a08182ea499e8d3301499e9a2050000f192541', 'a08182ea499e8d3301499e9a2050000f192541', '3');
INSERT INTO `sys_user` VALUES ('0', '人员2', 'ry2', null, '0', 'Pze5lyo6PoO52cHDgMWaQgCqeshminSWOuK/SU1j898=', null, null, null, null, '99999', '3', null, null, null, null, 'a08182c156264ae101562652f45e0002162945', 'a08182ea499e8d3301499e9a2050000f192541', 'a08182ea499e8d3301499e9a2050000f192541', '4');
INSERT INTO `sys_user` VALUES ('0', '玄武区管理员', 'admin_qu_xw', null, '0', 'bcEvVRvRtu7nYsvt3MEgbMGtQ6WnP3vdVwg9OqymmsU=', null, null, null, null, '99999', '1', null, null, null, null, 'a08182c158a87bfc0158a88d44070002092940', 'a08182c1589943c401589980d59c0000112147', 'a08182ea499e8d3301499e9a2050000f192541', null);

-- ----------------------------
-- Table structure for sys_user_group
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_user_group`;
CREATE TABLE `sys_user_group` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `GROUPID` varchar(50) DEFAULT NULL COMMENT '关联账号组id',
  `USERID` varchar(50) DEFAULT NULL COMMENT '账号id',
  `DELSTATUS` int NOT NULL default 0 COMMENT '删除标识',
  `CREATID` varchar(50) DEFAULT NULL COMMENT '添加人',
  `CREATDATE` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账号关联关系表';

-- ----------------------------
-- Records of sys_user_group
-- ----------------------------

-- ----------------------------
-- Table structure for sys_virtualsubtable
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_virtualsubtable`;
CREATE TABLE `sys_virtualsubtable` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `CHINANAME` varchar(100) NOT NULL COMMENT '子表名称',
  `TABLENAME` varchar(50) NOT NULL COMMENT '物理表名称',
  `SHOWNUMBER` int NOT NULL COMMENT '是否显示行号',
  `MULTISELECT` int NOT NULL COMMENT '是否允许多选',
  `PAGINATION` int DEFAULT NULL COMMENT '是否显示分页',
  `PAGESIZE` int DEFAULT NULL COMMENT '页大小',
  `SHOWFOOTER` int DEFAULT NULL COMMENT '是否显示汇总行',
  `CONSTNAME` varchar(50) NOT NULL COMMENT '标识常量',
  `SUBTABLECONFIG` longtext COMMENT '子表配置信息',
  `SAVEDATAACTION` varchar(100) DEFAULT NULL COMMENT '保存数据请求地址',
  `DESTROYDATAACTION` varchar(100) DEFAULT NULL COMMENT '物理删除数据请求地址',
  `NEWDATA` varchar(255) COMMENT '新数据格式',
  `LOADDATAACTION` varchar(100) DEFAULT NULL COMMENT '获取数据的请求地址',
  `PAGEROOTPATH` varchar(50) DEFAULT NULL COMMENT '列表页面所在目录距离根目录的层级，如：若一级：../  二级：../../  以此类推',
  `FOREIGNKEYCOLUMN` varchar(50) DEFAULT NULL COMMENT '关联父表的列名称',
  `COLLECTDISPLAYFIELD` varchar(50) DEFAULT NULL COMMENT '汇总限制标题列',
  `UNITID` varchar(50) DEFAULT NULL COMMENT '所属单位id',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='电子表单定义表';

-- ----------------------------
-- Records of sys_virtualsubtable
-- ----------------------------

-- ----------------------------
-- Table structure for sys_virtualsubtablecol
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_virtualsubtablecol`;
CREATE TABLE `sys_virtualsubtablecol` (
  `ID` bigint NOT NULL COMMENT '主键',
  `DELSTATUS` int NOT NULL default 0 COMMENT '禁用标识',
  `TABLENAME` varchar(50) NOT NULL COMMENT '物理表名称',
  `COLNAME` varchar(50) NOT NULL COMMENT '列名称',
  `CHINANAME` varchar(100) NOT NULL COMMENT '子表名称',
  `COLWIDTH` varchar(50) NOT NULL COMMENT '列的宽度',
  `TEXTALIGN` varchar(50) NOT NULL COMMENT '单元格对齐方式(left;center;right)',
  `SORTINDEX` integer DEFAULT NULL COMMENT '排序编号',
  `SUBTABLEID` bigint NOT NULL COMMENT '字表主键',
  `ENABLECOLLECT` int NOT NULL COMMENT '是否启用汇总',
  `COLLECTRULE` varchar(50) DEFAULT NULL COMMENT '汇总规则',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='电子表单子表列设置表';

-- ----------------------------
-- Records of sys_virtualsubtablecol
-- ----------------------------

-- ----------------------------
-- Table structure for sys_virtual_col_value
-- ----------------------------
-- DROP TABLE IF EXISTS `sys_virtual_col_value`;
CREATE TABLE `sys_virtual_col_value` (
  `ID` varchar(50) NOT NULL COMMENT '主键',
  `COL_VALUE` varchar(255) COMMENT '字段的值',
  `COL_BIG_VALUE` longtext COMMENT '大文本字段值',
  `TAILORFORMCOL_ID` varchar(50) NOT NULL COMMENT '该虚拟字段所属表单字段表的主键',
  `RECORD_ID` varchar(50) NOT NULL COMMENT '业务表对应记录的主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='使用的虚拟字段存储的值';

-- ----------------------------
-- Records of sys_virtual_col_value
-- ----------------------------

-- ----------------------------
-- Procedure structure for syncCols
-- ----------------------------
-- DROP PROCEDURE IF EXISTS `syncCols`;

CREATE  PROCEDURE `syncCols`() BEGIN 		DECLARE 			 V_TABLE_SCHEMA VARCHAR(50);     DECLARE        V_ID VARCHAR(50);     DECLARE        V_TABLE_NAME VARCHAR(50);     DECLARE        V_COLUMN_NAME VARCHAR(50);     DECLARE        V_COLTYPE VARCHAR(50);     DECLARE        V_DATALENGTH BIGINT(10);     DECLARE        V_RIGOR INT(3);     DECLARE        V_SOURCECOLTYPE VARCHAR(50);     DECLARE        V_DEFAULTVALUE VARCHAR(50);     DECLARE        V_NULLABLE CHAR(1);     DECLARE        V_ALIAS VARCHAR(200);     DECLARE        V_AUTONO INT(3); 		DECLARE V_NUM INT DEFAULT 0;      DECLARE V_CUR_ERROR INT DEFAULT 0;     DECLARE CUR_TAB CURSOR FOR       SELECT LOWER(CONCAT(T.TABLE_NAME, ' ', T.COLUMN_NAME)) AS ID,              LOWER(T.TABLE_NAME),              LOWER(T.COLUMN_NAME),              T.DATA_TYPE AS COLTYPE,              CHARACTER_MAXIMUM_LENGTH AS DATALENGTH,              NUMERIC_SCALE AS RIGOR,              T.DATA_TYPE AS SOURCECOLTYPE,              REPLACE(REPLACE(REPLACE(COLUMN_DEFAULT, '''', ''), ')', ''),                      '(',                      '') AS DEFAULTVALUE,              REPLACE(REPLACE(IS_NULLABLE, 'NO', 'N'), 'YES', 'Y') AS NULLABLE,              ORDINAL_POSITION AS AUTONO,              COLUMN_COMMENT AS ALIAS         FROM INFORMATION_SCHEMA.COLUMNS T        WHERE LOWER(T.TABLE_SCHEMA) = LOWER(V_TABLE_SCHEMA);       DECLARE CONTINUE HANDLER FOR NOT FOUND SET V_CUR_ERROR = 1;     SELECT  DATABASE() INTO V_TABLE_SCHEMA; 		/*删除已经删除的列*/ 		DELETE FROM SYS_COLSREMARK 			WHERE ID NOT IN          (SELECT S.ID             FROM (SELECT CONCAT(T.TABLE_NAME, ' ', T.COLUMN_NAME)  AS ID                     FROM INFORMATION_SCHEMA.COLUMNS T                    WHERE 1 = 1                      AND LOWER(T.TABLE_SCHEMA) = LOWER(V_TABLE_SCHEMA)) S);      OPEN     CUR_TAB;     TAB_LOOP :LOOP FETCH CUR_TAB INTO V_ID, V_TABLE_NAME, V_COLUMN_NAME, V_COLTYPE, V_DATALENGTH, V_RIGOR, V_SOURCECOLTYPE, V_DEFAULTVALUE, V_NULLABLE, V_AUTONO, V_ALIAS;     IF       V_CUR_ERROR = 1  THEN LEAVE TAB_LOOP; 		END IF;   /*同步有列类型修改过的*/   UPDATE SYS_COLSREMARK U      SET U.SOURCECOLTYPE = V_SOURCECOLTYPE    WHERE LOWER(U.ID) = V_ID      AND (U.SOURCECOLTYPE <> V_SOURCECOLTYPE OR U.SOURCECOLTYPE IS NULL);    /*将新建的数据库表的列信息同步到SYS_COLSREMARK表*/   SELECT COUNT(ID) INTO V_NUM FROM SYS_COLSREMARK C WHERE LOWER(C.ID) = V_ID; 	IF V_NUM = 0 THEN 		INSERT INTO SYS_COLSREMARK     (ID,      TABLENAME,      COLNAME,      COLTYPE,      DATALENGTH,      RIGOR,      SOURCECOLTYPE,      DEFAULTVALUE,      NULLABLE,      AUTONO)   VALUES     (V_ID,      V_TABLE_NAME,      V_COLUMN_NAME,      V_COLTYPE,      V_DATALENGTH,      V_RIGOR,      V_SOURCECOLTYPE,      V_DEFAULTVALUE,      V_NULLABLE,      V_AUTONO); 	END IF;    SET V_NUM  =  0;   /*更新列的备注注释,编号规则，默认值，是否为空*/   UPDATE SYS_COLSREMARK      SET SYS_COLSREMARK.ALIAS        = V_ALIAS,          SYS_COLSREMARK.AUTONO       = V_AUTONO,          SYS_COLSREMARK.DEFAULTVALUE = V_DEFAULTVALUE,          SYS_COLSREMARK.NULLABLE     = V_NULLABLE    WHERE LOWER(SYS_COLSREMARK.ID) = V_ID;   /*更新SYS_COLSREMARK表中的列类型COLTYPE*/   UPDATE SYS_COLSREMARK      SET COLTYPE = V_COLTYPE, COLTYPEALIAS = NULL    WHERE LOWER(SYS_COLSREMARK.COLTYPE) <> V_COLTYPE      AND LOWER(SYS_COLSREMARK.ID) = V_ID;   COMMIT;  END LOOP TAB_LOOP; CLOSE CUR_TAB;  END ;;


-- ----------------------------
-- Procedure structure for syncTables
-- ----------------------------
-- DROP PROCEDURE IF EXISTS `syncTables`;

CREATE  PROCEDURE `syncTables`() BEGIN  DECLARE V_TABLE_SCHEMA VARCHAR(50);   SELECT DATABASE() INTO V_TABLE_SCHEMA;    /*从SYS_TABLESREMARK表中删除已经被删除的数据库表信息*/   DELETE FROM SYS_TABLESREMARK    WHERE NOT EXISTS (SELECT NULL             FROM INFORMATION_SCHEMA.TABLES T            WHERE LOWER(T.TABLE_NAME) = LOWER(TABLENAME)              AND LOWER(T.TABLE_SCHEMA) = LOWER(V_TABLE_SCHEMA)              AND T.TABLE_TYPE = 'BASE TABLE');   /*将新建的数据库表信息同步到TABLESREMARK表中*/   INSERT INTO SYS_TABLESREMARK     (TABLENAME)     SELECT LOWER(TABLE_NAME) AS TABLE_NAME       FROM INFORMATION_SCHEMA.TABLES      WHERE TABLE_TYPE = 'BASE TABLE'        AND LOWER(TABLE_SCHEMA) = LOWER(V_TABLE_SCHEMA)        AND NOT EXISTS      (SELECT NULL               FROM SYS_TABLESREMARK              WHERE LOWER(TABLENAME) = LOWER(TABLE_NAME));    /*更新表中的注释字段*/   UPDATE SYS_TABLESREMARK S      SET S.ALIAS = (SELECT CASE T.TABLE_COMMENT                              WHEN '' THEN                               '未定义'                              ELSE                               T.TABLE_COMMENT                            END AS ALIAS                       FROM INFORMATION_SCHEMA.TABLES T                      WHERE T.TABLE_TYPE = 'BASE TABLE'                        AND LOWER(T.TABLE_SCHEMA) = LOWER(V_TABLE_SCHEMA)                        AND T.TABLE_NAME = S.TABLENAME)    WHERE S.ALIAS = '未定义';   /*更新表中的主键列名字段*/   UPDATE SYS_TABLESREMARK S      SET PKNAME = (SELECT UPPER(GROUP_CONCAT(T.COLUMN_NAME))                      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE T                     WHERE LOWER(TABLE_SCHEMA) = LOWER(V_TABLE_SCHEMA)                       AND T.CONSTRAINT_NAME = 'PRIMARY'                       AND LOWER(T.TABLE_NAME) = LOWER(S.TABLENAME));  END ;;


-- ----------------------------
-- Function structure for nvl
-- ----------------------------
-- DROP FUNCTION IF EXISTS `nvl`;

CREATE  FUNCTION `nvl`() RETURNS varchar(2000) CHARSET utf8 BEGIN 	  	return ifnull(str,def); END ;;


-- ----------------------------
-- Function structure for to_char
-- ----------------------------
-- DROP FUNCTION IF EXISTS `to_char`;

CREATE  FUNCTION `to_char`() RETURNS varchar(20) CHARSET utf8 BEGIN 	   if upper(f) = '' THEN 		RETURN ''; 	end if; 	if upper(f) = 'YYYY-MM-DD' then     return concat(date_format(d, '%Y'),                   '-',                   date_format(d, '%m'),                   '-',                   date_format(d, '%d'));     elseif upper(f) = 'YYYY' then       return date_format(d, '%Y');     elseif upper(f) = 'MM' then       return date_format(d, '%m');     elseif upper(f) = 'DD' then       return date_format(d, '%d');     elseif upper(f) = 'YYYY-MM' then       return concat(date_format(d, '%Y'), '-', date_format(d, '%m'));     elseif upper(f) = 'MM-DD' then       return concat(date_format(d, '%m'), '-', date_format(d, '%d'));     elseif upper(f) = 'YYYY-MM-DD HH24:MM:SS' then       return concat(date_format(d, '%Y'),                     '-',                     date_format(d, '%m'),                     '-',                     date_format(d, '%d'),                     ' ',                     date_format(d, '%T'));     elseif upper(f) = 'YYYY-MM-DD HH24:MI:SS' then       return concat(date_format(d, '%Y'),                     '-',                     date_format(d, '%m'),                     '-',                     date_format(d, '%d'),                     ' ',                     date_format(d, '%T')); elseif upper(f) = 'YYYY-MM-DD HH24:MM' then        return concat(date_format(d, '%Y'),                     '-',                     date_format(d, '%m'),                     '-',                     date_format(d, '%d'),                     ' ',                     date_format(d, '%H'), 										':',                     date_format(d, '%i')  										);     elseif upper(f) = 'YYYY-MM-DD HH24:MI' then       return concat(date_format(d, '%Y'),                     '-',                     date_format(d, '%m'),                     '-',                     date_format(d, '%d'),                     ' ',                     date_format(d, '%H'), 										':',                     date_format(d, '%i') 										); elseif upper(f) = 'YYYY-MM-DD HH:MM' then        return concat(date_format(d, '%Y'),                     '-',                     date_format(d, '%m'),                     '-',                     date_format(d, '%d'),                     ' ',                     date_format(d, '%H'), 										':',                     date_format(d, '%i')  										);     elseif upper(f) = 'YYYY-MM-DD HH:MI' then       return concat(date_format(d, '%Y'),                     '-',                     date_format(d, '%m'),                     '-',                     date_format(d, '%d'),                     ' ',                     date_format(d, '%H'), 										':',                     date_format(d, '%i') 										);    else     return concat(date_format(d, '%Y'),                   '-',                   date_format(d, '%m'),                   '-',                   date_format(d, '%d'),                   ' ',                   date_format(d, '%T'));   end if; END ;;


-- ----------------------------
-- Function structure for to_date
-- ----------------------------
-- DROP FUNCTION IF EXISTS `to_date`;

CREATE  FUNCTION `to_date`() RETURNS datetime BEGIN  	IF LENGTH(dateString)<4 THEN 		RETURN NULL; 	ELSEIF UPPER(exprDate)='YYYY-MM-DD HH24:MI:SS' THEN 		RETURN STR_TO_DATE(dateString,'%Y-%m-%d %H:%i:%s'); 	ELSE 		RETURN STR_TO_DATE(dateString,'%Y-%m-%d'); 	END IF; END ;;


-- ----------------------------
-- Function structure for to_number
-- ----------------------------
-- DROP FUNCTION IF EXISTS `to_number`;

CREATE  FUNCTION `to_number`() RETURNS bigint(20) BEGIN 	  	return s; END ;;

SET FOREIGN_KEY_CHECKS=1;
