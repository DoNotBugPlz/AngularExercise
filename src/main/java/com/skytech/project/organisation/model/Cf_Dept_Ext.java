package com.skytech.project.organisation.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@DynamicInsert
@Table(name = "CF_DEPT_EXT")
public class Cf_Dept_Ext implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="SYS_DEPT_ID")
	private String sys_dept_id;

	@Id
	@GeneratedValue(generator="dept_id_gen")
	@GenericGenerator( name="dept_id_gen", strategy="enhanced-table", //选用加强的table策略，需要在sessionfactory中配置属性hibernate.id.new_generator_mappings 为 true
			parameters = {
					@org.hibernate.annotations.Parameter( name = "table_name", value = "SYS_MODEL_PK_NUMBER"),//表名
					@org.hibernate.annotations.Parameter( name = "value_column_name", value = "id_value"), //序列值所在列的列名
					@org.hibernate.annotations.Parameter( name = "segment_column_name",value = "id_name"), //序列名所在列的列名
					@org.hibernate.annotations.Parameter( name = "segment_value", value = "dept_id"),//序列名
					@org.hibernate.annotations.Parameter( name = "increment_size", value = "1"), //从1开始
					@org.hibernate.annotations.Parameter( name = "optimizer",value = "pooled-lo") //配置序列的优化器,避免频繁访问数据库
			})
	private Long id;

	@Column(name="ADDRESS")
	private String address;

	@Column(name="ZIP_CODE")
	private String zip_code;

	@Column(name="FAX")
	private String fax;

	@Column(name="LEADER_ID")
	private String leader_id;

	@Column(name="WARNING_MOBILE")
	private String warning_mobile;

	@Column(name="WARNING_TELEPHONE")
	private String warning_telephone;

	@Column(name="CREDIT_CODE")
	private String credit_code;

	@Column(name="UNION_DEPT_NAME")
	private String union_dept_name;

	@Column(name="UPLOADED")
	private String uploaded;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="DEPT_PROPERTIES")
	private Integer dept_properties;

	@Column(name="PERSON_NUM")
	private Integer person_num;

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="IS_INDEPENDENT_OFFICE")
	private Integer is_independent_office;

	public Cf_Dept_Ext() {}



	/************************* getter、setter *****************************/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZip_code() {
		return this.zip_code;
	}

	public void setZip_code(String zip_code) {
		this.zip_code = zip_code;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getLeader_id() {
		return this.leader_id;
	}

	public void setLeader_id(String leader_id) {
		this.leader_id = leader_id;
	}

	public String getWarning_mobile() {
		return this.warning_mobile;
	}

	public void setWarning_mobile(String warning_mobile) {
		this.warning_mobile = warning_mobile;
	}

	public String getWarning_telephone() {
		return this.warning_telephone;
	}

	public void setWarning_telephone(String warning_telephone) {
		this.warning_telephone = warning_telephone;
	}

	public String getCredit_code() {
		return this.credit_code;
	}

	public void setCredit_code(String credit_code) {
		this.credit_code = credit_code;
	}

	public String getUnion_dept_name() {
		return this.union_dept_name;
	}

	public void setUnion_dept_name(String union_dept_name) {
		this.union_dept_name = union_dept_name;
	}

	public String getUploaded() {
		return this.uploaded;
	}

	public void setUploaded(String uploaded) {
		this.uploaded = uploaded;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Integer getDept_properties() {
		return this.dept_properties;
	}

	public void setDept_properties(Integer dept_properties) {
		this.dept_properties = dept_properties;
	}

	public Integer getPerson_num() {
		return this.person_num;
	}

	public void setPerson_num(Integer person_num) {
		this.person_num = person_num;
	}

	public Long getArea_id() {
		return this.area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public Integer getIs_independent_office() {
		return this.is_independent_office;
	}

	public void setIs_independent_office(Integer is_independent_office) {
		this.is_independent_office = is_independent_office;
	}

	public String getSys_dept_id() {
		return sys_dept_id;
	}

	public void setSys_dept_id(String sys_dept_id) {
		this.sys_dept_id = sys_dept_id;
	}
}