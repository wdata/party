//var server_url="http://192.168.1.42:8800";测试地址
// var serverId = "http://120.132.17.118:8888";
var serverId = "http://120.132.17.140:8888";
var server_url = serverId + "/party-server-core";       //本地测试
var server_url_img = serverId + '/party-server-image';        //图片端口
var server_url_notices = serverId + '/party-server-notice';      //公告端口
var unite_img_url = serverId + '/file-server/api/images/';       //图片同一地址
var user_id = JSON.parse(sessionStorage.getItem("user"));//获取用户信息;
console.log(user_id);
var not_defined = "未定义";    //当请求到的数据没有jobs时，显示未定义


var companyID = sessionStorage.getItem("companyID");

// 跳转回小信
$(".jumpDMB").click(function(){

    window.android.callAndroid();    //安卓android

});




//将时间戳转化为格式时间
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "." + (this.getMonth() + 1) + "." + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds(); };


//生成一个32位的uuid
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
}
//var uuid32 = uuid(32,16);   //32位数，16进制

//-------------------------------ajax-------------------------------
function ajax_qcy(type,port,data,error_message,callback){
    $.ajax({
        type: type,
        url: server_url + port,
        data: data,
        dataType: 'json',
        success:callback,
        error: function (res) {
            console.log(res.status);
        }
    });
}

//------------------------------获取网址ID，key是参数名-------------------------------
var urlParams = function (key) {
  var ret = location.search.match(new RegExp('(\\?|&)' + key + '=(.*?)(&|$)'))
  return ret && decodeURIComponent(ret[2])
};


//输入时间戳，获取最近分钟，最近天，最近年月
function many(data){
    var time = (new Date().getTime()) - data;
    console.log(time);
    var abc,def;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var year = day * 365;
    if(time > year){
        //当时间大于365天，显示多少年前
        abc = new Date(time).getFullYear();
        def = abc+"年前";
    }else if(time >= month && time < year){
        //当时间大于30天，显示多少个月前
        abc = (new Date(time).getMonth()) + 1;
        def = abc+"月前";
    }else if( time >= hour && time < month){
        //当时间大于24小时，显示天数
        abc = (new Date(time).getUTCDate())-1;
        def = abc+"天前";
    }else if(time >= minute && time < hour){
        //当时间大于60分钟，显示小时数
        abc = new Date(time).getHours();
        def = abc+"小时前";
    }else if(time >= 0 && time < minute){
        //当时间分钟数
        abc = new Date(time).getMinutes();
        def = abc+"分钟前";
    }
    return def;
}

//一级页面底部事件
$(".navigation>a").click(function(){
	$(this).addClass("navColor").siblings().removeClass("navColor");
	$(this).find(".img1").addClass("hide").siblings("img").removeClass("hide");
	$(this).siblings().find(".img2").addClass("hide").siblings("img").removeClass("hide");
});

//点赞之星、创新之星
function like_href(_this,text){
    sessionStorage.setItem("like_star",text);
    $(_this).attr("href",'../ledger_list/ledger.html');
}
//所有台账列表跳转
function ledger_href(_this,text,id){
    sessionStorage.setItem("all_ledger",text);
    sessionStorage.setItem("title_id",id);
    $(_this).attr("href",'../ledger_list/ledger_list.html');
}
//领导表率空间跳转留言板
function change_bg(_this,src,href){
    $(_this).children(".black-img").children("img").attr("src",src);
    setTimeout(function(){
        window.location.href=href;
    },200);
}
//四个指标数组
var branch=['凝聚•支部自觉落实“三会一课”组织生活......','凝聚支部党员干事创业、默默奉献的工作活力','凝聚支部攻坚克难、闯关夺隘、推进党的......','凝聚支部打造党建品牌、挖掘工作亮点、塑......'];
var ground=['坚持党的领导，落实党的理论和路线方针政策','坚持全面从严治党，落实三个六对照法则','坚持民主集中制，确保党的活力与团结','发挥领导核心作用，推进党业融合'];
var member=['带头践行党员宗旨，主动担当，争创佳绩','带头学习提高，坚定理想信念，严肃参加组......','带头服务群众，服务社会，弘扬正气','带头遵纪守法，坚守廉洁自律'];
var leader=['模范执行党的路线方针政策和上级各项决议','模范践行“两学一做”要求，做“四讲四有”党员','模范遵守党的纪律和规矩，做链接从税表率','模范履行岗位职责，提升工作质效'];
//四个指标和台账列表关联函数
function homepage_ind(_this,arr){
    sessionStorage.setItem("one", arr[0]);
    sessionStorage.setItem("two", arr[1]);
    sessionStorage.setItem("three", arr[2]);
    sessionStorage.setItem("four", arr[3]);
    $(_this).attr("href",'../ledger_list/ledger_list_filtrate.html');
}




/*上传图片预览*/
function imgPreview(_this){
    if(_this.value==='')return false;
    var $file = $(_this);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $(_this).parent().siblings().find('img');

    if(fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src', dataURL);
    } else {
        dataURL = $file.val();
        var imgObj =$img.get(0);
        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
    }
    return true;
}

/*上传图片大小格式验证*/
function imgSizeCheck(_this){
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
            imgPreview(_this);
        }
    }
}

// 返回上一页并刷新
function goBack(){
    if(document.referrer !== "" && document.referrer !== "undefined"){
        location.href = document.referrer;
    }else{
        location.href = history.go(-1);
    }
}