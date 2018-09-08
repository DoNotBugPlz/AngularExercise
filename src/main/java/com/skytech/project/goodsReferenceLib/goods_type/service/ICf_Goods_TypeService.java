package com.skytech.project.goodsReferenceLib.goods_type.service;

import com.skytech.persistence.service.IBaseService;
import com.skytech.project.goodsReferenceLib.goods_type.model.Cf_Goods_Type;

public interface ICf_Goods_TypeService extends IBaseService<Cf_Goods_Type, Long> {

    boolean removeGoodsType(String goodsTypeId);

	
}