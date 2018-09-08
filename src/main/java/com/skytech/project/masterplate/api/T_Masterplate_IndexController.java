package com.skytech.project.masterplate.api;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.masterplate.model.Meterial_S_panel;
import com.skytech.project.masterplate.model.T_Masterplate_Index;
import com.skytech.project.masterplate.service.IT_Masterplate_IndexService;
import com.skytech.project.material.model.T_Material_Info;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/T_masterplate_index")
public class T_Masterplate_IndexController {

    @Resource(name = "t_Masterplate_IndexService")
    private IT_Masterplate_IndexService t_Masterplate_IndexService;


    /**
     * 走势列表
     *
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public ResultJO search(PageInfo pageInfo, HttpServletRequest request) {
        return t_Masterplate_IndexService.search(pageInfo);
    }

    /**
     * 删除
     * 添加删除标识
     *
     * @param paramMap ids="id1,id2"
     * @return ResultJO
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO delList(@RequestBody Map paramMap) {
        String ids = StringUtil.getStr(paramMap.get("trendIds"));
        String noWhiteSpaceIds = StringUtil.trimAllWhitespace(ids);
        if (StringUtil.hasLength(noWhiteSpaceIds)) {
            t_Masterplate_IndexService.delList(StringUtil.makeListFromString(noWhiteSpaceIds, ",", String.class));
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "删除失败！");
    }


    /**
     * 编辑修改
     *
     * @return
     */
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO editForm(@RequestBody Meterial_S_panel param, HttpSession session) {
        if (param != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            T_Masterplate_Index t_masterplate_index = param.getT_masterplate_index();
            //先删除之前的所有子走势
            t_Masterplate_IndexService.delTrend(t_masterplate_index.getId().toString());
            List<T_Masterplate_Index> childList = param.getT_masterplate_indexList();
            if (childList.size() > 0) {
                //再循环新增新的子走势
                return t_Masterplate_IndexService.updateChildren(loginUserInf, childList);
            } else {
                return ResultJO.getDefaultResult(t_masterplate_index, "保存成功！");
            }
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 新增保存
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody Meterial_S_panel param, HttpSession session) {
        if (param != null) {
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            //先保存父级走势
            T_Masterplate_Index t_masterplate_index = param.getT_masterplate_index();
            //当前用户主键
            t_masterplate_index.setAdder(loginUserInf.getCurrentUserId());
            //当前用户所属主键
            t_masterplate_index.setAdderdeptid(loginUserInf.getCurrentDeptId());
            t_masterplate_index.setAddtime(new Date());
            t_masterplate_index.setDelstatus(0);
            t_masterplate_index.setParent_id(0L);
            //得到parentId
            T_Masterplate_Index parentObj = t_Masterplate_IndexService.save(t_masterplate_index);
            Long parentId = parentObj.getId();
            List<T_Masterplate_Index> childList = param.getT_masterplate_indexList();
            if (childList.size() > 0) {
                //再循环新增子走势
                return t_Masterplate_IndexService.saveChildren(loginUserInf, parentId, childList);
            } else {
                return ResultJO.getDefaultResult(t_masterplate_index, "保存成功！");
            }
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

}