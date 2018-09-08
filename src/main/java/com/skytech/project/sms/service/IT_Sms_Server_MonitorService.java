package com.skytech.project.sms.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.sms.model.T_Sms_Server_Monitor;

import java.util.Map;

public interface IT_Sms_Server_MonitorService extends IBaseService<T_Sms_Server_Monitor, Long> {

    GridResult search(PageInfo pageinfo, Map map);
}