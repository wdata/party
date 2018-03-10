//学习交流切换显示内容
$(".nav>.item").click(function(){
    $(".nav .active").removeClass("active");
    $(this).addClass("active");
    if($(this).attr("class").indexOf('lear')!=-1){
        $(".learn").removeClass("hide");
        $(".icon").removeClass("hide");
        $(".exchange").addClass("hide");
    }else{
        $(".exchange").removeClass("hide");
        $(".learn").addClass("hide");
        $(".icon").addClass("hide");
    }
});
