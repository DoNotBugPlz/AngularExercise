package com.skytech.project.sms.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerQuestionTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_SMS_SERVER_MONITOR")
public class T_Sms_Server_Monitor extends PkNubmerQuestionTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="MENU_ID")
	private String menu_id;

	@Column(name="EARLYSITUATION")
	private Integer earlysituation;

	@Column(name="STATUS")
	private Integer status;

	@Column(name="DELSTATUS")
	private Integer delstatus;

	public T_Sms_Server_Monitor() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(String menu_id) {
		this.menu_id = menu_id;
	}

	public Integer getEarlysituation() {
		return earlysituation;
	}

	public void setEarlysituation(Integer earlysituation) {
		this.earlysituation = earlysituation;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getDelstatus() {
		return delstatus;
	}

	public void setDelstatus(Integer delstatus) {
		this.delstatus = delstatus;
	}
}