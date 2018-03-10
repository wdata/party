$(document).on("click",".like",function(){
    var sum = !$(this).is(".active")?(parseInt($(this).find("span").text()))+1:(parseInt($(this).find("span").text()))-1;
    $(this).find("span").text(sum);
    $(this).toggleClass("active");
});
$(document).on("click",".collect",function(){
    var sum = !$(this).is(".active")?(parseInt($(this).find("span").text()))+1:(parseInt($(this).find("span").text()))-1;
    $(this).find("span").text(sum);
    $(this).toggleClass("active");
});