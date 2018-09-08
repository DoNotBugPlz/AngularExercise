package com.skytech.project.task.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_CYCLE")
public class T_Task_Cycle extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="REPORT_START_TIME")
	private Integer report_start_time;

	@Column(name="REPORT_END_TIME")
	private Integer report_end_time;

	@Column(name="REPORT_START_DATE")
	private String report_start_date;

	@Column(name="REPORT_END_DATE")
	private String report_end_date;

	@Column(name="TASK_PRICE_DATE")
	private String task_price_date;

	@Column(name="TASK_START_DATE")
	private java.util.Date task_start_date;

	@Column(name="TASK_END_DATE")
	private java.util.Date task_end_date;

	public T_Task_Cycle() {}

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

	public Long getTask_id() {
		return task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}

	public Integer getReport_start_time() {
		return report_start_time;
	}

	public void setReport_start_time(Integer report_start_time) {
		this.report_start_time = report_start_time;
	}

	public Integer getReport_end_time() {
		return report_end_time;
	}

	public void setReport_end_time(Integer report_end_time) {
		this.report_end_time = report_end_time;
	}

	public String getReport_start_date() {
		return report_start_date;
	}

	public void setReport_start_date(String report_start_date) {
		this.report_start_date = report_start_date;
	}

	public String getReport_end_date() {
		return report_end_date;
	}

	public void setReport_end_date(String report_end_date) {
		this.report_end_date = report_end_date;
	}

	public String getTask_price_date() {
		return task_price_date;
	}

	public void setTask_price_date(String task_price_date) {
		this.task_price_date = task_price_date;
	}

	public Date getTask_start_date() {
		return task_start_date;
	}

	public void setTask_start_date(Date task_start_date) {
		this.task_start_date = task_start_date;
	}

	public Date getTask_end_date() {
		return task_end_date;
	}

	public void setTask_end_date(Date task_end_date) {
		this.task_end_date = task_end_date;
	}
}