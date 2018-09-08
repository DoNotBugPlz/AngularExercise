package com.skytech.project.goodsReferenceLib.cf_goods.model;

import com.skytech.basic.wrapper.SuperPanelModel;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;

public class GoodsPanelModel extends SuperPanelModel {
    private Cf_Goods cf_goods;
    private Cf_Goods_Bar_Code cf_goods_bar_code;

    public Cf_Goods_Bar_Code getCf_goods_bar_code() {
        return cf_goods_bar_code;
    }

    public void setCf_goods_bar_code(Cf_Goods_Bar_Code cf_goods_bar_code) {
        this.cf_goods_bar_code = cf_goods_bar_code;
    }

    public Cf_Goods getCf_goods() {
        return cf_goods;
    }

    public void setCf_goods(Cf_Goods cf_goods) {
        this.cf_goods = cf_goods;
    }
}
