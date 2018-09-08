package com.skytech.project.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;

@Entity
@DynamicInsert
@Table(name = "T_DEMO")
public class T_Demo extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="COL_STR")
	private String col_str;

	@Column(name="COL_DATE")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date col_date;


	@Column(name="COL_DATETIME")
	private java.util.Date col_datetime;

	@Column(name="COL_NUM")
	private Long col_num;

	@Column(name="COL_CATEGORY")
	private Integer col_category;

	@Column(name="COL_CATEGORY_MULTI")
	private String col_category_multi;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="ADDER")
	private Long adder;

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

	@Column(name="UPLOAD_ZW")
	private String upload_zw;

	@Column(name="UPLOAD")
	private String upload;

	@Column(name="REMARK")
	private String remark;

	@Column(name="is_pub")
	private Integer is_pub;

	@Column(name="COL_CATEGORY_STR")
	private String col_category_str;


	/*@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull*/
	@Transient
	private Long id;

	public T_Demo() {}

	/************************* getter、setter *****************************/
	public String getCol_str() {
		return this.col_str;
	}

	public void setCol_str(String col_str) {
		this.col_str = col_str;
	}

	public java.util.Date getCol_date() {
		return this.col_date;
	}

	public void setCol_date(java.util.Date col_date) {
		this.col_date = col_date;
	}

	public java.util.Date getCol_datetime() {
		return this.col_datetime;
	}

	public void setCol_datetime(java.util.Date col_datetime) {
		this.col_datetime = col_datetime;
	}

	public Long getCol_num() {
		return this.col_num;
	}

	public void setCol_num(Long col_num) {
		this.col_num = col_num;
	}

	public Integer getCol_category() {
		return this.col_category;
	}

	public void setCol_category(Integer col_category) {
		this.col_category = col_category;
	}

	public String getCol_category_multi() {
		return this.col_category_multi;
	}

	public void setCol_category_multi(String col_category_multi) {
		this.col_category_multi = col_category_multi;
	}

	public Integer getDelstatus() {
		return this.delstatus;
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

	public String getUpload_zw() {
		return this.upload_zw;
	}

	public void setUpload_zw(String upload_zw) {
		this.upload_zw = upload_zw;
	}

	public String getUpload() {
		return this.upload;
	}

	public void setUpload(String upload) {
		this.upload = upload;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCol_category_str() {
		return this.col_category_str;
	}

	public void setCol_category_str(String col_category_str) {
		this.col_category_str = col_category_str;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getIs_pub() {
		return is_pub;
	}

	public void setIs_pub(Integer is_pub) {
		this.is_pub = is_pub;
	}
}