/**
 * Created by qiaoshi on 2016/4/18.
 */
~(function(){
    ~function(){  //左侧导航选项卡的方法
    var mainNav=document.getElementById("mainNav");
    var subMenu=utils.firstChild(mainNav);
    var oLis=subMenu.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        ~function(i){
            var curLis=oLis[i];
            var oSpan=utils.firstChild(curLis);
            var oContent=utils.lastChild(curLis);
            curLis.onmouseenter=function(){
             utils.addClass(oSpan,"borderRight");
                utils.addClass(oContent,"show");
                var curSiblings=utils.siblings(curLis);
                for(var k=0;k<curSiblings.length;k++){
                    var sibling=curSiblings[k];
                    var aSpan=utils.firstChild(sibling);
                    var aContent=utils.lastChild(sibling);
                    utils.removeClass(aSpan,"borderRight");
                    utils.removeClass(aContent,"show");
                }
            };
            curLis.onmouseleave=function(){
                var curLis=oLis[i];
                var oSpan=utils.firstChild(curLis);
                var oContent=utils.lastChild(curLis);
                utils.removeClass(oSpan,"borderRight");
                utils.removeClass(oContent,"show");
            }
        }(i);
    }}();
    ~function(){   //搜索栏的表单方法
    var Main=document.getElementById("main");
    var search=utils.firstChild(Main);
    var text=searchText=utils.firstChild(search);
    searchText.onfocus=function(){
        if(this.value=="视觉设计"){
            this.value="";
            this.style.color="#000";
        }
        this.placeholder="请输入职位名称或公司名称"
    };
    searchText.onblur=function(){
        if(this.value.length==0) {
            this.value="视觉设计";
            this.style.color="#999";
        }
    };
    var btn=document.querySelector('[name=btn]');
    var list=document.querySelector('.list');
        text.onkeyup=function(){
            var cur=text.value;
            if(cur.length==0){
                list.style.display='none';
                return;
            }
            list.style.display='block';
            callLaGou(cur);
        };
        text.onclick=function(e){
            var cur=text.value;
            if(cur){
                list.style.display='block';
            }
            e=e||window.event;
            e.stopPropagation();
            e.cancelBubble=true;
        };
        list.onclick=function(e){
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            var val=tar.self;
            var val2=text.value;
            window.open("http://www.lagou.com/jobs/list_"+encodeURIComponent(val)+"?labelWords=sug&fromSearch=true&suginput="+encodeURIComponent(val2),'_blank');
            e.stopPropagation();
            e.cancelBubble=true;
        };
        btn.onclick=function(e){
            var val3=text.value;
            window.open(' http://www.lagou.com/jobs/list_'+encodeURIComponent(val3)+'?labelWords=&fromSearch=true&suginput=')
            e.stopPropagation();
            e.cancelBubble=true;
        };
        document.onclick=function(){
            list.style.display='none';
        };
        function callLaGou(value){
            jsonp("http://suggest.lagou.com/suggestion/mix",{input:value,type:1,num:10},"suggestback",function(data){
                var frg=document.createDocumentFragment();
                if(data.POSITION.length+data.COMPANY.length<1){
                    list.style.borderBottom="1px solid #fff";
                }else{
                    list.style.borderBottom="1px solid #00b38a";
                }
                for(var i=0;i<data.POSITION.length;i++){
                    var li=document.createElement('li');
                    li.innerHTML=data.POSITION[i].cont;
                    li.self=li.innerHTML;
                    var num=data.POSITION[i].hotness;
                    var a= num>450?"大于":"共";
                    num=(num>450?450:num);
                    var str1="<a href='javascript:;'>"+num+"个</a>";
                    var str2="<span class='hotness'>"+a+""+str1+"职位</span>";
                    li.innerHTML+=str2;
                    if(i==data.POSITION.length-1&&data.COMPANY.length>0){
                        li.style.borderBottom="1px dashed #ccc"
                    }
                    frg.appendChild(li);
                }
                if(data.POSITION.length>0){
                    var span=document.createElement('span');
                    span.id="position";
                    span.innerHTML="职位";
                    span.style.height=data.POSITION.length*30+"px";
                    frg.appendChild(span);}

                for(var j=0;j<data.COMPANY.length;j++){
                    var cli=document.createElement('li');
                    cli.innerHTML=data.COMPANY[j].cont;
                    cli.self=cli.innerHTML;
                    var cnum=data.COMPANY[j].hotness;
                    var ca= cnum>450?"大于":"共";
                    cnum=cnum>450?450:cnum;
                    var cstr1="<a href='javascript:;'>"+cnum+"个</a>";
                    var cstr2="<span class='hotness'>"+ca+""+cstr1+"职位</span>";
                    cli.innerHTML+=cstr2;
                    console.log(cli);
                    frg.appendChild(cli);
                }
                if(data.COMPANY.length>0){
                    var cspan=document.createElement('span');
                    cspan.id="conpany";
                    cspan.innerHTML="公司";
                    cspan.style.height=data.COMPANY.length*30+"px";
                    frg.appendChild(cspan);
                }
                list.innerHTML='';
                list.appendChild(frg);
                frg=null;
            });
        }




    }();
    ~function(){  //轮播切换+延迟加载的方法
    var banner=document.getElementById("banner");
    var bannerInner=utils.firstChild(banner);
    var divList=bannerInner.getElementsByTagName("div");
    var imgList=bannerInner.getElementsByTagName("img");
    var bannerTip=utils.next(bannerInner);
    var em=utils.firstChild(bannerTip);
    var ul=utils.next(em);
    var oLis=utils.children(ul);
    window.setTimeout(lazyImg,500);
    function lazyImg(){
        for(var i=0;i<imgList.length;i++){
            ~function(i){
                var curImg=imgList[i];
                var oImg=new  Image;
                var trueImg=curImg.getAttribute("trueImg");
                oImg.src=trueImg;
                oImg.onload=function(){
                    curImg.src=this.src;
                    curImg.style.display="block";
                    zhufengAnimate(curImg,{opacity:1},500);
                    oImg=null;
                }
            }(i)
        }
    }

    var step= 0,autoTimer=null;
    autoTimer=window.setInterval(autoMove,3000);
    function autoMove(){
        if(step>=imgList.length-1){
            step=0;
            utils.css(bannerInner,"top",0);
        }
        step++;
        window.zhufengAnimate(bannerInner,{top:-step*160},500);
        changeTip();
    }
    function changeTip(){
        var tempStep=step>=imgList.length-1?0:step;
        for(var i=0;i<oLis.length;i++){
            var cur=oLis[i];
            cur.index=i;
            if(i==tempStep){
                ~function(i){
                    zhufengAnimate(em,{top:i*55},110, function(){
                        var shadow=utils.firstChild(oLis[i]);
                        utils.removeClass(shadow,"current");
                        var father=shadow.parentNode;
                        var uncleNode=utils.siblings(father);
                        for(var k=0;k<uncleNode.length;k++){
                            var curNode=uncleNode[k];
                            var fir=utils.firstChild(curNode);
                            utils.addClass(fir,"current")
                        }
                    })
                }(i)
            }
        }
    }
    for(var k=0;k<oLis.length;k++){
        var cur=oLis[k];
        cur.index=k;
        cur.onmouseenter=function(){
            window.clearInterval(autoTimer);
            autoTimer=null;
            step=this.index;
            zhufengAnimate(bannerInner,{top:-step*160},500);
            changeTip();
        };
        cur.onmouseleave=function(){
            autoTimer=window.setInterval(autoMove,3000);
        }
    }}();
//轮播下 热推的  动画效果
    ~(function(){
    var recommend=utils.getElementsByClass("recommend",document)[0];
    var recommendLi=utils.children(recommend,"li");
    for(var i=0;i<recommendLi.length;i++){
        var curLi=recommendLi[i];
        curLi.onmouseenter=function(e){
            var height=this.clientHeight,width=this.clientWidth;
            var curY = height - (e.pageY - utils.offset(this).top);
            var curX = e.pageX - utils.offset(this).left;
            var a=utils.children(this,"a")[0];
            if (curY < curX && curY < -curX + height&&curY>-3) {
                utils.css(a, "top",height);
                utils.css(a,"left",0);
                window.zhufengAnimate(a,{top:0},300);
            }
            if (curY < curX && curY > -curX + height&&curX<=width+3) {
                utils.css(a,{
                    top: 0,
                    left: width
                });
                window.zhufengAnimate(a,{left:0},300);

            }
            if (curY > curX && curY < -curX + height&&curX>-3) {
                utils.css(a,{
                    top:0,
                    left:-width
                });
                window.zhufengAnimate(a,{left: 0},300);

            }
            if (curY > -curX + height && curY > curX&&curY<=height+3) {
                utils.css(a,{ top: -height,
                    left: 0});
                window.zhufengAnimate(a,{top: 0},300);
            }
        };

        curLi.onmouseleave=function(e){
            var height=this.clientHeight,width=this.clientWidth;
            var curY = height - (e.pageY - utils.offset(this).top);
            var curX = e.pageX - utils.offset(this).left;
            var a=utils.children(this,"a")[0];
            if (curY <= 0) {
            //&&curY < curX && curY < -curX + height
                window.zhufengAnimate(a,{top: height}, 300);
            }
            if (curY >= height) {
            //&&curY > -curX + height && curY > curX
                window.zhufengAnimate(a,{top: -height}, 300);
            }
            if (curX >= width) {
            //&&curY < curX && curY > -curX + height
                window.zhufengAnimate(a,{left: width}, 300);
            }
            if (curX <= 0) {
            //&&curY > curX && curY < -curX + height
                window.zhufengAnimate(a,{left: -width}, 300);
            }
        }
    }
    })();
    //实现选项卡
    ~(function(){
    var Newhot=document.getElementById("Newhot");
    var Tip=utils.firstChild(Newhot);
    var tabLis=Tip.getElementsByTagName("li");
    var tabDivs=utils.children(Newhot,"div");
    for(var i=0;i<tabLis.length;i++){
        var curLi=tabLis[i];
        curLi.index=i;
        curLi.onclick=function(){
            utils.addClass(this,"select");
            var sibling=utils.siblings(this)[0];
            utils.removeClass(sibling,"select");
            for(var i=0;i<tabDivs.length;i++){
                i==this.index?utils.addClass(tabDivs[i],"current"):utils.removeClass(tabDivs[i],"current");
            }
        }
    }})();

    //实现坠落的弹势性能动画及尾部的延伸效果和窗口改变事件
    ~(function(){
        function process(callBack,context){
            var outer=Array.prototype.slice.call(arguments,2);
            return function(e){
                var inner=Array.prototype.slice.call(arguments,0);
                callBack.apply(context,outer.concat(inner));
            }
        }
        var regsiter=document.getElementById("regsiter");
        $(document).ready(process(drop,regsiter));
        function drop(){
            var feedBack=document.getElementById("feedBack");
            feedBack.style.top=utils.win("clientHeight")-utils.css(feedBack,"height")-75+"px";
            if(this.speed){
                this.speed+=9.8;
            }else{
                this.speed=9.8;
            }
            this.speed*=0.97;
            var _this=this;
            var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
            if(this.offsetTop+this.speed>=maxBottom){
                this.style.top=maxBottom+"px";
                this.speed*=-1;
                this.flag++;
            }else{
                this.style.top=this.offsetTop+this.speed+"px";
                this.flag=0;
            }
            if(this.flag<2){
                this.dropTimer=setTimeout(process(drop,this),30);
            }
            else{
                window.addEventListener("scroll",function(){isBottom.call(_this)},false)
            }
        }
        window.onresize=function(){
            regsiter.style.top=(document.documentElement.clientHeight||document.body.clientHeight)-regsiter.offsetHeight+"px";
        };
        function isBottom(){
            var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
            var backTop=document.getElementById("backTop");
            var feedBack=document.getElementById("feedBack");
            var  val=utils.win("scrollHeight")-utils.win("clientHeight")-70;
            var val2=utils.win("scrollHeight")-utils.css(this,"height")-70;
            var backTopT=val2-utils.css(feedBack,"height")-utils.css(backTop,"height")-10;
            var feedBackT=val2-utils.css(feedBack,"height")-10;
            if(utils.win("scrollTop")>=val){
                utils.css(this,{
                    position:"absolute",
                    top:val2
                });
                utils.css(backTop,{position:"absolute",
                    top:backTopT
                });
                utils.css(feedBack,{position:"absolute",
                    top:feedBackT
                });
            }else{
                utils.css(this,{
                    position:"fixed",
                    top:maxBottom
                });
                utils.css(backTop,{
                    position:"fixed",
                    top:utils.win("clientHeight")-utils.css(backTop,"height")-135+"px"
                });
                utils.css(feedBack,{
                    position:"fixed",
                    top:utils.win("clientHeight")-utils.css(feedBack,"height")-75+"px"

                });
            }

        }
    })();
    //回到顶部
    ~(function(){
        var backTop=document.getElementById("backTop");
        var winHeight=utils.win("clientHeight")/2;
        var feedBack=document.getElementById("feedBack");
        backTop.onclick=function(){
            this.style.display="none";
            document.removeEventListener("scroll",winScroll,false);
            var winTop=utils.win("scrollTop");
            var step=(winTop/500)*30;
            var timer=window.setInterval(function(){
                var curTop=utils.win("scrollTop");
                var cur=curTop-step;
                if(cur<=0){
                    utils.win("scrollTop",0);
                    window.clearInterval(timer);
                    document.addEventListener("scroll",winScroll,false);
                    return;
                }
                utils.win("scrollTop",cur);
            },10)
        };
        document.addEventListener("scroll",winScroll,false);
        //window.onscroll= winScroll;
        function winScroll(){
            var curTop=utils.win("scrollTop");
            if(curTop>=winHeight){
                backTop.style.display="block";
                backTop.style.top=utils.win("clientHeight")-utils.css(backTop,"height")-135+"px";
            }else{
                backTop.style.display="none";
            }
        }
    })();





})();

