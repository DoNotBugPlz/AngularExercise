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
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequestMapping("/T_fine_user")
public class T_Fine_UserController {

    @Resource(name = "t_Fine_UserService")
    private IT_Fine_UserService t_Fine_UserService;

    @RequestMapping(value = "/finedata")
    @ResponseBody
    public ResultJO loadUserConfig(HttpSession session) {
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        Map params = Maps.newHashMap();
        params.put("user_id", loginUserInf.getCurrentUserId());
        if (t_Fine_UserService.loadUserConfig(params).size() > 0) {
            return ResultJO.getDefaultResult(t_Fine_UserService.loadUserConfig(params).get(0));
        }
        return ResultJO.getDefaultResult(null);
    }
}