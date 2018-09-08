package com.skytech.config.file;

import com.skytech.basic.core.util.DateUtil;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.file.model.ICustomFileInfo;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * Created by Administrator on 2015/8/26.
 */
public class  CustomFileInfoNew implements ICustomFileInfo {

    public CustomFileInfoNew() {
        //````D
    }

    //文件名规则
    @Override
    public String getFilestorename(HttpServletRequest httpServletRequest) {
        return this.getFilestorename();
    }

    @Override
    public String secondProcessFilestorename(String filename, HttpServletRequest httpServletRequest) {
        return filename;
    }

    //文件存放路径规则
    @Override
    public String getFilestorepath(HttpServletRequest httpServletRequest) {
        String tablename=httpServletRequest.getParameter("tablename");
        if(StringUtil.isNullOrWhiteSpace(tablename)){
            tablename = "z_other";
        }
        String filePath = this.getFilestorepath( tablename);
        return filePath;
    }

    public static String getFilestorename() {
        String fileStoreName = UUID.randomUUID().toString();
        return fileStoreName;
    }
    public static String getFilestorepath(String tablename) {
        String fileSplit = "/";
        int year= DateUtil.getNowYear();
        String month= DateUtil.getNowMonth();
        String num=DateUtil.getNowDay();
        String filePath = fileSplit+"upload"+fileSplit+tablename+fileSplit+year+fileSplit+month+"_"+num;
        return filePath;
    }
}
