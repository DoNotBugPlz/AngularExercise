package com.skytech.project.area.dao.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.project.area.dao.ICf_AreaDao;
import com.skytech.project.area.model.Cf_Area;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author cr
 * @desc 区划Dao
 * @Time 2018/8/23 14:35
 */
@Repository("cf_AreaDao")
public class Cf_AreaDao extends MainBaseDao<Cf_Area, Long> implements ICf_AreaDao {

    @Override
    public List loadListAreaTree(Long area_id) {
        StringBuffer sql = new StringBuffer();
        sql.append("select area.id, case when area.parentid = '-1' then null else area.parentid end as parentid,area.area_no,area.area_name as text,area.area_level,area.delstatus, ")
                .append(" case when (select count(1) from cf_area a where a.parentid = area.id)>0 then 'closed' ")
                .append(" else 'open' end  ")
                .append(" as state from cf_area area where 1=1 ");

        List<Object> list = new ArrayList();
        if (area_id != null) {
            list.add(area_id);
            sql.append(" and area.parentid= ? ");
        } else if (area_id == null || area_id != -1) {
            Long rootId = area_id;
            if (area_id == null) {
                list.add(1);//暂时默认为江苏省
                sql.append(" and area.id= ? ");
            } else {
                list.add(rootId);
                sql.append(" and area.id= ? ");
            }
        }

        sql.append(" and area.delstatus=0  order by  area.sortindex ");
        HashMap<String, Type> scalarMap = new HashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("parentid", StandardBasicTypes.LONG);
        scalarMap.put("area_no", StandardBasicTypes.STRING);
        scalarMap.put("text", StandardBasicTypes.STRING);
        scalarMap.put("area_level", StandardBasicTypes.INTEGER);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("state", StandardBasicTypes.STRING);
        return this.listByNative(StringUtil.getStr(sql), scalarMap, list);
    }
}