package com.skytech.project.organisation.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "CF_M_SITE")
public class Cf_M_Site extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="MONITOR_SITE_NO")
	private String monitor_site_no;

	@Column(name="NAME")
	private String name;

	@Column(name="SIMPLE_NAME")
	private String simple_name;

	@Column(name="LIST_TYPE")
	private String list_type;

	@Column(name="LIST_DATE")
	private java.util.Date list_date;

	@Column(name="MONITOR_SITE_ADDRESS")
	private String monitor_site_address;

	@Column(name="ZIP_CODE")
	private String zip_code;

	@Column(name="FAX")
	private String fax;

	@Column(name="UPLOADED")
	private String uploaded;

	@Column(name="JOIN_DATE")
	private java.util.Date join_date;

	@Column(name="EXIT_DATE")
	private java.util.Date exit_date;

	@Column(name="LEADER_NAME")
	private String leader_name;

	@Column(name="LEADER_PHONE")
	private String leader_phone;

	@Column(name="BUS_SCOPE")
	private String bus_scope;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="REPORT_TYPE")
	private Integer report_type;

	@Column(name="AREA_ID")
	private Long area_id;

	@Column(name="UNIT_PROPERTIES")
	private Integer unit_properties;

	@Column(name="UNIT_TYPE")
	private Integer unit_type;

	@Column(name="SORTINDEX")
	private Long sortindex;

	@Column(name="MONITOR_SITE_TYPE")
	private Integer monitor_site_type;

	@Column(name="PAR_SHOP_TYPE")
	private Integer par_shop_type;

	@Column(name="PAR_SHOP_STATUS")
	private Integer par_shop_status;

	@Column(name="DEPT_ID")
	private Long dept_id;

	public Cf_M_Site() {}

	/************************* getter、setter *****************************/
	public String getMonitor_site_no() {
		return this.monitor_site_no;
	}

	public void setMonitor_site_no(String monitor_site_no) {
		this.monitor_site_no = monitor_site_no;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSimple_name() {
		return this.simple_name;
	}

	public void setSimple_name(String simple_name) {
		this.simple_name = simple_name;
	}

	public String getList_type() {
		return this.list_type;
	}

	public void setList_type(String list_type) {
		this.list_type = list_type;
	}

	public java.util.Date getList_date() {
		return this.list_date;
	}

	public void setList_date(java.util.Date list_date) {
		this.list_date = list_date;
	}

	public String getMonitor_site_address() {
		return this.monitor_site_address;
	}

	public void setMonitor_site_address(String monitor_site_address) {
		this.monitor_site_address = monitor_site_address;
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

	public String getUploaded() {
		return this.uploaded;
	}

	public void setUploaded(String uploaded) {
		this.uploaded = uploaded;
	}

	public java.util.Date getJoin_date() {
		return this.join_date;
	}

	public void setJoin_date(java.util.Date join_date) {
		this.join_date = join_date;
	}

	public java.util.Date getExit_date() {
		return this.exit_date;
	}

	public void setExit_date(java.util.Date exit_date) {
		this.exit_date = exit_date;
	}

	public String getLeader_name() {
		return this.leader_name;
	}

	public void setLeader_name(String leader_name) {
		this.leader_name = leader_name;
	}

	public String getLeader_phone() {
		return this.leader_phone;
	}

	public void setLeader_phone(String leader_phone) {
		this.leader_phone = leader_phone;
	}

	public String getBus_scope() {
		return this.bus_scope;
	}

	public void setBus_scope(String bus_scope) {
		this.bus_scope = bus_scope;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public Integer getReport_type() {
		return report_type;
	}

	public void setReport_type(Integer report_type) {
		this.report_type = report_type;
	}

	public Long getArea_id() {
		return this.area_id;
	}

	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}

	public Integer getUnit_properties() {
		return unit_properties;
	}

	public void setUnit_properties(Integer unit_properties) {
		this.unit_properties = unit_properties;
	}

	public Integer getUnit_type() {
		return unit_type;
	}

	public void setUnit_type(Integer unit_type) {
		this.unit_type = unit_type;
	}

	public Long getSortindex() {
		return this.sortindex;
	}

	public void setSortindex(Long sortindex) {
		this.sortindex = sortindex;
	}


	public Integer getPar_shop_type() {
		return par_shop_type;
	}

	public void setPar_shop_type(Integer par_shop_type) {
		this.par_shop_type = par_shop_type;
	}

	public Long getDept_id() {
		return this.dept_id;
	}

	public void setDept_id(Long dept_id) {
		this.dept_id = dept_id;
	}

	public Integer getMonitor_site_type() {
		return monitor_site_type;
	}

	public void setMonitor_site_type(Integer monitor_site_type) {
		this.monitor_site_type = monitor_site_type;
	}

	public Integer getPar_shop_status() {
		return par_shop_status;
	}

	public void setPar_shop_status(Integer par_shop_status) {
		this.par_shop_status = par_shop_status;
	}
}