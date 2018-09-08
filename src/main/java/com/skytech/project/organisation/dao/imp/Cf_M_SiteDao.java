package com.skytech.project.organisation.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.organisation.dao.ICf_M_SiteDao;
import com.skytech.project.organisation.model.Cf_M_Site;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("cf_M_SiteDao")
public class Cf_M_SiteDao extends MainBaseDao<Cf_M_Site, Long> implements ICf_M_SiteDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


    @Override
    public GridResult LoadList(PageInfo pageInfo, Map map) {
        String sql = "select cms.id," +
                "       cms.name," +
                "       cms.area_id," +
                "       cms.unit_properties," +
                "       cms.unit_type," +
                "       ca.area_name" +
                "  from cf_m_site cms,cf_area ca" +
                " where cms.area_id = ca.id and cms.delstatus = 0";
        String name = StringUtil.getStr(map.get("name"));
        String dept_ext_id = StringUtil.getStr(map.get("dept_ext_id"));
        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(dept_ext_id)){
            list.add(Integer.valueOf(dept_ext_id));
            sql += " and cms.dept_id = ? " ;
        }
        if(!StringUtil.isNullOrWhiteSpace(name)){
            list.add("%"+name+"%");
            sql += " and cms.name like ? " ;
        }
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("area_id", StandardBasicTypes.LONG);
        scalarMap.put("unit_properties", StandardBasicTypes.INTEGER);
        scalarMap.put("unit_type", StandardBasicTypes.INTEGER);
        scalarMap.put("area_name", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("cf_m_site",gr,null);
        return gr;
    }
}