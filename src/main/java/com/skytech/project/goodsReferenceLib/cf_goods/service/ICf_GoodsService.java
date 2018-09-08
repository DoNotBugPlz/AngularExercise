package com.skytech.project.goodsReferenceLib.cf_goods.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.goodsReferenceLib.cf_goods.model.Cf_Goods;
import com.skytech.project.goodsReferenceLib.cf_goods.model.GoodsPanelModel;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface ICf_GoodsService extends IBaseService<Cf_Goods, Long> {

    List loadGoodsTreeRootNode(String goodid,String goods_classes);
    List loadGoodsTree(String goodid,String goodsfamilyid);

    GridResult loadGoodsList(PageInfo pageInfo,Map map);
    GridResult loadGoodsListForMonitor(PageInfo pageInfo,Map map);

    String loadBeloneCategory(String goodid);

    Map<String, Object> getGoodsDetail(String goodid);
    Cf_Goods saveInfo(GoodsPanelModel gm, HttpSession session);


}