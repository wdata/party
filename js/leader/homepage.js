function like_href(_this,text){
    sessionStorage.setItem("like_star",text);
    $(_this).attr("href",'../ledger_list/ledger.html');
}
//所有支部成员，跳转至所有成员
$(".banner .right a").attr("href","../all_members/all_members.html?id="+user_id.data.organId);

//*********************领导表率--个人信息*****************************
ajax_qcy(
	"get",
	'/api/user/base.json', {
		id: user_id.data.id
	},
	"领导表率_党组领导_信息请求失败",
	function(data) {
		if(data.code === 0){
            $("#head").attr("href","../party_member/memberZone.html?id="+data.data.id);   //跳转链接到个人空间
            $(".page .img-bg img").attr("src",unite_img_url+data.data.photo);    //个人头像
            $(".page .position .userName").text(data.data.name);   //个人姓名
            $(".page .name").text(data.data.organName);
            //职位，有多个;
            var li = '';
            $.each(data.data.jobs,function(index,val){
                li += '<li class="ke">'+ val.name +'</li>'
            });
            $(".page .position").append(li);

            //性别
            var sex = "";
            switch (data.data.sex){
                case -1: sex = '未知';
                    break;
                case 1:sex = '男';
                    break;
                case 2:sex = '女';
                    break;
                default:sex = '未知';
                    break;
            }
            $(".page .position .sex").text(sex);

            var jifen = $(".head_message .item");
            jifen.eq(0).find("span").text(data.data.score);
            jifen.eq(1).find("span").text(data.data.ranking);
            jifen.eq(2).find("span").text(data.data.ledgers);
		}
	}
);

//*********************领导表率--支部成员*****************************
ajax_qcy(
	"get",
	'/api/users.json', {
		id:user_id.data.organId
	},
	"领导表率_支部成员_信息请求失败",
	function(data) {
		if(data.code === 0){
            $(".banner .swiper-wrapper").html(" ");
            $(".banner .title b").text(user_id.data.organName+"所有成员");
            $.each(data.data, function(index, val) {
                var user = val.jobs ? val.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                var div = ' <div class="swiper-slide"><a href="..//party_member/memberZone.html?id='+ val.id +'"><div class="swiper_img"><img src="' + unite_img_url+val.photo + '" alt=""></div><p>'+ user +'<br /><span>'+ val.name +'</span></p></a></div>';
                $(".banner .swiper-wrapper").append(div);
            });
            var mySwiper = new Swiper('.swiper-container',{
                slidesPerView : 5.2,
                spaceBetween : 10
            });
		}
	}
);


//*********************领导表率--点赞之星台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/dianzan/type.json', {
        'size':2,
        "page":0,
        "type":urlParams("typeId"),
        "firmId":companyID
	},
	"领导表率_点赞之星台账_信息请求失败",
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
                    '&nbsp;<span class="name">'+ val.user.name +'</span>&nbsp;<span class="position">'+user+'</span>'+
                    ' </div></div><div class="icon"><img src="../images/branch/'+ (index+1) +'.png"></div></dd></dl> </a>';

                $(a).find(".overview").append(span);
            });
            $(".ledger .list").prepend(a);
		}
	}
);

//*********************领导表率--创造之星台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/creative/type.json', {
        'size':2,
        "page":0,
        "type":urlParams("typeId"),
        "firmId":companyID
	},
	"领导表率_创造之星台账_信息请求失败",
	function(data) {
		if(data.code === 0 ){
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
                    '&nbsp;<span class="name">'+ val.user.name +'</span>&nbsp;<span class="position">'+user+'</span>'+
                    ' </div></div><div class="icon"><img src="../images/branch/'+ (index+1) +'.png"></div></dd></dl> </a>';
                $(a).find(".overview").append(span);
            });
            $(".ledger .list").append(a);
		}
	}
);
//*********************领导表率--台账模板*****************************
ajax_qcy(
    "get",
    '/api/templates.json', {
        type:urlParams("typeId"),
        size:10,
        page:0
    },
    "",
    function(data) {
        var self = $(".leader_model .swiper-wrapper");    //重复选择器有编辑器有提示语法问题；
        self.empty();   //清空
        if(data.code === 0){
            var div = "";
            $.each(data.data.items, function(index,val) {
                div += '<div class="swiper-slide newSlide"><a href="../templates/'+ val.path +'/edit.html?typeId='+ urlParams("typeId") +'&templateId='+ val.id +'"><img src="'+ unite_img_url + val.icon +'" alt="" class="firstImg"></a></div>';
            });
            self.append(div);
            // 台账模板
            var leader_model=new Swiper('.leader_model',{
                slidesPerView : 3.8,
                spaceBetween : 4
            });
        }
    }
);
//--------------创新之星和点赞之星 跳转至个人空间----------------------
$(document).on("click",".foot_title",function(){
	window.location.href = "../party_member/memberZone.html?id="+$(this).attr("data-age");
	return false;
});