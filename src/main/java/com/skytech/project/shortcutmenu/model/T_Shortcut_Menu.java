package com.skytech.project.shortcutmenu.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_SHORTCUT_MENU")
public class T_Shortcut_Menu extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MENU_ID")
	private String menu_id;

	@Column(name="SORTINDEX")
	private Integer sortindex;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="USER_ID")
	private Long user_id;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	public T_Shortcut_Menu() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMenu_id() {
		return this.menu_id;
	}

	public void setMenu_id(String menu_id) {
		this.menu_id = menu_id;
	}

	public Integer getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Integer sortindex) {
		this.sortindex = sortindex;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getUser_id() {
		return this.user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getAdder() {
		return this.adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public java.util.Date getAddtime() {
		return this.addtime;
	}

	public void setAddtime(java.util.Date addtime) {
		this.addtime = addtime;
	}

	public Long getAdderdeptid() {
		return this.adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public Long getModer() {
		return this.moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public java.util.Date getModtime() {
		return this.modtime;
	}

	public void setModtime(java.util.Date modtime) {
		this.modtime = modtime;
	}

	public Long getModerdeptid() {
		return this.moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	
}