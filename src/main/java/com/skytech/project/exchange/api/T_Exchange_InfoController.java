package com.skytech.project.exchange.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.exchange.model.T_Exchange_Info;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.exchange.service.IT_Exchange_InfoService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_exchange_info")
public class T_Exchange_InfoController {

    @Resource(name = "t_Exchange_InfoService")
    private IT_Exchange_InfoService t_Exchange_InfoService;


    /**
     * 查询互动交流列表
     *
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public ResultJO search(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "question", required = false) String question,
            @RequestParam(value = "answer_status", required = false) String answer_status,
            @RequestParam(value = "question_start_time", required = false) String question_start_time,
            @RequestParam(value = "question_end_time", required = false) String question_end_time,
            @RequestParam(value = "answer_start_time", required = false) String answer_start_time,
            @RequestParam(value = "answer_end_time", required = false) String answer_end_time,
            @RequestParam(value = "answer", required = false) String answer,
            PageInfo pageInfo,
            HttpServletRequest request) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        /*当前用户所属主键*/
        Long add_dept_id = loginUserInf.getCurrentDeptId();
        Map map = new HashMap();
        map.put("search_keyword", keyword);
        map.put("question", question);
        map.put("answer_status", answer_status);
        map.put("question_start_time", question_start_time);
        map.put("question_end_time", question_end_time);
        map.put("answer_start_time", answer_start_time);
        map.put("answer_end_time", answer_end_time);
        map.put("answer", answer);
        map.put("search_add_dept_id", add_dept_id);
        return t_Exchange_InfoService.search(pageInfo, map);
    }

    /**
     * 新增
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody T_Exchange_Info t_exchange_info, HttpSession session) {
        if (t_exchange_info != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            //当前用户主键
            t_exchange_info.setAdder(loginUserInf.getCurrentUserId());
            //当前用户所属主键
            t_exchange_info.setAdderdeptid(loginUserInf.getCurrentDeptId());
            t_exchange_info.setAddtime(new Date());
            t_exchange_info.setDelstatus(0);
            t_exchange_info.setAnswer_status(0);
            t_Exchange_InfoService.saveOrUpdate(t_exchange_info);
            return ResultJO.getDefaultResult(t_exchange_info, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 回复
     *
     * @return
     */
    @RequestMapping(value = "/answer", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO answer(@RequestBody T_Exchange_Info t_exchange_info, HttpSession session) {
        if (t_exchange_info != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);

            //当前用户主键
            t_exchange_info.setAdder(loginUserInf.getCurrentUserId());
            t_exchange_info.setAnswer_user_id(loginUserInf.getCurrentUserId());
            t_exchange_info.setAnswer_user_name(loginUserInf.getSys_User().getChinaname());
            //当前用户所属主键
            t_exchange_info.setAdderdeptid(loginUserInf.getCurrentDeptId());
            t_exchange_info.setAnswer_dept_id(loginUserInf.getCurrentDeptId());
            t_exchange_info.setAnswer_dept_name(loginUserInf.getSys_User().getDeptName());
            t_exchange_info.setAddtime(new Date());
            t_exchange_info.setAnswer_time(new Date());
            t_exchange_info.setAnswer_status(1);
            t_Exchange_InfoService.saveOrUpdate(t_exchange_info);
            return ResultJO.getDefaultResult(t_exchange_info, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 单个删除
     * 添加删除标识
     *
     * @param paramMap ids="id1,id2"
     * @return ResultJO
     */
    @RequestMapping(value = "/list/del", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO delList(@RequestBody Map paramMap) {
        String ids = StringUtil.getStr(paramMap.get("exchange_ids"));
        String noWhiteSpaceIds = StringUtil.trimAllWhitespace(ids);
        if (StringUtil.hasLength(noWhiteSpaceIds)) {
            t_Exchange_InfoService.delList(StringUtil.makeListFromString(noWhiteSpaceIds, ",", String.class));
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "删除失败！");
    }

    /**
     * 获取当前交流信息
     *
     * @param exchangeId 材料id
     * @return ResultJO
     */
    @RequestMapping(value = "/loadExchange")
    @ResponseBody
    public ResultJO loadForm(@RequestParam(value = "id", required = false) Long exchangeId) {
        if (exchangeId == null) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        return ResultJO.getDefaultResult(t_Exchange_InfoService.get(exchangeId));
    }


}