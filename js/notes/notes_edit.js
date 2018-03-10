//------------------顶部时间--------------------
var date = new Date;
var time = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日&nbsp;&nbsp;"+date.getHours()+":"+date.getMinutes();
$(".page .time").html(time);

var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) || (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) || window.createObjectURL;
var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) || window.revokeObjectURL;

function imgChange(obj) {
    var filepath = $(obj).val();
    var extStart = filepath.lastIndexOf('.');
    var ext = filepath.substring(extStart, filepath.length).toUpperCase();
    if (ext != '.BMP' && ext != '.PNG' && ext != '.GIF' && ext != '.JPG' && ext != '.JPEG') {
        //alert('图片限于png,gif,jpeg,jpg格式');
        $("#alert").show('normal','linear');
        $("#alert .modal_body p").html('图片限于png,gif,jpeg,jpg格式!');
        $(obj).val('');
    }else if (obj.files[0].type.indexOf('image/') >= 0) {
        var img = document.createElement("img");
        img.src = getBlobURL(obj.files[0]);
        img.onload = function () {
            this.style.width = "100%";
            this.style.display = "block";
            this.style.margin = "0.1rem 0";
            $(".text").append(this);
            revokeBlobURL(this.src);
        }
    }
}