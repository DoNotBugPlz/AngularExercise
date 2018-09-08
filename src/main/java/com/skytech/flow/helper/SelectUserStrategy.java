package com.skytech.flow.helper;

import com.skytech.datasprovider.service.IOrganisationDatasProvider;
import com.skytech.organisation.model.Sys_Dept;
import com.skytech.organisation.model.Sys_User;
import org.flowable.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by fengxiangxiang on 2017/8/22.
 * 选人策略资源类
 */
@Component("selectUserStrategy")
public class SelectUserStrategy {

    @Resource(name = "organisationDatasProvider")
    private IOrganisationDatasProvider organisationDatasProvider;

    /**
     * 实际申请人所在部门的领导
     *
     * @param execution
     * @return
     */
    public String setAssigneeToDeptLeader(DelegateExecution execution) {
        String userId = organisationDatasProvider.getUserIdWithLoginCode(execution.getVariable("loginName").toString());
        String dptId = organisationDatasProvider.getDeptIdByUserId(userId);
        Sys_Dept sys_dpt = organisationDatasProvider.getDept(dptId);
        Sys_User sys_user = organisationDatasProvider.getUser(sys_dpt.getDeptleaders());
        return sys_user.getLoginname();
    }
}
