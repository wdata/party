//*********************所有成员*****************************
ajax_qcy(
	"get",
	'/api/users.json', {
		'id':urlParams("id")
	},
	"所有成员_信息请求失败",
	function(data) {
		if(data.code === 0){
            var li = '';
            var sex = '';
            $.each(data.data, function(index, val) {
                switch (val.sex){
                    case 0:sex = 'icon woman';
                        break;
                    case 1:sex = 'icon';
                        break;
                    default:sex = 'icon';
                        break;
                }
                var zhiwei = "";
                if(val.jobs){
                    $.each(val.jobs,function(x,y){
                        zhiwei +=  y.name + " ";
                    });
				}else{
                    zhiwei =  not_defined;
				}
                li += '<li class="first"><a href="../party_member/memberZone.html?id='+ val.id +'"><div class="left"><div class="bg"><img src="'+ unite_img_url +val.photo +'"></div></div><div class="detail"><div class="name">'+ val.name +'&nbsp;<span class="'+ sex +'"></span></div>' +
                    '<div class="position">'+ zhiwei +'&nbsp&nbsp<span>'+ val.organName +'</span></div></div>'+
                    '<div class="right"><span class="comment"><i></i>'+ val.ledgers +'</span></div></a></li>'
            });
            $(".all_members .friend_list").append(li);
		}
	}
);