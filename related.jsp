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



    
<!DOCTYPE html>
<html lang='ko'>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>우리 동네 날씨는?</title>
</head>


<!-- google font -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

<!-- FontAwesome -->
<script src="https://use.fontawesome.com/926fe18a63.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">
<!--CDN 링크 -->
<!-- 날짜 포맷 위한 라이브러리 -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script> -->

<!-- jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- 스크립트 및 스타일  -->
<script src="./script/myScript.js"></script>
<link rel="stylesheet" href="./CSS/style.css">

<body>
  <!-- header start -->
  <header>
    <div class="container">

      <div class="container-small">
        <!-- 작은 화면의 배치를 위한 컨테이너-->
        <a class="headA" href="index.html" style="align-items: center;"><img src="images/logo.png" style="vertical-align: middle;" width="30" height="30" alt="logo"> 우리동네 날씨</a>
        <a class="headD" href="related.jsp" style="align-items: center; margin-right: auto;">Related</a>
        <a class="headD" href="contact.html" style="align-items: center; margin-right: auto;">ContactUs</a>
      </div>
    </div>
  </header>

  <!--main contents start (jsp)-->
  <!-- 반응형 본문 시작 -->
  
  <div class="container" style="margin-top:30px">
    <div class="row">
    
    <jsp:include page="./layout/rel_header.jsp">
      <jsp:param value="<%= menu %>" name="menu"/>
    </jsp:include>
    
    <% String article_page = "./layout/" + menu + ".jsp"; %>
    <jsp:include page="<%= article_page %>"/>
      
    </div>
  </div>
  <!-- 반응형 본문 끝 -->

  <!-- main contents end -->


  <!-- footer start -->
  <footer>
    <img src="images/test.png" width="40" height="40" alt="Fun Web" style="float:left; margin-left: 20px;"> <p style="float:left; margin-right: 15px;">Kim Jinseob</p>

    <div id="copy">
      All contents Copyright 2021 nuri. all right reserved<br>
      Contact mail : seop1284@gmail.com Tel: +82 010 5133 1284 Fax: 없어
    </div>
    <div class="clear"></div>

  </footer>
  <!-- footer end -->

</body>

</html>