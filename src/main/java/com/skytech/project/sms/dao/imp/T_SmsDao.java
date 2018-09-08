package com.skytech.project.sms.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.sms.dao.IT_SmsDao;
import com.skytech.project.sms.model.T_Sms;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_SmsDao")
public class T_SmsDao extends MainBaseDao<T_Sms, Long> implements IT_SmsDao{

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;


    /**
     * 查询短信列表，可以传查询条件
     *
     * @param pageinfo
     * @return
     */
    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql .append(" select a.status,  a.id, a.adder, a.content, a.addtime, b.reciver_id,c.sys_user_id, ");
        sql .append(" d.chinaname as name ,g.chinaname as sendname ");
        sql .append(" from t_sms a  left join t_sms_object b on  a.id = b.t_sms_id ");
        sql .append(" left  join  cf_user_ext c on c.id = b.reciver_id ");
        sql .append(" left  join  sys_user d on d.id = c.sys_user_id ");
        sql .append(" left  join cf_user_ext e  on e.id = a.adder ");
        sql .append(" left  join  sys_user g on g.id = e.sys_user_id  where 1=1");

        String keyword = null;
        String status = null;
        String start_time = null;
        String end_time = null;
        String appadder = null;
        String sendadder = null;
        if (map != null) {
             keyword = StringUtil.getStr(map.get("keyword")) ;
             status = StringUtil.getStr(map.get("status")) ;
             start_time = StringUtil.getStr(map.get("start_time")) ;
             end_time = StringUtil.getStr(map.get("end_time")) ;
             appadder  = StringUtil.getStr(map.get("appadder")) ;
             sendadder  = StringUtil.getStr(map.get("sendadder")) ;
        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and a.content like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(status)) {
            list.add(Integer.parseInt(status));
            sql.append(" and a.status = ? ");
        }

        if (!StringUtil.isNullOrWhiteSpace(appadder)) {
            list.add("%" + appadder + "%");
            sql.append(" and c.chinaname like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(sendadder)) {
            list.add("%" + sendadder + "%");
            sql.append("  and d.chinaname like ? ");
        }

        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(start_time));
                sql.append(" and a.addtime > ? ");
            } catch (Exception e) {
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(end_time));
                sql.append(" and a.addtime < ? ");
            } catch (Exception e) {
            }
        }
        sql.append("  order by a.status,a.addtime");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("adder", StandardBasicTypes.STRING);
        scalarMap.put("status", StandardBasicTypes.INTEGER);
        scalarMap.put("content", StandardBasicTypes.STRING);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("sendname", StandardBasicTypes.STRING);
        scalarMap.put("addtime", StandardBasicTypes.TIMESTAMP);


        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        colsRemarkService.convertCategoryColnums("t_sms", gr,null);
        return gr;
    }


    public List loadSms(String id) {
        String sql="select a.status,  a.id, a.adder, a.content, a.addtime, b.reciver_id,c.sys_user_id,d.chinaname from t_sms a " +
                "left join t_sms_object b on  a.id = b.t_sms_id left  join  cf_user_ext c on c.id = b.reciver_id left  join  " +
                "sys_user d on d.id = c.sys_user_id where 1=1 and a.id='"+id+"' ";
        return  this.listByNative(sql,null,null);
    }







}