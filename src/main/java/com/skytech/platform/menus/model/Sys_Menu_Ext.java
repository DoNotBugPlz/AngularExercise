package com.skytech.platform.menus.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "SYS_MENU_EXT")
public class Sys_Menu_Ext implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
//	@GeneratedValue(generator="uuid")
//	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="ID",nullable=false)
	@NotNull
	private String id;

	@Column(name="UI_ROUTER_KEY")
	private String ui_router_key;

	@Column(name="UI_PARAMS")
	private String ui_params;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="MENU_URL_TYPE")
	private Integer menu_url_type;

	public Sys_Menu_Ext() {}

	/************************* getter、setter *****************************/
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUi_router_key() {
		return ui_router_key;
	}

	public void setUi_router_key(String ui_router_key) {
		this.ui_router_key = ui_router_key;
	}

	public String getUi_params() {
		return this.ui_params;
	}

	public void setUi_params(String ui_params) {
		this.ui_params = ui_params;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Integer getMenu_url_type() {
		return this.menu_url_type;
	}

	public void setMenu_url_type(Integer menu_url_type) {
		this.menu_url_type = menu_url_type;
	}

	
}