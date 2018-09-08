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
import com.skytech.project.wqt.dao.IOa_WhDao;
import com.skytech.project.wqt.model.Oa_Wh;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("oa_WhDao")
public class Oa_WhDao extends MainBaseDao<Oa_Wh, Long> implements IOa_WhDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


    @Override
    public GridResult loadList(PageInfo pageInfo, Map map) {
        String sql = "select wh.id,wh.zh,wh.delstatus from oa_wh wh where 1 = 1 ";
        String zh_name = StringUtil.getStr(map.get("zh_name")); //对外材料名称
        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(zh_name)){
            list.add("%"+zh_name+"%");
            sql += " and wh.zh like ? " ;
        }
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("zh", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("oa_wh",gr,null);
        return gr;
    }
}