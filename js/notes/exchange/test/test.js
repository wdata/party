//切换
$(".nav a").tap(function(){
	$(this).addClass("switch").siblings().removeClass("switch");
	if($(this).is(".zhenti")){
		$(".zhenti-test").removeClass("hide").siblings(".small-test").addClass("hide");
	}
	if($(this).is(".small")){
		$(".small-test").removeClass("hide").siblings(".zhenti-test").addClass("hide");
	}
});
