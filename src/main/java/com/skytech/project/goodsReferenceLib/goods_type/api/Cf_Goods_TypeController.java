package com.skytech.project.goodsReferenceLib.goods_type.api;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.ResultJO;

import com.skytech.project.goodsReferenceLib.cf_goods.model.GoodsPanelModel;

import com.skytech.project.goodsReferenceLib.goods_type.model.Cf_Goods_Type;
import com.skytech.project.goodsReferenceLib.goods_type.model.GoodsTypePanelModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.goodsReferenceLib.goods_type.service.ICf_Goods_TypeService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/Cf_goods_type")
public class Cf_Goods_TypeController{

	@Resource(name="cf_Goods_TypeService")
	private ICf_Goods_TypeService cf_Goods_TypeService;

	//新增商品类型
	@ResponseBody
	@RequestMapping(value = "/saveInfo")
	public ResultJO saveInfo(@RequestBody GoodsTypePanelModel gm) {
		Cf_Goods_Type cf_goods_type = gm.getCf_goods_type() ;
		if(cf_goods_type.getParentid()==0){
			cf_goods_type.setParentid(null);
		}
		cf_Goods_TypeService.saveOrUpdate(cf_goods_type);
		return ResultJO.getDefaultResult(cf_goods_type);
	}

	//删除商品类型
	@ResponseBody
	@RequestMapping(value = "/removeGoodsType")
	public ResultJO removeGoodsType(@RequestParam String goodsTypeId) {
		Cf_Goods_Type cf_goods_type = cf_Goods_TypeService.get(Long.parseLong(goodsTypeId));
		if(cf_goods_type!=null){
			if(cf_Goods_TypeService.removeGoodsType(goodsTypeId)){
				return ResultJO.getDefaultResult(null,"1");
			}else {
				return ResultJO.getDefaultResult(null,"0");
			}

		}else {
			return ResultJO.getErrorResult(null,"商品类型不存在或已删除");
		}
	}

}