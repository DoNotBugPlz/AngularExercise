package com.skytech.project.wqt.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "OA_WQT_ZH")
public class Oa_Wqt_Zh extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="WQT_ID")
	private Long wqt_id;

	@Column(name="WH_ID")
	private Long wh_id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	public Oa_Wqt_Zh() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getWqt_id() {
		return this.wqt_id;
	}

	public void setWqt_id(Long wqt_id) {
		this.wqt_id = wqt_id;
	}

	public Long getWh_id() {
		return this.wh_id;
	}

	public void setWh_id(Long wh_id) {
		this.wh_id = wh_id;
	}

	public Integer getDelstatus() {
		return this.delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}

	
}