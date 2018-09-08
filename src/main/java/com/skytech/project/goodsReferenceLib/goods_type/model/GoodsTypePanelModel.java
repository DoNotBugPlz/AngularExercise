package com.skytech.project.goodsReferenceLib.goods_type.model;

import com.skytech.basic.wrapper.SuperPanelModel;
import com.skytech.project.goodsReferenceLib.cf_goods.model.Cf_Goods;

public class GoodsTypePanelModel extends SuperPanelModel {
    private Cf_Goods_Type cf_goods_type;

    public Cf_Goods_Type getCf_goods_type() {
        return cf_goods_type;
    }

    public void setCf_goods_type(Cf_Goods_Type cf_goods_type) {
        this.cf_goods_type = cf_goods_type;
    }
}
