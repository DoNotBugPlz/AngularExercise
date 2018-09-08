package com.skytech.util;

import com.skytech.basic.core.util.StringUtil;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.List;

/**
 * Created by Administrator on 2016/1/25.
 */
public class StringExtUtil {

    /**
     *若身份证号码为15位，转变成18位
     * @param cardId
     * @return
     * @throws Exception
     */
    public static String getNewCardId(String cardId){
        // 如果ID为3411258104160016
        //System.out.println("我进来了");
        if (cardId.length() == 15){
            final int[] W = { 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 };
            final String[] A = { "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" };
            int i, j, s = 0;
            String newCardId;
            newCardId = cardId;
            // 从第一位截取到第六位加上19再加上剩余位数 34112519810416001
            newCardId = newCardId.substring(0, 6) + "19" + newCardId.substring(6, cardId.length());
            // 对新拼接成的17位字符串循环
            for (i = 0; i < newCardId.length(); i++) {
                // 每一位乘以对应的W数组数字
                j = Integer.parseInt(newCardId.substring(i, i + 1)) * W[i];
                // 累加至S
                s = s + j;
            }
            // S除以11求模
            s = s % 11;
            // 最后1位即A数组中的S位置 追加至拼接的17位数字的最后即完成 341125198104160016
            newCardId = newCardId + A[s];
            return newCardId;
        }else{
            return cardId;
        }
    }


    public static String getRemoteIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = ip.indexOf(",");
            if(index != -1){
                return ip.substring(0,index);
            }else{
                return ip;
            }
        }
        ip = request.getHeader("X-Real-IP");
        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            return ip;
        }
        return request.getRemoteAddr();
    }

    public static String getLocalIP() {
        String sIP = "";
        InetAddress ip = null;
        try {
            boolean bFindIP = false;
            Enumeration<NetworkInterface> netInterfaces = (Enumeration<NetworkInterface>) NetworkInterface
                    .getNetworkInterfaces();
            while (netInterfaces.hasMoreElements()) {
                if (bFindIP) {
                    break;
                }
                NetworkInterface ni = (NetworkInterface) netInterfaces
                        .nextElement();
                Enumeration<InetAddress> ips = ni.getInetAddresses();
                while (ips.hasMoreElements()) {
                    ip = (InetAddress) ips.nextElement();
                    if (!ip.isLoopbackAddress()
                            && ip.getHostAddress().matches(
                            "(\\d{1,3}\\.){3}\\d{1,3}")) {
                        bFindIP = true;
                        break;
                    }
                }
            }
        } catch (Exception e) {

        }
        if (null != ip) {
            sIP = ip.getHostAddress();
        }
        return sIP;
    }

    /**
     * 获取根据ids集合拼接的sql
     * 字符串方式处理
     * @param check_col_str
     * @param check_col_value_list
     * @return
     */
    public static String loadCheckSqlByCheckIdStrList(String check_col_str, List check_col_value_list) {
        return loadCheckSqlByCheckIdList(check_col_str, check_col_value_list, 1 );
    }
    /**
     * 获取根据ids集合拼接的sql
     * 以数字方式处理
     * @param check_col_str
     * @param check_col_value_list
     * @return
     */
    public static String loadCheckSqlByCheckIdNumList(String check_col_str, List check_col_value_list) {
        return loadCheckSqlByCheckIdList(check_col_str, check_col_value_list, 2 );
    }
    /**
     * 获取根据ids集合拼接的sql
     * @param check_col_str 检测字段
     * @param check_col_type 检测字段类型
     * @param check_col_value_list  检测字段值集合
     * @return
     */
    public static final int check_col_type_str = 1;
    public static final int check_col_type_int = 2;
    public static String loadCheckSqlByCheckIdList(String check_col_str, List check_col_value_list, int check_col_type) {
        String sql = "";
        sql+=" and ( 1=2  \n";
        if(check_col_value_list!=null&&check_col_value_list.size()> 0){

            switch (check_col_type){
                /*case 3://日期
                    sql = "";
                    break;*/
                case check_col_type_int://数字
                    for(int i=0;i<check_col_value_list.size();i++){
                        String check_col_value = StringUtil.getStr(check_col_value_list.get(i));
                        sql+=" or "+check_col_str+" = "+ check_col_value+" \n";
                    }
                    break;
                case check_col_type_str://字符串
                default:
                    for(int i=0;i<check_col_value_list.size();i++){
                        String check_col_value = StringUtil.getStr(check_col_value_list.get(i));
                        sql+=" or "+check_col_str+" = '"+ check_col_value+"' \n";
                    }
                    break;
            }

        }
        sql+=" ) \n ";
        return  sql;
    }



}
