package com.skytech.project.goodsReferenceLib.cfIndexManage.service.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.category.model.Sys_Category;
import com.skytech.category.model.Sys_Categoryvalue;
import com.skytech.category.service.ICategoryService;
import com.skytech.category.service.ICategoryvalueService;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.goodsReferenceLib.cfIndexManage.dao.ICf_IndexDao;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.Cf_Index;
import com.skytech.project.goodsReferenceLib.cfIndexManage.model.cfIndexModel;
import com.skytech.project.goodsReferenceLib.cfIndexManage.service.ICf_IndexService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("cf_IndexService")
public class Cf_IndexService extends BaseService<Cf_Index, Long> implements ICf_IndexService{
	@Resource(name="categoryService")
	private ICategoryService categoryService;

	@Resource(name="categoryvalueService")
	private ICategoryvalueService categoryvalueService;

	private ICf_IndexDao cf_IndexDao;

	@Resource(name="cf_IndexDao")
	@Override
	public void setBaseDao(IDao<Cf_Index, Long> baseDao) {
		this.cf_IndexDao = (ICf_IndexDao)baseDao;
		this.baseDao = baseDao;
	}

	@Override
	public  Cf_Index saveOrUpdateIndex(cfIndexModel pm){
		Cf_Index index = pm.getCf_index();
		boolean isAdd = false;
		if(index.getId() == null || StringUtil.isNullOrWhiteSpace(String.valueOf(index.getId()) )){
			isAdd = true;
		}
		// 新增修改指标库
		if(isAdd){
			Long id = cf_IndexDao.save(index);
			index.setId(id);
		}else{
			cf_IndexDao.update(index);
		}
		if(index.getIndex_nature() != null && index.getIndex_nature() == 3){			// 指标性质为选项型
//			/**
//			 * 1) 新增category 和 新增category_vlaue
//			 * 2）修改category 和 新增category_vlaue
//			 **/
//			if(isAdd){
//				// 新增category 和 新增category_vlaue
//				saveOrUpdateCategoryData(pm);
//			}else{
//				/**
//				 * 1)百分比/数值 --(转)--> 选项类
//				 * 2）选项类 --(不变)-- 选项类>
//				 * **/
//				Sys_Category category = pm.getSys_Category();
//				// 获取已有category_vlaue中的最大排序号
//				if(category==null) {
//					return index;
//				}
//				if(StringUtil.isNullOrWhiteSpace(category.getId()+"")){
//					//百分比/数值 --(转)--> 选项类 : 新增
//					saveOrUpdateCategoryData(pm);
//				}else{
//					// 选项类 --(不变)-- 选项类> : 修改category 和 新增category_vlaue
//				}
//			}
			// 新增category
			Sys_Category category = pm.getSys_category();
			if(category == null){
				return index;
			}
			boolean category_isAdd = false;		// 定义关联字典项操作开关
			Long category_id =  null;		// 定义Sys_Category 字典主键
			if(category.getId() == null || StringUtil.isNullOrWhiteSpace(String.valueOf(category.getId()))){
				category_isAdd = true;

				category.setConstname("cf_index_"+index.getId());
				// 获取category中的最大排序号
				Long max_category_sortIndex = cf_IndexDao.getCategoryMaxSortIndex();
				if(max_category_sortIndex==null){
					category.setSortindex((long) 9999);
				}else{
					category.setSortindex(max_category_sortIndex+1);
				}
				category.setDelstatus(0);	//
				category = categoryService.save(category);
				// 修改cf_index表的category_constname
				index.setCategory_constname("cf_index_"+index.getId());
				cf_IndexDao.update(index);
			}else{	// 修改
				category.setDelstatus(0);	//防止将字典项更改
				categoryService.update(category);
			}
			category_id =  category.getId();
			// 新增category_vlaue
			List<Sys_Categoryvalue> list  =  pm.getList();
			long i = 0;
			if(!category_isAdd){	// 之前已有
				// 获取Sys_CategoryValue 对应字典的最大sortindex; i = max+1
				Long max_sortIndex = cf_IndexDao.getCategoryValueMaxSortIndex(category_id.toString());
				if(max_sortIndex != null){
					i = (max_sortIndex+1);
				}
			}
			for(Sys_Categoryvalue item:list){
				item.setCategoryid(category_id);
				item.setIsparent("false");
				item.setSortindex(i);
				item.setDelstatus(0);
				i++;
				categoryvalueService.save(item);
			}
		}
		return index;
	}

	@Override
	public GridResult search(PageInfo pageinfo, Map map) {
		return cf_IndexDao.search(pageinfo, map);
	}

	@Override
	public Map<String, Object> getIndexDetail(String index_id) {
		Map<String, Object> data = Maps.newHashMap();
		Map<String, Object> cf_index = cf_IndexDao.getIndexDetail(index_id);
		data.put("cf_index",cf_index);
		String index_nature =  StringUtil.getStr(cf_index.get("index_nature"));
		String category_constname =  StringUtil.getStr(cf_index.get("category_constname"));
		if("3".equals(index_nature) && !StringUtil.isNullOrWhiteSpace(category_constname) ){
			// 加载字典项
			Map<String, Object> sys_category = cf_IndexDao.getIndexCategory(category_constname);
			data.put("sys_category",sys_category);
			if(!sys_category.isEmpty() && sys_category != null){
				String category_id  =  StringUtil.getStr(sys_category.get("id"));
				List sys_category_values = cf_IndexDao.getIndexCategoryValues(category_id);
				data.put("sys_category_values",sys_category_values);
			}
		}
		return data;
	}

	public GridResult loadPageListForConfig(Map paramMap, PageInfo pageinfo) {
		GridResult result =  new GridResult();
		String id = StringUtil.getStr(paramMap.get("id"));
		String refid = StringUtil.getStr(paramMap.get("refid"));
		if("0".equals(id)){	// 加载最大节点
			result =  cf_IndexDao.loadPageListForCategory(paramMap, pageinfo);
		}else if("1445".equals(id) && ("".equals(refid) || null == refid)){
			result =  cf_IndexDao.loadPageListForCategoryValue(paramMap, pageinfo);
		}else{
			result =  cf_IndexDao.loadPageListForCfIndex(paramMap, pageinfo);
		}
		return result;
	}

}