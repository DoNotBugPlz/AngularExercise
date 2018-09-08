package com.skytech.project.office.notice.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.office.notice.dao.IT_Notice_ReadDao;
import com.skytech.project.office.notice.model.T_Notice_Read;
import com.skytech.util.ParamsUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_Notice_ReadDao")
public class T_Notice_ReadDao extends MainBaseDao<T_Notice_Read, String> implements IT_Notice_ReadDao {


    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult searchSelf(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        pageInfo = ParamsUtil.isNullOfPageInfo(pageInfo);
        sql.append("select " +
                " tno.id as object_id," +
                " n.id, " +
                " n.title, " +
                " n.content, " +
                " n.is_public, " +
                " n.delstatus, " +
                " n.data_type, " +
                " n.adder, " +
                " n.addtime, " +
                " n.public_time, " +
                " n.reference_no, " +
                " n.describe, " +
                " n.adderdeptid, " +
                " NVL ( nr.is_read, 0 ) AS is_read," +
                " min(nr.read_time) as read_time ")
                .append("from " +
                        " t_notice_object tno " +
                        " left join t_notice n on n.id = tno.notice_id " +
                        " left join t_notice_read nr on nr.notice_object_id = tno.id ")
                .append(
                        "where " +
                                " tno.delstatus = 0 " +
                                " and n.delstatus = 0 " +
                                " and n.is_public = 1 " +
                                " and n.public_time < now() ");
        String serch_data_type = StringUtil.getStr(map.get("serch_data_type"));
        String search_title = StringUtil.getStr(map.get("search_title"));
        String search_start_time = StringUtil.getStr(map.get("search_start_time"));
        String search_end_time = StringUtil.getStr(map.get("search_end_time"));
        String search_is_read = StringUtil.getStr(map.get("search_is_read"));
        String user_id = StringUtil.getStr(map.get("user_id"));

        List<Object> list = Lists.newArrayList();//用于设置sql参数
        /* data_type 接口中定义必须要有 */
        sql.append(" and n.data_type = ?");
        list.add(Integer.parseInt(serch_data_type));
        /* Service 已经判断合法 */
        sql.append(" and tno.user_id = ?");
        list.add(Long.parseLong(user_id));
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(search_title)) {
            sql.append(" and n.title like '%" + search_title + "%'");
        }
        if (!StringUtil.isNullOrWhiteSpace(search_end_time)) {
            list.add(new java.util.Date(search_end_time));
            sql.append(" and n.public_time < ?");
        }
        if (!StringUtil.isNullOrWhiteSpace(search_start_time)) {
            list.add(new java.util.Date(search_start_time));
            sql.append(" and n.public_time > ?");
        }
        if (!StringUtil.isNullOrWhiteSpace(search_is_read) && search_is_read.equalsIgnoreCase("0")) {
            sql.append(" and ( nr.id is null  or nr.is_read = 0 ) ");
        } else {
            sql.append(" and  nr.is_read = 1  ");
        }
        //sql = DataPrivilegeVerify.getInstance().verify(sql.toString(), request, "n");//权限审核
        sql.append(" group by tno.ID,n.ID, nr.is_read ");
        sql.append(" order by n.public_time desc,n.addtime desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("object_id", StandardBasicTypes.STRING);
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("title", StandardBasicTypes.STRING);
        scalarMap.put("content", StandardBasicTypes.STRING);
        scalarMap.put("is_public", StandardBasicTypes.INTEGER);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("data_type", StandardBasicTypes.INTEGER);
        scalarMap.put("adder", StandardBasicTypes.LONG);
        scalarMap.put("addtime", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("public_time", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("reference_no", StandardBasicTypes.STRING);
        scalarMap.put("describe", StandardBasicTypes.STRING);
        scalarMap.put("adderdeptid", StandardBasicTypes.LONG);
        scalarMap.put("is_read", StandardBasicTypes.INTEGER);
        scalarMap.put("read_time", StandardBasicTypes.TIMESTAMP);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_notice_read", gr, null);
        return gr;
    }

}