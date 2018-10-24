mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0006,
    bounce: true,
    indicators: false
});

//在这里使用登陆
LE.loginAjax("/user/queryUserMessage","get",{},"",function (res) {
    $(".personal").html(template("content",{data:res}));
});

$(".logout").on("tap",function () {
    $.ajax({url:"/user/logout",success:function (res) {
        if (res.success==true){
            location.href="index.html";
        }
    }})
});