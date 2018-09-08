package com.skytech.project.common.dao.imp;

import com.skytech.basic.core.constants.CommonParam;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ParamList;
import com.skytech.organisation.dao.IUserDao;
import com.skytech.organisation.model.Sys_User;
import com.skytech.persistence.dao.CommonHibernateDao;
import com.skytech.project.common.dao.ICommonDao;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by LEE on 2017/5/31.
 */
@Repository("commonDao")
public class CommonDao extends CommonHibernateDao implements ICommonDao {

    @Autowired
    private HttpServletRequest request;

    @Resource(name = "userDao")
    private IUserDao userDao;

    /**
     * 菜单拖拽排序
     *
     * @param map
     */
    @Override
    public void onDropMenu(Map<String, Object> map) {
        String sourceRowPid = StringUtil.getStr(map.get("sourceRowPid"));
        String oldpid = StringUtil.getStr(map.get("oldpid"));
        String sourceRowId = StringUtil.getStr(map.get("sourceRowId"));
        String point = StringUtil.getStr(map.get("point"));
        String tpid = StringUtil.getStr(map.get("tpid")); // t 目标
        String spid = StringUtil.getStr(map.get("spid")); // s 拖拽
        String sindex = StringUtil.getStr(map.get("sindex")); // s 拖拽
        String tindex = StringUtil.getStr(map.get("tindex")); // s 拖拽
        String topSql = "";
        String updateBottomSql = "";
        if (tpid.equals(spid)) {
            if ("top".equals(point)) {
                topSql = "update sys_menu set sortindex = (sortindex+2) where sortindex>=" + tindex;
                updateBottomSql = "update sys_menu set sortindex =" + tindex + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            } else {
                topSql = "update sys_menu set sortindex = (sortindex+2) where sortindex>" + tindex;
                updateBottomSql = "update sys_menu set sortindex =" + (Integer.valueOf(tindex) + 1) + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            }
            this.execteNativeBulk(topSql, null);
            this.execteNativeBulk(updateBottomSql, null);
        } else {
            this.execteNativeBulk("update sys_menu set parentid = '" + sourceRowPid + "' where id = '" + sourceRowId + "'", null);
            if (!StringUtil.isNullOrWhiteSpace(sourceRowPid)) {
                List<Map<String, Object>> countList = this.listByNative("select count(*) as countPid  from sys_menu where parentid = '" + sourceRowPid + "'");
                if (Integer.valueOf(String.valueOf(countList.get(0).get("COUNTPID"))) > 0) {
                    this.execteNativeBulk("update sys_menu set isparent = 'true' where id = '" + sourceRowPid + "'", null);
                } else {
                    this.execteNativeBulk("update sys_menu set isparent = 'false' where id = '" + sourceRowPid + "'", null);
                }
            }
            if (!StringUtil.isNullOrWhiteSpace(oldpid)) {
                List<Map<String, Object>> countList = this.listByNative("select count(*) as countPid  from sys_menu where parentid = '" + oldpid + "'");
                if (Integer.valueOf(String.valueOf(countList.get(0).get("COUNTPID"))) > 0) {
                    this.execteNativeBulk("update sys_menu set isparent = 'true' where id = '" + oldpid + "'", null);
                } else {
                    this.execteNativeBulk("update sys_menu set isparent = 'false' where id = '" + oldpid + "'", null);
                }
            }
            if ("top".equals(point)) {
                topSql = "update sys_menu set sortindex = (sortindex+2) where sortindex>=" + tindex;
                updateBottomSql = "update sys_menu set sortindex =" + tindex + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            } else {
                topSql = "update sys_menu set sortindex = (sortindex+2) where sortindex>" + tindex;
                updateBottomSql = "update sys_menu set sortindex =" + (Integer.valueOf(tindex) + 1) + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            }
            this.execteNativeBulk(topSql, null);
            this.execteNativeBulk(updateBottomSql, null);
        }
    }

    /**
     * 字典子项拖拽排序
     *
     * @param map
     */
    @Override
    public void onDropChildMenu(Map<String, Object> map) {
        String sourceRowPid = StringUtil.getStr(map.get("sourceRowPid"));
        String oldpid = StringUtil.getStr(map.get("oldpid"));
        String sourceRowId = StringUtil.getStr(map.get("sourceRowId"));
        String point = StringUtil.getStr(map.get("point"));
        String tpid = StringUtil.getStr(map.get("tpid")); // t 目标
        String spid = StringUtil.getStr(map.get("spid")); // s 拖拽
        String sindex = StringUtil.getStr(map.get("sindex")); // s 拖拽
        String tindex = StringUtil.getStr(map.get("tindex")); // s 拖拽
        String topSql = "";
        String updateBottomSql = "";
        if (tpid.equals(spid)) {
            if ("top".equals(point)) {
                topSql = "update sys_categoryvalue set sortindex = (sortindex+2) where sortindex>=" + tindex;
                updateBottomSql = "update sys_categoryvalue set sortindex =" + tindex + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            } else {
                topSql = "update sys_categoryvalue set sortindex = (sortindex+2) where sortindex>" + tindex;
                updateBottomSql = "update sys_categoryvalue set sortindex =" + (Integer.valueOf(tindex) + 1) + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            }
            this.execteNativeBulk(topSql, null);
            this.execteNativeBulk(updateBottomSql, null);
        } else {
            this.execteNativeBulk("update sys_categoryvalue set parentid = '" + sourceRowPid + "' where id = '" + sourceRowId + "'", null);
            if (!StringUtil.isNullOrWhiteSpace(sourceRowPid)) {
                List<Map<String, Object>> countList = this.listByNative("select count(*) as countPid  from sys_categoryvalue where parentid = '" + sourceRowPid + "'");
                if (Integer.valueOf(String.valueOf(countList.get(0).get("COUNTPID"))) > 0) {
                    this.execteNativeBulk("update sys_categoryvalue set isparent = 'true' where id = '" + sourceRowPid + "'", null);
                } else {
                    this.execteNativeBulk("update sys_categoryvalue set isparent = 'false' where id = '" + sourceRowPid + "'", null);
                }


            }
            if (!StringUtil.isNullOrWhiteSpace(oldpid)) {
                List<Map<String, Object>> countList = this.listByNative("select count(*) as countPid  from sys_categoryvalue where parentid = '" + oldpid + "'");
                if (Integer.valueOf(String.valueOf(countList.get(0).get("COUNTPID"))) > 0) {
                    this.execteNativeBulk("update sys_categoryvalue set isparent = 'true' where id = '" + oldpid + "'", null);
                } else {
                    this.execteNativeBulk("update sys_categoryvalue set isparent = 'false' where id = '" + oldpid + "'", null);
                }
            }
            if ("top".equals(point)) {
                topSql = "update sys_categoryvalue set sortindex = (sortindex+2) where sortindex>=" + tindex;
                updateBottomSql = "update sys_categoryvalue set sortindex =" + tindex + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            } else {
                topSql = "update sys_categoryvalue set sortindex = (sortindex+2) where sortindex>" + tindex;
                updateBottomSql = "update sys_categoryvalue set sortindex =" + (Integer.valueOf(tindex) + 1) + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
            }
            this.execteNativeBulk(topSql, null);
            this.execteNativeBulk(updateBottomSql, null);
        }
    }

    @Override
    public void onDropPeop(Map<String, Object> map) {
        String targetRowId = StringUtil.getStr(map.get("targetRowId"));
        String targetRowSortcode = StringUtil.getStr(map.get("targetRowSortcode"));
        String sourceRowId = StringUtil.getStr(map.get("sourceRowId"));
        String sourceRowSortCode = StringUtil.getStr(map.get("sourceRowSortCode"));
        String point = StringUtil.getStr(map.get("point"));
        String topSql = "";
        String updateBottomSql = "";
        if ("top".equals(point)) {
            topSql = "update sys_user set sortindex = (sortindex+2) where sortindex>=" + targetRowSortcode;
            updateBottomSql = "update sys_user set sortindex =" + targetRowSortcode + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
        } else {
            topSql = "update sys_user set sortindex = (sortindex+2) where sortindex>" + targetRowSortcode;
            updateBottomSql = "update sys_user set sortindex =" + (Integer.valueOf(targetRowSortcode) + 1) + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
        }
        this.execteNativeBulk(topSql, null);
        this.execteNativeBulk(updateBottomSql, null);
    }


    @Override
    public void onDropGrid(Map<String, Object> map) {
        String targetRowId = StringUtil.getStr(map.get("targetRowId"));
        String targetRowSortcode = StringUtil.getStr(map.get("targetRowSortcode"));
        String sourceRowId = StringUtil.getStr(map.get("sourceRowId"));
        String sourceRowSortCode = StringUtil.getStr(map.get("sourceRowSortCode"));
        String point = StringUtil.getStr(map.get("point"));
        String tableName = StringUtil.getStr(map.get("tableName"));
        String sortField = StringUtil.getStr(map.get("sortField"));
        String topSql = "";
        String updateBottomSql = "";
        if ("top".equals(point)) {
            topSql = "update "+tableName+" set "+sortField+" = ("+sortField+"+2) where "+sortField+">=" + targetRowSortcode;
            updateBottomSql = "update "+tableName+" set "+sortField+" =" + targetRowSortcode + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
        } else {
            topSql = "update "+tableName+" set "+sortField+" = ("+sortField+"+2) where "+sortField+">" + targetRowSortcode;
            updateBottomSql = "update "+tableName+" set "+sortField+" =" + (Integer.valueOf(targetRowSortcode) + 1) + " where id = '" + sourceRowId + "'"; // 将拖拽行的排序号 替换成目标行的排序号号
        }
        this.execteNativeBulk(topSql, null);
        this.execteNativeBulk(updateBottomSql, null);
    }

    /**
     * 同步加载人员树
     * @param deptid
     * @return
     */
    @Override
    public List loadDeptUserTreeBySync(String deptid) {
        StringBuffer sql = new StringBuffer();
        sql.append(" select 'dept_'||d.id as id,d.chinaname as text,'dept_'||d.parentid as parentid,sortindex,'closed' as state  from sys_dept d where d.delstatus='0'  ");
        if (!StringUtil.isNullOrWhiteSpace(deptid)) {
            sql.append(" and d.id = '" + deptid + "'");
        }
        sql.append(" union all ");
        sql.append(" select 'user_'||u.id as id,u.chinaname as text,'dept_'||u.deptid as parentid,sortindex,'open' as state from sys_user u where u.delstatus='0' ");
        if (!StringUtil.isNullOrWhiteSpace(deptid)) {
            sql.append(" and u.deptid = '" + deptid + "'");
        }
        sql.append(" order by state, sortindex ");
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("text", StandardBasicTypes.STRING);
        scalarMap.put("parentid", StandardBasicTypes.STRING);
        scalarMap.put("state", StandardBasicTypes.STRING);
        return listByNative(sql.toString(), scalarMap, null);
    }

    @Override
    public List loadUserModule() {
        Sys_User currentUser = userDao.getCurrentLoginUser(request.getSession());
        StringBuffer sql = new StringBuffer();
        List paramList = new ArrayList();
        sql.append("select t.module_x      as x,\n" +
                "       t.module_y      as y,\n" +
                "       t.module_width  as width,\n" +
                "       t.module_height as height,\n" +
                "       m.module_consname\n" +
                "  from t_module_user_conf t\n" +
                "  left join t_module m\n" +
                "    on t.module_id = m.id\n" +
                "   and m.delstatus = 0\n" +
                " where t.delstatus = 0\n" +
                "   and t.user_id = ?");
        paramList.add(currentUser.getId());
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("x", StandardBasicTypes.STRING);
        scalarMap.put("y", StandardBasicTypes.STRING);
        scalarMap.put("width", StandardBasicTypes.STRING);
        scalarMap.put("height", StandardBasicTypes.STRING);
        scalarMap.put("module_consname", StandardBasicTypes.STRING);
        return listByNative(sql.toString(), scalarMap, paramList);
    }



    @Override
    public List loadSonCategoryvalueList(String constname, String parent_refid) {
        if(!StringUtil.isNullOrWhiteSpace(constname)&&!StringUtil.isNullOrWhiteSpace(parent_refid)){
            HashMap<String, Type> scalarmap=new HashMap<String,Type>();
            String sql=" select t.refid as value,t.chinaname as text \n" +
                    "   from Sys_Categoryvalue t,Sys_Category h \n" +
                    "   where h.id=t.categoryid \n" +
                    "   and h.delstatus="+ CommonParam.DATA_USEABLE+" \n" +
                    "   and t.delstatus="+CommonParam.DATA_USEABLE+" \n" +
                    "   and h.constname=? \n" +
                    "   and t.extint1 = ? \n" +
                    "   order by t.sortindex \n";
            ParamList params=ParamList.getNewInstance().addParams(constname,parent_refid);
            scalarmap.put("value",StandardBasicTypes.STRING);
            scalarmap.put("text",StandardBasicTypes.STRING);
            return this.listByNative(sql,scalarmap, params.getParams());
        }else{
            return new ArrayList();
        }
    }

    @Override
    public List loadDeptTreeBySync() {
        StringBuffer sql = new StringBuffer();
        sql.append(" select 'dept_' || d.id as id,\n" +
                "       d.chinaname as text,\n" +
                "       'dept_' || d.parentid as parentid,\n" +
                "       sortindex,\n" +
                "       'open' as state\n" +
                "  from sys_dept d\n" +
                " where d.delstatus = 0\n" +
                " order by d.searchcode ");
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("text", StandardBasicTypes.STRING);
        scalarMap.put("parentid", StandardBasicTypes.STRING);
        scalarMap.put("state", StandardBasicTypes.STRING);
        return listByNative(sql.toString(), scalarMap, null);
    }

    @Override
    public void SyncDate(String sync_key) {
        if ("sys_roles".equals(sync_key)){ //同步角色
            this.execteNativeBulk("{call SYNC_ROLE_INFO_FROM_TYZY}",null);
        }else if("sys_dept".equals(sync_key)){//同步部门
            this.execteNativeBulk("{call SYNC_DEPT_INFO_FROM_TYZY}",null);
        }else if("sys_user".equals(sync_key)){//同步用户
            this.execteNativeBulk("{call SYNC_USER_INFO_FROM_TYZY}",null);
        }
    }

    /**
     * 移动到目标内部
     * @param id
     * @param parentId
     * @param tableName
     * @param idColName
     * @param idColType
     * @param parentIdColName
     * @param sortindexColName
     */
    @Override
    public void sortRecordInner(String id, String parentId, String tableName, String idColName, String idColType, String parentIdColName,String sortindexColName) {
        if(idColType.equalsIgnoreCase("string")){//主键为字符串类型
            id="'"+id+"'";
            parentId="'"+parentId+"'";
        }
        String sql = "update "+tableName+" \n" +
                "   set "+sortindexColName+" =\n" +
                "       (select nvl(max(s."+sortindexColName+"),0)+1 from "+tableName+" s where s."+parentIdColName+" = "+parentId+"),\n" +
                "       "+parentIdColName+"  ="+parentId+"\n" +
                " where "+idColName+" = "+id+"\n";
        if(tableName.equalsIgnoreCase("sys_menu")){//菜单特殊处理
            String uSql = " update sys_menu set isparent = 'true' where id = "+parentId+"\n";
            this.execteNativeBulk(uSql,null);
        }
        this.execteNativeBulk(sql,null);

    }

    @Override
    public void sortRecordPrev(String id, String targetId, String tableName, String idColName, String idColType, String parentIdColName, String sortindexColName) {
        if(idColType.equalsIgnoreCase("string")){//主键为字符串类型
            id="'"+id+"'";
            targetId="'"+targetId+"'";
        }
        String sql1 = "update "+tableName+"\n" +
                "   set "+sortindexColName+" = "+sortindexColName+" + 2\n" +
                " where 1 = 1\n" +
                "   and "+sortindexColName+" >= \n" +
                "       (select f."+sortindexColName+" from "+tableName+" f where f."+idColName+" = "+targetId+")\n";
        if(!StringUtil.isNullOrWhiteSpace(parentIdColName)){
            sql1+="   and "+parentIdColName+" =  (select s."+parentIdColName+" from "+tableName+" s where s."+idColName+" = "+targetId+")";
        }
        String sql2 = "update "+tableName+" \n" +
                "   set "+sortindexColName+" =\n" +
                "       (select f."+sortindexColName+" -1 from "+tableName+" f where f."+idColName+" = "+targetId+")\n";
        if(!StringUtil.isNullOrWhiteSpace(parentIdColName)){
            sql2+="       ,"+parentIdColName+" =\n" +
                    "       (select s."+parentIdColName+" from "+tableName+" s where s."+idColName+" = "+targetId+")\n" ;
        }
        sql2+= " where "+idColName+" ="+id;

        this.execteNativeBulk(sql1,null);
        this.execteNativeBulk(sql2,null);
    }

    @Override
    public void sortRecordNext(String id, String targetId, String tableName, String idColName, String idColType, String parentIdColName, String sortindexColName) {
        if(idColType.equalsIgnoreCase("string")){//主键为字符串类型
            id="'"+id+"'";
            targetId="'"+targetId+"'";
        }
        String sql1 = "update "+tableName+"\n" +
                "   set "+sortindexColName+" = "+sortindexColName+" + 2\n" +
                " where 1 = 1\n" +
                "   and "+sortindexColName+" >= \n" +
                "       (select f."+sortindexColName+" from "+tableName+" f where f."+idColName+" = "+targetId+")\n";
        sql1+=" and "+idColName+" <> "+id+"\n";
        if(!StringUtil.isNullOrWhiteSpace(parentIdColName)){
            sql1+="   and "+parentIdColName+" =  (select s."+parentIdColName+" from "+tableName+" s where s."+idColName+" = "+targetId+")";
        }
        String sql2 = "update "+tableName+" \n" +
                "   set "+sortindexColName+" =\n" +
                "       (select f."+sortindexColName+"+ 1 from "+tableName+" f where f."+idColName+" = "+targetId+")\n";
        if(!StringUtil.isNullOrWhiteSpace(parentIdColName)){
            sql2+="       ,"+parentIdColName+" =\n" +
                    "       (select s."+parentIdColName+" from "+tableName+" s where s."+idColName+" = "+targetId+")\n" ;
        }
        sql2+= " where "+idColName+" ="+id;

        this.execteNativeBulk(sql1,null);
        this.execteNativeBulk(sql2,null);

    }

    @Override
    public GridResult loadFileList(Map map, PageInfo pageInfo) {
        String sql = "";
        sql+="select id               as id,\n" +
                "       delstatus        as delstatus,\n" +
                "       tablename        as tablename,\n" +
                "       colname          as colname,\n" +
                "       recordid         as recordid, \n" +
                "       filename         as filename,\n" +
                "       storename        as storename,\n" +
                "       storepath        as storepath, \n" +
                "       extname          as extname, \n" +
                "       uploadtime          as uploadtime \n" +
                "  from Sys_Attachfile f where 1=1 and f.delstatus = 0 \n";
        String tab_name = StringUtil.getStr(map.get("tab_name"));
        String col_name = StringUtil.getStr(map.get("col_name"));
        String recordid = StringUtil.getStr(map.get("recordid"));
        List list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(tab_name)){
            list.add(tab_name);
            sql+=" and f.tablename = ? \n";
        }else{
            return  GridResult.getEmptyResult();
        }
        if(!StringUtil.isNullOrWhiteSpace(recordid)){
            list.add(recordid);

            sql+=" and f.recordid = ? \n";
        }else{
            return  GridResult.getEmptyResult();
        }
        if(!StringUtil.isNullOrWhiteSpace(col_name)){
            list.add(col_name);
            sql+=" and f.colname = ? \n";
        }
        sql+=" order by f.uploadtime desc \n";

        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("tablename", StandardBasicTypes.STRING);
        scalarMap.put("colname", StandardBasicTypes.STRING);
        scalarMap.put("recordid", StandardBasicTypes.STRING);
        scalarMap.put("filename", StandardBasicTypes.STRING);
        scalarMap.put("storename", StandardBasicTypes.STRING);
        scalarMap.put("storepath", StandardBasicTypes.STRING);
        scalarMap.put("extname", StandardBasicTypes.STRING);
        scalarMap.put("uploadtime", StandardBasicTypes.TIMESTAMP);
        return this.listByNativeByPage(sql,scalarMap,pageInfo,null,list);
    }
}
