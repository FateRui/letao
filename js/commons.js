var LE=function () {};

//这个是用来获取url参数的方法
LE.getParaFormUrl=function() {
    var para=location.search;
    // var para ="?key=1&value=2&page=2"
    var search ={};
    if (para){
        para= para.replace("?","");
        var paraList =para.split("&");
        for (let i = 0; i <paraList.length; i++) {
            var key=paraList[i].split("=")[0];
            var value=paraList[i].split("=")[1];
            search[key]=value;
        }
    }
    return search;
}

