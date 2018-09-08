/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.api;

import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_ObjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/T_fine_object")
public class T_Fine_ObjectController {

    @Resource(name = "t_Fine_ObjectService")
    private IT_Fine_ObjectService t_Fine_ObjectService;

    /**
     * 查询当前记录的发布人
     *
     * @param config_id
     * @return
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public ResultJO search(@RequestParam(value = "config_id", required = false) Long config_id) {
        if (config_id != null) {
            return ResultJO.getDefaultResult(t_Fine_ObjectService.search(config_id));
        }
        return ResultJO.getErrorResult(null);
    }

    /**
     * 保存当前记录的发布人
     * 修改当前记录的发布人
     *
     * @param user_ids
     * @param config_id
     * @return
     */
    @RequestMapping(value = "/save/all")
    @ResponseBody
    public ResultJO saveAll(@RequestParam(value = "user_ids", required = false) String user_ids,
                            @RequestParam(value = "fine_config_id", required = false) Long config_id) {
        if (user_ids != null && config_id != null) {
//            Boolean a = t_Fine_ObjectService.saveAll(user_ids,config_id);
            return ResultJO.getDefaultResult(null);
        }
        return ResultJO.getErrorResult(null);
    }

}