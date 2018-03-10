// 支部堡垒空空间
// 轨迹
var container = new Swiper('.grow-container',{
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
});


//所有支部成员，跳转至所有成员
$(".banner .right a").attr("href","../friend/all_members.html?id="+urlParams("id"));
$(".header-FA a").attr("href","homepage.html?typeId?typeId="+ urlParams("typeId"));


//*********************支部空间-头部*****************************
$.ajax({
    type: "get",
    url:server_url +  "/api/branch/base.json",
    data: {
        'id':urlParams("id")
	},
    dataType: 'json',
    success:function(data){
    	if(data.code === 0){
    		if(data.data.name){
                var html="<img src="+unite_img_url+data.data.photo+">";
                $(".img-bg").append(html);
                $(".title_img .title").text(data.data.organName);
                $("#head").attr("href","../party_member/memberZone.html?id="+data.data.id);  //跳转链接到个人空间
                $(".head_message .item>span.score").text(data.data.score);
                $(".head_message .item>span.ranking").text(data.data.ranking);
                $(".head_message .item>span.ledgers").text(data.data.ledgers);
			}else{
                var html="<img src="+ unite_img_url + data.data.icon +">";
                $(".img-bg").append(html);
                $(".title_img .title").text(data.data.organName);
			}
		}
	},
    error: function (res) {
        console.log(res.status);
    }
});

//*********************支部空间-所有成员*****************************
ajax_qcy("get",'/api/users.json', {
		'id':urlParams("id")
	},
	"支部堡垒_所有成员_信息请求失败",
	function(data) {
		if(data.code===0){
			var html='';
			$.each(data.data, function(index, val) {
                var user = val.jobs ? val.jobs[0].name : "未定义";  //如何有职位，则显示，没有显示未定义
				html+= ' <div class="swiper-slide"><a href="..//party_member/memberZone.html?id='+ val.id +'"><div class="swiper_img"><img src="'+unite_img_url+val.photo+'" alt=""></div><p>'+ user +'<br /><span>'+ val.name +'</span></p></a></div>';
			});
			$(".banner .swiper-wrapper").append(html);
			// 所有成员
			var nav_list=new Swiper('.nav_list',{
				slidesPerView : 5.2,
				spaceBetween : 10
			});
		}else{
			// alert("No data found")
		}
	}
);
//*********************支部空间-最新台账*****************************
ajax_qcy("get",'/api/ledgers/organization.json', {
        'organizationId':urlParams("id"),
        "firmId":companyID,
        "page":0,
        "size":10
	},
	"支部堡垒_党组成员_信息请求失败",
	function(data) {
		if(data.code === 0){
			var html='';
			$.each(data.data.items,function(index, val){
				html+= '<div class="swiper-slide"><a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><img src="'+unite_img_url+val.icon+'" alt=""></a></div>';
			});
			$(".ledger_list .swiper-wrapper").append(html);
			var ledger_list = new Swiper('.ledger_list',{
				slidesPerView : 3.8,
				spaceBetween : 4
			});
		}else{
			// alert("No data found");
		}
	}
);
//*********************支部空间-四个指标*****************************
ajax_qcy("get",
	'/api/standards/'+ urlParams("typeId") +'.json',
	{},
	"支部堡垒_四个指标_信息请求失败",
	function(data) {
		if(data.code===0){
			var html='';
			$.each(data.data,function(index, val){
				html+= '<div class="target-box"><p>'+val.name+'</p><div class="target-display"><a href="../ledger_list/ledger.html?id='+ val.id +'&organId='+ urlParams("id") +'&head='+ val.name +'"><img src="../images/branch/right.png" alt="" class="titleRight"></a></div></div>';
			});
			$(".target").append(html);
		}else{
			// alert("No data found");
		}
	}
);
//*********************支部堡垒--台账模板*****************************
ajax_qcy(
    "get",
    '/api/templates.json', {
        type:urlParams("typeId"),
        size:10,
        page:0
    },
    "",
    function(data) {
        var self = $(".ledger_template  .swiper-wrapper");    //重复选择器有编辑器有提示语法问题；
        self.empty();   //清空
        if(data.code === 0){
            var div = "";
            $.each(data.data.items, function(index,val) {
                div += '<div class="swiper-slide newSlide"><a href="../templates/'+ val.path +'/edit.html?typeId='+ urlParams("typeId") +'&organId='+ urlParams("id") +'&templateId='+ val.id +'"><img src="'+ unite_img_url + val.icon +'" alt="" class="firstImg"></a></div>';
            });
            self.append(div);
			// 台账模板
            var ledger_template = new Swiper('.ledger_template',{
                slidesPerView : 3.8,
                spaceBetween : 4
            });
        }
    }
);
