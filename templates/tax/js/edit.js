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
let price = [["04e0c03a-c9a1-41ea-bece-b5b68125f510.png"],[["b5b0a41d-14db-45bf-93f9-744b43f4f4c0.png","a3885ce3-72ea-4913-b678-60e70a2fc2db.png","badd099f-ee97-4863-86e3-9deaba432c7e.png","23f4d974-d5dc-41e8-9c62-f5913f9b5502.png"]],"dfd96571-18f3-4a96-88db-9c328f4a7d3d.png"];  //默认


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
    let indexTwo = $(".two").index($(obj).parents(".two"));     //定位二级数组
    let indexThree = $(".three").index($(obj).parents(".three"));  //定位二级数组
    let indexLi = $(obj).parents("li").index();   //定位三级数组
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
                let self = $(obj).parents(".swiper-slide");//定位一级数组   确定是属于two的还是three的
                if(self.is('.two')){
                    price[0][indexTwo] = data.data;
                }else if(self.is(".three")){
                    price[1][indexThree][indexLi] = data.data;
                }else if(self.is(".odd")){
                    price[2] = data.data;
                }
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
    // setTimeout(function() {
    //     div.focus();
    // }, 0);
    $(".enter").focus();
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
//复制
$(document).on("click",".fuzhi",function(){
    $(this).parent().after($(this).parent().clone());
    //当复制时需要修改默认的price数组，复制的时候会复制被点击页面图片。
    let self = $(this).parent();
    if(self.is(".two")){
        price[0].push(price[0][$(".two").index(self)]);
    }else if(self.is(".three")){
        price[1].push(price[1][$(".three").index(self)]);
    }

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
        "name":"机关党委办 赵虹飞",
        "title":"关于税务系统<div>依法治税工作规划</div>",
        "time":"2017.04.06"
    },
    "page2":[
        {
            "theme":"“十三五”时期税务系统全面推进依法治税工作规划的通知",
            "character":"赵虹飞",
            "spot":"国税系统 示范基地",
            "instructions":"贯彻落实（国务院关于做好自由贸易试验区新一批改革试点经验复制推广工作的通知）",
            "price":"tax2.png"
        },
        {
            "theme":"“十三五”时期税务系统全面推进依法治税工作规划的通知",
            "character":"赵虹飞",
            "spot":"国税系统 示范基地",
            "instructions":"贯彻落实（国务院关于做好自由贸易试验区新一批改革试点经验复制推广工作的通知）",
            "price":"tax2.png"
        }
    ],
    "page3":[
        {
            "price1":"tax3.png",
            "content1":"请输入照片内容介绍",
            "price2":"tax4.png",
            "content2":"请输入照片内容介绍",
            "price3":"tax5.png",
            "content3":"请输入照片内容介绍",
            "price4":"tax6.png",
            "content4":"请输入照片内容介绍",
        },
        {
            "price1":"tax3.png",
            "content1":"请输入照片内容介绍",
            "price2":"tax4.png",
            "content2":"请输入照片内容介绍",
            "price3":"tax5.png",
            "content3":"请输入照片内容介绍",
            "price4":"tax6.png",
            "content4":"请输入照片内容介绍",
        }
    ],
    "page4":{
        "price":"tax6.png"
    }
};
let account = {};
function edit(){
    //页面1
    account = {
        "page1":{
            "title":$(".start .conent .editable").html(),
            "name":$(".start .name .editable").html(),
            "time":$(".start .time .editable").html(),
        }
    };

    //页面2
    let page2 = [];let two = $(".two ul li");
    //可以复制页面，所以不确定有多少个页面
    $.each($(".two"),function(index,val){
        let numbur = {
                "title":$(this).find("li").eq(0).find(".editable").html(),
                "character":$(this).find("li").eq(1).find(".editable").html(),
                "spot":$(this).find("li").eq(2).find(".editable").html(),
                "content":$(this).find("li").eq(3).find(".editable").html(),
                "price":price[0][index]
            };
        page2.push(numbur);
    });
    account["page2"] = page2;    ///将数组添加到对象中

    //页面3
    let page3 = [];let three = $(".three ul li");
    //可以复制页面，所以不确定有多少个页面
    $.each($(".three"),function(index,val){
        let numbur = {
            "price1":price[1][index][0],
            "content1":$(this).find("li").eq(0).find(".editable").html(),
            "price2":price[1][index][1],
            "content2":$(this).find("li").eq(1).find(".editable").html(),
            "price3":price[1][index][2],
            "content3":$(this).find("li").eq(2).find(".editable").html(),
            "price4":price[1][index][3],
            "content4":$(this).find("li").eq(3).find(".editable").html(),
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
        "title":two.eq(0).find(".editable").html(),   //标题    以第二个页主题为标题
        "summary":two.eq(3).find(".editable").html(),   //内容  以第二个页面指示为内容
        "organizationId":organizationId,   //党组ID
        "userId":user_id.data.id,    //制作ID
        "templateId":urlParams("templateId"),   //模板ID
        "icon":price[2]    //封面   以最后一张图片为封面

    };
    console.log(account);
    $("#content").val(JSON.stringify(account));
    let form = new FormData(document.getElementById("edit"));

    //必须选择标签和指标
    if(lebel.length >= 1 && inde !== null){
        //****************************************************保存台账******************************************************
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
                        infoText : '操作成功',
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