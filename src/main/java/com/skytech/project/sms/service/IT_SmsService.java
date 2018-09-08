package com.skytech.project.sms.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.sms.model.T_Sms;

import java.util.List;
import java.util.Map;

public interface IT_SmsService extends IBaseService<T_Sms, Long> {

    GridResult search(PageInfo pageinfo, Map map);

    List loadSms(String id);;
}