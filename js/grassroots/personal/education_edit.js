var calendar1 = new datePicker();
calendar1.init({
    'trigger': '#basic',
    /*按钮选择器，用于触发弹出插件*/
    'type': 'ym',
    /*模式：date日期；datetime日期时间；time时间；ym年月；*/
    'minDate': '1900-1-1',
    /*最小日期*/
    'maxDate': '2015-10-31',
    /*最大日期*/
    'onSubmit': function() { /*确认时触发事件*/
        var theSelectData = calendar1.value;
        $("#basic").find("span").html(theSelectData);
        $("#basic .addto").addClass(".hide").siblings("img").removeClass("hide");
    },
    'onClose': function() { /*取消时触发事件*/ }
});
//毕业学校
//$(".name").click(function(){
//
//})
//学历
$("#education").click(function(){
    $(".remind").show().find(".education").show();
//	写在外层,只有拖动,但是没有范围和效果
    var mySwiper = new Swiper('.swiper-container',{
        direction : 'vertical',  //垂直
        initialSlide :2 //初始索引
    });

});
$(".remind").click(function(e){
    $("#education span").html($(".education .swiper-slide-active").text());
    var index = parseInt($(this).css("height"));
    if(e.pageY <= index/2){
        $(this).hide().find(".education").hide();
    }
});
$(".education .determine").click(function(){
    $("#education span").html($(".education .swiper-slide-active").text());
    $(".remind").hide().find(".education").hide();
    $("#education .addto").addClass(".hide").siblings("img").removeClass("hide");
});
$(".education .cancel").click(function(){
    $(".remind").hide().find(".education").hide();
});


