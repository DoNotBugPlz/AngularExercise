package com.skytech.project.foreignMaterial.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_FOREIGN_MATERIAL")
public class T_Foreign_Material extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="UPLOAD")
	private String upload;

	@Column(name="ADDER")
	private Long adder;

	@Column(name="ADDERDEPTID")
	private Long adderdeptid;

	@Column(name="ADDTIME")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date addtime;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="id",nullable=false)
	@NotNull
	private Long id;

	@Column(name="FOREIGN_NAME")
	private String foreign_name;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	@Column(name="SPECIFICATION")
	private String specification;

	@Column(name="RECEIVE_DEPT_NAME")
	private String receive_dept_name;

	@Column(name="MODER")
	private Long moder;

	@Column(name="ADDERIP")
	private String adderip;

	@Column(name="MODERIP")
	private String moderip;

	@Column(name="MODTIME")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date modtime;

	@Column(name="MODERDEPTID")
	private Long moderdeptid;

	@Column(name="FOREIGN_MATERIAL_STATUS")
	private Integer foreign_material_status;

	public T_Foreign_Material() {}

	/************************* getter、setter *****************************/
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

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getForeign_name() {
		return this.foreign_name;
	}

	public void setForeign_name(String foreign_name) {
		this.foreign_name = foreign_name;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	public String getSpecification() {
		return this.specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	public String getReceive_dept_name() {
		return this.receive_dept_name;
	}

	public void setReceive_dept_name(String receive_dept_name) {
		this.receive_dept_name = receive_dept_name;
	}

	public Long getModer() {
		return this.moder;
	}

	public void setModer(Long moder) {
		this.moder = moder;
	}

	public String getAdderip() {
		return this.adderip;
	}

	public void setAdderip(String adderip) {
		this.adderip = adderip;
	}

	public String getModerip() {
		return this.moderip;
	}

	public void setModerip(String moderip) {
		this.moderip = moderip;
	}

	public java.util.Date getModtime() {
		return this.modtime;
	}

	public void setModtime(java.util.Date modtime) {
		this.modtime = modtime;
	}

	public Long getModerdeptid() {
		return this.moderdeptid;
	}

	public void setModerdeptid(Long moderdeptid) {
		this.moderdeptid = moderdeptid;
	}

	public Integer getForeign_material_status() {
		return this.foreign_material_status;
	}

	public void setForeign_material_status(Integer foreign_material_status) {
		this.foreign_material_status = foreign_material_status;
	}

	
}