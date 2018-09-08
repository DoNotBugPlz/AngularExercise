package com.skytech.project.wqt.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.wqt.model.Oa_Wqt;

import java.util.Map;

public interface IOa_WqtService extends IBaseService<Oa_Wqt, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}