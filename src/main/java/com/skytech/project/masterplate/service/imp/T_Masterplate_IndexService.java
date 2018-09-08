package com.skytech.project.masterplate.service.imp;

import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.masterplate.dao.IT_Masterplate_IndexDao;
import com.skytech.project.masterplate.model.T_Masterplate_Index;
import com.skytech.project.masterplate.service.IT_Masterplate_IndexService;
import com.skytech.project.organisation.model.LoginUserInf;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("t_Masterplate_IndexService")
public class T_Masterplate_IndexService extends BaseService<T_Masterplate_Index, Long> implements IT_Masterplate_IndexService {

    private IT_Masterplate_IndexDao t_Masterplate_IndexDao;

    @Resource(name = "t_Masterplate_IndexDao")
    @Override
    public void setBaseDao(IDao<T_Masterplate_Index, Long> baseDao) {
        this.t_Masterplate_IndexDao = (IT_Masterplate_IndexDao) baseDao;
        this.baseDao = baseDao;
    }


    @Override
    public ResultJO search(PageInfo pageInfo) {
        return ResultJO.getDefaultResult(t_Masterplate_IndexDao.search(pageInfo));
    }

    @Override
    public int delList(List<String> strings) {
        return t_Masterplate_IndexDao.delList(strings);
    }

    @Override
    public void delTrend(String parentId) {
        t_Masterplate_IndexDao.delTrend(parentId);
    }

    @Override
    public ResultJO saveChildren(LoginUserInf loginUserInf, Long parentId, List<T_Masterplate_Index> childList) {
        if (childList.size() > 0) {
            //循环新增子走势
            for (int i = 0; i < childList.size(); i++) {
                //当前用户主键
                childList.get(i).setAdder(loginUserInf.getCurrentUserId());
                //当前用户所属主键
                childList.get(i).setAdderdeptid(loginUserInf.getCurrentDeptId());
                childList.get(i).setAddtime(new Date());
                childList.get(i).setDelstatus(0);
                childList.get(i).setParent_id(parentId);
                t_Masterplate_IndexDao.save(childList.get(i));
                return ResultJO.getDefaultResult(null, "保存成功！");
            }
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    @Override
    public ResultJO updateChildren(LoginUserInf loginUserInf, List<T_Masterplate_Index> childList) {
        if (childList.size() > 0) {
            //循环新增新的子走势
            for (int i = 0; i < childList.size(); i++) {
                //当前用户主键
                childList.get(i).setAdder(loginUserInf.getCurrentUserId());
                //当前用户所属主键
                childList.get(i).setAdderdeptid(loginUserInf.getCurrentDeptId());
                childList.get(i).setAddtime(new Date());
                childList.get(i).setDelstatus(0);
                t_Masterplate_IndexDao.save(childList.get(i));
            }
        }
        return ResultJO.getDefaultResult(null, "保存成功！");
    }


}