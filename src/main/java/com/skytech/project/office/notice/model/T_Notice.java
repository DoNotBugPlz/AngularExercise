package com.skytech.project.office.notice.model;

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
@Table(name = "T_NOTICE")
public class T_Notice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "IS_PUBLIC")
    private Integer is_public;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CONTENT")
    private String content;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
    @Column(name = "id", nullable = false)
    @NotNull
    private String id;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "PUBLIC_TIME")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private java.util.Date public_time;

    @Column(name = "REFERENCE_NO")
    private String reference_no;

    @Column(name = "DESCRIBE")
    private String describe;

    @Column(name = "DATA_TYPE")
    private Integer data_type;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "ADDERDEPTID")
    private Long adderdeptid;

    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODTIME")
    private java.util.Date modtime;

    @Column(name = "MODERDEPTID")
    private Long moderdeptid;
    public T_Notice() {
    }

    /************************* getter、setter *****************************/
    public Integer getIs_public() {
        return is_public;
    }

    public void setIs_public(Integer is_public) {
        this.is_public = is_public;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public Date getPublic_time() {
        return public_time;
    }

    public void setPublic_time(Date public_time) {
        this.public_time = public_time;
    }

    public String getReference_no() {
        return reference_no;
    }

    public void setReference_no(String reference_no) {
        this.reference_no = reference_no;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public Integer getData_type() {
        return data_type;
    }

    public void setData_type(Integer data_type) {
        this.data_type = data_type;
    }

    public Long getAdder() {
        return adder;
    }

    public void setAdder(Long adder) {
        this.adder = adder;
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }

    public Long getAdderdeptid() {
        return adderdeptid;
    }

    public void setAdderdeptid(Long adderdeptid) {
        this.adderdeptid = adderdeptid;
    }

    public Long getModer() {
        return moder;
    }

    public void setModer(Long moder) {
        this.moder = moder;
    }

    public Date getModtime() {
        return modtime;
    }

    public void setModtime(Date modtime) {
        this.modtime = modtime;
    }

    public Long getModerdeptid() {
        return moderdeptid;
    }

    public void setModerdeptid(Long moderdeptid) {
        this.moderdeptid = moderdeptid;
    }
}