package com.skytech.project.goodsReferenceLib.barCodeManage.service;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;

import java.util.List;
import java.util.Map;

public interface ICf_Goods_Bar_CodeService extends IBaseService<Cf_Goods_Bar_Code, String> {


    ResultJO search(PageInfo pageInfo, Map map);

    ResultJO loadbarCodeManage(String id);

    int checkExist(String bar_code);

    void updateOld(String id);

    void updateDelstatus(String id, String delstatus);
}