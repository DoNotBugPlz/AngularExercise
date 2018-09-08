package com.skytech.project.masterplate.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MASTERPLATE_GOODS")
public class T_Masterplate_Goods extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="TASK_ID")
	private Long task_id;

	@Transient
	private Long id;

	@Column(name="MASTERPLATE_CLASS_ID")
	private Long masterplate_class_id;

	@Column(name="TASK_GOODS_ID")
	private Long task_goods_id;

	@Column(name="DELSTATUS")
	private Integer delstatus;
	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;
	public T_Masterplate_Goods() {}

	public Long getAdder() {
		return adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Date getAddtime() {
		return addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Long getAdderdeptid() {
		return adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public Long getModer() {
		return moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public Date getModtime() {
		return modtime;
	}

	public void setModtime(Date modtime) {
		this.modtime = modtime;
	}

	public Long getModerdeptid() {
		return moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	/************************* getter、setter *****************************/

	public Long getTask_id() {
		return this.task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMasterplate_class_id() {
		return this.masterplate_class_id;
	}

	public void setMasterplate_class_id(Long masterplate_class_id) {
		this.masterplate_class_id = masterplate_class_id;
	}

	public Long getTask_goods_id() {
		return this.task_goods_id;
	}

	public void setTask_goods_id(Long task_goods_id) {
		this.task_goods_id = task_goods_id;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	
}