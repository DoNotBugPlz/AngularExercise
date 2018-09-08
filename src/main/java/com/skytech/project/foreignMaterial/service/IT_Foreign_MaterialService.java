package com.skytech.project.foreignMaterial.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.foreignMaterial.model.T_Foreign_Material;

import java.util.Map;

public interface IT_Foreign_MaterialService extends IBaseService<T_Foreign_Material, Long> {


    GridResult loadList(PageInfo pageInfo, Map map);
}