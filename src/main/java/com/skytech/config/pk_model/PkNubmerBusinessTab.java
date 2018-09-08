package com.skytech.config.pk_model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * @author yangzr
 * 业务表数据主键生成策略
 * @time 2018/8/8
 */
@Entity
@Table(name="SYS_MODEL_PK_NUMBER")
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)//table_per_class 继承策略（每个具体的类一张表，父类表不具有子类的主键数据）

public class PkNubmerBusinessTab {
    @Id
    @GeneratedValue(generator="business_data_id_gen")
    @GenericGenerator( name="business_data_id_gen", strategy="enhanced-table", //选用加强的table策略，需要在sessionfactory中配置属性hibernate.id.new_generator_mappings 为 true
            parameters = {
                    @org.hibernate.annotations.Parameter( name = "table_name", value = "SYS_MODEL_PK_NUMBER"),//表名
                    @org.hibernate.annotations.Parameter( name = "value_column_name", value = "id_value"), //序列值所在列的列名
                    @org.hibernate.annotations.Parameter( name = "segment_column_name",value = "id_name"), //序列名所在列的列名
                    @org.hibernate.annotations.Parameter( name = "segment_value", value = "business_data_id"),//序列名
                    @org.hibernate.annotations.Parameter( name = "increment_size", value = "1"), //从1开始
                    @org.hibernate.annotations.Parameter( name = "optimizer",value = "pooled-lo") //配置序列的优化器,避免频繁访问数据库
            })
    @Column(name="id")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
