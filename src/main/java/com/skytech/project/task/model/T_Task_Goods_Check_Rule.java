package com.skytech.project.task.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_GOODS_CHECK_RULE")
public class T_Task_Goods_Check_Rule extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="RANGE_TOP")
	private Long range_top;

	@Column(name="RANGE_BOTTOM")
	private Long range_bottom;

	@Column(name="TASK_INDEX_ID")
	private Long task_index_id;

	@Column(name="SORTINDEX")
	private Long sortindex;

	@Column(name="COMPAR_DATE")
	private java.util.Date compar_date;

    @Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_CHECK_RULE_MAIN_ID")
	private Long task_check_rule_main_id;

	@Column(name="CHECK_RULE")
	private Long check_rule;

	@Column(name="PERIOD_NUM")
	private Long period_num;

	public T_Task_Goods_Check_Rule() {}

	/************************* getter、setter *****************************/
	public Long getRange_top() {
		return this.range_top;
	}

	public void setRange_top(Long range_top) {
		this.range_top = range_top;
	}

	public Long getRange_bottom() {
		return this.range_bottom;
	}

	public void setRange_bottom(Long range_bottom) {
		this.range_bottom = range_bottom;
	}

	public Long getTask_index_id() {
		return this.task_index_id;
	}

	public void setTask_index_id(Long task_index_id) {
		this.task_index_id = task_index_id;
	}

	public Long getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}

	public java.util.Date getCompar_date() {
		return this.compar_date;
	}

	public void setCompar_date(java.util.Date compar_date) {
		this.compar_date = compar_date;
	}

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

	public Long getTask_check_rule_main_id() {
		return this.task_check_rule_main_id;
	}

	public void setTask_check_rule_main_id(Long task_check_rule_main_id) {
		this.task_check_rule_main_id = task_check_rule_main_id;
	}

	public Long getCheck_rule() {
		return this.check_rule;
	}

	public void setCheck_rule(Long check_rule) {
		this.check_rule = check_rule;
	}

	public Long getPeriod_num() {
		return this.period_num;
	}

	public void setPeriod_num(Long period_num) {
		this.period_num = period_num;
	}

	
}