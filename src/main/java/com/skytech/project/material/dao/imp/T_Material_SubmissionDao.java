package com.skytech.project.material.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.material.dao.IT_Material_SubmissionDao;
import com.skytech.project.material.model.T_Material_Submission;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Repository("t_Material_SubmissionDao")
public class T_Material_SubmissionDao extends MainBaseDao<T_Material_Submission, String> implements IT_Material_SubmissionDao {

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


}