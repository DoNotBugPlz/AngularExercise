package com.skytech.project.masterplate.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MASTERPLATE")
public class T_Masterplate extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MASTERPLATE_NAME")
	private String masterplate_name;

	@Column(name="MASTERPLATE_TYPE")
	private Integer masterplate_type;

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

	public T_Masterplate() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMasterplate_name() {
		return this.masterplate_name;
	}

	public void setMasterplate_name(String masterplate_name) {
		this.masterplate_name = masterplate_name;
	}

	public Integer getMasterplate_type() {
		return masterplate_type;
	}

	public void setMasterplate_type(Integer masterplate_type) {
		this.masterplate_type = masterplate_type;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
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