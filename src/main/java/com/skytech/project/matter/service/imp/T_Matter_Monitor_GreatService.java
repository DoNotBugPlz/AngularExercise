package com.skytech.project.matter.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.matter.dao.IT_Matter_Monitor_GreatDao;
import com.skytech.project.matter.service.IT_Matter_Monitor_GreatService;
import com.skytech.project.matter.model.T_Matter_Monitor_Great;

@Service("t_Matter_Monitor_GreatService")
public class T_Matter_Monitor_GreatService extends BaseService<T_Matter_Monitor_Great, Long> implements IT_Matter_Monitor_GreatService{

	private IT_Matter_Monitor_GreatDao t_Matter_Monitor_GreatDao;

	@Resource(name="t_Matter_Monitor_GreatDao")
	@Override
	public void setBaseDao(IDao<T_Matter_Monitor_Great, Long> baseDao) {
		this.t_Matter_Monitor_GreatDao = (IT_Matter_Monitor_GreatDao)baseDao;
		this.baseDao = baseDao;
	}











}