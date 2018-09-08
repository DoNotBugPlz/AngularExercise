package com.skytech.project.matter.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;
import com.skytech.project.matter.model.*;
import com.skytech.project.matter.service.IT_Matter_MaterialService;
import com.skytech.project.matter.service.IT_Matter_MonitorService;
import com.skytech.project.matter.service.IT_Matter_Monitor_GreatService;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.sms.model.SmsPanelModel;
import com.skytech.project.sms.model.T_Sms;
import com.skytech.project.sms.model.T_Sms_Object;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.matter.service.IT_MatterService;

import java.util.*;

@Controller
@RequestMapping("/T_matter")
public class T_MatterController {

    @Resource(name = "t_MatterService")
    private IT_MatterService t_MatterService;


    @Resource(name = "t_Matter_Monitor_GreatService")
    private IT_Matter_Monitor_GreatService t_Matter_Monitor_GreatService;


    @Resource(name = "t_Matter_MaterialService")
    private IT_Matter_MaterialService t_Matter_MaterialService;


    @Resource(name = "t_Matter_MonitorService")
    private IT_Matter_MonitorService t_Matter_MonitorService;


    @RequestMapping(value = {"/list"})
    @ResponseBody
    public GridResult search(@RequestParam(value = "keyword", required = false) String keyword,
                             @RequestParam(value = "start_date", required = false) String start_date,
                             @RequestParam(value = "end_date", required = false) String end_date,
                             PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("keyword",keyword);
        map.put("start_date",start_date);
        map.put("end_date",end_date);
        return t_MatterService.search(pageInfo, map);
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody T_Matter_Model params, HttpSession session) {
        LoginUserInf loginUserInf = (LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);

        //保存事项名称
        T_Matter matter = params.getT_matter();
        t_MatterService.saveOrUpdate(matter);

//        //保存企业信息
        T_Matter_Monitor matterMonitor = params.getT_matter_monitor();
        matterMonitor.setMater_id(matter.getId());
        t_Matter_MonitorService.saveOrUpdate(matterMonitor);
//
//        //保存监测品种
        t_MatterService.delete(Integer.parseInt(matterMonitor.getId()+""));
        List<T_Matter_Monitor_Great> list = params.getList();
        T_Matter_Monitor_Great Monitor_Great = new T_Matter_Monitor_Great();
        for (T_Matter_Monitor_Great b : list) {
            Monitor_Great.setGood_id(b.getGood_id());
            Monitor_Great.setMatter_monitor_id(matterMonitor.getId());
            Monitor_Great.setOrginal_price(b.getOrginal_price());
            Monitor_Great.setCunrrent_price(b.getCunrrent_price());
            Monitor_Great.setChange_reaon(b.getChange_reaon());
            Monitor_Great.setPrice_readjust(b.getPrice_readjust());
            t_Matter_Monitor_GreatService.save(Monitor_Great);
        }
//
//        t_MatterService.deletematerial(Integer.parseInt(matter.getId()+""));
//        //保存材料目录
//        List<T_Matter_Material> material = params.getMaterialist();
//        T_Matter_Material matter_material = new T_Matter_Material();
//        for (T_Matter_Material b : material) {
//            matter_material.setMatter_id(matter.getId());
//            matter_material.setName(b.getName());
//            matter_material.setChannel(b.getChannel());
//            matter_material.setIs_necessity(b.getIs_necessity());
//            matter_material.setPapery(b.getPapery());
//            t_Matter_MaterialService.save(matter_material);
//        }

        return null;

    }


    /**
     * a
     *
     * @return ResultJO
     * @pram
     */
    @RequestMapping(value = "/loadMatter")
    @ResponseBody
    public ResultJO loadForm(@RequestParam(value = "id", required = false) String id) {
        if (StringUtil.isNullOrWhiteSpace(id)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
         T_Matter matter = t_MatterService.get(Long.valueOf(id));
         List<T_Matter_Monitor> matter_monitors = t_MatterService.findBymatter(id);
         List monitor_greats = t_MatterService.findBymonitor(matter_monitors.get(0).getId()+"");
//         List<T_Matter_Material> material = t_MatterService.findBymaterial(id);
         Map map = new HashMap();
         map.put("matter",matter);
         map.put("matter_monitors",matter_monitors);
         map.put("monitor_greats",monitor_greats);
//         map.put("material",material);

        return ResultJO.getDefaultResult(map);
    }


    @RequestMapping(value = {"/listfind"})
    @ResponseBody
    public GridResult searchfind(@RequestParam(value = "keyword", required = false) String keyword,
                                 @RequestParam(value = "unit", required = false) String unit,
                                 @RequestParam(value = "status", required = false) String status,
                             PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("keyword",keyword);
        map.put("unit",unit);
        map.put("status",status);
        return t_MatterService.searchfind(pageInfo, map);
    }




    @RequestMapping(value = "/loadauditor")
    @ResponseBody
    public ResultJO loadauditor(@RequestParam(value = "id", required = false) String id) {
        if (StringUtil.isNullOrWhiteSpace(id)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        T_Matter matter = t_MatterService.get(Long.valueOf(id));
        List<T_Matter_Monitor> matter_monitors = t_MatterService.findBymatter(id);
        List<T_Matter_Monitor_Great> monitor_greats = t_MatterService.findBymonitor(matter_monitors.get(0).getId()+"");
        List<T_Matter_Material> material = t_MatterService.findBymaterial(id);
        Map map = new HashMap();
        map.put("matter",matter);
        map.put("matter_monitors",matter_monitors);
        map.put("monitor_greats",monitor_greats);
        map.put("material",material);

        return ResultJO.getDefaultResult(map);
    }


}