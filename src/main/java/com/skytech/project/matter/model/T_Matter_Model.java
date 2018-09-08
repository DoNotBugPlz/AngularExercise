package com.skytech.project.matter.model;

import java.util.List;

/**
 * Created by Administrator on 2018/8/25.
 */
public class T_Matter_Model {
    private List<T_Matter_Material> materialist;

    private T_Matter_Monitor t_matter_monitor;

    private List<T_Matter_Monitor_Great> list;

    private T_Matter t_matter;

    public T_Matter getT_matter() {
        return t_matter;
    }

    public void setT_matter(T_Matter t_matter) {
        this.t_matter = t_matter;
    }

    public List<T_Matter_Material> getMaterialist() {
        return materialist;
    }

    public void setMaterialist(List<T_Matter_Material> materialist) {
        this.materialist = materialist;
    }

    public T_Matter_Monitor getT_matter_monitor() {
        return t_matter_monitor;
    }

    public void setT_matter_monitor(T_Matter_Monitor t_matter_monitor) {
        this.t_matter_monitor = t_matter_monitor;
    }

    public List<T_Matter_Monitor_Great> getList() {
        return list;
    }

    public void setList(List<T_Matter_Monitor_Great> list) {
        this.list = list;
    }
}
