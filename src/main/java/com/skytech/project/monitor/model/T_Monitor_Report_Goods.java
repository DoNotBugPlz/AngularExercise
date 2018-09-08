package com.skytech.project.monitor.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MONITOR_REPORT_GOODS")
public class T_Monitor_Report_Goods extends PkNubmerBusinessTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "COMPARE_LAST_OWN")
    private String compare_last_own;

    @Column(name = "ADDTIME")
    private java.util.Date addtime;

    @Column(name = "ADDER")
    private Long adder;

    @Column(name = "ADDERDEPTID")
    private Long adderdeptid;
    @Column(name = "DELSTATUS")
    private Integer delstatus;
    @Transient
    private Long id;

    @Column(name = "MONITOR_REPORT_CLASS_ID")
    private Long monitor_report_class_id;

    @Column(name = "GOODS_ID")
    private Long goods_id;

    @Column(name = "GOODS_NAME")
    private String goods_name;

    @Column(name = "GOODS_SPEC")
    private String goods_spec;

    @Column(name = "GOODS_MEASUREMENT_UNIT")
    private String goods_measurement_unit;

    @Column(name = "PROVINCE_PRICE_AVG")
    private String province_price_avg;

    @Column(name = "COMPARE_LAST")
    private String compare_last;

    @Column(name = "PRICE_CHANGE_CONTENT")
    private String price_change_content;

    @Column(name = "SORTINDEX")
    private Integer sortindex;

    public T_Monitor_Report_Goods() {
    }

    /************************* getter、setter *****************************/
    public String getCompare_last_own() {
        return this.compare_last_own;
    }

    public void setCompare_last_own(String compare_last_own) {
        this.compare_last_own = compare_last_own;
    }

    public java.util.Date getAddtime() {
        return this.addtime;
    }

    public void setAddtime(java.util.Date addtime) {
        this.addtime = addtime;
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

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMonitor_report_class_id() {
        return this.monitor_report_class_id;
    }

    public void setMonitor_report_class_id(Long monitor_report_class_id) {
        this.monitor_report_class_id = monitor_report_class_id;
    }

    public Long getGoods_id() {
        return this.goods_id;
    }

    public void setGoods_id(Long goods_id) {
        this.goods_id = goods_id;
    }

    public String getGoods_name() {
        return this.goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public String getGoods_spec() {
        return this.goods_spec;
    }

    public void setGoods_spec(String goods_spec) {
        this.goods_spec = goods_spec;
    }

    public String getGoods_measurement_unit() {
        return this.goods_measurement_unit;
    }

    public void setGoods_measurement_unit(String goods_measurement_unit) {
        this.goods_measurement_unit = goods_measurement_unit;
    }

    public String getProvince_price_avg() {
        return this.province_price_avg;
    }

    public void setProvince_price_avg(String province_price_avg) {
        this.province_price_avg = province_price_avg;
    }

    public String getCompare_last() {
        return this.compare_last;
    }

    public void setCompare_last(String compare_last) {
        this.compare_last = compare_last;
    }

    public String getPrice_change_content() {
        return this.price_change_content;
    }

    public void setPrice_change_content(String price_change_content) {
        this.price_change_content = price_change_content;
    }

    public Integer getSortindex() {
        return this.sortindex;
    }

    public void setSortindex(Integer sortindex) {
        this.sortindex = sortindex;
    }


}