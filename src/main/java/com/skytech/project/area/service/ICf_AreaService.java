package com.skytech.project.area.service;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.area.model.Cf_Area;

/**
 * @author cr
 * @desc 区划service
 * @Time 2018/8/23 14:37
 */
public interface ICf_AreaService extends IBaseService<Cf_Area,Long> {

    /** 获取当前区域的子区域*/
    ResultJO loadListAreaTree(Long area_id);
}
