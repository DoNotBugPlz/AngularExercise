package com.skytech.project.matter.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MATTER_MONITOR")
public class T_Matter_Monitor extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MATER_ID")
	private Long mater_id;

	@Column(name="ENTERPRISE")
	private String enterprise;

	@Column(name="CREDIT_CODE")
	private String credit_code;

	@Column(name="ENTERPRISE_TYPE")
	private Integer enterprise_type;

	@Column(name="ENTERPRISE_STREET")
	private String enterprise_street;

	@Column(name="LAW")
	private String law;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="LAW_PHONE")
	private String law_phone;

	@Column(name="CONTACTS_NAME")
	private String contacts_name;

	@Column(name="CONTACTS_PHONE")
	private String contacts_phone;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	public T_Matter_Monitor() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMater_id() {
		return this.mater_id;
	}

	public void setMater_id(Long mater_id) {
		this.mater_id = mater_id;
	}

	public String getEnterprise() {
		return this.enterprise;
	}

	public void setEnterprise(String enterprise) {
		this.enterprise = enterprise;
	}

	public String getCredit_code() {
		return this.credit_code;
	}

	public void setCredit_code(String credit_code) {
		this.credit_code = credit_code;
	}

	public Integer getEnterprise_type() {
		return this.enterprise_type;
	}

	public void setEnterprise_type(Integer enterprise_type) {
		this.enterprise_type = enterprise_type;
	}

	public String getEnterprise_street() {
		return this.enterprise_street;
	}

	public void setEnterprise_street(String enterprise_street) {
		this.enterprise_street = enterprise_street;
	}

	public String getLaw() {
		return this.law;
	}

	public void setLaw(String law) {
		this.law = law;
	}

	public Long getAdder() {
		return this.adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Long getModerdeptid() {
		return this.moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	public String getLaw_phone() {
		return this.law_phone;
	}

	public void setLaw_phone(String law_phone) {
		this.law_phone = law_phone;
	}

	public String getContacts_name() {
		return this.contacts_name;
	}

	public void setContacts_name(String contacts_name) {
		this.contacts_name = contacts_name;
	}

	public String getContacts_phone() {
		return this.contacts_phone;
	}

	public void setContacts_phone(String contacts_phone) {
		this.contacts_phone = contacts_phone;
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

	
}