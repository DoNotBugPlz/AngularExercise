package com.skytech.platform.menus.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.menus.model.Sys_Menu;
import com.skytech.menus.service.IMenuService;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.platform.menus.dao.ISys_Menu_ExtDao;
import com.skytech.platform.menus.service.ISys_Menu_ExtService;
import com.skytech.platform.menus.model.Sys_Menu_Ext;

import java.util.List;

@Service("sys_Menu_ExtService")
public class Sys_Menu_ExtService extends BaseService<Sys_Menu_Ext, String> implements ISys_Menu_ExtService {
    @Resource(name = "menuService")
    private IMenuService menuService;
    private ISys_Menu_ExtDao sys_Menu_ExtDao;

    @Resource(name = "sys_Menu_ExtDao")
    @Override
    public void setBaseDao(IDao<Sys_Menu_Ext, String> baseDao) {
        this.sys_Menu_ExtDao = (ISys_Menu_ExtDao) baseDao;
        this.baseDao = baseDao;
    }

    @Override
    public Sys_Menu saveForm(Sys_Menu menu, Sys_Menu_Ext menuExt) {
        boolean isAdd = false;
        if (StringUtil.isNullOrWhiteSpace(menu.getId())) {
            isAdd = true;
        }
        menu = menuService.saveForm(menu);
        menuExt.setId(menu.getId());
        menuExt.setDelstatus(menu.getDelstatus());
        if (isAdd) {
            sys_Menu_ExtDao.save(menuExt);
        } else {
            sys_Menu_ExtDao.update(menuExt);
        }

        return menu;
    }

    @Override
    public int destroyListCustom(List<String> list) {
        menuService.destroyListCustom(list);
        sys_Menu_ExtDao.destroyListCustom();
        return 0;
    }

    @Override
    public List loadFirstMenuList(List<String> permids) {
        // TODO Auto-generated method stub
        return sys_Menu_ExtDao.loadMenuList(permids, null, true);
    }

    @Override
    public List loadShortcutMenuList(List<String> permids, String userId) {
        return sys_Menu_ExtDao.loadShortcutMenuList(permids, userId);
    }

    @Override
    public List loadChildMenuList(List<String> permids,
                                  String menurootid, String menuid) {
        // TODO Auto-generated method stub
        String parentMenuId = menuid == null ? menurootid : menuid;
        return sys_Menu_ExtDao.loadMenuList(permids, parentMenuId, false);
    }


}