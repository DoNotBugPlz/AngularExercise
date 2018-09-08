package com.skytech.project.matter.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.matter.dao.IT_Matter_MaterialDao;
import com.skytech.project.matter.service.IT_Matter_MaterialService;
import com.skytech.project.matter.model.T_Matter_Material;

@Service("t_Matter_MaterialService")
public class T_Matter_MaterialService extends BaseService<T_Matter_Material, String> implements IT_Matter_MaterialService{

	private IT_Matter_MaterialDao t_Matter_MaterialDao;

	@Resource(name="t_Matter_MaterialDao")
	@Override
	public void setBaseDao(IDao<T_Matter_Material, String> baseDao) {
		this.t_Matter_MaterialDao = (IT_Matter_MaterialDao)baseDao;
		this.baseDao = baseDao;
	}











}