//*****************************************页面编辑*****************************************
//------------------------------------------换图------------------------
let mySwiper = new Swiper('.swiper-container', {
	initialSlide :0,
	direction : 'vertical',
});

//*****************************************标签和指标*****************************************
$(".odd footer .label").click(function(){
	$(".pop").removeClass("hide");
});
//-------------------指标和标签切换--------------------
$(".pop .right").click(function(){
	$(this).parent().parent().next().removeClass("hide").siblings().addClass("hide");
});
$(".pop  .left").click(function(){
	$(this).parent().parent().prev().removeClass("hide").siblings().addClass("hide");
});
//-----------------------隐藏      取消---------------------
$(".pop footer a").click(function(){
    $(".pop").addClass("hide");
});






ajax_qcy(
    "get",
    '/api/ledger/'+ urlParams("id") +'.json', {},
    "",
    function(data) {
        if(data.code === 0){
            console.log(data);
            //标签和指标处理
            let inde = data.data.data.standardId;
            let labels = data.data.data.tagIds;
            //*********************四个指标*****************************
            ajax_qcy(
                "get",
                '/api/standards/'+ data.data.data.typeId +'.json',
                {},
                "",
                function(value) {
                    if(value.code === 0){
                        let html = "";
                        $.each(value.data, function(index,val) {
                            if(val.id === parseInt(inde)){
                                html += '<li class="inde-xuan"><img src="../../images/account/dui.png"/>'+ val.name +'</li>';
                            }else{
                                html += '<li><img class="hide" src="../../images/account/dui.png"/>'+ val.name +'</li>';
                            }
                        });
                        $(".inde ul").append(html);
                    }
                }
            );
            //*********************标签列表*****************************
            ajax_qcy(
                "get",
                '/api/tags.json', {
                    size:15,
                    page:0
                },
                "",
                function(value) {
                    if(value.code === 0){
                        let html = "";
                        $.each(value.data.items, function(index,val) {
                            html += '<li data-id="'+ val.id +'">'+ val.name +'</li>';
                        });
                        $(".labels ul").append(html);
                        $.each(labels,function(index,val){
                            $.each($(".labels ul li"),function(x,y){
                                if(parseInt($(y).attr("data-id")) === parseInt(val)){
                                    $(y).addClass("labels-xuan");
                                }
                            })
                        })
                    }
                }
            );
            //*********************台账详情*****************************
            $.ajax({
                type: "get",
                url:server_url + '/api/ledger/detail.json',
                dataType: 'json',
                data:{
                    id:urlParams("id"),
                    userId:user_id.data.id
                },
                success:function(data){
                    if(data.code === 0){
                        //显示台账评论，点赞，收藏
                        $(".comment").attr("href","../../ledger_list/comment.html?id="+ urlParams("id") +"");
                        //是否点赞和收藏
                        $(".comment .quantity").text(data.data.comments);
                        $(".like .quantity").text(data.data.upvotes);
                        $(".collect .quantity").text(data.data.collects);
                        data.data.isCollect?$(".collect").addClass("active"):"";
                        data.data.isUpvote?$(".like").addClass("active"):"";
                    }
                },
                error:function(){

                }
            });


            //标题处理
            $(".page .header>span").text(data.data.data.title);



            //第一页处理
            let page1 = data.data.page1;
            $(".start .head p").html(page1.name);   //logo名字
            $(".start section header ").html(page1.title);   //标题
            $(".start section .text .words").html(page1.content);   //内容
            $(".start .logo").attr("src",unite_img_url+page1.logo);   //logo
            $(".start .footer-img").attr("src",unite_img_url+page1.price);  //第一个下方图片

            //第二页处理,不确定图片数量；
            let page2 = data.data.page2;
            let length2 = page2.length;
            let two = $(".two");
            let firstTwo = two.first();
            for(let x = 0 ; x < length2 ; x++){
                if(x <= 0){
                    console.log(x);
                    firstTwo.find(".time").html(page2[x].time);
                    firstTwo.find(".diDdian").html(page2[x].location);
                    firstTwo.find(".renYuan").html(page2[x].personnel);
                    firstTwo.find(".explanation>p").html(page2[x].title1);
                    firstTwo.find(".theme>p").html(page2[x].title2);
                }else{
                    let afterTwo = firstTwo.clone();
                    afterTwo.find(".time").html(page2[x].time);
                    afterTwo.find(".diDdian").html(page2[x].location);
                    afterTwo.find(".renYuan").html(page2[x].personnel);
                    afterTwo.find(".explanation>p").html(page2[x].title1);
                    afterTwo.find(".theme>p").html(page2[x].title2);
                    two.last().after(afterTwo);
                }
            }
            //第三页处理,不确定图片数量；
            let page3 = data.data.page3;
            let length3 = page3.length;
            let three = $(".three");
            let firstThree = three.first();
            for(let x = 0 ; x < length3 ; x++){
                if(x <= 0){
                    firstThree.find(".words").html(page3[x].content);
                }else{
                    let afterThree = firstThree.clone();
                    afterThree.find(".words").html(page3[x].content);
                    three.last().after(afterThree);
                }
            }


            //第四个处理,
            $(".odd .odd-img").attr("src",unite_img_url+data.data.page4.price);

            //重置轮播插件
            mySwiper.updateSlidesSize();
            mySwiper.updatePagination();
        }
    }
);


//----------------------------点赞,收藏------------------------------------------
$(document).on("touchstart",".like",function(){
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),1,1);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),1,1);
    }
    $(this).toggleClass("active");
});
$(document).on("touchstart",".collect",function(){
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),2,1);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),2,1);
    }
    $(this).toggleClass("active");
});

function dianShou(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/add.json', {
            "resourceId":urlParams("id"),
            "userId":user_id.data.id,
            'type':type,  //类型,1点赞，2收藏
            "resourceType":resourceType   //资源type 1:台账,2:活动,3:新闻(只能收藏),4:文章
        },
        "",
        function(data) {
            self.find(".quantity").text(parseInt(self.find(".quantity").text())+1);
        }
    )
}
function quXiao(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/delete.json', {
            "resourceId":urlParams("id"),
            "userId":user_id.data.id,
            'type':type,  //类型,1点赞，2收藏
            "resourceType":resourceType   //资源type 1:台账,2:活动,3:新闻(只能收藏),4:文章
        },
        "",
        function(data) {
            self.find(".quantity").text(parseInt(self.find(".quantity").text())-1);
        }
    )
}

