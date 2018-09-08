package com.skytech.project.material.model;

import java.io.Serializable;
import java.util.Date;
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
@Table(name = "T_MATERIAL_SUBMISSION")
public class T_Material_Submission implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="IS_READ")
	private Integer is_read;

	@Column(name="STATUS")
	private Integer status;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull
	private String id;

	@Column(name="MATERIAL_ID")
	private String material_id;

	@Column(name="SUBMISSIONDEPTID")
	private Long submissiondeptid;

	@Column(name="SUBMISSION_USER_ID")
	private Long submission_user_id;

	@Column(name="SUBMISSION_TIME")
	private java.util.Date submission_time;

	@Column(name="SUBMISSIONTYPE")
	private String submissiontype;

	@Column(name="SUBMISSIONOBJECT")
	private String submissionobject;

	public T_Material_Submission() {}

	/************************* getter、setter *****************************/
	public Integer getIs_read() {
		return is_read;
	}

	public void setIs_read(Integer is_read) {
		this.is_read = is_read;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMaterial_id() {
		return material_id;
	}

	public void setMaterial_id(String material_id) {
		this.material_id = material_id;
	}

	public Long getSubmissiondeptid() {
		return submissiondeptid;
	}

	public void setSubmissiondeptid(Long submissiondeptid) {
		this.submissiondeptid = submissiondeptid;
	}

	public Long getSubmission_user_name() {
		return submission_user_id;
	}

	public void setSubmission_user_name(Long submission_user_name) {
		this.submission_user_id = submission_user_name;
	}

	public Date getSubmission_time() {
		return submission_time;
	}

	public void setSubmission_time(Date submission_time) {
		this.submission_time = submission_time;
	}

	public String getSubmissiontype() {
		return submissiontype;
	}

	public void setSubmissiontype(String submissiontype) {
		this.submissiontype = submissiontype;
	}

	public String getSubmissionobject() {
		return submissionobject;
	}

	public void setSubmissionobject(String submissionobject) {
		this.submissionobject = submissionobject;
	}
}