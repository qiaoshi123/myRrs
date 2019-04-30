/**
 * Created by qiaoshi on 2016/5/10.
 
 testtest

 qiaoshiqiaoshi
 */
window.onload=function(){
    var leftInfo=document.getElementById("leftInfo");
    var user=document.querySelector('[name=user]');
    var password=document.querySelector('[name=password]');
    var userError=document.getElementById("userError");
    var passwordError=document.getElementById('passwordError');
    function getfocus(){
        this.style.display="none";
    }
    user.onfocus=function(){getfocus.call(utils.next(this))};
    user.onblur=function (){
        var text=this.value;
        var reg=/^\w+((\.\w+)|(-\w+))*@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+$/;
        var reg2=/^1[34578]\d{9}$/;
        if(!(reg.test(text)||reg2.test(text))){
            utils.next(this).style.display="block";
        }else{
            utils.next(this).style.display="none";
        }
    };
    password.onfocus=function(){getfocus.call(utils.next(this))};
    password.onblur=function(){
        var text=this.value;
        var reg=/^.{6,16}$/,reg1=/^\s*$/;
        if(reg1.test(text)){
            utils.next(this).innerHTML="请输入密码";
            utils.next(this).style.display="block";
        }
        else if(!reg.test(text)){
            utils.next(this).innerHTML="请输入6-16位密码，字母区分大小写";
            utils.next(this).style.display="block";
        }else{
            utils.next(this).style.display="none";
        }
    }
};
