package com.skytech.project.sms.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.sms.dao.IT_Sms_ObjectDao;
import com.skytech.project.sms.model.T_Sms_Object;

@Repository("t_Sms_ObjectDao")
public class T_Sms_ObjectDao extends MainBaseDao<T_Sms_Object, String> implements IT_Sms_ObjectDao{

	
}