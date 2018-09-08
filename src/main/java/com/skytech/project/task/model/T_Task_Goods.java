package com.skytech.project.task.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_GOODS")
public class T_Task_Goods extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="GOODS_UNIQUE_ID")
	private Long goods_unique_id;

	@Column(name="GOODS_ID")
	private Long goods_id;

	@Column(name="SORTINDEX")
	private Long sortindex;

	@Column(name="TASK_CHECK_RULE_MAIN_ID")
	private Long task_check_rule_main_id;

	public T_Task_Goods() {}

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

	public Long getTask_id() {
		return this.task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
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

	public Long getTask_check_rule_main_id() {
		return this.task_check_rule_main_id;
	}

	public void setTask_check_rule_main_id(Long task_check_rule_main_id) {
		this.task_check_rule_main_id = task_check_rule_main_id;
	}

	
}