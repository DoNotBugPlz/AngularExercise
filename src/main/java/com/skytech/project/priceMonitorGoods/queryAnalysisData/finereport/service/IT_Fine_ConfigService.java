/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.service.IBaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public interface IT_Fine_ConfigService extends IBaseService<T_Fine_Config, Long> {


    /**
     * 查询当前用户的列表
     *
     * @param params
     * @param pageInfo
     * @return
     */
    GridResult search(Map params, PageInfo pageInfo);

    /**
     * 页面初始化 查询当前用户  上次创建报表时,创建失败的实例,重新创建
     *
     * @param params
     * @return
     */
    GridResult searchDataByNoUrl(Map params);

    /**
     * 逻辑删除所选记录
     *
     * @param currentUserId
     * @param ids
     * @return
     */
    Boolean delList(Long currentUserId, String ids);

    /**
     * 跨域请求fine挂出
     * @param report
     *                 params.put("reportName","");
     *                 params.put("reportId","");//模板的id必填
     *                 params.put("createBy","");//创建者的id必填
     *                 params.put("text","");//一般与reportName同名
     *                 params.put("description","");//一般不写
     *                 params.put("parentId","");//id必填
     */
    String setTemplate(String report);
}