$(".papars .question dd").tap(function(){
	$(this).find(".choose").removeClass("hide").siblings(".air").addClass("hide");
	$(this).addClass("answer-col").siblings("dd").removeClass("answer-col");
	$(this).siblings("dd").find(".air").removeClass('hide').siblings(".choose").addClass("hide");
});
