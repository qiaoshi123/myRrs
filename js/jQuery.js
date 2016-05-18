/**
 * Created by qiaoshi on 2016/4/18.
 */
$(function(){
    function tabChange(){                //选项卡的方法
        $(this).find("li").on("mouseover",function(){
            $(this).children("span").addClass("borderRight").next().addClass("show").parent().siblings().each(function(){
                $(this).children("span").removeClass("borderRight").next().removeClass("show")
            });
        });
        $(this).on("mouseout",function(){
            $(this).children("span").removeClass("borderRight").next().removeClass("show");
        })
    }
    function searchTest(){              //搜索栏表单方法
        var $searchText=$(this).children("div").eq(0).children("input").eq(0).on("focus",function(){
            console.log($(this));
            if ($(this).prop("value") == "视觉设计") {
                $(this).prop("value", "");
                $(this).css("color", "#000");
                $(this).prop("placeholder", "请输入职位名称或公司名称");
            }
        });
        $searchText.on("blur",function(){

            if($(this).prop("value").length==0){
                $(this).prop("value","视觉设计");
                $(this).css("color", "#999");
            }
        })
    }

    function banner(){                     //实现图片延迟加载+ 轮播图
        var $bannerInner=$(this).children().first(),$divList=$bannerInner.children("div");
        var $imgList=$divList.children("img"),$bannerTip=$bannerInner.next(),$em=$bannerTip.children("em");
        var $oLis=$bannerTip.children(".bannerTip_ul").children("li");

        $imgList.each(function(){
            var oImg= new Image;
            var $aaa=$(this);        //注意this的改变。each方法里的this是当前遍历的那一项，也就是每张图片。
            $(oImg).prop("src",$(this).attr("trueImg")).on("load",function(){ //这个绑定事件里的this是当前绑定的这一项，也就是创建的临时的oImg
                $aaa.prop("src",$(this).prop("src")).css("display","block").animate({opacity:1},500);
                oImg=null;
            });
        });
        var step= 0,autoTimer=null;
        autoTimer=window.setInterval(autoMove,3000);
        function autoMove(){
            if(step>=$imgList.length-1){
                step=0;
                $bannerInner.css("top",0)
            }
            step++;
            $bannerInner.stop().animate({top:-step*parseFloat($divList.eq(0).css("height"))},10);
            changeTip();
        }
        function changeTip(){
            var tempStep=step>=$imgList.length-1?0:step;
            $oLis.each(function(){
                var $aaa=$(this);   //this的改变，each方法里的this是当前遍历的一个li。
                if($(this).index()==tempStep){
                    $em.stop().animate({top:$(this).index()*55},300,function(){//回调函数里的this是当前的对象，em
                            $aaa.children("i").removeClass("current");
                            $aaa.siblings().each(function(){//each方法里的this是遍历兄弟节点集合的每一项。
                            $(this).children("i").addClass("current");
                        })
                    })
                }
            })
        }
        $bannerTip.on("mouseover",function(){
            window.clearInterval(autoTimer);
        });

        $bannerTip.on("mouseout",function(){
            autoTimer=window.setInterval(autoMove,3000);
        });

        $oLis.on("mouseover",function(){
            window.clearInterval(autoTimer);
            step=$(this).index();
            $bannerInner.stop().animate({top:-step*parseFloat($divList.eq(0).css("height"))},500);
            changeTip();
        });

    }
    jQuery.fn.extend({
        tabChange: tabChange,
        searchTest:searchTest,
        banner:banner
    });
    $("#main").searchTest();
    $("#mainNav *").tabChange();
    $("#banner").banner();

    var $recommendLi=$(".recommend>li");
    $recommendLi.on("mouseenter",function(e){
        var $height=$(this).innerHeight(),$width=$(this).innerWidth();

        var curY = $height - (e.pageY - $(this).offset().top);
        var curX = e.pageX - $(this).offset().left;
        var $a=$(this).children("a").eq(0);
        if (curY < curX && curY < -curX + $height&&curY>-1) {
            $a.css({
                top:$height,
                left: 0
            });
            $a.stop().animate({top: 0}, 300);
        }
        if (curY < curX && curY > -curX + $height&&curX<=$width) {
            $a.css({
                top: 0,
                left: $width
            });
            $a.stop().animate({left: 0}, 300);
        }
        if (curY > curX && curY < -curX + $height&&curX>-1) {
            $a.css({
                top: 0,
                left: -$width
            });
            $a.stop().animate({left: 0}, 300);
        }
        if (curY > -curX + $height && curY > curX&&curY<=$height) {
            $a.css({
                top: -$height,
                left: 0
            });
            $a.stop().animate({top: 0}, 300);
        }
    }).on("mouseleave",function(e){
        var $height=$(this).innerHeight(),$width=$(this).innerWidth();
        var curY = $height - (e.pageY - $(this).offset().top);
        var curX = e.pageX - $(this).offset().left;
        var $a=$(this).children("a").eq(0);
        if (curY <= 0&&curY < curX && curY < -curX + $height) {
            $a.stop().animate({top: $height}, 300);
        }
        if (curY >= $height&&curY > -curX + $height && curY > curX) {
            $a.stop().animate({top: -$height}, 300);
        }
        if (curX >= $width&&curY < curX && curY > -curX + $height) {
            $a.stop().animate({left: $width}, 300);
        }
        if (curX <= 0&&curY > curX && curY < -curX + $height) {
            $a.stop().animate({left: -$width}, 300);
        }
    });
    //实现选项卡
    var $Lis=$("#Newhot>ul").children("li");
    var $divs=$("#Newhot>div");
    $Lis.on("click",function(){
        $(this).addClass("select").siblings().removeClass("select");
        $divs.eq($(this).index()).addClass("current").siblings().removeClass("current");
    });
    //实现回到顶部
    //var $backTop=$("#backTop");
    //var winHeight=$(document).innerHeight()/2;
    //$backTop.on("click",function(){
    //    $(this).css("display","none");
    //    $(document).off("scroll");
    //    var winTop=$(document).scrollTop();
    //    var step=(winTop/500)*30;
    //    var timer=window.setInterval(function(){
    //        var curTop=$(document).scrollTop();
    //        var cur=curTop+step;
    //        if(cur<=0){
    //            $(document).prop("scrollTop",0);
    //            window.clearInterval(timer);
    //            $(document).on("scroll",winScroll);
    //            return;
    //        }
    //        $(document).prop("scrollTop",cur);
    //    },10)
    //});
    //$(document).on("scroll",winScroll);
    //function winScroll(){
    //    var curTop=$(document).scrollTop();
    //    if(curTop>=winHeight){
    //        $backTop.css("display","block");
    //    }else{
    //        $backTop.css("display","none");
    //    }
    //}
});

//*思路篇*------------------------------------------------------------------**
//$(function(){
//    function tabChange(){
//        var $oLis= $("#mainNav *").find("li");
//        $oLis.on("mouseover",function(){
//            $(this).children("span").addClass("borderRight").next().addClass("show");
//            $(this).siblings().each(function(){
//                $(this).children("span").removeClass("borderRight").next().removeClass("show")
//            })
//        });
//        $oLis.on("mouseout",function(){
//            $(this).children("span").removeClass("borderRight").next().removeClass("show");
//        })
//    }
//    tabChange();

//    function searchTest(){
//    var $searchText=$("#main").children("div").eq(0).children("input").eq(0);
//    $searchText.on("focus",function(){
//        if ($(this).prop("value") == "视觉设计") {
//            $(this).prop("value", "");
//            $(this).css("color", "#000");
//            $(this).prop("placeholder", "请输入职位名称或公司名称");
//        }
//    });
//    $searchText.on("blur",function(){
//        if($(this).prop("value").length==0){
//            $(this).prop("value","视觉设计");
//            $(this).css("color" "#999");
//        }
//    })
//}
//  searchTest();
//});