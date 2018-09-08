package com.skytech.project.material.dao.imp;

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
import com.skytech.project.material.dao.IT_Material_InfoDao;
import com.skytech.project.material.model.T_Material_Info;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Repository("t_Material_InfoDao")
public class T_Material_InfoDao extends MainBaseDao<T_Material_Info, String> implements IT_Material_InfoDao {

    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    @Override
    public GridResult search(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                "n.id," +
                "n.material_name," +
                "n.write_user_name," +
                "n.write_user_unitid," +
                "n.write_time," +
                "n.clattachtype," +
                "n.clattach_sub_type," +
                "n.clattachstatus," +
                "n.delstatus ")
                .append(" from t_material_info n where n.delstatus = 0 ");
        String keyword = null;
        String clattachstatus = null;
        String start_time = null;
        String end_time = null;
        Long add_dept_id = null;
        if (map != null) {
            keyword = StringUtil.getStr(map.get("search_keyword"));
            clattachstatus = StringUtil.getStr(map.get("clattachstatus"));
            start_time = StringUtil.getStr(map.get("search_start_time"));
            end_time = StringUtil.getStr(map.get("search_end_time"));
            add_dept_id = Long.parseLong(StringUtil.getStr(map.get("search_add_dept_id")));

        }

        List<Object> list = Lists.newArrayList();//用于设置sql参数
          /* *//* Service 已经判断合法 */
        sql.append(" and n.adderdeptid = ?");
        list.add(add_dept_id);
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and n.material_name like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(clattachstatus)) {
            list.add(Integer.parseInt(clattachstatus.toString()));
            sql.append(" and n.clattachstatus = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(start_time));
                sql.append(" and n.write_time > ? ");
            } catch (Exception e) {
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(end_time));
                sql.append(" and n.write_time < ? ");
            } catch (Exception e) {
            }

        }
        sql.append(" order by n.addtime desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("material_name", StandardBasicTypes.STRING);
        scalarMap.put("write_user_name", StandardBasicTypes.STRING);
        scalarMap.put("write_user_unitid", StandardBasicTypes.LONG);
        scalarMap.put("write_time", StandardBasicTypes.DATE);
        scalarMap.put("clattachtype", StandardBasicTypes.INTEGER);
        scalarMap.put("clattach_sub_type", StandardBasicTypes.INTEGER);
        scalarMap.put("clattachstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("delstatus", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_material_info", gr, null);
        return gr;
    }

    @Override
    public int delList(List<String> strings) {
        StringBuilder sql = new StringBuilder();
        sql.append("update t_material_info set delstatus = 1 ")
                .append(" where delstatus = 0 ")
                .append(StringExtUtil.loadCheckSqlByCheckIdList("id", strings, StringExtUtil.check_col_type_str));
        return this.execteNativeBulk(sql.toString(), null);
    }

    @Override
    public GridResult submissionList(PageInfo pageInfo, Map map) {
        StringBuilder sql = new StringBuilder();
        sql.append("select " +
                "s.id as mainId," +
                "n.id," +
                "n.material_name," +
                "n.write_user_name," +
                "n.write_user_unitid," +
                "n.write_time," +
                "n.clattachtype," +
                "n.clattach_sub_type," +
                "n.clattachstatus," +
                "s.status   ")
                .append(" from t_material_info n  left join t_material_submission s on n.id = s.material_id " +
                        "WHERE 1 = 1 " +
                        " and n.delstatus = 0 \n" +
                        " and n.clattachstatus = 2 " + //暂时用提交审核状态代表审核通过，后期需要的是工作流中审核通过的数据
                        " and not exists ( select s.material_id from t_material_submission s where s.status = 1 and s.material_id = n.id ) \n");//排除已经报送过的材料数据
        String keyword = null;
        String clattachstatus = null;
        String clattachtype = null;
        String start_time = null;
        String end_time = null;
        Long add_dept_id = null;
        if (map != null) {
            keyword = StringUtil.getStr(map.get("search_keyword"));
            clattachstatus = StringUtil.getStr(map.get("clattachstatus"));
            clattachtype = StringUtil.getStr(map.get("clattachtype"));
            start_time = StringUtil.getStr(map.get("search_start_time"));
            end_time = StringUtil.getStr(map.get("search_end_time"));
            add_dept_id = Long.parseLong(StringUtil.getStr(map.get("search_add_dept_id")));

        }

        List<Object> list = Lists.newArrayList();//用于设置sql参数
          /* *//* Service 已经判断合法 */
        sql.append(" and n.adderdeptid = ?");
        list.add(add_dept_id);
        /* 检索参数 */
        if (!StringUtil.isNullOrWhiteSpace(keyword)) {
            list.add("%" + keyword + "%");
            sql.append(" and n.material_name like ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(clattachstatus)) {
            list.add(Integer.parseInt(clattachstatus.toString()));
            sql.append(" and n.clattachstatus = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(clattachtype)) {
            list.add(Integer.parseInt(clattachtype.toString()));
            sql.append(" and n.clattachtype = ? ");
        }
        if (!StringUtil.isNullOrWhiteSpace(start_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(start_time));
                sql.append(" and n.write_time > ? ");
            } catch (Exception e) {
            }
        }
        if (!StringUtil.isNullOrWhiteSpace(end_time)) {
            try {
                list.add(new SimpleDateFormat("yyyy-MM-dd")
                        .parse(end_time));
                sql.append(" and n.write_time < ? ");
            } catch (Exception e) {
            }

        }
        sql.append(" order by n.addtime desc  ");
        //2、采用标量查询构建键值结构，无需手动转换key的大小写，可以提高性能
        Map<String, Type> scalarMap = Maps.newHashMap();
        scalarMap.put("mainId", StandardBasicTypes.STRING);
        scalarMap.put("id", StandardBasicTypes.STRING);
        scalarMap.put("material_name", StandardBasicTypes.STRING);
        scalarMap.put("write_user_name", StandardBasicTypes.STRING);
        scalarMap.put("write_user_unitid", StandardBasicTypes.LONG);
        scalarMap.put("write_time", StandardBasicTypes.DATE);
        scalarMap.put("clattachtype", StandardBasicTypes.INTEGER);
        scalarMap.put("clattach_sub_type", StandardBasicTypes.INTEGER);
        scalarMap.put("clattachstatus", StandardBasicTypes.INTEGER);
        scalarMap.put("status", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql.toString(), scalarMap, pageInfo, list);
        //调用替换字典值的方法,注意：前台要构造一个"字典列名_text"为列名的列以显示替换后的字典文本
        gr = colsRemarkService.convertCategoryColnums("t_material_info", gr, null);
        gr = colsRemarkService.convertCategoryColnums("t_material_submission", gr, null);
        return gr;
    }
}