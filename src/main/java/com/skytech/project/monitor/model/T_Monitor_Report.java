package com.skytech.project.monitor.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

@Entity
@DynamicInsert
@Table(name = "T_MONITOR_REPORT")
public class T_Monitor_Report extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MASTERPLATE_ID")
	private Long masterplate_id;

	@Column(name="REPORT_NAME")
	private String report_name;

	@Column(name="START_TIME")
	private java.util.Date start_time;

	@Column(name="END_TIME")
	private java.util.Date end_time;

	@Lob
	@Type(type="org.hibernate.type.MaterializedClobType")
	@Column(name="CONTENT")
	private String content;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	@Lob
	@Type(type="org.hibernate.type.MaterializedClobType")
	@Column(name="CONTENT_EDIT")
	private String content_edit;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="ADDER")
	private Long adder;
	@Column(name = "DELSTATUS")
	private Integer delstatus;
	public T_Monitor_Report() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getMasterplate_id() {
		return this.masterplate_id;
	}

	public void setMasterplate_id(Long masterplate_id) {
		this.masterplate_id = masterplate_id;
	}

	public String getReport_name() {
		return this.report_name;
	}

	public void setReport_name(String report_name) {
		this.report_name = report_name;
	}

	public java.util.Date getStart_time() {
		return this.start_time;
	}

	public void setStart_time(java.util.Date start_time) {
		this.start_time = start_time;
	}

	public java.util.Date getEnd_time() {
		return this.end_time;
	}

	public void setEnd_time(java.util.Date end_time) {
		this.end_time = end_time;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getContent_edit() {
		return this.content_edit;
	}

	public void setContent_edit(String content_edit) {
		this.content_edit = content_edit;
	}

	public java.util.Date getAddtime() {
		return this.addtime;
	}

	public void setAddtime(java.util.Date addtime) {
		this.addtime = addtime;
	}

	public Long getAdder() {
		return this.adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	
}