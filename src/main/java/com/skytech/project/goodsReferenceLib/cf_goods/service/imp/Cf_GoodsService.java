package com.skytech.project.goodsReferenceLib.cf_goods.service.imp;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.config.param.SysParam;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;
import com.skytech.project.goodsReferenceLib.cf_goods.model.GoodsPanelModel;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.goodsReferenceLib.cf_goods.dao.ICf_GoodsDao;
import com.skytech.project.goodsReferenceLib.cf_goods.service.ICf_GoodsService;
import com.skytech.project.goodsReferenceLib.cf_goods.model.Cf_Goods;

import java.util.*;

@Service("cf_GoodsService")
public class Cf_GoodsService extends BaseService<Cf_Goods, Long> implements ICf_GoodsService{

	private ICf_GoodsDao cf_GoodsDao;

	@Resource(name="cf_GoodsDao")
	@Override
	public void setBaseDao(IDao<Cf_Goods, Long> baseDao) {
		this.cf_GoodsDao = (ICf_GoodsDao)baseDao;
		this.baseDao = baseDao;
	}

	@Override
	public List loadGoodsTreeRootNode(String goodid,String goods_classes) {
		return cf_GoodsDao.loadGoodsTreeRootNode(goodid,goods_classes);
	}

	@Override
	public List loadGoodsTree(String goodid,String goodsfamilyid) {
		return cf_GoodsDao.loadGoodsTree(goodid,goodsfamilyid);
	}

	@Override
	public GridResult loadGoodsList(PageInfo pageInfo, Map map) {
		return cf_GoodsDao.loadGoodsList(pageInfo,  map);
	}
	@Override
	public GridResult loadGoodsListForMonitor(PageInfo pageInfo, Map map) {
		return cf_GoodsDao.loadGoodsListForMonitor(pageInfo,  map);
	}
	@Override
	public Map<String, Object> getGoodsDetail(String goodid) {
		return cf_GoodsDao.getGoodsDetail(goodid);
	}

	@Override
	public String loadBeloneCategory(String goodid) {
		List<HashMap> list = cf_GoodsDao.loadBeloneCategory(goodid);
		String p = "";
		for(int i = list.size()-1;i>-1;i--){
			p+=list.get(i).get("type_name")+">>";
		}
		if(p.length()>2){
			p = p.substring(0,p.length()-2);
		}

		return p.toString();
	}
	@Override
	public Cf_Goods saveInfo(GoodsPanelModel gm, HttpSession session) {
		Cf_Goods cf_goods = gm.getCf_goods();
		LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
		if(cf_goods.getId()!=null){//修改
			cf_goods.setModer(loginUserInf.getCurrentUserId());
			cf_goods.setModerdeptid(loginUserInf.getCurrentDeptId());
			cf_goods.setModtime(new Date());
		}else{//新增
			cf_goods.setAdder(loginUserInf.getCurrentUserId());
			cf_goods.setAdderdeptid(loginUserInf.getCurrentDeptId());
			cf_goods.setAddtime(new Date());
			cf_goods.setStart_time(new Date());
		}
		Cf_Goods cf_goods1;
		//不为null是修改
		if(cf_goods.getId()!=null){
			Cf_Goods cf_goods2 = this.get(cf_goods.getId());
			//商品名称不同，改变商品状态，并新增一条,相同的时候直接更新
			if(!cf_goods.getName().equals(cf_goods2.getName())){
				cf_goods2.setDelstatus(1);
				this.saveOrUpdateWithNotNullProperties(cf_goods2);
				cf_goods.setUnique_id(cf_goods2.getUnique_id());
				cf_goods.setId(null);
			}
		}else {
			// TODO: 2018/8/29 商品唯一编码暂时写死
			cf_goods.setUnique_id(Long.parseLong("10000"));
		}
		cf_goods1 = this.saveOrUpdateWithNotNullProperties(cf_goods);
		return  cf_goods1;




	}













}