$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006,
        bounce: true,
        indicators: false
    });

    var paras =LE.getParaFormUrl();

    $(".searchInput").val(paras.key||"");

    window["proName"]=paras.key||"";

    // 首先进入页面，进行第一次加载
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: "#f00",
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    getPullData({
                        page: 1,
                        pagesize: 4,
                        proName: checkSearch()
                    }, false);
                }
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: false,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    window["page"]=parseInt(window["page"])+1;
                    getPullData({
                        page: window["page"],
                        pagesize: 4,
                        proName: checkSearch()
                    }, true);
                }
            }
        }
    });

    function getPullData(paras,append){
        var url ="/product/queryProduct";
        getData(url,paras,function (res) {
            if (res.data.length<=0&&append==true) {
                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                return;
            }
            if (append) {
                $(".le_product").append(template("productItem",{data:res.data}));
                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            }else {
                $(".le_product").html(template("productItem",{data:res.data}));
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            }
            window["page"]=parseInt(res.page);
        },function () {
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            mui.toast('加载失败',{ duration:1000, type:'div' });
            return;
        });
    }

    $(".product_order").on("click","a",function () {
        var target =$(this);
        if (target.hasClass("now")){
            //如果已经选中，改变箭头方向
            if (target.find("span").hasClass("fa-angle-down")){
                target.find("span").removeClass("fa-angle-down").addClass("fa-angle-up");
            }else
            {
                target.find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
            }
        }
        else
        {
            target.addClass("now").siblings().removeClass("now");
            target.find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
            target.siblings().find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }

        var type =target.attr("data-type");
        var order =target.find("span").hasClass("fa-angle-down")?1:2;

        //开始获取数据
        var key=checkSearch();
        if (key){
            var params ={
                proName:key,
                page:1,
                pagesize:4,
            };
            params[type]=order;
            getCommonData(params);
        }
    });


    //这里是用户点击了搜索按钮,将界面数据清空
    $(".searchSubmit").on("click",function () {

        $(".product_order a").removeClass("now").find("span")
            .removeClass("fa-angle-up").addClass("fa-angle-down");
        var key=checkSearch();
        if (key)getCommonData({
            proName:key,
            page:1,
            pagesize:4
        });
    });

    function checkSearch(){
        //首先判断搜索框是否有值
        if (!$(".searchInput").val().trim()) {
            mui.toast('请输入内容',{ duration:1000, type:'div' });
            return;
        }
        return $(".searchInput").val().trim();
    }

    function getCommonData(paras) {
        var url ="/product/queryProduct";
        getData(url,paras,function (res) {
            $(".le_product").html(template("productItem",{data:res.data}));
            window.page=parseInt(res.page);
        },function () {
            mui.toast('加载失败',{ duration:1000, type:'div' });
            return;
        });
    }
    function getData(url,paras,callback1,callback2) {
        $.ajax({url:url,data:paras,dataType: "json",success:callback1,error:callback2});
    }
});