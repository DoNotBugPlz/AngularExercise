/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.util.StringExtUtil;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_CollectDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Collect;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository("t_Fine_CollectDao")
public class T_Fine_CollectDao extends MainBaseDao<T_Fine_Collect, Long> implements IT_Fine_CollectDao {


    @Override
    public boolean cancelCollctData(HashMap params) {
        if (StringUtil.isNullOrWhiteSpace(StringUtil.getStr(params.get("ids")))
                && StringUtil.isNullOrWhiteSpace(StringUtil.getStr(params.get("user_id"))))
            return false;
        StringBuilder sql = new StringBuilder();
        sql.append("update t_fine_collect ")
                .append(" set delstatus = 1")
                .append(" where delstatus = 0" +
                        " and user_id = ?");
        List list = new ArrayList<>();
        list.add(Long.parseLong(StringUtil.getStr(params.get("user_id"))));
        return this.execteNativeBulk(sql.toString(), list) == 1 ? true : false;
    }
}