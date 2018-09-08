package com.skytech.project.demo.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.demo.dao.IT_DemoDao;
import com.skytech.project.demo.service.IT_DemoService;
import com.skytech.project.demo.model.T_Demo;

import java.util.Map;

@Service("t_DemoService")
public class T_DemoService extends BaseService<T_Demo, Long> implements IT_DemoService{

	private IT_DemoDao t_DemoDao;

	@Resource(name="t_DemoDao")
	@Override
	public void setBaseDao(IDao<T_Demo, Long> baseDao) {
		this.t_DemoDao = (IT_DemoDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public GridResult loadList(PageInfo pageInfo, Map map) {
		return t_DemoDao.loadList( pageInfo,  map);
	}
}