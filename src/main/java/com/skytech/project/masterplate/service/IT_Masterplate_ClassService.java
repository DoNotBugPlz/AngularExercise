package com.skytech.project.masterplate.service;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.masterplate.model.T_Masterplate_Class;

public interface IT_Masterplate_ClassService extends IBaseService<T_Masterplate_Class, Long> {


    void delClass(String id);
}