package com.skytech.project.notice.api;

import com.skytech.project.notice.service.INoticeService;
import com.skytech.project.notice.model.Notice;
import com.skytech.project.notice.model.NoticePanelModel;
import com.skytech.project.notice.dao.INoticeDao;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.dataprivilege.annotation.DataPrivilege;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zjb
 * @category 通知相关操作控制类
 */
@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Resource(name = "noticeService")
    private INoticeService noticeService;

    @Resource(name = "noticeDao")
    private INoticeDao noticeDao;

    /**
     * 查询通知列表，可以传查询条件
     *
     * @param pageInfo   分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public GridResult search(@RequestParam(value="keyword",required=false) String keyword,
                             @RequestParam(value="is_public",required=false) String is_public,
                             PageInfo pageInfo) {
        Map map  = new HashMap();
        map.put("keyword",keyword);
        map.put("is_public",is_public);
        return noticeService.search(pageInfo, map);
    }

    /**
     * 获取当前通知(多表)
     * @return 当前部门
     */
    @RequestMapping(value = "/loadNotice")
    @ResponseBody
    public ResultJO loadForm( @RequestParam(value="id",required=false) String noticeId) {
        if (StringUtil.isNullOrWhiteSpace(noticeId)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        return ResultJO.getDefaultResult(noticeService.get(noticeId));
    }

    /**
     * 新增或修改一个通知
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody Notice notice) {
        if (notice != null) {
            if(notice.getDelstatus() == null) {
                notice.setDelstatus(0);
            }
            noticeService.saveOrUpdate(notice);
            return ResultJO.getDefaultResult(notice, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 批量销毁通知
     * @return
     */
    @RequestMapping(value="/list/destroy",method = RequestMethod.POST)
    @ResponseBody
    public ResultJO destroyList(@RequestBody Map paramMap) {
        String ids =StringUtil.getStr(paramMap.get("ids")) ;
        String noWhiteSpaceIds = StringUtils.trimAllWhitespace(ids);
        if (StringUtils.hasLength(noWhiteSpaceIds)) {
            noticeService.destroyList(StringUtil.makeListFromString(noWhiteSpaceIds, ",", String.class));//物理删除
            return ResultJO.getDefaultResult(null, "删除成功！");
        }
        return ResultJO.getErrorResult(null, "请至少选择一个通知！");
    }


}
