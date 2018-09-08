package com.skytech.flow.opinion.service.impl;

import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.flow.opinion.dao.IOpinionDao;
import com.skytech.flow.opinion.model.Opinion;
import com.skytech.flow.opinion.service.IOpinionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by fengxiangxiang on 2017/8/16.
 * 审核意见服务接口实现
 */
@Service("opinionService")
public class OpinionService extends BaseService<Opinion, String> implements IOpinionService {

    private IOpinionDao opinionDao;

    @Override
    @Resource(name = "opinionDao")
    public void setBaseDao(IDao<Opinion, String> baseDao) {
        this.opinionDao = (IOpinionDao) baseDao;
        this.baseDao = baseDao;
    }

    /**
     * 获得指定流程的审核意见
     *
     * @param processInsId 流程标识
     * @return 指定流程的审核意见
     */
    @Override
    public List<Opinion> getBy(String processInsId) {
        return opinionDao.findBy(processInsId);
    }

    @Override
    public List<Map<String, Object>> getByTaskId(String taskId) {
        return opinionDao.findByTaskId(taskId);
    }

    @Override
    public Map<String, Object> getCurrentUserOpinion(String processInsId, String taskId, String loginName) {
        return opinionDao.getCurrentUserOpinion(processInsId,taskId,loginName);
    }
}
