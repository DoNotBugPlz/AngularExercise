package com.skytech.project.exchange.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.exchange.dao.IT_Exchange_InfoDao;
import com.skytech.project.exchange.model.T_Exchange_Info;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_Exchange_InfoDao")
public class T_Exchange_InfoDao extends MainBaseDao<T_Exchange_Info, Long> implements IT_Exchange_InfoDao {

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        sql.append("select\n" +
                " n.id,\n" +
                " n.question_title,\n" +
                " n.question_user_name,\n" +
                " n.question_add_time,\n" +
                " n.answer_status,\n" +
                " n.answer_user_name,\n" +
                " n.answer_time,\n" +
                " n.answer_content \n" +
                "from\n" +
                " t_exchange_info n \n" +
                "where\n" +
                " n.delstatus = 0 ");
        String search_keyword = null;
        String question = null;
        String answer_status = null;
        String question_start_time = null;
        String question_end_time = null;
        String answer_start_time = null;
        String answer_end_time = null;
        String answer = null;
        Long add_dept_id = null;
        if (map != null) {
            search_keyword = StringUtil.getStr(map.get("search_keyword"));
            question = StringUtil.getStr(map.get("question"));
            answer_status = StringUtil.getStr(map.get("answer_status"));
            question_start_time = StringUtil.getStr(map.get("question_start_time"));
            question_end_time = StringUtil.getStr(map.get("question_end_time"));
            answer_start_time = StringUtil.getStr(map.get("answer_start_time"));
            answer_end_time = StringUtil.getStr(map.get("answer_end_time"));
            answer = StringUtil.getStr(map.get("answer"));
            add_dept_id = Long.parseLong(StringUtil.getStr(map.get("search_add_dept_id")));
        }
        List<Object> list = Lists.newArrayList();//用于设置sql参数
          /* *//* Service 已经判断合法 */
        sql.append(" and n.adderdeptid = ?");
        list.add(add_dept_id);
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(search_keyword)) {
            list.add("%" + search_keyword + "%");
            list.add("%" + search_keyword + "%");
            sql.append(" and (  n.question_title like ?  or n.answer_content like ? )");
        }
        if (!StringUtil.isNullOrWhiteSpace(question)) {
            list.add("%" + question + "%");
            sql.append(" and n.question_user_name like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(answer_status)) {
            list.add(Integer.parseInt(answer_status.toString()));
            sql.append(" and n.answer_status = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(question_start_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(question_start_time));
                sql.append(" and n.question_add_time > ? ");
            } catch (Exception e) {
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(question_end_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(question_end_time));
                sql.append(" and n.question_add_time < ? ");
            } catch (Exception e) {
            }

        }
        if (!StringUtil.isNullOrWhiteSpace(answer_start_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(answer_start_time));
                sql.append(" and n.answer_time > ? ");
            } catch (Exception e) {
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(answer_end_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(answer_end_time));
                sql.append(" and n.answer_time < ? ");
            } catch (Exception e) {
            }

        }
        if (!StringUtil.isNullOrWhiteSpace(answer)) {
            list.add("%" + answer + "%");
            sql.append(" and n.answer_user_name like ? ");
        }
        sql.append(" order by n.addtime desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("question_title", StandardBasicTypes.STRING);
        scalarMap.put("question_user_name", StandardBasicTypes.STRING);
        scalarMap.put("question_add_time", StandardBasicTypes.DATE);
        scalarMap.put("answer_status", StandardBasicTypes.INTEGER);
        scalarMap.put("answer_user_name", StandardBasicTypes.STRING);
        scalarMap.put("answer_time", StandardBasicTypes.DATE);
        scalarMap.put("answer_content", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_exchange_info", gr, null);
        return gr;
    }

    @Override
    public int delList(List<String> strings) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_exchange_info set delstatus = 1 ")
                .append(" where delstatus = 0 ")
                .append(StringExtUtil.loadCheckSqlByCheckIdList("id", strings, StringExtUtil.check_col_type_str));
        return this.execteNativeBulk(sql.toString(), null);
    }
}