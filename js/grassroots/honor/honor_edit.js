/**
 * Created by Administrator on 2017/6/9.
 */

$("#specific textarea").on("input propertychange",function(){
    $("#specific>div>span").text($(this).val().length);
})
$("#theme").click(function(){
    $(this).find("input").removeAttr("readonly").focus();
    $("#name .addto").addClass(".hide").siblings("img").removeClass("hide");
})

var calendar1 = new datePicker();
calendar1.init({
    'trigger': '#time',
    /*按钮选择器，用于触发弹出插件*/
    'type': 'ym',
    /*模式：date日期；datetime日期时间；time时间；ym年月；*/
    'minDate': '1900-1-1',
    /*最小日期*/
    'maxDate': '2030-12-31',
    /*最大日期*/
    'onSubmit': function() { /*确认时触发事件*/
        var theSelectData = calendar1.value;
        $("#time").find("span").html(theSelectData);
        $("#time .addto").addClass(".hide").siblings("img").removeClass("hide");
    },
    'onClose': function() { /*取消时触发事件*/ }
});

$("#level").click(function(){
    $(".remind").show().find(".level").show();
    $(".remind").click(function(e){
        var index = parseInt($(this).css("height"));
        if(e.pageY <= index/2){
            $(this).hide().find(".level").hide();
        }
    });
    $(".level .cancel").click(function(){
        $(".remind").hide().find(".level").hide();
    })

//	写在外层,只有拖动,但是没有范围和效果
    var mySwiper = new Swiper('.swiper-container',{
        direction : 'vertical',  //垂直
        initialSlide :0,  //初始索引
    })

})
$(".level .determine").click(function(){
    $("#level span").html($(".level .swiper-slide-active").html());
    $(".remind").hide().find(".level").hide();
    $("#level .addto").addClass(".hide").siblings("img").removeClass("hide");
})