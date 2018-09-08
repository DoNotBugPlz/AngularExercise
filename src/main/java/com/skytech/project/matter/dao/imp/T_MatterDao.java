package com.skytech.project.matter.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.project.matter.model.T_Matter_Material;
import com.skytech.project.matter.model.T_Matter_Monitor;
import com.skytech.project.matter.model.T_Matter_Monitor_Great;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.matter.dao.IT_MatterDao;
import com.skytech.project.matter.model.T_Matter;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_MatterDao")
public class T_MatterDao extends MainBaseDao<T_Matter, Long> implements IT_MatterDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    /**
     * 可以传查询条件
     *
     * @param pageinfo
     * @return
     */
    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql .append(" select a.name,  a.id, a.entry_time, a.end_time from t_matter a  where 1=1");

        String keyword = null;
        String start_date = null;
        String end_date = null;
        if (map != null) {
             keyword = StringUtil.getStr(map.get("keyword")) ;
             start_date = StringUtil.getStr(map.get("start_date")) ;
             end_date = StringUtil.getStr(map.get("end_date")) ;

        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and a.name like ? ");
        }

        if (!StringUtil.isNullOrWhiteSpace(start_date)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(start_date));
                sql.append(" and a.entry_time = ? ");
            } catch (Exception e) {
            }
        }

        if (!StringUtil.isNullOrWhiteSpace(end_date)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(end_date));
                sql.append(" and a.end_time = ? ");
            } catch (Exception e) {
            }
        }
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("end_time", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("entry_time", StandardBasicTypes.TIMESTAMP);

        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        colsRemarkService.convertCategoryColnums("t_sms", gr,null);
        return gr;
    }

    public List<T_Matter_Monitor> findBymatter(String id){
        String hql = "  from T_Matter_Monitor t  where  t.mater_id='"+id+"'";
        return  this.list(hql,null);
    }

    public List findBymonitor(String id){
       // String sql = " from T_Matter_Monitor_Great t where t.matter_monitor_id='"+id+"'";
        String sql = " SELECT b.NAME,b.measurement_unit,b.spec,b.ID,A.good_id,a.matter_monitor_id,a.orginal_price,a.cunrrent_price,a.change_reaon,a.price_readjust FROM t_matter_monitor_great A LEFT JOIN cf_goods b ON A.good_id = b.ID where a.matter_monitor_id='"+id+"'";
        return  this.listByNative(sql,null);
    }
    public List<T_Matter_Material> findBymaterial(String id){
        String hql =" from T_Matter_Material  t where t.matter_id='"+id+"'";
        return  this.list(hql,null);
    }
    public int  delete(int id){
        String sql = "delete   from t_matter_monitor_great a  where a.matter_monitor_id= '"+id+"' ";
        return this.execteNativeBulk(sql,null);
    }

    public int  deletematerial(int id){
        String sql = "delete   from T_Matter_Material a  where a.matter_id= '"+id+"' ";
        return this.execteNativeBulk(sql,null);
    }

    @Override
    public GridResult searchfind(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql .append("select a.status,a.id,a.name,b.enterprise,a.entry_time from t_matter a  left join  T_Matter_Monitor b on a.id =b.mater_id  where 1=1");
        String keyword = null;
        String unit = null;
        String status = null;
        if (map != null) {
            keyword = StringUtil.getStr(map.get("keyword")) ;
            unit =  StringUtil.getStr(map.get("unit")) ;
        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数

        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and a.name like ? ");
        }

        if (!StringUtil.isNullOrWhiteSpace(unit)) {
            list.add("%" + unit + "%");
            sql.append(" and b.enterprise like ? ");
        }
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("status", StandardBasicTypes.INTEGER);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("enterprise", StandardBasicTypes.STRING);
        scalarMap.put("entry_time", StandardBasicTypes.TIMESTAMP);


        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        colsRemarkService.convertCategoryColnums("t_sms", gr,null);
        return gr;
    }



}