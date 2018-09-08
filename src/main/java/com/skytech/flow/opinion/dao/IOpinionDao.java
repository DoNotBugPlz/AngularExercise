package com.skytech.flow.opinion.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.flow.opinion.model.Opinion;

import java.util.List;
import java.util.Map;

/**
 * Created by fengxiangxiang on 2017/8/16.
 */
public interface IOpinionDao extends IDao<Opinion,String> {
    List<Opinion> findBy(String processInsId);

    List<Map<String, Object>> findByTaskId(String taskId);

    Map<String,Object> getCurrentUserOpinion(String processInsId, String taskId, String loginName);
}
