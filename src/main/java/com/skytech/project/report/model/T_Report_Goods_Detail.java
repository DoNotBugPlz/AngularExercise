package com.skytech.project.report.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_REPORT_GOODS_DETAIL")
public class T_Report_Goods_Detail extends PkNubmerBusinessTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "PRICE_DATE")
    private java.util.Date price_date;

    @Column(name = "INDEX_NUM_001")
    private BigDecimal index_num_001;

    @Column(name = "INDEX_NUM_002")
    private BigDecimal index_num_002;
    @Column(name = "INDEX_NUM_003")
    private BigDecimal index_num_003;

    @Column(name = "INDEX_NUM_004")
    private BigDecimal index_num_004;

    @Column(name = "INDEX_NUM_005")
    private BigDecimal index_num_005;

    @Column(name = "INDEX_NUM_006")
    private BigDecimal index_num_006;

    @Column(name = "INDEX_NUM_007")
    private BigDecimal index_num_007;

    @Column(name = "INDEX_NUM_008")
    private BigDecimal index_num_008;

    @Column(name = "INDEX_NUM_009")
    private BigDecimal index_num_009;

    @Column(name = "INDEX_NUM_010")
    private BigDecimal index_num_010;

    @Column(name = "INDEX_NUM_011")
    private BigDecimal index_num_011;

    @Column(name = "INDEX_NUM_012")
    private BigDecimal index_num_012;

    @Column(name = "INDEX_NUM_013")
    private BigDecimal index_num_013;

    @Column(name = "INDEX_NUM_014")
    private BigDecimal index_num_014;

    @Column(name = "INDEX_NUM_015")
    private BigDecimal index_num_015;

    @Column(name = "INDEX_NUM_016")
    private BigDecimal index_num_016;

    @Column(name = "INDEX_NUM_017")
    private BigDecimal index_num_017;

    @Column(name = "INDEX_NUM_018")
    private BigDecimal index_num_018;

    @Column(name = "INDEX_NUM_019")
    private BigDecimal index_num_019;

    @Column(name = "INDEX_NUM_020")
    private BigDecimal index_num_020;

    @Column(name = "INDEX_NUM_021")
    private BigDecimal index_num_021;

    @Column(name = "INDEX_NUM_022")
    private BigDecimal index_num_022;

    @Column(name = "INDEX_NUM_023")
    private BigDecimal index_num_023;

    @Column(name = "INDEX_NUM_024")
    private BigDecimal index_num_024;

    @Column(name = "INDEX_NUM_025")
    private BigDecimal index_num_025;

    @Column(name = "INDEX_NUM_026")
    private BigDecimal index_num_026;

    @Column(name = "INDEX_NUM_027")
    private BigDecimal index_num_027;

    @Column(name = "INDEX_NUM_028")
    private BigDecimal index_num_028;

    @Column(name = "INDEX_NUM_029")
    private BigDecimal index_num_029;

    @Column(name = "INDEX_NUM_030")
    private BigDecimal index_num_030;

    @Column(name = "INDEX_NUM_031")
    private BigDecimal index_num_031;

    @Column(name = "INDEX_NUM_032")
    private BigDecimal index_num_032;

    @Column(name = "INDEX_NUM_033")
    private BigDecimal index_num_033;

    @Column(name = "INDEX_NUM_034")
    private BigDecimal index_num_034;

    @Column(name = "INDEX_NUM_035")
    private BigDecimal index_num_035;

    @Column(name = "INDEX_NUM_036")
    private BigDecimal index_num_036;

    @Column(name = "INDEX_NUM_037")
    private BigDecimal index_num_037;

    @Column(name = "INDEX_NUM_038")
    private BigDecimal index_num_038;

    @Column(name = "INDEX_NUM_039")
    private BigDecimal index_num_039;

    @Column(name = "INDEX_NUM_040")
    private BigDecimal index_num_040;

    @Column(name = "INDEX_STR_001")
    private String index_str_001;

    @Column(name = "INDEX_STR_002")
    private String index_str_002;

    @Column(name = "INDEX_STR_003")
    private String index_str_003;

    @Column(name = "INDEX_STR_004")
    private String index_str_004;

    @Column(name = "INDEX_STR_005")
    private String index_str_005;

    @Column(name = "INDEX_STR_006")
    private String index_str_006;

    @Column(name = "INDEX_STR_007")
    private String index_str_007;

    @Column(name = "INDEX_STR_008")
    private String index_str_008;

    @Transient
    private Long id;

    @Column(name = "GOODS_CLASSES")
    private Integer goods_classes;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "GOODS_UNIQUE_ID")
    private Long goods_unique_id;

    @Column(name = "GOODS_ID")
    private Long goods_id;

    @Column(name = "REPORT_M_SITE")
    private Long report_m_site;

    public T_Report_Goods_Detail() {
    }

    /************************* getter、setter *****************************/
    public Date getPrice_date() {
        return price_date;
    }

    public void setPrice_date(Date price_date) {
        this.price_date = price_date;
    }

    public BigDecimal getIndex_num_001() {
        return index_num_001;
    }

    public void setIndex_num_001(BigDecimal index_num_001) {
        this.index_num_001 = index_num_001;
    }

    public BigDecimal getIndex_num_002() {
        return index_num_002;
    }

    public void setIndex_num_002(BigDecimal index_num_002) {
        this.index_num_002 = index_num_002;
    }

    public BigDecimal getIndex_num_003() {
        return index_num_003;
    }

    public void setIndex_num_003(BigDecimal index_num_003) {
        this.index_num_003 = index_num_003;
    }

    public BigDecimal getIndex_num_004() {
        return index_num_004;
    }

    public void setIndex_num_004(BigDecimal index_num_004) {
        this.index_num_004 = index_num_004;
    }

    public BigDecimal getIndex_num_005() {
        return index_num_005;
    }

    public void setIndex_num_005(BigDecimal index_num_005) {
        this.index_num_005 = index_num_005;
    }

    public BigDecimal getIndex_num_006() {
        return index_num_006;
    }

    public void setIndex_num_006(BigDecimal index_num_006) {
        this.index_num_006 = index_num_006;
    }

    public BigDecimal getIndex_num_007() {
        return index_num_007;
    }

    public void setIndex_num_007(BigDecimal index_num_007) {
        this.index_num_007 = index_num_007;
    }

    public BigDecimal getIndex_num_008() {
        return index_num_008;
    }

    public void setIndex_num_008(BigDecimal index_num_008) {
        this.index_num_008 = index_num_008;
    }

    public BigDecimal getIndex_num_009() {
        return index_num_009;
    }

    public void setIndex_num_009(BigDecimal index_num_009) {
        this.index_num_009 = index_num_009;
    }

    public BigDecimal getIndex_num_010() {
        return index_num_010;
    }

    public void setIndex_num_010(BigDecimal index_num_010) {
        this.index_num_010 = index_num_010;
    }

    public BigDecimal getIndex_num_011() {
        return index_num_011;
    }

    public void setIndex_num_011(BigDecimal index_num_011) {
        this.index_num_011 = index_num_011;
    }

    public BigDecimal getIndex_num_012() {
        return index_num_012;
    }

    public void setIndex_num_012(BigDecimal index_num_012) {
        this.index_num_012 = index_num_012;
    }

    public BigDecimal getIndex_num_013() {
        return index_num_013;
    }

    public void setIndex_num_013(BigDecimal index_num_013) {
        this.index_num_013 = index_num_013;
    }

    public BigDecimal getIndex_num_014() {
        return index_num_014;
    }

    public void setIndex_num_014(BigDecimal index_num_014) {
        this.index_num_014 = index_num_014;
    }

    public BigDecimal getIndex_num_015() {
        return index_num_015;
    }

    public void setIndex_num_015(BigDecimal index_num_015) {
        this.index_num_015 = index_num_015;
    }

    public BigDecimal getIndex_num_016() {
        return index_num_016;
    }

    public void setIndex_num_016(BigDecimal index_num_016) {
        this.index_num_016 = index_num_016;
    }

    public BigDecimal getIndex_num_017() {
        return index_num_017;
    }

    public void setIndex_num_017(BigDecimal index_num_017) {
        this.index_num_017 = index_num_017;
    }

    public BigDecimal getIndex_num_018() {
        return index_num_018;
    }

    public void setIndex_num_018(BigDecimal index_num_018) {
        this.index_num_018 = index_num_018;
    }

    public BigDecimal getIndex_num_019() {
        return index_num_019;
    }

    public void setIndex_num_019(BigDecimal index_num_019) {
        this.index_num_019 = index_num_019;
    }

    public BigDecimal getIndex_num_020() {
        return index_num_020;
    }

    public void setIndex_num_020(BigDecimal index_num_020) {
        this.index_num_020 = index_num_020;
    }

    public BigDecimal getIndex_num_021() {
        return index_num_021;
    }

    public void setIndex_num_021(BigDecimal index_num_021) {
        this.index_num_021 = index_num_021;
    }

    public BigDecimal getIndex_num_022() {
        return index_num_022;
    }

    public void setIndex_num_022(BigDecimal index_num_022) {
        this.index_num_022 = index_num_022;
    }

    public BigDecimal getIndex_num_023() {
        return index_num_023;
    }

    public void setIndex_num_023(BigDecimal index_num_023) {
        this.index_num_023 = index_num_023;
    }

    public BigDecimal getIndex_num_024() {
        return index_num_024;
    }

    public void setIndex_num_024(BigDecimal index_num_024) {
        this.index_num_024 = index_num_024;
    }

    public BigDecimal getIndex_num_025() {
        return index_num_025;
    }

    public void setIndex_num_025(BigDecimal index_num_025) {
        this.index_num_025 = index_num_025;
    }

    public BigDecimal getIndex_num_026() {
        return index_num_026;
    }

    public void setIndex_num_026(BigDecimal index_num_026) {
        this.index_num_026 = index_num_026;
    }

    public BigDecimal getIndex_num_027() {
        return index_num_027;
    }

    public void setIndex_num_027(BigDecimal index_num_027) {
        this.index_num_027 = index_num_027;
    }

    public BigDecimal getIndex_num_028() {
        return index_num_028;
    }

    public void setIndex_num_028(BigDecimal index_num_028) {
        this.index_num_028 = index_num_028;
    }

    public BigDecimal getIndex_num_029() {
        return index_num_029;
    }

    public void setIndex_num_029(BigDecimal index_num_029) {
        this.index_num_029 = index_num_029;
    }

    public BigDecimal getIndex_num_030() {
        return index_num_030;
    }

    public void setIndex_num_030(BigDecimal index_num_030) {
        this.index_num_030 = index_num_030;
    }

    public BigDecimal getIndex_num_031() {
        return index_num_031;
    }

    public void setIndex_num_031(BigDecimal index_num_031) {
        this.index_num_031 = index_num_031;
    }

    public BigDecimal getIndex_num_032() {
        return index_num_032;
    }

    public void setIndex_num_032(BigDecimal index_num_032) {
        this.index_num_032 = index_num_032;
    }

    public BigDecimal getIndex_num_033() {
        return index_num_033;
    }

    public void setIndex_num_033(BigDecimal index_num_033) {
        this.index_num_033 = index_num_033;
    }

    public BigDecimal getIndex_num_034() {
        return index_num_034;
    }

    public void setIndex_num_034(BigDecimal index_num_034) {
        this.index_num_034 = index_num_034;
    }

    public BigDecimal getIndex_num_035() {
        return index_num_035;
    }

    public void setIndex_num_035(BigDecimal index_num_035) {
        this.index_num_035 = index_num_035;
    }

    public BigDecimal getIndex_num_036() {
        return index_num_036;
    }

    public void setIndex_num_036(BigDecimal index_num_036) {
        this.index_num_036 = index_num_036;
    }

    public BigDecimal getIndex_num_037() {
        return index_num_037;
    }

    public void setIndex_num_037(BigDecimal index_num_037) {
        this.index_num_037 = index_num_037;
    }

    public BigDecimal getIndex_num_038() {
        return index_num_038;
    }

    public void setIndex_num_038(BigDecimal index_num_038) {
        this.index_num_038 = index_num_038;
    }

    public BigDecimal getIndex_num_039() {
        return index_num_039;
    }

    public void setIndex_num_039(BigDecimal index_num_039) {
        this.index_num_039 = index_num_039;
    }

    public BigDecimal getIndex_num_040() {
        return index_num_040;
    }

    public void setIndex_num_040(BigDecimal index_num_040) {
        this.index_num_040 = index_num_040;
    }

    public String getIndex_str_001() {
        return index_str_001;
    }

    public void setIndex_str_001(String index_str_001) {
        this.index_str_001 = index_str_001;
    }

    public String getIndex_str_002() {
        return index_str_002;
    }

    public void setIndex_str_002(String index_str_002) {
        this.index_str_002 = index_str_002;
    }

    public String getIndex_str_003() {
        return index_str_003;
    }

    public void setIndex_str_003(String index_str_003) {
        this.index_str_003 = index_str_003;
    }

    public String getIndex_str_004() {
        return index_str_004;
    }

    public void setIndex_str_004(String index_str_004) {
        this.index_str_004 = index_str_004;
    }

    public String getIndex_str_005() {
        return index_str_005;
    }

    public void setIndex_str_005(String index_str_005) {
        this.index_str_005 = index_str_005;
    }

    public String getIndex_str_006() {
        return index_str_006;
    }

    public void setIndex_str_006(String index_str_006) {
        this.index_str_006 = index_str_006;
    }

    public String getIndex_str_007() {
        return index_str_007;
    }

    public void setIndex_str_007(String index_str_007) {
        this.index_str_007 = index_str_007;
    }

    public String getIndex_str_008() {
        return index_str_008;
    }

    public void setIndex_str_008(String index_str_008) {
        this.index_str_008 = index_str_008;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGoods_classes() {
        return goods_classes;
    }

    public void setGoods_classes(Integer goods_classes) {
        this.goods_classes = goods_classes;
    }

    public Integer getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public Long getGoods_unique_id() {
        return goods_unique_id;
    }

    public void setGoods_unique_id(Long goods_unique_id) {
        this.goods_unique_id = goods_unique_id;
    }

    public Long getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(Long goods_id) {
        this.goods_id = goods_id;
    }

    public Long getReport_m_site() {
        return report_m_site;
    }

    public void setReport_m_site(Long report_m_site) {
        this.report_m_site = report_m_site;
    }
}