package com.skytech.project.oa.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.oa.model.Oa_Fw;

import java.util.Map;

public interface IOa_FwDao extends IDao<Oa_Fw, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}