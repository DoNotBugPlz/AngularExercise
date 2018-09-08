/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.skytech.config.pk_model.PkNubmerBusinessTab;
import jdk.nashorn.internal.ir.IdentNode;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;

@Entity
@DynamicInsert
@Table(name = "T_FINE_OBJECT")
public class T_Fine_Object extends PkNubmerBusinessTab implements Serializable {

    private static final long serialVersionUID = 1L;

    @Transient
    private Long id;

    @Column(name = "FINE_CONFIG_ID")
    private Long fine_config_id;

    @Column(name = "USER_ID")
    private Long user_id;

    @Column(name = "DELSTATUS")
    private Integer delstatus;

    @Column(name = "DEPT_ID")
    private Long dept_id;

    public T_Fine_Object() {
    }

    /************************* getter、setter *****************************/
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFine_config_id() {
        return this.fine_config_id;
    }

    public void setFine_config_id(Long fine_config_id) {
        this.fine_config_id = fine_config_id;
    }

    public Long getUser_id() {
        return this.user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Integer getDelstatus() {
        return this.delstatus;
    }

    public void setDelstatus(Integer delstatus) {
        this.delstatus = delstatus;
    }

    public Long getDept_id() {
        return this.dept_id;
    }

    public void setDept_id(Long dept_id) {
        this.dept_id = dept_id;
    }


}