package com.skytech.project.notice.service.imp;


import com.skytech.project.notice.dao.INoticeDao;
import com.skytech.project.notice.model.Notice;
import com.skytech.project.notice.model.NoticePanelModel;
import com.skytech.project.notice.service.INoticeService;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;


@Service("noticeService")
public class NoticeService extends BaseService<Notice,String> implements INoticeService {

	private INoticeDao noticeDao;

	@Override
	@Resource(name = "noticeDao")
	public void setBaseDao(IDao<Notice, String> baseDao) {
		noticeDao = (INoticeDao) baseDao;
		this.baseDao = baseDao;
	}

	/**
	 * 查询通知列表，可以传查询条件
	 */
	@Override
	public GridResult search(PageInfo pageinfo, Map map) {
		return noticeDao.search(pageinfo, map);
	}

}




















