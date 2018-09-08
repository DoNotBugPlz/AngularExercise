package com.skytech.project.exchange.service;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.exchange.model.T_Exchange_Info;

import java.util.List;
import java.util.Map;

public interface IT_Exchange_InfoService extends IBaseService<T_Exchange_Info, Long> {


    ResultJO search(PageInfo pageInfo, Map map);

    int delList(List<String> strings);
}