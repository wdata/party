
//.choose 为用户选中   .air为默认  .conf为正确答案
//.answer-col  为选择颜色变化   
$(".examination .question dd").tap(function(){
	$(this).find(".choose").removeClass("hide").siblings(".air").addClass("hide");
	$(this).addClass("answer-col").siblings("dd").removeClass("answer-col");
	$(this).siblings("dd").find(".air").removeClass('hide').siblings(".choose").addClass("hide");
})

//查看答案解析
$(".examination .question .to-view").tap(function(){
	$(this).addClass("hide").siblings(".answer").removeClass("hide");
	var self = $(this);
	//确定答案解析中.answer-yes的ABCD和四个答案中哪个元素相同
	$.each($(this).parent().siblings("dl").find("p"),function(index,val) {
		if($(val).text() == self.siblings(".answer").find(".answer-yes").text()){
			if($(val).parents("dl").children("dd").eq(index).find(".choose").is(".hide")){
				$(this).parents("dd").addClass("answer-y");
				$(this).parents("dd").find(".conf").removeClass("conf-hide").siblings().addClass("conf-hide");
			}
		}
	});
})

//关闭答案解析
$(".examination .question .answer").tap(function(){
	$(this).addClass("hide").siblings(".to-view").removeClass("hide");
	var self = $(this);
	
	//确定答案解析中.answer-yes的ABCD和四个答案中哪个元素相同
	$.each($(this).parent().siblings("dl").find("p"),function(index,val) {
		if($(val).text() == self.find(".answer-yes").text()){
			$(this).parents("dd").removeClass("answer-y");
			$(this).parents("dd").find(".conf").addClass("conf-hide").siblings().removeClass("conf-hide");
		}
	});
})