package com.skytech.project.material.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@DynamicInsert
@Table(name = "T_MATERIAL_INFO")
public class T_Material_Info implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
    @Column(name = "id", nullable = false)
    @NotNull
    private String id;

    @Column(name = "MATERIAL_NAME")
    private String material_name;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDERDEPTID")
    private Long adderdeptid;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "WRITE_TIME")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date write_time;
    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODTIME")
    private Date modtime;

    @Column(name = "MODERDEPTID")
    private Long moderdeptid;

    @Column(name = "CLATTACHSTATUS")
    private Integer clattachstatus;

    @Column(name = "CLATTACHTYPE")
    private Integer clattachtype;

    @Column(name = "CLATTACH_SUB_TYPE")
    private String clattach_sub_type;

    @Column(name = "CLATTACH_REPORT_OBJECT")
    private String clattach_report_object;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "CLATTACH_GRADE_STATUS")
    private Integer clattach_grade_status;

    @Column(name = "WRITE_USER_UNITID")
    private Long write_user_unitid;

    @Column(name = "CLATTACH_VERIFY_STATUS")
    private Integer clattach_verify_status;

    @Column(name = "WRITE_USER_UNITNAME")
    private String write_user_unitname;

    @Column(name = "WRITE_USER_NAME")
    private String write_user_name;

    @Column(name = "CLATTACH_PUBLIC_OBJECT")
    private String clattach_public_object;

    public T_Material_Info() {
    }

    /************************* getter、setter *****************************/
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMaterial_name() {
        return this.material_name;
    }

    public void setMaterial_name(String material_name) {
        this.material_name = material_name;
    }

    public Integer getDelstatus() {
        return this.delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
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

    public Integer getClattachstatus() {
        return this.clattachstatus;
    }

    public void setClattachstatus(Integer clattachstatus) {
        this.clattachstatus = clattachstatus;
    }

    public Integer getClattachtype() {
        return this.clattachtype;
    }

    public void setClattachtype(Integer clattachtype) {
        this.clattachtype = clattachtype;
    }

    public String getClattach_sub_type() {
        return this.clattach_sub_type;
    }

    public void setClattach_sub_type(String clattach_sub_type) {
        this.clattach_sub_type = clattach_sub_type;
    }

    public String getClattach_report_object() {
        return this.clattach_report_object;
    }

    public void setClattach_report_object(String clattach_report_object) {
        this.clattach_report_object = clattach_report_object;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getClattach_grade_status() {
        return this.clattach_grade_status;
    }

    public void setClattach_grade_status(Integer clattach_grade_status) {
        this.clattach_grade_status = clattach_grade_status;
    }

    public Long getWrite_user_unitid() {
        return this.write_user_unitid;
    }

    public void setWrite_user_unitid(Long write_user_unitid) {
        this.write_user_unitid = write_user_unitid;
    }

    public Integer getClattach_verify_status() {
        return this.clattach_verify_status;
    }

    public void setClattach_verify_status(Integer clattach_verify_status) {
        this.clattach_verify_status = clattach_verify_status;
    }

    public String getWrite_user_unitname() {
        return write_user_unitname;
    }

    public void setWrite_user_unitname(String write_user_unitname) {
        this.write_user_unitname = write_user_unitname;
    }

    public String getWrite_user_name() {
        return this.write_user_name;
    }

    public void setWrite_user_name(String write_user_name) {
        this.write_user_name = write_user_name;
    }

    public String getClattach_public_object() {
        return this.clattach_public_object;
    }

    public void setClattach_public_object(String clattach_public_object) {
        this.clattach_public_object = clattach_public_object;
    }

    public Date getWrite_time() {
        return write_time;
    }

    public void setWrite_time(Date write_time) {
        this.write_time = write_time;
    }
}