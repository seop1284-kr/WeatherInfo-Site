/*
    // https://www.weather.go.kr/images/weather/lifenindustry/dongnaeforecast_rss.pdf

    <data seq="0">                   
    <hour>12</hour>                 // 예보 시간
    <day>0</day>                    // 0 오늘 1 내일 2 모레
    <temp>29.0</temp>               // 현재시간온도
    <tmx>32.0</tmx>                 // 최고온도
    <tmn>-999.0</tmn>               // 최저온도
    <sky>3</sky>                    // 하늘 상태 코드(1. 맑음 3. 구름 많음 4. 흐림)
    <pty>0</pty>                    // 강수 상태 코드(0. 없음 1. 비 2. 비/눈 3. 눈 4. 소나기)
    <wfKor>구름 많음</wfKor>         // 날씨 한국어(맑음, 구름 많음, 흐림, 비, 비/눈, 눈, 소나기)
    <wfEn>Mostly Cloudy</wfEn>
    <pop>20</pop>                   // 강수 확률%
    <r12>0.0</r12>                  // 12시간 예상 강수량
    <s12>0.0</s12>                  // 12시간 예상 적설량
    <ws>1.7000000000000002</ws>     // 풍속(m/s)
    <wd>1</wd>                      // 풍향
    <wdKor>북동</wdKor>             // 풍향 한국어
    <wdEn>NE</wdEn>
    <reh>60</reh>                   // 습도
    <r06>0.0</r06>                  
    <s06>0.0</s06>
    </data>
*/

$(document).ready(function() {
    // 기상청 동네예보 rss url
    // https://www.weather.go.kr/weather/lifenindustry/sevice_rss.jsp
    
    // 동네
    var dongUrl = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=";
    var zone = "4113565000";
    var dongReqUrl = dongUrl + zone;
    
    // 중기 
    var midReqUrl = "http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108"

    // content C 생성 함수 (기상 포커스)


    // content B 생성 함수 (전국 날씨 소식)
    function createConB(midReqUrl) {
        $.ajax({
            url : midReqUrl,
            type : "GET",
            cache : false,
            success : function(data, status) {
                if (status == "success") {
                    parseXML(data);
                }
            }
        })
        function parseXML(xmlDOM) {
            var res = $(xmlDOM).find('wf').first().text().replaceAll('○', '');
            res = res.replaceAll('.', ".<br>");
            $('#contentB-content').html(res);
        }
    }

    // content A 생성 함수 (동네 날씨 24)
    function createConA(dongReqUrl) {
        $.ajax({
            url : dongReqUrl,
            type : "GET",
            cache : false,
            success : function(data, status) {
                if (status == "success") {
                    parseXML(data);
                }
            }
        })
    
        // conA 내용 parse
        function parseXML(xmlDOM) {
            var pubDate = $(xmlDOM).find('pubDate').text();
            var location = $(xmlDOM).find('category').text();
            var data = $(xmlDOM).find('data').text();
    
            $('#location').text(location);
            $('#pubDate').text(pubDate)

            //$('#data').text(data);
            
            var images = [];
            var infos = [];
            var details = [];
            $(xmlDOM).find('data').each(function() {
                var text = "";
                var imgHtml = "";
                var imgSrc = "images/test.png";
                // main contents
                var day = $(this).find("day").text();
                var hour = $(this).find("hour").text();
                var wfKor = $(this).find("wfKor").text();
                var temp = $(this).find("temp").text();
               
                var weather = "";
                
                // 날씨 한국어(맑음, 구름 많음, 흐림, 비, 비/눈, 눈, 소나기)
                if (wfKor == "맑음") {
                    imgSrc = "images/sun.png";
                    weather += '<i class="fas fa-sun fa-inverse"></i>'
                } else if (wfKor == "구름 많음") {
                    imgSrc = "images/clouds.png";
                    weather += '<i class="fas fa-cloud fa-inverse"></i>';
                } else if (wfKor == "흐림") {
                    imgSrc = "images/cloud-dark.png";
                    weather += '<i class="fas fa-cloud"></i>'
    
                } else if (wfKor == "비") {
                    imgSrc = "images/rainy.png";
                    weather += '<i class="fas fa-umbrella"></i>'
    
                } else if (wfKor == "비/눈") {
                    imgSrc = "images/snow-rain.png";
                    weather += '<i class="fas fa-umbrella"></i>'
                    weather += '<i class="far fa-snowflake"></i>'
                    
                } else if (wfKor == "눈") {
                    imgSrc = "images/snowy.png";
                    weather += '<i class="far fa-snowflake"></i>'
    
                } else if (wfKor == "소나기") {
                    imgSrc = "images/shower.png";
                    weather += '<i class="fas fa-cloud-showers-heavy"></i>'
                }

                imgHtml += "<img src='" + imgSrc + "' alt='weatherImg' style='height: 150px; width: 100%'>";

    
                if (day == 0) {
                    text += "<p>오늘 ";
                } else if (day == 1) {
                    text += "<p>내일 ";
                } else {
                    text += "<p>모레 ";
                }
                text += hour + "시</p>";
                text += "<p>" + wfKor + " " + weather + "</p>";
                text += "<p>" + temp + " &#8451</p>"; 
                
                images.push(imgHtml);
                infos.push(text);
                
                // detail contents
                /*
                    <tmx>32.0</tmx>                 // 최고온도
                    <tmn>-999.0</tmn>               // 최저온도
                    <reh>60</reh>                   // 습도
                    <wdKor>북동</wdKor>             // 풍향 한국어
                    <ws>1.7000000000000002</ws>     // 풍속(m/s)
                    <pop>20</pop>                   // 강수 확률%
                */ 
                var tmx = $(this).find("tmx").text();
                var tmn = $(this).find("tmn").text();
                var reh = $(this).find("reh").text();
                var pop = $(this).find("pop").text();
                var wdKor = $(this).find("wdKor").text();
                var ws = $(this).find("ws").text();
                ws *= 1;
                
                
                var detailText = "";
                if (tmn == '-999.0') tmn = "없음"
                if (tmx == '-999.0') tmx = "없음"

                detailText += "<p style='color: blue; display: inline;' >" + tmn + "&#8451 </p>"
                 + "<p style='color: red; display: inline;'>" + tmx + "&#8451</p>";
                detailText += "<p>습도 : " + reh + "&#37</p>";
                detailText += "<p>강수확률 : " + pop + "&#37</p>";
                detailText += "<p>풍향 : " + wdKor + "</p>";
                detailText += "<p>풍속 : " + ws.toFixed(2) + "m/s</p>";
                details.push(detailText);
                
            });
    
            var fronts = $('.flip-card-front');
            var backs = $('.flip-card-back');
            
            var n = 0;
            fronts.each(function() {
                $(this).html(images[n] + infos[n]);
                n++;
            })
    
            var n = 0;
            backs.each(function() {
                $(this).html(infos[n] + details[n]);
                n++;
            })
        }
    }
    

    // 햄버거 버튼
    $(function(){
        $(".headC").click(function(){
            $(".headB").slideToggle();
        });
    });

    // zoneCode 위치 검색 함수
    $('#locationSearchBtn').click(function() {
        if ($('#addr').val().trim() == "") {
            alert("지역명이 비어있습니다.");
            return;
        }
        var res = $("#locationSearchRes");
        var lines = [];

        res.load("data/zone_code.txt", function (data) {
            lines = data.split("\n");
            var text = [];
            for (i = 0; i < lines.length; i++) {
                var table = "<tr><th>code</th><th>name</th><th>parentname</th>";
                
                var line = lines[i];
                if ( line.includes($('#addr').val()) ) {
                    var elements = line.replace(/code=|name=|parentCode=|parentName=|gridX=|gridY=/g, "").split(", ");
                    if (elements[3] == 'null'  || elements[0].length < 10) continue;
                    text.push(elements[3] + " " + elements[1]  + " " + elements[0] + "<br>");
                }
            }

            var resTxt = '';
            for (i = 0; i < 10; i++) {
                if (text[i] == null) break;
                resTxt += text[i];
            }
            res.html(resTxt);
            res.css("display", "block");
        })
    });

    // zone code 입력 함수
    $('#zoneCodeBtn').click(function() {
        if ($('#zoneCode').val() == "") {
            alert("zonecode를 입력하세요.");
            return;
        }

        createConA(dongUrl + $('#zoneCode').val());

        $("#locationModal").css("display","none");
        $("#locationSearchRes").empty();
        $('#addr').val('');
        $('#zoneCode').val('')
    })


    // About 모달 버튼
    // When the user clicks on the button, open the modal
    $('#aboutBtn').click(function() {
        $("#myModal").css("display","block");
    });
    // When the user clicks on <span> (x), close the modal
    $('.close').click(function() {
        $("#myModal").css("display","none");
    })
    
    // Get the modal
    var modal = document.getElementById("myModal");
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Location 모달 버튼
    // When the user clicks on the button, open the modal
    $('#locationBtn').click(function() {
        $("#locationModal").css("display","block");
    });
    // When the user clicks on <span> (x), close the modal
    $('.close').click(function() {
        $("#locationModal").css("display","none");
    })
    
    // Get the modal
    var modal = document.getElementById("locationModal");
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // 초기 실행
    createConA(dongReqUrl);
    createConB(midReqUrl);
})










