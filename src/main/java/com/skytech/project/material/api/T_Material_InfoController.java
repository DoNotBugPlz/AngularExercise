package com.skytech.project.material.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.JSONUtil;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.project.material.model.T_Material_Info;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.material.service.IT_Material_InfoService;

import java.util.*;

@Controller
@RequestMapping("/T_material_info")
public class T_Material_InfoController {

    @Resource(name = "t_Material_InfoService")
    private IT_Material_InfoService t_Material_InfoService;

    @Resource(name = "userService")
    private IUserService userService;


    /**
     * 查询监测材料列表
     *
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope 监测机构
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public ResultJO search(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "clattachstatus", required = false) String clattachstatus,
            @RequestParam(value = "start_time", required = false) String start_time,
            @RequestParam(value = "end_time", required = false) String end_time,
            PageInfo pageInfo,
            HttpServletRequest request) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        /*当前用户所属主键*/
        Long add_dept_id = loginUserInf.getCurrentDeptId();
        Map map = new HashMap();
        map.put("search_keyword", keyword);
        map.put("clattachstatus", clattachstatus);
        map.put("search_start_time", start_time);
        map.put("search_end_time", end_time);
        map.put("search_add_dept_id", add_dept_id);
        return t_Material_InfoService.search(pageInfo, map);
    }

    /**
     * 新增或修改一个监测材料
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody T_Material_Info t_material_info, HttpSession session) {
        if (t_material_info != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            //当前用户主键
            t_material_info.setAdder(loginUserInf.getCurrentUserId());
            //当前用户所属主键
            t_material_info.setAdderdeptid(loginUserInf.getCurrentDeptId());
            t_material_info.setAddtime(new Date());
            t_material_info.setDelstatus(0);
            t_Material_InfoService.saveOrUpdate(t_material_info);
            return ResultJO.getDefaultResult(t_material_info, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 单个、批量删除
     * 添加删除标识
     *
     * @param paramMap ids="id1,id2"
     * @return ResultJO
     */
    @RequestMapping(value = "/list/del", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO delList(@RequestBody Map paramMap) {
        String ids = StringUtil.getStr(paramMap.get("material_ids"));
        String noWhiteSpaceIds = StringUtil.trimAllWhitespace(ids);
        if (StringUtil.hasLength(noWhiteSpaceIds)) {
            t_Material_InfoService.delList(StringUtil.makeListFromString(noWhiteSpaceIds, ",", String.class));
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "删除失败！");
    }

    /**
     * 获取当前材料
     *
     * @param materialId 材料id
     * @return ResultJO
     */
    @RequestMapping(value = "/loadMaterial")
    @ResponseBody
    public ResultJO loadForm(@RequestParam(value = "id", required = false) String materialId) {
        if (StringUtil.isNullOrWhiteSpace(materialId)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        return ResultJO.getDefaultResult(t_Material_InfoService.get(materialId));
    }



    /**
     * 查询监测材料报送列表
     *
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope 监测机构
     */
    @RequestMapping(value = {"/submissionList"})
    @ResponseBody
    public ResultJO submissionList(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "clattachstatus", required = false) String clattachstatus,
            @RequestParam(value = "clattachtype", required = false) String clattachtype,
            @RequestParam(value = "start_time", required = false) String start_time,
            @RequestParam(value = "end_time", required = false) String end_time,
            PageInfo pageInfo,
            HttpServletRequest request) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        /*当前用户所属主键*/
        Long add_dept_id = loginUserInf.getCurrentDeptId();
        Map map = new HashMap();
        map.put("search_keyword", keyword);
        map.put("clattachstatus", clattachstatus);
        map.put("clattachtype", clattachtype);
        map.put("search_start_time", start_time);
        map.put("search_end_time", end_time);
        map.put("search_add_dept_id", add_dept_id);
        return t_Material_InfoService.submissionList(pageInfo, map);
    }

}