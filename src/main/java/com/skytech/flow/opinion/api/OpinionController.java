package com.skytech.flow.opinion.api;

import com.google.common.base.Strings;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.datasprovider.service.IOrganisationDatasProvider;
import com.skytech.organisation.model.Sys_User;
import com.skytech.flow.opinion.model.Opinion;
import com.skytech.flow.opinion.service.IOpinionService;
import com.skytech.skyflow.injected.SkyflowOrganisationService;
import com.skytech.skyflow.task.SkyflowTaskService;
import org.flowable.engine.TaskService;
import org.flowable.engine.task.Task;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.Map;

/**
 * Created by fengxiangxiang on 2017/8/16.
 * 审核意见资源类
 */
@Controller
public class OpinionController {

    @Resource(name = "opinionService")
    private IOpinionService opinionService;

    @Resource(name = "organisationDatasProvider")
    private IOrganisationDatasProvider organisationDatasProvider;

    @Resource(name = "skyflowTaskService")
    private SkyflowTaskService skyflowTaskService;

    @Resource(name = "taskService")
    private TaskService taskService;

    @Resource(name = "skyflowOrganisationService")
    private SkyflowOrganisationService skyflowOrganisationService;

    /**
     * 填写审核意见
     *
     * @param opinion 审核意见请求体
     * @param session
     * @return
     */
    @RequestMapping(value = "/opinions/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO fillOpinion(@RequestBody Opinion opinion, HttpSession session) {
        if (skyflowTaskService.checkTaskIsComplete(opinion.getTaskId())) {
            return ResultJO.getErrorResult(opinion.getId(), "意见已保存，请勿重复操作");
        }
        String currentUserLoginName = organisationDatasProvider.getCurrentLoginUser(session).getLoginname();
        String currentUserName = organisationDatasProvider.getCurrentLoginUser(session).getChinaname();

        Task task = taskService.createTaskQuery().taskId(opinion.getTaskId()).singleResult();
        String assigneeLoginName = task.getAssignee();
        String assigneeUserId = organisationDatasProvider.getUserIdWithLoginCode(assigneeLoginName);
        Sys_User assigneeUser = organisationDatasProvider.getUser(assigneeUserId);
        String assigneeName = assigneeUser.getChinaname();

        if (Strings.isNullOrEmpty(assigneeLoginName)) {
            opinion.setLoginName(currentUserLoginName);
            opinion.setName(currentUserName);
        }

        if (!Strings.isNullOrEmpty(assigneeLoginName) && currentUserLoginName.equals(assigneeLoginName)) {
            opinion.setLoginName(assigneeLoginName);
            opinion.setName(assigneeName);
        }
        //查询当前用户是否为办理人的代理人
        if (!Strings.isNullOrEmpty(assigneeLoginName) && !currentUserLoginName.equals(assigneeLoginName) && skyflowOrganisationService.existAgentPrincipalRelation(currentUserLoginName, assigneeLoginName)) {
            opinion.setLoginName(assigneeLoginName);
            opinion.setName(assigneeName + "(" + currentUserName + "代)");
        }
        opinion.setTime(new Date());
        Opinion savedOpinion = opinionService.saveOrUpdateWithNotNullProperties(opinion);
        return ResultJO.getDefaultResult(savedOpinion, "保存成功");
    }

    /**
     * 获得指定流程审核意见
     *
     * @param processInsId 任务标识
     * @return 指定流程审核意见
     */
    @RequestMapping(value = "/opinions/{processInsId}", method = RequestMethod.GET)
    @ResponseBody
    public ResultJO getBy(@PathVariable("processInsId") String processInsId) {
        return ResultJO.getDefaultResult(opinionService.getBy(processInsId), "获取成功");
    }

    /**
     * 根据任务办理人获取指定流程指定任务的意见
     *
     * @param processInsId 流程标识
     * @param taskId       任务标识
     * @param session
     * @return
     */
    @RequestMapping(value = "/opinions/{processInsId}/{taskId}", method = RequestMethod.GET)
    @ResponseBody
    public ResultJO getCurrentUserOpinion(@PathVariable("processInsId") String processInsId,
                                          @PathVariable("taskId") String taskId, HttpSession session) {
        Map<String, Object> opinion;
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task==null) {
            return ResultJO.getDefaultResult(taskId, "获取意见失败");
        }
        String assigneeLoginName = task.getAssignee();
        opinion = opinionService.getCurrentUserOpinion(processInsId, taskId, assigneeLoginName);
        return ResultJO.getDefaultResult(opinion, "获取成功");
    }

}
