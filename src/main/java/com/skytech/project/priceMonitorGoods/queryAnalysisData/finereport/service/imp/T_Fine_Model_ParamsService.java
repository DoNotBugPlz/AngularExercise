/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.imp;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_Model_ParamsDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Model_Params;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_Model_ParamsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("t_Fine_Model_ParamsService")
public class T_Fine_Model_ParamsService extends BaseService<T_Fine_Model_Params, Long> implements IT_Fine_Model_ParamsService {

    private IT_Fine_Model_ParamsDao t_Fine_Model_ParamsDao;

    @Resource(name = "t_Fine_Model_ParamsDao")
    @Override
    public void setBaseDao(IDao<T_Fine_Model_Params, Long> baseDao) {
        this.t_Fine_Model_ParamsDao = (IT_Fine_Model_ParamsDao) baseDao;
        this.baseDao = baseDao;
    }

    @Override
    public GridResult getSelfParams(Long config_id, Long currentUserId, List<Long> area_ids) {
        GridResult result = t_Fine_Model_ParamsDao.getSelfParams(config_id, currentUserId, area_ids);
        if (result.getRows().size() < 1) {
            result = t_Fine_Model_ParamsDao.getSelfParams(config_id, null, area_ids);
        }
        return result;
    }
}