package com.skytech.flow.opinion.dao.impl;

import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.flow.opinion.dao.IOpinionDao;
import com.skytech.flow.opinion.model.Opinion;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by fengxiangxiang on 2017/8/16.
 */
@Repository("opinionDao")
public class OpinionDao extends MainBaseDao<Opinion, String> implements IOpinionDao {

    @Override
    public List<Opinion> findBy(String processInsId) {
        String sql = "SELECT id AS \"id\",time AS \"time\", loginName AS \"loginName\",name AS \"name\",task_id AS \"taskId\", proc_inst_id AS \"processInstanceId\",message AS \"message\",field AS \"field\" FROM act_hi_opinion WHERE proc_inst_id = ?";
        List<String> params = new ArrayList<String>();
        params.add(processInsId);
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("time", StandardBasicTypes.STRING);
        scalarMap.put("loginName", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("taskId", StandardBasicTypes.STRING);
        scalarMap.put("processInstanceId", StandardBasicTypes.STRING);
        scalarMap.put("message", StandardBasicTypes.STRING);
        scalarMap.put("field", StandardBasicTypes.STRING);
        return this.listByNative(sql,scalarMap,params);
    }

    @Override
    public List<Map<String, Object>> findByTaskId(String taskId) {
        String sql = "SELECT id AS \"id\",time AS \"time\", loginName AS \"loginName\",name AS \"name\",task_id AS \"taskId\", proc_inst_id AS \"processInstanceId\",message AS \"message\",field AS \"field\" FROM act_hi_opinion WHERE task_id = ?";
        List<String> params = new ArrayList<String>();
        params.add(taskId);
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("time", StandardBasicTypes.STRING);
        scalarMap.put("loginName", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("taskId", StandardBasicTypes.STRING);
        scalarMap.put("processInstanceId", StandardBasicTypes.STRING);
        scalarMap.put("message", StandardBasicTypes.STRING);
        scalarMap.put("field", StandardBasicTypes.STRING);
        return this.listByNative(sql,scalarMap,params);
    }

    @Override
    public Map<String, Object> getCurrentUserOpinion(String processInsId, String taskId, String loginName) {
        String sql = "SELECT id AS \"id\",time AS \"time\", loginName AS \"loginName\",name AS \"name\",task_id AS \"taskId\", proc_inst_id AS \"processInstanceId\",message AS \"message\",field AS \"field\" FROM act_hi_opinion WHERE proc_inst_id=? AND task_id = ? AND loginName=?";
        List<String> params = new ArrayList<String>();
        params.add(processInsId);
        params.add(taskId);
        params.add(loginName);
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("time", StandardBasicTypes.STRING);
        scalarMap.put("loginName", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("taskId", StandardBasicTypes.STRING);
        scalarMap.put("processInstanceId", StandardBasicTypes.STRING);
        scalarMap.put("message", StandardBasicTypes.STRING);
        scalarMap.put("field", StandardBasicTypes.STRING);
        return this.uniqueByNative(sql,scalarMap,params);
    }
}
