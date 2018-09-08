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
@Table(name = "T_FINE_USER")
public class T_Fine_User extends PkNubmerQuestionTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "USER_ID")
    private Long user_id;

    @Column(name = "LOGIN_CODE")
    private String login_code;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "IP")
    private String ip;

    @Column(name = "PORT")
    private Integer port;

    @Column(name = "PROJECT_NAME")
    private String project_name;

    @Column(name = "PROJECT_INDEX")
    private String project_index;

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

    public T_Fine_User() {
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

    public String getLogin_code() {
        return this.login_code;
    }

    public void setLogin_code(String login_code) {
        this.login_code = login_code;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIp() {
        return this.ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return this.port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getProject_name() {
        return this.project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getProject_index() {
        return this.project_index;
    }

    public void setProject_index(String project_index) {
        this.project_index = project_index;
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


}