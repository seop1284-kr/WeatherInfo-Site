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

<!-- rel_header 메뉴 시작 -->
<div class="rel-header">
  <a href="#" class="logo">관련 홈페이지</a>
  <div class="rel-header-right">
    <a class="<%=(menu.equals("domestic")) ? "active" : "" %>" <%=(!menu.equals("domestic")) ? "href='related.jsp?menu=domestic'" : "" %>>국내 기상청</a>
    <a class="<%=(menu.equals("oversea")) ? "active" : "" %>" <%=(!menu.equals("oversea")) ? "href='related.jsp?menu=oversea'" : "" %>>외국 기상청</a>
  </div>
</div>
<!-- rel_header 메뉴 끝 -->