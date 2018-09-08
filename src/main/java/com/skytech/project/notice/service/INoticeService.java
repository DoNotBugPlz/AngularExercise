package com.skytech.project.notice.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.notice.model.Notice;

import java.util.Map;


public interface INoticeService extends IBaseService<Notice,String> {
	/**
	 * 查询知通知列表，可以传查询条件
	 *
	 * @param map
	 * @return
	 */
	GridResult search(PageInfo pageinfo, Map map);

}
