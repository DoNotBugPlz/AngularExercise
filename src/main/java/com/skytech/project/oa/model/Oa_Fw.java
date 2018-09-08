package com.skytech.project.oa.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "OA_FW")
public class Oa_Fw extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="FILE_TYPE")
	private Integer file_type;

	@Column(name="FW_NAME")
	private String fw_name;

	@Column(name="MAIN_SEND_NAME")
	private String main_send_name;

	@Column(name="COPY_SEND_NAME")
	private String copy_send_name;

	@Column(name="WH")
	private String wh;

	@Column(name="EMERGENCY")
	private Integer emergency;

	@Column(name="CB_DRAFTER")
	private String cb_drafter;

	@Column(name="WH_ID")
	private Long wh_id;

	@Column(name="PRINT_NAME")
	private String print_name;

	@Column(name="PRINT_NUM")
	private Integer print_num;

	@Column(name="OPEN_RANGE")
	private Integer open_range;

	@Column(name="ISSUE_DATE")
	private java.util.Date issue_date;

	@Column(name="UPLOAD_ZW")
	private String upload_zw;

	@Column(name="UPLOAD")
	private String upload;

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

	public Oa_Fw() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFw_name() {
		return this.fw_name;
	}

	public void setFw_name(String fw_name) {
		this.fw_name = fw_name;
	}

	public String getMain_send_name() {
		return this.main_send_name;
	}

	public void setMain_send_name(String main_send_name) {
		this.main_send_name = main_send_name;
	}

	public String getCopy_send_name() {
		return this.copy_send_name;
	}

	public void setCopy_send_name(String copy_send_name) {
		this.copy_send_name = copy_send_name;
	}

	public String getWh() {
		return this.wh;
	}

	public void setWh(String wh) {
		this.wh = wh;
	}

	public String getCb_drafter() {
		return this.cb_drafter;
	}

	public void setCb_drafter(String cb_drafter) {
		this.cb_drafter = cb_drafter;
	}

	public Long getWh_id() {
		return this.wh_id;
	}

	public void setWh_id(Long wh_id) {
		this.wh_id = wh_id;
	}

	public String getPrint_name() {
		return this.print_name;
	}

	public void setPrint_name(String print_name) {
		this.print_name = print_name;
	}

	public Integer getFile_type() {
		return file_type;
	}

	public void setFile_type(Integer file_type) {
		this.file_type = file_type;
	}

	public Integer getEmergency() {
		return emergency;
	}

	public void setEmergency(Integer emergency) {
		this.emergency = emergency;
	}

	public Integer getPrint_num() {
		return print_num;
	}

	public void setPrint_num(Integer print_num) {
		this.print_num = print_num;
	}

	public Integer getOpen_range() {
		return open_range;
	}

	public void setOpen_range(Integer open_range) {
		this.open_range = open_range;
	}

	public java.util.Date getIssue_date() {
		return this.issue_date;
	}

	public void setIssue_date(java.util.Date issue_date) {
		this.issue_date = issue_date;
	}

	public String getUpload_zw() {
		return this.upload_zw;
	}

	public void setUpload_zw(String upload_zw) {
		this.upload_zw = upload_zw;
	}

	public String getUpload() {
		return this.upload;
	}

	public void setUpload(String upload) {
		this.upload = upload;
	}

	public Long getAdder() {
		return this.adder;
	}

	public void setAdder(Long adder) {
		this.adder = adder;
	}

	public Long getAdderdeptid() {
		return this.adderdeptid;
	}

	public void setAdderdeptid(Long adderdeptid) {
		this.adderdeptid = adderdeptid;
	}

	public java.util.Date getAddtime() {
		return this.addtime;
	}

	public void setAddtime(java.util.Date addtime) {
		this.addtime = addtime;
	}

	public Long getModer() {
		return this.moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public Long getModerdeptid() {
		return this.moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	public java.util.Date getModtime() {
		return this.modtime;
	}

	public void setModtime(java.util.Date modtime) {
		this.modtime = modtime;
	}

	
}