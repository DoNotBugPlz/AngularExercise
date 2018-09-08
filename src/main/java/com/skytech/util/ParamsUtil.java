package com.skytech.util;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import io.swagger.models.auth.In;

import java.util.Iterator;
import java.util.Map;

/**
 * @author maxzhao
 * @time 2018/08/14
 * @descript handle Map
 */
public class ParamsUtil {
    public static Integer pageNum = 1;
    public static Integer pageSize = 10;

    /**
     * 去除map中value为空的键值对
     *
     * @param map
     */
    public static void removeNull(Map map) {
        Iterator<Map.Entry> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = iterator.next();
            if (StringUtil.isNullOrWhiteSpace(StringUtil.getStr(entry.getValue()))) {
                iterator.remove();
            }
        }
    }

    /**
     * 当前pageInfo为空  赋默认值
     *
     * @param pageInfo
     */
    public static void removeNullOfPageInfo(PageInfo pageInfo) {
        if (pageInfo.getPageNumber() < 0) {
            pageInfo.setPageNumber(pageNum);
        }
        if (pageInfo.getPageSize() < 0) {
            pageInfo.setPageNumber(pageSize);
        }
    }

    /**
     * 当前pageInfo为空 返回null
     *
     * @param pageInfo
     */
    public static PageInfo isNullOfPageInfo(PageInfo pageInfo) {
        if (pageInfo.getPageNumber() < 0 && pageInfo.getPageSize() < 0) {
            return null;
        }
        return pageInfo;
    }
}
