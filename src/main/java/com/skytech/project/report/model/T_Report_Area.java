package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_AREA")
public class T_Report_Area  extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="TASK_AREA_ID")
	private Long task_area_id;

	@Column(name="REPORT_STATUS")
	private Integer report_status;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_ID")
	private Long report_id;

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="APPROVE_STATUS")
	private Integer approve_status;

	public T_Report_Area() {}

	/************************* getter、setter *****************************/
	public Long getTask_area_id() {
		return task_area_id;
	}

	public void setTask_area_id(Long task_area_id) {
		this.task_area_id = task_area_id;
	}

	public Integer getReport_status() {
		return report_status;
	}

	public void setReport_status(Integer report_status) {
		this.report_status = report_status;
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

	public Long getReport_id() {
		return report_id;
	}

	public void setReport_id(Long report_id) {
		this.report_id = report_id;
	}

	public Long getArea_id() {
		return area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public Integer getApprove_status() {
		return approve_status;
	}

	public void setApprove_status(Integer approve_status) {
		this.approve_status = approve_status;
	}
}