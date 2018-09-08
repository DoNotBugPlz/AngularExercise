package com.skytech.project.area.service.imp;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.area.dao.ICf_AreaDao;
import com.skytech.project.area.model.Cf_Area;
import com.skytech.project.area.service.ICf_AreaService;
import org.flowable.app.service.editor.BaseAppDefinitionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author cr
 * @desc 区划ServiceImpl
 * @Time 2018/8/23 14:38
 */
@Service("cf_AreaService")
public class Cf_AreaService extends BaseService<Cf_Area, Long> implements ICf_AreaService{

    private ICf_AreaDao cf_AreaDao;

    @Resource(name="cf_AreaDao")
    @Override
    public void setBaseDao(IDao<Cf_Area, Long> baseDao) {
        this.cf_AreaDao = (ICf_AreaDao)baseDao;
        this.baseDao = baseDao;
    }

    @Override
    public ResultJO loadListAreaTree(Long area_id) {
        return ResultJO.getDefaultResult(cf_AreaDao.loadListAreaTree(area_id));
    }
}
