package com.skytech.flow.agent.model;

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
@Table(name = "T_AGENT_USER")
public class T_Agent_User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name="AGENTCHINANAME")
	private String agentChinaName;

	@Column(name="AGENTLOGINNAME")
	private String agentLoginName;

	@Column(name="DEADTIME")
	private String deadTime;

	@Column(name="STARTTIME")
	private String startTime;

	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid",strategy="com.skytech.persistence.identifier.generator.COMBGenerator")
	@Column(name="ID",nullable=false)
	@NotNull
	private String id;

	@Column(name="PRINCIPALCHINANAME")
	private String principalChinaName;

	@Column(name="PRINCIPALLOGINNAME")
	private String principalLoginName;

	@Column(name="STATUS")
	private String status;

	public T_Agent_User() {}

	/************************* getter、setter *****************************/
	public String getAgentChinaName() {
		return this.agentChinaName;
	}

	public void setAgentChinaName(String agentchinaname) {
		this.agentChinaName = agentchinaname;
	}

	public String getAgentLoginName() {
		return this.agentLoginName;
	}

	public void setAgentLoginName(String agentloginname) {
		this.agentLoginName = agentloginname;
	}

	public String getDeadTime() {
		return this.deadTime;
	}

	public void setDeadTime(String deadtime) {
		this.deadTime = deadtime;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPrincipalChinaName() {
		return this.principalChinaName;
	}

	public void setPrincipalChinaName(String principalchinaname) {
		this.principalChinaName = principalchinaname;
	}

	public String getPrincipalLoginName() {
		return this.principalLoginName;
	}

	public void setPrincipalLoginName(String principalloginname) {
		this.principalLoginName = principalloginname;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}