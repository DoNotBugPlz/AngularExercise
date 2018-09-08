package com.skytech.project.office.notice.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_NOTICE_OBJECT")
public class T_Notice_Object implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="NOTICE_ID")
	private String notice_id;

	@Column(name="DEPT_ID")
	private Long dept_id;

	@Column(name="USER_ID")
	private Long user_id;

	@Column(name="OBJECT_TYPE")
	private Integer object_type;
	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull
	private String id;

	public T_Notice_Object() {}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	/************************* getter、setter *****************************/

	public String getNotice_id() {
		return this.notice_id;
	}

	public void setNotice_id(String notice_id) {
		this.notice_id = notice_id;
	}

	public Long getDept_id() {
		return this.dept_id;
	}

	public void setDept_id(Long dept_id) {
		this.dept_id = dept_id;
	}

	public Long getUser_id() {
		return this.user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Integer getObject_type() {
		return this.object_type;
	}

	public void setObject_type(Integer object_type) {
		this.object_type = object_type;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	
}