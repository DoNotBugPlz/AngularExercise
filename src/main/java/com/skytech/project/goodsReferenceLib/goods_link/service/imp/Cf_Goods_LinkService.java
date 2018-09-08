package com.skytech.project.goodsReferenceLib.goods_link.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.goodsReferenceLib.goods_link.dao.ICf_Goods_LinkDao;
import com.skytech.project.goodsReferenceLib.goods_link.service.ICf_Goods_LinkService;
import com.skytech.project.goodsReferenceLib.goods_link.model.Cf_Goods_Link;

import java.util.Map;

@Service("cf_Goods_LinkService")
public class Cf_Goods_LinkService extends BaseService<Cf_Goods_Link, String> implements ICf_Goods_LinkService{

	private ICf_Goods_LinkDao cf_Goods_LinkDao;

	@Resource(name="cf_Goods_LinkDao")
	@Override
	public void setBaseDao(IDao<Cf_Goods_Link, String> baseDao) {
		this.cf_Goods_LinkDao = (ICf_Goods_LinkDao)baseDao;
		this.baseDao = baseDao;
	}

	public GridResult loadGoodsLinkList(PageInfo pageInfo, Map map){
		return cf_Goods_LinkDao.loadGoodsLinkList(pageInfo,map);
	}











}