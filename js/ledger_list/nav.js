$(document).ready(function(){
    ajax_qcy('get','/api/tags.json',{
            size:15,
            page:0
        },"请求党务管理标签失败",
        function(data){
            if(data.code===0){
                var html='',arr=[];
                var name_class='';
                var img = 0;var yan = 0;
                $.each(data.data.items,function(index,item){
                    var keys='';
                    // $.each(item.keys.split("，"),function(index,item){
                    //     keys+='<p>'+item+'</p>';
                    // });
                    name_class=yan==0?'warn':yan==1?'course':yan==2?'learn':yan==3?'duty':yan==4?'life':'life';
                    if(img >= 5){
                        img = 0;
                    }
                    if(yan >= 4){
                        yan = 0;
                    }
                    html+='<a href="../ledger_list/ledger_list.html?id='+ item.id +'&name='+ item.name +'" class="banner '+name_class+'"><div class="bg"><img src="../images/ledger_list/ke'+img+'.png"></div><div class="text"><div class="course"><h1>'+item.name+'</h1>'+keys+'</div></div></a>';
                    img++;yan++;
                });
                $(".content").append(html);
            }else{
                console.log("No data found");
            }
        })
});