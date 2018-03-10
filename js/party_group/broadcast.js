$("#broadcast").click(function(){
	var li =  '<li><div class="head"><img src="../images/party_group/hou.png" alt=""><p>李浩然</p></div>'+
            '<div class="text">'+ $("textarea[name=broadcast]").val() +'</div></li>';
    $(".broad_list").append(li);
});
