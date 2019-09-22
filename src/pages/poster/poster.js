$(function(){

  var swiperData = [
    "不让垃圾污染布氏鲸的家",
    "不让人类打扰布氏鲸的生活",
    "垃圾分类，从我做起",
    "不让保护动物成为人类的盘中餐",
  ];
    //取参数
    var obj = router.parse();
    const param = obj.param;
    var index = param.index;
    $(".inner").removeClass().addClass("inner").addClass('poster' + index);
    $(".js-content").text(swiperData[index-1]);
    $(".join-name").text(param.name);
    $(".lmtext_bold").text(param.no);
    
    var qrcode = new QRCode(document.getElementById("qrcodeConIn"), {
        text: 'http://172.16.23.180:8889/sea/index.html#home',
        width: 74,
        height: 74,
        correctLevel : QRCode.CorrectLevel.H
    });
    setTimeout(function(){
        if(!$("#qrcodeConIn img").attr("src")){
            $("#qrcodeConIn img").show();
            $("#qrcodeConIn canvas").hide();
            var canvas = $("#qrcodeConIn canvas")[0];
            var dataURL = canvas.toDataURL("image/png");
            $("#qrcodeConIn img").attr("src",dataURL);
        }
    },0);
    setTimeout(function(){
        var cntElem = $('#poster')[0];
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度

        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = window.devicePixelRatio && window.devicePixelRatio > 1 ? window.devicePixelRatio : 1;
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        //放大后再缩小提高清晰度
        var context = canvas.getContext('2d');
        context.scale(scale, scale); 
        // 设置html2canvas方法的配置
        var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          allowTaint: true, //允许画布上有跨域图片 不建议使用 后面详细补充
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
          scale : scale,
          dpi: window.devicePixelRatio,
          useCORS: true // 【重要】开启跨域配置
        };
        // 开始转化为canvs对象
        html2canvas(shareContent, opts).then(function(canvas) {
  
          var context = canvas.getContext('2d');
          // 【重要】关闭抗锯齿
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;
  
          // 【重要】默认转化的格式为png,也可设置为其他格式
        //   var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
          //转化后放哪 最好放在与 .wrap 父级下
          var base64ImgSrc = canvas.toDataURL("image/png", 1.0);
          $('.poster-contanier-img').attr("src",base64ImgSrc);
          $('.poster-contanier-img').css({
            "width": canvas.width / scale + "px",
            "height": canvas.height / scale + "px",
          })
          var dialog = window.YDUI.dialog;
          dialog.notify('长按保存图片',1000);
        });
    },1000);

    
})