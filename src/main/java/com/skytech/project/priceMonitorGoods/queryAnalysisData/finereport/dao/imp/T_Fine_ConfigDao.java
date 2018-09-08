/**  * @author maxzhao  * @time 2018/08/23.  */ package com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.dao.IT_Fine_ConfigDao;
import com.skytech.project.priceMonitorGoods.queryAnalysisData.finereport.model.T_Fine_Config;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Repository("t_Fine_ConfigDao")
public class T_Fine_ConfigDao extends MainBaseDao<T_Fine_Config, Long> implements IT_Fine_ConfigDao {


    @Override
    public GridResult search(Map params, PageInfo pageInfo) {
        StringBuilder sql = new StringBuilder();
        sql.append("select fc.id," +
                "fc.user_id," +
                "fc.name," +
                "fc.data_type," +
                "fc.report_id," +
                "fc.createby," +
                "fc.build_url," +
                "u.chinaname"
        ).append(" from t_fine_config fc " +
                " left join cf_user_ext ue on ue.id = fc.user_id " +
                " left join sys_user u on u.id = ue.sys_user_id " +
                " left join t_fine_collect c on c.fine_config_id = fc.id")
                .append(" where fc.delstatus = 0 " +
                        " and ue.delstatus = 0" +
                        " and u.delstatus = 0");
        String name = StringUtil.getStr(params.get("name"));
        String data_type = StringUtil.getStr(params.get("data_type"));
        String is_collect = StringUtil.getStr(params.get("is_collect"));
        String user_id = StringUtil.getStr(params.get("user_id"));
        if (!StringUtil.isNullOrWhiteSpace(name)) {
            sql.append(" and fc.name like '%" + name + "%'");
        }
        List<Object> list = new ArrayList<>();
        /* 查看收藏 */
        if (!StringUtil.isNullOrWhiteSpace(is_collect)) {
            sql.append(" and fc.data_type = 1");
            sql.append(" and c.delstatus = 0 ");
            list.add(Integer.parseInt(user_id));
            sql.append(" and c.user_id = ?");
        } else {
            /* 查看我的查询 */
            list.add(Long.parseLong(user_id));
            sql.append(" and fc.user_id = ?");
            if (!StringUtil.isNullOrWhiteSpace(data_type)) {
                list.add(Integer.parseInt(data_type));
                sql.append(" and fc.data_type = ?");
            }
        }
        Map<String, org.hibernate.type.Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("data_type", StandardBasicTypes.INTEGER);
        scalarMap.put("report_id", StandardBasicTypes.STRING);
        scalarMap.put("createby", StandardBasicTypes.STRING);
        scalarMap.put("build_url", StandardBasicTypes.STRING);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        return this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
    }

    @Override
    public GridResult searchDataByNoUrl(Map params) {
        StringBuilder sql = new StringBuilder();
        sql.append("select fc.id," +
                "fc.user_id," +
                "fc.name," +
                "fc.data_type," +
                "fc.report_id," +
                "fc.createby," +
                "fc.build_url"
        ).append(" from t_fine_config fc ")
                .append(" where fc.delstatus = 0 " +
                        " and fc.build_url is null  ");
        String user_id = StringUtil.getStr(params.get("user_id"));

        List<Object> list = new ArrayList<>();
        /* 查看收藏 */
        if (!StringUtil.isNullOrWhiteSpace(user_id)) {
            sql.append(" and fc.user_id = ?");
            list.add(Long.parseLong(user_id));
        }
        Map<String, org.hibernate.type.Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("data_type", StandardBasicTypes.INTEGER);
        scalarMap.put("report_id", StandardBasicTypes.STRING);
        scalarMap.put("createby", StandardBasicTypes.STRING);
        scalarMap.put("build_url", StandardBasicTypes.STRING);
        return this.listByNativeByPage(sql.toString(), scalarMap, null, list);

    }

    @Override
    public GridResult searchOtherShare(Map params, PageInfo pageInfo) {
        StringBuilder sql = new StringBuilder();
        sql.append("select fc.id," +
                "fc.user_id," +
                "fc.name," +
                "fc.data_type," +
                "fc.report_id," +
                "fc.createby," +
                "fc.build_url," +
                "u.chinaname")
                .append(" from t_fine_config fc " +
                        " left join cf_user_ext ue on ue.id = fc.user_id " +
                        " left join sys_user u on u.id = ue.sys_user_id " +
                        " left join t_fine_collect C ON C.fine_config_id = fc.ID and C.user_id = ? and c.delstatus = 0" +
                        " left join t_fine_object fo on fo.fine_config_id = fc.id and fo.user_id = ?  ")
                .append(" where fc.delstatus = 0 " +
                        " and fc.data_type = 1" +
                        " and ue.delstatus = 0" +
                        " and u.delstatus = 0" +
                        " and fo.delstatus = 0" +
                        " and fc.user_id != ?" +
                        " and c.id is null");

        List<Object> list = new ArrayList<>();
        list.add(Long.parseLong(StringUtil.getStr(params.get("user_id"))));
        list.add(Long.parseLong(StringUtil.getStr(params.get("user_id"))));
        list.add(Long.parseLong(StringUtil.getStr(params.get("user_id"))));
        String name = StringUtil.getStr(params.get("name"));
        String user_name = StringUtil.getStr(params.get("user_name"));
        if (!StringUtil.isNullOrWhiteSpace(user_name)) {
            sql.append(" and fc.name like '%" + name + "%'");
        }
        if (!StringUtil.isNullOrWhiteSpace(user_name)) {
            sql.append(" and u.chinaname like '%" + user_name + "%'");
        }
        Map<String, org.hibernate.type.Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("data_type", StandardBasicTypes.INTEGER);
        scalarMap.put("report_id", StandardBasicTypes.STRING);
        scalarMap.put("createby", StandardBasicTypes.STRING);
        scalarMap.put("build_url", StandardBasicTypes.STRING);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        return this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
    }

    @Override
    public Boolean delList(Long user_id, String ids) {
        StringBuilder sql = new StringBuilder();
        sql.append(" update t_fine_config set delstatus = 1 ")
                .append(" where delstatus = 0 " +
                        " and user_id = ?");
        List params = new ArrayList();
        params.add(user_id);
        sql.append(StringExtUtil.loadCheckSqlByCheckIdNumList("id", StringUtil.makeListFromString(ids, ",", String.class)));
        return this.execteNativeBulk(sql.toString(), params) == 1 ? true : false;
    }
}