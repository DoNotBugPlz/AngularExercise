package com.skytech.project.organisation.dao.imp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.organisation.dao.ICf_User_SignDao;
import com.skytech.project.organisation.model.Cf_User_Sign;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("cf_User_SignDao")
public class Cf_User_SignDao extends MainBaseDao<Cf_User_Sign, String> implements ICf_User_SignDao{
    /**
     * 查询人员列表，可以传查询条件
     * @param pageinfo
     * @return
     */
    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT su.chinaname,\n" +
                "       cue. ID,\n" +
                "       cms. ID m_id,\n" +
                "       cms.NAME site_name,\n" +
                "       (SELECT COUNT(cus. ID)\n" +
                "          FROM cf_user_sign cus\n" +
                "         WHERE cus.user_id = cue. ID\n" +
                "           AND cus.monitor_point_id = cms. ID) actual_sign_nums\n" +
                "  FROM cf_user_ext cue\n" +
                "  LEFT JOIN sys_user su\n" +
                "    ON cue.sys_user_id = su. ID\n" +
                "  LEFT JOIN cf_m_site_user_link cmsul\n" +
                "    ON cue. ID = cmsul.m_user_id\n" +
                "  LEFT JOIN cf_m_site cms\n" +
                "    ON cms. ID = cmsul.m_site_id\n" +
                "  LEFT JOIN cf_user_sign cus_1\n" +
                "    ON cus_1.user_id = cue.ID\n" +
                "   AND cus_1.monitor_point_id = cms.ID\n" +
                " where 1=1 and cue.user_type = 3 ");
        String chinaname = null;
        String start_date = null;
        String end_date = null;
        String monitor_point_id = null;
        String delstatus = null;
        
        if (map != null) {
            chinaname = StringUtil.getStr(map.get("chinaname"));
            start_date = StringUtil.getStr(map.get("start_date"));
            end_date = StringUtil.getStr(map.get("end_date"));
            monitor_point_id = StringUtil.getStr(map.get("monitor_point_id"));
            delstatus = StringUtil.getStr(map.get("end_person_num"));
        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        if (!StringUtil.isNullOrWhiteSpace(chinaname)) {
            list.add("%" + chinaname + "%");
            sql.append("and su.chinaname like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(start_date)) {
            list.add(start_date);
            sql.append(" and cus_1.addtime >=  to_date(?,'yyyy-MM-dd')" ) ;
        }
        if (!StringUtil.isNullOrWhiteSpace(end_date)) {
            list.add(end_date);
            sql.append(" and cus_1.addtime <=  to_date(?,'yyyy-MM-dd')" ) ;
        }
        if (!StringUtil.isNullOrWhiteSpace(monitor_point_id)) {
            list.add(monitor_point_id);
            sql.append(" and cms.id = ? ");
        }
        sql.append("  GROUP BY su.chinaname,cue.ID, cms.ID, cms.NAME  ORDER BY cue.ID, cms.ID ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("chinaname", StandardBasicTypes.STRING);
        scalarMap.put("m_id", StandardBasicTypes.STRING);
        scalarMap.put("site_name", StandardBasicTypes.STRING);
        scalarMap.put("actual_sign_nums", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        return gr;
    }
	
}