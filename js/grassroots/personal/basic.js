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
var calendar2 = new datePicker();
calendar2.init({
	'trigger': '#jion',
	/*按钮选择器，用于触发弹出插件*/
	'type': 'ym',
	/*模式：date日期；datetime日期时间；time时间；ym年月；*/
	'minDate': '1900-1-1',
	/*最小日期*/
	'maxDate': '2015-12-31',
	/*最大日期*/
	'onSubmit': function() { /*确认时触发事件*/
		var theSelectData = calendar2.value;
		$("#jion").find("span").html(theSelectData);
		$("#jion .addto").addClass(".hide").siblings("img").removeClass("hide");
	},
	'onClose': function() { /*取消时触发事件*/ }
});

//性别
$("#gender").click(function(){
	$(".remind").show().find(".gender").show();
	$(".remind").click(function(e){
		var index = parseInt($(this).css("height"));
		if(e.pageY <= index/2){
			$(this).hide().find(".gender").hide();
		}
	});
	$(".gender .cancel").click(function(){
		$(".remind").hide().find(".gender").hide();
	});
	
//	写在外层,只有拖动,但是没有范围和效果
	var mySwiper = new Swiper('.swiper-container',{
		direction : 'vertical',  //垂直
		initialSlide :0,  //初始索引
	})

});

$(".gender .determine").click(function(){
	$("#gender span").html($(".gender .swiper-slide-active").html());
	$(".remind").hide().find(".gender").hide();
	$("#gender .addto").addClass(".hide").siblings("img").removeClass("hide");
});

//名字
$("#name").click(function(){
	$(this).find("input").removeAttr("readonly").focus();
	$("#name .addto").addClass(".hide").siblings("img").removeClass("hide");
});

//联系手机号
$("#phone").click(function(){
	$(this).find("input").removeAttr("readonly").focus();
	$("#phone .addto").addClass(".hide").siblings("img").removeClass("hide");
});

