$(function(){
    var swiperData = [
      "不让垃圾污染布氏鲸的家",
      "不让人类打扰布氏鲸的生活",
      "垃圾分类，从我做起",
      "不让保护动物成为人类的盘中餐",
    ];
    var $swiperWrapper = $(".swiper-wrapper");
    
    swiperData.forEach(function(item,index){
      var $item = $('' + 
      '<div class="swiper-slide img-item'+(index+1)+'">'+
        '<div class="img-wrap">'+
            '<h3>我承诺</h3>'+
            '<h3 class="wrapContent">'+item+'</h3>'+
        '</div>'+
      '</div>'
      );
      $swiperWrapper.append($item);
    });

    var _activeIndex = 0;
    const _width = document.body.clientWidth * 0.76;
    console.log(_width);
    var innerSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      followFinger: false,
      loop: true,
      width:_width, 
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChangeTransitionEnd: function(){
          _activeIndex = this.activeIndex;
        },
    },
    });
    var dialog = window.YDUI.dialog;

    $(document).on('click','.gen-poster-btn',function(){
      var $inputWrap = $('#input_name').clone().show();
      setTimeout("$('.input').focus()",500);
      dialog.confirm('',$inputWrap,function($dom){
        var name = $inputWrap.find(".input")[0].value; //姓名
        if(!name){
          dialog.toast('请填写姓名！','error');
          return;
        }
        $dom && $dom.remove();
        var no = 0;
        httpPost('envActivity/add',{userName : name}, function(res){
          var resultObj = res.resultObj;
          var no = resultObj.rankingNum;
          var logId = resultObj.logId;
          //将logId 存储到localStore里面
          var util = window.YDUI.util;
          util.localStorage.set('USER_LOGID', logId);
          util.localStorage.set(logId, _activeIndex); 

          window.location.hash = router.stringify('poster',
          {
            animate:'right',
            name:name,
            no,
            index:_activeIndex
          });
        });
      });
    });
});