package com.skytech.project.material.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.material.dao.IT_Material_InfoDao;
import com.skytech.project.material.service.IT_Material_InfoService;
import com.skytech.project.material.model.T_Material_Info;

import java.util.List;
import java.util.Map;

@Service("t_Material_InfoService")
public class T_Material_InfoService extends BaseService<T_Material_Info, String> implements IT_Material_InfoService {

    private IT_Material_InfoDao t_Material_InfoDao;

    @Resource(name = "t_Material_InfoDao")
    @Override
    public void setBaseDao(IDao<T_Material_Info, String> baseDao) {
        this.t_Material_InfoDao = (IT_Material_InfoDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public ResultJO search(PageInfo pageInfo, Map map) {
        return ResultJO.getDefaultResult(t_Material_InfoDao.search(pageInfo, map));

    }

    @Override
    public String saveForm(Map params) {
        return null;
    }

    @Override
    public int delList(List<String> strings) {
        return t_Material_InfoDao.delList(strings);
    }

    @Override
    public ResultJO submissionList(PageInfo pageInfo, Map map) {
        return ResultJO.getDefaultResult(t_Material_InfoDao.submissionList(pageInfo, map));
    }


}