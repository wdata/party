/**
 * Created by Administrator on 2017/6/30.
 */
/*上传图片大小格式验证*/
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
//添加
function add(){
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

var bur = true;  //第一次可以清空
$("#edit").focus(function(){
    if(bur){
        $(this).empty();
        bur = false;
    }
});