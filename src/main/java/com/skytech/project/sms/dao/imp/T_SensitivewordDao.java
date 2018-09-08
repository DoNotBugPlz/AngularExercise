package com.skytech.project.sms.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.sms.dao.IT_SensitivewordDao;
import com.skytech.project.sms.model.T_Sensitiveword;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Repository("t_SensitivewordDao")
public class T_SensitivewordDao extends MainBaseDao<T_Sensitiveword, Long> implements IT_SensitivewordDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql.append("select n.id,n.delstatus,n.sensitive  ")
                .append(" from t_sensitiveword n where 1=1  ");
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        String keyword = null;
        String status = null;
        if (map != null) {
            keyword = StringUtil.getStr(map.get("keyword")) ;
            status = StringUtil.getStr(map.get("status")) ;
        }
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and n.sensitive like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(status)) {
            list.add(Integer.parseInt(status));
            sql.append("  and n.delstatus = ? ");
        }

        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("sensitive", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        colsRemarkService.convertCategoryColnums("T_Sensitiveword", gr, null);
        return gr;
    }
}