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
import com.skytech.project.oa.dao.IOa_FwDao;
import com.skytech.project.oa.model.Oa_Fw;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("oa_FwDao")
public class Oa_FwDao extends MainBaseDao<Oa_Fw, Long> implements IOa_FwDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


    @Override
    public GridResult loadList(PageInfo pageInfo, Map map) {
        String sql = "select fw.id," +
                "       fw.file_type," +
                "       fw.fw_name," +
                "       fw.main_send_name," +
                "       fw.copy_send_name," +
                "       fw.wh," +
                "       fw.emergency," +
                "       fw.cb_drafter," +
                "       fw.wh_id," +
                "       fw.print_name," +
                "       fw.print_num," +
                "       fw.open_range," +
                "       fw.issue_date," +
                "       fw.upload_zw," +
                "       fw.upload," +
                "       fw.adder," +
                "       fw.adderdeptid," +
                "       fw.addtime," +
                "       fw.moder," +
                "       fw.moderdeptid," +
                "       fw.modtime" +
                "  from oa_fw fw where 1 = 1";

        String fw_name = StringUtil.getStr(map.get("fw_name"));
        String emergency = StringUtil.getStr(map.get("emergency"));
        String file_type = StringUtil.getStr(map.get("file_type"));
        String start_time = StringUtil.getStr(map.get("start_time"));
        String end_time = StringUtil.getStr(map.get("end_time"));

        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(fw_name)){
            list.add("%"+fw_name+"%");
            sql += " and fw.fw_name like ? " ;
        }
        if(!StringUtil.isNullOrWhiteSpace(emergency)){
            list.add(emergency);
            sql += " and fw.emergency = ? " ;
        }
        if(!StringUtil.isNullOrWhiteSpace(file_type)){
            list.add(file_type);
            sql += " and fw.file_type = ? " ;
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            list.add(start_time+" 00:00:00");
            sql+=" and fw.issue_date >= to_date(?,'yyyy-mm-dd hh24:mi:ss') " ;
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            list.add(end_time+" 23:59:59");
            sql+=" and fw.issue_date <= to_date(?,'yyyy-mm-dd hh24:mi:ss') " ;
        }
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("file_type", StandardBasicTypes.INTEGER);
        scalarMap.put("emergency", StandardBasicTypes.INTEGER);
        scalarMap.put("fw_name", StandardBasicTypes.STRING);
        scalarMap.put("main_send_name", StandardBasicTypes.STRING);
        scalarMap.put("copy_send_name", StandardBasicTypes.STRING);
        scalarMap.put("wh_id", StandardBasicTypes.LONG);
        scalarMap.put("wh",StandardBasicTypes.STRING);
        scalarMap.put("upload_zw", StandardBasicTypes.LONG);
        scalarMap.put("upload",StandardBasicTypes.STRING);
        scalarMap.put("adder", StandardBasicTypes.STRING);
        scalarMap.put("adderdeptid", StandardBasicTypes.STRING);
        scalarMap.put("addtime", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("issue_date", StandardBasicTypes.TIMESTAMP);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("oa_fw",gr,null);
        return gr;
    }
}