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
@Table(name = "T_FINE_COLLECT")
public class T_Fine_Collect extends PkNubmerQuestionTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "FINE_CONFIG_ID")
    private Long fine_config_id;

    @Column(name = "USER_ID")
    private Long user_id;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODTIME")
    private java.util.Date modtime;

    public T_Fine_Collect() {
    }

    /************************* getter、setter *****************************/
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFine_config_id() {
        return this.fine_config_id;
    }

    public void setFine_config_id(Long fine_config_id) {
        this.fine_config_id = fine_config_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
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


}