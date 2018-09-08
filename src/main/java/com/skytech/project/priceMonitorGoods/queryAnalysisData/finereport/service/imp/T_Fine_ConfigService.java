/**
 * @author maxzhao  * @time 2018/08/23.
 */
package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.imp;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.util.ProxyUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.flowable.engine.impl.util.json.JSONObject;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_ConfigDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.service.IT_Fine_ConfigService;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Config;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("t_Fine_ConfigService")
public class T_Fine_ConfigService extends BaseService<T_Fine_Config, Long> implements IT_Fine_ConfigService {

    private IT_Fine_ConfigDao t_Fine_ConfigDao;

    @Resource(name = "t_Fine_ConfigDao")
    @Override
    public void setBaseDao(IDao<T_Fine_Config, Long> baseDao) {
        this.t_Fine_ConfigDao = (IT_Fine_ConfigDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public GridResult search(Map params, PageInfo pageInfo) {
        if (params.get("os") == null) {
            return t_Fine_ConfigDao.search(params, pageInfo);
        } else {
            return t_Fine_ConfigDao.searchOtherShare(params, pageInfo);
        }
    }

    @Override
    public GridResult searchDataByNoUrl(Map params) {
        return t_Fine_ConfigDao.searchDataByNoUrl(params);
    }

    @Override
    public Boolean delList(Long user_id, String ids) {
        return t_Fine_ConfigDao.delList(user_id, ids);
    }


    //3.      Request Headersview source
//1.      Accept:
//            */*
//2.      Accept-Encoding:
//gzip, deflate, br
//3.      Accept-Language:
//zh-CN,zh;q=0.8
//4.      Connection:
//keep-alive
//5.      Content-Length:
//14
//6.      Content-Type:
//application/x-www-form-urlencoded; charset=UTF-8
//7.      Cookie:
//JSESSIONID=40C405803A8DAC551C2682F24F6F66D0; fr_remember=false; fr_password=""; fr_username=sky; _ga=GA1.1.2010333435.1493111932; Hm_lvt_407473d433e871de861cf818aa1405a1=1494208070,1494227597,1494238947,1494292415; Hm_lpvt_407473d433e871de861cf818aa1405a1=1494297516
//8.      Host:
//localhost:37799
//9.      Origin:
//http://localhost:37799
//10.   Referer:
//http://localhost:37799/WebReport/ReportServer?op=fr_bi&cmd=bi_init_created_by_me
//11.   User-Agent:
//Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36
//12.   X-Requested-With:
//XMLHttpRequest
//4.      Query String Parametersview sourceview URL encoded
//1.      op:
//fr_bi
//2.      cmd:
//report_hangout
//3.      _:
//0.8894685594824476
//5.      Form Dataview sourceview URL encoded
//1.      id:
//35
//2.      status:
//1
//3.6.2 响应
//{"reportName":"4123","reportId":220,"createBy":-999,"text":"131232","description":"","parentId":"78"}
    @Override
    public String setTemplate(String report) {

        String result = null;
        String charset = "UTF-8";
        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("op", "api");
//        jsonObject.put("cmd", "bi_login");
//        jsonObject.put("bi_username", "sky");
//        jsonObject.put("bi_password", "sky");
//        jsonObject.put("callback", "myfunction");
////        ?op=api&cmd=bi_login&bi_username=name&bi_password=password&callback=myfunction
//        result = ProxyUtils.proxyUrl("http://32.1.0.33:37799/WebReport/ReportServer",
//                "GET",
//                "application/json;charset=UTF-8",
//                jsonObject.toString());
//        System.out.println(result);
//        jsonObject = new JSONObject();
        jsonObject.put("report", "{\"reportName\":\"4123\",\"reportId\":210,\"createBy\":-999,\"text\":\"131232\",\"description\":\"\",\"parentId\":\"78\"}");
        jsonObject.put("isPlate", "true");
//        request.setAttribute("report", "{\"reportName\":\"4123\",\"reportId\":210,\"createBy\":-999,\"text\":\"131232\",\"description\":\"\",\"parentId\":\"78\"}");
//        request.setAttribute("isPlate", "true");
        /*result = ProxyUtils.proxyUrl(" http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=hangout_report_to_plate&_=0.3084709101822227",
                "POST",
                "text/html;charset=UTF-8",
                jsonObject.toString());*/
//        ProxyUtils.proxyUrl(request, response, " http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=report_hangout&_=0.8894685594824476");
//        System.out.println(report);
//        String reportName = StringUtil.getStr(params.get("reportName"));
//        String reportId = StringUtil.getStr(params.get("reportId"));//模板的id必填
//        String createBy = StringUtil.getStr(params.get("createBy"));//创建者的id必填
//        String text = StringUtil.getStr(params.get("text"));//一般与reportName同名
//        String description = StringUtil.getStr(params.get("description"));//一般不写
//        String parentId = StringUtil.getStr(params.get("parentId"));//id必填
        HttpPost post = null;
        String url = "http://32.1.0.33:37799/WebReport/ReportServer?op=fr_bi&cmd=hangout_report_to_plate&_=0.11645705485716462";
//        StringBuilder report = new StringBuilder();
//        report.append("{")
//                .append("\"reportName\":\"").append(reportName).append("\",")
//                .append("\"reportId\":").append(reportId).append(",")
//                .append("\"createBy\":").append(createBy).append(",")
//                .append("\"text\":\"").append(text == null ? reportName : text).append("\",")
//                .append("\"description\":\"").append(description).append("\",")
//                .append("\"parentId\":\"").append(parentId).append("\",")
//                .append("}");
     /*   try {
            HttpClient httpClient = HttpClients.createDefault();
            post = new HttpPost(url);
            List<NameValuePair> list = new ArrayList<>();
            list.add(new BasicNameValuePair("report", report));
            list.add(new BasicNameValuePair("isPlate", "true"));
            post.setEntity(new UrlEncodedFormEntity(list,charset));
            HttpResponse response = httpClient.execute(post);
            if (response != null) {
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    result = EntityUtils.toString(entity,charset);
                }
            }
        } catch (Exception e) {
            return "帆软挂出模板请求错误!";
        }*/
        return result;
    }
}