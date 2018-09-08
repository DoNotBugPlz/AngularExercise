package com.skytech.project.goodsReferenceLib.goods_type.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.goodsReferenceLib.goods_type.dao.ICf_Goods_TypeDao;
import com.skytech.project.goodsReferenceLib.goods_type.service.ICf_Goods_TypeService;
import com.skytech.project.goodsReferenceLib.goods_type.model.Cf_Goods_Type;

@Service("cf_Goods_TypeService")
public class Cf_Goods_TypeService extends BaseService<Cf_Goods_Type, Long> implements ICf_Goods_TypeService {

	private ICf_Goods_TypeDao cf_Goods_TypeDao;

	@Resource(name = "cf_Goods_TypeDao")
	@Override
	public void setBaseDao(IDao<Cf_Goods_Type, Long> baseDao) {
		this.cf_Goods_TypeDao = (ICf_Goods_TypeDao) baseDao;
		this.baseDao = baseDao;
	}

	@Override
	public boolean removeGoodsType(String goodsTypeId) {
		if (!cf_Goods_TypeDao.checkChildGoods(goodsTypeId) && !cf_Goods_TypeDao.checkChildNode(goodsTypeId)) {
			Cf_Goods_Type cf_goods_type = this.get(Long.parseLong(goodsTypeId));
			if (cf_goods_type != null) {
				if (cf_goods_type.getDelstatus() != null) {
					cf_goods_type.setDelstatus(1);
				}
				this.saveOrUpdate(cf_goods_type);
			}
			return true;
		}else {
			return false;
		}
	}
}