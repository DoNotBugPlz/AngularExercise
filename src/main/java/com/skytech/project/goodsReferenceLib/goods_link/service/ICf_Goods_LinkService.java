package com.skytech.project.goodsReferenceLib.goods_link.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.goodsReferenceLib.goods_link.model.Cf_Goods_Link;

import java.util.Map;

public interface ICf_Goods_LinkService extends IBaseService<Cf_Goods_Link, String> {

    GridResult loadGoodsLinkList(PageInfo pageInfo,Map map);

	
}