$(".list>li>i").click(function(){
    var html="";
    var isActive=$(this).hasClass("active");
    var index=String($(this).parent("li").attr("class"));
    index=index.slice(index.indexOf("index")+5);
    if(isActive){
        $(this).removeClass("active");
        $(".search .index"+index).css("display","none");
    }else{
        $(this).addClass("active");
        var src= $(this).parent("li").children(".portrait").children("img").attr("src");
        html="<div class='portrait index"+index+"'><img src='"+src+"'></div>";
        $(".search>i").css("display","none");
        $(html).insertBefore(".search input[type='search']");
    }
});
$(".head>a.cancel").click(function(){
    // $(this).attr("href","temporary_list.html");
    history.back(-1);
});
$(".head>a.chat").click(function(){
    $(this).attr("href","chat.html");
});