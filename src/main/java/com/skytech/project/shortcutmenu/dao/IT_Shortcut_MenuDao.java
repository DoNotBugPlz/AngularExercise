package com.skytech.project.shortcutmenu.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.shortcutmenu.model.T_Shortcut_Menu;

public interface IT_Shortcut_MenuDao extends IDao<T_Shortcut_Menu, Long> {


    void delOldshortcut(Long userId);
}