package com.skytech.project.material.model;

import com.skytech.basic.wrapper.SuperPanelModel;

public class MaterialPanelModel extends SuperPanelModel {

    private T_Material_Info t_material_info;

    private T_Material_Submission t_material_submission;

    public T_Material_Info getT_material_info() {
        return t_material_info;
    }

    public void setT_material_info(T_Material_Info t_material_info) {
        this.t_material_info = t_material_info;
    }

    public T_Material_Submission getT_material_submission() {
        return t_material_submission;
    }

    public void setT_material_submission(T_Material_Submission t_material_submission) {
        this.t_material_submission = t_material_submission;
    }

}
