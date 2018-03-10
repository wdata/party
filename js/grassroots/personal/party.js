
//personal.html  个人信息页
$(".remind .determine").click(function(){
	$(".remind").hide();
});


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
        $(".img_con").html('');
        var img = document.createElement("img");
        img.src = getBlobURL(obj.files[0]);
        img.onload = function () {
            this.width = "2.2rem";
            this.style.maxheight = '2.2rem';
            this.style.borderRadius = "50%";
            $(".img_con").append(this);
            revokeBlobURL(this.src);
        }
    }
}

//个人信息编辑
