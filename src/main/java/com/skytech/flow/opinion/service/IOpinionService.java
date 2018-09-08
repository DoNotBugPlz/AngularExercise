package com.skytech.flow.opinion.service;

import com.skytech.persistence.service.IBaseService;
import com.skytech.flow.opinion.model.Opinion;

import java.util.List;
import java.util.Map;

/**
 * Created by fengxiangxiang on 2017/8/16.
 * 审核意见服务接口
 */
public interface IOpinionService extends IBaseService<Opinion, String> {

    /**
     * 获得指定流程的审核意见
     *
     * @param processInsId 流程标识
     * @return 指定流程的审核意见
     */
    List<Opinion> getBy(String processInsId);

    List<Map<String, Object>> getByTaskId(String taskId);

    Map<String,Object> getCurrentUserOpinion(String processInsId, String taskId, String loginName);
}
