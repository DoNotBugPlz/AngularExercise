package com.skytech.project.material.service;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.material.model.T_Material_Info;

import java.util.List;
import java.util.Map;

public interface IT_Material_InfoService extends IBaseService<T_Material_Info, String> {


    ResultJO search(PageInfo pageInfo, Map map);

    String saveForm(Map params);

    int delList(List<String> strings);

    ResultJO submissionList(PageInfo pageInfo, Map map);
}