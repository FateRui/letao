$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function () {
                    getData(function (res) {
                        window.data=res;
                        $(".productList").html(template("item",{data:res.data}));
                        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    });
                }
            }
        }
    });
    // LE.loginAjax("");
    //1 初始化页面
    //2、点击编辑，重新选择尺码，数量
    $(".productList").on("tap",".edit",function () {

    });
    $(".productList").on("tap",".delete",function () {

    });
    //3、侧滑，点击删除，弹出确认
    //4、点击刷新，刷新购物车
    $(".topBar_right").on("click",function () {
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
    });
    //5、点击购物车，计算总金额

    function getData(callback) {
        LE.loginAjax("/cart/queryCartPaging","get",{page:1,pagesize:100},location.href,function (res) {
            callback(res);
        });
    }

    $(".productList").on("change",'[type=checkbox]',function () {
        calculate();
    });
    
    function calculate() {
        //首先获取所有的选中的数据
        var selectedCheckBox =$(".productList .check:checked");
        //获取所有选中商品的id
        var totle=0;
         selectedCheckBox.each(function (index,ele) {
           var id =parseInt($(ele).attr("data-id"));
           var data=window.data.data[id];
           var num= data["num"];
           var price = data["price"];
           totle+=num*price;
        });
        //然后赋值
        totle =Math.floor(totle*100)/100;
        $(".sum .totle").text(totle);
    }
    // $(".brandSize").on("click","span",function () {
    //     $(this).addClass("active").siblings().removeClass("active");
    // });
    //
    // $(".brandNumber").on("click",".jia",function () {
    //     add(1);
    // });
    // $(".brandNumber").on("click",".jian",function () {
    //     add(-1);
    // });
    // function add(order) {
    //     var num=parseInt($(".count").val());
    //     num+= order>0?1:-1;
    //     num= num<0?0:num;
    //     num= num>parseInt(window.productData["num"])?parseInt(window.productData["num"]):num;
    //     $(".remain").html(parseInt(window.productData["num"])-num);
    //     $(".count").val(num);
    // }


});
