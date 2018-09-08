package com.skytech.project.wqt.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.wqt.model.Oa_Wh;

import java.util.Map;

public interface IOa_WhDao extends IDao<Oa_Wh, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}