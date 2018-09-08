package com.skytech.project.goodsReferenceLib.barCodeManage.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "CF_GOODS_BAR_CODE")
public class Cf_Goods_Bar_Code implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="BAR_CODE")
	private String bar_code;

	@Column(name="UPLOADED")
	private String uploaded;

	@Column(name="UPLOADED_TIME")
	private java.util.Date uploaded_time;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull
	private String id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="GOODS_ID")
	private Long goods_id;

	@Column(name="GOODS_UNIQUE_ID")
	private Long goods_unique_id;

	@Column(name="IS_LAST_VERSION")
	private Integer is_last_version;

	public Cf_Goods_Bar_Code() {}

	/************************* getter、setter *****************************/
	public String getBar_code() {
		return this.bar_code;
	}

	public void setBar_code(String bar_code) {
		this.bar_code = bar_code;
	}

	public String getUploaded() {
		return this.uploaded;
	}

	public void setUploaded(String uploaded) {
		this.uploaded = uploaded;
	}

	public java.util.Date getUploaded_time() {
		return this.uploaded_time;
	}

	public void setUploaded_time(java.util.Date uploaded_time) {
		this.uploaded_time = uploaded_time;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getGoods_id() {
		return this.goods_id;
	}

	public void setGoods_id(Long goods_id) {
		this.goods_id = goods_id;
	}

	public Long getGoods_unique_id() {
		return this.goods_unique_id;
	}

	public void setGoods_unique_id(Long goods_unique_id) {
		this.goods_unique_id = goods_unique_id;
	}

	public Integer getIs_last_version() {
		return this.is_last_version;
	}

	public void setIs_last_version(Integer is_last_version) {
		this.is_last_version = is_last_version;
	}

	
}