package com.skytech.flow.inject;

import com.skytech.flow.opinion.service.IOpinionService;
import com.skytech.skyflow.injected.SkyflowOpinionService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/26.
 */
public class OpinionServiceImpl implements SkyflowOpinionService {

    @Resource(name = "opinionService")
    private IOpinionService opinionService;

    /**
     * 获取任务上的意见内容
     *
     * @param taskId
     * @return
     */
    @Override
    public String getOpinionMsg(String taskId) {
        List<Map<String, Object>> opinionList = opinionService.getByTaskId(taskId);
        if (opinionList.isEmpty()){
            return null;
        }
        StringBuilder message = new StringBuilder();
        if(opinionList.size()>1){
            for (Map<String,Object> opinion:opinionList){
                message.append(opinion.get("message").toString()+"  "+ opinion.get("name").toString()+" "+opinion.get("time").toString()+"||") ;
            }
            message.delete(message.length()-2,message.length());
        }

        if (opinionList.size()==1){
            Map<String,Object> opinion=opinionList.get(0);
            message.append(opinion.get("message").toString()+"  "+ opinion.get("name").toString()+" "+opinion.get("time").toString());
        }

        return message.toString();
    }

}
