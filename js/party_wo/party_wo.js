/**
 * Created by Administrator on 2017/6/8.
 */

// ----------------------------------------个人信息--------------------------------------------------------
ajax_qcy('get','/api/user/base.json',
    {
        id:user_id.data.id
    },"",
    function(data){
        if(data.code === 0){
            //头像
            $(".personal .logo").attr("src",unite_img_url + data.data.photo);
            //名字
            $(".personal .name h2").text(data.data.name);

            //最高职位名
            var jobs = data.data.jobs?data.data.jobs[0].name:not_defined;
            $(".personal .name p").text(jobs);

            $(".personal-a").attr("href",'../party_member/memberZone.html?id=' + data.data.id);

        }else{
            console.log("No data found");
        }
    }
);