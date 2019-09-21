const httpAjax = (url, methid,params,success,fail) => {
    console.log('aaa');
    // return new Promise((resolve, reject) => $.ajax({
    //     url: url,
    //     type: methord,
    //     contentType:"application/json",
    //     datatype:"json",
    //     data: data,
    // }).then((res) => {
    //     return resolve(res);
    // }).catch((err, a, b) => {
    //     return reject(err);
    // }),
    const options = {};
    options.url = url;
    options.type = methid;
    options.data = params;
    options.contentType = 'application/json';
    options.datatype = 'json';
    options.async = false;
    options.timout = 1;
    options.cache = false;
    return $.ajax(options);
    // .done(function(data) {
    //    // 这里按你的需求处理 data
    //     return data;
    // }).fail(function(err) {
    //     return err
    // });
}


