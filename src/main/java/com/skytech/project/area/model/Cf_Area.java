package com.skytech.project.area.model;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @author cr
 * @desc 区划model
 * @Time 2018/8/23 14:36
 */
@Entity
@DynamicInsert
@Table(name = "CF_AREA")
public class Cf_Area extends PkNubmerBusinessTab implements Serializable{

    @Id
    @GenericGenerator(name = "uuid", strategy = "com.skytech.persistence.identifier.generator.COMBGenerator")
    @GeneratedValue(generator = "uuid")
    @Column(name = "ID", nullable = false)
    @NotNull
    private Long id;

    @Column(name="AREA_NO")
    private String area_no;

    @Column(name="AREA_NAME")
    private String area_name;

    @Column(name="DELSTATUS")
    private Integer delstatus;

    @Column(name="PARENTID")
    private Long parentid;

    @Column(name="SORTINDEX")
    private Long sortindex;

    @Column(name="AREA_LEVEL")
    private Integer area_level;

    public Cf_Area() {}

    /************************* getter、setter *****************************/
    public String getArea_no() {
        return this.area_no;
    }

    public void setArea_no(String area_no) {
        this.area_no = area_no;
    }

    public String getArea_name() {
        return this.area_name;
    }

    public void setArea_name(String area_name) {
        this.area_name = area_name;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDelstatus() {
        return this.delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public Long getParentid() {
        return this.parentid;
    }

    public void setParentid(Long parentid) {
        this.parentid = parentid;
    }

    public Long getSortindex() {
        return this.sortindex;
    }

    public void setSortindex(Long sortindex) {
        this.sortindex = sortindex;
    }

    public Integer getArea_level() {
        return this.area_level;
    }

    public void setArea_level(Integer area_level) {
        this.area_level = area_level;
    }

}
