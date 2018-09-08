package com.skytech.project.office.notice.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.office.notice.dao.IT_NoticeDao;
import com.skytech.project.office.notice.model.T_Notice;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("t_NoticeDao")
public class T_NoticeDao extends MainBaseDao<T_Notice, String> implements IT_NoticeDao {

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                "n.id," +
                "n.title," +
                "n.content," +
                "n.is_public," +
                "n.delstatus," +
                "n.data_type," +
                "n.adder," +
                "n.addtime," +
                "n.public_time," +
                "n.reference_no," +
                "n.describe," +
                "n.adderdeptid")
                .append(" from t_notice n ")
                .append(" where n.delstatus = 0 ");
        String keyword = null;
        String ispublic = null;
        String start_time = null;
        String end_time = null;
        Integer data_type = null;
        Long adderdeptid = null;
        if (map != null) {
            keyword = StringUtil.getStr(map.get("search_keyword"));
            ispublic = StringUtil.getStr(map.get("search_is_public"));
            start_time = StringUtil.getStr(map.get("search_start_time"));
            end_time = StringUtil.getStr(map.get("search_end_time"));
            data_type = Integer.parseInt(StringUtil.getStr(map.get("serch_data_type")));
            adderdeptid = Long.parseLong(StringUtil.getStr(map.get("search_adderdeptid")));
        }

        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* data_type 接口中定义必须要有 */
        sql.append(" and n.data_type = ?");
        list.add(data_type);
        /* *//* Service 已经判断合法 */
        sql.append(" and n.adderdeptid = ?");
        list.add(adderdeptid);
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and n.title like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(ispublic)) {
            list.add(Integer.parseInt(ispublic.toString()));
            sql.append(" and n.is_public = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            try {
                list.add(new java.util.Date(start_time));
                sql.append(" and n.addtime > ? ");
            } catch (Exception e) {
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            try {
                list.add(new java.util.Date(end_time));
                sql.append(" and n.addtime < ? ");
            } catch (Exception e) {
            }

        }
        //sql = DataPrivilegeVerify.getInstance().verify(sql.toString(), request, "n");//权限审核
        sql.append(" order by n.addtime desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("title", StandardBasicTypes.STRING);
        scalarMap.put("content", StandardBasicTypes.STRING);
        scalarMap.put("is_public", StandardBasicTypes.INTEGER);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("data_type", StandardBasicTypes.INTEGER);
        scalarMap.put("adder", StandardBasicTypes.LONG);
        scalarMap.put("addtime", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("public_time", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("reference_no", StandardBasicTypes.STRING);
        scalarMap.put("describe", StandardBasicTypes.STRING);
        scalarMap.put("adderdeptid", StandardBasicTypes.LONG);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_notice", gr, null);
        return gr;
    }


    @Override
    public List getChildrenDept(String dept_id) {
        StringBuilder sql = new StringBuilder();
        sql.append(" select  " +
                " false checked," +
                " true isParent," +
                " 'closed' state," +
                " d.parentid," +
                " d.chinaname as name," +
                " d.id," +
                " d.delstatus," +
                " de.id dept_id" +
                " from sys_dept d " +
                " left join  cf_dept_ext de on de.sys_dept_id = d.id")
                .append(" where d.delstatus = 0 " +
                        " and de.delstatus = 0" +
                        " and d.parentid = ?")
                .append(" order by d.chinaname");
        List<Object> params = new ArrayList<>();
        params.add(dept_id);
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("checked", StandardBasicTypes.BOOLEAN);
        scalarMap.put("isParent", StandardBasicTypes.BOOLEAN);
        scalarMap.put("state", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("parentid", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("dept_id", StandardBasicTypes.LONG);
        return this.listByNative(sql.toString(), scalarMap, params);
    }

    @Override
    public List getRootDept(String dept_id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                " false checked," +
                " true isParent," +
                " 'closed' state," +
                " d.chinaname as name," +
                " d.id," +
                " d.delstatus," +
                " de.id dept_id " +
                " FROM" +
                " sys_dept as d" +
                " LEFT JOIN cf_dept_ext de on de.sys_dept_id = d.ID ")
                .append(
                        " WHERE d.delstatus = 0 " +
                                " and de.delstatus = 0" +
                                " AND d.ID = ?")
                .append(" order by d.chinaname");
        List<Object> params = new ArrayList<>();
        params.add(dept_id);
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("checked", StandardBasicTypes.BOOLEAN);
        scalarMap.put("isParent", StandardBasicTypes.BOOLEAN);
        scalarMap.put("state", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.STRING);
        scalarMap.put("dept_id", StandardBasicTypes.STRING);
        return this.listByNative(sql.toString(), scalarMap, params);
    }

    @Override
    public List getDeptUsers(String dept_id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                " false checked," +
                " false isParent," +
                " 'open' state," +
                " u.chinaname as name," +
                " u.deptid parentid," +
                " ue.id," +
                " ue.sys_user_id," +
                " ue.user_type," +
                " ue.cj_user_type," +
                " ue.dept_id," +
                " u.mobile, " +
                " d.chinaname as dept_name," +
                " d.simplechinaname as sdept_name")
                .append(" from  cf_user_ext ue " +
                        " left join sys_user u on u.id = ue.sys_user_id" +
                        " left join sys_dept d on d.id = u.deptid ")
                .append(" where ue.delstatus = 0 " +
                        " and u.delstatus = 0" +
                        " and u.deptid = ?" +
                        " and u.user_type != 3")
                .append(" order by u.chinaname");
        List<Object> params = new ArrayList<>();
        params.add(dept_id);
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("checked", StandardBasicTypes.STRING);
        scalarMap.put("isParent", StandardBasicTypes.STRING);
        scalarMap.put("state", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("parentid", StandardBasicTypes.STRING);
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("sys_user_id", StandardBasicTypes.STRING);
        scalarMap.put("user_type", StandardBasicTypes.INTEGER);
        scalarMap.put("cj_user_type", StandardBasicTypes.INTEGER);
        scalarMap.put("dept_id", StandardBasicTypes.LONG);
        scalarMap.put("mobile", StandardBasicTypes.STRING);
        scalarMap.put("dept_name", StandardBasicTypes.STRING);
        scalarMap.put("sdept_name", StandardBasicTypes.STRING);
        return this.listByNative(sql.toString(), scalarMap, params);
    }

    @Override
    public List getDeptUsers(Long dept_id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                " u.chinaname as name," +
                " u.deptid parentid," +
                " ue.id," +
                " ue.sys_user_id," +
                " ue.user_type," +
                " ue.cj_user_type," +
                " ue.dept_id," +
                " u.mobile, " +
                " d.chinaname as dept_name," +
                " d.simplechinaname as sdept_name")
                .append(" from  cf_user_ext ue " +
                        " left join sys_user u on u.id = ue.sys_user_id" +
                        " left join sys_dept d on d.id = u.deptid ")
                .append(" where ue.delstatus = 0 " +
                        " and u.delstatus = 0" +
                        " and ue.dept_id = ?")
                .append(" order by u.chinaname");
        List<Object> params = new ArrayList<>();
        params.add(dept_id);
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("parentid", StandardBasicTypes.STRING);
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("sys_user_id", StandardBasicTypes.STRING);
        scalarMap.put("user_type", StandardBasicTypes.INTEGER);
        scalarMap.put("cj_user_type", StandardBasicTypes.INTEGER);
        scalarMap.put("dept_id", StandardBasicTypes.LONG);
        scalarMap.put("mobile", StandardBasicTypes.STRING);
        scalarMap.put("dept_name", StandardBasicTypes.STRING);
        scalarMap.put("sdept_name", StandardBasicTypes.STRING);
        return this.listByNative(sql.toString(), scalarMap, params);
    }

    @Override
    public int delList(List<String> strings) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_notice set delstatus = 1 ")
                .append(" where delstatus = 0 ")
                .append(StringExtUtil.loadCheckSqlByCheckIdList("id", strings, StringExtUtil.check_col_type_str));
        return this.execteNativeBulk(sql.toString(), null);
    }

    @Override
    public String getSysDeptID(long user_dept_id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select de.sys_dept_id ")
                .append(" from cf_dept_ext de")
                .append(" where de.delstatus = 0 ");

        List<Object> params = new ArrayList<>();
        params.add(user_dept_id);
        sql.append(" and de.id = ?");
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("sys_dept_id", StandardBasicTypes.STRING);
        List result = this.listByNative(sql.toString(), scalarMap, params);
        if (result != null && result.size() > 0) {
            return StringUtil.getStr(((HashMap) result.get(0)).get("sys_dept_id"));
        }
        return null;
    }
}