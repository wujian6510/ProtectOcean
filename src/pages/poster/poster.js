$(function(){
    var qrcode = new QRCode(document.getElementById("qrcodeConIn"), {
        text: 'http://www.baidu.com',
        width: 74,
        height: 74,
        // colorDark : '#fff',
        // colorLight : "transparent",
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

        console.log(width, height);
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 1; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        //放大后再缩小提高清晰度
        canvas.getContext("2d").scale(scale, scale); 
        
        // 设置html2canvas方法的配置
        var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          // allowTaint: true, //允许画布上有跨域图片 不建议使用 后面详细补充
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
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
          console.log(canvas);
          var base64ImgSrc = canvas.toDataURL("image/png");
          $('body').replaceWith("<img src='"+base64ImgSrc+"'>");
        });
    },1000);
})