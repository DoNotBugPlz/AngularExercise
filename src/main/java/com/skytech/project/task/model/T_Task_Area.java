package com.skytech.project.task.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_AREA")
public class T_Task_Area extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="INDEX_WEIGHT")
	private Long index_weight;

	@Column(name="RETURN_REASON")
	private String return_reason;

    @Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="CONFIRM_STATUS")
	private Integer confirm_status;

	public T_Task_Area() {}

	/************************* getter、setter *****************************/
	public Long getIndex_weight() {
		return index_weight;
	}

	public void setIndex_weight(Long index_weight) {
		this.index_weight = index_weight;
	}

	public String getReturn_reason() {
		return return_reason;
	}

	public void setReturn_reason(String return_reason) {
		this.return_reason = return_reason;
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

	public Long getArea_id() {
		return area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public Integer getConfirm_status() {
		return confirm_status;
	}

	public void setConfirm_status(Integer confirm_status) {
		this.confirm_status = confirm_status;
	}
}