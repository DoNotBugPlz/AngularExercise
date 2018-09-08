package com.skytech.project.notice.dao;

import com.skytech.project.notice.model.Notice;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;

import java.util.Map;


public interface INoticeDao extends IDao<Notice,String> {

	/**
	 * 查询部门列表，可以传查询条件
	 * @return
	 */
	GridResult search(PageInfo pageinfo, Map map);

	/**
	 * 取当前部门对象(多表)
	 * @param id 当前部门的主键
	 * @return 当前部门
	 */
	Map<String,Object> loadForm(String id);
}
