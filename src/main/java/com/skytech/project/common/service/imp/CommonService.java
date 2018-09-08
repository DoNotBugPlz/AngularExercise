package com.skytech.project.common.service.imp;

import com.skytech.attachfile.dao.ISys_AttachfileDao;
import com.skytech.attachfile.model.Sys_Attachfile;
import com.skytech.attachfile.service.ISys_AttachfileService;
import com.skytech.basic.core.util.BeanUtilsExtend;
import com.skytech.basic.core.util.FileUtil;
import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.config.param.SysParam;
import com.skytech.file.extra.StreamHandler;
import com.skytech.file.ftp.model.FtpEntity;
import com.skytech.file.local.model.UploadEntity;
import com.skytech.file.model.ICustomFileInfo;
import com.skytech.file.util.FileSpringContextUtil;
import com.skytech.file.util.FileStringUtil;
import com.skytech.organisation.model.Sys_User;
import com.skytech.organisation.service.IUserService;
import com.skytech.project.common.dao.ICommonDao;
import com.skytech.project.common.service.ICommonService;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

import static com.skytech.file.util.FtpUtils.connectFtp;

/**
 * Created by LEE on 2017/5/31.
 */
@Service("CommonService")
class CommonService implements ICommonService {

    @Resource(name = "commonDao")
    private ICommonDao commonDao;
    @Resource(name = "sys_AttachfileService")
    private ISys_AttachfileService sys_AttachfileService;

    @Resource(name = "CommonService")
    private ICommonService CommonService;


    @Autowired
    private HttpServletRequest request;

    private ICustomFileInfo customFileInfo;

    private StreamHandler streamHandler;

    @Resource(name = "userService")
    private IUserService userService;

    @Resource(name = "sys_AttachfileDao")
    private ISys_AttachfileDao sys_AttachfileDao;

    @Override
    public void onDropMenu(Map<String, Object> map) {
        commonDao.onDropMenu(map);
    }

    @Override
    public void onDropPeop(Map<String, Object> map) {
        commonDao.onDropPeop(map);
    }

    @Override
    public void onDropGrid(Map<String, Object> map) {
        commonDao.onDropGrid(map);
    }

    @Override
    public void onDropChildMenu(Map<String, Object> map) {
        commonDao.onDropChildMenu(map);
    }


    /**
     * 上传附件并保存
     *
     * @param fileData
     * @param sys_attachfile
     * @param request
     * @param response
     * @return
     */
    /**
     * 上传附件并保存
     *
     * @param fileData
     * @param sys_attachfile
     * @param request
     * @param response
     * @return
     */
    @Override
    public Sys_Attachfile uploadAndSaveFileInfo(MultipartFile fileData, Sys_Attachfile sys_attachfile,String oldFileId,  HttpServletRequest request, HttpServletResponse response) {
        switch (SysParam.UPLOAD_FILE_TYPE) {
            case SysParam.UPLOAD_FILE_TYPE_LOCAL:
                //上传附件，保存到附件表
                Map map = null;
                try {
                    map = sys_AttachfileService.uploadFile(fileData, request.getSession());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                BeanUtilsExtend.copyMapToProperties(map, sys_attachfile);
                sys_attachfile = this.sys_AttachfileService.saveFile(sys_attachfile);
                break;
            case SysParam.UPLOAD_FILE_TYPE_FTP:
                //ftp文件
                UploadEntity uploadEntity = this.sys_AttachfileService.uploadByFtp(fileData, request, response);
                sys_attachfile.setFilename(uploadEntity.getFilename());
                sys_attachfile.setExtname(uploadEntity.getExtname());
                sys_attachfile.setContenttype(uploadEntity.getContenttype());
                sys_attachfile.setFilesize(uploadEntity.getFilesize());
                sys_attachfile.setStorename(uploadEntity.getFilestorename());
                sys_attachfile.setStorepath(uploadEntity.getFilestorepath());
                sys_attachfile = this.sys_AttachfileService.saveFile(sys_attachfile);
                break;
            case SysParam.UPLOAD_FILE_TYPE_BLOB:
                //数据库二进制
                //上传附件blob
                sys_attachfile = this.sys_AttachfileService.uploadFileToBlob(fileData, sys_attachfile, request);
                break;
        }
        if(!StringUtil.isNullOrWhiteSpace(oldFileId)){
            List delList = new ArrayList();
            delList.add(oldFileId);
            sys_AttachfileService.deleteList(delList);
        }
        return sys_attachfile;
    }

    @Override
    public void downLoadFile(String fileid, HttpServletResponse response, HttpServletRequest request) throws Exception {
        switch (SysParam.UPLOAD_FILE_TYPE) {
            case SysParam.UPLOAD_FILE_TYPE_LOCAL:
                //上传附件，保存到附件表
                sys_AttachfileService.downLoadFile(fileid, response, request);
                break;
            case SysParam.UPLOAD_FILE_TYPE_FTP:
                //ftp文件
                sys_AttachfileService.downLoadFromFtp(fileid, request, response);
                break;
            case SysParam.UPLOAD_FILE_TYPE_BLOB:
                //数据库二进制
                //上传附件blob
                sys_AttachfileService.downLoadFileFromBlob(fileid, response, request);
                break;
        }
    }

    @Override
    public List loadDeptUserTreeBySync(String deptid) {
        return commonDao.loadDeptUserTreeBySync(deptid);
    }

    @Override
    public List loadUserModule() {
        return commonDao.loadUserModule();
    }


    @Override
    public List loadSonCategoryvalueList(String constname, String parent_refid) {
        return commonDao.loadSonCategoryvalueList(constname,parent_refid);
    }

    @Override
    public List loadDeptTreeBySync() {
        return commonDao.loadDeptTreeBySync();
    }

    @Override
    public void SyncDate(String sync_key) {
        commonDao.SyncDate(sync_key);
    }
    /**
     *
     * ztree 拖动排序通用方法
     * @param map {
     *       moveType：移动类型
     *       tableName：表名
     *       idColName：主键字段名称
     *       idColType：主键字段类型
     *       parentIdColName：父主键字段名称
     *       sortindexColName：排序字段名称
     *       id：移动数据主键
     *       targetId：目标数据主键
     *       targetParentId：目标数据父主键
     * }
     */
    @Override
    public void dataDragSort(Map map) {
        String moveType = StringUtil.getStr(map.get("moveType"));
        String tableName = StringUtil.getStr(map.get("tableName"));
        String idColName = StringUtil.getStr(map.get("idColName"));
        String idColType = StringUtil.getStr(map.get("idColType"));
        String parentIdColName = StringUtil.getStr(map.get("parentIdColName"));
        String sortindexColName = StringUtil.getStr(map.get("sortindexColName"));
        String id = StringUtil.getStr(map.get("id"));
        String targetId = StringUtil.getStr(map.get("targetId"));
        switch (moveType){
            case "inner":
                commonDao.sortRecordInner(id,targetId,tableName,idColName,idColType,parentIdColName,sortindexColName);
                break;
            case "prev":
                commonDao.sortRecordPrev(id,targetId,tableName,idColName,idColType,parentIdColName,sortindexColName);
                break;
            case "next":
                commonDao.sortRecordNext(id,targetId,tableName,idColName,idColType,parentIdColName,sortindexColName);
                break;
        }

    }

    @Override
    public GridResult loadFileList(Map map, PageInfo pageInfo) {

        return commonDao.loadFileList( map,  pageInfo);
    }


}
