package com.skytech.project.organisation.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.organisation.dao.ICf_User_ExtDao;
import com.skytech.project.organisation.model.Cf_User_Ext;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("cf_User_ExtDao")
public class Cf_User_ExtDao extends MainBaseDao<Cf_User_Ext, Long> implements ICf_User_ExtDao{
    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    /**
     * 查询人员列表
     * @param pageinfo
     * @return
     */
    @Override
    public GridResult loadWorkUserList(PageInfo pageinfo, Map map) {
        //1、构造hql
        String sql = "SELECT " +
                "       su.id,\n" +
                "       cue.id as userExt_id,\n" +
                "       su.chinaname,\n" +
                "       su.sex,\n" +
                "       su.birth,\n" +
                "       cue.education,\n" +
                "       ca.area_name,\n" +
                "       cue.user_type,\n" +
                "       cue.delstatus\n" +
                "  FROM sys_user su\n" +
                "  LEFT JOIN cf_user_ext cue\n" +
                "    ON su.id = cue.sys_user_id\n" +
                "  LEFT JOIN cf_dept_ext cde\n" +
                "    ON cde.id = cue.dept_id\n" +
                "  LEFT JOIN cf_area ca\n" +
                "  on ca.id = cde.area_id\n" +
                "  LEFT JOIN sys_dept sd\n" +
                "    ON sd.id = su.deptid\n" +
                "  LEFT JOIN sys_dept ud\n" +
                "    ON ud.id = su.unitid\n" +
                " where cue.user_type != 3";
        String dept_id = StringUtil.getStr(map.get("dept_id"));
        String parent_id = StringUtil.getStr(map.get("parent_id"));
        String chinaname = StringUtil.getStr(map.get("chinaname"));
        String sex = StringUtil.getStr(map.get("sex"));
        String education = StringUtil.getStr(map.get("education"));
        String birth = StringUtil.getStr(map.get("birth"));
        String user_type = StringUtil.getStr(map.get("user_type"));
        String area_id = StringUtil.getStr(map.get("area_id"));
        String loginname = StringUtil.getStr(map.get("loginname"));
        String unit_name = StringUtil.getStr(map.get("unit_name"));
        String dept_name = StringUtil.getStr(map.get("dept_name"));
        String zw = StringUtil.getStr(map.get("zw"));
        String mobile = StringUtil.getStr(map.get("mobile"));
        String phonedept = StringUtil.getStr(map.get("phonedept"));
        String enter_post_date = StringUtil.getStr(map.get("enter_post_date"));
        String delstatus = StringUtil.getStr(map.get("delstatus"));
        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(dept_id)) {
            if (!StringUtil.isNullOrWhiteSpace(parent_id)) {
                list.add(dept_id);
                list.add(parent_id);
                sql+=" and (sd.id = ? or (sd.parentid = ? and sd.deptlevel = 2))\n";
            }else{
                list.add(dept_id);
                sql+=" and sd.id = ? \n";
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(chinaname)) {
            list.add("%" + chinaname + "%");
            sql+=" and su.chinaname like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(sex)) {
            list.add(Integer.parseInt(sex));
            sql+=" and su.sex = ? \n" ;
        }
        if (!StringUtil.isNullOrWhiteSpace(education)) {
            list.add(education);
            sql+=" and cue.education = ? \n" ;
        }
        if (!StringUtil.isNullOrWhiteSpace(birth)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-DD")
                        .parse(birth));
                sql+=" and su.birth = ? \n" ;
            }catch (Exception e){
                e.getStackTrace();
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(area_id)) {
            list.add(Long.parseLong(area_id));
            sql+=" and cde.area_id = ? \n" ;
        }
        if (!StringUtil.isNullOrWhiteSpace(user_type)) {
            list.add(Integer.parseInt(user_type));
            sql+=" and cue.user_type = ? \n" ;
        }
        if (!StringUtil.isNullOrWhiteSpace(loginname)) {
            list.add("%" + loginname + "%");
            sql+=" and su.loginname like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(unit_name)) {
            list.add("%" + unit_name + "%");
            sql+=" and ud.chinaname like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(dept_name)) {
            list.add("%" + dept_name + "%");
            sql+=" and sd.chinaname like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(zw)) {
            list.add("%" + zw + "%");
            sql+=" and cue.zw like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(mobile)) {
            list.add("%" + mobile + "%");
            sql+=" and su.mobile like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(phonedept)) {
            list.add("%" + phonedept + "%");
            sql+=" and su.phonedept like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(enter_post_date)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM")
                        .parse(enter_post_date));
                sql+=" and cue.enter_post_date = ? \n" ;
            }catch (Exception e){
                e.getStackTrace();
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(Integer.parseInt(delstatus));
            sql+=" and cue.delstatus = ? \n" ;
        }
        sql+=" order by sd.deptlevel ,sd.chinaname  \n";
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("userExt_id", StandardBasicTypes.LONG);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        scalarMap.put("sex", StandardBasicTypes.INTEGER);
        scalarMap.put("birth", StandardBasicTypes.DATE);
        scalarMap.put("education", StandardBasicTypes.INTEGER);
        scalarMap.put("area_name", StandardBasicTypes.STRING);
        scalarMap.put("user_type", StandardBasicTypes.INTEGER);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        gr =  colsRemarkService.convertCategoryColnums("sys_user",gr,null);
        gr =  colsRemarkService.convertCategoryColnums("cf_user_ext",gr,null);
        return gr;
    }

    @Override
    public Cf_User_Ext loadCfUserExtBySysUserId(String sysUserId) {
        String hql = " from Cf_User_Ext t where t.sys_user_id = ? \n";
        List list = new ArrayList();
        list.add(sysUserId);
        Cf_User_Ext userExt = this.unique(hql,list);
        return userExt;
    }
}