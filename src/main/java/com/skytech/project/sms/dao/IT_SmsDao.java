package com.skytech.project.sms.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.sms.model.T_Sms;

import java.util.List;
import java.util.Map;

public interface IT_SmsDao extends IDao<T_Sms, Long> {

    GridResult search(PageInfo pageinfo, Map map);

    List loadSms(String id) ;

}