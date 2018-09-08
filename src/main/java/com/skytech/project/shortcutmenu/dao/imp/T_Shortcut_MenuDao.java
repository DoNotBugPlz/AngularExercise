package com.skytech.project.shortcutmenu.dao.imp;

import com.google.common.collect.Lists;
import com.skytech.util.StringExtUtil;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.shortcutmenu.dao.IT_Shortcut_MenuDao;
import com.skytech.project.shortcutmenu.model.T_Shortcut_Menu;

import java.util.List;

@Repository("t_Shortcut_MenuDao")
public class T_Shortcut_MenuDao extends MainBaseDao<T_Shortcut_Menu, Long> implements IT_Shortcut_MenuDao {


    @Override
    public void delOldshortcut(Long userId) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_shortcut_menu  set delstatus = 1 ")
                .append(" where delstatus = 0 ");
        List<Object> list = Lists.newArrayList();//用于设置sql参数
        sql.append(" and user_id = ?");
        list.add(userId);
        this.execteNativeBulk(sql.toString(), list);
    }
}