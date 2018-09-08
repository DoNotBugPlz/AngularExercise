package com.skytech.project.goodsReferenceLib.cf_goods.api;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;

import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;
import com.skytech.project.goodsReferenceLib.barCodeManage.service.ICf_Goods_Bar_CodeService;
import com.skytech.project.goodsReferenceLib.cf_goods.model.Cf_Goods;
import com.skytech.project.goodsReferenceLib.cf_goods.model.GoodsPanelModel;
import com.skytech.project.goodsReferenceLib.cf_goods.service.ICf_GoodsService;
import com.skytech.project.organisation.model.LoginUserInf;
import com.sun.xml.bind.v2.TODO;
import org.apache.cxf.transport.http.HTTPSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/Cf_goods")
public class Cf_GoodsController{

	@Resource(name="cf_GoodsService")
	private ICf_GoodsService cf_GoodsService;

	@Resource(name="cf_Goods_Bar_CodeService")
	private ICf_Goods_Bar_CodeService cf_goods_bar_codeService;


	//加载商品树根节点
	@ResponseBody
	@RequestMapping(value = {"/loadGoodsTreeRootNode"}, method = RequestMethod.GET)
	public List loadGoodsTreeRootNode(@RequestParam(value = "id", required = false) String noodid,
									  @RequestParam(value = "goods_classes", required = false) String goods_classes) {
		return cf_GoodsService.loadGoodsTreeRootNode(noodid,goods_classes);
	}
	//加载商品树
	@ResponseBody
	@RequestMapping(value = {"/loadGoodsTree"}, method = RequestMethod.GET)
	public List loadGoodsTree(@RequestParam(value = "id", required = false) String goodid,
							  @RequestParam(value = "goodsfamilyid", required = false) String goodsfamilyid) {
		return cf_GoodsService.loadGoodsTree(goodid,goodsfamilyid);
	}

	//加载右侧列表
	@ResponseBody
	@RequestMapping(value = {"/loadGoodsList"})
	public GridResult loadGoodsList(
			@RequestParam(value = "id", required = false) String goodid,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "spec", required = false) String spec,
			@RequestParam(value = "measurement_unit", required = false) String measurement_unit,
			@RequestParam(value = "delstatus", required = false) String delstatus,
			@RequestParam(value = "alias", required = false) String alias,
			@RequestParam(value = "origin_company", required = false) String origin_company,
			@RequestParam(value = "brand", required = false) String brand,
			@RequestParam(value = "remark", required = false) String remark,
			@RequestParam(value = "origin_place", required = false) String origin_place,
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("goodid",goodid);
		map.put("name",name);
		map.put("spec",spec);
		map.put("measurement_unit",measurement_unit);
		map.put("delstatus",delstatus);
		map.put("alias",alias);
		map.put("origin_company",origin_company);
		map.put("brand",brand);
		map.put("remark",remark);
		map.put("origin_place",origin_place);
		return cf_GoodsService.loadGoodsList(pageInfo,map);
	}

	//监测任务--添加监测品种
	@ResponseBody
	@RequestMapping(value = {"/loadGoodsListForMonitor"})
	public GridResult loadGoodsListForMonitor(
			@RequestParam(value = "goodsFamilyId", required = false) String goodsFamilyId,
			@RequestParam(value = "name", required = false) String name,
			PageInfo pageInfo) {
		Map map = new HashMap();
		map.put("goodsFamilyId",goodsFamilyId);
		map.put("name",name);
		return cf_GoodsService.loadGoodsListForMonitor(pageInfo,map);
	}

	//加载所属类别
	@ResponseBody
	@RequestMapping(value = {"/loadBeloneCategory"}, method = RequestMethod.GET)
	public String loadBeloneCategory(@RequestParam(value = "id", required = false) String goodid) {
		return cf_GoodsService.loadBeloneCategory(goodid);
	}

	//获取单个商品信息
	@ResponseBody
	@RequestMapping(value = {"/getGoodsDetail"}, method = RequestMethod.GET)
	public Map<String, Object> getGoodsDetail(@RequestParam(value = "id", required = false) String goodid) {
		return cf_GoodsService.getGoodsDetail(goodid);
	}

	//修改商品状态
	@RequestMapping(value = "/changeStatue", method = RequestMethod.POST)
	@ResponseBody
	public ResultJO changeStatue(@RequestBody Map paramMap) {
		String id = StringUtil.getStr(paramMap.get("id"));
		String value = StringUtil.getStr(paramMap.get("delstatue"));
		Cf_Goods cf_goods = cf_GoodsService.get(Long.parseLong(id));
		if (cf_goods != null) {
			if(cf_goods.getDelstatus() != null) {
				cf_goods.setDelstatus(Integer.parseInt(value));
			}
			cf_GoodsService.saveOrUpdate(cf_goods);
			return ResultJO.getDefaultResult(cf_goods, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}

	//保存商品信息
	@ResponseBody
	@RequestMapping(value = "/saveInfo")
	public ResultJO saveInfo(@RequestBody GoodsPanelModel gm, HttpSession session) {
		// 修改商品名称将新增一条数据，而不是修改
		Cf_Goods cf_goods1 = cf_GoodsService.saveInfo(gm,session);
		Cf_Goods_Bar_Code cf_goods_bar_code = gm.getCf_goods_bar_code();
		//当条形码id不为空时，将传回来id查到的条形码状态改掉
		if(cf_goods_bar_code!=null ){
			if(!cf_goods_bar_code.getId().equals("") && cf_goods_bar_code.getId()!=null){
				Cf_Goods_Bar_Code cf_goods_bar_code1 = cf_goods_bar_codeService.get(cf_goods_bar_code.getId());
				cf_goods_bar_code1.setDelstatus(1);
				cf_goods_bar_code1.setIs_last_version(0);
				cf_goods_bar_codeService.saveOrUpdateWithNotNullProperties(cf_goods_bar_code1);
			}
		}
		//新建一条条形码
		Cf_Goods_Bar_Code cf_goods_bar_code3 = new Cf_Goods_Bar_Code();
		if(cf_goods1!=null && cf_goods_bar_code!=null){
			if( !cf_goods_bar_code.getBar_code().equals("")){
				Cf_Goods_Bar_Code cf_goods_bar_code2 = new Cf_Goods_Bar_Code();
				cf_goods_bar_code2.setDelstatus(0);
				cf_goods_bar_code2.setGoods_id(cf_goods1.getId());
				cf_goods_bar_code2.setGoods_unique_id(cf_goods1.getUnique_id());
				cf_goods_bar_code2.setUploaded_time(new Date());
				cf_goods_bar_code2.setIs_last_version(1);
				cf_goods_bar_code2.setBar_code(cf_goods_bar_code.getBar_code());
				cf_goods_bar_code3 = cf_goods_bar_codeService.saveOrUpdateWithNotNullProperties(cf_goods_bar_code2);
			}

		}
		List<Object> list = new ArrayList<>();
		list.add(cf_goods1);
		list.add(cf_goods_bar_code3);
		//将两个实体类返回到前台，方便页面数据刷新
		return ResultJO.getDefaultResult(list);

	}
}