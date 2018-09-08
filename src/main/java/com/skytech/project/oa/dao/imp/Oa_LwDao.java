package com.skytech.project.oa.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.oa.dao.IOa_LwDao;
import com.skytech.project.oa.model.Oa_Lw;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("oa_LwDao")
public class Oa_LwDao extends MainBaseDao<Oa_Lw, Long> implements IOa_LwDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult loadList(PageInfo pageInfo, Map map) {
        String sql = "select lw.id," +
                "       lw.title," +
                "       lw.wh," +
                "       lw.wh_id," +
                "       lw.subject_value," +
                "       lw.key_value," +
                "       lw.limit_date," +
                "       lw.receive_date," +
                "       lw.send_dept," +
                "       lw.singer_name," +
                "       lw.emergency," +
                "       lw.open_range," +
                "       lw.upload," +
                "       lw.upload_zw," +
                "       lw.adder," +
                "       lw.adderdeptid," +
                "       lw.addtime," +
                "       lw.moder," +
                "       lw.moderdeptid," +
                "       lw.modtime" +
                "  from oa_lw lw  where 1 = 1";

        String key_value = StringUtil.getStr(map.get("key_value"));
        String start_time = StringUtil.getStr(map.get("start_time"));
        String end_time = StringUtil.getStr(map.get("end_time"));
        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(key_value)){
            list.add("%"+key_value+"%");
            sql += " and lw.key_value like ? " ;
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            list.add(start_time+" 00:00:00");
            sql+=" and lw.receive_date >= to_date(?,'yyyy-mm-dd hh24:mi:ss') " ;
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            list.add(end_time+" 23:59:59");
            sql+=" and lw.receive_date <= to_date(?,'yyyy-mm-dd hh24:mi:ss') " ;
        }

        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("title", StandardBasicTypes.STRING);
        scalarMap.put("wh", StandardBasicTypes.STRING);
        scalarMap.put("send_dept", StandardBasicTypes.STRING);
        scalarMap.put("emergency", StandardBasicTypes.INTEGER);
        scalarMap.put("receive_date", StandardBasicTypes.TIMESTAMP);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("oa_lw",gr,null);
        return gr;
    }




}