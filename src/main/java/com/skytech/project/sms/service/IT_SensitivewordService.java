package com.skytech.project.sms.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.sms.model.T_Sensitiveword;

import java.util.Map;

public interface IT_SensitivewordService extends IBaseService<T_Sensitiveword, Long> {

    GridResult search(PageInfo pageinfo, Map map);
}