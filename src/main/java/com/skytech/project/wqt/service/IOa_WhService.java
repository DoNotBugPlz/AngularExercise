package com.skytech.project.wqt.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.wqt.model.Oa_Wh;

import java.util.Map;

public interface IOa_WhService extends IBaseService<Oa_Wh, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}