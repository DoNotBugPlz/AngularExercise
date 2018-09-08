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
import com.skytech.project.sms.dao.IT_Sms_Server_MonitorDao;
import com.skytech.project.sms.model.T_Sms_Server_Monitor;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("t_Sms_Server_MonitorDao")
public class T_Sms_Server_MonitorDao extends MainBaseDao<T_Sms_Server_Monitor, Long> implements IT_Sms_Server_MonitorDao {
    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql.append("select n.id,n.menu_id,n.earlysituation,n.status from t_sms_server_monitor n  where 1=1");


        String status = null;
        String earlysituation = null;
        if (map != null) {
            status = StringUtil.getStr(map.get("status"));
            earlysituation = StringUtil.getStr(map.get("earlysituation"));
        }
        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(status)) {
            list.add(Integer.parseInt(status.toString()));
            sql.append(" and n.status = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(earlysituation)) {
            list.add(Integer.parseInt(earlysituation.toString()));
            sql.append(" and n.earlysituation = ? ");
        }
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("menu_id", StandardBasicTypes.STRING);
        scalarMap.put("earlysituation", StandardBasicTypes.INTEGER);
        scalarMap.put("status", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        colsRemarkService.convertCategoryColnums("t_sms_server_monitor", gr, null);
        return gr;
    }

}