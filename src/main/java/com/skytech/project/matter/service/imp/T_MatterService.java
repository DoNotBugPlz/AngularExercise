package com.skytech.project.matter.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.project.matter.model.T_Matter_Material;
import com.skytech.project.matter.model.T_Matter_Monitor;
import com.skytech.project.matter.model.T_Matter_Monitor_Great;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.matter.dao.IT_MatterDao;
import com.skytech.project.matter.service.IT_MatterService;
import com.skytech.project.matter.model.T_Matter;

import java.util.List;
import java.util.Map;

@Service("t_MatterService")
public class T_MatterService extends BaseService<T_Matter, Long> implements IT_MatterService{

	private IT_MatterDao t_MatterDao;

	@Resource(name="t_MatterDao")
	@Override
	public void setBaseDao(IDao<T_Matter, Long> baseDao) {
		this.t_MatterDao = (IT_MatterDao)baseDao;
		this.baseDao = baseDao;
	}
	public GridResult search(PageInfo pageinfo, Map map) {
		return t_MatterDao.search(pageinfo, map);
	}




	public List<T_Matter_Monitor> findBymatter(String id) {
		return t_MatterDao.findBymatter(id);
	}

	public List findBymonitor(String id){
		return t_MatterDao.findBymonitor(id);
	}


	public List<T_Matter_Material> findBymaterial(String id){
		return t_MatterDao.findBymaterial(id);
	}

    public int  delete(int id) {
        return t_MatterDao.delete(id);
    }

    public int deletematerial(int id){
        return t_MatterDao.deletematerial(id);

    }

    public GridResult searchfind(PageInfo pageinfo, Map map) {
        return t_MatterDao.searchfind(pageinfo, map);
    }


}