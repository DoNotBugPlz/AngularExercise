package com.skytech.project.masterplate.api;


import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.masterplate.model.T_Masterplate_Class;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.masterplate.service.IT_Masterplate_ClassService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;


@Controller
@RequestMapping("/T_masterplate_class")
public class T_Masterplate_ClassController {

    @Resource(name = "t_Masterplate_ClassService")
    private IT_Masterplate_ClassService t_Masterplate_ClassService;


    /**
     * 新增品类信息
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveBaseInfo(@RequestBody Map params, HttpSession session) {
        if (params != null) {
            T_Masterplate_Class t_masterplate_class = new T_Masterplate_Class();
            t_masterplate_class.setClass_name(params.get("class_name").toString());
            t_masterplate_class.setMasterplate_id(Long.parseLong(params.get("masterplate_id").toString()));
            t_masterplate_class.setDelstatus(0);
            t_Masterplate_ClassService.saveOrUpdate(t_masterplate_class);
            return ResultJO.getDefaultResult(t_masterplate_class, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }


    /**
     * 删除
     * 添加删除标识
     *
     * @param
     * @return ResultJO
     */
    @RequestMapping(value = "/delClass", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO delClass(@RequestBody Map params) {
        String id = params.get("id").toString();
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            t_Masterplate_ClassService.delClass(id);
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "删除失败！");
    }


}