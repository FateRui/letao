mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0006,
    bounce: true,
    indicators: false
});

getData("/category/queryTopCategory",null,function (data) {
    //1级分类渲染
     $(".menu_left").html(template("menu-artemplate",{data:data["rows"]}));
     //二级分类渲染
        var dataId =$(".menu_left a").first().attr("data-id");
        getData("/category/querySecondCategory",{id:dataId},function (data) {
            $(".menu_right").html(template("item-artemplate",{data: data["rows"]}));
        });
});

//当一级分类被点击,切记动态，添加事件可能不响应方法
$(".menu_left").on("click","a",function () {
    if ($(this).parent().hasClass("now")) {
        return;
    }
    $(this).parent().addClass("now").siblings("li").removeClass("now");
    getData("/category/querySecondCategory",{id:$(this).attr("data-id")},function (data) {
        $(".menu_right").html(template("item-artemplate",{data: data["rows"]}));
    });

});








function getData(url,para,callback) {
    $.ajax({url:url,type:"GET",dataType:"json",data:para,success:function (data) {
            callback&&callback(data);
    }});
}