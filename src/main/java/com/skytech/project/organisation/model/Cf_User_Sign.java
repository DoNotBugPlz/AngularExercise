package com.skytech.project.organisation.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@DynamicInsert
@Table(name = "CF_USER_SIGN")
public class Cf_User_Sign implements Serializable {

	private static final long serialVersionUID = 1L;


	@Id
	@GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
	@GeneratedValue(generator = "uuid")
	@Column(name = "ID", nullable = false)
	@NotNull
	private Long id;

	@Column(name="USER_ID")
	private Long user_id;

	@Column(name="MONITOR_POINT_ID")
	private Long monitor_point_id;

	@Column(name="LONGITUDE")
	private BigDecimal longitude;

	@Column(name="LATITUDE")
	private BigDecimal latitude;

	@Column(name="SIGN_ADDR")
	private String sign_addr;

	@Column(name="REMARK")
	private String remark;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="ADDERIP")
	private String adderip;

	public Cf_User_Sign() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUser_id() {
		return this.user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getMonitor_point_id() {
		return this.monitor_point_id;
	}

	public void setMonitor_point_id(Long monitor_point_id) {
		this.monitor_point_id = monitor_point_id;
	}

	public BigDecimal getLongitude() {
		return this.longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public BigDecimal getLatitude() {
		return this.latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public String getSign_addr() {
		return this.sign_addr;
	}

	public void setSign_addr(String sign_addr) {
		this.sign_addr = sign_addr;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getAdderip() {
		return this.adderip;
	}

	public void setAdderip(String adderip) {
		this.adderip = adderip;
	}

	
}