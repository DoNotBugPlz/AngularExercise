package com.skytech.platform.menus.dao.imp;

import com.skytech.basic.core.constants.CommonParam;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.ParamList;
import com.skytech.menus.model.Sys_Menu;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.platform.menus.dao.ISys_Menu_ExtDao;
import com.skytech.platform.menus.model.Sys_Menu_Ext;

import java.util.*;

@Repository("sys_Menu_ExtDao")
public class Sys_Menu_ExtDao extends MainBaseDao<Sys_Menu_Ext, String> implements ISys_Menu_ExtDao {


    @Override
    public void destroyListCustom() {
        String sql = "delete from Sys_Menu_Ext where id not in (select t.id from Sys_menu t)";
        this.execteNativeBulk(sql, null);
    }

    @Override
    public List loadMenuList(List<String> permids, String parentMenuId, boolean loadFirstMenu) {
        // TODO Auto-generated method stub
        String sql = "select t.id as id,\n" +
                "       t.parentid as parentid,\n" +
                "       t.name as name,\n" +
                "       t.menuicon,\n" +
                "       t.deskicon,\n" +
                "       t.mainurl,\n" +
                "       case (case ( select count(1) from sys_menu h where h.parentid=t.id  ) when 0 then 'false' else 'true' end )\n" +
                "         when 'true' then\n" +
                "          'closed'\n" +
                "         else\n" +
                "          'open'\n" +
                "       end as state,\n" +
                "       case ( select count(1) from sys_menu h where h.parentid=t.id  ) when 0 then 'false' else 'true' end as  isparent,\n" +
                "       t.sortindex,\n" +
                "       e.ui_router_key,\n" +
                "       e.ui_params,\n" +
                "       e.menu_url_type\n" +
                "  from sys_menu t, sys_menu_ext e\n" +
                " where t.id = e.id\n" +
                "   and t.delstatus = 0\n";
        List list = new ArrayList();
        if (loadFirstMenu) {
            sql += "   and t.parentid is null \n";
        } else if (!StringUtil.isNullOrWhiteSpace(parentMenuId)) {
            sql += "   and t.parentid = ? \n";
            list.add(parentMenuId);
        }
        sql += StringExtUtil.loadCheckSqlByCheckIdList("t.id", permids, StringExtUtil.check_col_type_str);
        sql += "order by t.sortindex";
        HashMap<String, Type> scalarmap = new HashMap<String, Type>();
        scalarmap.put("id", StandardBasicTypes.STRING);
        scalarmap.put("parentid", StandardBasicTypes.STRING);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("menuicon", StandardBasicTypes.STRING);
        scalarmap.put("isparent", StandardBasicTypes.STRING);
        scalarmap.put("deskicon", StandardBasicTypes.STRING);
        scalarmap.put("mainurl", StandardBasicTypes.STRING);
        scalarmap.put("state", StandardBasicTypes.STRING);
        scalarmap.put("ui_params", StandardBasicTypes.STRING);
        scalarmap.put("ui_router_key", StandardBasicTypes.STRING);
        scalarmap.put("menu_url_type", StandardBasicTypes.INTEGER);
        scalarmap.put("sortindex", StandardBasicTypes.LONG);
        return this.listByNative(sql, scalarmap, list, false);
    }

    @Override
    public List loadShortcutMenuList(List<String> permids, String userId) {
        StringBuilder sql = new StringBuilder();
        sql.append("select \n" +
                "  t.id as id,\n" +
                " t.parentid as parentid,\n" +
                " t.name as name,\n" +
                " t.menuicon,\n" +
                " t.deskicon,\n" +
                " t.mainurl,\n" +
                " t.isparent,\n" +
                " t.sortindex,\n" +
                " e.ui_router_key,\n" +
                " e.ui_params,\n" +
                " e.menu_url_type,\n" +
                " n.id as shortcutid\n" +
                "from\n" +
                " t_shortcut_menu n\n" +
                " left join sys_menu t on n.menu_id = t.id \n" +
                " left join sys_menu_ext e on n.menu_id = e.id \n" +
                "where\n" +
                " t.delstatus = 0 and n.delstatus= 0 ");
        List list = new ArrayList();
        if (!StringUtil.isNullOrWhiteSpace(userId)) {
            list.add(Long.parseLong(userId.toString()));
            sql.append(" and n.user_id = ? ");
        }
        sql.append(StringExtUtil.loadCheckSqlByCheckIdList("t.id", permids, StringExtUtil.check_col_type_str));
        HashMap<String, Type> scalarmap = new HashMap<String, Type>();
        scalarmap.put("id", StandardBasicTypes.STRING);
        scalarmap.put("parentid", StandardBasicTypes.STRING);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("menuicon", StandardBasicTypes.STRING);
        scalarmap.put("isparent", StandardBasicTypes.STRING);
        scalarmap.put("deskicon", StandardBasicTypes.STRING);
        scalarmap.put("mainurl", StandardBasicTypes.STRING);
        scalarmap.put("ui_params", StandardBasicTypes.STRING);
        scalarmap.put("ui_router_key", StandardBasicTypes.STRING);
        scalarmap.put("menu_url_type", StandardBasicTypes.INTEGER);
        scalarmap.put("sortindex", StandardBasicTypes.LONG);
        scalarmap.put("shortcutid", StandardBasicTypes.LONG);
        return this.listByNative(sql.toString(), scalarmap, list);
    }

}