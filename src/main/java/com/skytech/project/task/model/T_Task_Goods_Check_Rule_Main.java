package com.skytech.project.task.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_GOODS_CHECK_RULE_MAIN")
public class T_Task_Goods_Check_Rule_Main extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="IS_PL_VERSION")
	private Integer is_pl_version;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="IS_LAST_VERSION")
	private Integer is_last_version;

	public T_Task_Goods_Check_Rule_Main() {}

	/************************* getter、setter *****************************/
	public Integer getIs_pl_version() {
		return is_pl_version;
	}

	public void setIs_pl_version(Integer is_pl_version) {
		this.is_pl_version = is_pl_version;
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

	public Integer getIs_last_version() {
		return is_last_version;
	}

	public void setIs_last_version(Integer is_last_version) {
		this.is_last_version = is_last_version;
	}
}