/**
 * Created by Administrator on 2017/6/2.
 */
$(document).ready(function(){
    ajax_qcy('get','/api/user/pay/history.json',
        {
            userId:user_id.data.id,
            page:0,
            size:12
        },"",
        function(data){
            if(data.code === 0){
                var cost = "";var div = '';
                //判定是否为整数，是添加.00，（为了更美观）
                if(data.data.payDues%1 === 0){
                    cost = data.data.payDues+".00";
                }else{
                    cost = data.data.payDues;
                }
                $(".top-header span").text(cost + "元");

                $.each(data.data.duess,function(index,val){
                    var time = (new Date(val.payTime)).toLocaleString().split(" ")[0].split(".");
                    div += '<div class="minxidel"><time>'+ val.month +'</time><span class="money">'+ val.money +'元</span></div>';
                });
                $(".words").append(div);
            }else{
                console.log("No data found");
            }
        })
});