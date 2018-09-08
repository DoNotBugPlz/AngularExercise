<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 14-9-17
  Time: 上午11:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<html>
<head>
    <title>dao-error</title>
</head>
<body>
<% Exception e = (Exception)request.getAttribute("ex");%>
<script>
    window.onload = function(){
        document.getElementById("showDetail").onclick = function(){
            document.getElementById("info").style.display = "block";
        };
    }
</script>
<div >
    异常描述：<%= e.getMessage()==null?"无":e.getMessage() %><br/>
    异常信息：${ex}<br/>
    <span id="showDetail" style="cursor:pointer">
        点击查看详细
    </span>
    <br/>
    <div id="info" style="display:none;height: 1500px" >
        <textarea style="width: 100%;height: 100%"><% e.printStackTrace(new java.io.PrintWriter(out));%></textarea>
    </div>
</div>
</body>
</html>
