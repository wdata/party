var height=document.documentElement.clientHeight;
$(".warn_list").css("height",(height-parseInt($(".warn_list").offset().top)));
var mySwiper = new Swiper('.swiper-container', {
    slidesPerView : 7,
    slidesPerGroup : 7,
    });
$(".header>.mission").click(function(){
    $(".header .active").removeClass("active");
    $(".header>.mission").addClass("active");
    $(".header>.mission>p").addClass("active");
    $(".list>.mission_list").removeClass("hide");
    $(".list>.like_list").addClass("hide");
    $(".list>.comment").addClass("hide");

});
$(".header>.like").click(function(){
    $(".header .active").removeClass("active");
    $(".header>.like").addClass("active");
    $(".header>.like>p").addClass("active");
    $(".header>.like>.icon_bg").addClass("focus");
    console.log($(".list .like_list"));
    $(".list .like_list").removeClass("hide");
    $(".list .mission_list").addClass("hide");
    $(".list .comment").addClass("hide");
});
$(".header>.comment").click(function(){
    $(".header .active").removeClass("active");
    $(".header>.comment").addClass("active");
    $(".header>.comment>p").addClass("active");
    $(".header>.comment>.icon_bg").addClass("focus");
    $(".list>.comment").removeClass("hide");
    $(".list>.mission_list").addClass("hide");
    $(".list>.like_list").addClass("hide");
});





