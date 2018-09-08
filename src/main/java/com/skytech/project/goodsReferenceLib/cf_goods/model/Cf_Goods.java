package com.skytech.project.goodsReferenceLib.cf_goods.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;

@Entity
@DynamicInsert
@Table(name = "CF_GOODS")
public class Cf_Goods extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="IS_LAST_VERSION")
	private Integer is_last_version;

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="NAME")
	private String name;

	@Column(name="GOODS_CODE")
	private String goods_code;

	@Column(name="SPEC")
	private String spec;

	@Column(name="MEASUREMENT_UNIT")
	private String measurement_unit;

	@Column(name="ALIAS")
	private String alias;

	@Column(name="REMARK")
	private String remark;

	@Column(name="ORIGIN_PLACE")
	private String origin_place;

	@Column(name="ORIGIN_COMPANY")
	private String origin_company;

	@Column(name="GOODS_PIC_UPLOADED")
	private String goods_pic_uploaded;

	@Column(name="BRAND")
	private String brand;

	@Column(name="DOSAGE")
	private String dosage;

	@Column(name="GOODS_PROPERTIES")
	private String goods_properties;

	@Column(name="USE_FOR")
	private String use_for;

	@Column(name="QUASI_WORD")
	private String quasi_word;

	@Column(name="MEDICAL_INSURANCE_CODE")
	private String medical_insurance_code;

	@Column(name="CONVERSION_RATIO")
	private String conversion_ratio;

	@Column(name="INDUSTRY_CATEGORY")
	private String industry_category;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer  delstatus;

	@Column(name="GOODS_TYPE_ID")
	private Long goods_type_id;

	@Column(name="SORTINDEX")
	private Long sortindex;

	@Column(name="UNIQUE_ID")
	private Long unique_id;

	@Column(name="GOODS_VERSION")
	private Integer goods_version;

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

	@Column(name="START_TIME")
	private java.util.Date start_time;

	public Cf_Goods() {}

	/************************* getter、setter *****************************/
	public Integer getIs_last_version() {
		return this.is_last_version;
	}

	public void setIs_last_version(Integer is_last_version) {
		this.is_last_version = is_last_version;
	}

	public Long getArea_id() {
		return this.area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGoods_code() {
		return this.goods_code;
	}

	public void setGoods_code(String goods_code) {
		this.goods_code = goods_code;
	}

	public String getSpec() {
		return this.spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	public String getMeasurement_unit() {
		return this.measurement_unit;
	}

	public void setMeasurement_unit(String measurement_unit) {
		this.measurement_unit = measurement_unit;
	}

	public String getAlias() {
		return this.alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getOrigin_place() {
		return this.origin_place;
	}

	public void setOrigin_place(String origin_place) {
		this.origin_place = origin_place;
	}

	public String getOrigin_company() {
		return this.origin_company;
	}

	public void setOrigin_company(String origin_company) {
		this.origin_company = origin_company;
	}

	public String getGoods_pic_uploaded() {
		return this.goods_pic_uploaded;
	}

	public void setGoods_pic_uploaded(String goods_pic_uploaded) {
		this.goods_pic_uploaded = goods_pic_uploaded;
	}

	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getDosage() {
		return this.dosage;
	}

	public void setDosage(String dosage) {
		this.dosage = dosage;
	}

	public String getGoods_properties() {
		return this.goods_properties;
	}

	public void setGoods_properties(String goods_properties) {
		this.goods_properties = goods_properties;
	}

	public String getUse_for() {
		return this.use_for;
	}

	public void setUse_for(String use_for) {
		this.use_for = use_for;
	}

	public String getQuasi_word() {
		return this.quasi_word;
	}

	public void setQuasi_word(String quasi_word) {
		this.quasi_word = quasi_word;
	}

	public String getMedical_insurance_code() {
		return this.medical_insurance_code;
	}

	public void setMedical_insurance_code(String medical_insurance_code) {
		this.medical_insurance_code = medical_insurance_code;
	}

	public String getConversion_ratio() {
		return this.conversion_ratio;
	}

	public void setConversion_ratio(String conversion_ratio) {
		this.conversion_ratio = conversion_ratio;
	}

	public String getIndustry_category() {
		return this.industry_category;
	}

	public void setIndustry_category(String industry_category) {
		this.industry_category = industry_category;
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

	public Long getGoods_type_id() {
		return this.goods_type_id;
	}

	public void setGoods_type_id(Long goods_type_id) {
		this.goods_type_id = goods_type_id;
	}

	public Long getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}

	public Long getUnique_id() {
		return this.unique_id;
	}

	public void setUnique_id(Long unique_id) {
		this.unique_id = unique_id;
	}

	public Integer getGoods_version() {
		return this.goods_version;
	}

	public void setGoods_version(Integer goods_version) {
		this.goods_version = goods_version;
	}

	public Long getAdder() {
		return adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Long getAdderdeptid() {
		return adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public Date getAddtime() {
		return addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Long getModer() {
		return moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public Long getModerdeptid() {
		return moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	public Date getModtime() {
		return modtime;
	}

	public void setModtime(Date modtime) {
		this.modtime = modtime;
	}

	public Date getStart_time() {
		return start_time;
	}

	public void setStart_time(Date start_time) {
		this.start_time = start_time;
	}
}