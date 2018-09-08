package com.skytech.project.masterplate.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.project.masterplate.model.T_Masterplate_Class;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.masterplate.dao.IT_MasterplateDao;
import com.skytech.project.masterplate.model.T_Masterplate;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_MasterplateDao")
public class T_MasterplateDao extends MainBaseDao<T_Masterplate, Long> implements IT_MasterplateDao {

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                "n.id," +
                "n.masterplate_name," +
                "n.masterplate_type," +
                "n.delstatus ")
                .append(" from t_masterplate n where 1=1 ");
        String keyword = null;
        String masterplate_type = null;
        String delstatus = null;
        if (map != null) {
            keyword = StringUtil.getStr(map.get("keyword"));
            masterplate_type = StringUtil.getStr(map.get("masterplate_type"));
            delstatus = StringUtil.getStr(map.get("delstatus"));

        }
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and n.masterplate_name like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(masterplate_type)) {
            list.add(Integer.parseInt(masterplate_type.toString()));
            sql.append(" and n.masterplate_type = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(delstatus)) {
            list.add(Integer.parseInt(delstatus.toString()));
            sql.append(" and n.delstatus = ? ");
        }
        sql.append(" order by n.delstatus,n.addtime desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("masterplate_name", StandardBasicTypes.STRING);
        scalarMap.put("masterplate_type", StandardBasicTypes.INTEGER);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_masterplate", gr, null);
        return gr;
    }

    @Override
    public GridResult getClassList(String id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                "n.id," +
                "n.class_name " +
                "from t_masterplate_class n where n.delstatus = 0 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            list.add(Integer.parseInt(id.toString()));
            sql.append(" and n.masterplate_id = ? ");
        }
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("class_name", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, null, list);
        return gr;
    }

    @Override
    public void changeStatue(String id, String value) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_masterplate set delstatus = ? ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
          /* *//* Service 已经判断合法 */
        sql.append(" where id = ? ");
        list.add(Long.parseLong(value));
        list.add(Long.parseLong(id));
        this.execteNativeBulk(sql.toString(), list);
    }
}