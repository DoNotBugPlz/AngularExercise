package com.skytech.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.Charset;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-8-14
 * Time: 上午10:41
 * WEB 数据代理
 */
public class ProxyUtils {

    public static final String CHARSET_CODE = "UTF-8";

    public static void proxyUrl(HttpServletRequest request,HttpServletResponse response,String targetUrl){
        try{
            request.setCharacterEncoding(CHARSET_CODE);
            response.setCharacterEncoding(CHARSET_CODE);

            String requestParams = getStreamChart(request.getInputStream(),null);
            String data = proxyUrl(targetUrl,request.getMethod(),request.getContentType(),requestParams);
            if(data != null){
                if(data.indexOf("ERROR 400") > -1){
                    response.setStatus(400);
                }else if(data.indexOf("ERROR 500") > -1){
                    response.setStatus(500);
                }
                response.getOutputStream().write(data.getBytes(Charset.forName(CHARSET_CODE)));
            }
        }catch (IOException e2){
            e2.printStackTrace();
        }
    }

    /***
     * 使用代理请求WEB服务
     * @param targetUrl 目标地址
     * @param requestMethod 请求类型
     * @param contentType 请求方式
     * @param requestParams 请求参数
     * @return 响应内容
     */
    public static String proxyUrl(String targetUrl,String requestMethod,String contentType,String requestParams){
        HttpURLConnection con = null;
        StringBuffer buffer = new StringBuffer();
        byte[] bytes = proxyUrlData(targetUrl,requestMethod,contentType,requestParams);
        try {
            buffer.append(new String(bytes,CHARSET_CODE));
        }catch (Exception e){
            e.printStackTrace();
        }
        return buffer.toString();
    }

    /***
     * 使用代理请求WEB服务
     * @param targetUrl 目标地址
     * @param requestMethod 请求类型
     * @param contentType 请求方式
     * @param requestParams 请求参数
     * @return 响应内容
     */
    public static byte[] proxyUrlData(String targetUrl,String requestMethod,String contentType,String requestParams){
        HttpURLConnection con = null;
        System.out.println("代理proxyUrl>>>>" + targetUrl);
        byte[] result;
        try {
            if("".equals(targetUrl) || targetUrl == null){
                result = new String("ERROR 400: No target specified for proxy.").getBytes();
                return result;
            }

            targetUrl = URLDecoder.decode(targetUrl,CHARSET_CODE).replaceAll(" ", "+");
            URL url = new URL(targetUrl);
            con = (HttpURLConnection)url.openConnection();
            con.setConnectTimeout(5 * 1000); // 超时响应时间为5秒
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setUseCaches(false);
            con.setRequestMethod(requestMethod);
            con.setRequestProperty("Accept-Charset", "UTF-8");
            con.setRequestProperty("contentType", "UTF-8");
            if("".equals(contentType) || null == contentType) contentType = "application/x-www-form-urlencoded";
            con.setRequestProperty("Content-Type",contentType);
            if(!"".equals(requestParams) && null != requestParams){
                con.getOutputStream().write(requestParams.getBytes(Charset.forName(CHARSET_CODE)));
            }

            result = readInputStream(con.getInputStream());
        }catch (Exception e){
            e.printStackTrace();
            byte[] data = new byte[5000];
            if(con != null && con.getErrorStream() != null) {
                try{
                    con.getErrorStream().read(data, 0, 5000);
                }catch (Exception e2){
                    e2.printStackTrace();
                }
            }

            String str = new String("ERROR 500: An internal server error occured. " + e.getMessage() + " " + new String(data));
            result = str.getBytes();
        }

        return result;
    }

    /***
     * 从输入流中读出字符
     * @param in 输入
     * @param out 输出
     * @return 输入文本
     */
    public static String getStreamChart(InputStream in,OutputStream out){
        StringBuffer buffer = new StringBuffer();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(in,CHARSET_CODE));
            String line;
            while ((line = rd.readLine()) != null) {
                buffer.append(line);
            }
            rd.close();
            if(out != null) out.write(buffer.toString().getBytes(Charset.forName(CHARSET_CODE)));
        }catch (Exception e){
            e.printStackTrace();
        }
        return buffer.toString();
    }

    /** 将输入流数据转换成byte **/
    public static byte[] readInputStream(InputStream inputStream) throws Exception{
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len;
        while ((len = inputStream.read(buffer)) != -1){
            outputStream.write(buffer,0,len);
        }
        inputStream.close();
        return outputStream.toByteArray();
    }

    /** 将输入流数据转换成OutputStream **/
    public static void readInputStream(InputStream io,OutputStream out) throws Exception{
        try{
            byte[] array = new byte[1024 * 10];
            int len = io.read(array, 0, array.length);
            while (len > 0) {
                out.write(array, 0, len);
                len = io.read(array, 0, array.length);
            }
            out.flush();
        }catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(out != null) out.close();
            if(io != null) io.close();
        }
    }
}
