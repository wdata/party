function imgSizeCheckThought(_this){
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
            contentHtml : '<p>附件不能大于2M！</p>'
        });
        _this.value==' ';
        $(_this).attr('src','');
        return false;
    }else{
        if(postfix!='jpg' && postfix!='jpeg'&& postfix!='png'&& postfix!='bmp'){
            $.dialog({
                type : 'info',
                infoText : "请选择jpg，jpeg，png，bmp的格式文件上传！",
                infoIcon : '../../plugin/dialog/images/fail.png',
                autoClose : 1500
            });
            _this.value==' ';
            $(_this).attr('src',' ');
            return false;
        }else{
            $.dialog({
                type : 'info',
                infoText : '图片添加成功',
                infoIcon : '../plugin/dialog/images/success.png',
                autoClose : 1500
            });
        }
    }
}
$(".submitButton").click(function(){
    //判断为思想汇报函数入党申请，入党申请是添加，还是修改
    $("#edit_Id").val(urlParams("words"));
    switch (parseInt(urlParams("edit"))){
        case 1:
            edit();
            break;
        case 2:
//           入党申请书添加
            add();
            break;
        default:
        break;
    }
});
//修改时有原文
if(parseInt(urlParams("edit")) === 1 || parseInt(urlParams("edit")) === 3){
    original();
}
//-----------------------------------------------入党申请书和思想汇报---------------------------------------------------------------
function  original(){
    ajax_qcy(
        "get",
        '/api/article/'+ urlParams("words") +'.json',
        {},
        "",
        function(data){
            $("#edit").empty();    //清空
            if(data.code === 0){
                var p = '';
                $.each(data.data.content.split("\r\n"), function(index,val) {   //内容,服务器中以\r\n区分换行
                    p += '<p>'+ val +'</p>';
                });
                $("#edit").append(p);
                $(".article_container input").val(data.data.title);
            }
        }
    );
}
//修改
function edit(){
    var title = $("#title").val();
    var content = $("#edit").html();
    $("#userId").val(urlParams("userId"));
    $("#content").val(content);
    var form = new FormData($("#newForm")[0]);       //需要是JS对象
    if(title&&content){
        $.ajax({
            type: "post",
            url:server_url + '/api/article/add.json',
            data:form,
            dataType: 'json',
            contentType: false,
            processData: false,
            success:function(data){
                if(data.code === 0){
                    $.dialog({
                        type : 'info',
                        infoText : '提交成功',
                        infoIcon : '../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                }
            },
            error:function(){
                $.dialog({
                    type : 'info',
                    infoText : '报错',
                    infoIcon : '../plugin/dialog/images/fail.png',
                    autoClose : 1500
                });
            }
        });
    }else{
        $.dialog({
            type : 'info',
            infoText : '请输入内容和标题',
            infoIcon : '../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
}
//添加
function add(){
    var title = $("#title").val();
    var content = $("#edit").html();
    $("#userId").val(urlParams("id"));
    $("#content").val(content);
    var form = new FormData($("#newForm")[0]);       //需要是JS对象
    if(title&&content){
        $.ajax({
            type: "post",
            url:server_url + '/api/article/add.json',
            data:form,
            dataType: 'json',
            contentType: false,
            processData: false,
            success:function(data){
                if(data.code === 0){
                    $.dialog({
                        type : 'info',
                        infoText : '提交成功',
                        infoIcon : '../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                }
            },
            error:function(){
                $.dialog({
                    type : 'info',
                    infoText : '报错',
                    infoIcon : '../plugin/dialog/images/fail.png',
                    autoClose : 1500
                });
            }
        });
    }else{
        $.dialog({
            type : 'info',
            infoText : '请输入内容和标题',
            infoIcon : '../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
}