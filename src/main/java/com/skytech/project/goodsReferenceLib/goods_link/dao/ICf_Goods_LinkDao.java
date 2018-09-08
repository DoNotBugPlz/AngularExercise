package com.skytech.project.goodsReferenceLib.goods_link.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.goodsReferenceLib.goods_link.model.Cf_Goods_Link;

import java.util.Map;

public interface ICf_Goods_LinkDao extends IDao<Cf_Goods_Link, String> {

    GridResult loadGoodsLinkList(PageInfo pageInfo, Map map);

	
}