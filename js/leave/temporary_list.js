
$("#btn").click(function(){
    $(".shade").addClass("hide");
});
$("a.icon").click(function(){
    $(".shade").addClass("hide");
    $(".add_shade").removeClass("hide");
});
$(".add_shade .ensure").click(function(){
    $(this).attr("href","temporary.html");
});
$(".add_shade .cancel").click(function(){
    $(".add_shade").addClass("hide");
});

