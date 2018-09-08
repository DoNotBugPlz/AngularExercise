package com.skytech.project.organisation.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.organisation.model.Cf_M_Site;

import java.util.Map;

public interface ICf_M_SiteDao extends IDao<Cf_M_Site, Long> {


    GridResult LoadList(PageInfo pageInfo, Map map);
}