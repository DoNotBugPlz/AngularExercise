package com.skytech.project.demo.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.demo.model.T_Demo;

import java.util.Map;

public interface IT_DemoService extends IBaseService<T_Demo, Long> {

    GridResult loadList(PageInfo pageInfo, Map map);

}