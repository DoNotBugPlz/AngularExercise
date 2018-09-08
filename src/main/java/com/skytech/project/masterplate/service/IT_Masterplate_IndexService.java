package com.skytech.project.masterplate.service;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.masterplate.model.T_Masterplate_Index;
import com.skytech.project.organisation.model.LoginUserInf;

import java.util.List;

public interface IT_Masterplate_IndexService extends IBaseService<T_Masterplate_Index, Long> {


    ResultJO search(PageInfo pageInfo);

    int delList(List<String> strings);

    void delTrend(String parentId);

    ResultJO saveChildren(LoginUserInf loginUserInf, Long parentId, List<T_Masterplate_Index> childList);

    ResultJO updateChildren(LoginUserInf loginUserInf, List<T_Masterplate_Index> childList);
}