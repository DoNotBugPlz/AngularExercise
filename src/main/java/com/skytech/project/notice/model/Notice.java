package com.skytech.project.notice.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;


@Entity
@DynamicInsert
@Table(name="NOTICE")
public class Notice implements Serializable {

    private static final long serialVersionUID = 1L;

    /*
    @SequenceGenerator(name="sequence",sequenceName="NOTICESEQUENCES",allocationSize=1)
	@GeneratedValue(strategy = GenerationType.AUTO,generator="sequence")
    @GenericGenerator(name = "uuid",strategy="uuid")
    @GeneratedValue(generator="uuid")
    */
    @Id
    @GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
    @GeneratedValue(generator = "uuid")
    @Column(name = "ID", nullable = false)
    @NotNull
    private String id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "SORTINDEX")
    private Long sortindex;

    @Column(name = "RECEIVER_IDS")
    private String receiver_ids;

    @Column(name = "RECEIVER_NAMES")
    private String receiver_names;

    @Column(name = "IS_PUBLIC")
    @Max(1)
    private Integer is_public;

    @Max(1)
    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "ADDER")
    private String adder;

    @Column(name = "ADDER_DEPTID")
    private String adder_deptid;

    @Column(name = "ADD_TIME")
    private Date add_time;


    public Notice() {
        //default constructor
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getReceiver_ids() {
        return receiver_ids;
    }

    public void setReceiver_ids(String receiver_ids) {
        this.receiver_ids = receiver_ids;
    }

    public String getReceiver_names() {
        return receiver_names;
    }

    public void setReceiver_names(String receiver_names) {
        this.receiver_names = receiver_names;
    }

    public Integer getIs_public() {
        return is_public;
    }

    public void setIs_public(Integer is_public) {
        this.is_public = is_public;
    }

    public Integer getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public String getAdder_deptid() {
        return adder_deptid;
    }

    public void setAdder_deptid(String adder_deptid) {
        this.adder_deptid = adder_deptid;
    }

    public Date getAdd_time() {
        return add_time;
    }

    public void setAdd_time(Date add_time) {
        this.add_time = add_time;
    }

    public String getAdder() {
        return adder;
    }

    public void setAdder(String adder) {
        this.adder = adder;
    }

    public Long getSortindex() {
        return sortindex;
    }

    public void setSortindex(Long sortindex) {
        this.sortindex = sortindex;
    }
}
