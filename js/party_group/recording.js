//  小球判定  如何是两个，则第二个在中间，如果是三个则紧挨排列
$.each($(".distribution td"), function(index,val) {
	if($(this).children(".dots").length === 2){
		$(this).find(".dots").eq(1).addClass("weizhi");
	}
});

$(document).click(function(){
	$(".pop-up").hide();
});
$(".distribution td .dots").click(function(e){
	var mor = document.documentElement.clientWidth;
	var x = e.pageX+mor*0.02;
	var y = e.pageY-mor*0.1533;
	//靠边反转
	if((x/mor)>= 0.78){
		$(".pop-up").addClass("reversal");
		x = x - mor*0.39;
	}else{
		$(".pop-up").removeClass("reversal");
	}
	
	//修改背景颜色
	if($(this).is(".red")){
		$(".pop-up .back-red").removeClass("hide").siblings().addClass("hide");
	}
	if($(this).is(".blue")){
		$(".pop-up .back-blue").removeClass("hide").siblings().addClass("hide");
	}
	if($(this).is(".green")){
		$(".pop-up .back-green").removeClass("hide").siblings().addClass("hide");
	}
	
	//修改定位
	$(".pop-up").css({
		"top":y+"px",
		"left":x+"px"
	}).show();
	
	return false;
})



//************************请选择党组弹框(遮罩层)**********************

//点击选择标签区域，弹出遮罩层，标签选择项

$(".select").click(function(event){
    $(".blackgroup_box").show();
});

//点击当前标签，加上名字叫做active的类名，字体跟背景变色；其他的删除active类名,
//点击加颜色，再点击，颜色消失，再点击，颜色加....
var ind = 0;
var z = [];   //将点击元素存储到数组中
$(".group_classify>p>span").click(function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");
        //查找删除的this在数组哪个位置
        var self = this;
        $.each(z,function(index,val){
        	if(self === z[index]){
        		ind = index;
        	}
        })
    }
    else{
        $(this).addClass("active");
        spanText=$(this).text();
    }
    //超过5个，取消前面绑定的active
    $.each($(this),function(index,val){
		if($(val).is(".active")){
			z.push(val);
			if(z.length>=6){
				$(z[0]).removeClass("active");
				z.splice(0,1);
			}
		}else{
			//不超过5个删除，再次点击的this
			z.splice(ind,1);
		}
	})
})
//点击确定提交，遮罩层，标签选择像区域消失

$(".group_sure").click(function(){
      //对是否选择了标签做出判断
    if($(".group_classify>p>span").hasClass("active")){
    	$.each(z,function(index,val){
    		$("main header li").eq(index).text($(val).text());
    		console.log(index,$(val).text());
    	})
        $(".blackgroup_box").hide();
    }
    else{
        $(".blackgroup_box").hide();
    }

})

//点击取消按钮，遮罩层，标签选择像区域消失

$(".group_submit>.group_cancle").click(function(){
    $(".blackgroup_box").hide();
})
