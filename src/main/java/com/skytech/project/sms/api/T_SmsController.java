package com.skytech.project.sms.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.config.param.SysParam;

import com.skytech.project.material.model.MaterialPanelModel;
import com.skytech.project.material.model.T_Material_Submission;
import com.skytech.project.notice.model.Notice;
import com.skytech.project.organisation.model.LoginUserInf;
import com.skytech.project.sms.model.SmsPanelModel;
import com.skytech.project.sms.model.T_Sms;
import com.skytech.project.sms.model.T_Sms_Object;
import com.skytech.project.sms.service.IT_Sms_ObjectService;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.sms.service.IT_SmsService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/T_sms")
public class T_SmsController{

	@Resource(name="t_SmsService")
	private IT_SmsService t_SmsService;


	@Resource(name="t_Sms_ObjectService")
	private IT_Sms_ObjectService t_Sms_ObjectService;



    /**
      *新增短信
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody SmsPanelModel params, HttpSession session) {
        if (params != null) {
            LoginUserInf loginUserInf =(LoginUserInf) session.getAttribute(SysParam.CURRENT_LOGIN_SESSION_NAME);
            T_Sms t_sms   =  params.getT_sms();
            t_sms.setStatus(0);
            t_sms.setAdder(loginUserInf.getCurrentUserId());
            t_SmsService.save(t_sms);
            String users = params.getT_sms_object().getReciver_id()+"";
		    String[] user = users.trim().split(",");
			for(int i=0;i<user.length;i++){
				T_Sms_Object t_sms_object =  new T_Sms_Object();
				t_sms_object.setT_sms_id(t_sms.getId());
				t_sms_object.setReciver_id(Long.valueOf(user[i]));
				t_Sms_ObjectService.save(t_sms_object);
		  }
            return ResultJO.getDefaultResult(t_sms, "保存成功！");
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }


	@RequestMapping(value = {"/list"})
	@ResponseBody
	public GridResult search(@RequestParam(value="keyword",required=false) String keyword,
							 @RequestParam(value="sendadder",required=false) String sendadder,
							 @RequestParam(value="appadder",required=false) String appadder,
							 @RequestParam(value="status",required=false) String status,
							 @RequestParam(value="start_time",required=false) String start_time,
							 @RequestParam(value="end_time",required=false) String end_time,


							 PageInfo pageInfo) {
		Map map  = new HashMap();
		map.put("keyword",keyword);
		map.put("sendadder",sendadder);
		map.put("appadder",appadder);
		map.put("status",status);
		map.put("start_time",start_time);
		map.put("end_time",end_time);

		return t_SmsService.search(pageInfo, map);
	}


	/**
	 * 批量销毁通知
	 * @return
	 */
	@RequestMapping(value="/DestroyList",method = RequestMethod.POST)
	@ResponseBody
	public ResultJO destroyList(@RequestBody Map paramMap) {
		String ids =StringUtil.getStr(paramMap.get("ids")) ;
		String noWhiteSpaceIds = StringUtils.trimAllWhitespace(ids);
		if (StringUtils.hasLength(noWhiteSpaceIds)) {
			t_SmsService.destroyList(StringUtil.makeNumberListFromString(noWhiteSpaceIds, ",", Long.class));//物理删除
			return ResultJO.getDefaultResult(null, "删除成功！");
		}
	   return ResultJO.getErrorResult(null, "请至少选择一条数据！");
	}


    @RequestMapping(value = "/loadSms")
    @ResponseBody
    public ResultJO loadForm(@RequestParam(value="id",required=false) String sms_id, HttpSession session) {
        if (StringUtil.isNullOrWhiteSpace(sms_id)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        return ResultJO.getDefaultResult( t_SmsService.loadSms(sms_id));
    }

}





