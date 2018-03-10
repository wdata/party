//解释：
//  <div class="enter"><div class="heart swiper-container"><div class="swiper-wrapper"></div></div></div>  外层
//     第一张页面：<div class="start swiper-slide">      不可不复制
//     第二张页面：<div class="two keFu swiper-slide">    可复制(克隆，添加到元素后面)，获取数据以.two选择器遍历
//     第三张页面：<div class="three keFu swiper-slide">    可复制(克隆，添加到元素后面)，获取数据以.two选择器遍历
//     第四张页面：<div class="odd swiper-slide">    不可复制
//     <img class="delete hide" src="../../images/account/gb.png"/>   删除框内内容
//     <img class="fangDa hide" src="../../images/account/fd.png"/>   放大缩小、拖动（功能未完善）

//*****************************************页面编辑*****************************************
// $('body').height($('body')[0].clientHeight);
//------------------------------------------换图------------------------
//获取系统高度，并设置；
$(".swiper-container").css("height",document.documentElement.clientHeight+"px");

//页面切换
let mySwiper = new Swiper('.swiper-container', {
	initialSlide :0,
	direction : 'vertical',
});

//公共属性：换图后返回的图片名；
let price = ["b5594dc1-f588-46dd-a37d-309730277542.png","caa95970-6755-4fe2-949b-0e98264e0fe7.png","3221a44c-6fdb-4078-82c9-3d24aae5bec5.png"];  //默认




function imgChange(obj) {
    //实现图片预览
    let file = obj.files[0];
    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;
    let reader = new FileReader();
    reader.onload = function(e){
        $(obj).parents(".bendi").siblings("img").attr("src",this.result);
        // 清空图片上传框的值
        $(obj).val("");
    };
    reader.readAsDataURL(file);


// *************************************************上传图片并返回图片名**************************************（*****************
    let index = $(".form").index($(obj).parent());
    let form = new FormData($(obj).parent()[0]);       //需要是JS对象

    //使用原始ajax书写，主要为添加async: false,cache: false,contentType: false,processData: false, 这四个属性，并删除dataType: 'json',
    $.ajax({
        type: "post",
        url: serverId + '/file-server/api/files/upload.json',
        data: form,
        contentType: false,
        processData: false,
        success:function(data){
            if(data.code === 0){
                price[index] = data.data;
                $.dialog({
                    type : 'info',
                    infoText : '换图成功',
                    infoIcon : '../../plugin/dialog/images/success.png',
                    autoClose : 1500
                });
            }
        },
        error: function (res) {
            console.log(res.status);
        }
    });

}





//点击区域可编辑   contenteditable="true";
let self;
$(document).on("click",".editable",function(){
	$(".editable").removeClass("edit").siblings(".delete").addClass("hide").siblings(".fangDa").addClass("hide");
	$(this).addClass("edit");
	$(".input-box").removeClass("hide");
	$(this).siblings(".delete").removeClass("hide");
	$(this).siblings(".fangDa").removeClass("hide");
	self = $(this);
    $(".input-box .enter").html($(this).html());
	$(this).siblings(".delete").click(function(){
		self.text("");
	})
});
$(".input-box .box").click(function(){
    self.html($(".input-box .enter").html());
	$(".input-box").addClass("hide");
});
$(".input-box .shan").click(function(){
	$(".input-box .enter").text("");
});
$(".fuzhi").click(function(){
	$(this).parent().after($(this).parent().clone());
	mySwiper.updateSlidesSize();
	mySwiper.updatePagination();
});


//*****************************************标签和指标*****************************************
let lebel = [];
let inde = null;
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
$(".pop footer .no").click(function(){
	$(".pop").addClass("hide");
});
//-----------------------选择标签，最多三个---------------------
$(document).on("click",".pop .labels li",function(){
	if($(this).hasClass("labels-xuan")){
        $(this).removeClass("labels-xuan");
        //查找删除的this在数组哪个位置
        let self = this;
        $.each(lebel,function(index){
        	if(self === lebel[index]){
        		ind = index;
        	}
        })
    }
    else{
        $(this).addClass("labels-xuan");
        spanText=$(this).text();
    }
    //超过3个，取消前面绑定的active
    $.each($(this),function(index,val){
		if($(val).is(".labels-xuan")){
			lebel.push(val);
			if(lebel.length>=4){
				$(lebel[0]).removeClass("labels-xuan");
				lebel.splice(0,1);
			}
		}else{
			//不超过5个删除，再次点击的this
			lebel.splice(ind,1);
		}
	})
});
//-----------------------选择指标，只能选择一个---------------------
$(document).on("click",'.pop .inde li',function(){
	$(this).addClass("inde-xuan").siblings().removeClass("inde-xuan");
	$(this).find("img").removeClass("hide");
	$(this).siblings().find("img").addClass("hide");
	inde = $(this).attr("data-id");
});
//-----------------------隐藏      确定---------------------
$(".pop footer .yes").click(function(){
	if(lebel.length >= 1 && inde !== null){
		$(".pop").addClass("hide");
	}else{
        $.dialog({
            type : 'info',
            infoText : '至少选择一个标签和指标',
            infoIcon : '../../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
	}
});

//*********************四个指标*****************************
ajax_qcy(
    "get",
    '/api/standards/'+ urlParams("typeId") +'.json',
    {},
    "",
    function(data) {
        if(data.code === 0){
            let html = "";
            $.each(data.data, function(index,val) {
                html += '<li data-id="'+ val.id +'"><img class="hide" src="../../images/account/dui.png"/>'+ val.name +'</li>';
            });
            $(".inde ul").append(html);
        }
    }
);

//*********************标签列表*****************************
ajax_qcy(
    "get",
    '/api/tags.json', {
        size:15,
        page:0
    },
    "",
    function(data) {
        if(data.code === 0){
            let html = "";
            $.each(data.data.items, function(index,val) {
                html += '<li data-id="'+ val.id +'">'+ val.name +'</li>';
            });
            $(".labels ul").append(html);
        }
    }
);



//编辑台账时，中间不要刘空格
//保存台账；   //自写例子
let account1 = {
	"page1":{
		"logo":"logo.png",
		"name":"李克强",
		"title":"2014年博鳌亚洲论坛年会开幕大会上，李克强总理",
		"content":"以“共同开创亚洲发展的新未来” 为题发表演讲，全面阐述了中国打亚洲合作政策，并强调要推进“一带一路”的建设。",
		"price":"boao.png"
	},
	"page2":[
		{
			"time":"2017/4/5&nbsp;18:20",
			"location":"金橙会议厅",
			"personnel":"香洲区局党组全体成员",
			"title1":"二十一世纪海上丝绸之路",
			"title2":"解读一路一带"
		},
        {
            "time":"2017/4/5&nbsp;18:20",
            "location":"金橙会议厅",
            "personnel":"香洲区局党组全体成员",
            "title1":"二十一世纪海上丝绸之路",
            "title2":"解读一路一带"
        },
        {
            "time":"2017/4/5&nbsp;18:20",
            "location":"金橙会议厅",
            "personnel":"香洲区局党组全体成员",
            "title1":"二十一世纪海上丝绸之路",
            "title2":"解读一路一带"
        }
	],
	"page3":[
		{
			"content":'<p>“一带一路”是指</p><p>“丝绸之路经济带”和“21世纪海上丝绸之路”，</p> <p>他将充分依靠中国与有关国家既有的双多边机制，</p> <p>借助既有的、行之有效的区域合作平台</p> <p>“一带一路”的建设不仅不会与上海合作组织、欧亚经济联盟、</p> <p>中国-东盟（10+1）等既有合作机制阐述重叠或竞争，</p> <p>还会为这些机制注入新的内涵和活力</p>'
		},
        {
            "content":'<p>“一带一路”是指</p><p>“丝绸之路经济带”和“21世纪海上丝绸之路”，</p> <p>他将充分依靠中国与有关国家既有的双多边机制，</p> <p>借助既有的、行之有效的区域合作平台</p> <p>“一带一路”的建设不仅不会与上海合作组织、欧亚经济联盟、</p> <p>中国-东盟（10+1）等既有合作机制阐述重叠或竞争，</p> <p>还会为这些机制注入新的内涵和活力</p>'
        },
        {
            "content":'<p>“一带一路”是指</p><p>“丝绸之路经济带”和“21世纪海上丝绸之路”，</p> <p>他将充分依靠中国与有关国家既有的双多边机制，</p> <p>借助既有的、行之有效的区域合作平台</p> <p>“一带一路”的建设不仅不会与上海合作组织、欧亚经济联盟、</p> <p>中国-东盟（10+1）等既有合作机制阐述重叠或竞争，</p> <p>还会为这些机制注入新的内涵和活力</p>'
        }
	],
	"page4":{
		"price":"we.png"
	}
};
let account = {};


function edit(){
	//页面1
	account = {
        "page1":{
            "logo":price[0],
            "name":$(".start .head p").html(),
            "title":$(".start section header .editable").html(),
            "content":$(".start section .text .editable").html(),
            "price":price[1]
        }
	};

	//页面2
    let page2 = [];
    //可以复制页面，所以不确定有多少个页面
	$.each($(".two"),function(index,val){
        let numbur = {
            "time":$(this).find(".time>p").html(),
            "location":$(this).find(".diDdian>p").html(),
            "personnel":$(this).find(".renYuan>p").html(),
            "title1":$(this).find(".explanation>p").html(),
            "title2":$(this).find(".theme>p").html()
		};
        page2.push(numbur);
	});
    account["page2"] = page2;    ///将数组添加到对象中

	//页面3
    let page3 = [];
    //可以复制页面，所以不确定有多少个页面
    $.each($(".three"),function(index,val){
        let numbur = {
            "content":$(this).find(".words").html()
        };
        page3.push(numbur);
    });
    account["page3"] = page3;    ///将数组添加到对象中

    //页面4
	account["page4"] = {
        "price":price[2]
	};

	//指标和标签
	let label = [];   //指标
	$.each(lebel,function(index,val){
        label.push($(val).attr("data-id"));
	});
    //支部堡垒和党组带头需要传党组ID
    let organizationId = null;
	if(parseInt(urlParams("typeId")) === 1 || parseInt(urlParams("typeId")) === 3){
        organizationId = urlParams("organId");
    }



	account["data"] = {
		"tagIds":label,     //标签
		"standardId":inde,     //指标
        "firmId":JSON.parse($.fn.cookie("companyID")),    //公司ID
		"typeId":urlParams("typeId"),   //四个机制ID
        "title":$(".start section header .editable").html(),   //标题
        "summary":$(".start section .text .editable").html(),   //内容
        "organizationId":organizationId,   //党组ID
        "userId":user_id.data.id,    //制作ID
        "templateId":urlParams("templateId"),   //模板ID
        "icon":price[1]    //封面   以第一页底部图片为封面

	};
    console.log(account);
    $("#content").val(JSON.stringify(account));
    let form = new FormData(document.getElementById("edit"));

    // 必须选择标签和指标
    if(lebel.length >= 1 && inde !== null){
    //     //****************************************************保存台账******************************************************
        $.ajax({
            type: "post",
            url: server_url + '/api/ledger/add.json',
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.code === 0) {
                    $.dialog({
                        type : 'info',
                        infoText : '录入成功',
                        infoIcon : '../../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                    history.go(-1);
                } else {
                    $.dialog({
                        type : 'info',
                        infoText : "录入失败",
                        infoIcon : '../../plugin/dialog/images/fail.png',
                        autoClose : 1500
                    });
                }
            },
            error: function (res) {
                console.log(res.status);
            }
        });
    }else{
        $.dialog({
            type : 'info',
            infoText : '请选择标签和指标',
            infoIcon : '../../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
}







