package com.skytech.project.wqt.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.wqt.model.Oa_Wqt;

import java.util.Map;

public interface IOa_WqtDao extends IDao<Oa_Wqt, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}