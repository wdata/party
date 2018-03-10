function help(_this){
    var fileSize = 0;
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var name=_this.value;
    var postfix=name.substring(name.lastIndexOf(".") + 1).toLowerCase();
    if(isIE && !_this.files) {
        var filePath = _this.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = _this.files[0].size;
    }
    var size = fileSize / 1024;
    if(size > 2000) {
        $.dialog({
            contentHtml : '<p>图片不能大于2M！</p>'
        });
        _this.value==' ';
        $(_this).attr('src','');
        return false;
    }else{
        if(postfix!='jpg' && postfix!='jpeg'&& postfix!='png'&& postfix!='bmp'){
            $.dialog({
                type : 'info',
                infoText : "请选择JPG、jpeg、png、bmp格式图片",
                infoIcon : '../../plugin/dialog/images/fail.png',
                autoClose : 1500
            });
            _this.value==' ';
            $(_this).attr('src',' ');
            return false;
        }else{

        }
    }
}

// *************************************************我的困难**************************************（*****************
function add(){
    $("#text").find("img").remove();
    $("#content").val($("#text").html());
    var form = new FormData(document.getElementById("added"));
    form.append("userId",user_id.data.id);     //给FormData添加属性
    form.append("type",5);                        //给FormData添加属性
    //使用原始ajax书写，主要为添加async: false,cache: false,contentType: false,processData: false, 这四个属性，并删除dataType: 'json',
    if($(".title").val()&&$("#img_file").val()&&$("#text").html()){
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
                        infoText : '提交成功',
                        infoIcon : '../../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                    window.location.href="help.html?hide=1";
                }
            },
            error: function (res) {
                console.log(res.status);
            }
        });
    }else{
        $.dialog({
            type : 'info',
            infoText : "请输入标题、内容和图片",
            infoIcon : '../../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
}

var bur = true;  //第一次可以清空
$("#text").focus(function(){
    if(bur){
        $(this).empty();
        bur = false;
    }
});