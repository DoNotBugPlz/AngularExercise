package com.skytech.project.masterplate.dao.imp;

import com.google.common.collect.Lists;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.masterplate.dao.IT_Masterplate_ClassDao;
import com.skytech.project.masterplate.model.T_Masterplate_Class;

import java.util.List;

@Repository("t_Masterplate_ClassDao")
public class T_Masterplate_ClassDao extends MainBaseDao<T_Masterplate_Class, Long> implements IT_Masterplate_ClassDao {


    @Override
    public void delClass(String id) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_masterplate_class set delstatus = 1 where delstatus = 0 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
          /* *//* Service 已经判断合法 */
        sql.append(" and id = ? ");
        list.add(Long.parseLong(id));
        this.execteNativeBulk(sql.toString(), list);
    }
}