/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.BeanUtilsExtend;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Config;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_ObjectService;
import com.skytech.util.ParamsUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_ConfigService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/T_fine_config")
public class T_Fine_ConfigController {

    @Resource(name = "t_Fine_ConfigService")
    private IT_Fine_ConfigService t_Fine_ConfigService;

    @Resource(name = "t_Fine_ObjectService")
    private IT_Fine_ObjectService t_Fine_ObjectService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody Map params,
                             HttpSession session) {
        ParamsUtil.removeNull(params);
        T_Fine_Config t_fine_config = new T_Fine_Config();
        BeanUtilsExtend.copyMapToProperties(params, t_fine_config);
        if (t_fine_config != null) {
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            t_fine_config.setUser_id(loginUserInf.getCurrentUserId());
            T_Fine_Config result = t_Fine_ConfigService.saveOrUpdateWithNotNullProperties(t_fine_config);
            if (params.get("user_ids") != null) {
                t_Fine_ObjectService.saveAll((List) params.get("user_ids"), t_fine_config.getId());
            }
            return ResultJO.getDefaultResult(result);
        }
        if (StringUtil.isNullOrWhiteSpace(t_fine_config.getName())) {
            return ResultJO.getDefaultResult(null, "保持名称不能为空！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");

    }

    /**
     * @param report .("reportName", "");
     *               .("reportId", "");//模板的id必填
     *               .("createBy", "");//创建者的id必填
     *               .("text", "");//一般与reportName同名
     *               .("description", "");//一般不写
     *               .("parentId", "");//id必填
     * @return
     */
    @RequestMapping(value = "/set/template")
    @ResponseBody
    public ResultJO setTemplate(@RequestParam(value = "report") String report, HttpServletRequest request, HttpServletResponse response) {
        if (!StringUtil.isNullOrWhiteSpace(report)) {
// {"reportName":"2","reportId":210,"createBy":-999,"text":"2","description":"","parentId":"78"}
            return ResultJO.getDefaultResult(t_Fine_ConfigService.setTemplate(report));
        }
        return ResultJO.getErrorResult(null, "失败！");
    }

    @RequestMapping(value = "/del")
    @ResponseBody
    public ResultJO delList(@RequestParam(value = "ids") String ids,
                            HttpSession session) {
        if (ids != null && !StringUtil.isNullOrWhiteSpace(ids)) {
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            return ResultJO.getDefaultResult(t_Fine_ConfigService.delList(loginUserInf.getCurrentUserId(), ids), "删除成功！");
        }
        return ResultJO.getErrorResult(null, "删除失败！");

    }

    /**
     * 根据条件查询所有记录
     *
     * @param params
     * @param pageInfo
     * @param session
     * @return
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public GridResult search(@RequestParam Map params,
                             PageInfo pageInfo,
                             HttpSession session) {
        if (params != null && params.size() != 0) {
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            params.put("user_id", loginUserInf.getCurrentUserId());
            return t_Fine_ConfigService.search(params, pageInfo);
        }
        return GridResult.getEmptyResult();
    }

    /**
     * 查询没有创建fineBI实例的记录,
     * 并在前端创建fineBI实例
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "list/nourl")
    @ResponseBody
    public GridResult searchDataByNoUrl(HttpSession session) {
        Map params = Maps.newHashMap();
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        params.put("user_id", loginUserInf.getCurrentUserId());
        return t_Fine_ConfigService.searchDataByNoUrl(params);
    }
}