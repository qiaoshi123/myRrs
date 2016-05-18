/**
 * Created by qiaoshi on 2016/4/28.
 */
function on (ele,type,handler){
    if(/^self/.test(type)){
        //负责登记保存自定义事件
        if(!ele["rose"+type]){
            ele["rose"+type]=[];
        }
        var a=ele["rose"+type];
        for(var i=0;i< a.length;i++){
            if(a[i]==handler)return;
        }
        a.push(handler);
        return;
    }
    //--------以下负责保存登记浏览器事件和 发布fire方法
    if(ele.addEventListener){
        ele.addEventListener(type,handler,false);
        return;
    }
    if(!ele["aEvent"+type]){
        ele["aEvent"+type]=[];
        ele.attachEvent("on"+type,function(){
            fire.call(ele);
        })
    }
    var a=ele["aEvent"+type];
    for(var i=0;i< a.length;i++){
        if(a[i]===handler)return;
    }
    a.push(handler);
}
//负责浏览器事件的发布通知
function fire(){
    var e=window.event;
    var type= e.type;
    var a=this["aEvent"+type];
    if(!e.target){
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };
        e.preventDefault=function(){
            e.returnValue=false;
        }
    }
    if(a){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
//负责自定义事件的发布：遍历执行on保存下来的那些方法。 selfType事件类型，e系统事件对象
function selfFire(selfType,e){
    var a=this["rose"+selfType];
    if(a){
        for(var i=0;i< a.length;i++){
            a[i].call(this,e);
        }
    }
}

function off(ele,type,handler){
    if(ele.removeEventListener){
        ele.removeEventListener(type,handler,false);
        return;
    }
    var a=ele["aEvent"+type];
    if(a){
        for(var i=0;i< a.length;i++){
            if(a[i]==handler){
                a[i]=null;
            }
        }
    }
}