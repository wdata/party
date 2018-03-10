//-----------------个人读书笔记-------------------------
//长按显示
$(document).on("longTap",".notes li",function(){
	$(".page .delete .delete-tr").addClass("hide").siblings("img").removeClass("hide");
	$(this).parent().find(".san").removeClass("hide");
});
//点击删除
$(".notes li").click(function(){
	if($(".page .delete .delete-tr").is(".hide")){
		$(this).find(".san").toggleClass("san-edit");
	}
	return false;
});
//删除含有勾的li
$(".page .delete .delete-dr").click(function(){
	$.each($(".notes li .san"),function(index,val){
		if(!$(val).is(".san-edit")){
			$(val).parents("li").remove();
		}
	});
	$(this).addClass("hide").siblings("img").removeClass("hide");
	$(".notes li").find(".san").addClass("hide");
});
