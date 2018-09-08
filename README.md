# web_angularjs
> 本项目由skyplatform-maven-archetype快速生成而来，用于电子政务类项目的快速开发。

## 主 要 特 性 
>- 经典的分层架构设计，Web、Service、Dao、Persistence；
>- web层使用SpringMVC搭建，支持rest风格的API设计；
>- Persistence层使用Hibernate框架，支持多种数据库访问；
>- 内置开箱即用的基础业务模块，比如：登录，组织机构，权限控制，菜单，工作流等；
>- 内置开箱即用的非功能性模块，比如：日志，缓存，文件操作，webservice等。

## ChangeLog
>- 引入dependencyManagement管理各子模块和公用模块的版本；
>- 升级Spring的版本到了3.2.18.RELEASE；
>- 对spring的依赖由libd的方式改为了只依赖用到的spring模块；
>- 将对spring的依赖从顶层pom移到了basic子模块中；
>- 将authority子模块合并到了menu子模块中；
>- 支持Web层直接注入Dao层的实例(必须在相应的Dao类或方法上标识@Transactional)，以减少大量无用的Service层代码；
>- 其他适应性的改造。

## 准备工作
>- 数据库系统的实例名请设置为orcl。
>- 用IDE打开生成好的项目后，将右边栏Maven Projects / Profiles全部打钩，把可能用到的插件或jar下载到本地，再根据需要去掉暂时不用的profile。
>- 如果项目所需的依赖无法下载，请尝试切换到180后，点击Reimport，如果所有依赖都下载到了，但是maven projects栏中依然报红，可以尝试重启IDE。
>- 如果IDE提示是否Auto Import依赖，请确认自动导入。
>- 使用jetty 插件启动系统，IDE设置的jdk最低1.8。
>- 使用tomcat插件启动系统，IDE设置的jdk最低1.7。
>- 创建数据库用户，用户名、密码、表空间名都设置为该项目的artifactId,本项目的artifactId是web_angularjs（示例脚本见附录1）。
>- 如果数据库服务器不是本机，请替换src/main/resources/development/db.properties和pom.xml中的init-db-in-oracle的localhost为对应的ip地址；
>- 勾选Profiles下的init-db-in-oracle，然后执行Plugins / sql下的sql:execute目标,以初始化数据库。
>- 执行Plugins / tomcat7下的tomcat7:run目标（可以右键选择debug模式启动，支持 断点调试 和 HOT SWAP）。
>- 访问http://localhost:8082/web_angularjs

## 小贴士
>- 可以通过访问通知公告模块，来快速掌握如何在本平台上开发一个基础业务模块。
>- 通知公告模块的源代码在src/main/java/project/notice和webapp/platform/notice下。
>- 63私服连接到外网的方式比较慢，所以如果下载第三方依赖建议切换到180私服
>- 平台相关的jar会部署到63上，所以下载平台依赖，请切换到63
>- 180和63不要同时勾选

## 开发过程
>- 代码质量检查
```
下载IDE插件SonarLint并安装到IDE中：ftp://32.1.2.63/IntelliJ%20Plugins/SonarLint-2.7.1.1640.zip
安装之后需要重启IDE，之后SonarLint会对Java，Js代码进行实时检查，打开SonarLint插件视图即可看到结果
```
>- 发布
```
执行package生命周期即可，压缩并打包好的war在target目录下。
```

## 附录1
>
```
--创建表空间示例
create tablespace web_angularjs
datafile 'F:\oracle\product\10.2.0\oradata\orcl\web_angularjs.dbf'
size 50m
autoextend on
next 10m maxsize 1024m
extent management local;
--创建用户示例
create user web_angularjs
  identified by "web_angularjs"
  default tablespace web_angularjs
  temporary tablespace TEMP
  profile DEFAULT;
grant connect to web_angularjs;
grant resource to web_angularjs;
```

## 备注
>- 目前只提供了oracle和mysql的数据库初始化插件和脚本，其他数据库类型会在以后根据具体情况选择性添加。
