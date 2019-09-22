$(function(){

  var swiperData = [
    "不让垃圾污染布氏鲸的家",
    "不让人类打扰布氏鲸的生活",
    "垃圾分类，从我做起",
    "不让保护动物成为人类的盘中餐",
    "不非法捕猎海洋濒危生物",
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
        text: 'http://www.baidu.com',
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
        var scale = changeDpr(); //定义任意放大倍数 支持小数

        function changeDpr() {
          if (window.devicePixelRatio && window.devicePixelRatio > 1) {
            console.log(window.devicePixelRatio);
              return window.devicePixelRatio;
          }
          return 1;
        };
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        //放大后再缩小提高清晰度
        canvas.getContext("2d").scale(scale, scale); 
        
        // 设置html2canvas方法的配置
        var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          allowTaint: true, //允许画布上有跨域图片 不建议使用 后面详细补充
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
          scale : window.devicePixelRatio,
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
          var base64ImgSrc = canvas.toDataURL("image/png");
          $('.poster-contanier-img').attr("src",base64ImgSrc);
          $('.poster-contanier-img').css({
            "width": canvas.width / scale + "px",
            "height": canvas.height / scale + "px",
          })
          var dialog = window.YDUI.dialog;
          dialog.notify('长按保存图片',1000);
        });
    },1000);

    // initWxConfig = () =>{
    //   httpPost('act/sign',{'value':window.location.href}).then((data) =>{
    //     wx.config({
    //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       appId: data.appId, // 必填，公众号的唯一标识
    //       timestamp: data.timestamp, // 必填，生成签名的时间戳
    //       nonceStr: data.nonceStr, // 必填，生成签名的随机串
    //       signature: data.signature,// 必填，签名
    //       jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表
    //     });
    //     //分享朋友圈
    //     wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
    //       wx.onMenuShareTimeline({
    //         title: '全民AR寻鲸', // 分享标题
    //         link: 'https://gy.ztesoft.com/ARWhale/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: 'https://gy.ztesoft.com/ARWhale/asset/images/200logo.png', // 分享图标
    //         success: function () {
    //           httpPost('act/increaseOneDrawTimes',{}).then((data) =>{
    //             window.location.href = './index.html?openId='+window.localStorage.openId;
    //           })
    //         }
    //       });
    //     }, false);
    //     wx.error(function(res){
    //       alert('js-sdk初始化失败：'+res);
    //     });
    //   });
    // }
})