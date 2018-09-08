/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.imp;

import com.google.common.collect.Maps;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_UserDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("t_Fine_UserDao")
public class T_Fine_UserDao extends MainBaseDao<T_Fine_User, Long> implements IT_Fine_UserDao {


    @Override
    public List loadUserConfig(Map param) {
        StringBuilder sql = new StringBuilder();
        sql.append(" select  " +
                " fu.id," +
                " fu.user_id," +
                " fu.login_code," +
                " fu.password," +
                " fu.ip," +
                " fu.port," +
                " fu.project_name," +
                " fu.project_index ")
                .append(" from t_fine_user fu")
                .append(" where fu.delstatus = 0 ");
        List<Object> params = new ArrayList<>();
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("login_code", StandardBasicTypes.STRING);
        scalarMap.put("password", StandardBasicTypes.STRING);
        scalarMap.put("ip", StandardBasicTypes.STRING);
        scalarMap.put("port", StandardBasicTypes.INTEGER);
        scalarMap.put("project_name", StandardBasicTypes.STRING);
        scalarMap.put("project_index", StandardBasicTypes.STRING);
        return this.listByNative(sql.toString(), scalarMap, params);
    }
}