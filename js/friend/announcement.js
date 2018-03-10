/**
 * Created by Administrator on 2017/6/6.
 */
// http://192.168.1.42:8888/party-app-notice-server/api/notice/2.json
$.ajax({
    type: "get",
    url: server_url_notices + '/api/notice/'+ urlParams("id") +'.json',
    data: {},
    dataType: 'json',
    success:function(data) {
        var self = $(".text");
        self.empty();
        if (data.code === 0) {
            $(".nav").text(data.data.title);
            $(".words time").html(data.data.createTime);
            var p = '';
            $.each(data.data.content.split("\r\n"), function (index, val) {   //内容,服务器中以\r\n区分换行
                p += '<p>' + val + '</p>';
            });
            self.html(p);
            self.append('<img src="' + unite_img_url + data.data.icon + '"/>');
        } else {
            $(".nav").text('暂无内容');
            self.siblings("time").empty();
        }
    }
});