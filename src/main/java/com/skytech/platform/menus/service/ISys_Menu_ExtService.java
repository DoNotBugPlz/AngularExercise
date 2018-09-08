package com.skytech.platform.menus.service;

import com.skytech.menus.model.Sys_Menu;
import com.skytech.persistence.service.IBaseService;
import com.skytech.platform.menus.model.Sys_Menu_Ext;

import java.util.List;

public interface ISys_Menu_ExtService extends IBaseService<Sys_Menu_Ext, String> {


    Sys_Menu saveForm(Sys_Menu menu, Sys_Menu_Ext menuExt);

    int destroyListCustom(List<String> list);

    List loadChildMenuList(List<String> permids, String menuParentId, String menuid);

    List loadFirstMenuList(List<String> permids);

    List loadShortcutMenuList(List<String> permids,String userId);
}