package com.skytech.project.goodsReferenceLib.goods_type.model;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;

@Entity
@DynamicInsert
@Table(name = "CF_GOODS_TYPE")
public class Cf_Goods_Type extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="TYPE_NAME")
	private String type_name;

	@Column(name="TYPE_CODE")
	private String type_code;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="PARENTID")
	private Long parentid;

	@Column(name="GOODS_FAMILY")
	private Integer goods_family;

	@Column(name="SORTINDEX")
	private Integer sortindex;

	@Column(name="GOODS_CLASSES")
	private Integer goods_classes;

	public Cf_Goods_Type() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType_name() {
		return this.type_name;
	}

	public void setType_name(String type_name) {
		this.type_name = type_name;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getParentid() {
		return this.parentid;
	}

	public void setParentid(Long parentid) {
		this.parentid = parentid;
	}


	public Integer getGoods_classes() {
		return this.goods_classes;
	}

	public void setGoods_classes(Integer goods_classes) {
		this.goods_classes = goods_classes;
	}


	public Integer getGoods_family() {
		return goods_family;
	}

	public void setGoods_family(Integer goods_family) {
		this.goods_family = goods_family;
	}

	public Integer getSortindex() {
		return sortindex;
	}

	public void setSortindex(Integer sortindex) {
		this.sortindex = sortindex;
	}

	public String getType_code() {
		return type_code;
	}

	public void setType_code(String type_code) {
		this.type_code = type_code;
	}
}