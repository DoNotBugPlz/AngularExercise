package com.skytech.project.goodsReferenceLib.goods_type.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.goodsReferenceLib.goods_type.model.Cf_Goods_Type;

public interface ICf_Goods_TypeDao extends IDao<Cf_Goods_Type, Long> {


    boolean checkChildNode(String goodsTypeId);
    boolean checkChildGoods(String goodsTypeId);

	
}