// 党员先锋空间
// 最新台账滑动操作
var member_newledger = new Swiper('.member_newledger',{
    slidesPerView : 3.8,
    spaceBetween : 4
})
//轨迹按钮与滑动
var member_track = new Swiper('.member_track',{
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
})
// 台账模板
var member_model = new Swiper('.member_model',{
    slidesPerView : 3.8,
    spaceBetween : 4
})
// 弹出层
$(".choose-button").click(function(event){
	$(".black-container").addClass("black-show");
	$(".black-container").removeClass("black-hide");
	$(".choose-button").css("display","none");
	event.preventDefault();//阻止冒泡
},false)
$(".detail-close").click(function(){
	$(".black-container").addClass("black-hide");
	$(".black-container").removeClass("black-show");
	$(".choose-button").css("display","block");
})

//*********************个人空间--个人信息*****************************
ajax_qcy(
	"get",
	'/api/user/base.json', {
		'id': urlParams("id")
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
                case 0:sex = '女';
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


//*********************个人空间--最新台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/personal.json', {
        'userId':urlParams("id"),
        "firmId":companyID,
        "page":0,
        "size":10
	},
	"个人空间_台账_信息请求失败",
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
		}else{
            $(".member_newledger>div").append("暂无数据！");
		}
	}
);

//*********************个人空间--四个机制台账*****************************
ajax_qcy(
	"get",
	'/api/ledgers/'+ urlParams("id") +'.json', {
        firmId:companyID
	},
	"个人空间_台账_信息请求失败",
	function(data) {
		var div = "";
        var inde = 1;
		$.each(data.data, function(index,val) {
		    var title = null;
            switch(val.name){
                case "党组带头":title = 1;
                    break;
                case "领导表率":title =2;
                    break;
                case "支部堡垒":title = 3;
                    break;
                case "党员先锋":title = 4;
                    break;
            }
			div += '<div class="target-box"><p>'+ val.name +'</p><div class="target-display"> <a href="../ledger_list/ledger_user.html?typeId='+ title +'&userId='+ urlParams("id") +'&head='+ val.name +'"><span class="shuliang">'+ val.ledgers +'</span><img src="../images/branch/right.png" alt="" class="titleRight"></a></div></div>'
            inde++;
		});
		$(".fourpoints .target").append(div);
	}
);