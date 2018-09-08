package com.skytech.project.exchange.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerQuestionTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_EXCHANGE_INFO")
public class T_Exchange_Info extends PkNubmerQuestionTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "QUESTION_TITLE")
    private String question_title;

    @Column(name = "QUESTION_CONTENT")
    private String question_content;

    @Column(name = "QUESTION_USER_NAME")
    private String question_user_name;

    @Column(name = "QUESTION_USER_ID")
    private Long question_user_id;

    @Column(name = "QUESTION_ADD_TIME")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date question_add_time;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODERDEPTID")
    private Long moderdeptid;

    @Column(name = "MODTIME")
    private java.util.Date modtime;

    @Column(name = "ANSWER_STATUS")
    private Integer answer_status;

    @Column(name = "ANSWER_CONTENT")
    private String answer_content;

    @Column(name = "ANSWER_USER_NAME")
    private String answer_user_name;

    @Column(name = "ANSWER_USER_ID")
    private Long answer_user_id;

    @Column(name = "ANSWER_TIME")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date answer_time;

    @Column(name = "ANSWER_DEPT_NAME")
    private String answer_dept_name;

    @Column(name = "ANSWER_DEPT_ID")
    private Long answer_dept_id;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDERDEPTID")
    private Long adderdeptid;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    public T_Exchange_Info() {
    }

    public Integer getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    /************************* getter、setter *****************************/

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion_title() {
        return this.question_title;
    }

    public void setQuestion_title(String question_title) {
        this.question_title = question_title;
    }

    public String getQuestion_content() {
        return this.question_content;
    }

    public void setQuestion_content(String question_content) {
        this.question_content = question_content;
    }

    public String getQuestion_user_name() {
        return this.question_user_name;
    }

    public void setQuestion_user_name(String question_user_name) {
        this.question_user_name = question_user_name;
    }

    public Long getQuestion_user_id() {
        return this.question_user_id;
    }

    public void setQuestion_user_id(Long question_user_id) {
        this.question_user_id = question_user_id;
    }

    public Date getQuestion_add_time() {
        return this.question_add_time;
    }

    public void setQuestion_add_time(Date question_add_time) {
        this.question_add_time = question_add_time;
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

    public Integer getAnswer_status() {
        return this.answer_status;
    }

    public void setAnswer_status(Integer answer_status) {
        this.answer_status = answer_status;
    }

    public String getAnswer_content() {
        return this.answer_content;
    }

    public void setAnswer_content(String answer_content) {
        this.answer_content = answer_content;
    }

    public String getAnswer_user_name() {
        return this.answer_user_name;
    }

    public void setAnswer_user_name(String answer_user_name) {
        this.answer_user_name = answer_user_name;
    }

    public Long getAnswer_user_id() {
        return answer_user_id;
    }

    public void setAnswer_user_id(Long answer_user_id) {
        this.answer_user_id = answer_user_id;
    }

    public Date getAnswer_time() {
        return this.answer_time;
    }

    public void setAnswer_time(Date answer_time) {
        this.answer_time = answer_time;
    }

    public String getAnswer_dept_name() {
        return this.answer_dept_name;
    }

    public void setAnswer_dept_name(String answer_dept_name) {
        this.answer_dept_name = answer_dept_name;
    }

    public Long getAnswer_dept_id() {
        return this.answer_dept_id;
    }

    public void setAnswer_dept_id(Long answer_dept_id) {
        this.answer_dept_id = answer_dept_id;
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


}