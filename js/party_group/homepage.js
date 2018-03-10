var organId = null;
//*********************党组带头--党组书记*****************************
ajax_qcy(
	"get",
	'/api/party/base.json', {
		'id':user_id.data.organId
	},
	"党组书记_信息请求失败",
	function(data) {
	    if(data.data.name){
            $("#head").attr("href","../party_member/memberZone.html?id="+data.data.id);   //跳转个人空间
            $(".title_img .title").text(data.data.organName);     //显示所在党组
            $(".page .img-bg img").attr("src",unite_img_url+data.data.photo);   //个人头像
            $(".page .name .box").text(data.data.name);    //名字
            if(data.data.jobs){
                $.each(data.data.jobs,function(index,val){
                    if(val.isLeader === 1){
                        $(".page .name .job-title").text(val.name);
                    }
                });
            }
            var jifen = $(".head_message .item");
            jifen.eq(0).find("span").text(data.data.score);
            jifen.eq(1).find("span").text(data.data.ranking);
            jifen.eq(2).find("span").text(data.data.ledgers);
        }else{
	        $(".name").hide();
            $(".page .img-bg img").attr("src",unite_img_url+data.data.icon);   //个人头像
            $(".title_img .title").text(data.data.organName);     //显示所在党组
        }

        organId = data.data.organId;
        //*********************党组带头--所有党组*****************************
        ajax_qcy(
            "get",
            '/api/partys.json', {
                'id':companyID
            },
            "党组带头_党组支部_信息请求失败",
            function(data) {
                if(data.code === 0){
                    $.each(data.data, function(index, val) {
                        var div = '';
                        console.log(val.id,parseInt(organId));
                        if(val.id === parseInt(organId)){
                            div = '<div class="swiper-slide"><a href="../party_group/groupZone.html?typeId='+ urlParams("typeId") +'&id='+ val.id +'"><img width="100%" height="100%" src="' + unite_img_url+val.icon + '""><p>' + val.name + '</p></a></div>';
                            $(".banner .swiper-wrapper").prepend(div);
                        }else{
                            div = '<div class="swiper-slide"><a href="../party_group/groupZone.html?typeId='+ urlParams("typeId") +'&id='+ val.id +'"><img width="100%" height="100%" src="' + unite_img_url+val.icon + '""><p>' + val.name + '</p></a></div>';
                            $(".banner .swiper-wrapper").append(div);
                        }
                    });
                    var mySwiper = new Swiper('.swiper-container', {
                        slidesPerView: 3.8,
                        spaceBetween: 8
                    });
                }
            }
        );
	}
);

//*********************党组带头--点赞之星台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/dianzan/type.json', {
		'size':2,
        "page":0,
		"type":urlParams("typeId"),
        "firmId":companyID
	},"党组带头_点赞之星台账_信息请求失败",
	function(data) {
        if(data.code === 0){
            var a = '';
            $.each(data.data, function(index, val) {
                var span = '';
                $.each(val.tagVOs,function(ind,va){
                    span += '<span>'+ va.name +'</span>';
                });
                var user = val.user.jobs ? val.user.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                a += '<a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><dl >'+
                    ' <dt><img src="'+ unite_img_url+val.icon +'"><div class="icon"><img src="../images/branch/like.png" alt=""></div></dt>'+
                    '<dd class="content"><h2>'+ val.title +'</h2><div class="content">'+ val.content +'</div><div class="overview">'+ span +
                    ' </div><div class="foot"><div data-age="'+ val.user.id +'" class="foot_title"><img src="'+ unite_img_url+val.user.photo +'" alt="">'+
                    '&nbsp;<span class="name">'+ val.user.name +'</span>&nbsp;<span class="position">'+ user +'</span>'+
                    ' </div></div><div class="icon"><img src="../images/branch/'+ (index+1) +'.png"></div></dd></dl> </a>';

                $(a).find(".overview").append(span);
            });
            $(".ledger .list").prepend(a);
		}
	}
);

//*********************党组带头--创造之星台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/creative/type.json', {
        'size':2,
        "page":0,
        "type":urlParams("typeId"),
        "firmId":companyID
	},
	"党组带头_创造之星台账_信息请求失败",
	function(data) {
        if(data.code === 0){
            var a = '';
            $.each(data.data, function(index, val) {
                var span = '';
                $.each(val.tagVOs,function(ind,va){
                    span += '<span>'+ va.name +'</span>';
                });
                var user = val.user.jobs ? val.user.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                a += '<a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><dl >'+
                    ' <dt><img src="'+ unite_img_url+val.icon +'"><div class="icon"><img src="../images/branch/innovate.png" alt=""></div></dt>'+
                    '<dd class="content"><h2>'+ val.title +'</h2><div class="content">'+ val.content +'</div><div class="overview">'+ span +
                    ' </div><div class="foot"><div data-age="'+ val.user.id +'" class="foot_title"><img src="'+ unite_img_url+val.user.photo +'" alt="">'+
                    '&nbsp;<span class="name">'+ val.user.name +'</span>&nbsp;<span class="position">'+ user +'</span>'+
                    ' </div></div><div class="icon"><img src="../images/branch/'+ (index+1) +'.png"></div></dd></dl> </a>';
                $(a).find(".overview").append(span);
            });
            $(".ledger .list").append(a);
		}
	}
);
//--------------创新之星和点赞之星 跳转至个人空间
$(document).on("click",".foot_title",function(){
	window.location.href = "../party_member/memberZone.html?id="+$(this).attr("data-age");
	return false;
});
