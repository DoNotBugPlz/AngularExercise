package com.skytech.flow.inject;

import com.skytech.attachfile.service.ISys_AttachfileService;
import com.skytech.basic.core.util.FileUtil;
import com.skytech.skyflow.injected.SkyflowAttachfileService;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/26.
 */
public class AttachfileServiceImpl implements SkyflowAttachfileService {

    @Resource(name = "sys_AttachfileService")
    private ISys_AttachfileService sys_attachfileService;

    @Override
    public String uploadToFile(MultipartFile multipartFile, HttpServletRequest httpServletRequest) {
        String url = null;
        try {
            Map<String, Object> attachmentMap = sys_attachfileService.uploadFile(multipartFile, httpServletRequest.getSession());
            String storepath = (String) attachmentMap.get("storepath");
            String storename = (String) attachmentMap.get("storename");
            url = FileUtil.getPrefixPath() + storepath + File.separator + storename;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return url;
    }
}
