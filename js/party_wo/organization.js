/**
 * Created by Administrator on 2017/6/8.
 */
//*****************************************************历史活动*********************************************************
ajax_qcy(
    "get",
    '/api/user/organization/users.json',
    {
        userId:user_id.data.id
    },
    "",
    function(data){
        var secretary = $(".secretary article");   //书记
        var vice = $(".vice article");   // 副书记
        var member = $(".all-member article");  // 党组委员
        $(".member article").empty();  //清空
        if(data.code === 0){
            $.each(data.data,function(index,val){
                var html = '';
                html = '<a href="../party_member/memberZone.html?id='+ val.id +'"><img class="avatar" src="'+ unite_img_url + val.photo +'" alt="avatar"><span class="member-name">'+ val.name +'</span></a>';
                //判断是否有职位
                if(val.jobs){
                    var sum = true;
                    $.each(val.jobs,function(x,y){
                        switch(y.id){
                            case 1:secretary.append(html);sum = false;secretary.parent().removeClass("hide");   //如果有书记，则sum=false，不能在添加到党组委员中
                                break;
                            case 2:vice.append(html);sum = false;vice.parent().removeClass("hide");   //如果有副书记，一样不能添加到党组委员中
                                break;
                            default:  //如果写在这里，则会出现有双职业的人也添加进入，如果职位多了，就会添加多个
                                break;
                        }
                    });
                    //没有书记，没有副书记，添加到党组委员中
                    if(sum){
                        member.append(html);
                        member.parent().removeClass("hide");
                    }
                }else{
                    // member.append(html);  //没有职位不添加
                }
            });

        }
    }
);

ajax_qcy(
    "get",
    '/api/party/base.json', {
        'id':user_id.data.organId
    },
    "党组书记_信息请求失败",
    function(data) {
        $(".space").attr("href","../party_member/memberZone.html?id="+data.data.id);   //跳转个人空间
        $(".logo").attr("src",unite_img_url+data.data.photo);    //个人头像
        $(".name").text(data.data.name);   //个人姓名
//职位，有多个;
        var li = "";
        if(data.data.jobs){
            $.each(data.data.jobs,function(index,val){
                li += val.name + ' ';
            });
        }else{
            li = '未定义';
        }
        $(".position").text(li);
        var item = $(".ranking li");
        item.eq(0).find("span").text(data.data.score);   //积分
        item.eq(1).find("span").text(data.data.ranking);   //积分排名
        item.eq(2).find("span").text(data.data.ledgers);  //累计台账
    }
);