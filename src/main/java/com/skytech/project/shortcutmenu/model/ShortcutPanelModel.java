package com.skytech.project.shortcutmenu.model;

import com.skytech.basic.wrapper.SuperPanelModel;

import java.util.List;

public class ShortcutPanelModel extends SuperPanelModel {

    private List<T_Shortcut_Menu> list;

    public List<T_Shortcut_Menu> getList() {
        return list;
    }

    public void setList(List<T_Shortcut_Menu> list) {
        this.list = list;
    }
}
