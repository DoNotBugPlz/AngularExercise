package com.skytech.project.organisation.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.organisation.model.Cf_User_Sign;

import java.util.Map;

public interface ICf_User_SignDao extends IDao<Cf_User_Sign, String> {
    GridResult search(PageInfo pageinfo, Map map);
	
}