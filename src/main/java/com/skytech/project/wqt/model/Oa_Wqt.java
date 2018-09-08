package com.skytech.project.wqt.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "OA_WQT")
public class Oa_Wqt extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="NAME")
	private String name;

	@Column(name="REMARK")
	private String remark;

	@Column(name="SORTINDEX")
	private Integer sortindex;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="FAIR_CHARACTER")
	private String fair_character;

	@Column(name="UPLOAD")
	private String upload;

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

	public Oa_Wqt() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getFair_character() {
		return this.fair_character;
	}

	public void setFair_character(String fair_character) {
		this.fair_character = fair_character;
	}

	public String getUpload() {
		return this.upload;
	}

	public void setUpload(String upload) {
		this.upload = upload;
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