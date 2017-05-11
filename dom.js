/**
 * Created by zero on 2017/4/22.
 */
$(document).ready(function(){
       //为更多添加点击事件
       $("#more").click(function () {
          $(".search-list").slideUp();
           //显示dropdowm表
           $(".dropdowm-memu").slideToggle();
           //阻止事件冒泡
           return false;
       });
       $(document).click(function () {
           //点击除dropdowm表的地方隐藏dropdowm表
           $(".dropdowm-memu").slideUp();
       });

    $(".search").click(function () {
        $(".dropdowm-memu").slideUp();
        //显示dropdowm表
        $(".search-list").slideToggle();
        //阻止事件冒泡
        return false;
    });
    $(document).click(function () {
        //点击除dropdowm表的地方隐藏dropdowm表
        $(".search-list").slideUp();
    });
    //轮播图
    $('#demo1').slideBox();
    //展开
    $("#open").click(function () {
       $('#div1').toggleClass("default");
       $('#div1').toggleClass("open");
       if( $(this).html() == "展开" )
       {
           $(this).html("收起");
       }
       else
       {
           $(this).html("展开");
       }
    })
    //关注
    $('#guanzhu').click(function () {
        if( $(this).css("color")=="rgb(194, 194, 194)" )
        {
            $(this).css("color",'rgb(255,0,0)');
            $(this).attr("title","取消喜欢");
        }
        else {
            $(this).css("color", 'rgb(194,194,194)');
            $(this).attr("title", "喜欢");
        }
    });

    //图片点击放大
    $('.advertise img').each(function(index, el) { 
           $(this).click(function(event) {
               /* Act on the event */
               // alert($(this).attr('src'));
               $('.mask').css('display', 'block');
               $('.imgpanel>img').attr('src', $(this).attr('src'));
               /**阻止冒泡**/
               return false;
           });
    });
    ///判断点击图片时不退出
    var judge = 0;
    $('.imgpanel img').click(function(event) {
        /* Act on the event */
        judge = 1;
        ///阻止事件冒泡
        return false;
    });
    //点击图片外的部分退出
    $('.mask').click(function(event) {
        /* Act on the event */
        judge = 0;
        if(judge == 0)
            $('.mask').css('display', 'none');
    });
   
});

//图片上传预览    IE是用了滤镜。
function previewImage(file)
{
    var MAXWIDTH  = 90;
    var MAXHEIGHT = 90;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead onclick=$("#previewImg").click()>';
        var img = document.getElementById('imghead');
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight ){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight ){
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else{
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
