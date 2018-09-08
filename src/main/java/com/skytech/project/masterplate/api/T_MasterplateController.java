package com.skytech.project.masterplate.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.masterplate.model.T_Masterplate;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.masterplate.service.IT_MasterplateService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_masterplate")
public class T_MasterplateController {

    @Resource(name = "t_MasterplateService")
    private IT_MasterplateService t_MasterplateService;

    /**
     * 查询模版
     *
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public GridResult search(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "masterplate_type", required = false) String masterplate_type,
            @RequestParam(value = "delstatus", required = false) String delstatus,
            PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("keyword", keyword);
        map.put("masterplate_type", masterplate_type);
        map.put("delstatus", delstatus);
        return t_MasterplateService.search(pageInfo, map);
    }

    // 修改模版状态
    @RequestMapping(value = "/changeStatue", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO changeStatue(@RequestBody Map paramMap) {
        String id = StringUtil.getStr(paramMap.get("id"));
        String value = StringUtil.getStr(paramMap.get("delstatue"));
        if (!StringUtil.isNullOrWhiteSpace(id) && !StringUtil.isNullOrWhiteSpace(value)) {
            t_MasterplateService.changeStatue(id, value);
            return ResultJO.getDefaultResult(null, "保存成功！");
        }

        return ResultJO.getErrorResult(null, "保存失败！");
    }


    /**
     * 新增模版基本信息
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveBaseInfo(@RequestBody T_Masterplate t_masterplate, HttpSession session) {
        if (t_masterplate != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            //当前用户主键
            t_masterplate.setAdder(loginUserInf.getCurrentUserId());
            //当前用户所属主键
            t_masterplate.setAdderdeptid(loginUserInf.getCurrentDeptId());
            t_masterplate.setAddtime(new Date());
            t_masterplate.setDelstatus(0);
            t_MasterplateService.saveOrUpdate(t_masterplate);
            return ResultJO.getDefaultResult(t_masterplate, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 获取当前模版信息
     *
     * @param id
     * @return ResultJO
     */
    @RequestMapping(value = "/loadMasterplateInfo")
    @ResponseBody
    public Map loadMasterplateInfo(@RequestParam(value = "id", required = false) String id) {
        if (!StringUtil.isNullOrWhiteSpace(id)) {
            return t_MasterplateService.loadMasterplateInfo(id);
        }
        return null;
    }
}