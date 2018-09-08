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
@Table(name = "T_TASK_PUSH")
public class T_Task_Push extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="PRICE_DATE")
	private java.util.Date price_date;

	@Column(name="REPORT_DATE_START")
	private java.util.Date report_date_start;

	@Column(name="REPORT_DATE_END")
	private java.util.Date report_date_end;

	@Column(name="PUSH_DATE")
	private java.util.Date push_date;

	@Column(name="IS_PUSH")
	private Integer is_push;

	@Column(name="REPORT_YEAR")
	private Integer report_year;

	@Column(name="REPORT_PERIOD")
	private Integer report_period;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	public T_Task_Push() {}

	/************************* getter、setter *****************************/
	public Date getPrice_date() {
		return price_date;
	}

	public void setPrice_date(Date price_date) {
		this.price_date = price_date;
	}

	public Date getReport_date_start() {
		return report_date_start;
	}

	public void setReport_date_start(Date report_date_start) {
		this.report_date_start = report_date_start;
	}

	public Date getReport_date_end() {
		return report_date_end;
	}

	public void setReport_date_end(Date report_date_end) {
		this.report_date_end = report_date_end;
	}

	public Date getPush_date() {
		return push_date;
	}

	public void setPush_date(Date push_date) {
		this.push_date = push_date;
	}

	public Integer getIs_push() {
		return is_push;
	}

	public void setIs_push(Integer is_push) {
		this.is_push = is_push;
	}

	public Integer getReport_year() {
		return report_year;
	}

	public void setReport_year(Integer report_year) {
		this.report_year = report_year;
	}

	public Integer getReport_period() {
		return report_period;
	}

	public void setReport_period(Integer report_period) {
		this.report_period = report_period;
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

	public Long getTask_id() {
		return task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}
}