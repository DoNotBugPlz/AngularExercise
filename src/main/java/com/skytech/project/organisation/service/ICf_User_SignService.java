package com.skytech.project.organisation.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.organisation.model.Cf_User_Sign;

import java.util.Map;

public interface ICf_User_SignService extends IBaseService<Cf_User_Sign, String> {
    GridResult search(PageInfo pageinfo, Map map);
}