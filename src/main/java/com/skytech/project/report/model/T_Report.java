package com.skytech.project.report.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT")
public class T_Report extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="PRICE_DATE")
	private java.util.Date price_date;

	@Column(name="REPORT_DATE_START")
	private java.util.Date report_date_start;

	@Column(name="REPORT_DATE_END")
	private java.util.Date report_date_end;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_PUSH_ID")
	private Long task_push_id;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="IS_PARENT")
	private Integer is_parent;

	@Column(name="PARENT_ID")
	private Long parent_id;

	@Column(name="TASK_CLASSES")
	private Integer task_classes;

	@Column(name="REPORT_YEAR")
	private Integer report_year;

	@Column(name="REPORT_PERIOD")
	private Integer report_period;

	public T_Report() {}

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

	public Long getTask_push_id() {
		return task_push_id;
	}

	public void setTask_push_id(Long task_push_id) {
		this.task_push_id = task_push_id;
	}

	public Long getTask_id() {
		return task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}

	public Integer getIs_parent() {
		return is_parent;
	}

	public void setIs_parent(Integer is_parent) {
		this.is_parent = is_parent;
	}

	public Long getParent_id() {
		return parent_id;
	}

	public void setParent_id(Long parent_id) {
		this.parent_id = parent_id;
	}

	public Integer getTask_classes() {
		return task_classes;
	}

	public void setTask_classes(Integer task_classes) {
		this.task_classes = task_classes;
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
}