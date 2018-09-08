package com.skytech.project.masterplate.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MASTERPLATE_CLASS")
public class T_Masterplate_Class extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MASTERPLATE_ID")
	private Long masterplate_id;

	@Column(name="CLASS_NAME")
	private String class_name;

	@Column(name="DELSTATUS")
	private Integer delstatus;
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
	public T_Masterplate_Class() {}

	public Long getAdder() {
		return adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Date getAddtime() {
		return addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Long getAdderdeptid() {
		return adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public Long getModer() {
		return moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public Date getModtime() {
		return modtime;
	}

	public void setModtime(Date modtime) {
		this.modtime = modtime;
	}

	public Long getModerdeptid() {
		return moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	/************************* getter、setter *****************************/

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMasterplate_id() {
		return this.masterplate_id;
	}

	public void setMasterplate_id(Long masterplate_id) {
		this.masterplate_id = masterplate_id;
	}

	public String getClass_name() {
		return this.class_name;
	}

	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	
}