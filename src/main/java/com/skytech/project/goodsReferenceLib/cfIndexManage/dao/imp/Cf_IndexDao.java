package com.skytech.project.goodsReferenceLib.cfIndexManage.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ParamList;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.goodsReferenceLib.cfIndexManage.dao.ICf_IndexDao;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.Cf_Index;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("cf_IndexDao")
public class Cf_IndexDao extends MainBaseDao<Cf_Index, Long> implements ICf_IndexDao {
    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT ci.id,\n" +
                "       ci.name,\n" +
                "       ci.index_nature,\n" +
                "       ci.index_category,\n" +
                "       ci.category_constname,\n" +
                "       ci.remark,\n" +
                "       ci.sortindex,\n" +
                "       ci.delstatus\n" +
                "  FROM cf_index ci\n" +
                " where 1=1 ");
        String id = null;
        String name = null;
        String index_nature = null;
        String index_category = null;
        String delstatus = null;
        if (map != null) {
            id = StringUtil.getStr(map.get("id"));
            name = StringUtil.getStr(map.get("name"));
            index_nature = StringUtil.getStr(map.get("index_nature"));
            index_category = StringUtil.getStr(map.get("index_category"));
            delstatus = StringUtil.getStr(map.get("delstatus"));
        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            list.add(Long.parseLong(id.toString()));
            sql.append(" AND ci.id = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(name)) {
            list.add("%" + name + "%");
            sql.append("AND ci.NAME  like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(index_nature)) {
            list.add(Integer.parseInt(index_nature.toString()));
            sql.append(" AND ci.index_nature = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(index_category)) {
            list.add(Integer.parseInt(index_category.toString()));
            sql.append(" AND ci.index_category = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(Integer.parseInt(delstatus.toString()));
            sql.append(" AND ci.delstatus =  ? ");
        }
        sql.append( " ORDER BY ci.index_nature,\n" +
                "          ci.index_category,\n" +
                "          ci.sortindex,\n" +
                "          ci.delstatus,\n" +
                "          ci. ID\n");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("index_nature", StandardBasicTypes.STRING);
        scalarMap.put("index_category", StandardBasicTypes.STRING);
        scalarMap.put("category_constname", StandardBasicTypes.STRING);
        scalarMap.put("remark", StandardBasicTypes.STRING);
        scalarMap.put("sortindex", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("cf_index", gr, null);
        return gr;
    }

    @Override
    public Map<String, Object> getIndexDetail(String id) {
        if (StringUtil.isNullOrWhiteSpace(id)) {
            return null;
        }
        String sql ="SELECT ci.id,\n" +
                "       ci.name,\n" +
                "       ci.index_nature,\n" +
                "       ci.index_category,\n" +
                "       ci.category_constname,\n" +
                "       ci.remark,\n" +
                "       ci.sortindex,\n" +
                "       ci.delstatus\n" +
                "  FROM cf_index ci\n" +
                " where 1=1 ";
        List<Object> list = new ArrayList();;//用于设置sql参数
        list.add(Long.parseLong(id) );
        sql+=" AND ci.id = ? ";

        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("index_nature", StandardBasicTypes.INTEGER);
        scalarMap.put("index_category", StandardBasicTypes.INTEGER);
        scalarMap.put("category_constname", StandardBasicTypes.STRING);
        scalarMap.put("remark", StandardBasicTypes.STRING);
        scalarMap.put("sortindex", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        return this.uniqueByNative(sql,scalarMap,list);
    }

    @Override
    public Map<String, Object> getIndexCategory(String category_constname) {
        if (StringUtil.isNullOrWhiteSpace(category_constname)) {
            return Maps.newHashMap();
        }
        String sql ="SELECT sc.id, sc.chinaname, sc.constname, sc.sortindex, sc.delstatus\n" +
                "  FROM sys_category sc\n" +
                " where 1=1 ";
        List<Object> list = new ArrayList();;//用于设置sql参数
        list.add(category_constname);
        sql+=" AND sc.constname = ? ";

        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        scalarMap.put("constname", StandardBasicTypes.STRING);
        scalarMap.put("sortindex", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.STRING);
        return this.uniqueByNative(sql,scalarMap,list);
    }

    @Override
    public List getIndexCategoryValues(String category_id) {
        if(category_id!=null){
            HashMap<String, Type> scalarmap=new HashMap<String,Type>();
            String sql="SELECT scv. ID,\n" +
                    "       scv.categoryid,\n" +
                    "       scv.refid,\n" +
                    "       scv.chinaname,\n" +
                    "       scv.extchar1,\n" +
                    "       scv.sortindex,\n" +
                    "       scv.delstatus\n" +
                    "  FROM sys_categoryvalue scv\n" +
                    " WHERE scv.categoryid = ? \n";
            ParamList params=ParamList.getNewInstance().addParams(Long.parseLong(category_id));
            scalarmap.put("id", StandardBasicTypes.STRING);
            scalarmap.put("categoryid", StandardBasicTypes.STRING);
            scalarmap.put("refid", StandardBasicTypes.STRING);
            scalarmap.put("chinaname", StandardBasicTypes.STRING);
            scalarmap.put("extchar1", StandardBasicTypes.STRING);
            scalarmap.put("sortindex", StandardBasicTypes.STRING);
            scalarmap.put("delstatus", StandardBasicTypes.STRING);
            return this.listByNative(sql,scalarmap, params.getParams());
        }else {
            return new ArrayList();
        }
    }

    public Long getCategoryMaxSortIndex() {
        String sql ="SELECT max(sc.sortindex) max_num\n" +
                "  FROM sys_category sc\n";
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("max_num", StandardBasicTypes.LONG);
        Map<String,Long> data = this.uniqueByNative(sql,scalarMap,null);
        return data.get("max_num");
    }

    public Long getCategoryValueMaxSortIndex(String category_id) {
        if (StringUtil.isNullOrWhiteSpace(category_id)) {
            return null;
        }
        String sql ="SELECT max(scv.sortindex) max_num\n" +
                "  FROM sys_categoryvalue scv\n" +
                " where 1=1 ";
        List<Object> list = new ArrayList();;//用于设置sql参数
        list.add(Long.parseLong(category_id));
        sql+=" AND scv.categoryid = ? ";

        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("max_num", StandardBasicTypes.LONG);
        Map<String,Long> data = this.uniqueByNative(sql,scalarMap,list);
        return data.get("max_num");
    }

    /**加载指标树---sys_category**/
    public GridResult loadPageListForCategory(Map paramMap, PageInfo pageinfo) {
        StringBuffer sql = new StringBuffer();
        sql.append(" select sc.id,sc.chinaname,sc.delstatus, ")
                .append(" case when sc.delstatus = \'0\' then null else \'icon-pause\' end as iconCls,")
                .append(" 'closed' as state from sys_category sc where sc.id = 1445 ");
        HashMap scalarMap1 = new HashMap();
        scalarMap1.put("id", StandardBasicTypes.STRING);
        scalarMap1.put("chinaname", StandardBasicTypes.STRING);
        scalarMap1.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap1.put("iconCls", StandardBasicTypes.STRING);
        scalarMap1.put("state", StandardBasicTypes.STRING);
        return this.listByNativeByPage(StringUtil.getStr(sql), scalarMap1, pageinfo, null);
    }

    /**加载指标树---sys_categoryvalue**/
    public GridResult loadPageListForCategoryValue(Map paramMap, PageInfo pageinfo) {
        StringBuffer sql = new StringBuffer();
        sql.append(" select scv.id,scv.chinaname,scv.refid,scv.delstatus, ")
                .append(" case when scv.delstatus = \'0\' then null else \'icon-pause\' end as iconCls,")
                .append(" 'closed' as state from sys_categoryvalue scv where scv.categoryid = 1445 ")
                .append("  order by scv.sortindex ");
        HashMap scalarMap1 = new HashMap();
        scalarMap1.put("id", StandardBasicTypes.STRING);
        scalarMap1.put("chinaname", StandardBasicTypes.STRING);
        scalarMap1.put("refid", StandardBasicTypes.STRING);
        scalarMap1.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap1.put("iconCls", StandardBasicTypes.STRING);
        scalarMap1.put("state", StandardBasicTypes.STRING);
        return this.listByNativeByPage(StringUtil.getStr(sql), scalarMap1, pageinfo, null);
    }

    /**加载指标树---cf_index**/
    public GridResult loadPageListForCfIndex(Map paramMap, PageInfo pageinfo) {
        String refid = StringUtil.getStr(paramMap.get("refid"));
        if(StringUtil.isNullOrWhiteSpace(refid)){
            return null;
        }
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ci. ID, ci. NAME chinaname, ci.index_category, ci.sortindex,ci.delstatus,")
                .append(" case when ci.delstatus = \'0\' then null else \'icon-pause\' end as iconCls,")
                .append(" 'open' as state from cf_index ci where 1 = 1");
        ArrayList list = new ArrayList();
        list.add(Integer.parseInt(refid));
        sql.append(" and ci.index_category = ?");
        sql.append(" order by ci.sortindex ");
        HashMap scalarMap1 = new HashMap();
        scalarMap1.put("id", StandardBasicTypes.STRING);
        scalarMap1.put("chinaname", StandardBasicTypes.STRING);
        scalarMap1.put("index_category", StandardBasicTypes.INTEGER);
        scalarMap1.put("sortindex", StandardBasicTypes.STRING);
        scalarMap1.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap1.put("iconCls", StandardBasicTypes.STRING);
        scalarMap1.put("state", StandardBasicTypes.STRING);

        return this.listByNativeByPage(StringUtil.getStr(sql), scalarMap1, pageinfo, list);
    }

}