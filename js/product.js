$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        bounce: true,
        indicators: false
    });

    //首先根据链接，获取到数据
   var paras=LE.getParaFormUrl();

   $.ajax({url:"/product/queryProductDetail",data:{id:paras.id},success:function (res) {

       res =measureData(res);
       window.productData=res;
       $(".le_banner").html(template("banner",{data:res}));
       var gallery = mui('.mui-slider');
       gallery.slider({
           interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
       });
       $(".brandName").html(template("brandTitle",{data:res}));

       $(".brandPrice").html(template("brandPrice",{data:res}));

       $(".brandSize").html(template("brandSize",{data:res}));

       $(".brandNumber").html(template("brandNumber",{data:res}));

   },complete:function () {
       $(".rotateAnimate").remove();
   }});
    // query-product-detail
    function measureData(data){
        if (!data.pic||!data.pic.length){
            data["pic"]=[{"picAddr":"/mobile/images/none.jpg"}];
        }
        var picFirstImage =data["pic"][0]["picAddr"];
        var picLastImage =data["pic"][data.pic.length-1]["picAddr"];
        data["firstImage"]=picLastImage;
        data["lastImage"]=picFirstImage;

        //处理size 问题
        var min =data["size"].split("-")[0];
        var max =data["size"].split("-")[1];
        var sizeArr=Array();
        for (var i=min;i<=max;i++){
            sizeArr.push(i);
        }
        data["size"]=sizeArr;
        return data;
    }
    $(".brandSize").on("click","span",function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

   $(".brandNumber").on("click",".jia",function () {
        add(1);
   });
    $(".brandNumber").on("click",".jian",function () {
        add(-1);
    });
    function add(order) {
        var num=parseInt($(".count").val());
        num+= order>0?1:-1;
        num= num<0?0:num;
        num= num>parseInt(window.productData["num"])?parseInt(window.productData["num"]):num;
        $(".remain").html(parseInt(window.productData["num"])-num);
        $(".count").val(num);
    }

    $(".footer").on("click",".addShopCar",function () {
        var productSize =$(".brandSize .active");
        if (productSize.length==0){
            mui.toast("请选择尺码");
            return;
        }
        productSize=productSize.val();
        var count =parseInt($(".brandNumber .count").val());
        if (count<=0){
            mui.toast("请选择数量");
            return;
        }

        // console.log("size"+productSize,"count"+count,"id"+paras.id);
        LE.loginAjax("/cart/addCart","post",{productId:parseInt(paras.id),num:count,size:productSize},location.href,function (res) {
            if (res.success==true){
                mui.confirm("添加购物车成功,是否跳转到购物车", "恭喜",["是","否"], function (e) {
                   if (e.index==0) {
                       //跳转到购物车
                        location.href="shopCar.html";
                   }
                } ,"div");
            }
        });

    });


});