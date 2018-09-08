package com.skytech.project.organisation.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@DynamicInsert
@Table(name = "CF_USER_EXT")
public class Cf_User_Ext implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="SYS_USER_ID")
	private String sys_user_id;

	@Id
	@GeneratedValue(generator="user_id_gen")
	@GenericGenerator( name="user_id_gen", strategy="enhanced-table", //选用加强的table策略，需要在sessionfactory中配置属性hibernate.id.new_generator_mappings 为 true
			parameters = {
					@Parameter( name = "table_name", value = "SYS_MODEL_PK_NUMBER"),//表名
					@Parameter( name = "value_column_name", value = "id_value"), //序列值所在列的列名
					@Parameter( name = "segment_column_name",value = "id_name"), //序列名所在列的列名
					@Parameter( name = "segment_value", value = "user_id"),//序列名
					@Parameter( name = "increment_size", value = "1"), //从1开始
					@Parameter( name = "optimizer",value = "pooled-lo") //配置序列的优化器,避免频繁访问数据库
			})
	private Long id;

	@Column(name="EDUCATION")
	private String education;

	@Column(name="ZW")
	private String zw;

	@Column(name="INSPECT_CERT_NO")
	private String inspect_cert_no;

	@Column(name="INSPECT_CERT_ATTACH_ID")
	private String inspect_cert_attach_id;

	@Column(name="ID_PHOTO_ID")
	private String id_photo_id;

	@Column(name="USER_ADDRESS")
	private String user_address;

	@Column(name="ENTER_POST_DATE")
    @JsonFormat(pattern = "yyyy-MM")
	private java.util.Date enter_post_date;

	@Column(name="USER_TYPE")
	private Integer user_type;

	@Column(name="USER_STATUS")
	private Integer user_status;

	@Column(name="AGE")
	private Integer age;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="DEPT_ID")
	private Long dept_id;

	public Cf_User_Ext() {}



	/************************* getter、setter *****************************/

	public String getSys_user_id() {
		return sys_user_id;
	}

	public void setSys_user_id(String sys_user_id) {
		this.sys_user_id = sys_user_id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public String getEducation() {
		return this.education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getZw() {
		return this.zw;
	}

	public void setZw(String zw) {
		this.zw = zw;
	}

	public String getInspect_cert_no() {
		return this.inspect_cert_no;
	}

	public void setInspect_cert_no(String inspect_cert_no) {
		this.inspect_cert_no = inspect_cert_no;
	}

	public String getInspect_cert_attach_id() {
		return this.inspect_cert_attach_id;
	}

	public void setInspect_cert_attach_id(String inspect_cert_attach_id) {
		this.inspect_cert_attach_id = inspect_cert_attach_id;
	}

	public String getId_photo_id() {
		return this.id_photo_id;
	}

	public void setId_photo_id(String id_photo_id) {
		this.id_photo_id = id_photo_id;
	}

	public String getUser_address() {
		return this.user_address;
	}

	public void setUser_address(String user_address) {
		this.user_address = user_address;
	}

	public java.util.Date getEnter_post_date() {
		return this.enter_post_date;
	}

	public void setEnter_post_date(java.util.Date enter_post_date) {
		this.enter_post_date = enter_post_date;
	}

	public Integer getUser_type() {
		return this.user_type;
	}

	public void setUser_type(Integer user_type) {
		this.user_type = user_type;
	}

	public Integer getUser_status() {
		return this.user_status;
	}

	public void setUser_status(Integer user_status) {
		this.user_status = user_status;
	}

	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Long getDept_id() {
		return dept_id;
	}

	public void setDept_id(Long dept_id) {
		this.dept_id = dept_id;
	}
}