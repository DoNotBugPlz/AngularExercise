package com.skytech.project.shortcutmenu.service;

import com.skytech.persistence.service.IBaseService;
import com.skytech.project.shortcutmenu.model.T_Shortcut_Menu;

public interface IT_Shortcut_MenuService extends IBaseService<T_Shortcut_Menu, Long> {


    void delOldshortcut(Long currentUserId);
}