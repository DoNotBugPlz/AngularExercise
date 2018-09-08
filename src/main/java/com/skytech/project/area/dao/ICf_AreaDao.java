package com.skytech.project.area.dao;

import com.skytech.persistence.dao.IDao;
import com.skytech.project.area.model.Cf_Area;

import java.util.List;

/**
 * @author cr
 * @desc 区划dao
 * @Time 2018/8/23 14:33
 */
public interface ICf_AreaDao extends IDao<Cf_Area, Long> {

    /** 获取当前选中区域的子区域 */
    List loadListAreaTree(Long area_id);

}
