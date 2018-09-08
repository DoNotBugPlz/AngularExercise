package com.skytech.platform.menus.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.menus.model.Sys_Menu;
import com.skytech.menus.service.IMenuService;
import com.skytech.platform.menus.model.MenusExtPanelModel;
import com.skytech.platform.menus.model.Sys_Menu_Ext;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.skytech.platform.menus.service.ISys_Menu_ExtService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/Sys_menu_ext")
public class Sys_Menu_ExtController {

    @Resource(name = "sys_Menu_ExtService")
    private ISys_Menu_ExtService sys_Menu_ExtService;

    @Resource(name = "menuService")
    private IMenuService menuService;

    @ResponseBody
    @RequestMapping("/SaveForm")
    public ResultJO saveForm(@RequestBody MenusExtPanelModel pm) {
        Sys_Menu menu = pm.getSys_menu();
        Sys_Menu_Ext menuExt = pm.getSys_menu_ext();
        menu = sys_Menu_ExtService.saveForm(menu, menuExt);
        return ResultJO.getDefaultResult(menu);
    }


    // 物理删除(禁用) ,删除的时候同时删除所有子节点,需要在Dao中递归实现
    @ResponseBody
    @RequestMapping("/DestroyList")
    public ResultJO destroyMenuRows(@RequestParam("ids") String ids) {
        List<String> list = StringUtil.makeListFromString(ids, ",", String.class);
        return ResultJO.getDefaultResult(sys_Menu_ExtService.destroyListCustom(list));
    }


    @ResponseBody
    @RequestMapping("/LoadMenu")
    public ResultJO loadMenu(@RequestParam("id") String id) {
        Sys_Menu menu = menuService.get(id);
        Sys_Menu_Ext menu_ext = sys_Menu_ExtService.get(id);
        Map map = new HashMap<>();
        map.put("menu", menu);
        map.put("menu_ext", menu_ext);
        return ResultJO.getDefaultResult(map);
    }


    /**
     * 加载用户权限内菜单
     *
     * @param menuParentId
     * @param session
     * @return
     */
    @RequestMapping("/LoadMenuList")
    @ResponseBody
    public List loadChildMenuList(@RequestParam(value = "id", required = false) String id,
                                    @RequestParam(value = "menuParentId", required = false) String menuParentId,
                                  HttpSession session) {
        if(StringUtil.isNullOrWhiteSpace(menuParentId)){
            menuParentId = id;
        }
        String permstring = StringUtil.getStr(session.getAttribute("userperm"));
        List<String> permids = StringUtil.makeListFromString(permstring, ",", String.class);
        if (permids != null && permids.size() > 0) {
            if (!StringUtil.isNullOrWhiteSpace(menuParentId)) {
                return sys_Menu_ExtService.loadChildMenuList(permids, menuParentId, null);
            } else {
                return sys_Menu_ExtService.loadFirstMenuList(permids);
            }
        } else {
            return new ArrayList();
        }

    }

    /**
     * 加载用户快捷菜单
     *
     * @param session
     * @return
     */
    @RequestMapping("/loadShortcutMenuList")
    @ResponseBody
    public List loadShortcutMenuList(HttpSession session) {
        /*获取当前登录用户信息*/
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
        String permstring = StringUtil.getStr(session.getAttribute("userperm"));
        String userId = StringUtil.getStr(loginUserInf.getCurrentUserId());
        List<String> permids = StringUtil.makeListFromString(permstring, ",", String.class);
        if (permids != null && permids.size() > 0) {
            return sys_Menu_ExtService.loadShortcutMenuList(permids, userId);
        } else {
            return new ArrayList();
        }

    }

    /**
     * 获取子菜单及其下级菜单
     *
     * @param menuParentId
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping({"/LoadChildAndSonMenuList"})
    public List loadChildAndSonMenuList(@RequestParam(value = "menuParentId", required = false) String menuParentId,
                                        HttpServletRequest request) {
        String permstring = StringUtil.getStr(request.getSession().getAttribute("userperm"));
        List<String> permids = StringUtil.makeListFromString(permstring, ",", String.class);
        List<Map> menuList = new ArrayList<>();
        if (permids != null && permids.size() > 0) {
            if (!StringUtil.isNullOrWhiteSpace(menuParentId)) {
                menuList = sys_Menu_ExtService.loadChildMenuList(permids, menuParentId, null);
            } else {
                menuList = sys_Menu_ExtService.loadFirstMenuList(permids);
            }
        }
        List reList = new ArrayList();
        for (Map map : menuList) {
            String id = StringUtil.getStr(map.get("id"));
            List<Map> sonMenuList = sys_Menu_ExtService.loadChildMenuList(permids, id, id);
            map.put("children", sonMenuList);
            reList.add(map);
        }
        return reList;
    }

}