//	频道首页：
//	http://192.168.1.239:8600/party-app-core-server/api/labels?clientId=party-app-core-server&taskuuid=fgb3t34gb1143534
//-------------------------------------------频道首页-----------------------------------------
//频道顶部标签
ajax_qcy(
		"get",
		'/api/tags.json',
	{
        size:6,
        page:0
	},
		"首页频道标签请求失败",
	function(data){
		if(data.code === 0){
			var li = "";
			$.each(data.data.items,function(index,val){
				li += '<li><a href="../ledger_list/ledger_list.html?id='+ val.id +'&name='+ val.name +'">'+ val.name +'</a></li>';
			});
			$(".label ul").append(li);
		}
	}
);

//------------------------------------------频道列表--------------------------------
ajax_qcy(
    "get",
    '/api/menus.json',
    {
        position:2,
		size:4,
		page:0
    },
    "",
    function(data){
    	if(data.code === 0){
            var li = "";
            $.each(data.data.items,function(index,val){
                li += '<li><a href="'+ val.url +'"><img src="'+ unite_img_url+val.icon +'" alt="'+ val.name +'" />'+ val.name +'</a></li>';
            });
            $(".party-channel ul").append(li);
		}
    }
);