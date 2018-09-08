package com.skytech.project.common.dao;

import com.skytech.basic.wrapper.GridResult;
import com.skytech.basic.wrapper.PageInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by LEE on 2017/5/31.
 */
public interface ICommonDao   {
    void onDropMenu(Map<String, Object> map);

    void onDropPeop(Map<String, Object> map);

    void onDropChildMenu(Map<String, Object> map);

    void onDropGrid(Map<String, Object> map);

    List loadDeptUserTreeBySync(String deptid);

    List loadUserModule();


    List loadSonCategoryvalueList(String constname, String parent_refid);

    List loadDeptTreeBySync();

    void SyncDate(String sync_key);

    void sortRecordInner(String id, String parentId,String tableName,String idColName,String idColType,String parentIdColName,String sortindexColName);

    void sortRecordPrev(String id, String targetId, String tableName, String idColName, String idColType, String parentIdColName, String sortindexColName);

    void sortRecordNext(String id, String targetId, String tableName, String idColName, String idColType, String parentIdColName, String sortindexColName);

    GridResult loadFileList(Map map, PageInfo pageInfo);
}
