package com.skytech.project.organisation.service.imp;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.organisation.dao.ICf_User_ExtDao;
import com.skytech.project.organisation.model.Cf_User_Ext;
import com.skytech.project.organisation.service.ICf_User_ExtService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("cf_User_ExtService")
public class Cf_User_ExtService extends BaseService<Cf_User_Ext, Long> implements ICf_User_ExtService {
    @Resource(name = "userService")
    private IUserService userService;

    @Resource(name = "cf_User_ExtDao")
    private ICf_User_ExtDao cf_User_ExtDao;

    @Override
    public void setBaseDao(IDao<Cf_User_Ext, Long> baseDao) {
        this.cf_User_ExtDao = (ICf_User_ExtDao) baseDao;
        this.baseDao = baseDao;
    }

    @Override
    public Sys_User saveForm(Sys_User user, Cf_User_Ext userExt) {
        boolean isAdd = false;
        if (StringUtil.isNullOrWhiteSpace(user.getId())) {
            isAdd = true;
        }
        user = userService.save(user);
        userExt.setSys_user_id(user.getId());
        userExt.setDelstatus(user.getDelstatus());
        if (isAdd) {
            cf_User_ExtDao.save(userExt);
        } else {
            cf_User_ExtDao.update(userExt);
        }
        return user;
    }

    /**
     * 查询工作人员列表
     */
    @Override
    public GridResult loadWorkUserList(PageInfo pageinfo, Map map) {
        return cf_User_ExtDao.loadWorkUserList(pageinfo, map);
    }

    @Override
    public Cf_User_Ext loadCfUserExtBySysUserId(String sysUserId) {
        return cf_User_ExtDao.loadCfUserExtBySysUserId(sysUserId);
    }

    /**
     * 批量修改用户状态
     * @param userExtList
     * @param delstatus
     */
    @Override
    public void batchModUserDelstatus(List<Long> userExtList, Integer delstatus) {
        //循环修改用户状态
        for (Long userId : userExtList) {
            Sys_User user = new Sys_User();
            Cf_User_Ext userExt = new Cf_User_Ext();

            //修改cf_user表
            userExt.setId(userId);
            userExt.setDelstatus(delstatus);
            userExt = cf_User_ExtDao.saveOrUpdateWithNotNullProperties(userExt);

            //修改sys_user表
            user.setId(userExt.getSys_user_id());
            user.setDelstatus(delstatus);
            userService.saveOrUpdateWithNotNullProperties(user);
        }
    }
}