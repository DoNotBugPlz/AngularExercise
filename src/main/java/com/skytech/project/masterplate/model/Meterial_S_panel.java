package com.skytech.project.masterplate.model;

import com.skytech.basic.wrapper.SuperPanelModel;

import java.util.List;

/**
 * Created by d on 2018/9/4.
 */
public class Meterial_S_panel extends SuperPanelModel {
    private T_Masterplate_Index t_masterplate_index;
    private List<T_Masterplate_Index> t_masterplate_indexList;

    public T_Masterplate_Index getT_masterplate_index() {
        return t_masterplate_index;
    }

    public void setT_masterplate_index(T_Masterplate_Index t_masterplate_index) {
        this.t_masterplate_index = t_masterplate_index;
    }

    public List<T_Masterplate_Index> getT_masterplate_indexList() {
        return t_masterplate_indexList;
    }

    public void setT_masterplate_indexList(List<T_Masterplate_Index> t_masterplate_indexList) {
        this.t_masterplate_indexList = t_masterplate_indexList;
    }
}
