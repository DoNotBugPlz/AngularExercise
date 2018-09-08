package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_M_SITE")
public class T_Report_M_Site extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_ID")
	private Long report_id;

	@Column(name="REPORT_AREA_ID")
	private Long report_area_id;

	@Column(name="TASK_M_SITE_ID")
	private Long task_m_site_id;

	@Column(name="M_SITE_ID")
	private Long m_site_id;

	@Column(name="APPROVE_STATUS")
	private Integer approve_status;

	@Column(name="REPORT_STATUS")
	private Integer report_status;

	public T_Report_M_Site() {}

	/************************* getter、setter *****************************/
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

	public Long getReport_id() {
		return report_id;
	}

	public void setReport_id(Long report_id) {
		this.report_id = report_id;
	}

	public Long getReport_area_id() {
		return report_area_id;
	}

	public void setReport_area_id(Long report_area_id) {
		this.report_area_id = report_area_id;
	}

	public Long getTask_m_site_id() {
		return task_m_site_id;
	}

	public void setTask_m_site_id(Long task_m_site_id) {
		this.task_m_site_id = task_m_site_id;
	}

	public Long getM_site_id() {
		return m_site_id;
	}

	public void setM_site_id(Long m_site_id) {
		this.m_site_id = m_site_id;
	}

	public Integer getApprove_status() {
		return approve_status;
	}

	public void setApprove_status(Integer approve_status) {
		this.approve_status = approve_status;
	}

	public Integer getReport_status() {
		return report_status;
	}

	public void setReport_status(Integer report_status) {
		this.report_status = report_status;
	}
}