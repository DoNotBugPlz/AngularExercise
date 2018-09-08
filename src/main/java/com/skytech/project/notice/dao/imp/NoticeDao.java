package com.skytech.project.notice.dao.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.project.notice.dao.INoticeDao;
import com.skytech.project.notice.model.Notice;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import com.skytech.dataprivilege.main.DataPrivilegeVerify;
import com.skytech.persistence.dao.MainBaseDao;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.springframework.transaction.annotation.Transactional;

@Repository("noticeDao")
public class NoticeDao extends MainBaseDao<Notice, String> implements INoticeDao{


    @Autowired
    private HttpServletRequest request;

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    /**
     * 查询通知列表，可以传查询条件
     *
     * @param pageinfo
     * @return
     */
    @Override
    public GridResult search(PageInfo pageinfo, Map map) {
        //1、构造hql
        StringBuilder sql = new StringBuilder();
        sql.append("select n.id,n.delstatus,n.title,n.add_time,n.is_public as pub,n.adder,n.adder_deptid ")
                .append(" from notice n where 1=1  ");
        String keyword = null;
        String ispublic = null;
        if (map != null) {
            keyword =StringUtil.getStr(map.get("keyword")) ;
            ispublic = StringUtil.getStr(map.get("is_public")) ;
        }
        List<Object> list = Lists.newArrayList();//用于设置hql参数
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and n.title like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(ispublic)) {
            list.add(ispublic);
            sql.append(" and n.is_public = ? ");
        }

        //sql = DataPrivilegeVerify.getInstance().verify(sql.toString(), request, "n");//权限审核

        sql.append(" order by n.add_time desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("title", StandardBasicTypes.STRING);
        scalarMap.put("add_time", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("pub", StandardBasicTypes.INTEGER);
        scalarMap.put("adder", StandardBasicTypes.STRING);
        scalarMap.put("adder_deptid", StandardBasicTypes.STRING);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageinfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        Map<String, String> renameMap = Maps.newHashMap();
        renameMap.put("is_public", "pub");
        colsRemarkService.convertCategoryColnums("notice", gr, renameMap);
        return gr;
    }

    /**
     * 取当前通知对象(多表)
     *
     * @param id 当前通知的主键
     * @return 当前通知
     */
    @Override
    @Transactional
    public Map<String, Object> loadForm(String id) {
        StringBuilder sql = new StringBuilder();
        sql.append("select n.id,n.title,n.add_time,n.receiver_ids,n.receiver_names,n.content,n.is_public,u.id adder,u.chinaname reger_name,d.id adder_deptid,d.chinaname deptname  ")
                .append(" from notice n left join sys_user u on n.adder=u.id left join sys_dept d on u.deptid=d.id where 1=1 ");
        List<Object> list = Lists.newArrayList();
        list.add(id);
        sql.append(" and n.id=? ");
        HashMap<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("title", StandardBasicTypes.STRING);
        scalarMap.put("add_time", StandardBasicTypes.TIMESTAMP);
        scalarMap.put("receiver_ids", StandardBasicTypes.STRING);
        scalarMap.put("receiver_names", StandardBasicTypes.STRING);
        scalarMap.put("content", StandardBasicTypes.STRING);
        scalarMap.put("is_public", StandardBasicTypes.INTEGER);
        scalarMap.put("adder", StandardBasicTypes.STRING);
        scalarMap.put("reger_name", StandardBasicTypes.STRING);
        scalarMap.put("adder_deptid", StandardBasicTypes.STRING);
        scalarMap.put("deptname", StandardBasicTypes.STRING);
        HashMap<String, Object> hashmap = Maps.newHashMap();
        hashmap.put("notice", this.uniqueByNative(sql.toString(), scalarMap, list));
        return hashmap;
    }
}














