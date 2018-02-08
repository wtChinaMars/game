 cc.Class({
    extends: cc.Component,

    properties: {
        _userinfo:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }

        this._userinfo = cc.find("Canvas/userinfo");
       // this._userinfo.active = false;
        cc.vv.utils.addClickEvent(this._userinfo,this.node,"UserInfoShow","onClicked");

        cc.vv.userinfoShow = this;
    },

    show:function(name,userId,iconSprite,sex,ip,charm,lv,jinbichangnum,jinbichangshenglv,coins,jintiao){
        cc.vv.userMgr.zhuangtai=true;
        if(userId != null && userId > 0){
            this._userinfo.active = true;
            this._userinfo.getChildByName("info").getChildByName("name").getChildByName("name").getComponent(cc.Label).string=name;
            this._userinfo.getChildByName("icon").getChildByName("icon").getComponent(cc.Sprite).spriteFrame=iconSprite.spriteFrame;
            //this._userinfo.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = iconSprite.spriteFrame;
            //this._userinfo.getChildByName("name").getComponent(cc.Label).string = name;
            //this._userinfo.getChildByName("ip").getComponent(cc.Label).string = "IP: " + ip.replace("::ffff:","");
            this._userinfo.getChildByName("id").getComponent(cc.Label).string = "ID: " + userId;
            this._userinfo.getChildByName("info").getChildByName("csml").getChildByName("meilishiinfo").getComponent(cc.Label).string=charm;
         //   this._userinfo.getChildByName("info").getChildByName()
         var jindutiao=this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("zz").getChildByName("jy");
         if(lv<=1000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(初出茅庐)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='1';
            jindutiao.x+=(parseInt(lv)/1000)*337;
         }else if(lv<=3000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(渐入佳境)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='2';
            jindutiao.x+=(parseInt(lv)/3000)*337;
         }else if(lv<=10000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(千锤百炼)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='3';
            jindutiao.x+=(parseInt(lv)/10000)*337;
         }else if(lv<=50000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(融会贯通)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='4';
            jindutiao.x+=(parseInt(lv)/50000)*337;
         }else if(lv<=100000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(炉火纯青)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='5';
            jindutiao.x+=(parseInt(lv)/100000)*337;
         }else if(lv<=500000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(登峰造极)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='6';
            jindutiao.x+=(parseInt(lv)/500000)*300;
         }else if(lv>500000){
            jindutiao.x=-379;
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("chenghao").getComponent(cc.Label).string="(最强斗神)";
            this._userinfo.getChildByName("info").getChildByName("dengji").getChildByName("dengjiinfo").getComponent(cc.Label).string='7';
            jindutiao.x+=86;
         }







         this._userinfo.getChildByName("info").getChildByName("duijushenglv").getChildByName("jindichangduijuinfo").getComponent(cc.Label).string=jinbichangnum;
         var sl=(jinbichangshenglv/jinbichangnum)*100;
         if(jinbichangnum==0){
            this._userinfo.getChildByName("info").getChildByName("duijushenglv").getChildByName("shenglvinfo").getComponent(cc.Label).string="0%";
         }else{
            this._userinfo.getChildByName("info").getChildByName("duijushenglv").getChildByName("shenglvinfo").getComponent(cc.Label).string=sl.toFixed(2)+"%";
         }


            var sex_female = this._userinfo.getChildByName("info").getChildByName("xingbie").getChildByName("duihaonv");
            sex_female.active = false;

            var sex_male = this._userinfo.getChildByName("info").getChildByName("xingbie").getChildByName("duihaonan");
            sex_male.active = false;
            console.log(sex);
            if(sex == 1){
                sex_male.active = true;

            }
            else if(sex == 2){
                sex_female.active = true;

            }



            this._userinfo.getChildByName("jintiao").getChildByName("jintiaosum").getComponent(cc.Label).string = this.getConvert(jintiao);
            this._userinfo.getChildByName("jinbi").getChildByName("jinbisum").getComponent(cc.Label).string = this.getConvert(coins);
            // var onip = function(ret){
            //     if(ret.errcode !== 0){
            //         console.log(ret.errmsg);
            //     }
            //     else{
            //         if(!ret.userid){
            //             //jump to register user info.
            //             cc.director.loadScene("createrole");
            //         }
            //         else{
            //             //this._userinfo.getChildByName("info").getChildByName("csml").getChildByName("sheng").getComponent(cc.Label).string = this.loadXMLDoc();
            //             console.log(ret);
            //         }
            //     }
            // };

            // cc.vv.http.sendRequest("/ip.jsp",{ip:ip,callback:onip},onip,"http://whois.pconline.com.cn");
            // //var self=this;


        }
    },
    //  loadXMLDoc:function ()
    // {
    //    var xmlhttp;
    //    if (window.XMLHttpRequest)
    //    {
    //      // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    //      xmlhttp=new XMLHttpRequest();
    //    }
    //    else
    //    {
    //      // IE6, IE5 浏览器执行代码
    //      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    //    }
    //    xmlhttp.onreadystatechange=function()
    //   {
    //      if (xmlhttp.readyState==4 && xmlhttp.status==200)
    //      {
    //        //document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    //        console.log(xmlhttp.responseText)
    //        return xmlhttp.responseText;
    //      }
    //    }
    //    xmlhttp.open("GET","http://whois.pconline.com.cn/ip.jsp",true);
    //    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //    xmlhttp.send();
    //  },
    onClicked:function(){
        this._userinfo.active = false;
    },
    getConvert: function(num){
        if(num>=100000000){
            return Math.floor(num/100000000*100)/100+"亿";
        }else if(num>=10000){
            return Math.floor(num/10000*100)/100+"万";
        }else if(num<10000){
            return num;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    onClickShowUpdate:function(){
        if(/^\+?[1-9][0-9]*$/.test(cc.vv.userMgr.account)){
            cc.find("Canvas/userinfo/info/name/update_name").active=true;
        }else{
            cc.find("Canvas/userinfo/info/name/update_name").active=false;
            cc.vv.alert.show("提示","微信用户请在微信中修改昵称!");
        }
    },
    onClickSex:function(event) {
      if(/^\+?[1-9][0-9]*$/.test(cc.vv.userMgr.account)){
        var sex_female = this._userinfo.getChildByName("info").getChildByName("xingbie").getChildByName("duihaonv");
        var sex_male = this._userinfo.getChildByName("info").getChildByName("xingbie").getChildByName("duihaonan");
        if(event.target.name=='nankuang'||event.target.name=='nan'){
          sex_female.active = false;
          sex_male.active = true;
          this.UpadateSex(1);
        }else if(event.target.name=='nvkuang'||event.target.name=='nv'){
          sex_female.active = true;
          sex_male.active = false;
          this.UpadateSex(2);
        }
      }else {
          cc.vv.alert.show("提示","微信用户请在微信中修改性别!");
          }

    },

    onClickUpdateName:function(){
        var up_name = cc.find("Canvas/userinfo/info/name/update_name/input_name").getComponent(cc.EditBox).string
        this.UpadateName(up_name);

    },
    UpadateName:function(up_name){
        var self = this;
        var onUpdateName = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                cc.vv.userMgr.name=ret.name;
                cc.find("Canvas/userinfo/info/name/name").getComponent(cc.Label).string=up_name;
                cc.find("Canvas/userinfo/info/name/update_name").active=false;
                cc.vv.alert.show("提示","修改成功!");

            }
        };

        var data = {
            userid:cc.vv.userMgr.userId,
            name:up_name,
        };
        cc.vv.http.sendRequest("/update_name",data,onUpdateName);
    },
    UpadateSex:function(sex1){
        var self = this;
        var onUpdateName = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{

            }
        };

        var data = {
            userid:cc.vv.userMgr.userId,
            sex:sex1,
        };
        cc.vv.http.sendRequest("/update_sex",data,onUpdateName);
    },


        getSelectedOfRadioGroup(groupRoot) {
            console.log(groupRoot);
            var t = this._userinfo.getChildByName("info").getChildByName("xingbie").getChildByName(groupRoot);

            var arr = [];
            for (var i = 0; i < t.children.length; ++i) {
                var n = t.children[i].getComponent("RadioButton");
                if (n != null) {
                    arr.push(n);
                }
            }
            var selected = 0;
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i].checked) {
                    selected = i;
                    break;
                }
            }
            return selected;
        },
    // },
});
