// 公共js
var util = (function(win,$) {

    // 获取url参数
    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }

    // 修改url的参数
    var changeUrlArg = function (url, arg, val){
        var pattern = arg+'=([^&]*)';
        var replaceText = arg+'='+val;
        return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
    }

    // 删除url中的某个参数
    var delUrlParam = function (url, name) {
        var str = "";
        if (url.indexOf('?') != -1) {
           str = url.substr(url.indexOf('?') + 1);
        } else{
           return url;
        }
        var arr = "";
        var returnurl = "";
        var setparam = "";
        if (str.indexOf('&') != -1) {
            arr = str.split('&');
            for (i in arr) {
                if (arr[i].split('=')[0] != name) {
                    returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                }
            }
            return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
        } else {
            arr = str.split('=');
            if (arr[0] == name){
                return url.substr(0, url.indexOf('?'));
            } else {
                return url;
            }
        }
    }


    return  {
      getUrlParam: getUrlParam,
      changeUrlArg: changeUrlArg,
      delUrlParam: delUrlParam
    }

})(window,jQuery);
