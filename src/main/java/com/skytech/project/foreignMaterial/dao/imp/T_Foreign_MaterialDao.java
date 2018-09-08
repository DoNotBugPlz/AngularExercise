package com.skytech.project.foreignMaterial.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.foreignMaterial.dao.IT_Foreign_MaterialDao;
import com.skytech.project.foreignMaterial.model.T_Foreign_Material;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("t_Foreign_MaterialDao")
public class T_Foreign_MaterialDao extends MainBaseDao<T_Foreign_Material, Long> implements IT_Foreign_MaterialDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult loadList(PageInfo pageInfo, Map map) {
        String sql = "select fm.id,\n" +
                "       fm.foreign_name,\n" +
                "       fm.delstatus,\n" +
                "       fm.specification,\n" +
                "       fm.foreign_material_status,\n" +
                "       fm.receive_dept_name,\n" +
                "       fm.adder,\n" +
                "       fm.adderdeptid,\n" +
                "       fm.addtime,\n" +
                "       fm.moder,\n" +
                "       fm.modtime,\n" +
                "       fm.moderdeptid,\n" +
                "       fm.adderip,\n" +
                "       fm.moderip,\n" +
                "       fm.upload\n" +
                "  from t_foreign_material fm where fm.delstatus = 0";
        String foreign_material_name = StringUtil.getStr(map.get("foreign_material_name")); //对外材料名称
        String receive_dept_name = StringUtil.getStr(map.get("receive_dept_name")); // 发送对象
        String adder =  StringUtil.getStr(map.get("adder")); // 添加人
        String start_time =  StringUtil.getStr(map.get("start_time")); // 开始时间
        String end_time =  StringUtil.getStr(map.get("end_time")); // 结束时间
        String review_status =  StringUtil.getStr(map.get("review_status"));  // 审核状态 （工作流）
        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(foreign_material_name)){
            list.add("%"+foreign_material_name+"%");
            sql += " and fm.foreign_name like ? " ;
        }
        if(!StringUtil.isNullOrWhiteSpace(receive_dept_name)){
            list.add("%"+receive_dept_name+"%");
            sql += " and fm.receive_dept_name like ?";
        }
        if(!StringUtil.isNullOrWhiteSpace(adder)){
            list.add("%"+adder+"%");
            sql +=  " and fm.adder like ?";
        }
        if(!StringUtil.isNullOrWhiteSpace(adder)){
            list.add("%"+adder+"%");
            sql +=  " and fm.adder like ?";
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            list.add(start_time+" 00:00:00");
            sql+=" and fm.addtime >= to_date(?,'yyyy-mm-dd hh24:mi:ss') " ;
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            list.add(end_time+" 23:59:59");
            sql+=" and fm.addtime <= to_date(?,'yyyy-mm-dd hh24:mi:ss') " ;
        }
        sql += "order by fm.addtime desc";
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("foreign_name", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.LONG);
        scalarMap.put("specification", StandardBasicTypes.STRING);
        scalarMap.put("foreign_material_status", StandardBasicTypes.INTEGER);
        scalarMap.put("receive_dept_name", StandardBasicTypes.STRING);
        scalarMap.put("adder", StandardBasicTypes.STRING);
        scalarMap.put("adderdeptid", StandardBasicTypes.STRING);
        scalarMap.put("addtime", StandardBasicTypes.TIMESTAMP);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("t_foreign_material",gr,null);
        return gr;
    }
}