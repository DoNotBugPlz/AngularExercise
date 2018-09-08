package com.skytech.project.flow.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "FLOW_ACTIVITY_USER")
public class Flow_Activity_User  extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull
	private Long id;

	@Column(name="DEF_PROCESS_KEY")
	private String def_process_key;

	@Column(name="DEF_ACTIVITY_KEY")
	private String def_activity_key;

	@Column(name="USER_IDS")
	private String user_ids;

	@Column(name="DEPT_IDS")
	private String dept_ids;

	@Column(name="ROLE_IDS")
	private String role_ids;

	@Column(name="USER_NAMES")
	private String user_names;

	public Flow_Activity_User() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDef_process_key() {
		return this.def_process_key;
	}

	public void setDef_process_key(String def_process_key) {
		this.def_process_key = def_process_key;
	}

	public String getDef_activity_key() {
		return this.def_activity_key;
	}

	public void setDef_activity_key(String def_activity_key) {
		this.def_activity_key = def_activity_key;
	}

	public String getUser_ids() {
		return this.user_ids;
	}

	public void setUser_ids(String user_ids) {
		this.user_ids = user_ids;
	}

	public String getDept_ids() {
		return this.dept_ids;
	}

	public void setDept_ids(String dept_ids) {
		this.dept_ids = dept_ids;
	}

	public String getRole_ids() {
		return this.role_ids;
	}

	public void setRole_ids(String role_ids) {
		this.role_ids = role_ids;
	}

	public String getUser_names() {
		return this.user_names;
	}

	public void setUser_names(String user_names) {
		this.user_names = user_names;
	}



}