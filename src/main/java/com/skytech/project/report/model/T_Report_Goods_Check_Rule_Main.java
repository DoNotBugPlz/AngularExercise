package com.skytech.project.report.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_GOODS_CHECK_RULE_MAIN")
public class T_Report_Goods_Check_Rule_Main extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_ID")
	private Long report_id;

	@Column(name="TASK_GOODS_CHECK_RULE_MAIN_ID")
	private Long task_goods_check_rule_main_id;

	public T_Report_Goods_Check_Rule_Main() {}

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

	public Long getTask_goods_check_rule_main_id() {
		return this.task_goods_check_rule_main_id;
	}

	public void setTask_goods_check_rule_main_id(Long task_goods_check_rule_main_id) {
		this.task_goods_check_rule_main_id = task_goods_check_rule_main_id;
	}

	
}