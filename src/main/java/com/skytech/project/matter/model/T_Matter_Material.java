package com.skytech.project.matter.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_MATTER_MATERIAL")
public class T_Matter_Material extends PkNubmerBusinessTab implements Serializable {

	private static final long serialVersionUID = 1L;

	@Transient
	private Long id;

	@Column(name="NAME")
	private String name;

	@Column(name="CHANNEL")
	private String channel;

	@Column(name="PAPERY")
	private String papery;

	@Column(name="IS_NECESSITY")
	private Integer is_necessity;

	@Column(name="MATTER_ID")
	private Long matter_id;

	public T_Matter_Material() {}

	/************************* getter、setter *****************************/
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getChannel() {
		return this.channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getPapery() {
		return this.papery;
	}

	public void setPapery(String papery) {
		this.papery = papery;
	}

	public Integer getIs_necessity() {
		return this.is_necessity;
	}

	public void setIs_necessity(Integer is_necessity) {
		this.is_necessity = is_necessity;
	}

	public Long getMatter_id() {
		return this.matter_id;
	}

	public void setMatter_id(Long matter_id) {
		this.matter_id = matter_id;
	}

	
}