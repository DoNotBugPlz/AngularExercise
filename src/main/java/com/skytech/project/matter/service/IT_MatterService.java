package com.skytech.project.matter.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.matter.model.T_Matter;
import com.skytech.project.matter.model.T_Matter_Material;
import com.skytech.project.matter.model.T_Matter_Monitor;
import com.skytech.project.matter.model.T_Matter_Monitor_Great;

import java.util.List;
import java.util.Map;

public interface IT_MatterService extends IBaseService<T_Matter, Long> {

    GridResult search(PageInfo pageinfo, Map map);

    public List<T_Matter_Monitor> findBymatter(String id);

    public List  findBymonitor(String id);

    public List<T_Matter_Material> findBymaterial(String id);

    public int  delete(int id);

    public int deletematerial(int id);

    GridResult searchfind(PageInfo pageinfo, Map map);



}