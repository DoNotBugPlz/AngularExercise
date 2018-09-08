package com.skytech.project.office.notice.dao.imp;

import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.util.StringExtUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.office.notice.dao.IT_Notice_ObjectDao;
import com.skytech.project.office.notice.model.T_Notice_Object;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("t_Notice_ObjectDao")
public class T_Notice_ObjectDao extends MainBaseDao<T_Notice_Object, String> implements IT_Notice_ObjectDao {


    @Override
    public int delObjectList(List<Long> user_ids, String notice_id) {
        if (!StringUtil.isNullOrWhiteSpace(notice_id)) {
            StringBuilder sql = new StringBuilder();
            sql.append("update t_notice_object  set  delstatus = 1 ")
                    .append(" where  delstatus = 0 ");
            List<Object> params = new ArrayList<>();
            sql.append(" and notice_id = ? ");
            params.add(notice_id);
//            sql.append(StringExtUtil.loadCheckSqlByCheckIdList(" user_id", user_ids, StringExtUtil.check_col_type_int));
            return this.execteNativeBulk(sql.toString(), params);
        }
        return -1;
    }

    @Override
    public List getNoticeObjects(Map noticeParams) {
        StringBuilder sql = new StringBuilder();
        sql.append("select tno.id," +
                " tno.notice_id," +
                " tno.dept_id," +
                " tno.user_id," +
                " tno.object_type," +
                " su.chinaname as name," +
                " d.chinaname as dept_name," +
                " d.simplechinaname as sdept_name")
                .append(" from t_notice_object tno ")
                .append(" left join cf_user_ext cue on cue.id = tno.user_id" +
                        " left join sys_user su on su.id = cue.sys_user_id" +
                        " left join sys_dept d on d.id = su.deptid ")
                .append(" where tno.delstatus = 0" +
                        " and  su.delstatus = 0" +
                        " and cue.delstatus = 0" +
                        " and d.delstatus = 0 ");
        List<Object> params = new ArrayList<>();
        if (!StringUtil.isNullOrWhiteSpace(StringUtil.getStr(noticeParams.get("notice_id")))) {
            params.add(StringUtil.getStr(noticeParams.get("notice_id")));
            sql.append(" and tno.notice_id = ?");
        }
        if (!StringUtil.isNullOrWhiteSpace(StringUtil.getStr(noticeParams.get("dept_id")))) {
            params.add(Long.parseLong(StringUtil.getStr(noticeParams.get("dept_id"))));
            sql.append(" and tno.dept_id = ?");
        }
        if (!StringUtil.isNullOrWhiteSpace(StringUtil.getStr(noticeParams.get("user_id")))) {
            params.add(Long.parseLong(StringUtil.getStr(noticeParams.get("user_id"))));
            sql.append(" and tno.user_id = ?");
        }
        if (!StringUtil.isNullOrWhiteSpace(StringUtil.getStr(noticeParams.get("object_type")))) {
            params.add(Integer.parseInt(StringUtil.getStr(noticeParams.get("object_type"))));
            sql.append(" and tno.object_type = ?");
        }
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("notice_id", StandardBasicTypes.STRING);
        scalarMap.put("dept_id", StandardBasicTypes.LONG);
        scalarMap.put("user_id", StandardBasicTypes.LONG);
        scalarMap.put("object_type", StandardBasicTypes.INTEGER);
        scalarMap.put("name", StandardBasicTypes.STRING);
        scalarMap.put("dept_name", StandardBasicTypes.STRING);
        scalarMap.put("sdept_name", StandardBasicTypes.STRING);
        return this.listByNative(sql.toString(), scalarMap, params);
    }
}