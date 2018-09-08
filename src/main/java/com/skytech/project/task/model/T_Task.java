package com.skytech.project.task.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_TASK")
public class T_Task extends PkNubmerBusinessTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "M_FILE_UPLOADED")
    private String m_file_uploaded;

    @Column(name = "TASK_TYPE")
    private Integer task_type;

    @Column(name = "TASK_LEVEL")
    private Integer task_level;

    @Column(name = "TASK_CYCLE")
    private Integer task_cycle;

    @Column(name = "AREA_ID")
    private Long area_id;

    @Column(name = "TASK_STATUS")
    private Integer task_status;

    @Column(name = "IS_PARENT")
    private Integer is_parent;

    @Column(name = "PARENT_ID")
    private Long parent_id;

    @Column(name = "TASK_CLASSES")
    private Integer task_classes;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DELSTATUS")
    private Integer delstatus;
    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDERDEPTID")
    private Long adderdeptid;
    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "MODER")
    private Long moder;

    @Column(name = "MODTIME")
    private java.util.Date modtime;
    @Column(name = "MODERDEPTID")
    private Long moderdeptid;

    public T_Task() {
    }

    /************************* getter、setter *****************************/
    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getM_file_uploaded() {
        return m_file_uploaded;
    }

    public void setM_file_uploaded(String m_file_uploaded) {
        this.m_file_uploaded = m_file_uploaded;
    }

    public Integer getTask_type() {
        return task_type;
    }

    public void setTask_type(Integer task_type) {
        this.task_type = task_type;
    }

    public Integer getTask_level() {
        return task_level;
    }

    public void setTask_level(Integer task_level) {
        this.task_level = task_level;
    }

    public Integer getTask_cycle() {
        return task_cycle;
    }

    public void setTask_cycle(Integer task_cycle) {
        this.task_cycle = task_cycle;
    }

    public Long getArea_id() {
        return area_id;
    }

    public void setArea_id(Long area_id) {
        this.area_id = area_id;
    }

    public Integer getTask_status() {
        return task_status;
    }

    public void setTask_status(Integer task_status) {
        this.task_status = task_status;
    }

    public Integer getIs_parent() {
        return is_parent;
    }

    public void setIs_parent(Integer is_parent) {
        this.is_parent = is_parent;
    }

    public Long getParent_id() {
        return parent_id;
    }

    public void setParent_id(Long parent_id) {
        this.parent_id = parent_id;
    }

    public Integer getTask_classes() {
        return task_classes;
    }

    public void setTask_classes(Integer task_classes) {
        this.task_classes = task_classes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public Long getAdder() {
        return adder;
    }

    public void setAdder(Long adder) {
        this.adder = adder;
    }

    public Long getAdderdeptid() {
        return adderdeptid;
    }

    public void setAdderdeptid(Long adderdeptid) {
        this.adderdeptid = adderdeptid;
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
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