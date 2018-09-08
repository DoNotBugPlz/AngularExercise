package com.skytech.project.foreignMaterial.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.IDao;
import com.skytech.project.foreignMaterial.model.T_Foreign_Material;

import java.util.Map;

public interface IT_Foreign_MaterialDao extends IDao<T_Foreign_Material, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}