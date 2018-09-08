package com.skytech.project.goodsReferenceLib.goods_link.api;

import javax.annotation.Resource;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.goodsReferenceLib.cf_goods.model.GoodsPanelModel;
import com.skytech.project.goodsReferenceLib.goods_link.model.Cf_Goods_Link;
import com.skytech.project.goodsReferenceLib.goods_link.model.GoodsLinkPanelModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.goodsReferenceLib.goods_link.service.ICf_Goods_LinkService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Cf_goods_link")
public class Cf_Goods_LinkController{

	@Resource(name="cf_Goods_LinkService")
	private ICf_Goods_LinkService cf_Goods_LinkService;


	@ResponseBody
	@RequestMapping(value = "/saveInfo")
	public ResultJO saveInfo(@RequestBody GoodsLinkPanelModel gm) {
		// 修改商品名称将新增一条数据，而不是修改
		Cf_Goods_Link cf_goods_link = gm.getCf_goods_link();
		cf_goods_link = cf_Goods_LinkService.saveOrUpdateWithNotNullProperties(cf_goods_link);
		return ResultJO.getDefaultResult(cf_goods_link);
	}

	//加载关联列表
	@ResponseBody
	@RequestMapping(value = {"/loadGoodsLinkList"})
	public GridResult loadGoodsLinkList(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "spec", required = false) String spec,
			@RequestParam(value = "measurement_unit", required = false) String measurement_unit,

			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("measurement_unit",measurement_unit);
		map.put("name",name);
		map.put("spec",spec);

		return cf_Goods_LinkService.loadGoodsLinkList(pageInfo,map);
	}

	//改变关联状态
	@ResponseBody
	@RequestMapping(value = {"/changeGoodsLinkStatus"})
	public ResultJO changeGoodsLinkStatus(
			@RequestParam(value = "id", required = false) String id,
			@RequestParam(value = "delstatus", required = false) String delstatus) {
		Cf_Goods_Link cf_goods_link = cf_Goods_LinkService.get(id);
		if (cf_goods_link != null) {
			if(cf_goods_link.getDelstatus() != null) {
				cf_goods_link.setDelstatus(Integer.parseInt(delstatus));
			}
			cf_Goods_LinkService.saveOrUpdateWithNotNullProperties(cf_goods_link);
			return ResultJO.getDefaultResult( null,"保存成功！");
		}

		return ResultJO.getErrorResult(null,"保存失败");
	}











}