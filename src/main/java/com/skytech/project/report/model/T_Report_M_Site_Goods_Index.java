package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_M_SITE_GOODS_INDEX")
public class T_Report_M_Site_Goods_Index extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_ID")
	private Long report_id;

	@Column(name="REPORT_M_SITE_GOODS_ID")
	private Long report_m_site_goods_id;

	@Column(name="INDEX_ID")
	private Long index_id;

	public T_Report_M_Site_Goods_Index() {}

	/************************* getter、setter *****************************/
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

	public Long getReport_id() {
		return this.report_id;
	}

	public void setReport_id(Long report_id) {
		this.report_id = report_id;
	}

	public Long getReport_m_site_goods_id() {
		return this.report_m_site_goods_id;
	}

	public void setReport_m_site_goods_id(Long report_m_site_goods_id) {
		this.report_m_site_goods_id = report_m_site_goods_id;
	}

	public Long getIndex_id() {
		return this.index_id;
	}

	public void setIndex_id(Long index_id) {
		this.index_id = index_id;
	}

	
}