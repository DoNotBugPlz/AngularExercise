package com.skytech.platform.menus.dao;

import com.skytech.menus.model.Sys_Menu;
import com.skytech.persistence.dao.IDao;
import com.skytech.platform.menus.model.Sys_Menu_Ext;

import java.util.List;

public interface ISys_Menu_ExtDao extends IDao<Sys_Menu_Ext, String> {
    void destroyListCustom();

    List loadMenuList(List<String> permids, String parentMenuId,boolean loadFirstMenu) ;

    List loadShortcutMenuList(List<String> permids,String userId);
}