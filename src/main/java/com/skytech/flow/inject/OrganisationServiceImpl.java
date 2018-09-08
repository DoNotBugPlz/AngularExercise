package com.skytech.flow.inject;

import com.google.common.collect.Lists;
import com.skytech.datasprovider.service.IOrganisationDatasProvider;
import com.skytech.organisation.model.Sys_Roles;
import com.skytech.organisation.model.Sys_User;
import com.skytech.flow.agent.service.IT_Agent_UserService;
import com.skytech.skyflow.injected.SkyflowOrganisationService;
import com.skytech.skyflow.user.SkyflowRole;
import com.skytech.skyflow.user.SkyflowUser;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Administrator on 2017/8/26.
 */
public class OrganisationServiceImpl implements SkyflowOrganisationService {

    @Resource(name = "organisationDatasProvider")
    private IOrganisationDatasProvider organisationDatasProvider;

    @Resource(name = "t_Agent_UserService")
    private IT_Agent_UserService agencyUserService;

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @Override
    public SkyflowUser getCurrentLoginUser(HttpServletRequest request) {
        Sys_User sys_user = organisationDatasProvider.getCurrentLoginUser(request.getSession());
        SkyflowUser skyflowUser = new SkyflowUser();
        skyflowUser.setLoginName(sys_user.getLoginname());
        skyflowUser.setMail(sys_user.getMail());
        skyflowUser.setChinaName(sys_user.getChinaname());
        return skyflowUser;
    }

    /**
     * 获取当前登录用户的登录名
     *
     * @param request
     * @return
     */
    @Override
    public String getCurrentLoginName(HttpServletRequest request) {
        return organisationDatasProvider.getCurrentLoginUser(request.getSession()).getLoginname();
    }

    @Override
    public String getCnNameByLoginName(String loginName) {
        String userId = organisationDatasProvider.getUserIdWithLoginCode(loginName);
        return organisationDatasProvider.getUser(userId).getChinaname();
    }

    /**
     * 获取当前用户名的角色名字符串，多个以","隔开
     *
     * @param loginName 登录名
     * @return
     */
    @Override
    public List<String> getPersonRoleNames(String loginName) {
        return organisationDatasProvider.getPersonRoleNames(loginName);
    }

    /**
     * 根据用户中文名获取用户列表
     *
     * @param userCNName
     * @return
     */
    @Override
    public List<SkyflowUser> getUsersByCNName(String userCNName) {
        List<Sys_User> users = organisationDatasProvider.getUsersByCNName(userCNName);
        List<SkyflowUser> skyflowUsers = Lists.newArrayList();
        SkyflowUser skyflowUser;
        for (Sys_User user : users) {
            skyflowUser = new SkyflowUser();
            skyflowUser.setLoginName(user.getLoginname());
            skyflowUser.setMail(user.getMail());
            skyflowUser.setChinaName(user.getChinaname());
            skyflowUsers.add(skyflowUser);
        }
        return skyflowUsers;
    }

    /**
     * 根据角色中文名获取角色列表
     *
     * @param roleCNName
     * @return
     */
    @Override
    public List<SkyflowRole> getRolesByCNName(String roleCNName) {
        List<Sys_Roles> roles = organisationDatasProvider.getRolesByCNName(roleCNName);
        List<SkyflowRole> skyflowRoles = Lists.newArrayList();
        SkyflowRole skyflowRole;
        for (Sys_Roles role : roles) {
            skyflowRole = new SkyflowRole();
            skyflowRole.setChinaName(role.getChinaname());
            skyflowRoles.add(skyflowRole);
        }
        return skyflowRoles;
    }

    /**
     * 根据代理人查询其委托人
     *
     * @param agent 代理人
     * @return 委托人集合
     */
    @Override
    public List<String> getPrincipals(String agent) {
        return agencyUserService.getPrincipalsBetweenEffectiveTime(agent);
    }

    /**
     * 检查代理委托关系
     *
     * @param agent     代理人
     * @param principal 委托人
     * @return
     */
    @Override
    public boolean existAgentPrincipalRelation(String agent, String principal) {
        long result = agencyUserService.countAgentAndPrincipal(agent, principal);
        if (result > 0) {
            return true;
        }
        return false;
    }
}
