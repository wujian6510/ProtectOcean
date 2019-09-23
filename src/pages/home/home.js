$(function(){

    var util = window.YDUI.util;
    util.localStorage.clear();
    var logId = util.localStorage.get('USER_LOGID');
    if(logId){ //如果存在logid，直接查询结果
        var _activeIndex = util.localStorage.get(logId);
        httpGet('envActivity/get/'+logId,{}, function(res){
            console.log(res);
            var resultObj = res.resultObj;
            var no = resultObj.rankingNum;
            window.location.hash = router.stringify('poster',
            {
              animate:'right',
              name:name,
              no,
              index:_activeIndex
            });
          });
    }

    //定制海洋环保宣言
    $(document).on('click','.join-right-now',function(){
        window.location.hash = router.stringify('choice',{animate:'right'});
    })

})
