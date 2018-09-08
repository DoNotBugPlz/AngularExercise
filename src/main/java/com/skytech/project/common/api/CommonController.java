package com.skytech.project.common.api;

import com.skytech.attachfile.model.Sys_Attachfile;
import com.skytech.attachfile.service.ISys_AttachfileService;
import com.skytech.authenticater.authenticate.Authenticater;
import com.skytech.authenticater.model.ValidateResult;
import com.skytech.basic.core.constants.CommonParam;
import com.skytech.basic.core.util.BeanUtilsExtend;
import com.skytech.basic.core.util.JSONUtil;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.category.service.ICategoryvalueService;
import com.skytech.config.param.SysParam;
import com.skytech.configphystables.service.ITablesRemarkService;
import com.skytech.menus.service.IMenuService;
import com.skytech.organisation.model.LoginUser;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.platform.menus.service.ISys_Menu_ExtService;
import com.skytech.project.common.service.ICommonService;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;
import java.util.List;

/**
 * Created by yangzr on 2018/1/20.
 */
@Controller
@RequestMapping("/Common")
public class CommonController {

    @Resource(name = "menuService")
    private IMenuService menuService;

    @Resource(name = "CommonService")
    private ICommonService CommonService;

    @Resource(name = "sys_AttachfileService")
    private ISys_AttachfileService sys_AttachfileService;

    @Resource(name = "authenticater")
    private Authenticater authenticater;

    @Resource(name = "userService")
    private IUserService userService;

    @Resource(name = "categoryvalueService")
    private ICategoryvalueService categoryvalueService;

    @Resource(name="tablesRemarkService")
    private ITablesRemarkService tablesRemarkService;

    /**
     * 第二次登陆请求，根据
     * 密钥、
     * 绑定密钥的key、
     * 客户端的签名数据（该密码是由：用户名和源密码经HmacSHA256算法加密，然后经Base64编码，结合密钥再次经HmacSHA256加密，再次经Base64编码得到）
     * 界定是否允许登陆
     * 验证通过后：
     * 将一些信息保存到session中
     * 将登陆的key和待签名数据保存到客户端，
     * 以便在session失效的时候，用其来创建session
     * 客户端数据的生命周期必须随浏览器的关闭而销毁
     * @param loginKey
     * @param signDataFromClient
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/login/AccessToken", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO loginAgain(@RequestParam("loginKey") String loginKey,
                               @RequestParam("signDataFromClient") String signDataFromClient,
                               HttpServletRequest request,
                               HttpServletResponse response) {
        ValidateResult<?> vrs = authenticater.validated(loginKey,signDataFromClient,request);
        if(vrs.isSuccess()){
            authenticater.saveToSession(loginKey,request);
            authenticater.saveToClient(loginKey,request,response);
            if(request.getSession()!=null){
                LoginUserInf u = (LoginUserInf) request.getSession().getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
                if(u!=null&&u.getCurrentUserId()!=null){
                    Sys_User user = u.getSys_User();
                    Map map = JSONUtil.jsonToMap(JSONUtil.toJson(user));
                    map.put("currentUserExtId",u.getCurrentUserId());
                    map.put("currentDeptExtId",u.getCurrentDeptId());
                    return ResultJO.getDefaultResult(user,vrs.getMessage());
                }
            }
            return ResultJO.getErrorResult(null, "当前用户不存在！");


        }
        return ResultJO.getErrorResult(null, vrs.getMessage());
    }

    /**
     * 菜单拖拽排序
     *
     * @param sourceRowId 拖拽行ID
     * @return
     */
    @RequestMapping(value = "/onDropMenu", method = RequestMethod.POST)
    @ResponseBody
    public void onDropMenu(
            @RequestParam(value = "sourceRowId", required = false) String sourceRowId,
            @RequestParam(value = "sourceRowPid", required = false) String sourceRowPid,
            @RequestParam(value = "oldpid", required = false) String oldpid,
            @RequestParam(value = "point", required = false) String point,
            @RequestParam(value = "tpid", required = false) String tpid,
            @RequestParam(value = "spid", required = false) String spid,
            @RequestParam(value = "tindex", required = false) String tindex,
            @RequestParam(value = "sindex", required = false) String sindex
    ) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("sourceRowPid", sourceRowPid);
        map.put("sourceRowId", sourceRowId);
        map.put("oldpid", oldpid);
        map.put("point", point);
        map.put("tpid", tpid);
        map.put("spid", spid);
        map.put("tindex", tindex);
        map.put("sindex", sindex);
        CommonService.onDropMenu(map);
    }


    /**
     * 字典拖拽排序
     *
     * @param sourceRowId 拖拽行ID
     * @return
     */
    @RequestMapping(value = "/onDropChildMenu", method = RequestMethod.POST)
    @ResponseBody
    public void onDropChildMenu(
            @RequestParam(value = "sourceRowId", required = false) String sourceRowId,
            @RequestParam(value = "sourceRowPid", required = false) String sourceRowPid,
            @RequestParam(value = "oldpid", required = false) String oldpid,
            @RequestParam(value = "point", required = false) String point,
            @RequestParam(value = "tpid", required = false) String tpid,
            @RequestParam(value = "spid", required = false) String spid,
            @RequestParam(value = "tindex", required = false) String tindex,
            @RequestParam(value = "sindex", required = false) String sindex
    ) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("sourceRowPid", sourceRowPid);
        map.put("sourceRowId", sourceRowId);
        map.put("oldpid", oldpid);
        map.put("point", point);
        map.put("tpid", tpid);
        map.put("spid", spid);
        map.put("tindex", tindex);
        map.put("sindex", sindex);
        CommonService.onDropChildMenu(map);
    }


    /**
     * 人员拖拽排序
     *
     * @param sourceRowId 拖拽行ID
     * @return
     */
    @RequestMapping(value = "/onDropPeop", method = RequestMethod.POST)
    @ResponseBody
    public void onDropPeop(
            @RequestParam("targetRowId") String targetRowId,
            @RequestParam("targetRowSortcode") String targetRowSortcode,
            @RequestParam("sourceRowId") String sourceRowId,
            @RequestParam("sourceRowSortCode") String sourceRowSortCode,
            @RequestParam("point") String point
    ) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("targetRowId", targetRowId);
        map.put("targetRowSortcode", targetRowSortcode);
        map.put("sourceRowId", sourceRowId);
        map.put("sourceRowSortCode", sourceRowSortCode);
        map.put("point", point);
        CommonService.onDropPeop(map);
    }

    /**
     * 验证码
     *
     * @return
     */
    @RequestMapping(value = "/validatePicCode")
    @ResponseBody
    public ResultJO getPicCode(@RequestParam(value = "picCode", required = false) String picCode,
                               HttpServletRequest request) {
        String picCodeTemp = StringUtil.getStr(request.getSession().getAttribute(SysParam.SESSION_PIC_CODE_NAME));
        if (StringUtil.isNullOrWhiteSpace(picCode)) {
            return ResultJO.getErrorResult("验证码未填写");
        }
        if (!picCode.equalsIgnoreCase(picCodeTemp)) {
            return ResultJO.getErrorResult("验证码错误");
        } else {
            return ResultJO.getDefaultResult("验证通过");
        }
    }


    /**
     * 验证码
     *
     * @return
     */
    @RequestMapping(value = "/genPicCode")
    @ResponseBody
    public void genPicCode(HttpServletRequest request, HttpServletResponse response) {
        BufferedImage img = new BufferedImage(68, 22, BufferedImage.TYPE_INT_RGB);
        // 得到该图片的绘图对象
        Graphics g = img.getGraphics();
        Random r = new Random();
        Color c = new Color(200, 150, 255);
        g.setColor(c);
        // 填充整个图片的颜色
        g.fillRect(0, 0, 68, 22);
        // 向图片中输出数字和字母
        StringBuffer sb = new StringBuffer();
        char[] ch = "0123456789".toCharArray();
        int index, len = ch.length;
        for (int i = 0; i < 4; i++) {
            index = r.nextInt(len);
            g.setColor(new Color(r.nextInt(88), r.nextInt(188), r.nextInt(255)));
            g.setFont(new Font("Arial", Font.BOLD | Font.ITALIC, 22));// 输出的字体和大小
            g.drawString("" + ch[index], (i * 15) + 3, 18);//写什么数字，在图片的什么位置画
            sb.append(ch[index]);
        }
        request.getSession().setAttribute(SysParam.SESSION_PIC_CODE_NAME, sb.toString());
        try {
            ImageIO.write(img, "JPG", response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //附件上传
    @RequestMapping(value = {"/SaveFiles"}, method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveFiles(@RequestParam(value = "Filedata", required = false) MultipartFile[] fileDatas,//附件信息
                              @RequestParam(value = "tablename", required = false) String tablename,//表名
                              @RequestParam(value = "colname", required = false) String colname,//列名
                              @RequestParam(value = "recordid", required = false) String recordid,//主键
                              @RequestParam(value = "fileId", required = false) String fileId,//主键
                              HttpServletRequest request,
                              HttpServletResponse response) throws Exception {
        List fileList = new ArrayList();
        if(!StringUtil.isNullOrWhiteSpace(fileId)){
            Sys_Attachfile attachfileOld = sys_AttachfileService.get(fileId);
            tablename = attachfileOld.getTablename();
            colname = attachfileOld.getColname();
            recordid = attachfileOld.getRecordid();
        }
        if(fileDatas!=null){
            for (int i = 0; i < fileDatas.length; i++) {
                if (fileDatas[i].getSize() > 0) {
                    Sys_Attachfile sys_attachfile = new Sys_Attachfile();
                    sys_attachfile.setTablename(tablename);
                    sys_attachfile.setColname(colname);
                    sys_attachfile.setRecordid(recordid);
                    MultipartFile fileData = fileDatas[i];
                    Sys_Attachfile attachfile = CommonService.uploadAndSaveFileInfo(fileData, sys_attachfile,fileId, request, response);
                    fileList.add(attachfile);
                }
            }
            return ResultJO.getDefaultResult(fileList);
        }else {
            return ResultJO.getErrorResult("未收到附件","未收到附件");
        }
    }


    //附件下载
    @RequestMapping(value = {"/DownLoadFile"}, method = RequestMethod.GET)
    @ResponseBody
    public void downLoadFile(@RequestParam(value = "fileid", required = true) String fileid,//附件主键
                             HttpServletRequest request,
                             HttpServletResponse response) throws Exception {

        CommonService.downLoadFile(fileid, response, request);
    }


    //附件列表
    @RequestMapping(value = {"/loadFileList"}, method = RequestMethod.GET)
    @ResponseBody
    public GridResult loadFileList(@RequestParam(value = "tab_name", required = false) String tab_name,//业务表
                             @RequestParam(value = "col_name", required = false) String col_name,//业务关联字段
                             @RequestParam(value = "recordid", required = false) String recordid,//业务主键
                             PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("tab_name",tab_name);
        map.put("col_name",col_name);
        map.put("recordid",recordid);

       return CommonService.loadFileList(map, pageInfo);
    }


    /**
     * 列表无层级拖拽排序 （通用）
     *
     * @param targetRowId
     * @param targetRowSortcode
     * @param sourceRowId
     * @param sourceRowSortCode
     * @param point
     * @param tableName
     * @param sortField
     */
    @RequestMapping(value = "/onDropGrid", method = RequestMethod.POST)
    @ResponseBody
    public void onDropGrid(
            @RequestParam("targetRowId") String targetRowId,
            @RequestParam("targetRowSortcode") String targetRowSortcode,
            @RequestParam("sourceRowId") String sourceRowId,
            @RequestParam("sourceRowSortCode") String sourceRowSortCode,
            @RequestParam("point") String point,
            @RequestParam("tableName") String tableName,
            @RequestParam("sortField") String sortField
    ) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("targetRowId", targetRowId);
        map.put("targetRowSortcode", targetRowSortcode);
        map.put("sourceRowId", sourceRowId);
        map.put("sourceRowSortCode", sourceRowSortCode);
        map.put("point", point);
        map.put("tableName", tableName);
        map.put("sortField", sortField);

        CommonService.onDropGrid(map);
    }

    //同步加载人员树
    @ResponseBody
    @RequestMapping("/LoadDeptUserTreeBySync")
    public List loadDeptUserTreeBySync(@RequestParam(value = "deptid", required = false) String deptid) {
        return CommonService.loadDeptUserTreeBySync(deptid);
    }
    //同步加载部门树
    @ResponseBody
    @RequestMapping("/LoadDeptTreeBySync")
    public List LoadDeptTreeBySync() {
        return CommonService.loadDeptTreeBySync();
    }

    //门户首页获取组件布局
    @ResponseBody
    @RequestMapping("/LoadUserModule")
    public List loadUserModule() {
        return CommonService.loadUserModule();
    }



    //字典项获取级联字典
    @RequestMapping(value = {"/LoadSonCategoryvalueList"})
    @ResponseBody
    public List loadSonCategoryvalueList(@RequestParam(value = "constname", required = false) String constname,
                                         @RequestParam(value = "parent_refid", required = false) String parent_refid){

            return CommonService.loadSonCategoryvalueList(constname,parent_refid);
    }

    /**
     * 加载用户权限内菜单
     * @param menuParentId
     * @param session
     * @return
     */
    @RequestMapping("/LoadMenuList")
    @ResponseBody
    public List loadChildMenuList(@RequestParam(value="menuParentId",required=false) String menuParentId,
                                  HttpSession session){
        String permstring = StringUtil.getStr(session.getAttribute("userperm"));
        List<String> permids=StringUtil.makeListFromString(permstring, ",", String.class);
        if(permids!=null&&permids.size()>0){
            if(!StringUtil.isNullOrWhiteSpace(menuParentId)){
                return menuService.loadChildMenuList(permids,menuParentId,null);
            }else{
                return menuService.loadFirstMenuList(permids);
            }
        }else{
            return new ArrayList();
        }

    }


    /**
     * 批量获取字典项
     * 根据constname 得到categoryvalue的List
     * @param constnames
     * @return
     */
    @RequestMapping("/categoryvalue/GetCategoryValuesMap")
    @ResponseBody
    public Map getCategoryvaluesMapByConstname(
            @RequestParam("constnames") String constnames) {
        Map map = new HashMap();
        List<String> constnameList = StringUtil.makeListFromString(constnames,",",String.class);
        if(constnameList!=null&&!constnameList.isEmpty()){
            for(String constname:constnameList){
                List categoryValues = categoryvalueService.getCategoryvaluesByConstname(constname);
                map.put(constname,categoryValues);
            }
        }
        return map;
    }


    /**
     *
     * ztree 拖动排序通用方法
     * @param map {
     *       moveType：移动类型
     *       tableName：表名
     *       idColName：主键字段名称
     *       idColType：主键字段类型
     *       parentIdColName：父主键字段名称
     *       sortindexColName：排序字段名称
     *       id：移动数据主键
     *       targetId：目标数据主键
     *       targetParentId：目标数据父主键
     * }
     * @return
     */
    @RequestMapping("/DataDragSort")
    @ResponseBody
    public ResultJO dataDragSort(@RequestBody Map map){
        CommonService.dataDragSort(map);
        return ResultJO.getDefaultResult("");
    }


    /**
     * 自动生成MVC各层所需代码文件
     * @param type 类文件类型
     * @param tablename 类相关的表名
     * @param sequencename 主键序列名
     * @param fullPackageName 全限定包名
     * @return
     */
    @RequestMapping(value="/LoadTableCommonFiles",method=RequestMethod.GET)
    @ResponseBody
    public String loadTableCommonFiles(@RequestParam("type")String type,
                                       @RequestParam("tablename")String tablename,
                                       @RequestParam(value="sequencename",required=false)String sequencename,
                                       @RequestParam(value="fullPackageName",required=false)String fullPackageName){
        List<String> tablenameList = StringUtil.makeListFromString(tablename,",",String.class);
        for(String tab_name:tablenameList){
            tablesRemarkService.loadTableCommonFiles(type,tab_name,sequencename,fullPackageName);
        }
        return "";
    }


}

