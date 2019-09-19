$(function(){
    //定制海洋环保宣言
    $(document).on('click','.join-right-now',function(){
        window.location.hash = router.stringify('choice',{animate:'right'});
    })

})
