/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.imp;


import com.google.common.collect.Maps;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_ObjectDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Object;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository("t_Fine_ObjectDao")
public class T_Fine_ObjectDao extends MainBaseDao<T_Fine_Object, Long> implements IT_Fine_ObjectDao {
    @Override
    public List search(Long config_id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select fo.id," +
                " fo.fine_config_id," +
                " fo.user_id," +
                " fo.delstatus," +
                " fo.dept_id," +
                " u.chinaname as name," +
                " d.chinaname dept_name," +
                " d.simplechinaname sdept_name ")
                .append(" from t_fine_object fo " +
                        " left join cf_user_ext ue on ue.id = fo.user_id" +
                        " left join sys_user u on u.id = ue.sys_user_id " +
                        " left join sys_dept d on d.id = u.deptid")
                .append(" where fo.delstatus = 0" +
                        " and u.delstatus = 0 " +
                        " and ue.delstatus = 0" +
                        " and d.delstatus = 0 " +
                        " and fo.fine_config_id = ?");
        List params = new ArrayList();
        params.add(config_id);
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("fine_config_id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("dept_id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("dept_name", StandardBasicTypes.STRING);
        scalarMap.put("sdept_name", StandardBasicTypes.STRING);
        return this.listByNative(sql.toString(), scalarMap, params);
    }

    @Override
    public Boolean delList(Long config_id, List<Long> user_ids) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_fine_object " +
                "set delstatus = 1 ")
                .append(" where delstatus = 0" +
                        " and fine_config_id = ?");
        List params = new ArrayList();
        params.add(config_id);
//        StringExtUtil.loadCheckSqlByCheckIdNumList(" user_id", user_ids);
        return this.execteNativeBulk(sql.toString(), params) == 1 ? true : false;
    }
}