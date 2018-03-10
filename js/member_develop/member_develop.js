// 党员发展

$('.nav_ul li').click(function(){
	//点击当个li，背景颜色加深
	$(this).addClass("whenTab").siblings("li").removeClass("whenTab");
	$(this).children(".container").children("p").addClass("active");
	//点击更换图片
	$(this).find(".pic1").addClass("hide");
	$(this).find(".pic2").removeClass("hide");
	$(this).siblings("li").find(".pic1").removeClass("hide");
	$(this).siblings("li").find(".pic2").addClass("hide");
	//改变p标签字体等样式
	$(this).children(".container").children("p").addClass("active");
	$(this).siblings("li").children(".container").children("p").removeClass("active");
	$(".nav_ul li .container>span").addClass("active");
	$(this).children(".container").children("span").removeClass("active");
	//切换列表
	var index=$(this).index();
	$(this).parents(".develop").find(".content_ul").eq(index).removeClass("hide").siblings(".content_ul").addClass("hide");
	// console.log($(this).parents(".develop").find(".content_ul"));

});
//群众头部切换
$(".nav .filter").click(function(){
	$(".screen_shade").removeClass("hide");
});

var sum = true;

$(document).on("tap",".organization-li",function(){
    setTimeout(function(){
        $(".screen_shade").addClass("hide");
    },300);
	if(sum){
        $(".organization-li").removeClass("active").find("p").removeClass("active");
        //判断是一级菜单，还是二级菜单
        if($(this).find("p").length > 0){
            $(this).find("p").addClass("active");
            $(".nav .organization").html($(this).find("p").text());
        }else{
            $(this).addClass("active");
            $(".nav .organization").html($(this).text());
        }
        var orgId = parseInt($(this).attr("data-id"));
        //选择党组或支部，筛选
        //群众
        user($(".mass_ul"),0,orgId);
        //积极份子
        user($(".activist_ul"),10,orgId);
        //重点发展对象
        user($(".object_ul"),20,orgId);
        //30预备党员
        user($(".data_list"),30,orgId);
        sum = false;
	}else{
		sum = true;
	}

});
//党员个人发展
$(".geren a").attr("href","partyDevelop.html?id=" + user_id.data.id);


//群众
user($(".mass_ul"),0);
//积极份子
user($(".activist_ul"),10);
//重点发展对象
user($(".object_ul"),20);
//30预备党员
user($(".data_list"),30);


//封装函数，self：为放在哪个下，numb是参数 0:群众,10:积极份子,20:重点对象,30预备党员,100党员
function user(self,numb,orgId){
	var user = {
        size:1000,
        page:0
    };
    //如何有orgId数据，则ajax添加orgId参数
	if(orgId){
		user["orgId"] = orgId;
	}
    ajax_qcy(
        "get",
        '/api/users/'+ numb +'.json',
        user,
        "",
        function(data){
            //有一个ul中，有筛选的数据，不能清空
            if(self.is(".mass_ul")){
                $(".reserved").siblings().remove();
            }else{
                self.empty();    //清空
            }
            var li = '';
            if(data.code === 0){
            	if(data.data.items.length >= 1){
                    $.each(data.data.items,function(index,val){
                        //总人数
                        $(".nav_ul li").eq((self.index())-1).find("p span").text(index+1);
                        //判断男女，1为男，2为女
                        var icon = parseInt(val.sex) ===1?"icon":"icon woman";
                        li +=  '<li><a href="partyDevelop.html?id='+ val.id +'"><div class="left_container"><div class="left_img"><div class="bg"> <img src="'+ unite_img_url+val.photo +'" alt="'+ val.name +'"> </div></div> <div class="detail"><div class="name"> '+ val.name +'<span class="'+ icon +'"></span> </div> <p>'+ val.organName +'</p> </div><p class="right">'+ val.score +'积分</p> </div> </a></li>';
                    });
                    self.append(li);
				}else{
                    $(".nav_ul li").eq((self.index())-1).find("p span").text(0);
				}
            }else{
                self.append('<li style="text-align:center;font-size:16px;color:#fff;padding:0.35rem 0;">暂无数据</li>');
                $(".nav_ul li").eq((self.index())-1).find("p span").text(0);   //暂无数据时，人数为0；
            }
        }
    )
}


//------------------------------------------------筛选的组织-----------------------------------------------
ajax_qcy(
	"get",
	'/api/organizations.json',
	{
		clientId:'party-app-core-server',
		taskuuid:uuid(32,16),   //在common.js有生成 var uuid32 = uuid(32,16);
        firmId:companyID
	},
	"",
	function(data){
		if(data.code === 0){
			var level = '',secondary = '';   //html
			var levelData = [],secondaryData = [];    //数据
			//将数据分成一级菜单和二级菜单，分别放入数组中
			$.each(data.data,function(index,val){
				if(val.pid === 1){
                    levelData.push(val);
				}else{
                    secondaryData.push(val);
				}
			});
			//遍历一级菜单
			$.each(levelData,function(index,val){
                var secondary = '';   //html
                var sum = '';
                //遍历二级菜单，如果二级菜单ID和一级菜单PID匹配，则将二级菜单放入一级菜单内
                $.each(secondaryData,function(x,y){
                    if(y.pid === val.id){
                        secondary += '<li data-id="'+ y.id +'" class="organization-li">'+ y.name +'</li>';
					}
                });
                if(secondary){
                    sum = '<ul class="secondary-menu"> <div class="secondary-menu-rectangle"></div> '+ secondary +' </ul>';
				}
                level += '<li data-id="'+ val.id +'" class="organization-li"> <div class="Level-menu"><i></i><p>'+ val.name +'</p></div> '+ sum +' </li>';
			});
			$(".screen_shade .list").append(level);
		}
	}
);
