package com.skytech.project.timer;

import com.skytech.basic.core.util.DateUtil;

import java.util.Date;

/**
 * 定时任务统一入口
 * @author yangzr
 * @time 2018/8/29
 */
public class TaskTimerDefault {
    public void TestTimer(){
        System.out.println("定时执行>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+ DateUtil.time2Str(new Date()));
    }
}
