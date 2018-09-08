package com.skytech.project.matter.dao.imp;

import org.springframework.stereotype.Repository;
import com.skytech.persistence.dao.MainBaseDao;
import com.skytech.project.matter.dao.IT_Matter_MaterialDao;
import com.skytech.project.matter.model.T_Matter_Material;

@Repository("t_Matter_MaterialDao")
public class T_Matter_MaterialDao extends MainBaseDao<T_Matter_Material, String> implements IT_Matter_MaterialDao{

	
}