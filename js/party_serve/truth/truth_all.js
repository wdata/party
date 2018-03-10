$(document).ready(function() {
    //文章详情
    $.ajax({
        type: "get",
        url: server_url + '/api/article/' + urlParams("id") + '.json',
        dataType: 'json',
        data: {
            id: urlParams("id")
        },
        success: function (data) {
            if (data.code === 0) {
                $(".truth_all header h4").text(data.data.title);   //标题
                $(".truth_all header .time").text(data.data.createTime);    //时间
                $(".truth_all .words .text").append(data.data.content);
            }
        },
        error: function () {

        }
    });

    //台账评论
    var comment = 0;      //page数
    var dropload = $('.truthComment').dropload({
        scrollArea:window,
        autoLoad:true,
        loadDownFn:function(me){
            $.ajax({
                type: "get",
                url: server_url + '/api/comments.json',
                dataType: 'json',
                data: {
                    id: urlParams("id"),
                    type: 4,      //文章
                    page: comment,
                    size: 5
                },
                success:function (data){
                    if (data.code === 0){
                        var html = '';
                        var self = $(".truthComment .list ul");
                        $(".count").text(data.data.count);   //评论数
                        $.each(data.data.items, function (index,val) {
                            var user = val.user.jobs ? val.user.jobs[0].name : not_defined;             //有职位时，显示第一个，没有时显示未定义
                            html += '<li><div class="logo"><img src="' + unite_img_url + val.user.photo + '" alt="logo"/></div>' +
                                '<article><header><span class="name">' + val.user.name + '</span><span class="position">' + user + '</span><time><span>' + val.createTime + '</span></time></header>' +
                                '<p>' + val.content + '</p></article></li>';
                        });
                        self.append(html);
                        comment++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++
                    } else {
                        me.lock();  //智能锁定，锁定上一次加载的方向
                        me.noData();      //无数据
                    }
                    me.resetload();    //数据加载玩重置
                },
                error: function () {
                    me.noData();      //无数据
                    me.resetload();    //数据加载玩重置
                }
            });
        }
    });


    $(".truth_all .enter .enter_bt").click(function () {
        var send_text = $(".enter input[type='text']").val();
        if(send_text){
            ajax_qcy("post", '/api/comment/add.json', {
                    userId: user_id.data.id,
                    resourceId: urlParams("id"),
                    resourceType: 4,
                    content: send_text
                },
                "发布评论失败",
                function (data) {
                    if (data.code === 0) {
                        $.dialog({
                            type: 'info',
                            infoText: '操作成功',
                            infoIcon: '../../plugin/dialog/images/success.png',
                            autoClose: 1500
                        });
                        $(".enter").hide();

                        comment = 1;
                        dropload.noData(false);
                        dropload.unlock();

                        $.ajax({
                            type: "get",
                            url: server_url + '/api/comments.json',
                            dataType: 'json',
                            data: {
                                id: urlParams("id"),
                                type: 4,      //文章
                                page: 0,
                                size: 5
                            },
                            success: function (data) {
                                if (data.code === 0) {
                                    var html = '';
                                    var self = $(".truth_all .list ul");
                                    self.empty();
                                    //评论
                                    $(".count").text(data.data.count);   //评论数
                                    $.each(data.data.items, function (index, val) {
                                        var user = val.user.jobs ? val.user.jobs[0].name : not_defined;             //有职位时，显示第一个，没有时显示未定义
                                        html += '<li><div class="logo"><img src="' + unite_img_url + val.user.photo + '" alt="logo"/></div>' +
                                            '<article><header><span class="name">' + val.user.name + '</span><span class="position">' + user + '</span><time><span>' + val.createTime + '</span></time></header>' +
                                            '<p>' + val.content + '</p></article></li>';
                                    });
                                    self.append(html);
                                } else {
                                    dropload.lock();  //智能锁定，锁定上一次加载的方向
                                    dropload.noData();      //无数据
                                }
                                dropload.resetload();    //数据加载玩重置
                            },
                            error: function () {
                                dropload.noData();      //无数据
                                dropload.resetload();    //数据加载玩重置
                            }
                        });
                    }
                }
            )
        }else{
            $.dialog({
                type : 'info',
                infoText : "请输入评论",
                infoIcon : '../../plugin/dialog/images/fail.png',
                autoClose : 1500
            });
        }
    });
});