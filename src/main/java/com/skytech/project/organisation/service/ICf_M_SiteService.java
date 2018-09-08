package com.skytech.project.organisation.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.organisation.model.Cf_M_Site;

import java.util.Map;

public interface ICf_M_SiteService extends IBaseService<Cf_M_Site, Long> {


    GridResult LoadList(PageInfo pageInfo, Map map);
}