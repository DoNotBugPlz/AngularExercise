package com.skytech.flow.opinion.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by fengxiangxiang on 2017/8/16.
 * 审核意见业务模型
 */
@Entity
@DynamicInsert
@Table(name = "act_hi_opinion")
public class Opinion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
    @GeneratedValue(generator = "uuid")
    @Column(name = "ID", nullable = false)
    @NotNull
    private String id;

    @Column(name = "LOGINNAME")
    private String loginName;

    @Column(name = "NAME")
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "TIME")
    private Date time;

    @Column(name = "TASK_ID")
    private String taskId;

    @Column(name = "PROC_INST_ID")
    private String processInstanceId;

    @Column(name = "MESSAGE")
    private String message;

    @Column(name = "FIELD")
    private String field;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
