/**
 * Created by Administrator on 2017/6/2.
 */
$(document).ready(function(){
    ajax_qcy('get','/api/dues/unpay.json',
        {
            userId:user_id.data.id
        },"",
        function(data){
            if(data.code === 0){
                var cost = "";
                //判定是否为整数，是添加.00，（为了更美观）
                if(data.data.unPayDues%1 === 0){
                    cost = data.data.unPayDues+".00";
                }else{
                    cost = data.data.unPayDues;
                }
                $(".red>.details-cost").text(cost);
            }else{
                console.log("No data found");
            }
        });


    ajax_qcy('get','/api/user/unpay/details.json',
        {
            userId:user_id.data.id
        },"",
        function(data){
            if(data.code === 0){
                var cost = "";var div = '';
                $.each(data.data.duess,function(index,val){
                    var details = '';
                    //判定是否为整数，是添加.00，（为了更美观）
                    if(val.money%1 === 0){
                        details = val.money + ".00";
                    }else{
                        details = val.money;
                    }
                    var time = val.month.split("-");
                    div += '<div class="minxidel"><time>'+ time[0] + "年"+ time[1]+ "月"  +'</time><span>应缴纳党费：<span class="details-cost">'+ details +'元</span></span></div>';
                });
                $(".minxi .words").append(div);
            }else{
                $(".minxi .words").append('<div style="line-height:1.2rem;text-align:center">暂无数据</div>');
            }
        })
});