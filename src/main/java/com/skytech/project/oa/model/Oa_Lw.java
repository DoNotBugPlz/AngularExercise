package com.skytech.project.oa.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "OA_LW")
public class Oa_Lw extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="WH_ID")
	private Long wh_id;

	@Column(name="UPLOAD_ZW")
	private String upload_zw;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="LIMIT_DATE")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date limit_date;

	@Column(name="RECEIVE_DATE")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date receive_date;

	@Column(name="EMERGENCY")
	private Integer emergency;

	@Column(name="OPEN_RANGE")
	private Integer open_range;

	@Column(name="UPLOAD")
	private String upload;

	@Column(name="WH")
	private String wh;

	@Column(name="SUBJECT_VALUE")
	private String subject_value;

	@Column(name="KEY_VALUE")
	private String key_value;

	@Column(name="SEND_DEPT")
	private String send_dept;

	@Column(name="SINGER_NAME")
	private String singer_name;

	@Column(name="TITLE")
	private String title;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	public Oa_Lw() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getWh_id() {
		return this.wh_id;
	}

	public void setWh_id(Long wh_id) {
		this.wh_id = wh_id;
	}

	public String getUpload_zw() {
		return this.upload_zw;
	}

	public void setUpload_zw(String upload_zw) {
		this.upload_zw = upload_zw;
	}

	public Long getAdder() {
		return this.adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public java.util.Date getLimit_date() {
		return this.limit_date;
	}

	public void setLimit_date(java.util.Date limit_date) {
		this.limit_date = limit_date;
	}

	public java.util.Date getReceive_date() {
		return this.receive_date;
	}

	public void setReceive_date(java.util.Date receive_date) {
		this.receive_date = receive_date;
	}

	public Integer getEmergency() {
		return this.emergency;
	}

	public void setEmergency(Integer emergency) {
		this.emergency = emergency;
	}

	public Integer getOpen_range() {
		return this.open_range;
	}

	public void setOpen_range(Integer open_range) {
		this.open_range = open_range;
	}

	public String getUpload() {
		return this.upload;
	}

	public void setUpload(String upload) {
		this.upload = upload;
	}

	public String getWh() {
		return this.wh;
	}

	public void setWh(String wh) {
		this.wh = wh;
	}

	public String getSubject_value() {
		return this.subject_value;
	}

	public void setSubject_value(String subject_value) {
		this.subject_value = subject_value;
	}

	public String getKey_value() {
		return this.key_value;
	}

	public void setKey_value(String key_value) {
		this.key_value = key_value;
	}

	public String getSend_dept() {
		return this.send_dept;
	}

	public void setSend_dept(String send_dept) {
		this.send_dept = send_dept;
	}

	public String getSinger_name() {
		return this.singer_name;
	}

	public void setSinger_name(String singer_name) {
		this.singer_name = singer_name;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getAdderdeptid() {
		return this.adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public java.util.Date getAddtime() {
		return this.addtime;
	}

	public void setAddtime(java.util.Date addtime) {
		this.addtime = addtime;
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

	public java.util.Date getModtime() {
		return this.modtime;
	}

	public void setModtime(java.util.Date modtime) {
		this.modtime = modtime;
	}

	
}