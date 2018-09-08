package com.skytech.project.material.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.material.dao.IT_Material_SubmissionDao;
import com.skytech.project.material.service.IT_Material_SubmissionService;
import com.skytech.project.material.model.T_Material_Submission;

@Service("t_Material_SubmissionService")
public class T_Material_SubmissionService extends BaseService<T_Material_Submission, String> implements IT_Material_SubmissionService {

    private IT_Material_SubmissionDao t_Material_SubmissionDao;

    @Resource(name = "t_Material_SubmissionDao")
    @Override
    public void setBaseDao(IDao<T_Material_Submission, String> baseDao) {
        this.t_Material_SubmissionDao = (IT_Material_SubmissionDao) baseDao;
        this.baseDao = baseDao;
    }
}