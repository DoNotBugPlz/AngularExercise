package com.skytech.project.goodsReferenceLib.barCodeManage.service.imp;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.goodsReferenceLib.barCodeManage.dao.ICf_Goods_Bar_CodeDao;
import com.skytech.project.goodsReferenceLib.barCodeManage.service.ICf_Goods_Bar_CodeService;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;

import java.util.List;
import java.util.Map;

@Service("cf_Goods_Bar_CodeService")
public class Cf_Goods_Bar_CodeService extends BaseService<Cf_Goods_Bar_Code, String> implements ICf_Goods_Bar_CodeService {

    private ICf_Goods_Bar_CodeDao cf_Goods_Bar_CodeDao;

    @Resource(name = "cf_Goods_Bar_CodeDao")
    @Override
    public void setBaseDao(IDao<Cf_Goods_Bar_Code, String> baseDao) {
        this.cf_Goods_Bar_CodeDao = (ICf_Goods_Bar_CodeDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public ResultJO search(PageInfo pageInfo, Map map) {
        return ResultJO.getDefaultResult(cf_Goods_Bar_CodeDao.search(pageInfo, map));
    }

    @Override
    public ResultJO loadbarCodeManage(String id) {
        return ResultJO.getDefaultResult(cf_Goods_Bar_CodeDao.loadbarCodeManage(id));
    }

    @Override
    public int checkExist(String bar_code) {
        return cf_Goods_Bar_CodeDao.checkExist(bar_code);
    }

    @Override
    public void updateOld(String id) {
        cf_Goods_Bar_CodeDao.updateOld(id);
    }

    @Override
    public void updateDelstatus(String id, String delstatus) {
        cf_Goods_Bar_CodeDao.updateDelstatus(id, delstatus);
    }
}