/**
 * Created by Administrator on 2017/5/26.
 */
var gender = echarts.init(document.getElementById('gender'));
var standing = echarts.init(document.getElementById('standing'));
var education = echarts.init(document.getElementById('education'));

//branch.html  珠海党部
$(".information").click(function(){
    $(".brancher").removeClass("hide");
    $(".content").addClass("hide");
    $(".list").addClass("yanse").siblings().removeClass("yanse");
});
$(".branch .brancher .statistics").click(function(){
    $(".brancher").addClass("hide");
    $(".content").removeClass("hide");
    gender.resize();
    standing.resize();
    education.resize();
});

//-------------------------------------------支部信息-----------------------------------------
ajax_qcy(
    "get",
    '/api/organizations/branch/detail.json',
    {
        orgId:1
    },
    "组织一级列表",
    function(data){
        if(data.code === 0){
            $(".content-header .organName").text(data.data.name);
            //各个身份数量
            if(data.data.map['100']){
                $(".content-header ul li").eq(3).find("span").text(data.data.map['100']);
            }
            if(data.data.map['30']){
                $(".content-header ul li").eq(2).find("span").text(data.data.map['30']);
            }
            if(data.data.map['20']){
                $(".content-header ul li").eq(1).find("span").text(data.data.map['20']);
            }
            if(data.data.map['10']){
                $(".content-header ul li").eq(0).find("span").text(data.data.map['10']);
            }
            var name = data.data.name;
            //-------------------------------------------组织统计图-----------------------------------------
            ajax_qcy(
                "get",
                '/api/users/analyse.json',
                {
                    orgId:1
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
//-------------------------------------------组织一级列表-----------------------------------------
ajax_qcy(
    "get",
    '/api/organizations/list.json',
    {
        firmId:JSON.parse($.fn.cookie('companyID'))
    },
    "组织一级列表",
    function(data){
        if(data.code === 0){
            var html = "";
            var sum = '';
            $.each(data.data,function(index,val){
                //首个总支部显示在最上面
                if(index === 0){
                    html += '<dt><a href="city.html?id='+ val.id +'"><div class="left"><img src="../../images/grassroots/personal/dang.jpg" alt="#"/></div><div class="right"><section>'+ val.name +'</section><p>'+ val.branchCount +'支部</p></div></a></dt>';
                }else{
                    //判断是否有下属组织，如果没有则跳转至成员列表
                    if(val.branchCount){
                        sum = ''+ val.branchCount +'支部';
                        html += '<dd><a href="city.html?id='+ val.id +'"><div class="left"><img src="../../images/grassroots/personal/dang.jpg" alt="#" /></div><div class="right"><section>'+ val.name +'</section><p>'+ sum +'</p></div></a></dd>';
                    }else{
                        if(val.userCount){
                            sum = ''+ val.userCount +'成员';
                            html += '<dd><a href="cityCouncil.html?id='+ val.id +'"><div class="left"><img src="../../images/grassroots/personal/dang.jpg" alt="#" /></div><div class="right"><section>'+ val.name +'</section><p>'+ sum +'</p></div></a></dd>';
                        }else{
                            sum = '0成员';
                            html += '<dd><a href="cityCouncil.html?id='+ val.id +'"><div class="left"><img src="../../images/grassroots/personal/dang.jpg" alt="#" /></div><div class="right"><section>'+ val.name +'</section><p>'+ sum +'</p></div></a></dd>';

                        }
                    }
                }
                $(".back").css({"height":$(document).height()});
            });
            $(".brancher>dl").append(html);
        }
    }
);
