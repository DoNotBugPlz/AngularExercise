package com.skytech.project.exchange.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.exchange.dao.IT_Exchange_InfoDao;
import com.skytech.project.exchange.service.IT_Exchange_InfoService;
import com.skytech.project.exchange.model.T_Exchange_Info;

import java.util.List;
import java.util.Map;

@Service("t_Exchange_InfoService")
public class T_Exchange_InfoService extends BaseService<T_Exchange_Info, Long> implements IT_Exchange_InfoService{

	private IT_Exchange_InfoDao t_Exchange_InfoDao;

	@Resource(name="t_Exchange_InfoDao")
	@Override
	public void setBaseDao(IDao<T_Exchange_Info, Long> baseDao) {
		this.t_Exchange_InfoDao = (IT_Exchange_InfoDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public ResultJO search(PageInfo pageInfo, Map map) {
		return ResultJO.getDefaultResult(t_Exchange_InfoDao.search(pageInfo, map));
	}

	@Override
	public int delList(List<String> strings) {
		return t_Exchange_InfoDao.delList(strings);
	}
}