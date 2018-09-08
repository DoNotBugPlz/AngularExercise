package com.skytech.project.area.api;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.area.service.ICf_AreaService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @author cr
 * @desc 区域管理
 * @Time 2018/8/23 14:25
 */
@Controller
@RequestMapping("/Cf_area")
public class Cf_AreaController{

    @Resource(name="cf_AreaService")
    private ICf_AreaService cf_AreaService;


    /**
     * 获取区域对象的树
     * 异步加载
     *
     * @return ResultJO
     */
    @RequestMapping(value = "/LoadListAreaTree")
    @ResponseBody
    public ResultJO loadListAreaTree(@RequestParam(value = "id", required = false) Long area_id) {
        return cf_AreaService.loadListAreaTree(area_id);
    }
}
