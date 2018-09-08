package com.skytech.project.goodsReferenceLib.cfIndexManage.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.Cf_Index;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.cfIndexModel;

import java.util.List;
import java.util.Map;

public interface ICf_IndexDao extends IDao<Cf_Index, Long> {
    GridResult search(PageInfo pageinfo, Map map);
    Map<String, Object> getIndexDetail(String id);
    Map<String, Object> getIndexCategory(String category_constname);
    List getIndexCategoryValues(String category_id);
    Long getCategoryMaxSortIndex();
    Long getCategoryValueMaxSortIndex(String category_id);
    GridResult loadPageListForCategory(Map paramMap, PageInfo pageinfo);
    GridResult loadPageListForCategoryValue(Map paramMap, PageInfo pageinfo);
    GridResult loadPageListForCfIndex(Map paramMap, PageInfo pageinfo);
}