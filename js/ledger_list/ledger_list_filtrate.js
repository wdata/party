//***************************台账2*****************************************
//***************************指示列表***************************

$(".nav>.pointDes").text(sessionStorage.getItem("one"));
//点击指示1
$(".pointOne").click(function(){
    var list= $(this).parents(".content").find(".list");//寻找所有的列表
    list.hide();//将所有的列表隐藏
    var list1= $(this).parents(".content").find(".list1");//寻找指示1所属的列表
    list1.show();//将指示1所属的列表显示出来
    $(".pointDes").css("border-left","0.15rem solid #ce3d3a");//设置指示1口号的左边框颜色
    $(".nav>.pointDes").text(sessionStorage.getItem("one"));
    //$(".pointDes").html("1带头践行党宗旨，主动承当，争创佳绩");//设置指示1口号的具体内容
    var point =$(this).parent(".pointBox").children(".point");//寻找所有的指示标题
    point.show();//将所有的指示标题显示出来
    $(this).hide();//点击过后，帮当前的指示标题隐藏
})
//点击指示2
$(".pointTwo").click(function(){
    var list= $(this).parents(".content").find(".list");//寻找所有的列表
    list.hide();//将所有的列表隐藏
    var list2= $(this).parents(".content").find(".list2");//寻找指示2所属的列表
    list2.show();//将指示2所属的列表显示出来

    $(".pointDes").css("border-left","0.15rem solid #add281");//设置指示2口号的左边框颜色
    $(".nav>.pointDes").text(sessionStorage.getItem("two"));

    //$(".pointDes").html("2带头践行党宗旨，主动承当，争创佳绩");//设置指示2口号的具体内容
    var point =$(this).parent(".pointBox").children(".point");//寻找所有的指示标题
    point.show();//将所有的指示标题显示出来
    $(this).hide();//点击过后，帮当前的指示标题隐藏
})

//点击指示3

$(".pointThree").click(function(){
    var list= $(this).parents(".content").find(".list");//寻找所有的列表
    list.hide();//将所有的列表隐藏
    var list3= $(this).parents(".content").find(".list3");//寻找指示3所属的列表
    list3.show();//将指示3所属的列表显示出来

    $(".pointDes").css("border-left","0.15rem solid #577bd4");//设置指示3口号的左边框颜色
    $(".nav>.pointDes").text(sessionStorage.getItem("three"));
    //$(".pointDes").html("3带头践行党宗旨，主动承当，争创佳绩");//设置指示3口号的具体内容
    var point =$(this).parent(".pointBox").children(".point");//寻找所有的指示标题
    point.show();//将所有的指示标题显示出来
    $(this).hide();//点击过后，帮当前的指示标题隐藏
})

//点击指示4

$(".pointFour").click(function(){
    var list= $(this).parents(".content").find(".list");//寻找所有的列表
    list.hide();//将所有的列表隐藏
    var list4= $(this).parents(".content").find(".list4");//寻找指示4所属的列表
    list4.show();//将指示4所属的列表显示出来
    $(".pointDes").css("border-left","0.15rem solid #f1cf67");//设置指示4口号的左边框颜色
    $(".nav>.pointDes").text(sessionStorage.getItem("four"));
    //$(".pointDes").html("4带头践行党宗旨，主动承当，争创佳绩");//设置指示4口号的具体内容
    var point =$(this).parent(".pointBox").children(".point");//寻找所有的指示标题
    point.show();//将所有的指示标题显示出来
    $(this).hide();//点击过后，帮当前的指示标题隐藏
})
//************************请选择党组弹框(遮罩层)**********************

//点击选择标签区域，弹出遮罩层，标签选择项

$(".chooseParty").click(function(event){
    $(".blackgroup_box").show();
});

//定义一个全局变量获取当前span的内容

var spanText = '';

//点击当前标签，加上名字叫做active的类名，字体跟背景变色；其他的删除active类名,
//点击加颜色，再点击，颜色消失，再点击，颜色加....
$(".group_classify>p>span").click(function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");   
    }
    else{
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).parent("p").siblings().find("span").removeClass("active");
        spanText=$(this).text();
    }
})
//点击确定提交，遮罩层，标签选择像区域消失

$(".group_sure").click(function(){
      //对是否选择了标签做出判断
    if($(".group_classify>p>span").hasClass("active")){
        $(".blackgroup_box").hide();
        $(this).parents(".blackgroup_box").siblings(".inputBox").find(".choosegroup_span").text(spanText);
    }
    else{
        $(".blackgroup_box").hide();
    }

})

//点击取消按钮，遮罩层，标签选择像区域消失

$(".group_submit>.group_cancle").click(function(){
    $(".blackgroup_box").hide();
})


//************************请选择标签弹框(遮罩层)**********************


$(".chooseTag").click(function(event){
    $(".blacktag_box").show();
});

//定义一个全局变量获取当前span的内容

var spanText2;

//点击当前标签，加上名字叫做active的类名，字体跟背景变色；其他的删除active类名

$(".tag_classify>p>span").click(function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");
    }
    else{
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).parent("p").siblings().find("span").removeClass("active");
        spanText2=$(this).text();
    }
})

//点击确定提交，遮罩层，标签选择像区域消失

$(".tag_sure").click(function(){
    //对是否选择了标签做出判断
    if($(".tag_classify>p>span").hasClass("active")){
        $(".blacktag_box").hide();
        $(this).parents(".blacktag_box").siblings(".inputBox").find(".choosetag_span").text(spanText);
    }
    else{
        $(".blacktag_box").hide();
    }

});

//点击取消按钮，遮罩层，标签选择像区域消失

$(".tag_submit>.tag_cancle").click(function(){
    $(this).parents(".blacktag_box").hide();
})
//************************请选择规定或创新弹框(遮罩层)**********************
$(".chooseSpecify").click(function(event){
    $(".blackspec_box").show();
});

//定义一个全局变量获取当前span的内容

var pText;

//点击当前标签，加上名字叫做active的类名，字体跟背景变色；其他的删除active类名

$(".spec_classify>p").click(function(){
    if($(this).hasClass("active")){
        $(this).removeClass("active");
    }
    else{
        $(this).addClass("active");
        $(this).siblings("p").removeClass("active");
        pText=$(this).text();
    }
})

//点击确定提交，遮罩层，标签选择像区域消失

$(".spec_sure").click(function(){
    //对是否选择了标签做出判断
    if($(".spec_classify>p").hasClass("active")){
        $(".blackspec_box").hide();
        $(this).parents(".blackspec_box").siblings(".inputBox").find(".chooseSpecify_span").text(pText);
    }
    else{
        $(".blackspec_box").hide();
    }

});

//点击取消按钮，遮罩层，标签选择像区域消失

$(".spec_submit>.spec_cancle").click(function(){
    $(this).parents(".blackspec_box").hide();
})
//***************************日历***************************************



