$(".experience textarea").on("input propertychange",function(){
    $(".experience>div>span").text($(this).val().length);
});

