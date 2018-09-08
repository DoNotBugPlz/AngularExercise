package com.skytech.project.foreignMaterial.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.foreignMaterial.dao.IT_Foreign_MaterialDao;
import com.skytech.project.foreignMaterial.service.IT_Foreign_MaterialService;
import com.skytech.project.foreignMaterial.model.T_Foreign_Material;

import java.util.Map;

@Service("t_Foreign_MaterialService")
public class T_Foreign_MaterialService extends BaseService<T_Foreign_Material, Long> implements IT_Foreign_MaterialService{

	private IT_Foreign_MaterialDao t_Foreign_MaterialDao;

	@Resource(name="t_Foreign_MaterialDao")
	@Override
	public void setBaseDao(IDao<T_Foreign_Material, Long> baseDao) {
		this.t_Foreign_MaterialDao = (IT_Foreign_MaterialDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult loadList(PageInfo pageInfo, Map map) {
		return t_Foreign_MaterialDao.loadList(pageInfo,map);
	}
}