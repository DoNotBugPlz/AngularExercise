package com.skytech.project.shortcutmenu.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.shortcutmenu.model.ShortcutPanelModel;
import com.skytech.project.shortcutmenu.model.T_Shortcut_Menu;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.project.shortcutmenu.service.IT_Shortcut_MenuService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
@RequestMapping("/T_shortcut_menu")
public class T_Shortcut_MenuController {

    @Resource(name = "t_Shortcut_MenuService")
    private IT_Shortcut_MenuService t_Shortcut_MenuService;


    /**
     * 添加或移除
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody ShortcutPanelModel params, HttpSession session) {
        //获取当前登录用户信息
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        //删除用户旧的快捷菜单数据
        t_Shortcut_MenuService.delOldshortcut(loginUserInf.getCurrentUserId());
        if (params != null) {
            //保存当前选择的新快捷菜单数据
            T_Shortcut_Menu t_shortcut_menu = new T_Shortcut_Menu();
            for (int i = 0; i < params.getList().size(); i++) {
                //当前用户主键
                t_shortcut_menu.setAdder(loginUserInf.getCurrentUserId());
                //当前用户所属主键
                t_shortcut_menu.setAdderdeptid(loginUserInf.getCurrentDeptId());
                t_shortcut_menu.setAddtime(new Date());
                t_shortcut_menu.setDelstatus(0);
                t_shortcut_menu.setUser_id(loginUserInf.getCurrentUserId());
                t_shortcut_menu.setMenu_id(params.getList().get(i).getMenu_id());
                t_Shortcut_MenuService.save(t_shortcut_menu);
            }
            return ResultJO.getDefaultResult(t_shortcut_menu, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }


}