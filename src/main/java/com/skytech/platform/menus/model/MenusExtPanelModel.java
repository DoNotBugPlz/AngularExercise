package com.skytech.platform.menus.model;

import com.skytech.basic.wrapper.SuperPanelModel;
import com.skytech.menus.model.Sys_Menu;

public class MenusExtPanelModel extends SuperPanelModel {


	private Sys_Menu sys_menu;

	private Sys_Menu_Ext sys_menu_ext;

	public Sys_Menu getSys_menu() {
		return sys_menu;
	}

	public void setSys_menu(Sys_Menu sys_menu) {
		this.sys_menu = sys_menu;
	}

	public Sys_Menu_Ext getSys_menu_ext() {
		return sys_menu_ext;
	}

	public void setSys_menu_ext(Sys_Menu_Ext sys_menu_ext) {
		this.sys_menu_ext = sys_menu_ext;
	}
}
