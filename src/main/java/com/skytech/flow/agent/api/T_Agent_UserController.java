package com.skytech.flow.agent.api;

import javax.annotation.Resource;

import com.google.common.base.Strings;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.flow.agent.model.T_Agent_User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.flow.agent.service.IT_Agent_UserService;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_agent_user")
public class T_Agent_UserController {

    @Resource(name = "t_Agent_UserService")
    private IT_Agent_UserService t_Agent_UserService;

    /**
     * 获得所有代理人列表
     *
     * @param agentChinaName     代理人
     * @param principalChinaName 委托人
     * @param pageInfo           分页信息
     * @return
     */
    @RequestMapping(value = "/agentUsers", method = RequestMethod.GET)
    @ResponseBody
    public GridResult listAll(@RequestParam(value = "agentChinaName", required = false) String agentChinaName,
                              @RequestParam(value = "principalChinaName", required = false) String principalChinaName,
                              PageInfo pageInfo) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("agentChinaName", agentChinaName);
        params.put("principalChinaName", principalChinaName);
        return t_Agent_UserService.listAllAgentUsers(params, pageInfo);
    }

    /**
     * 获得指定代理人信息
     *
     * @param id 代理人标识
     * @return
     */
    @RequestMapping(value = "/agentUsers/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResultJO getBy(@PathVariable("id") String id) {

        return ResultJO.getDefaultResult(t_Agent_UserService.get(id), "获取成功");
    }

    /**
     * 新增或修改代理人
     *
     * @param agentUser 代理信息
     * @return
     */
    @RequestMapping(value = "/agentUsers/createOrUpdate",method =  RequestMethod.POST)
    @ResponseBody
    public ResultJO createOrUpdate(@RequestBody T_Agent_User agentUser) {
        if (Strings.isNullOrEmpty(agentUser.getStatus())) {
            agentUser.setStatus("1");
        }
        T_Agent_User savedAgentUser = t_Agent_UserService.saveOrUpdateWithNotNullProperties(agentUser);
        return ResultJO.getDefaultResult(savedAgentUser, "保存成功");
    }

    /**
     * 删除指定代理人
     *
     * @param id 代理人标识
     * @return
     */
    @RequestMapping(value = "/agentUsers/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResultJO deleteBy(@PathVariable("id") String id) {
        t_Agent_UserService.destroy(id);
        return ResultJO.getDefaultResult(id, "删除成功");
    }

}