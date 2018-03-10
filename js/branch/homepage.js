// function like_href(_this,text){
//     sessionStorage.setItem("like_star",text);
//     $(_this).attr("href",'../ledger_list/ledger.html');
// }
var organId = null;
console.log(user_id.data.organId);
//支部主页头部
ajax_qcy("get",'/api/branch/base.json', {
		id:user_id.data.organId
	},
	"支部堡垒_头部信息请求失败",
	function(data) {
		if(data.code === 0){
			if(data.data.name){
                var html="<img src="+ unite_img_url + data.data.photo +">";
                $("#head").attr("href","../party_member/memberZone.html?id="+data.data.id);  //跳转链接到个人空间
                $(".img-bg").append(html);
                $(".title_img .title").text(data.data.organName);
                $(".head_message .item>span.score").text(data.data.score);
                $(".head_message .item>span.ranking").text(data.data.ranking);
                $(".head_message .item>span.ledgers").text(data.data.ledgers);
                organId = parseInt(data.data.organId);
			}else{

                var html="<img src="+ unite_img_url + data.data.icon +">";
                $(".img-bg").append(html);
                $(".title_img .title").text(data.data.organName);
			}

		}else{
			alert(data.message);
		}
	}
);
//*********************支部堡垒--点赞之星*****************************
ajax_qcy("get",'/api/ledgers/dianzan/organization.json', {
        'size':2,
        "page":0,
        "orgId":user_id.data.organId,
        "firmId":companyID
    },
    "支部堡垒_点赞之星_信息请求失败",
    function(data) {
        // console.log(data);
        if(data.code === 0){
            var html='';
            $.each(data.data, function(index, val) {
                var tagList='';
                $.each(val.tagVOs,function(index,item){
                    tagList+='<span>'+item.name+'</span>';
                });
                var user = val.user.jobs ? val.user.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                html+='<a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"><dl><dt><img src="'+unite_img_url+val.icon+'"><div class="icon"><img src="../images/branch/like.png" alt=""></div></dt><dd class="content"><h2>'+val.title+'</h2><div class="content">'+val.content+'</div><div class="overview">'+tagList+'</div><div class="foot"><div data-age="'+ val.user.id +'" class="foot_title"><img src="'+unite_img_url+val.user.photo+'" alt="">&nbsp;<span class="name">'+val.user.name+'</span>&nbsp;<span class="position">'+ user +'</span></div></div><div class="icon"><img src="../images/branch/'+(index+1)+'.png"></div></dd></dl></a>'
            });
            $(".ledger>.list").prepend(html);
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
        console.log(data);
        if(data.code === 0){
            var html='';
            $.each(data.data, function(index, val) {
                var tagList='';
                $.each(val.tagVOs,function(index,item){
                    tagList+='<span>'+item.name+'</span>';
                });
                var user = val.user.jobs ? val.user.jobs[0].name : not_defined;  //如何有职位，则显示，没有显示未定义
                html+=' <a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'&modelId='+ val.id +'"><dl><dt><img src="'+unite_img_url+val.icon+'"><div class="icon"><img src="../images/branch/innovate.png" alt=""></div></dt><dd class="content"><h2>'+val.title+'</h2><div class="content">'+val.content+'</div><div class="overview">'+tagList+'</div><div class="foot"><div data-age="'+ val.user.id +'" class="foot_title"><img src="'+unite_img_url+val.user.photo+'" alt="">&nbsp;<span class="name">'+val.user.name+'</span>&nbsp;<span class="position">'+ user +'</span></div></div><div class="icon"><img src="../images/branch/1.png"></div></dd></dl></a>'
            });
            $(".ledger>.list").append(html);
        }else{
            // alert("No data found");
        }
    }
);
//*********************支部堡垒--用户所在支部*****************************
ajax_qcy("get",'/api/branchs.json',{
        id:companyID
    },
    "支部堡垒_珠海支部_信息请求失败",
    function(data) {
        if(data.code === 0){
            $.each(data.data, function(index, val) {
                if(organId === val.id){
                    var div = '<div class="swiper-slide"><a href="../branch/branchZone.html?typeId='+ urlParams("typeId") +'&id='+ val.id +'"><img src='+unite_img_url+val.icon+' alt=""><p>' + val.name + '</p></a></div>';
                    $(".banner .swiper-wrapper").prepend(div);
                }else{
                    var div = '<div class="swiper-slide"><a href="../branch/branchZone.html?typeId='+ urlParams("typeId") +'&id='+ val.id +'"><img src='+unite_img_url+val.icon+' alt=""><p>' + val.name + '</p></a></div>';
                    $(".banner .swiper-wrapper").append(div);
                }
            });
            var mySwiper = new Swiper('.swiper-container',{
                slidesPerView : 3.8,
                spaceBetween : 8
            });
        }else{
            // alert("No data found");
        }
    }
);

//--------------创新之星和点赞之星 跳转至个人空间----------------------
$(document).on("click",".foot_title",function(){
	window.location.href = "../party_member/memberZone.html?id="+$(this).attr("data-age");
	return false;
});
