var z = [];    //将已经签到的时间添加进入
var ind = 0;
function qiandao(){
	var date = new Date();
	var y = date.getFullYear() //年
	var da = date.getDate();  //日
	var noth = date.getMonth() //月
	var dangqian = [y,(noth+1),da].join("/");  //当前时间签到，并添加到z中
	$(".calendar-list a[data-calen='"+ dangqian +"']").addClass("star");
	z.push(dangqian);
	$(".qian").find(".yes").removeClass("hide").siblings("span").addClass("hide");
    $(".prompt span").text(parseInt(($(".prompt span").text())+1))
}

//每次修改日期时都会调用这个函数
function xinxin(dayEle){
	$.each(z, function(index,val) {
		if($(dayEle).attr("data-calen") == val){
			$(dayEle).addClass("star");
		}
	});
}
