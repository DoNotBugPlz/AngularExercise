/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.api;

import com.google.common.collect.Maps;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_CollectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_fine_collect")
public class T_Fine_CollectController {

    @Resource(name = "t_Fine_CollectService")
    private IT_Fine_CollectService t_Fine_CollectService;

    @RequestMapping(value = "/cancel/collct")
    @ResponseBody
    public ResultJO cancelCollctData(@RequestParam(value = "ids") String ids,
                                     HttpSession session) {
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        HashMap params = Maps.newHashMap();
        params.put("user_id", loginUserInf.getCurrentUserId());
        params.put("ids", ids);
        return ResultJO.getDefaultResult(t_Fine_CollectService.cancelCollctData(params));
    }

    @RequestMapping(value = "/add/collct")
    @ResponseBody
    public ResultJO addCollctData(@RequestParam(value = "ids") String ids,
                                  HttpSession session) {
        if (ids != null) {
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            return ResultJO.getDefaultResult(t_Fine_CollectService.addCollctData(loginUserInf.getCurrentUserId(), ids));
        }
        return ResultJO.getErrorResult("请选择记录！");
    }
}