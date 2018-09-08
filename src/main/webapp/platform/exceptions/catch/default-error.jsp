<%@ page import="com.skytech.basic.core.util.JSONUtil" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.google.common.collect.Maps" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 14-9-17
  Time: 上午11:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<% Exception e = (Exception)request.getAttribute("ex");
    Map rs = Maps.newHashMap();
    rs.put("ExceptionClass",e.getCause()==null
            ?e.getClass().getName()
            :(e.getCause().getCause()==null
                ?e.getCause().getClass().getName()
                :e.getCause().getCause().getCause().getClass().getName()));
    rs.put("ExceptionMsg",e.getCause()==null
            ?e.getMessage()
            :(e.getCause().getCause()==null
                ?e.getCause().getMessage()
                :e.getCause().getCause().getCause().getMessage()));
    response.setContentType("application/json;charset=UTF-8");
    response.getWriter().println(JSONUtil.toJson(rs));
%>