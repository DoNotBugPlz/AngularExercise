/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model;

import com.skytech.config.pk_model.PkNubmerQuestionTab;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;

@Entity
@DynamicInsert
@Table(name = "T_FINE_MODEL_PARAMS")
public class T_Fine_Model_Params extends PkNubmerQuestionTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "TASK_ID")
    private Long task_id;

    @Column(name = "TASK_GOODS_ID")
    private String task_goods_id;

    @Column(name = "FINE_CONFIG_ID")
    private Long fine_config_id;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "MODTIME")
    private java.util.Date modtime;

    @Column(name = "ADDERDEPTID")
    private Long adderdeptid;

    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODERDEPTID")
    private Long moderdeptid;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "TASK_INDEX_ID")
    private String task_index_id;

    @Column(name = "TASK_M_SITE_ID")
    private String task_m_site_id;

    @Column(name = "PARAMS_STATUS")
    private Integer params_status;

    @Column(name = "USER_ID")
    private Long user_id;

    public T_Fine_Model_Params() {
    }

    /************************* getter、setter *****************************/
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTask_id() {
        return this.task_id;
    }

    public void setTask_id(Long task_id) {
        this.task_id = task_id;
    }

    public String getTask_goods_id() {
        return this.task_goods_id;
    }

    public void setTask_goods_id(String task_goods_id) {
        this.task_goods_id = task_goods_id;
    }

    public Long getFine_config_id() {
        return this.fine_config_id;
    }

    public void setFine_config_id(Long fine_config_id) {
        this.fine_config_id = fine_config_id;
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

    public java.util.Date getModtime() {
        return this.modtime;
    }

    public void setModtime(java.util.Date modtime) {
        this.modtime = modtime;
    }

    public Long getAdderdeptid() {
        return this.adderdeptid;
    }

    public void setAdderdeptid(Long adderdeptid) {
        this.adderdeptid = adderdeptid;
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

    public Integer getDelstatus() {
        return this.delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public String getTask_index_id() {
        return this.task_index_id;
    }

    public void setTask_index_id(String task_index_id) {
        this.task_index_id = task_index_id;
    }

    public String getTask_m_site_id() {
        return this.task_m_site_id;
    }

    public void setTask_m_site_id(String task_m_site_id) {
        this.task_m_site_id = task_m_site_id;
    }

    public Integer getParams_status() {
        return this.params_status;
    }

    public void setParams_status(Integer params_status) {
        this.params_status = params_status;
    }

    public Long getUser_id() {
        return this.user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }


}