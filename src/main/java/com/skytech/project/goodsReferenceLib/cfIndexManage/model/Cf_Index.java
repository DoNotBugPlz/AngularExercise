package com.skytech.project.goodsReferenceLib.cfIndexManage.model;

import com.skytech.config.pk_model.PkNubmerConfigTab;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;

@Entity
@DynamicInsert
@Table(name = "CF_INDEX")
public class Cf_Index extends PkNubmerConfigTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="INDEX_CATEGORY")
	private Integer index_category;

	@Column(name="SORTINDEX")
	private Long sortindex;

	@Column(name="COL_TYPE")
	private Integer col_type;

	@Column(name="PRECISION")
	private Integer precision;

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="INDEX_NATURE")

	private Integer index_nature;

	@Column(name="CATEGORY_CONSTNAME")
	private String category_constname;

	@Column(name="NAME")
	private String name;

	@Column(name="REMARK")
	private String remark;

	@Column(name="COL_NAME")
	private String col_name;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	public Cf_Index() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getIndex_category() {
		return index_category;
	}

	public void setIndex_category(Integer index_category) {
		this.index_category = index_category;
	}

	public Integer getIndex_nature() {
		return index_nature;
	}

	public void setIndex_nature(Integer index_nature) {
		this.index_nature = index_nature;
	}

	public Long getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}

	public Integer getCol_type() {
		return this.col_type;
	}

	public void setCol_type(Integer col_type) {
		this.col_type = col_type;
	}

	public Integer getPrecision() {
		return this.precision;
	}

	public void setPrecision(Integer precision) {
		this.precision = precision;
	}

	public Long getArea_id() {
		return this.area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public String getCategory_constname() {
		return this.category_constname;
	}

	public void setCategory_constname(String category_constname) {
		this.category_constname = category_constname;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCol_name() {
		return this.col_name;
	}

	public void setCol_name(String col_name) {
		this.col_name = col_name;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	
}