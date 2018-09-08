package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_GOODS_DETAIL_INDEX")
public class T_Report_Goods_Detail_Index extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="GOODS_DETAIL_ID")
	private Long goods_detail_id;

	@Column(name="INDEX_ID")
	private Long index_id;

	public T_Report_Goods_Detail_Index() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getGoods_detail_id() {
		return this.goods_detail_id;
	}

	public void setGoods_detail_id(Long goods_detail_id) {
		this.goods_detail_id = goods_detail_id;
	}

	public Long getIndex_id() {
		return this.index_id;
	}

	public void setIndex_id(Long index_id) {
		this.index_id = index_id;
	}

	
}