/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.api;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.organisation.model.Cf_Dept_Ext;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.organisation.service.ICf_Dept_ExtService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Model_Params;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_Model_ParamsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/T_fine_model_params")
public class T_Fine_Model_ParamsController {

    @Resource(name = "t_Fine_Model_ParamsService")
    private IT_Fine_Model_ParamsService t_Fine_Model_ParamsService;
    @Resource(name = "cf_Dept_ExtService")
    private ICf_Dept_ExtService cf_Dept_ExtService;


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody T_Fine_Model_Params t_fine_model_params, HttpSession session) {
        if (t_fine_model_params != null) {

            LoginUserInf u = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            if (t_fine_model_params.getId() != u.getCurrentUserId()) {
                t_fine_model_params.setId(null);
                t_fine_model_params.setUser_id(u.getCurrentUserId());
            }
            t_fine_model_params = t_Fine_Model_ParamsService.saveOrUpdateWithNotNullProperties(t_fine_model_params);
            return ResultJO.getDefaultResult(t_fine_model_params);
        }
        return ResultJO.getErrorResult(null);
    }

    /**
     * 获取当前模板的查询条件数据
     * 如果当前用户没有模板查询条件数据，
     * 会查找模板创建人的查询条件数据
     *
     * @param config_id 模板编号
     * @param session
     * @return
     */
    @RequestMapping(value = "/load/selft")
    @ResponseBody
    public GridResult getSelfParams(@RequestParam(value = "config_id") Long config_id, HttpSession session) {
        if (config_id != null && config_id > 0) {
            LoginUserInf u = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            Cf_Dept_Ext cf_dept_ext = cf_Dept_ExtService.get(u.getCurrentDeptId());
            List<Long> areaChild = cf_Dept_ExtService.getChildren(cf_dept_ext.getArea_id());
            return t_Fine_Model_ParamsService.getSelfParams(config_id, u.getCurrentUserId(), areaChild);
        }
        return GridResult.getEmptyResult();
    }


}