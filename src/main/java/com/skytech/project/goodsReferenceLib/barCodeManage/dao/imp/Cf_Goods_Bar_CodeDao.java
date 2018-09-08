package com.skytech.project.goodsReferenceLib.barCodeManage.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.goodsReferenceLib.barCodeManage.dao.ICf_Goods_Bar_CodeDao;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("cf_Goods_Bar_CodeDao")
public class Cf_Goods_Bar_CodeDao extends MainBaseDao<Cf_Goods_Bar_Code, String> implements ICf_Goods_Bar_CodeDao {

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        sql.append("select\n" +
                " cf.id,\n" +
                " n.id AS goods_id,\n" +
                " n.name,\n" +
                " n.goods_code,\n" +
                " n.spec,\n" +
                " n.measurement_unit,\n" +
                " cf.bar_code,\n" +
                " cf.delstatus,\n" +
                " cf.uploaded_time \n" +
                "from\n" +
                " cf_goods n\n" +
                " left join cf_goods_bar_code cf on n.id = cf.goods_id \n" +
                "where\n" +
                " n.delstatus = 0 ");
        String goods_code = null;
        String name = null;
        String delstatus = null;
        String id = null;
        if (map != null) {
            goods_code = StringUtil.getStr(map.get("goods_code"));
            name = StringUtil.getStr(map.get("name"));
            delstatus = StringUtil.getStr(map.get("delstatus"));
            id = StringUtil.getStr(map.get("id"));
        }
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(name)) {
            list.add("%" + name + "%");
            sql.append(" and n.name like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(goods_code)) {
            list.add("%" + goods_code + "%");
            sql.append(" and n.goods_code like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(Integer.parseInt(delstatus.toString()));
            sql.append(" and cf.delstatus = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            list.add(Integer.parseInt(id.toString()));
            sql.append(" and n.id = ? ");
        }
        sql.append(" order by cf.delstatus,cf.uploaded_time  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("goods_code", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("spec", StandardBasicTypes.STRING);
        scalarMap.put("measurement_unit", StandardBasicTypes.STRING);
        scalarMap.put("bar_code", StandardBasicTypes.STRING);
        scalarMap.put("uploaded_time", StandardBasicTypes.DATE);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("goods_id", StandardBasicTypes.LONG);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("cf_goods_bar_code", gr, null);
        return gr;
    }

    @Override
    public GridResult loadbarCodeManage(String id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select\n" +
                " cf.id,\n" +
                " cf.is_last_version,\n" +
                " cf.goods_unique_id,\n" +
                " n.id AS goods_id,\n" +
                " n.name,\n" +
                " n.goods_code,\n" +
                " n.spec,\n" +
                " n.measurement_unit,\n" +
                " cf.bar_code,\n" +
                " cf.delstatus,\n" +
                " cf.uploaded_time \n" +
                "from\n" +
                " cf_goods n\n" +
                " left join cf_goods_bar_code cf on n.id = cf.goods_id \n" +
                "where\n" +
                " n.delstatus = 0 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            list.add(Integer.parseInt(id.toString()));
            sql.append(" and n.id = ? ");
        }
        sql.append(" order by cf.uploaded_time  desc ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("goods_code", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("spec", StandardBasicTypes.STRING);
        scalarMap.put("measurement_unit", StandardBasicTypes.STRING);
        scalarMap.put("bar_code", StandardBasicTypes.STRING);
        scalarMap.put("uploaded_time", StandardBasicTypes.DATE);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("is_last_version", StandardBasicTypes.INTEGER);
        scalarMap.put("goods_id", StandardBasicTypes.LONG);
        scalarMap.put("goods_unique_id", StandardBasicTypes.LONG);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, null, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("cf_goods_bar_code", gr, null);
        return gr;
    }

    @Override
    public int checkExist(String bar_code) {
        StringBuilder sql = new StringBuilder();
        sql.append("select  cf.id  from cf_goods_bar_code cf where 1 = 1 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(bar_code)) {
            list.add(bar_code);
            sql.append(" and cf.bar_code = ? ");
        }
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        List result = this.listByNative(sql.toString(), scalarMap, list);
        int num = 0;
        if (result != null && result.size() > 0) {
            num = 1;
        }
        return num;
    }

    @Override
    public void updateOld(String id) {
        StringBuilder sql = new StringBuilder();
        sql.append("update cf_goods_bar_code set is_last_version = 0 ")
                .append(" where delstatus = 0 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            list.add(id);
            sql.append(" and  id = ? ");
        }
        this.execteNativeBulk(sql.toString(), list);
    }

    @Override
    public void updateDelstatus(String id, String delstatus) {
        StringBuilder sql = new StringBuilder();
        sql.append("update cf_goods_bar_code ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(id) && !StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(Integer.parseInt(delstatus.toString()));
            list.add(id);
            sql.append(" set delstatus = ?  where id = ? ");
        }
        this.execteNativeBulk(sql.toString(), list);
    }
}