/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_Model_ParamsDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Model_Params;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("t_Fine_Model_ParamsDao")
public class T_Fine_Model_ParamsDao extends MainBaseDao<T_Fine_Model_Params, Long> implements IT_Fine_Model_ParamsDao {
    @Override
    public GridResult getSelfParams(Long config_id, Long currentUserId, List<Long> area_ids) {
        StringBuilder sql = new StringBuilder();
        sql.append(" select fmp.id," +
                " fmp.task_id," +
                " fmp.task_goods_id," +
                " fmp.task_index_id," +
                " fmp.task_m_site_id," +
                " fmp.fine_config_id," +
                " fmp.user_id," +
                " tt.name as task_name," +
                " tt.area_id," +
                " tt.task_level,," +
                " cfa.area_name")
                .append(" from t_fine_model_params fmp" +
                        " left join t_task tt on tt.id = fmp.task_id" +
                        " left join cf_area cfa on cfa.id = tt.area_id")
                .append(" where fmp.delstatus = 0")
                .append(" and fmp.fine_config_id = ? ")
                .append(" and tt.delstatus = 0")
                .append(" and tt.task_status = 1")
                .append(StringExtUtil.loadCheckSqlByCheckIdNumList(" tt.area_id", area_ids))
                .append(" and cfa.delstatus = 0");
        List list = new ArrayList<>();
        list.add(config_id);
        if (currentUserId != null) {
            list.add(currentUserId);
            sql.append(" and fmp.user_id = ? ");
        } else {
            list.add(config_id);
            sql.append(" and fmp.user_id = (select fc.user_id from t_fine_config fc where fc.id = ?) ");
        }
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("task_id", StandardBasicTypes.STRING);
        scalarMap.put("task_goods_id", StandardBasicTypes.STRING);
        scalarMap.put("task_index_id", StandardBasicTypes.STRING);
        scalarMap.put("task_m_site_id", StandardBasicTypes.STRING);
        scalarMap.put("fine_config_id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("task_name", StandardBasicTypes.STRING);
        scalarMap.put("area_id", StandardBasicTypes.LONG);
        scalarMap.put("area_name", StandardBasicTypes.STRING);
        return this.listByNativeByPage(sql.toString(), scalarMap, null, list);
    }

    @Override
    public GridResult getRootParams(Long config_id, List<Long> area_ids) {
        StringBuilder sql = new StringBuilder();
        sql.append(" select fmp.id," +
                " fmp.task_id," +
                " fmp.task_goods_id," +
                " fmp.task_index_id," +
                " fmp.task_m_site_id," +
                " fmp.fine_config_id," +
                " fmp.user_id," +
                " tt.name as task_name," +
                " tt.area_id," +
                " cfa.area_name")
                .append(" from t_fine_model_params fmp" +
                        " left join t_task tt on tt.id = fmp.task_id" +
                        " left join cf_area cfa on cfa.id = tt.area_id")
                .append(" where fmp.delstatus = 0")
                .append(" and fmp.fine_config_id = ? ")
                .append(" and tt.delstatus = 0")
                .append(" and tt.task_status = 1")
                .append(StringExtUtil.loadCheckSqlByCheckIdNumList(" tt.area_id", area_ids))
                .append(" and cfa.delstatus = 0");
        List list = new ArrayList<>();
        list.add(config_id);
        list.add(config_id);
        sql.append(" and fmp.user_id = (select fc.user_id from t_fine_config fc where fc.id = ?) ");
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("task_id", StandardBasicTypes.STRING);
        scalarMap.put("task_goods_id", StandardBasicTypes.STRING);
        scalarMap.put("task_index_id", StandardBasicTypes.STRING);
        scalarMap.put("task_m_site_id", StandardBasicTypes.STRING);
        scalarMap.put("fine_config_id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("task_name", StandardBasicTypes.STRING);
        scalarMap.put("area_id", StandardBasicTypes.LONG);
        scalarMap.put("area_name", StandardBasicTypes.STRING);
        return this.listByNativeByPage(sql.toString(), scalarMap, null, list);
    }
}