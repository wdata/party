/**
 * Created by Administrator on 2017/6/9.
 */
var content = $(".words").html();
// *************************************************添加党性报告**************************************（*****************
function add(){
    var titleVal = $(".title").val();
    $("#content").val($(".words").html());
    var form = new FormData(document.getElementById("added"));
    form.append("userId",user_id.data.id);     //给FormData添加属性
    form.append("type",2);     //给FormData添加属性
    //使用原始ajax书写，主要为添加async: false,cache: false,contentType: false,processData: false, 这四个属性，并删除dataType: 'json',
    if(titleVal.length>=0 && content.length>=0){
        $.ajax({
            type: "post",
            url: server_url + '/api/article/add.json',
            data: form,
            contentType: false,
            processData: false,
            success:function(data){
                if(data.code === 0){
                    $.dialog({
                        type : 'info',
                        infoText : '添加成功',
                        infoIcon : '../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                    window.location.href="party_spirit.html";
                }
            },
            error: function (res) {
                console.log(res.status);
            }
        });
    }else{

        $.dialog({
            type : 'info',
            infoText : '请添加标题和内容',
            infoIcon : '../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
}