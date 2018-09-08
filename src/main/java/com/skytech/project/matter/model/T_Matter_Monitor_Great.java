package com.skytech.project.matter.model;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MATTER_MONITOR_GREAT")
public class T_Matter_Monitor_Great extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MATTER_MONITOR_ID")
	private Long matter_monitor_id;

	@Column(name="GOOD_ID")
	private Long good_id;

	@Column(name="PRICE_TREND_ID")
	private Long price_trend_id;

	@Column(name="CHANGE_REAON")
	private String change_reaon;

	@Column(name="PRICE_READJUST")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private java.util.Date price_readjust;

	@Column(name="ORGINAL_PRICE")
	private BigDecimal orginal_price;

	@Column(name="CUNRRENT_PRICE")
	private BigDecimal cunrrent_price;

	public T_Matter_Monitor_Great() {}

	public Long getMatter_monitor_id() {
		return matter_monitor_id;
	}

	public void setMatter_monitor_id(Long matter_monitor_id) {
		this.matter_monitor_id = matter_monitor_id;
	}

	/************************* getter、setter *****************************/



	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getGood_id() {
		return this.good_id;
	}

	public void setGood_id(Long good_id) {
		this.good_id = good_id;
	}

	public Long getPrice_trend_id() {
		return this.price_trend_id;
	}

	public void setPrice_trend_id(Long price_trend_id) {
		this.price_trend_id = price_trend_id;
	}

	public String getChange_reaon() {
		return this.change_reaon;
	}

	public void setChange_reaon(String change_reaon) {
		this.change_reaon = change_reaon;
	}

	public java.util.Date getPrice_readjust() {
		return this.price_readjust;
	}

	public void setPrice_readjust(java.util.Date price_readjust) {
		this.price_readjust = price_readjust;
	}

	public BigDecimal getOrginal_price() {
		return orginal_price;
	}

	public void setOrginal_price(BigDecimal orginal_price) {
		this.orginal_price = orginal_price;
	}

	public BigDecimal getCunrrent_price() {
		return cunrrent_price;
	}

	public void setCunrrent_price(BigDecimal cunrrent_price) {
		this.cunrrent_price = cunrrent_price;
	}
}