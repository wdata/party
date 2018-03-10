$(".truth_edit footer a").click(function(){
	var truth_content = $(".truth_edit .text").html();
	var truth_title = $(".truth_edit header input").val();
    if($(".text").html()&&$(".title").val()){
        ajax_qcy("post",'/api/article/add.json', {
                userId:user_id.data.id,
                type:4,
                title:truth_title,
                content:truth_content
            },
            "发布评论失败",
            function(data) {
                if(data.code === 0 ){
                    $.dialog({
                        type : 'info',
                        infoText : '提交成功',
                        infoIcon : '../../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                    window.location.href="../help/help.html?hide=0";
                }
            }
        );
    }else{
        $.dialog({
            type : 'info',
            infoText : "请输入标题和内容",
            infoIcon : '../../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
});


var bur = true;  //第一次可以清空
$(".text").focus(function(){
    if(bur){
        $(this).empty();
        bur = false;
    }
});