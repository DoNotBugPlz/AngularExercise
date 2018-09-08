package com.skytech.project.goodsReferenceLib.cfIndexManage.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.Cf_Index;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.cfIndexModel;

import java.util.Map;

public interface ICf_IndexService extends IBaseService<Cf_Index, Long> {
    Cf_Index saveOrUpdateIndex(cfIndexModel pm);

    GridResult search(PageInfo pageinfo, Map map);

    Map<String, Object> getIndexDetail(String index_id);

    GridResult loadPageListForConfig(Map paramMap, PageInfo pageinfo);
}