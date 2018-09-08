package com.skytech.project.material.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.organisation.service.IUserService;
import com.skytech.project.material.model.MaterialPanelModel;
import com.skytech.project.material.model.T_Material_Info;
import com.skytech.project.material.model.T_Material_Submission;
import com.skytech.project.material.service.IT_Material_InfoService;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.material.service.IT_Material_SubmissionService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_material_submission")
public class T_Material_SubmissionController {

    @Resource(name = "t_Material_SubmissionService")
    private IT_Material_SubmissionService t_Material_SubmissionService;

    @Resource(name = "t_Material_InfoService")
    private IT_Material_InfoService t_Material_InfoService;

    /**
     * 报送一个监测材料
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody MaterialPanelModel params, HttpSession session) {
        T_Material_Submission t_material_submission = params.getT_material_submission();
        if (params != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            //当前用户主键
            t_material_submission.setSubmission_user_name(loginUserInf.getCurrentUserId());
            //当前用户所属主键
            t_material_submission.setSubmissiondeptid(loginUserInf.getCurrentDeptId());
            t_material_submission.setSubmission_time(new Date());
            t_Material_SubmissionService.saveOrUpdate(t_material_submission);
            return ResultJO.getDefaultResult(t_material_submission, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 获取当前材料
     *
     * @param submissionId 报送id
     * @param materialId   材料id
     * @return ResultJO
     */
    @RequestMapping(value = "/loadMaterial")
    @ResponseBody
    public ResultJO loadForm(@RequestParam(value = "submissionid", required = false) String submissionId,
                             @RequestParam(value = "materialid", required = false) String materialId) {
        if (StringUtil.isNullOrWhiteSpace(materialId) && StringUtil.isNullOrWhiteSpace(submissionId)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        MaterialPanelModel pm = new MaterialPanelModel();
        if (!StringUtil.isNullOrWhiteSpace(materialId)) {
            pm.setT_material_info(t_Material_InfoService.get(materialId));
        }
        if (!StringUtil.isNullOrWhiteSpace(submissionId)) {
            pm.setT_material_submission(t_Material_SubmissionService.get(submissionId));
        }
        return ResultJO.getDefaultResult(pm);
    }


}