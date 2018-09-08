package com.skytech.project.goodsReferenceLib.goods_link.dao.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.goodsReferenceLib.goods_link.dao.ICf_Goods_LinkDao;
import com.skytech.project.goodsReferenceLib.goods_link.model.Cf_Goods_Link;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("cf_Goods_LinkDao")
public class Cf_Goods_LinkDao extends MainBaseDao<Cf_Goods_Link, String> implements ICf_Goods_LinkDao{

    //数据关联
    public GridResult loadGoodsLinkList(PageInfo pageInfo, Map map){
        String measurement_unit = StringUtil.getStr(map.get("measurement_unit"));
        String name = StringUtil.getStr(map.get("name"));
        String spec = StringUtil.getStr(map.get("spec"));


        String sql="SELECT cgl.id,cgl.delstatus," +
                " cg.name,cg.goods_code,cg.spec,cg.measurement_unit,cg.delstatus,cg.start_time as start_time," +
                "cg1.name as nameRight,cg1.goods_code as goods_codeRight,cg1.spec as specRight,cg1.measurement_unit as measurement_unitRight,cg1.delstatus as delstatusRight\n" +
                "from cf_goods_link cgl\n" +
                " LEFT JOIN cf_goods cg on cgl.goods_id = cg.id\n" +
                " LEFT JOIN cf_goods cg1 on cgl.link_goods_id = cg1.id\n" +
                "where 1=1";

        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(measurement_unit)) {
            list.add( "%"+measurement_unit+"%"  );
            list.add( "%"+measurement_unit+"%"  );
            sql+=" and (cg.measurement_unit = ? or cg1.measurement_unit like ?) \n";
        }

        if (!StringUtil.isNullOrWhiteSpace(name)) {
            list.add( "%"+name+"%");
            list.add( "%"+name+"%" );
            sql+=" and (cg.name like ? or cg1.name like ?) \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(spec)) {
            list.add( "%"+spec+"%" );
            list.add( "%"+spec+"%" );
            sql+=" and (cg.spec like ? or cg1.spec like ?) \n";
        }


        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        scalarmap.put("id", StandardBasicTypes.STRING);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("nameRight", StandardBasicTypes.STRING);
        scalarmap.put("goods_code", StandardBasicTypes.STRING);
        scalarmap.put("goods_codeRight", StandardBasicTypes.STRING);
        scalarmap.put("spec", StandardBasicTypes.STRING);
        scalarmap.put("specRight", StandardBasicTypes.STRING);
        scalarmap.put("measurement_unit", StandardBasicTypes.STRING);
        scalarmap.put("measurement_unitRight", StandardBasicTypes.STRING);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("delstatusRight", StandardBasicTypes.INTEGER);
        scalarmap.put("start_time", StandardBasicTypes.TIMESTAMP);
        GridResult gr = this.listByNativeByPage(sql,scalarmap, pageInfo,list);
        return gr;
    }

	
}