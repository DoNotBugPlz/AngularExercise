package com.skytech.flow.agent.dao.imp;

import com.google.common.base.Strings;
import com.skytech.basic.core.util.DateUtil;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.flow.agent.dao.IT_Agent_UserDao;
import com.skytech.flow.agent.model.T_Agent_User;

import java.util.*;

@Repository("t_Agent_UserDao")
public class T_Agent_UserDao extends MainBaseDao<T_Agent_User, String> implements IT_Agent_UserDao{

    @Override
    public List<String> getPrincipalsBetweenEffectiveTime(String agent) {
        String sql="select principalLoginName as \"principalLoginName\" from t_agent_user where agentLoginName = ? and ( ? between startTime and deadTime) and status ='1' ";
        List<String> params = new ArrayList<String>();
        params.add(agent);
        params.add(genDate());
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("principalLoginName", StandardBasicTypes.STRING);
        List<Map<String, Object>> data = this.listByNative(sql, scalarMap, params);
        List<String> result =new ArrayList<String>();
        for(Map<String,Object> entry :data){
            result.add(entry.get("principalLoginName").toString());
        }
        return result;
    }

    private String genDate(){
        Date date =new Date();
        return DateUtil.date2Str(date,"yyyy-MM-dd");
    }

    @Override
    public long countAgentAndPrincipal(String currentUserLoginName, String assigneeLoginName) {
        String countSQL = "select count(1) as \"relNum\" from t_agent_user where agentLoginName=? and principalLoginName=? and ( ? between startTime and deadTime) and status ='1' ";
        List<String> params=new ArrayList<String>();
        params.add(currentUserLoginName);
        params.add(assigneeLoginName);
        params.add(genDate());

        HashMap<String, Object> data = this.uniqueByNative(countSQL, params, new HashMap<>());
        if (data.get("relNum")==null) {
            return 0;
        }else {
            long result = Long.parseLong(data.get("relNum").toString());
            return result;
        }
    }

    @Override
    public GridResult listAllAgentUsers(Map<String, Object> params, PageInfo pageInfo) {

        StringBuilder sql=new StringBuilder();
        sql.append("select id AS \"id\",agentLoginName AS \"agentLoginName\",agentChinaName AS \"agentChinaName\",principalLoginName AS \"principalLoginName\",principalChinaName AS \"principalChinaName\",startTime AS \"startTime\",deadTime AS \"deadTime\",status as \"status\" FROM t_agent_user WHERE 1=1");

        List<String> queryParams=new LinkedList<String>();
        String agentChinaName= StringUtil.getStr(params.get("agentChinaName"));
        String principalLoginName=StringUtil.getStr(params.get("principalLoginName"));
        if (!Strings.isNullOrEmpty(agentChinaName)){
            queryParams.add(agentChinaName);
            sql.append(" AND agentChinaName LIKE % ? % ");
        }
        if (!Strings.isNullOrEmpty(principalLoginName)){
            queryParams.add(principalLoginName);
            sql.append(" AND principalLoginName LIKE % ? % ");
        }

        sql.append(" ORDER BY deadTime DESC ");
        HashMap<String, Type> scalarMap = new HashMap<String, Type>();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("agentLoginName", StandardBasicTypes.STRING);
        scalarMap.put("agentChinaName", StandardBasicTypes.STRING);
        scalarMap.put("principalLoginName", StandardBasicTypes.STRING);
        scalarMap.put("principalChinaName", StandardBasicTypes.STRING);
        scalarMap.put("startTime", StandardBasicTypes.STRING);
        scalarMap.put("deadTime", StandardBasicTypes.STRING);
        scalarMap.put("status", StandardBasicTypes.STRING);
        GridResult result = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, queryParams);
        return result;
    }
}