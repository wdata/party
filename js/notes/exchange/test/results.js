//正确率  .tilte_all 灰色100%  .tilte 百分比
$.each($(".other .words"),function(index,val){
	var x = parseInt($(this).find(".words-yes").text());    //答对多少
	var y = parseInt($(this).find(".progress-bar p>span").text());   //总共多少
	var z = parseInt($(this).find(".tilte_all").css("width"));   //.tilte_all 总长
	$(this).find(".tilte").css("width",((x/y)*z)+"px");   //百分比
})