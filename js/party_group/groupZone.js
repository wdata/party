// 党组带头空间
// 党组成员的滑动
var partyGroup = new Swiper('.partyGroup ',{
    slidesPerView : 5.2,
    spaceBetween : 10
});
// 轨迹
var group_track= new Swiper('.group_track',{
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
});

//所有党组成员，跳转至所有成员
$(".banner .right a").attr("href","../friend/all_members.html?id="+urlParams("id"));
$(".header-FA a").attr("href","homepage.html?typeId?typeId="+ urlParams("typeId"));
//*********************党组带头--党组书记*****************************
$.ajax({
    type: "get",
    url:server_url +  "/api/party/base.json",
    data: {
        'id':urlParams("id"),
        "abc":uuid(32,16)
    },
    dataType: 'json',
    cache:false,
    success:function(data){
        if(data.code === 0){
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
                }else{
                    $(".page .name .job-title").text(not_defined);
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
        }
    },
    error: function (res) {
        console.log(res.status);
    }
});
//*********************党组带头--党组成员*****************************
ajax_qcy(
	"get",
	'/api/users.json', {
		'id':urlParams("id")
	},
	"党组带头_党组成员_信息请求失败",
	function(data) {
	    var banner = $(".banner .swiper-wrapper");
	    banner.empty();
		if(data.code === 0){
            var div = '';
            $.each(data.data, function(index,val){
                var user = val.jobs ? val.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                div += ' <div class="swiper-slide"><a href="../party_member/memberZone.html?id='+ val.id +'"><div class="swiper_img"><img src="'+ unite_img_url+val.photo +'" alt=""></div><p>'+ user +'<br /><span>'+ val.name +'</span></p></a></div>';
            });
            banner.append(div);
		}
	}
);
//*********************党组带头--最新台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/organization.json', {
		'organizationId':urlParams("id"),
		"firmId":companyID,
        "page":0,
        "size":10
	},
	"党组带头_台账_信息请求失败",
	function(data) {
		if(data.code === 0){
            var div = '';
            $.each(data.data.items, function(index,val) {
                div += '<div class="swiper-slide newSlide"><a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><img src="'+ unite_img_url+val.icon +'" alt="" class="firstImg"></a></div>'
            });
            $(".member_newledger>div").append(div);
            // 最新台账
            var group_newledger = new Swiper('.member_newledger',{
                slidesPerView : 3.8,
                spaceBetween : 4
            });
		}
	}
);
//*********************党组带头--四个指标*****************************
ajax_qcy(
	"get",
	'/api/standards/'+ urlParams("typeId") +'.json', {

	},
	"",
	function(data) {
		if(data.code === 0){
            var div = "";
            $.each(data.data, function(index,val) {
                div += '<div class="target-box"><p>'+ val.name +'</p><div class="target-display"><a href="../ledger_list/ledger.html?id='+ val.id +'&organId='+ urlParams("id") +'&head='+ val.name +'"><img src="../images/branch/right.png" alt="" class="titleRight"></a></div></div>';
            });
            $(".fourpoints .target").append(div);
		}
	}
);
//*********************党组带头--台账模板*****************************
ajax_qcy(
    "get",
    '/api/templates.json', {
        type:urlParams("typeId"),
        size:10,
        page:0
    },
    "",
    function(data) {
        var self = $(".group_model .swiper-wrapper");    //重复选择器有编辑器有提示语法问题；
        self.empty();   //清空
        if(data.code === 0){
            var div = "";
            $.each(data.data.items, function(index,val) {
				div += '<div class="swiper-slide newSlide"><a href="../templates/'+ val.path +'/edit.html?typeId='+ urlParams("typeId") +'&organId='+ urlParams("id") +'&templateId='+ val.id +'"><img src="'+ unite_img_url + val.icon +'" alt="" class="firstImg"></a></div>';
            });
            self.append(div);
            // 台账模板
            var group_model=new Swiper('.group_model',{
                slidesPerView : 3.8,
                spaceBetween : 4
            });
        }
    }
);