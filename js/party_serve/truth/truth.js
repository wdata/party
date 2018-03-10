

//--------------------------------------------文章列表--------------------------------------------------------
// ajax_qcy(
// 	"get",
// 	'/api/article/mind.json', {
// 		'userId':user_id.data.id,
//         firmId:companyID,
// 		page:0,
// 		size:10
// 	},
// 	" ",
// 	function(data) {
// 		if(data.code === 0){
//             var li = " ";
//             var hide,clicked;
//             $.each(data.data.items,function(index,val){
//                 //时间
//                 var add = new Date(val.createTime);
//                 var sum = add.toLocaleString().split(" ")[0];
//                 //是否点赞
//                 var like = val.isUpvote?"like active":"like";
//                 var user = val.user.jobs?val.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
//                 li += '<li data-age="'+ val.id +'"><div class="logo"><img src="'+ unite_img_url+val.user.photo +'" alt="logo" /></div><div class="words">'+
//                     '<a href="../truth/truth_all.html?id='+ val.id +'"><header><span class="position">'+ user +'</span><span class="name">'+ val.user.name +'</span></header><p>'+ val.title +'</p>'+
//                     '<footer><div class="time">'+ sum +'</div><div class="'+ like +'"><img class="ledger" src="../../images/ledger_list/default_like.png"/><img class="clicked" src="../../images/ledger_list/like.png"/>点赞(<span>'+ val.upvotes +'</span>)</div><div class="comment"><img src="../../images/party_serve/comment.png"/>评论(<span>'+ val.comments +'</span>)</div></footer></a></div></li>'
//             });
//             $(".truth ul").append(li);
// 		}
// 	}
// );