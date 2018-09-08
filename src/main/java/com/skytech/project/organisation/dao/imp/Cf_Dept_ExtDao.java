package com.skytech.project.organisation.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.organisation.dao.IUserDao;
import com.skytech.organisation.model.OrganisationPanelModel;
import com.skytech.organisation.model.Sys_User;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.organisation.dao.ICf_Dept_ExtDao;
import com.skytech.project.organisation.model.Cf_Dept_Ext;
import io.swagger.models.auth.In;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("cf_Dept_ExtDao")
public class Cf_Dept_ExtDao extends MainBaseDao<Cf_Dept_Ext, Long> implements ICf_Dept_ExtDao {
    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;
    @Resource(name = "userDao")
    private IUserDao userDao;
    @Autowired
    private HttpSession session;

    public GridResult loadPageListForConfig(OrganisationPanelModel panelmodel, PageInfo pageinfo) {
        String id = panelmodel.getId();
        ArrayList list = new ArrayList();
        StringBuffer sql = new StringBuffer();
        sql.append("select dept.id, ");
        if (StringUtil.isNullOrWhiteSpace(id)) {
            sql.append(" null as parentid ");
        } else {
            sql.append(" dept.parentid as parentid ");
        }
        sql.append(" ,dept.unitid,dept.chinaname,dept.deptlevel,dept.delstatus,cde.dept_properties,cde.id as dept_ext_id,")
                .append(" case  when dept.delstatus = \'0\' then null else \'icon-pause\' end as iconCls,")
                .append(" case when (select count(1) from sys_dept a where a.parentid = dept.id)>0 then \'closed\' ")
                .append(" when (select count(1) from sys_dept a where a.parentid = dept.id)<=0 then \'open\' end  ")
                .append(" as state,dept.sortindex from sys_dept dept left join cf_dept_ext cde ON dept.ID = cde.sys_dept_id  where 1=1 ");
        if (id != null) {
            list.add(id);
            sql.append(" and dept.parentid= ? ");
        } else {
            Sys_User scalarMap = this.userDao.getCurrentLoginUser(this.session);
            list.add(scalarMap.getDeptid());
            sql.append(" and dept.id= ? ");
        }
        sql.append("  order by  dept.deptlevel desc,dept.sortindex ");
        HashMap scalarMap1 = new HashMap();
        scalarMap1.put("id", StandardBasicTypes.STRING);
        scalarMap1.put("parentid", StandardBasicTypes.STRING);
        scalarMap1.put("unitid", StandardBasicTypes.STRING);
        scalarMap1.put("chinaname", StandardBasicTypes.STRING);
        scalarMap1.put("deptlevel", StandardBasicTypes.INTEGER);
        scalarMap1.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap1.put("iconCls", StandardBasicTypes.STRING);
        scalarMap1.put("state", StandardBasicTypes.STRING);
        scalarMap1.put("sortindex", StandardBasicTypes.STRING);
        scalarMap1.put("dept_properties", StandardBasicTypes.INTEGER);
        scalarMap1.put("dept_ext_id", StandardBasicTypes.LONG);
        return this.listByNativeByPage(StringUtil.getStr(sql), scalarMap1, pageinfo, list);
    }

    @Override
    public GridResult LoadDeptInfoList(OrganisationPanelModel panelmodel, PageInfo pageInfo) {
        String id = panelmodel.getId();
        ArrayList list = new ArrayList();
        StringBuffer sql = new StringBuffer();
        sql.append("select dept.id, ");
        if (StringUtil.isNullOrWhiteSpace(id)) {
            sql.append(" null as parentid ");
        } else {
            sql.append(" dept.parentid as parentid ");
        }
        sql.append(" ,dept.unitid,dept.chinaname,dept.deptlevel,dept.delstatus,cde.dept_properties,cde.id as dept_ext_id ,")
                .append(" case  when dept.delstatus = \'0\' then null else \'icon-pause\' end as iconCls,")
                .append(" case when (select count(1) from sys_dept a where a.parentid = dept.id  and a.deptlevel = '1')>0 then \'closed\' ")
                .append(" when (select count(1) from sys_dept a where a.parentid = dept.id  and a.deptlevel = '1')<=0 then \'open\' end  ")
                .append(" as state,dept.sortindex from sys_dept dept left join cf_dept_ext cde ON dept.ID = cde.sys_dept_id  where 1=1 ");
        if (id != null) {
            list.add(id);
            sql.append(" and dept.parentid= ? ");
        } else {
            Sys_User scalarMap = this.userDao.getCurrentLoginUser(this.session);
            list.add(scalarMap.getDeptid());
            sql.append(" and dept.id= ? ");
        }
        sql.append(" and dept.deptlevel = '1' ");
        sql.append("  order by  dept.deptlevel desc,dept.sortindex ");
        HashMap scalarMap1 = new HashMap();
        scalarMap1.put("id", StandardBasicTypes.STRING);
        scalarMap1.put("parentid", StandardBasicTypes.STRING);
        scalarMap1.put("unitid", StandardBasicTypes.STRING);
        scalarMap1.put("chinaname", StandardBasicTypes.STRING);
        scalarMap1.put("deptlevel", StandardBasicTypes.INTEGER);
        scalarMap1.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap1.put("iconCls", StandardBasicTypes.STRING);
        scalarMap1.put("state", StandardBasicTypes.STRING);
        scalarMap1.put("sortindex", StandardBasicTypes.STRING);
        scalarMap1.put("dept_properties", StandardBasicTypes.INTEGER);
        scalarMap1.put("dept_ext_id", StandardBasicTypes.LONG);
        return this.listByNativeByPage(StringUtil.getStr(sql), scalarMap1, pageInfo, list);
    }



    /**
     * 查询人员列表，可以传查询条件
     *
     * @param pageinfo
     * @return
     */
    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT sd.id,\n" +
                "       sd.chinaname,\n" +
                "       cde.dept_properties,\n" +
                "       cde.area_id,\n" +
                "       cde.person_num,\n" +
                "       cde.is_independent_office,\n" +
                "       cde.delstatus\n" +
                "  FROM sys_dept sd\n" +
                "  LEFT JOIN cf_dept_ext cde\n" +
                "    ON sd. ID = cde.sys_dept_id\n" +
                "   left join sys_user su on cde.leader_id = su.id\n" +
                " where 1=1");
        String chinaname = null;
        String area_id = null;
        String dept_properties = null;
        String start_person_num = null;
        String end_person_num = null;
        String is_independent_office = null;
        String address = null;
        String zip_code = null;
        String credit_code = null;
        String duty_man = null;
        String fax = null;
        String warning_mobile = null;
        String warning_telephone = null;
        String delstatus = null;
        if (map != null) {
            chinaname = StringUtil.getStr(map.get("chinaname"));
            area_id = StringUtil.getStr(map.get("area_id"));
            dept_properties = StringUtil.getStr(map.get("dept_properties"));
            start_person_num = StringUtil.getStr(map.get("start_person_num"));
            end_person_num = StringUtil.getStr(map.get("end_person_num"));
            is_independent_office = StringUtil.getStr(map.get("is_independent_office"));
            address = StringUtil.getStr(map.get("address"));
            zip_code = StringUtil.getStr(map.get("zip_code"));
            credit_code = StringUtil.getStr(map.get("credit_code"));
            duty_man = StringUtil.getStr(map.get("duty_man"));
            fax = StringUtil.getStr(map.get("fax"));
            warning_mobile = StringUtil.getStr(map.get("warning_mobile"));
            warning_telephone = StringUtil.getStr(map.get("warning_telephone"));
            delstatus = StringUtil.getStr(map.get("delstatus"));
        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        if (!StringUtil.isNullOrWhiteSpace(chinaname)) {
            list.add("%" + chinaname + "%");
            sql.append("and sd.chinaname like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(area_id)) {
            list.add(area_id);
            sql.append(" and cde.area_id = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(dept_properties)) {
            list.add(dept_properties);
            sql.append(" and cde.dept_properties = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(start_person_num)) {
            list.add(start_person_num);
            sql.append(" and cde.start_person_num >=? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(end_person_num)) {
            list.add(end_person_num);
            sql.append(" and cde.end_person_num <= ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(is_independent_office)) {
            list.add(is_independent_office);
            sql.append(" and cde.is_independent_office = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(address)) {
            list.add(address);
            sql.append(" and cde.address like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(zip_code)) {
            list.add(zip_code);
            sql.append(" and cde.zip_code = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(credit_code)) {
            list.add(credit_code);
            sql.append(" and cde.credit_code = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(duty_man)) {
            list.add(duty_man);
            sql.append(" and su.chinaname = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(fax)) {
            list.add(fax);
            sql.append(" and cde.fax like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(warning_mobile)) {
            list.add(warning_mobile);
            sql.append(" and cde.warning_mobile like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(warning_telephone)) {
            list.add(warning_telephone);
            sql.append(" and cde.warning_telephone like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(delstatus);
            sql.append(" and cde.delstatus = ? ");
        }
        sql.append(" order by sd.sortindex  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        scalarMap.put("dept_properties", StandardBasicTypes.STRING);
        scalarMap.put("area_id", StandardBasicTypes.STRING);
        scalarMap.put("person_num", StandardBasicTypes.STRING);
        scalarMap.put("is_independent_office", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.STRING);

        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        Map<String, String> renameMap = Maps.newHashMap();
        renameMap.put("dept_properties", "dept_properties_txt");
        renameMap.put("area_id", "area_id_txt");
        renameMap.put("is_independent_office", "is_independent_office_txt");
        colsRemarkService.convertCategoryColnums("cf_dept_ext", gr, renameMap);
        return gr;
    }


    @Override
    public Cf_Dept_Ext loadCfDeptExtBySysDeptId(String sysDeptId) {
        String hql = " from Cf_Dept_Ext t  where t.sys_dept_id = ? \n";
        List list = new ArrayList();
        list.add(sysDeptId);
        Cf_Dept_Ext cf_Dept_Ext = this.unique(hql, list);
        return cf_Dept_Ext;
    }

    @Override
    public GridResult loadDeptList(PageInfo pageInfo, Map map) {
        String sql = "select t.id,\n" +
                "       t.unitcode,\n" +
                "       t.deptlevel,\n" +
                "       t.sortindex,\n" +
                "       t.chinaname,\n" +
                "       t.parentid,\n" +
                "       cde.delstatus,\n" +
                "       cde.dept_properties,\n" +
                "       cde.person_num,\n" +
                "       cde.area_id,\n" +
                "       ca.area_name,\n" +
                "       cde.is_independent_office\n" +
                "  from sys_dept t\n" +
                "  left join cf_dept_ext cde\n" +
                "  on t.id = cde.sys_dept_id\n" +
                "  left join sys_user u\n" +
                "  on u.id = cde.leader_id\n" +
                "  left join cf_area ca\n" +
                "  on ca.id = cde.area_id\n" +
                "  where 1=1\n ";
        String chinaname = StringUtil.getStr(map.get("chinaname"));
        String area_id = StringUtil.getStr(map.get("area_id"));
        String dept_properties = StringUtil.getStr(map.get("dept_properties"));
        String is_independent_office = StringUtil.getStr(map.get("is_independent_office"));
        String min_person = StringUtil.getStr(map.get("min_person"));
        String max_person = StringUtil.getStr(map.get("max_person"));
        String address = StringUtil.getStr(map.get("address"));
        String zip_code = StringUtil.getStr(map.get("zip_code"));
        String credit_code = StringUtil.getStr(map.get("credit_code"));
        String leader_name = StringUtil.getStr(map.get("leader_name"));
        String fax = StringUtil.getStr(map.get("fax"));
        String warning_mobile = StringUtil.getStr(map.get("warning_mobile"));
        String warning_telephone = StringUtil.getStr(map.get("warning_telephone"));
        String delstatus = StringUtil.getStr(map.get("delstatus"));
        String queryDept = StringUtil.getStr(map.get("queryDept"));
        List<Object> list = new ArrayList();
        ;//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(chinaname)) {
            list.add("%" + chinaname + "%");
            sql += " and t.chinaname like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(area_id)) {
            list.add(Long.parseLong(area_id));
            sql += " and cde.area_id = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(dept_properties)) {
            list.add(Integer.parseInt(dept_properties));
            sql += " and cde.dept_properties = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(is_independent_office)) {
            list.add(Integer.parseInt(is_independent_office));
            sql += " and cde.is_independent_office = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(min_person)) {
            list.add(Integer.parseInt(min_person));
            sql += " and cde.person_num >= ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(max_person)) {
            list.add(Integer.parseInt(max_person));
            sql += " and cde.person_num <= ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(address)) {
            list.add("%" + address + "%");
            sql += " and cde.address like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(zip_code)) {
            list.add(zip_code);
            sql += " and cde.zip_code = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(credit_code)) {
            list.add(credit_code);
            sql += " and cde.credit_code = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(leader_name)) {
            list.add(leader_name);
            sql += " and u.leader_name = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(fax)) {
            list.add(fax);
            sql += " and cde.fax = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(warning_mobile)) {
            list.add(warning_mobile);
            sql += " and cde.warning_mobile = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(warning_telephone)) {
            list.add(warning_telephone);
            sql += " and cde.warning_telephone = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(Integer.parseInt(delstatus));
            sql += " and cde.delstatus = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(queryDept)) {
            if (queryDept.equals("false")) {
                //不查普通部门
                sql += " and t.deptlevel = 1 \n";
            }
        }
        sql += " order by t.sortindex,t.chinaname  \n";
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("unitcode", StandardBasicTypes.STRING);
        scalarMap.put("deptlevel", StandardBasicTypes.LONG);
        scalarMap.put("sortindex", StandardBasicTypes.INTEGER);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        scalarMap.put("parentid", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("dept_properties", StandardBasicTypes.INTEGER);
        scalarMap.put("person_num", StandardBasicTypes.INTEGER);
        scalarMap.put("area_id", StandardBasicTypes.LONG);
        scalarMap.put("area_name", StandardBasicTypes.STRING);
        scalarMap.put("is_independent_office", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("cf_dept_ext", gr, null);
        return gr;
    }

    @Override
    public Map<String, Object> getMonitorCenterById(String deptId) {
        //1、构造hql
        String sql = "select t.id,\n" +
                "t.unitcode,\n" +
                "t.deptlevel,\n" +
                "t.chinaname,\n" +
                "t.parentid,\n" +
                "t.unitid,\n" +
                "cde.id as cf_id,\n" +
                "cde.delstatus,\n" +
                "cde.dept_properties,\n" +
                "cde.person_num,\n" +
                "cde.area_id,\n" +
                "cde.address,\n" +
                "cde.zip_code,\n" +
                "cde.fax,\n" +
                "cde.leader_id,\n" +
                "cde.warning_mobile,\n" +
                "cde.warning_telephone,\n" +
                "cde.credit_code,\n" +
                "cde.is_independent_office,\n" +
                "cde.union_dept_name,\n" +
                "ca.area_name,\n" +
                "su.chinaname as leader_name, \n" +
                "t2.chinaname as parent_name \n" +
                "from sys_dept t \n" +
                "left join cf_dept_ext cde on t.id = cde.sys_dept_id\n" +
                "left join cf_area ca on cde.area_id = ca.id and ca.delstatus = 0 \n" +
                "left join sys_user su on su.id = cde.leader_id and su.delstatus = 0\n" +
                "left join sys_dept t2 on t2.id = t.parentid\n" +
                "where 1=1";
        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(deptId)) {
            list.add(deptId);
            sql += " and t.id = ? \n";
        }
        HashMap<String, Type> scalarmap = new HashMap<String, Type>();
        scalarmap.put("id", StandardBasicTypes.STRING);
        scalarmap.put("unitcode", StandardBasicTypes.STRING);
        scalarmap.put("deptlevel", StandardBasicTypes.LONG);
        scalarmap.put("chinaname", StandardBasicTypes.STRING);
        scalarmap.put("parentid", StandardBasicTypes.STRING);
        scalarmap.put("unitid", StandardBasicTypes.STRING);
        scalarmap.put("cf_id", StandardBasicTypes.LONG);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("dept_properties", StandardBasicTypes.INTEGER);
        scalarmap.put("person_num", StandardBasicTypes.INTEGER);
        scalarmap.put("area_id", StandardBasicTypes.LONG);
        scalarmap.put("address", StandardBasicTypes.STRING);
        scalarmap.put("zip_code", StandardBasicTypes.STRING);
        scalarmap.put("fax", StandardBasicTypes.STRING);
        scalarmap.put("leader_id", StandardBasicTypes.STRING);
        scalarmap.put("warning_mobile", StandardBasicTypes.STRING);
        scalarmap.put("warning_telephone", StandardBasicTypes.STRING);
        scalarmap.put("credit_code", StandardBasicTypes.STRING);
        scalarmap.put("is_independent_office", StandardBasicTypes.INTEGER);
        scalarmap.put("union_dept_name", StandardBasicTypes.STRING);
        scalarmap.put("area_name", StandardBasicTypes.STRING);
        scalarmap.put("leader_name", StandardBasicTypes.STRING);
        scalarmap.put("parent_name", StandardBasicTypes.STRING);
        return this.uniqueByNative(sql, scalarmap, list);
    }

    @Override
    public List<HashMap> getChildren(Long area_id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select  cfa.id")
                .append(" from cf_area cfa ")
                .append(" where cfa.delstatus = 0")
                .append(" and (cfa.id = ? or cfa.parentid = ? " +
                        " or cfa.parentid in (" +
                        " select id " +
                        " from cf_area " +
                        " where delstatus = 0" +
                        " and parentid = ?))")
                .append(" order by cfa.id");
        List params = new ArrayList();
        params.add(area_id);
        params.add(area_id);
        params.add(area_id);
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        return this.listByNative(sql.toString(), scalarMap, params);
    }

}