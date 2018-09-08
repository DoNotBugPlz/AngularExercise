package com.skytech.config.session;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.skytech.authenticater.authenticate.Authenticater;
import com.skytech.authenticater.extend.ExtendsSession;
import com.skytech.basic.core.constants.CommonParam;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.config.param.SysParam;
import com.skytech.file.util.BeanUtilsExtend;
import com.skytech.menus.service.IMenuOperationService;
import com.skytech.organisation.model.LoginUser;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.project.organisation.model.Cf_User_Ext;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.organisation.service.ICf_User_ExtService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * Created by yzr on 2017/7/21.
 */
public class ExtendsSessionImp implements ExtendsSession {
    @Resource(name="authenticater")
    private Authenticater authenticater;
    @Resource(name = "menuOperationService")
    private IMenuOperationService menuOperationService;
    @Resource(name="userService")
    private IUserService userService;

    @Resource(name="cf_User_ExtService")
    private ICf_User_ExtService cf_User_ExtService;

    @Override
    public void extendsSession(String loginKey, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginUser loginUser =(LoginUser) session.getAttribute(CommonParam.LOGIN_SESSION_NAME);
        LoginUserInf loginUserInf = new LoginUserInf();
        BeanUtilsExtend.copyProperties(loginUser,loginUserInf);
        Sys_User sys_user = null;
        if(loginUser!=null){
            sys_user = loginUser.getSys_User();
        }
        /**
         * 用户信扩充完善
         */
        Cf_User_Ext userExt = cf_User_ExtService.loadCfUserExtBySysUserId(sys_user.getId());
        if(userExt!=null&&userExt.getId()!=null){
            loginUserInf.setCf_sys_User(userExt);
            loginUserInf.setCurrentUserId(userExt.getId());
            loginUserInf.setCurrentDeptId(userExt.getDept_id());

        }
        session.setAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME,loginUserInf);

        /**
         *  保存菜单权限
         */
        String userperm = userService.getCurrentUserPerm(sys_user.getPermstring(),sys_user.getPersonroles());
        session.setAttribute("userperm",userperm);

        /**
         * 初始化用户菜单操作权限
         */
        List<Map<String,Object>> menuOperationList = menuOperationService.getMenuElements(session);
        session.setAttribute("menuelements",menuOperationList);




    }

}
