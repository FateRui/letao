$(function () {
    $(".search_history dd").on("click",".close",function () {
        console.log(this);

    });

    $(".search_history dt").on("click",".clearAll",function () {
        console.log(this);
    });
    
    $("#searchCommit").on("click",function () {
        // console.log($(".searchBar .searchInput").val());
        var key =$(".searchBar .searchInput").val().trim();
        if (!key||key.length==0) {
            mui.toast('请输入关键字',{ duration:1000, type:'div' });
            return;
        }
        location.href="searchList.html?key="+key;
    });

});

