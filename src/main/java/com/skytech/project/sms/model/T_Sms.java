package com.skytech.project.sms.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerQuestionTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_SMS")
public class T_Sms  extends PkNubmerQuestionTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="SENDER_PHONE")
	private Long sender_phone;

	@Column(name="CONTENT")
	private String content;

	@Column(name="STATUS")
	private Integer status;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="ADDERIP")
	private String adderip;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="MODERIP")
	private String moderip;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="ADDTIME")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date addtime;


	public T_Sms() {}

	/************************* getter、setter *****************************/
	public Long getSender_phone() {
		return this.sender_phone;
	}

	public void setSender_phone(Long sender_phone) {
		this.sender_phone = sender_phone;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Long getAdder() {
		return this.adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Long getAdderdeptid() {
		return this.adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public String getAdderip() {
		return this.adderip;
	}

	public void setAdderip(String adderip) {
		this.adderip = adderip;
	}

	public Long getModer() {
		return this.moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public Long getModerdeptid() {
		return this.moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	public String getModerip() {
		return this.moderip;
	}

	public void setModerip(String moderip) {
		this.moderip = moderip;
	}

	public java.util.Date getModtime() {
		return this.modtime;
	}

	public void setModtime(java.util.Date modtime) {
		this.modtime = modtime;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}





}