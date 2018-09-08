package com.skytech.project.task.dao.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.configphystables.service.IColsRemarkService;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.task.dao.IT_TaskDao;
import com.skytech.project.task.model.T_Task;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("t_TaskDao")
public class T_TaskDao extends MainBaseDao<T_Task, Long> implements IT_TaskDao{
    @Resource(name = "colsRemarkService")
    private IColsRemarkService colsRemarkService;

    public GridResult loadTaskList(PageInfo pageInfo, Map map){
        /*
        *
        * id" IS '主键';

delstatus" IS '删除标识（0否，1是）';

name" IS '任务名称';

m_file_uploaded" IS '监测制度';

task_type" IS '任务类别（1常规任务 2 紧急任务 TASKTYPE）';

task_level" IS '任务级别（1省级，2市级，3区县 LEVELTYPE2）';

task_cycle" IS '任务周期（字典项TASKCYCLE）';

area_id" IS '区划';

task_status" IS '任务状态（0暂存，1已下发，2确认启用，3停用TASKSTATUS）

is_parent" IS '是否有子表（0否1，是）';

parent_id" IS '主表id';

task_classes" IS '监测类型（1基准商品2建材商品3民生商品 TASKCLASSES）';
*/
        String name = StringUtil.getStr(map.get("name"));
        String task_type = StringUtil.getStr(map.get("task_type"));
        String task_level = StringUtil.getStr(map.get("task_level"));
        String task_status = StringUtil.getStr(map.get("task_status"));



        String sql="select t.id,t.delstatus,t.name,t.m_file_uploaded,t.task_type,t.task_level,t.task_cycle,t.area_id,t.task_status,t.is_parent,t.parent_id,t.task_classes\n" +
                "from t_task t where 1=1";
        List<Object> list = new ArrayList();//用于设置sql参数
        if (!StringUtil.isNullOrWhiteSpace(name)) {
            list.add( "%"+name+"%" );
            sql+=" and t.name like ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(task_type)) {
            list.add( Integer.parseInt(task_type) );
            sql+=" and t.task_type = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(task_level)) {
            list.add( Integer.parseInt(task_level) );
            sql+=" and t.task_level = ? \n";
        }
        if (!StringUtil.isNullOrWhiteSpace(task_status)) {
            list.add( Integer.parseInt(task_status) );
            sql+=" and t.task_status = ? \n";
        }

        HashMap<String, Type> scalarmap=new HashMap<String,Type>();
        scalarmap.put("id", StandardBasicTypes.INTEGER);
        scalarmap.put("delstatus", StandardBasicTypes.INTEGER);
        scalarmap.put("name", StandardBasicTypes.STRING);
        scalarmap.put("m_file_uploaded", StandardBasicTypes.STRING);
        scalarmap.put("task_type", StandardBasicTypes.INTEGER);
        scalarmap.put("task_level", StandardBasicTypes.INTEGER);
        scalarmap.put("task_cycle", StandardBasicTypes.INTEGER);
        scalarmap.put("area_id", StandardBasicTypes.INTEGER);
        scalarmap.put("task_status", StandardBasicTypes.INTEGER);
        scalarmap.put("is_parent", StandardBasicTypes.INTEGER);
        scalarmap.put("parent_id", StandardBasicTypes.INTEGER);
        scalarmap.put("task_classes", StandardBasicTypes.INTEGER);
        GridResult gr = this.listByNativeByPage(sql,scalarmap, pageInfo,list);
        gr =  colsRemarkService.convertCategoryColnums("t_task",gr,null);
        return gr;
    }

	
}