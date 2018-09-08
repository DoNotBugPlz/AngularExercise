package com.skytech.project.office.notice.api;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.BeanUtilsExtend;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.platform.menus.service.ISys_Menu_ExtService;
import com.skytech.project.office.notice.model.T_Notice;
import com.skytech.project.office.notice.service.IT_NoticeService;
import com.skytech.project.office.notice.service.IT_Notice_ObjectService;
import com.skytech.project.office.notice.service.IT_Notice_ReadService;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.organisation.service.ICf_Dept_ExtService;
import com.skytech.util.ParamsUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
@Controller
@RequestMapping("/T_notice")
public class T_NoticeController {

    @Resource(name = "t_NoticeService")
    private IT_NoticeService t_NoticeService;

    @Resource(name = "t_Notice_ReadService")
    private IT_Notice_ReadService t_Notice_ReadService;
    @Resource(name = "t_Notice_ObjectService")
    private IT_Notice_ObjectService t_notice_objectService;
    @Resource(name = "cf_Dept_ExtService")
    private ICf_Dept_ExtService cf_Dept_ExtService;

    /**
     * 查询通知列表，可以传查询条件
     *
     * @param data_type  通知类型 1 通知公告 2 学习培训 3规章制度
     * @param keyword    名称关键字
     * @param is_public  发布类型
     * @param start_time 发布时间的检索开始时间
     * @param end_time   发布时间的检索结束时间
     * @param pageInfo   分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope 监测机构
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public ResultJO search(@RequestParam(value = "data_type") String data_type,
                           @RequestParam(value = "keyword", required = false) String keyword,
                           @RequestParam(value = "is_public", required = false) String is_public,
                           @RequestParam(value = "start_time", required = false) Date start_time,
                           @RequestParam(value = "end_time", required = false) Date end_time,
                           PageInfo pageInfo,
                           HttpServletRequest request) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        /*当前用户所属主键*/
        Long adderdeptid = loginUserInf.getCurrentDeptId();
        Map map = new HashMap();
        map.put("serch_data_type", data_type);
        map.put("search_keyword", keyword);
        map.put("search_is_public", is_public);
        map.put("search_start_time", start_time);
        map.put("search_end_time", end_time);
        map.put("search_adderdeptid", adderdeptid);
        return t_NoticeService.search(pageInfo, map);
    }


    /**
     * 新增或修改一个通知
     *
     * @param params  通知公告的module
     * @param request
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody Map params,
                             HttpServletRequest request) {
        if (params != null) {
            T_Notice t_notice = new T_Notice();
            String notice_id;
            String user_ids = StringUtil.getStr(params.get("user_ids"));
            ParamsUtil.removeNull(params);
            BeanUtilsExtend.copyMapToProperties(params, t_notice);
            //获取当前登录用户信息
            LoginUserInf loginUserInf = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            if (StringUtil.isNullOrWhiteSpace(StringUtil.getStr(t_notice.getId()))) {
                //当前用户主键
                t_notice.setAdder(loginUserInf.getCurrentUserId());
                //当前用户所属主键
                t_notice.setAdderdeptid(loginUserInf.getCurrentDeptId());
                t_notice.setAddtime(new Date());
                notice_id = t_NoticeService.save(t_notice).getId();
                t_notice_objectService.saveObjects(user_ids, notice_id);

            } else {
                t_NoticeService.saveOrUpdate(t_notice);
                notice_id = t_notice.getId();
                t_notice_objectService.updateObjects(user_ids, notice_id);
            }
            return ResultJO.getDefaultResult(notice_id);
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 获取当前通知(多表)
     *
     * @param noticeId 通知编号
     * @return ResultJO
     */
    @RequestMapping(value = "/loadNotice")
    @ResponseBody
    public ResultJO loadForm(@RequestParam(value = "id", required = false) String noticeId) {
        if (StringUtil.isNullOrWhiteSpace(noticeId)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        HashMap<String, Object> resultMap = Maps.newHashMap();
        resultMap.put("notice", t_NoticeService.get(noticeId));
        HashMap<String, Object> params = Maps.newHashMap();
        params.put("notice_id", noticeId);
        resultMap.put("users", t_notice_objectService.getNoticeObjects(params));
        return ResultJO.getDefaultResult(resultMap);
    }


    /**
     * 获取通知对象的树
     * 异步加载
     *
     * @return ResultJO
     */
    @RequestMapping(value = "/tree/object")
    @ResponseBody
    public ResultJO getNoticeObject(@RequestParam(value = "id", required = false) String dept_id,
                                    HttpSession session) {
        LoginUserInf user = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        return t_NoticeService.getNoticeObject(dept_id, user.getCurrentDeptId());
    }

    /**
     * 获取通知对象的树
     * 异步加载
     *
     * @return ResultJO
     */
    @RequestMapping(value = "/tree/object/user")
    @ResponseBody
    public ResultJO getDeptUsers(@RequestParam(value = "dept_id", required = false) Long dept_id,
                                 HttpSession session) {
        if (dept_id != null) {
            return ResultJO.getDefaultResult(t_NoticeService.getDeptUsers(dept_id));
        } else {
            LoginUserInf user = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            return ResultJO.getDefaultResult(t_NoticeService.getDeptUsers(user.getCurrentDeptId()));
        }
    }

    /**
     * 批量销毁通知
     *
     * @param paramMap ids="id1,id2"
     * @return ResultJO
     */
    @RequestMapping(value = "/list/destroy", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO destroyList(@RequestBody Map paramMap) {
        String ids = StringUtil.getStr(paramMap.get("notice_ids"));
        String noWhiteSpaceIds = StringUtil.trimAllWhitespace(ids);
        if (StringUtil.hasLength(noWhiteSpaceIds)) {
            t_NoticeService.destroyList(StringUtil.makeListFromString(noWhiteSpaceIds, ",", String.class));//物理删除
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "请至少选择一个通知！");
    }

    /**
     * 批量删除通知公告、学习培训、规章制度
     * 添加删除标识
     *
     * @param paramMap ids="id1,id2"
     * @return ResultJO
     */
    @RequestMapping(value = "/list/del", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO delList(@RequestBody Map paramMap) {
        String ids = StringUtil.getStr(paramMap.get("notice_ids"));
        String noWhiteSpaceIds = StringUtil.trimAllWhitespace(ids);
        if (StringUtil.hasLength(noWhiteSpaceIds)) {
            t_NoticeService.delList(StringUtil.makeListFromString(noWhiteSpaceIds, ",", String.class));
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "删除失败！");
    }
}