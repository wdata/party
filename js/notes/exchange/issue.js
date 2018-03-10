function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
function InsertImage(_this){
    var filepath =getObjectURL(_this.files[0]);
    $(".headline .video").html("<video  poster='../../images/notes/ff.png' style='width:100%' src="+filepath+"></video>");
    $(".headline .video").removeClass("hide");
    $(".img_con").addClass("hide");
    $(".headline>span").addClass("hide");
}
$("video").click(function(){
    $("video").pause();
});


function submit(){

}