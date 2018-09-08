package com.skytech.project.task.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_M_SITE")
public class T_Task_M_Site extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="M_SITE_ID")
	private Long m_site_id;

	@Column(name="RETURN_REASON")
	private String return_reason;

	@Column(name="CONFIRM_STATUS")
	private Integer confirm_status;

	@Column(name="INDEX_WEIGHT")
	private Long index_weight;

	public T_Task_M_Site() {}

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

	public Long getM_site_id() {
		return this.m_site_id;
	}

	public void setM_site_id(Long m_site_id) {
		this.m_site_id = m_site_id;
	}

	public String getReturn_reason() {
		return this.return_reason;
	}

	public void setReturn_reason(String return_reason) {
		this.return_reason = return_reason;
	}

	public Integer getConfirm_status() {
		return this.confirm_status;
	}

	public void setConfirm_status(Integer confirm_status) {
		this.confirm_status = confirm_status;
	}

	public Long getIndex_weight() {
		return this.index_weight;
	}

	public void setIndex_weight(Long index_weight) {
		this.index_weight = index_weight;
	}

	
}