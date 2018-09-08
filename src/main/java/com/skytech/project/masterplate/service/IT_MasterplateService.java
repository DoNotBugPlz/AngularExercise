package com.skytech.project.masterplate.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.masterplate.model.T_Masterplate;

import java.util.Map;

public interface IT_MasterplateService extends IBaseService<T_Masterplate, Long> {


    GridResult search(PageInfo pageInfo, Map map);

    Map loadMasterplateInfo(String id);

    void changeStatue(String id, String value);
}