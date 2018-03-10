//所有党组成员，跳转至所有成员
$(".banner .right a").attr("href","../friend/all_members.html?id=" + user_id.data.organId);
//*********************党员先锋--个人中心*****************************
ajax_qcy(
	"get",
	'/api/user/base.json', {
		id: user_id.data.id
	},
	"用户个人_信息请求失败",
	function(data) {
		if(data.code===0){
            //身份
			var UserType = "";
            switch (data.data.type){
                case 0:UserType = "群众";
                    break;
                case 10:UserType = "积极分子";
                    break;
                case 20:UserType = "重点对象";
                    break;
                case 30:UserType = "预备党员";
                    break;
                case 100:UserType = "党员";
                    break;
                default:
                    break;
            }
            var sum = '<li>'+ data.data.organName +'</li><li>'+ UserType +'</li><li>'+ data.data.birthday +'</li>';
			$(".name ul").append(sum);
			$("#head").attr("href","memberZone.html?id="+data.data.id);   //跳转链接到个人空间
            $(".page .img-bg img").attr("src",unite_img_url+data.data.photo);    //个人头像
            $(".page .position .userName").text(data.data.name);   //个人姓名
            //职位，有多个;
            if(data.data.jobs){
                var li = '';
                $.each(data.data.jobs,function(index,val){
                    li += '<li class="ke">'+ val.name +'</li>'
                });
                $(".page .position").append(li);
            }else{
                $(".page .position").append('<li class="ke">'+ not_defined +'</li>');
            }
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

			//*********************支部堡垒--点赞之星*****************************
			ajax_qcy("get",'/api/ledgers/dianzan/organization.json', {
                    'size':2,
                    "page":0,
                    "orgId":user_id.data.organId,
                    "firmId":companyID
				},
				"支部堡垒_点赞之星_信息请求失败",
				function(data) {
					if(data.code===0){
						var html='';
						$.each(data.data, function(index, val) {
							var tagList='';
							$.each(val.tagVOs,function(index,item){
								tagList+='<span>'+item.name+'</span>';
							});
                            var user = val.user.jobs ? val.user.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
							html+=' <a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><dl><dt><img src="'+unite_img_url+val.icon+'"><div class="icon"><img src="../images/branch/like.png" alt=""></div></dt><dd class="content"><h2>'+val.title+'</h2><div class="content">'+val.content+'</div><div class="overview">'+tagList+'</div><div class="foot"><div data-age="'+ val.user.id +'" class="foot_title"><img src="'+unite_img_url+val.user.photo+'" alt="">&nbsp;<span class="name">'+val.user.name+'</span>&nbsp;<span class="position">'+ user +'</span></div></div><div class="icon"><img src="../images/branch/'+(index+1)+'.png"></div></dd></dl></a>'
						});
						$(".ledger>.list").append(html);
					}else{
						// alert("No data found");
					}
				}
			);
			//*********************支部堡垒--创新之星*****************************
			ajax_qcy("get",'/api/ledgers/creative/organization.json', {
                    'size':2,
                    "page":0,
                    "orgId":user_id.data.organId,
                    "firmId":companyID
				},
				"支部堡垒_创新之星_信息请求失败",
				function(data) {
					if(data.code===0){
						var html='';
						$.each(data.data, function(index, val) {
							var tagList='';
							$.each(val.tagVOs,function(index,item){
								tagList+='<span>'+item.name+'</span>';
							});
                            var user = val.user.jobs ? val.user.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
							html+=' <a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><dl><dt><img src="'+unite_img_url+val.icon+'"><div class="icon"><img src="../images/branch/innovate.png" alt=""></div></dt><dd class="content"><h2>'+val.title+'</h2><div class="content">'+val.content+'</div><div class="overview">'+tagList+'</div><div class="foot"><div data-age="'+ val.user.id +'" class="foot_title"><img src="'+unite_img_url+val.user.photo+'" alt="">&nbsp;<span class="name">'+val.user.name+'</span>&nbsp;<span class="position">'+ user +'</span></div></div><div class="icon"><img src="../images/branch/1.png"></div></dd></dl></a>'
						});
						$(".ledger>.list").append(html);
					}else{
						// alert("No data found");
					}
				}
			);
		}else{
			alert(data.message);
		}
	}
);

//--------------创新之星和点赞之星 跳转至个人空间----------------------
$(document).on("click",".foot_title",function(){
	window.location.href = "../party_member/memberZone.html?id="+$(this).attr("data-age");
	return false;
});

//*********************党员先锋--所有党员*****************************
//http://192.168.1.239:8600/api/users.json?clientId=party-app-server&taskuuid=fgb3t34gb1143534&id=301
ajax_qcy(
	"get",
	'/api/users.json', {
		id:user_id.data.organId,             //待修改，接口未完成
	},
	"支部堡垒_党组成员_信息请求失败",
	function(data) {
		if(data.code === 0){
            var html='';
            $.each(data.data, function(index, val) {
                var user = val.jobs ? val.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                html+= ' <div class="swiper-slide"><a href="../party_member/memberZone.html?id='+ val.id +'"><div class="swiper_img"><img src="'+unite_img_url+val.photo+'"></div><p>'+ user +'<br /><span>'+ val.name +'</span></p></a></div>';
            });
            $(".banner .swiper-wrapper").append(html);
            var mySwiper = new Swiper('.swiper-container',{
                slidesPerView : 5.2,
                spaceBetween : 10
            });
		}else{
            $(".banner .swiper-wrapper").append('暂无数据');
		}
	}
);
//*********************党员先锋--台账模板*****************************
ajax_qcy(
    "get",
    '/api/templates.json', {
        type:urlParams("typeId"),
        size:10,
        page:0
    },
    "",
    function(data) {
        var self = $(".member_model .swiper-wrapper");    //重复选择器有编辑器有提示语法问题；
        self.empty();   //清空
        if(data.code === 0){
            var div = "";
            $.each(data.data.items, function(index,val) {
                div += '<div class="swiper-slide newSlide"><a href="../templates/'+ val.path +'/edit.html?typeId='+ urlParams("typeId") +'&modelId='+ val.id +'&templateId='+ val.id +'"><img src="'+ unite_img_url + val.icon +'" alt="" class="firstImg"></a></div>';
            });
            self.append(div);
            // 台账模板
            var member_model=new Swiper('.member_model',{
                slidesPerView : 3.8,
                spaceBetween : 4
            });
        }
    }
);