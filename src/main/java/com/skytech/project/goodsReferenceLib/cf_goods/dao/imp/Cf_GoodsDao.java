package com.skytech.project.goodsReferenceLib.cf_goods.dao.imp;

import com.skytech.basic.core.constants.CommonParam;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ParamList;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.goodsReferenceLib.cf_goods.dao.ICf_GoodsDao;
import com.skytech.project.goodsReferenceLib.cf_goods.model.Cf_Goods;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("cf_GoodsDao")
public class Cf_GoodsDao extends MainBaseDao<Cf_Goods, Long> implements ICf_GoodsDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


    @Override
    public List loadGoodsTreeRootNode(String goodid,String goodsclasses) {

        if(goodid!=null){

            HashMap<String, Type> scalarmap=new HashMap<String,Type>();
            String sql="SELECT scv.refid as id,scv.chinaname as name FROM sys_category sc LEFT JOIN sys_categoryvalue scv ON sc.id = scv.categoryid where sc.constname = 'GOODS_FAMILY' " +
                    "AND scv.refid = ?" ;
            ParamList params=ParamList.getNewInstance().addParams(goodid);
            scalarmap.put("id", StandardBasicTypes.INTEGER);
            scalarmap.put("name", StandardBasicTypes.STRING);
            return this.listByNative(sql,scalarmap, params.getParams());
        }else {

            return null;
        }


    }
    @Override
        public List loadGoodsTree(String goodid,String goodsfamilyid) {
            if(goodid!=null && goodsfamilyid!=null){

                int goodsid = Integer.parseInt(goodid);
                int goods_familyid = Integer.parseInt(goodsfamilyid);
                if(goodsid ==0){
                    HashMap<String, Type> scalarmap=new HashMap<String,Type>();
                    String sql="select id,type_name as name,goods_family as goodsfamilyid from cf_goods_type where parentid is null and delstatus = 0 and goods_family = ? " ;
                    ParamList params=ParamList.getNewInstance().addParams(goods_familyid);
                    scalarmap.put("id", StandardBasicTypes.INTEGER);
                    scalarmap.put("name", StandardBasicTypes.STRING);
                    scalarmap.put("goodsfamilyid", StandardBasicTypes.INTEGER);
                    return this.listByNative(sql,scalarmap, params.getParams());
                }else {
                    HashMap<String, Type> scalarmap=new HashMap<String,Type>();
                    String sql="select id,type_name as name,goods_family as goodsfamilyid from cf_goods_type where parentid =? and delstatus = 0 and goods_family = ? " ;
                    ParamList params=ParamList.getNewInstance().addParams(goodsid).addParams(goods_familyid);
                    scalarmap.put("id", StandardBasicTypes.INTEGER);
                    scalarmap.put("name", StandardBasicTypes.STRING);
                    scalarmap.put("goodsfamilyid", StandardBasicTypes.INTEGER);
                    return this.listByNative(sql,scalarmap, params.getParams());
                }

            }else {
                return null;
            }





        }

    @Override
    public GridResult loadGoodsList(PageInfo pageInfo, Map map) {

        String goodid = StringUtil.getStr(map.get("goodid"));
        String name = StringUtil.getStr(map.get("name"));
        String spec = StringUtil.getStr(map.get("spec"));
        String measurement_unit = StringUtil.getStr(map.get("measurement_unit"));
        String delstatus = StringUtil.getStr(map.get("delstatus"));
        String alias = StringUtil.getStr(map.get("alias"));
        String origin_company = StringUtil.getStr(map.get("origin_company"));
        String brand = StringUtil.getStr(map.get("brand"));
        String remark = StringUtil.getStr(map.get("remark"));
        String origin_place = StringUtil.getStr(map.get("origin_place"));
        String medical_insurance_code = StringUtil.getStr(map.get("medical_insurance_code"));
        String dosage = StringUtil.getStr(map.get("dosage"));
        String use_for = StringUtil.getStr(map.get("use_for"));
        String quasi_word = StringUtil.getStr(map.get("quasi_word"));
        String industry_category = StringUtil.getStr(map.get("industry_category"));

        String sql="select t.id,t.name,t.goods_code,t.spec,t.measurement_unit,t.delstatus,t.medical_insurance_code,t.dosage\n" +
                "from cf_goods t where 1=1";

        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(goodid)) {
            list.add( Integer.parseInt(goodid) );
            sql+=" and t.goods_type_id = ? \n";
        }else{
            sql+=" and t.goods_type_id = -1 \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add( Integer.parseInt(delstatus) );
            sql+=" and t.delstatus = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(name)) {
            list.add( "%"+name+"%" );
            sql+=" and t.name like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(spec)) {
            list.add( "%"+spec+"%" );
            sql+=" and t.spec like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(measurement_unit)) {
            list.add( "%"+measurement_unit+"%" );
            sql+=" and t.measurement_unit like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(alias)) {
            list.add( "%"+alias+"%" );
            sql+=" and t.alias like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(origin_company)) {
            list.add( "%"+origin_company+"%" );
            sql+=" and t.origin_company like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(brand)) {
            list.add( "%"+brand+"%" );
            sql+=" and t.brand like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(remark)) {
            list.add( "%"+remark+"%" );
            sql+=" and t.remark like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(origin_place)) {
            list.add( "%"+origin_place+"%" );
            sql+=" and t.origin_place like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(medical_insurance_code)) {
            list.add( "%"+medical_insurance_code+"%" );
            sql+=" and t.medical_insurance_code like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(dosage)) {
            list.add( "%"+dosage+"%" );
            sql+=" and t.dosage like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(use_for)) {
            list.add( "%"+use_for+"%" );
            sql+=" and t.use_for like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(quasi_word)) {
            list.add( "%"+quasi_word+"%" );
            sql+=" and t.quasi_word like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(industry_category)) {
            list.add( "%"+industry_category+"%" );
            sql+=" and t.industry_category like ? \n";
        }
        sql+="order by t.sortindex";

        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        scalarmap.put("id", StandardBasicTypes.INTEGER);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("goods_code", StandardBasicTypes.STRING);
        scalarmap.put("spec", StandardBasicTypes.STRING);
        scalarmap.put("measurement_unit", StandardBasicTypes.STRING);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("medical_insurance_code", StandardBasicTypes.STRING);
        scalarmap.put("dosage", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql,scalarmap, pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("cf_goods",gr,null);
        return gr;




    }

    @Override
    public GridResult loadGoodsListForMonitor(PageInfo pageInfo, Map map) {

        String goodsFamilyId = StringUtil.getStr(map.get("goodsFamilyId"));
        String name = StringUtil.getStr(map.get("name"));


        String sql="select t.id,t.name,t.goods_code,t.spec,t.measurement_unit,t.delstatus,t.medical_insurance_code,t.dosage\n" +
                "from cf_goods t,cf_goods_type tc where t.goods_type_id = tc.id\n";

        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(goodsFamilyId)) {
            list.add( Integer.parseInt(goodsFamilyId) );
            sql+=" and tc.goods_family = ? \n";
        }

        if (!StringUtil.isNullOrWhiteSpace(name)) {
            list.add( "%"+name+"%" );
            sql+=" and t.name like ? \n";
        }

        sql+="order by t.sortindex";

        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        scalarmap.put("id", StandardBasicTypes.INTEGER);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("goods_code", StandardBasicTypes.STRING);
        scalarmap.put("spec", StandardBasicTypes.STRING);
        scalarmap.put("measurement_unit", StandardBasicTypes.STRING);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("medical_insurance_code", StandardBasicTypes.STRING);
        scalarmap.put("dosage", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql,scalarmap, pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("cf_goods",gr,null);
        return gr;




    }

    @Override
    public Map<String, Object> getGoodsDetail(String goodid) {

        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        String sql="select t.id,t.goods_type_id,cgt.type_name,t.name,t.goods_code,t.spec,t.measurement_unit,t.delstatus,t.alias,t.origin_place,t.origin_company,t.brand,t.remark," +
                "t.dosage,t.goods_properties,t.use_for,t.quasi_word,t.medical_insurance_code,t.conversion_ratio,t.industry_category,cgbc.id as barcode_id,cgbc.bar_code\n" +
                "from cf_goods t left join cf_goods_type cgt on t.goods_type_id = cgt.id\n" +
                "LEFT JOIN cf_goods_bar_code cgbc on t.id = cgbc.goods_id and cgbc.delstatus = 0 and cgbc.is_last_version = 1 \n" +
                " where 1=1";

        List<Object> list = new ArrayList();;//用于设置sql参数
        list.add( Integer.parseInt(goodid) );
        sql+=" and t.id = ? \n";

        scalarmap.put("id", StandardBasicTypes.INTEGER);
        scalarmap.put("goods_type_id", StandardBasicTypes.INTEGER);
        scalarmap.put("type_name", StandardBasicTypes.STRING);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("goods_code", StandardBasicTypes.STRING);
        scalarmap.put("spec", StandardBasicTypes.STRING);
        scalarmap.put("measurement_unit", StandardBasicTypes.STRING);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("alias", StandardBasicTypes.STRING);
        scalarmap.put("origin_place", StandardBasicTypes.STRING);
        scalarmap.put("origin_company", StandardBasicTypes.STRING);
        scalarmap.put("brand", StandardBasicTypes.STRING);
        scalarmap.put("remark", StandardBasicTypes.STRING);
        scalarmap.put("dosage", StandardBasicTypes.STRING);
        scalarmap.put("goods_properties", StandardBasicTypes.STRING);
        scalarmap.put("use_for", StandardBasicTypes.STRING);
        scalarmap.put("quasi_word", StandardBasicTypes.STRING);
        scalarmap.put("medical_insurance_code", StandardBasicTypes.STRING);
        scalarmap.put("conversion_ratio", StandardBasicTypes.STRING);
        scalarmap.put("industry_category", StandardBasicTypes.STRING);
        scalarmap.put("barcode_id", StandardBasicTypes.STRING);
        scalarmap.put("bar_code", StandardBasicTypes.STRING);


        return this.uniqueByNative(sql,scalarmap,list);



    }

    @Override
    public List loadBeloneCategory(String goodid) {
        int id =0;
        if(goodid!=null){
            id = Integer.parseInt(goodid);
            HashMap<String, Type> scalarmap=new HashMap<String,Type>();
            String sql="with RECURSIVE GoodsTypeTree AS\n" +
                    "(\n" +
                    "\tSELECT cgt.id,cgt.parentid,cgt.type_name from cf_goods_type cgt where id=?\n" +
                    "\tUNION ALL\n" +
                    "\tSELECT cgt.id,cgt.parentid,cgt.type_name from cf_goods_type cgt\n" +
                    "\tinner Join GoodsTypeTree gtt on gtt.parentid = cgt.id\n" +
                    ")\n" +
                    "SELECT * from GoodsTypeTree;";
            ParamList params=ParamList.getNewInstance().addParams(id);
            scalarmap.put("id", StandardBasicTypes.INTEGER);
            scalarmap.put("parentid", StandardBasicTypes.INTEGER);
            scalarmap.put("type_name", StandardBasicTypes.STRING);

            return this.listByNative(sql,scalarmap, params.getParams());
        }else {

            return new ArrayList();
        }


    }
	
}