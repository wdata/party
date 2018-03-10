//*****************************************页面编辑*****************************************
//------------------------------------------换图------------------------
let mySwiper = new Swiper('.swiper-container', {
	initialSlide :0,
	direction : 'vertical',
});

//*****************************************标签和指标*****************************************
//-------------------指标和标签显示--------------------
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
    '/api/ledger/'+ urlParams("id") +'.json', {

    },
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
                    size:20,
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
            $(".start header .words").html(page1.title);
            $(".start .name .words").html(page1.name);
            $(".start .time .words").html(page1.time);

            //第二页处理,不确定图片数量；
            let page2 = data.data.page2;
            let length2 = page2.length;
            let two = $(".two");
            let firstTwo = two.first();
            for(let x = 0 ; x < length2 ; x++){
                if(x <= 0){
                    firstTwo.find("li").eq(0).find(".words").html(page2[x].title);
                    firstTwo.find("li").eq(1).find(".words").html(page2[x].character);
                    firstTwo.find("li").eq(2).find(".words").html(page2[x].spot);
                    firstTwo.find("li").eq(3).find(".words").html(page2[x].content);
                    firstTwo.find(".odd-img").attr("src",unite_img_url+page2[x].price);
                }else{
                    let afterTwo = firstTwo.clone();
                    afterTwo.find("li").eq(0).find(".words").html(page2[x].title);
                    afterTwo.find("li").eq(1).find(".words").html(page2[x].character);
                    afterTwo.find("li").eq(2).find(".words").html(page2[x].spot);
                    afterTwo.find("li").eq(3).find(".words").html(page2[x].content);
                    afterTwo.find(".odd-img").attr("src",unite_img_url+page2[x].price);
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
                    firstThree.find("li").eq(0).find(".words").html(page3[x].content1);
                    firstThree.find("li").eq(0).find(".odd-img").attr("src",unite_img_url+page3[x].price1);
                    firstThree.find("li").eq(1).find(".words").html(page3[x].content2);
                    firstThree.find("li").eq(1).find(".odd-img").attr("src",unite_img_url+page3[x].price2);
                    firstThree.find("li").eq(2).find(".words").html(page3[x].content3);
                    firstThree.find("li").eq(2).find(".odd-img").attr("src",unite_img_url+page3[x].price3);
                    firstThree.find("li").eq(3).find(".words").html(page3[x].content4);
                    firstThree.find("li").eq(3).find(".odd-img").attr("src",unite_img_url+page3[x].price4);
                }else{
                    let afterThree = firstThree.clone();
                    afterThree.find("li").eq(0).find(".words").html(page3[x].content1);
                    afterThree.find("li").eq(0).find(".odd-img").attr("src",unite_img_url+page3[x].price1);
                    afterThree.find("li").eq(1).find(".words").html(page3[x].content2);
                    afterThree.find("li").eq(1).find(".odd-img").attr("src",unite_img_url+page3[x].price2);
                    afterThree.find("li").eq(2).find(".words").html(page3[x].content3);
                    afterThree.find("li").eq(2).find(".odd-img").attr("src",unite_img_url+page3[x].price3);
                    afterThree.find("li").eq(3).find(".words").html(page3[x].content4);
                    afterThree.find("li").eq(3).find(".odd-img").attr("src",unite_img_url+page3[x].price4);
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