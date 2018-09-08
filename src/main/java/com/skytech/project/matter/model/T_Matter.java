package com.skytech.project.matter.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MATTER")
public class T_Matter extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="NAME")
	private String name;

	@Column(name="ENTRY_TIME")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date entry_time;

	@Column(name="END_TIME")
	private java.util.Date end_time;

	@Column(name="STATUS")
	private Integer status;

	@Column(name="LAW")
	private String law;

	@Column(name="QUESTION")
	private String question;

	@Column(name="HANDLING_MSG")
	private String handling_msg;

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

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="M_SITE_ID")
	private Long m_site_id;

	public T_Matter() {}

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

	public java.util.Date getEntry_time() {
		return this.entry_time;
	}

	public void setEntry_time(java.util.Date entry_time) {
		this.entry_time = entry_time;
	}

	public java.util.Date getEnd_time() {
		return this.end_time;
	}

	public void setEnd_time(java.util.Date end_time) {
		this.end_time = end_time;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getLaw() {
		return this.law;
	}

	public void setLaw(String law) {
		this.law = law;
	}

	public String getQuestion() {
		return this.question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getHandling_msg() {
		return this.handling_msg;
	}

	public void setHandling_msg(String handling_msg) {
		this.handling_msg = handling_msg;
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

	public Long getArea_id() {
		return this.area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public Long getM_site_id() {
		return this.m_site_id;
	}

	public void setM_site_id(Long m_site_id) {
		this.m_site_id = m_site_id;
	}

	
}