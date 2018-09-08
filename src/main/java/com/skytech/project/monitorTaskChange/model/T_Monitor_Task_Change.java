package com.skytech.project.monitorTaskChange.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MONITOR_TASK_CHANGE")
public class T_Monitor_Task_Change  extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="USER_ID")
	private Long user_id;

	@Column(name="CHANGE_TIME")
	private java.util.Date change_time;

	@Column(name="DEPT_ID")
	private String dept_id;

	@Column(name="CHANGE_TYPE")
	private Integer change_type;

	@Column(name="DESCRIPTION")
	private String description;

	@Column(name="TASK_ID")
	private Long task_id;

	@Column(name="STATUS")
	private Integer status;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="ADDTIME")
	private java.util.Date addtime;

	@Column(name="MODER")
	private Long moder;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="MODTIME")
	private java.util.Date modtime;

	@Column(name="UPLOAD")
	private String upload;

	public T_Monitor_Task_Change() {}

	/************************* getter、setter *****************************/
	@Override
	public Long getId() {
		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Date getChange_time() {
		return change_time;
	}

	public void setChange_time(Date change_time) {
		this.change_time = change_time;
	}

	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public Integer getChange_type() {
		return change_type;
	}

	public void setChange_type(Integer change_type) {
		this.change_type = change_type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getTask_id() {
		return task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getAdder() {
		return adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Long getAdderdeptid() {
		return adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public Date getAddtime() {
		return addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Long getModer() {
		return moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public Long getModerdeptid() {
		return moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	public Date getModtime() {
		return modtime;
	}

	public void setModtime(Date modtime) {
		this.modtime = modtime;
	}

	public String getUpload() {
		return upload;
	}

	public void setUpload(String upload) {
		this.upload = upload;
	}
}