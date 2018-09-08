package com.skytech.project.monitor.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MONITOR_REPORT_CLASS")
public class T_Monitor_Report_Class extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MONITOR_REPORT_ID")
	private Long monitor_report_id;

	@Column(name="CLASS_ID")
	private Long class_id;

	@Column(name="CLASS_NAME")
	private String class_name;

	@Column(name="CLASS_PRICE_CHANGE")
	private String class_price_change;

	@Column(name="TREND_TYPE_ID")
	private Long trend_type_id;

	public Long getTrend_type_id() {
		return trend_type_id;
	}

	public void setTrend_type_id(Long trend_type_id) {
		this.trend_type_id = trend_type_id;
	}

	@Column(name = "DELSTATUS")
	private Integer delstatus;
	@Column(name="SORTINDEX")
	private Integer sortindex;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	public T_Monitor_Report_Class() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMonitor_report_id() {
		return this.monitor_report_id;
	}

	public void setMonitor_report_id(Long monitor_report_id) {
		this.monitor_report_id = monitor_report_id;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getClass_id() {
		return this.class_id;
	}

	public void setClass_id(Long class_id) {
		this.class_id = class_id;
	}

	public String getClass_name() {
		return this.class_name;
	}

	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}

	public String getClass_price_change() {
		return this.class_price_change;
	}

	public void setClass_price_change(String class_price_change) {
		this.class_price_change = class_price_change;
	}



	public Integer getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Integer sortindex) {
		this.sortindex = sortindex;
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

	
}