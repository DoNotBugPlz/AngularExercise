package com.skytech.config.session;

import com.skytech.authenticater.authenticate.Authenticater;
import com.skytech.authenticater.extend.ExtendsCookie;
import com.skytech.authenticater.extend.ExtendsSession;
import com.skytech.basic.core.constants.CommonParam;
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
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

/**
 * Created by yzr on 2017/7/21.
 */
public class ExtendsCookieImp implements ExtendsCookie {
    @Resource(name="authenticater")
    private Authenticater authenticater;
    @Override
    public void extendsCookie(String loginKey, HttpServletRequest request,HttpServletResponse response) {
        HttpSession session = request.getSession();
        LoginUserInf loginUserInf =(LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        if(loginUserInf==null||loginUserInf.getCurrentUserId()==null){//登录用户失败
            authenticater.destroyClient(loginKey,response);
            session.invalidate();
        }

    }

}
