package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
@Entity
@DynamicInsert
@Table(name = "T_REPORT_M_SITE_GOODS_INDEX_W")
public class T_Report_M_Site_Goods_Index_W extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="W_INFO")
	private String w_info;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_M_SITE_GOODS_INDEX_ID")
	private Long report_m_site_goods_index_id;

	@Column(name="APPROVE_TYPE")
	private Integer approve_type;

	@Column(name="CHECK_RULES_ID")
	private Long check_rules_id;

	@Column(name="W_STATUS")
	private Integer w_status;

	public T_Report_M_Site_Goods_Index_W() {}

	/************************* getter、setter *****************************/
	public String getW_info() {
		return w_info;
	}

	public void setW_info(String w_info) {
		this.w_info = w_info;
	}

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getReport_m_site_goods_index_id() {
		return report_m_site_goods_index_id;
	}

	public void setReport_m_site_goods_index_id(Long report_m_site_goods_index_id) {
		this.report_m_site_goods_index_id = report_m_site_goods_index_id;
	}

	public Integer getApprove_type() {
		return approve_type;
	}

	public void setApprove_type(Integer approve_type) {
		this.approve_type = approve_type;
	}

	public Long getCheck_rules_id() {
		return check_rules_id;
	}

	public void setCheck_rules_id(Long check_rules_id) {
		this.check_rules_id = check_rules_id;
	}

	public Integer getW_status() {
		return w_status;
	}

	public void setW_status(Integer w_status) {
		this.w_status = w_status;
	}
}