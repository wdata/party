//var month=['一月',"1",'二月',2,'三月',3,'四月',4,'五月',5,'六月',6,'七月',7,'八月',8,'九月',9,'十月',10,'十一月',11,'十二月',12]
var abc = new Date();
var DateYear = abc.getFullYear();
var DateMonth = (abc.getMonth())+1;
var jinTian = DateYear+"-"+DateMonth;
var month = jinTian;

$(".content li").eq(DateMonth).find("i").addClass("active").siblings(".time").addClass("active").text(month);

$(".date>.content>li>span:first-child").click(function(){
    $(".date>.content>li i.active").removeClass("active");
    $(".date>.content>li .time").removeClass("active");
    $(this).parent("li").children("i").addClass("active");
    $(this).parent("li").children(".time").addClass("active");
    var m=$(this).parent("li").children("span:first-child").text();
    month=m=='一月'?1:m=='二月'?2:m=='三月'?3:m=='四月'?4:m=='五月'?5:m=='六月'?6:m=='七月'?7:m=='八月'?8:m=='九月'?9:m=='十月'?10:m=='十一月'?11:12;
    $(this).parent("li").children(".time").text($(".date>.content>li.year:first-child").text()+"-"+month);
    var date = $(".date>.content>li.year:first-child").text()+"-"+month;
    like(date);
});
$(".date>.content>li.year:first-child").click(function(){
    $(".date>.content>li .active").removeClass("active");
    $(this).text($(this).text()-1);
    $(".date>.content>li.year:last-child").text($(".date>.content>li.year:last-child").text()-1);
});
$(".date>.content>li.year:last-child").click(function(){
    $(".date>.content>li .active").removeClass("active");
    $(this).text(parseInt($(this).text())+1);
    $(".date>.content>li.year:first-child").text(parseInt($(".date>.content>li.year:first-child").text())+1);
});


$(function(){
    like(jinTian);
});
var sum = true;
function like(date){
    var html='';var images = [];
    var contr_top=30;//控制中间显示图片的位置百分比
    var windowHeight = $(window).height(),
        $body = $("body");
    $body.css("height", windowHeight); //重要代码
    // for(var i=0;i<images.length;i++){
    //     html+="<li class='pic"+(i+1)+"'><a href='https://www.baidu.com/'><div class='title'>我是标题"+(i+1)+"</div><img src='"+images[i].src+"'/><i></i></a><div class='footer'><div class='like'><i class='icon'><img src='../images/collect/dianzan.png' alt=''></i><span>1453</span></div><div class='title'>主体责任</div></div></li>";
    // }
    //-------------------------------我的台账------------------------------------------
    ajax_qcy(
        "get",
        '/api/ledgers/my/publish.json', {
            "userId":user_id.data.id,
            'date':date,
            "firmId":companyID,
            "page":0,
            "size":10
        },
        "",
        function(data) {
            var self = $("#pic>ul");
            self.empty();
            if(data.code === 0){
                $.each(data.data.items,function(i,val){
                    images.push(i);
                    var dian = "";
                    if(val.isUpvote){
                        dian = 'dz.png';
                    }else{
                        dian = "dianzan.png"
                    }
                    html += "<li data-id='"+ val.id +"' class='pic"+(i+1)+"'>  <a href='../templates/"+ val.templateVO.path +"/show.html?id="+ val.id +"'><div class='title'>"+ val.title +"</div><img src='"+ unite_img_url + val.icon +"'/><i></i></a><div class='footer'><div class='like'><i class='icon'><img src='../images/collect/"+ dian +"' alt=''></i><span>"+ val.upvotes +"</span></div><div class='title'>"+ val.tagVOs[0].name +"</div></div></li>";
                });
                self.html(html);
                $(".footer>.like>.icon").tap(function(){

                    var dian = "../images/collect/dz.png";
                    var zdd = "../images/collect/dianzan.png";

                    //----------------------------点赞------------------------------------------
                    if(sum){
                        if(!($(this).find("img").attr("src") === dian)){
                            //如果没有则是  点赞和收藏
                            dianShou($(this),1,1);
                            $(this).children("img").attr("src",dian);
                        }else{
                            //反之则是取消点赞和收藏
                            quXiao($(this),1,1);
                            $(this).children("img").attr("src",zdd);
                        }
                    }
                    sum = false;
                    return false;
                });
                var length=parseInt(images.length/2);
                $("#pic>ul>li").eq(length).css({"opacity":"1","width": "100%","filter": "alpha(opacity:100)","z-index":length+1,"top":contr_top+"%"});
                var opacity= 0.1,j=length+1;
                var width=length+1;
                var top= 5;
                for(var i= 0;i<length;i++){
                    j--;
                    width--;
                    $("#pic>ul>li").eq(i).css({"opacity":(1-(opacity*j)),"width": (100-(width*10))+"%","filter": "alpha(opacity:"+(opacity*100)+")","z-index":i+1,"top":(contr_top-(top*j))+"%"});
                }
                var opa=0.1,h=0;
                var wid=0;
                var to=contr_top+1;
                var zIndex=length;
                for(var i= length+1;i<images.length;i++){
                    wid++;
                    h++;
                    to+=7;
                    //"width": (100-(wid*10))+"%",
                    $("#pic>ul>li").eq(i).css({"opacity":(1-(opa*h)),"width": (100-(wid*10))+"%","filter":"alpha(opacity:"+(opa*100)+")","z-index":zIndex--,"top":to+"%"});
                }
                var aLi = $("#pic li");
                var arr = [];
                var key=0;
                $.each(aLi, function (index, item) {
                    arr.push([parseInt($(item).css("left")), $(item).css("top"),
                        $(item).css("z-index"), $(item).css("width"), parseFloat($(item).css("opacity"))]);
                });
// 滑动事件

                var startX = '', startY = '', moveEndX = '', moveEndY = '', X = '', Y = '';

                $("#pic ").on("touchstart", function (e) {
                    e.preventDefault();
                    startX = e.changedTouches[0].pageX,
                        startY = e.changedTouches[0].pageY;
                    key=0;
                });
                $("#pic ").on("touchmove", function (e) {
                    e.preventDefault();
                    moveEndX = e.changedTouches[0].pageX,
                        moveEndY = e.changedTouches[0].pageY,
                        X = moveEndX - startX,
                        Y = moveEndY - startY;

                    if (Math.abs(X) > Math.abs(Y) && X > 0) {
                        return false;
                    }
                    else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                        return false;
                    }
                    else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                        key++;
                        if(key==1){
                            arr.push(arr[0]);//给数组末尾添加一个元素
                            arr.shift();//删除数组第一个元素
                            $.each(aLi, function (index, item) {
                                $(item).css("z-index", arr[index][2]);
                                $(item).css({"left": arr[index][0],"top":arr[index][1],'z-index':arr[index][2],"width":arr[index][3],'opacity':arr[index][4]});
                            });
                        }else{
                            return false;
                        }
                    }
                    else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                        key++;
                        if(key==1){
                            arr.unshift(arr[arr.length - 1]);//想数组开头添加一个元素
                            arr.pop();//删除最后一个数组元素
                            $.each(aLi, function (index, item) {
                                $(item).css("z-index", arr[index][2]);
                                $(item).css({"left": arr[index][0],"top":arr[index][1],'z-index':arr[index][2],"width":arr[index][3],'opacity':arr[index][4]});
                            });
                        }else{
                            return false;
                        }
                    }else {
                        return false;
                    }
                });
            }else{
                self.append("<li style='text-align:center;font-size:18px;color:#fff;display: flex;justify-content: center;align-items: center;'>暂无数据</li>")
            }
        }
    );
}


function dianShou(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/add.json', {
            "resourceId":self.parents("li").attr("data-id"),
            "userId":user_id.data.id,
            'type':type,  //类型,1点赞，2收藏
            "resourceType":resourceType   //资源type 1:台账,2:活动,3:新闻(只能收藏),4:文章
        },
        "",
        function(data) {
            self.siblings("span").text(parseInt(self.siblings("span").text())+1);
        }
    )
}
function quXiao(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/delete.json', {
            "resourceId":self.parents("li").attr("data-id"),
            "userId":user_id.data.id,
            'type':type,  //类型,1点赞，2收藏
            "resourceType":resourceType   //资源type 1:台账,2:活动,3:新闻(只能收藏),4:文章
        },
        "",
        function(data) {
            self.siblings("span").text(parseInt(self.siblings("span").text())-1);
        }
    )
}