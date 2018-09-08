package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_M_SITE_GOODS")
public class T_Report_M_Site_Goods extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="REPORT_ID")
	private Long report_id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_M_SITE_ID")
	private Long report_m_site_id;

	@Column(name="M_SITE_ID")
	private Long m_site_id;

	@Column(name="GOODS_UNIQUE_ID")
	private Long goods_unique_id;

	@Column(name="GOODS_ID")
	private Long goods_id;

	@Column(name="SORTINDEX")
	private Long sortindex;

	@Column(name="GOODS_DETAIL_ID")
	private Long goods_detail_id;

	@Column(name="REPORT_CHECK_RULE_MAIN_ID")
	private Long report_check_rule_main_id;

	public T_Report_M_Site_Goods() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getReport_id() {
		return this.report_id;
	}

	public void setReport_id(Long report_id) {
		this.report_id = report_id;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getReport_m_site_id() {
		return this.report_m_site_id;
	}

	public void setReport_m_site_id(Long report_m_site_id) {
		this.report_m_site_id = report_m_site_id;
	}

	public Long getM_site_id() {
		return this.m_site_id;
	}

	public void setM_site_id(Long m_site_id) {
		this.m_site_id = m_site_id;
	}

	public Long getGoods_unique_id() {
		return this.goods_unique_id;
	}

	public void setGoods_unique_id(Long goods_unique_id) {
		this.goods_unique_id = goods_unique_id;
	}

	public Long getGoods_id() {
		return this.goods_id;
	}

	public void setGoods_id(Long goods_id) {
		this.goods_id = goods_id;
	}

	public Long getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}

	public Long getGoods_detail_id() {
		return this.goods_detail_id;
	}

	public void setGoods_detail_id(Long goods_detail_id) {
		this.goods_detail_id = goods_detail_id;
	}

	public Long getReport_check_rule_main_id() {
		return this.report_check_rule_main_id;
	}

	public void setReport_check_rule_main_id(Long report_check_rule_main_id) {
		this.report_check_rule_main_id = report_check_rule_main_id;
	}

	
}