var x = null;
//点击出现红包
$(".lottery-area li").tap(function(){
	//判断是0分，还是有1-10分
	var index = parseInt($(this).find(".text span").text());
	if(x === null){
		x = index;
	}
	if(index > 0){
		$(".remind").show().find(".yes").removeClass("hide").siblings("div").addClass("hide");
	}else{
		$(".remind").show().find(".no").removeClass("hide").siblings("div").addClass("hide");
	}
	$(".remind").find("p>span").text(x);
});

//点击知道了关闭红包
$(".remind .zhidao").tap(function(){
	$(".remind").hide();
	$(".lottery-area li").find(".no-open").addClass("hide");
	$(".lottery-area li").find(".has-been-opened").removeClass("hide");
    $(".lottery-area li").unbind();
});
