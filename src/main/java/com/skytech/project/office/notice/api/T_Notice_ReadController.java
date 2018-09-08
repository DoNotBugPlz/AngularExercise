package com.skytech.project.office.notice.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.office.notice.service.IT_Notice_ReadService;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/T_notice_read")
public class T_Notice_ReadController {

    @Resource(name = "t_Notice_ReadService")
    private IT_Notice_ReadService t_Notice_ReadService;

    /**
     * 添加读取通知的用户记录
     *
     * @param object_ids 通知对象的ids="id1,id2,id3"
     * @return ResultJO
     */
    @RequestMapping(value = "/list/is_read")
    @ResponseBody
    public ResultJO readNotices(
            @RequestParam(value = "object_ids", required = false) String object_ids,
            HttpSession session) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        /*当前用户所属主键*/
        Long user_id = loginUserInf.getCurrentUserId();
        return t_Notice_ReadService.readNotices(object_ids, user_id);
    }

    /**
     * 查询本人收到的通知，可以传查询条件
     *
     * @param data_type  通知类型 1 通知公告 2 学习培训 3规章制度
     * @param title      通知名称关键字
     * @param start_time 发布时间的检索开始时间
     * @param end_time   发布时间的检索结束时间
     * @param is_read    是否已读
     * @param pageInfo   pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     * @scope 所有人
     */
    @RequestMapping(value = "/list/self")
    @ResponseBody
    public GridResult searchSelf(@RequestParam(value = "data_type") String data_type,
                                 @RequestParam(value = "title", required = false) String title,
                                 @RequestParam(value = "start_time", required = false) Date start_time,
                                 @RequestParam(value = "end_time", required = false) Date end_time,
                                 @RequestParam(value = "is_read", required = false) String is_read,
                                 PageInfo pageInfo,
                                 HttpServletRequest request) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        /*当前用户所属主键*/
        Long user_id = loginUserInf.getCurrentUserId();
        if (user_id != null && data_type != null) {
            Map map = new HashMap();
            map.put("serch_data_type", data_type);
            map.put("search_title", title);
            map.put("search_start_time", start_time);
            map.put("search_end_time", end_time);
            map.put("search_is_read", is_read);
            map.put("user_id", user_id);
            return t_Notice_ReadService.searchSelf(pageInfo, map);
        }
        return GridResult.getEmptyResult();
    }

}