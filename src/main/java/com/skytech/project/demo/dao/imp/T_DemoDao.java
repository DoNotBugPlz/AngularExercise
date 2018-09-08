package com.skytech.project.demo.dao.imp;

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
import com.skytech.project.demo.dao.IT_DemoDao;
import com.skytech.project.demo.model.T_Demo;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("t_DemoDao")
public class T_DemoDao extends MainBaseDao<T_Demo, Long> implements IT_DemoDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult loadList(PageInfo pageInfo, Map map) {
        String sql = "select t.id,\n" +
                "       t.col_str,\n" +
                "       t.col_date,\n" +
                "       t.col_datetime,\n" +
                "       t.col_num,\n" +
                "       t.is_pub,\n" +
                "       t.col_category\n" +
                "  from t_demo t\n" +
                " where t.delstatus = 0\n ";
        String keyword = StringUtil.getStr(map.get("keyword"));
        String start_time = StringUtil.getStr(map.get("start_time"));
        String end_time = StringUtil.getStr(map.get("end_time"));
        List<Object> list = new ArrayList();;//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql+=" and t.col_str like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            list.add(start_time);
            sql+=" and t.col_date >= to_date(?,'yyyy-MM-dd') \n" ;
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            list.add(end_time);
            sql+=" and t.col_date <= to_date(?,'yyyy-MM-dd') \n" ;
        }
        sql+=" order by t.addtime desc   \n";
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("col_str", StandardBasicTypes.STRING);
        scalarMap.put("col_date", StandardBasicTypes.DATE);
        scalarMap.put("col_datetime", StandardBasicTypes.CALENDAR);
        scalarMap.put("col_num", StandardBasicTypes.INTEGER);
        scalarMap.put("is_pub", StandardBasicTypes.INTEGER);
        scalarMap.put("col_category", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_demo", gr, null);
        return gr;
    }
}