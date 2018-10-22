$(function () {

    
    $("#searchCommit").on("click",function () {
        // console.log($(".searchBar .searchInput").val());
        var key =$(".searchBar .searchInput").val().trim();
        if (!key||key.length==0) {
            mui.toast('请输入关键字',{ duration:1000, type:'div' });
            return;
        }
        //在这里保存Cookie
        addHistory(key);
        location.href="searchList.html?key="+key;
    });
    
    //初始化列表
    initHistory(function (res) {
        $(".historyList").html(template("history-artTemplate",{data:res}));
    });
    
    //清空列表
    $(".search_history dd").on("click",".close",function () {
        $(this).parent().remove();
        console.log(window.search_history);
        window.search_history.splice($(this).attr("data-id",1),1);
        console.log(window.search_history);
        Cookies.set("search_history",window.search_history);
    });

    $(".search_history dt").on("click",".clearAll",function () {
        Cookies.remove("search_history");
        $(".historyList").html(template("history-artTemplate",{data:[]}));
    });

    // 首先每次启动该页面，从cookie读取数据
    function initHistory(callback) {
        var his=Cookies.get("search_history");
        if (!his) return;
        window.search_history=JSON.parse(his);
        return callback&&callback(window.search_history);
    }

    function addHistory(item) {
        window.search_history = window.search_history?window.search_history:[];
        if (window.search_history.indexOf(item)!=-1) return;
        window.search_history.push(item);
        Cookies.set("search_history",window.search_history);
    }


});

