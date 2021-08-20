<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String menu = "domestic";  // menu parameter 가 없으면 domestic page 디폴트
	
	String menu_param = request.getParameter("menu");
	if(menu_param != null){
		try{			
			menu = menu_param;
		} catch(NumberFormatException e){
			
		}
	}
	
%>  

<!-- intro_header 메뉴 시작 -->
<div class="intro-header">
  <a href="#" class="logo">기상청 소개</a>
  <div class="intro-header-right">
    <a class="<%=(menu.equals("domestic")) ? "active" : "" %>" <%=(!menu.equals("domestic")) ? "href='introduce.jsp?menu=domestic'" : "" %>>관련 홈페이지</a>
    <a class="<%=(menu.equals("timeline")) ? "active" : "" %>" <%=(!menu.equals("timeline")) ? "href='introduce.jsp?menu=timeline'" : "" %>>기상청 타임라인</a>
  </div>
</div>
<!-- intro_header 메뉴 끝 -->