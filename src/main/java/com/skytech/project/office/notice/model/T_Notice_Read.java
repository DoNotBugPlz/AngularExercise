package com.skytech.project.office.notice.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_NOTICE_READ")
public class T_Notice_Read implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
    @Column(name = "id", nullable = false)
    @NotNull
    private String id;

    @Column(name = "NOTICE_ID")
    private String notice_id;

    @Column(name = "USER_ID")
    private Long user_id;
    @Column(name = "IS_READ")
    private Integer is_read;
    @Column(name = "READ_TIME")
    private java.util.Date read_time;

    @Column(name = "NOTICE_OBJECT_ID")
    private String notice_object_id;

    public T_Notice_Read() {
    }

    /************************* getter、setter *****************************/
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNotice_id() {
        return this.notice_id;
    }

    public void setNotice_id(String notice_id) {
        this.notice_id = notice_id;
    }

    public Long getUser_id() {
        return this.user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Integer getIs_read() {
        return this.is_read;
    }

    public void setIs_read(Integer is_read) {
        this.is_read = is_read;
    }

    public java.util.Date getRead_time() {
        return this.read_time;
    }

    public void setRead_time(java.util.Date read_time) {
        this.read_time = read_time;
    }

    public String getNotice_object_id() {
        return notice_object_id;
    }

    public void setNotice_object_id(String notice_object_id) {
        this.notice_object_id = notice_object_id;
    }

}