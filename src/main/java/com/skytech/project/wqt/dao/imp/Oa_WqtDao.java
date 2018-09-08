package com.skytech.project.wqt.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.wqt.dao.IOa_WqtDao;
import com.skytech.project.wqt.model.Oa_Wqt;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("oa_WqtDao")
public class Oa_WqtDao extends MainBaseDao<Oa_Wqt, Long> implements IOa_WqtDao{
    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult loadList(PageInfo pageInfo, Map map) {
        String sql = "select w.id," +
                "       w.name," +
                "       w.remark," +
                "       w.sortindex," +
                "       w.delstatus," +
                "       w.fair_character," +
                "       w.upload," +
                "       w.adder," +
                "       w.addtime," +
                "       w.adderdeptid," +
                "       w.moder," +
                "       w.modtime," +
                "       w.moderdeptid" +
                "  from oa_wqt w where w.delstatus = 0 ";
        String wqt_name = StringUtil.getStr(map.get("wqt_name")); //对外材料名称
        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(wqt_name)){
            list.add("%"+wqt_name+"%");
            sql += " and w.name like ? " ;
        }
        sql += "order by w.sortindex desc";

        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("remark", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("adder", StandardBasicTypes.STRING);
        scalarMap.put("adderdeptid", StandardBasicTypes.STRING);
        scalarMap.put("fair_character", StandardBasicTypes.STRING);
        scalarMap.put("addtime", StandardBasicTypes.CALENDAR_DATE);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("oa_wqt",gr,null);
        return gr;
    }
}