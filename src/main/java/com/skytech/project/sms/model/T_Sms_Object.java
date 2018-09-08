package com.skytech.project.sms.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerQuestionTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_SMS_OBJECT")
public class  T_Sms_Object extends PkNubmerQuestionTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="RECIVER_ID")
	private Long reciver_id;

	@Column(name="T_SMS_ID")
	private Long t_sms_id;

	@Transient
	private Long id;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	public T_Sms_Object() {}

	/************************* getter、setter *****************************/
	public Long getReciver_id() {
		return this.reciver_id;
	}

	public void setReciver_id(Long reciver_id) {
		this.reciver_id = reciver_id;
	}

	public Long getT_sms_id() {
		return this.t_sms_id;
	}

	public void setT_sms_id(Long t_sms_id) {
		this.t_sms_id = t_sms_id;
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

	
}