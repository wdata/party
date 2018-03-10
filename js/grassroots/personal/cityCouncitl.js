/**
 * Created by Administrator on 2017/5/31.
 */

var gender = echarts.init(document.getElementById('gender'));
var standing = echarts.init(document.getElementById('standing'));
var education = echarts.init(document.getElementById('education'));

$(".cityCouncil a").click(function(){
    $(this).addClass("bor").parent().siblings().find("a").removeClass("bor");
    $(".contenter>div").eq($(this).parent().index()).show().siblings().hide();
});

var sum = true;

$(".information").click(function(){
    if(sum){
        $(".contenter").addClass("hide");
        $(".statis").removeClass("hide");

        $(".information").text("成员信息");

        gender.resize();
        standing.resize();
        education.resize();
        sum = false;
    }else{
        $(".contenter").removeClass("hide");
        $(".statis").addClass("hide");
        $(".information").text("数据统计");
        sum = true;
    }
});

//-------------------------------------------支部信息-----------------------------------------
ajax_qcy(
    "get",
    '/api/organizations/branch/detail.json',
    {
        orgId:urlParams("id")
    },
    "组织一级列表",
    function(data){
        if(data.code === 0){
            //各个身份数量

            $(".logo").attr("src",unite_img_url + data.data.icon);
            $(".organName").html(data.data.name);
            $(".header>span").html(data.data.name);

            if(data.data.map['100']){
                $(".cityCouncil li").eq(3).find("p").text(data.data.map['100']);
            }
            if(data.data.map['30']){
                $(".cityCouncil li").eq(2).find("p").text(data.data.map['30']);
            }
            if(data.data.map['20']){
                $(".cityCouncil li").eq(1).find("p").text(data.data.map['20']);
            }
            if(data.data.map['10']){
                $(".cityCouncil li").eq(0).find("p").text(data.data.map['10']);
            }

            var name = data.data.name;
            //-------------------------------------------组织统计图-----------------------------------------
            ajax_qcy(
                "get",
                '/api/users/analyse.json',
                {
                    orgId:urlParams("id")
                },
                "组织一级列表",
                function(data){
                    if(data.code === 0){
                        //圆饼图
                        //男女性别比例
                        var gender_option={title:{text:'组织人员性别比例',x:'center'},tooltip:{trigger:'item',formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:'vertical',left:'left',data:['男','女','未知']},series:[{name:'性别',type:'pie',radius:'60%',center:['50%','55%'],data:[{value:data.data.sex.man,name:'男'},{value:data.data.sex.woman,name:'女'},{value:data.data.sex.unknow,name:'未知'}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:'rgba(0, 0, 0, 0.5)'}}}]};
                        // 基于准备好的dom，初始化echarts实例
                        gender.setOption(gender_option);

                        //党员党龄结构
                        var standing_option={"title":{"text":"组织人员年龄结构","x":"center"},"tooltip":{"trigger":"item","formatter":"{a} <br/>{b} : {c} ({d}%)"},"legend":{"orient":"vertical","left":"left","data":["小于30岁","30~40岁之间","40~50岁之间","50~60岁之间","大于60岁","未知年龄段"]},"series":[{"name":"年龄","type":"pie","radius":"50%","center":["50%","75%"],"data":[{"value":data.data.age.lt30,"name":"小于30岁"},{"value":data.data.age.gt30lt40,"name":"30~40岁之间"},{"value":data.data.age.gt40lt50,"name":"40~50岁之间"},{"value":data.data.age.gt50lt60,"name":"50~60岁之间"},{"value":data.data.age.gt60,"name":"大于60岁"},{"value":data.data.age.unknow,"name":"未知年龄段"}],"itemStyle":{"emphasis":{"shadowBlur":10,"shadowOffsetX":0,"shadowColor":"rgba(0, 0, 0, 0.5)"}}}]};
                        standing.setOption(standing_option);


                        var degree = {title:{text:"组织学历人员比例",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["小学","中学","中专","高中","专科","本科","硕士","博士","未知"]},series:[{name:"学历",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:data.data.degree.primary,name:"小学"},{value:data.data.degree.junior,name:"中学"},{value:data.data.degree.technical,name:"中专"},{value:data.data.degree.senior,name:"高中"},{value:data.data.degree.diploma,name:"专科"},{value:data.data.degree.undergraduate,name:"本科"},{value:data.data.degree.master,name:"硕士"},{value:data.data.degree.doctor,name:"博士"},{value:data.data.degree.unknow,name:"未知"}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};
                        education.setOption(degree);
                    }
                }
            );
        }
    }
);

acct($(".party"),100);     //积极分子
acct($(".preparation"),30);        //重点对象
acct($(".focus"),20);   //预备党员
acct($(".positive"),10);      //党员

//-------------------------------------------成员列表-----------------------------------------
function acct(self,sum){
    ajax_qcy(
        "get",
        '/api/organizations/user/list.json',
        {
            orgId:urlParams("id"),
            type:sum
        },
        "组织一级列表",
        function(data){
            $(self).empty();
            if(data.code === 0){
                var li = "";
                $.each(data.data,function(index,val){
                    //判断男女，femalee.png 为女，male.png 为男
                    var sex = null;
                    console.log(val.sex);
                    switch (val.sex){
                        case 0:sex = 'female.png';  //nv
                            break;
                        case 1:sex = 'male.png';
                            break;
                        case -1:sex = ' ';
                            break;
                    }
                    li += '<li><a href="personal.html?userId='+ val.id +'"><img src="'+ unite_img_url + val.photo +'"/><div><section>'+ val.name +'<img src="../../images/grassroots/personal/'+ sex +'" alt="#"/></section></div> </a></li>';
                });
                $(self).append(li);
            }
        }
    );
}