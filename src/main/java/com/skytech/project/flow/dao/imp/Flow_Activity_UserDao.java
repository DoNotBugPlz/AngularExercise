package com.skytech.project.flow.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.flow.dao.IFlow_Activity_UserDao;
import com.skytech.project.flow.model.Flow_Activity_User;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("flow_Activity_UserDao")
public class Flow_Activity_UserDao extends MainBaseDao<Flow_Activity_User, Long> implements IFlow_Activity_UserDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult LoadFauList(PageInfo pageInfo, Map map) {
        String sql = "select  s.id ,s.def_process_key,s.def_activity_key,s.user_ids,s.dept_ids,role_ids from flow_activity_user s where 1 = 1";
        String def_process_key = StringUtil.getStr(map.get("def_process_key"));
        String def_activity_key = StringUtil.getStr(map.get("def_activity_key"));
        List<Object> list = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(def_process_key)){
            list.add("%"+def_process_key+"%");
            sql += " and s.def_process_key like ? " ;
        }
        if(!StringUtil.isNullOrWhiteSpace(def_activity_key)){
            list.add("%"+def_activity_key+"%");
            sql += " and s.def_activity_key like ? " ;
        }
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("def_process_key", StandardBasicTypes.STRING);
        scalarMap.put("def_activity_key", StandardBasicTypes.STRING);
        scalarMap.put("user_ids", StandardBasicTypes.STRING);
        scalarMap.put("dept_ids", StandardBasicTypes.STRING);
        scalarMap.put("role_ids", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(),scalarMap,pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("oa_fw",gr,null);
        return gr;
    }

    @Override
    public Flow_Activity_User getFauInfo(Map map) {
        String flow_key = StringUtil.getStr(map.get("flow_key"));
        String flow_step_key = StringUtil.getStr(map.get("flow_step_key"));
        List<Object> list = new ArrayList();
        list.add(flow_key);
        list.add(flow_step_key);
        String hql = " from Flow_Activity_User s where s.def_process_key = ? and s.def_activity_key = ? ";
        Flow_Activity_User flow_activity_user = this.unique(hql,list);
        return flow_activity_user;
    }
}