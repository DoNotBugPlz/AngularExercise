package com.skytech.project.goodsReferenceLib.barCodeManage.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;

import java.util.List;
import java.util.Map;

public interface ICf_Goods_Bar_CodeDao extends IDao<Cf_Goods_Bar_Code, String> {


    GridResult search(PageInfo pageInfo, Map map);

    GridResult loadbarCodeManage(String id);

    int checkExist(String bar_code);

    void updateOld(String id);

    void updateDelstatus(String id, String delstatus);
}