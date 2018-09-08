package com.skytech.project.task.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK_M_SITE_GOODS_LINK")
public class T_Task_M_Site_Goods_Link extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="TASK_M_SITE_ID")
	private Long task_m_site_id;

	@Column(name="M_SITE_ID")
	private Long m_site_id;

	@Column(name="TASK_GOODS_ID")
	private Long task_goods_id;

	@Column(name="GOODS_ID")
	private Long goods_id;

	@Column(name="GOODS_UNIQUE_ID")
	private Long goods_unique_id;

	@Column(name="SORTINDEX")
	private Long sortindex;

	public T_Task_M_Site_Goods_Link() {}

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

	public Long getTask_m_site_id() {
		return this.task_m_site_id;
	}

	public void setTask_m_site_id(Long task_m_site_id) {
		this.task_m_site_id = task_m_site_id;
	}

	public Long getM_site_id() {
		return this.m_site_id;
	}

	public void setM_site_id(Long m_site_id) {
		this.m_site_id = m_site_id;
	}

	public Long getTask_goods_id() {
		return this.task_goods_id;
	}

	public void setTask_goods_id(Long task_goods_id) {
		this.task_goods_id = task_goods_id;
	}

	public Long getGoods_id() {
		return this.goods_id;
	}

	public void setGoods_id(Long goods_id) {
		this.goods_id = goods_id;
	}

	public Long getGoods_unique_id() {
		return this.goods_unique_id;
	}

	public void setGoods_unique_id(Long goods_unique_id) {
		this.goods_unique_id = goods_unique_id;
	}

	public Long getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}

	
}