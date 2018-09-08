package com.skytech.project.oa.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.oa.model.Oa_Lw;

import java.util.Map;

public interface IOa_LwDao extends IDao<Oa_Lw, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}