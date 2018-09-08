package com.skytech.project.masterplate.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.masterplate.dao.IT_Masterplate_IndexDao;
import com.skytech.project.masterplate.model.T_Masterplate_Index;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_Masterplate_IndexDao")
public class T_Masterplate_IndexDao extends MainBaseDao<T_Masterplate_Index, Long> implements IT_Masterplate_IndexDao {


    @Override
    public GridResult search(PageInfo pageInfo) {
        StringBuilder sql = new StringBuilder();
        sql.append("select\n" +
                " tm.id,\n" +
                " tm.name,\n" +
                " tm.is_parent,\n" +
                " tm.parent_id\n" +
                "from\n" +
                " t_masterplate_index tm\n" +
                "where\n" +
                " tm.delstatus = 0 ");
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("is_parent", StandardBasicTypes.INTEGER);
        scalarMap.put("parent_id", StandardBasicTypes.LONG);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, null);
        return gr;
    }

    @Override
    public int delList(List<String> strings) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_masterplate_index set delstatus = 1 ")
                .append(" where delstatus = 0 ")
                .append(StringExtUtil.loadCheckSqlByCheckIdList("id", strings, StringExtUtil.check_col_type_str));
        return this.execteNativeBulk(sql.toString(), null);
    }

    @Override
    public void delTrend(String parentId) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_masterplate_index set delstatus = 1 where delstatus = 0 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
          /* *//* Service 已经判断合法 */
        sql.append(" and parent_id = ? ");
        list.add(Long.parseLong(parentId));
        this.execteNativeBulk(sql.toString(), list);
    }
}