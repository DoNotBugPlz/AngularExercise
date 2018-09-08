package com.skytech.project.sms.model;

import com.skytech.basic.wrapper.SuperPanelModel;

/**
 * Created by Administrator on 2018/8/21.
 */
public class SmsPanelModel extends SuperPanelModel {
    private  T_Sms t_sms;

    private T_Sms_Object t_sms_object;


    public T_Sms getT_sms() {
        return t_sms;
    }

    public void setT_sms(T_Sms t_sms) {
        this.t_sms = t_sms;
    }

    public T_Sms_Object getT_sms_object() {
        return t_sms_object;
    }

    public void setT_sms_object(T_Sms_Object t_sms_object) {
        this.t_sms_object = t_sms_object;
    }
}
