package com.skytech.platform.authority.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@DynamicInsert
@Table(name = "SYS_USER_ROLES")
public class Sys_User_Roles implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="USER_ID")
	private String user_id;

	@Column(name="ROLE_ID")
	private String role_id;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="ID",nullable=false)
	@NotNull
	private String id;

	public Sys_User_Roles() {}

	/************************* getter、setter *****************************/
	public String getUser_id() {
		return this.user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getRole_id() {
		return this.role_id;
	}

	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}