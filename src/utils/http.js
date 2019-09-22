!function(window){
    var httpAjax = function (type, method,params,success,error){
        var serverUrl = 'http://172.21.72.8:8889/';
        var options = {
            url : serverUrl + method,
            type : type,
            data : type === 'GET' ?  params : JSON.stringify(params),
            contentType : 'application/json',
            datatype: 'json',
            timout : 1000,
            success: function(data){
                success && success(data); 
            },
            error: function(xhr, type){
                var dialog = window.YDUI.dialog;
                dialog.toast('接口调用失败','error');
                error && error(xhr, type);
            }
        };
        $.ajax(options);
    }

    var httpPost = function(method, params,success,error){
        httpAjax('POST',method, params,success,error);
    }

    var httpGet = function(method, params,success,error){
        httpAjax('GET',method, params,success,error);
    }
    window.httpPost = httpPost;
    window.httpGet = httpGet;
}(window);



