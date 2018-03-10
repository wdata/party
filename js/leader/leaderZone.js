// 领导表率空间
//轨迹按钮与滑动
var leader_track = new Swiper('.leader_track',{
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
})
// 台账模板
var leader_model = new Swiper('.leader_model',{
    slidesPerView : 3.8,
    spaceBetween : 4,
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
});
function change_bg(_this,src,href){
	$(_this).children(".black-img").children("img").attr("src",src);
	setTimeout(function(){
		window.location.href=href;
	},200);
}


//*********************领导表率--个人信息*****************************
ajax_qcy(
	"get",
	'/party-app-core-server/api/user/base.json', {
		id:user_id.data.id
	},
	"领导表率_个人信息_信息请求失败",
	function(data) {
		$(".page .img-bg img").attr("src",unite_img_url+data.data.photo);
		$(".page .position .userName").text(data.data.name);
		$(".page .position li").eq(4).text(data.data.deptName);
		$(".page .title_img .name").text(data.data.topOrganName);
		$(".head_message .item").eq(0).find("span").text(data.data.score);
		$(".head_message .item").eq(1).find("span").text(data.data.ranking);
		$(".head_message .item").eq(2).find("span").text(data.data.ledgers);
	}
)

//*********************领导表率--最新台账*****************************
ajax_qcy(
	"get",
	'/party-app-core-server/api/ledgers.json', {
		'typeId':window.location.href.split("=")[1]
	},
	"领导表率_台账_信息请求失败",
	function(data) {
		var div = '';
		$.each(data.data.items, function(index,val) {
			div += '<div class="swiper-slide newSlide"><img src="'+ unite_img_url+val.icon +'" alt="" class="firstImg"></div>'
		});
		$(".leader_newledger>div").append(div);
		// 最新台账滑动操作
		var leader_newledger = new Swiper('.leader_newledger',{
		    slidesPerView : 3.8,
		    spaceBetween : 4,
		})
	}
)

//*********************党组带头--四个指标*****************************
ajax_qcy(
	"get",
	'/party-app-core-server/api/menus/targets.json', {
		'typeId':window.location.href.split("=")[1]
	},
	"党组带头_台账_信息请求失败",
	function(data) {
		var div = "";
		$.each(data.data.items, function(index,val) {
			div += '<div class="target-box"><p>'+ val.title +'</p><div class="target-display"><a onclick="ledger_href(this,ground[0])"><img src="../images/branch/right.png" alt="" class="titleRight"></a></div></div>';
		});
		$(".fourpoints .target").append(div);
	}
)
