package com.skytech.project.goodsReferenceLib.goods_type.dao.imp;

import com.skytech.basic.wrapper.ParamList;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.goodsReferenceLib.goods_type.dao.ICf_Goods_TypeDao;
import com.skytech.project.goodsReferenceLib.goods_type.model.Cf_Goods_Type;

import java.util.HashMap;
import java.util.List;

@Repository("cf_Goods_TypeDao")
public class Cf_Goods_TypeDao extends MainBaseDao<Cf_Goods_Type, Long> implements ICf_Goods_TypeDao{



    public boolean checkChildNode(String goodsTypeId) {
        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        String sql="SELECT id from cf_goods_type where parentid = ? and delstatus = 0" ;
        ParamList params=ParamList.getNewInstance().addParams(Long.parseLong(goodsTypeId));
        scalarmap.put("id", StandardBasicTypes.INTEGER);
        if(this.listByNative(sql,scalarmap, params.getParams())!=null && this.listByNative(sql,scalarmap, params.getParams()).size()>0 ){
            return true;
        }else {
            return false;
        }
    }
    //检测该节点下是否有正在用的商品 true 有，false 没有
    @Override
    public boolean checkChildGoods(String goodsTypeId) {
        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        String sql="SELECT id from cf_goods where goods_type_id = ? and delstatus = 0" ;
        ParamList params=ParamList.getNewInstance().addParams(Long.parseLong(goodsTypeId));
        scalarmap.put("id", StandardBasicTypes.INTEGER);
        if(this.listByNative(sql,scalarmap, params.getParams())!=null && this.listByNative(sql,scalarmap, params.getParams()).size()>0 ){
            return true;
        }else {
            return false;
        }
    }

	
}