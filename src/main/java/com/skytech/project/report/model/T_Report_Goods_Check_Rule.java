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
@Table(name = "T_REPORT_GOODS_CHECK_RULE")
public class T_Report_Goods_Check_Rule extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="COMPAR_DATE")
	private java.util.Date compar_date;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_CHECK_RULE_MAIN_ID")
	private Long report_check_rule_main_id;

	@Column(name="CHECK_RULE")
	private Integer check_rule;

	@Column(name="PERIOD_NUM")
	private Integer period_num;

	@Column(name="RANGE_TOP")
	private Integer range_top;

	@Column(name="RANGE_BOTTOM")
	private Integer range_bottom;

	@Column(name="INDEX_ID")
	private Long index_id;

	@Column(name="TASK_INDEX_ID")
	private Long task_index_id;

	@Column(name="SORTINDEX")
	private Long sortindex;

	public T_Report_Goods_Check_Rule() {}

	/************************* getter、setter *****************************/
	public Date getCompar_date() {
		return compar_date;
	}

	public void setCompar_date(Date compar_date) {
		this.compar_date = compar_date;
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

	public Long getReport_check_rule_main_id() {
		return report_check_rule_main_id;
	}

	public void setReport_check_rule_main_id(Long report_check_rule_main_id) {
		this.report_check_rule_main_id = report_check_rule_main_id;
	}

	public Integer getCheck_rule() {
		return check_rule;
	}

	public void setCheck_rule(Integer check_rule) {
		this.check_rule = check_rule;
	}

	public Integer getPeriod_num() {
		return period_num;
	}

	public void setPeriod_num(Integer period_num) {
		this.period_num = period_num;
	}

	public Integer getRange_top() {
		return range_top;
	}

	public void setRange_top(Integer range_top) {
		this.range_top = range_top;
	}

	public Integer getRange_bottom() {
		return range_bottom;
	}

	public void setRange_bottom(Integer range_bottom) {
		this.range_bottom = range_bottom;
	}

	public Long getIndex_id() {
		return index_id;
	}

	public void setIndex_id(Long index_id) {
		this.index_id = index_id;
	}

	public Long getTask_index_id() {
		return task_index_id;
	}

	public void setTask_index_id(Long task_index_id) {
		this.task_index_id = task_index_id;
	}

	public Long getSortindex() {
		return sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}
}