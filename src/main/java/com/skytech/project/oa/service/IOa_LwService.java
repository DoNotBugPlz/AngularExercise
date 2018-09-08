package com.skytech.project.oa.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.oa.model.Oa_Lw;

import java.util.Map;

public interface IOa_LwService extends IBaseService<Oa_Lw, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}