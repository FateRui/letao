$(function () {
    //在这里登陆
    //首先校验表单
    $(".le_middle_content input").on("keydown",function () {
        var user =$("#user").val();
        var password=$("#password").val();
        if (user.length>0&&password.length>0){
            $(".login").prop("disabled",false);
        }
        else {
            $(".login").prop("disabled",true);
        }
    });

    // var url =location.search.replace("?callback=","");
    // console.log(url);
    $(".login").on("click",function () {
        var para=$(".le_middle_content form").serialize();
        // para =serializeFromToObject(para);
        $.ajax({url:"/user/login",data:para,type:"POST",dataType:"json",success:function (res) {
            //如果成功，则判断是否有地址传过来，如果有跳回，没有，则去个人中心
          if (res.success==true) {
              var url =location.search.replace("?callback=","");
              location.href=url?url:"user.html";
          }else {
              mui.toast(res.message);
          }
        },error:function () {

        }});

    });


    function serializeFromToObject(str) {
        if (!str) return{};
        var dicList =str.split("&");
        var list =new Array();
        dicList.forEach(function (dict) {
            var item=dict.split("=");
            list[item[0]]=item[1];
        });
        return list;
        }
});