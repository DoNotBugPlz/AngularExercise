package com.skytech.config.param;

import com.skytech.basic.core.constants.CommonParam;
import com.skytech.basic.core.util.PropertyFileUtil;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;

import java.util.HashMap;
import java.util.Map;

public class SysParam extends CommonParam {

    /**
     * 登录用户Session名称
     */
    public static final String CURRENT_LOGIN_SESSION_NAME = "CURRENT_LOGIN_SESSION_NAME";

    public static final String SESSION_PIC_CODE_NAME = "pic_code";


    public static final int UPLOAD_FILE_TYPE_LOCAL = 1;
    public static final int UPLOAD_FILE_TYPE_FTP = 2;
    public static final int UPLOAD_FILE_TYPE_BLOB = 3;
    public static  int UPLOAD_FILE_TYPE = UPLOAD_FILE_TYPE_LOCAL;

    //数据类型
    public static Map<String,Type> BASIC_TYPE_MAP = new HashMap<String,Type>();
    static {
        PropertyFileUtil.init();
        //数据类型
        BASIC_TYPE_MAP.put("STRING", StandardBasicTypes.STRING);
        BASIC_TYPE_MAP.put("LONG", StandardBasicTypes.LONG);
        BASIC_TYPE_MAP.put("INTEGER", StandardBasicTypes.INTEGER);
        BASIC_TYPE_MAP.put("DATE", StandardBasicTypes.DATE);
        BASIC_TYPE_MAP.put("TIMESTAMP", StandardBasicTypes.TIMESTAMP);
        BASIC_TYPE_MAP.put("CALENDAR", StandardBasicTypes.CALENDAR);
        BASIC_TYPE_MAP.put("TIME", StandardBasicTypes.TIME);
        BASIC_TYPE_MAP.put("BIG_DECIMAL", StandardBasicTypes.BIG_DECIMAL);

        UPLOAD_FILE_TYPE = Integer.parseInt(PropertyFileUtil.get("UPLOAD_FILE_TYPE"));
    }
}
