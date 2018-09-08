package com.skytech.project.goodsReferenceLib.cf_goods.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.goodsReferenceLib.cf_goods.model.Cf_Goods;

import java.util.List;
import java.util.Map;

public interface ICf_GoodsDao extends IDao<Cf_Goods, Long> {


    List loadGoodsTreeRootNode(String goodid,String goods_classes);
    List loadGoodsTree(String goodid,String goodsfamilyid);


    GridResult loadGoodsList(PageInfo pageInfo, Map map);
    GridResult loadGoodsListForMonitor(PageInfo pageInfo, Map map);
    Map<String, Object> getGoodsDetail(String goodid);
    List loadBeloneCategory(String goodid);

}