package com.skytech.project.goodsReferenceLib.barCodeManage.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.skytech.basic.core.util.StringUtil;
import com.skytech.basic.wrapper.PageInfo;
import com.skytech.basic.wrapper.ResultJO;
import com.skytech.project.goodsReferenceLib.barCodeManage.model.Cf_Goods_Bar_Code;
import org.krysalis.barcode4j.impl.code39.Code39Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.skytech.project.goodsReferenceLib.barCodeManage.service.ICf_Goods_Bar_CodeService;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.*;

@Controller
@RequestMapping("/Cf_goods_bar_code")
public class Cf_Goods_Bar_CodeController {

    @Resource(name = "cf_Goods_Bar_CodeService")
    private ICf_Goods_Bar_CodeService cf_Goods_Bar_CodeService;


    /**
     * 查询商品条形码列表
     *
     * @param pageInfo 分页对象，含2个int类型属性pageNum(页号),pageSize(页容量)
     * @return GridResult
     */
    @RequestMapping(value = {"/list"})
    @ResponseBody
    public ResultJO search(
            @RequestParam(value = "goods_code", required = false) String goods_code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "delstatus", required = false) String delstatus,
            @RequestParam(value = "id", required = false) String id,
            PageInfo pageInfo) {
        Map map = new HashMap();
        map.put("goods_code", goods_code);
        map.put("name", name);
        map.put("delstatus", delstatus);
        map.put("id", id);
        return cf_Goods_Bar_CodeService.search(pageInfo, map);
    }


    /**
     * 新增
     *
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultJO saveForm(@RequestBody Map params, HttpServletRequest request) {
        if (params != null) {
            List historyGoodsBar = (List) params.get("hisBarCodeList");
            Map goodsBar = (Map) params.get("barCodeManage");
            //flag属性为 true 表明此次操作只编辑了条码状态
            if ("true".equals(goodsBar.get("flag").toString())) {
                //修改条码状态delstatus（0启用，1停用）
                //当前条形码状态
                cf_Goods_Bar_CodeService.updateDelstatus(goodsBar.get("id").toString(), goodsBar.get("delstatus").toString());
                //历史条形码状态
                for (int i = 0; i < historyGoodsBar.size(); i++) {
                    Map item = (Map) historyGoodsBar.get(i);
                    cf_Goods_Bar_CodeService.updateDelstatus(item.get("id").toString(), item.get("delstatus").toString());
                }
                return ResultJO.getDefaultResult(null, "保存成功！");
            } else {
                String code_new = goodsBar.get("bar_code_new").toString();
                //验证条形码是否重复
                int num = cf_Goods_Bar_CodeService.checkExist(code_new);
                if (num == 0) {
                    //如果不重复，判断是不是第一次新增
                    if (!StringUtil.isNullOrWhiteSpace(goodsBar.get("bar_code").toString())) {
                        //如果不是第一次新增，先修改上一条记录 is_last_version （是否最新条形码（0否1是））字段为0
                        cf_Goods_Bar_CodeService.updateOld(goodsBar.get("id").toString());
                        //修改条码状态delstatus（0启用，1停用）
                        //当前条形码状态
                        cf_Goods_Bar_CodeService.updateDelstatus(goodsBar.get("id").toString(), goodsBar.get("delstatus").toString());
                        //历史条形码状态
                        for (int i = 0; i < historyGoodsBar.size(); i++) {
                            Map item = (Map) historyGoodsBar.get(i);
                            cf_Goods_Bar_CodeService.updateDelstatus(item.get("id").toString(), item.get("delstatus").toString());
                        }
                    }
                    //新增
                    Cf_Goods_Bar_Code cf_goods_bar_code = new Cf_Goods_Bar_Code();
                    cf_goods_bar_code.setDelstatus(0);
                    cf_goods_bar_code.setBar_code(goodsBar.get("bar_code_new").toString());
                    cf_goods_bar_code.setUploaded_time(new Date());
                    cf_goods_bar_code.setGoods_id(Long.parseLong(goodsBar.get("goods_id").toString()));
                    if (!StringUtil.isNullOrWhiteSpace(goodsBar.get("goods_unique_id").toString())) {
                        cf_goods_bar_code.setGoods_unique_id(Long.parseLong(goodsBar.get("goods_unique_id").toString()));
                    }
                    cf_goods_bar_code.setIs_last_version(1);
                    cf_Goods_Bar_CodeService.save(cf_goods_bar_code);
                    return ResultJO.getDefaultResult(cf_goods_bar_code, "保存成功！");
                } else {
                    return ResultJO.getDefaultResult("Exist", "该条形码已存在！");
                }
            }
        }
        return ResultJO.getErrorResult(null, "保存失败！");
    }

    /**
     * 查看商品条形码详情
     */
    @RequestMapping(value = {"/loadbarCodeManage"})
    @ResponseBody
    public ResultJO loadbarCodeManage(@RequestParam(value = "id", required = false) String id) {
        if (StringUtil.isNullOrWhiteSpace(id)) {
            return ResultJO.getErrorResult(null, "没有匹配的数据！");
        }
        return ResultJO.getDefaultResult(cf_Goods_Bar_CodeService.loadbarCodeManage(id));
    }

    /**
     * 生成条形码图片返回
     *
     * @param code
     * @param response
     */
    @RequestMapping(value = "/loadImg", method = RequestMethod.GET)
    @ResponseBody
    public void getWeiCode(@RequestParam(value = "code") String code, HttpServletResponse response) {
        if (StringUtil.isNullOrWhiteSpace(code)) {
            return;
        }
        ByteArrayOutputStream ous = new ByteArrayOutputStream();
        try {
            generate(code, ous);
            byte[] image = ous.toByteArray();
            response.setHeader("Content-Type", "image/png");
            response.getOutputStream().write(image);
            response.flushBuffer();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                ous.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 生成到流
     */
    public static void generate(String msg, OutputStream ous) {

        Code39Bean bean = new Code39Bean();

        // 精细度
        final int dpi = 150;
        // module宽度
        final double moduleWidth = UnitConv.in2mm(1.0f / dpi);

        // 配置对象
        bean.setModuleWidth(moduleWidth);
        bean.setWideFactor(3);
        bean.doQuietZone(false);

        String format = "image/png";
        try {

            // 输出到流
            BitmapCanvasProvider canvas = new BitmapCanvasProvider(ous, format, dpi,
                    BufferedImage.TYPE_BYTE_BINARY, false, 0);

            // 生成条形码
            bean.generateBarcode(canvas, msg);

            // 结束绘制
            canvas.finish();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}