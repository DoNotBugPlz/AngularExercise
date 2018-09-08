package com.skytech.project.goodsReferenceLib.cfIndexManage.api;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.Cf_Index;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.cfIndexModel;
import com.skytech.project.goodsReferenceLib.cfIndexManage.service.ICf_IndexService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/Cf_index")
public class Cf_IndexController{
	@Resource(name="cf_IndexService")
	private ICf_IndexService cf_IndexService;

	/**
	 * 新增或修改监测指标
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/saveOrUpdateIndex")
	public ResultJO saveOrUpdateIndex(@RequestBody cfIndexModel pm) {
		Cf_Index index = new Cf_Index();
		index = cf_IndexService.saveOrUpdateIndex(pm);
		return ResultJO.getDefaultResult(index);
	}

	/**
	 * 修改监测指标
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/updateIndex")
	public ResultJO updateIndex(@RequestBody Map paramMap) {
		String id = StringUtil.getStr(paramMap.get("id"));
		String value = StringUtil.getStr(paramMap.get("delstatus"));
		Cf_Index cf_Index = cf_IndexService.get(Long.parseLong(id));
		if (cf_Index != null) {
			if(cf_Index.getDelstatus() != null) {
				cf_Index.setDelstatus(Integer.parseInt(value));
			}
			cf_IndexService.saveOrUpdate(cf_Index);
			return ResultJO.getDefaultResult(cf_Index, "保存成功！");
		}
		return ResultJO.getErrorResult(null, "保存失败！");
	}


	/**
	 * 查询采价员统计列表
	 */
	@RequestMapping(value = {"/getIndexListByParam"})
	@ResponseBody
	public GridResult search(@RequestParam(value="id",required=false) String id,
							 @RequestParam(value="name",required=false) String name,
							 @RequestParam(value="index_nature",required=false) String index_nature,
							 @RequestParam(value="index_category",required=false) String index_category,
							 @RequestParam(value="delstatus",required=false) String delstatus,
							 PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("id",id);
		map.put("name",name);
		map.put("index_nature",index_nature);
		map.put("index_category",index_category);
		map.put("delstatus",delstatus);
		return cf_IndexService.search(pageInfo,map);
	}

	//获取单个指标信息
	@ResponseBody
	@RequestMapping(value = {"/getIndexDetail"}, method = RequestMethod.GET)
	public Map<String, Object> getIndexDetail(@RequestParam(value = "id", required = false) String id) {
		return cf_IndexService.getIndexDetail(id);
	}


	@RequestMapping({"/LoadPageListForConfig"})
	@ResponseBody
	public GridResult loadPageListForConfig(@RequestParam(value = "id", required = false) String id,
											@RequestParam(value = "refid", required = false) String refid,
											PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("id",id);
		map.put("refid",refid);
		return cf_IndexService.loadPageListForConfig(map, pageInfo);
	}
}