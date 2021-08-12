$(document).ready(function() {
    // 기상청 동네예보 rss url
    // https://www.weather.go.kr/weather/lifenindustry/sevice_rss.jsp
    var url = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=";
    var zone = "1159068000";

    var reqUrl = url + zone;

    $.ajax({
        url : reqUrl,
        type : "GET",
        cache : false,
        success : function(data, status) {
            if (status == "success") {
                parseXML(data);
            }
        }
    })

    function parseXML(xmlDOM) {
        $(xmlDOM).find('data').each(function() {
            document.write($(this).find("wfKor").text());
        })
        document.write(xmlDOM);
    }


})

