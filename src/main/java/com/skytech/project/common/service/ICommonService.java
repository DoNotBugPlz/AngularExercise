package com.skytech.project.common.service;

import com.skytech.attachfile.model.Sys_Attachfile;
import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by LEE on 2017/5/31.
 */
public interface ICommonService {
    void onDropMenu(Map<String, Object> map);

    void onDropPeop(Map<String, Object> map);

    void onDropGrid(Map<String, Object> map);

    void onDropChildMenu(Map<String, Object> map);

    Sys_Attachfile uploadAndSaveFileInfo(MultipartFile fileData, Sys_Attachfile sys_attachfile,String oldFileId,  HttpServletRequest request, HttpServletResponse response);

    void downLoadFile(String fileid, HttpServletResponse response, HttpServletRequest request) throws Exception;

    List loadDeptUserTreeBySync(String deptid);

    List loadUserModule();


    List loadSonCategoryvalueList(String constname, String parent_refid);

    List loadDeptTreeBySync();

    void SyncDate(String sync_key);

    void dataDragSort(Map map);

    GridResult loadFileList(Map map, PageInfo pageInfo);
}
