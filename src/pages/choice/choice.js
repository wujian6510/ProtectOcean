$(function(){
    var swiperData = [
      "不让垃圾污染布氏鲸的家",
      "不让人类打扰布氏鲸的生活",
      "垃圾分类，从我做起",
      "不让保护动物成为人类的盘中餐",
      "不非法捕猎海洋濒危生物",
    ];
    var $swiperWrapper = $(".swiper-wrapper");
    
    swiperData.forEach(function(item,index){
      var $item = $('' + 
      '<div class="swiper-slide">'+
        '<div class="img-wrap img-item'+(index+1)+'">'+
            '<h3>我承诺</h3>'+
            '<p>'+item+'</p>'+
        '</div>'+
      '</div>'
      );
      $swiperWrapper.append($item);
    });

    var _activeIndex = 0;
    var innerSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      followFinger: false,
      loop: true,
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
    //$(".swiper-slide").width('100%');

    var dialog = window.YDUI.dialog;

    $(document).on('click','.gen-poster-btn',function(){
      var $inputWrap = $('#input_name').clone().show();

      dialog.confirm('',$inputWrap,function($dom){
        const name = $inputWrap.find(".input")[0].value; //姓名
        if(!name){
          dialog.toast('请填写姓名！','error');
          return;
        }
        $dom && $dom.remove();
        window.location.hash = router.stringify('poster',
          {
            animate:'right',
            name:name,
            index:_activeIndex
          });
      });
    });
});