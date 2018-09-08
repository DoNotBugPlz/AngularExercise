package com.skytech.project.shortcutmenu.service.imp;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.skytech.persistence.dao.IDao;
import com.skytech.persistence.service.BaseService;
import com.skytech.project.shortcutmenu.dao.IT_Shortcut_MenuDao;
import com.skytech.project.shortcutmenu.service.IT_Shortcut_MenuService;
import com.skytech.project.shortcutmenu.model.T_Shortcut_Menu;

@Service("t_Shortcut_MenuService")
public class T_Shortcut_MenuService extends BaseService<T_Shortcut_Menu, Long> implements IT_Shortcut_MenuService{

	private IT_Shortcut_MenuDao t_Shortcut_MenuDao;

	@Resource(name="t_Shortcut_MenuDao")
	@Override
	public void setBaseDao(IDao<T_Shortcut_Menu, Long> baseDao) {
		this.t_Shortcut_MenuDao = (IT_Shortcut_MenuDao)baseDao;
		this.baseDao = baseDao;
	}


	@Override
	public void delOldshortcut(Long userId) {
		t_Shortcut_MenuDao.delOldshortcut(userId);
	}
}