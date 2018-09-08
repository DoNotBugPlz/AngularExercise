package com.skytech.project.goodsReferenceLib.goods_link.model;

import java.io.Serializable;
import javax.persistence.*;

import com.sun.istack.NotNull;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "CF_GOODS_LINK")
public class Cf_Goods_Link  implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull
	private String id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="GOODS_ID")
	private long goods_id;

	@Column(name="LINK_GOODS_ID")
	private Long link_goods_id;

	@Column(name="AREA_ID")
	private Long area_id;

	public Cf_Goods_Link() {}

	/************************* getter、setter *****************************/
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

	public Long getLink_goods_id() {
		return this.link_goods_id;
	}

	public void setLink_goods_id(Long link_goods_id) {
		this.link_goods_id = link_goods_id;
	}

	public Long getArea_id() {
		return this.area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	
}