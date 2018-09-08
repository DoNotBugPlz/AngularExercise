package com.skytech.project.app.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * @author yangzr
 * @time 2018/8/28
 */
@CrossOrigin
@Controller
@RequestMapping("AppApi")
public class AppInterfaceController {

    /**
     * 对外统一接口(本地)
     * @param serviceName  服务名
     * @param resourceName 资源名
     * @param resourceName 资源名
     * @return
     */
    @RequestMapping(value="/{serviceName}/{resourceName}/{behavior}")
    @ResponseBody
    public ModelAndView mainApiEntry(@PathVariable("serviceName") String serviceName,
                                     @PathVariable("resourceName") String resourceName,
                                     @PathVariable("behavior") String behavior,
                                     HttpServletRequest request) {
        String apiUrl = serviceName+"/"+resourceName+"/"+behavior+".do";
        return new ModelAndView("forward:/"+apiUrl);
    }
    /**
     * 对外统一接口(本地)
     * @param serviceName  服务名
     * @param resourceName 资源名
     * @return
     */
    @RequestMapping(value="/{serviceName}/{resourceName}")
    @ResponseBody
    public ModelAndView mainApiEntry(@PathVariable("serviceName") String serviceName,
                                     @PathVariable("resourceName") String resourceName,
                                     HttpServletRequest request) {
        String apiUrl = serviceName+"/"+resourceName+".do";
        return new ModelAndView("forward:/"+apiUrl);
    }

}
