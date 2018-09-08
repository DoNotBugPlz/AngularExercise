/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerQuestionTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_FINE_CONFIG")
public class T_Fine_Config extends PkNubmerQuestionTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "USER_ID")
    private Long user_id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DATA_TYPE")
    private Integer data_type;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODTIME")
    private java.util.Date modtime;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "REPORT_ID")
    private String report_id;

    @Column(name = "CREATEBY")
    private String createBy;

    @Column(name = "BUILD_URL")
    private String build_url;

    public T_Fine_Config() {
    }

    /************************* getter、setter *****************************/
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getData_type() {
        return this.data_type;
    }

    public void setData_type(Integer data_type) {
        this.data_type = data_type;
    }

    public Long getAdder() {
        return this.adder;
    }

    public void setAdder(Long adder) {
        this.adder = adder;
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

    public Integer getDelstatus() {
        return this.delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public String getReport_id() {
        return this.report_id;
    }

    public void setReport_id(String report_id) {
        this.report_id = report_id;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getBuild_url() {
        return this.build_url;
    }

    public void setBuild_url(String build_url) {
        this.build_url = build_url;
    }


}