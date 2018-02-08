cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _userinfo:null,
        _name_:null,
        _id_:null,
        _ip:null,
        _shenglvinfo:null,
        _zongjushuinfo:null,
        _jintiaosum:null,
        _jinbisum:null,
        _dengjiinfo:null,
        _chenghao:null,
        _jy:null,
        _sex_female:null,
        _sex_male:null,
        _daojukuang:null,
        _userid:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        
        this._userinfo = cc.find("Canvas/userinfo_game");
     //   this._userinfo.active = false;Canvas
        var ti             =cc.find("kick", this._userinfo);
        var mengban        =cc.find("mengban", this._userinfo);
        this._name_         =cc.find("name",this._userinfo);
        this._id_           =cc.find("id",this._userinfo);
        this._ip           =cc.find("ip",this._userinfo);
        this._icon         =cc.find("icon",this._userinfo);
        this._shenglvinfo  =cc.find("duijushenglv/shenglvinfo",this._userinfo);
        this._zongjushuinfo=cc.find("duijushenglv/zongjushuinfo",this._userinfo);
        this._jintiaosum   =cc.find("jintiao/jintiaosum",this._userinfo);
        this._jinbisum     =cc.find("jinbi/jinbisum",this._userinfo);
        this._dengjiinfo   =cc.find("dengji/dengjiinfo",this._userinfo);
        this._chenghao     =cc.find("dengji/chenghao",this._userinfo);
        this._jy           =cc.find("dengji/zz/jy",this._userinfo);
        this._sex_female   =cc.find("sex_female",this._userinfo);
        this._sex_male     =cc.find("sex_male",this._userinfo);
        // this._daojukuang   =cc.find("daojulist",this._userinfo);
        cc.vv.utils.addClickEvent(this._userinfo,this.node,"UserInfoShow_game","onClicked");
        cc.vv.utils.addClickEvent(ti,this.node,"UserInfoShow_game","tiren");
        cc.vv.userinfoShow_game = this;
    },
    getUserInfo:function(uid){
        var self=this;
        var data={
            userid:uid,
        }
        var getUserInfo = function(ret){
            if(ret == ""){
                console.log(ret.errmsg);
            }
            else{

                // alert(
                // " lv"+ret[0].lv+
                // " jinbichangnum"+ret[0].fangkachangnum+
                // " jinbichangshenglv"+ret[0].fangkachangshenglv+
                // " coins"+ret[0].coins+
                // " jintiao"+ret[0].jintiao);
                self._shenglvinfo.getComponent(cc.Label).string  =ret[0].fangkachangshenglv;
                self._zongjushuinfo.getComponent(cc.Label).string=ret[0].fangkachangnum;
                self._jintiaosum.getComponent(cc.Label).string   =self.getConvert(ret[0].jintiao);
                self._jinbisum.getComponent(cc.Label).string     =self.getConvert(ret[0].coins);
                self._dengjiinfo.getComponent(cc.Label).string   =self.getlv(ret[0].lv);
                self._chenghao.getComponent(cc.Label).string     =self.getchenghao(ret[0].lv);
                self._jy.x = 130*self.getjingyan(ret[0].lv)-130;
                self._userinfo.active = true;
              
            }
        };
        cc.vv.http.sendRequest("/get_userinfoFK",data,getUserInfo);  
    },
    show:function(name,userId,iconiconSprite,sex,ip,gps,charm,lv,jinbichangnum,jinbichangshenglv,coins,jintiao){
       
        // alert("name:"+name+
        //     " userId"+userId+
        //     " iconiconSprite"+iconiconSprite+
        //     " sex"+sex+
        //     " ip"+ip);
      
        // if(gps!=undefined){
        //     if(gps!=0&&gps.a[0].name!=""&&gps.b[0].name!=""){
        //         cc.find("Canvas/userinfo_game/gps/a").getComponent(cc.Label).string = gps.a[0].name+"距离你:"+gps.a[0].juli+"米";
        //         cc.find("Canvas/userinfo_game/gps/b").getComponent(cc.Label).string = gps.b[0].name+"距离你:"+gps.b[0].juli+"米";
        //     }
        // }
        if(sex == 1){
            this._sex_male.active = true;
            this._sex_female.active = false;
            
        }   
        else if(sex == 2){
            this._sex_male.active = false;
            this._sex_female.active = true;
        }
        this.userid=userId;
     
        if(cc.vv.gameNetMgr.conf.creator==cc.vv.userMgr.userId&&userId!=cc.vv.userMgr.userId&&(cc.vv.gameNetMgr.conf.type=="fangkadoudizhu"||cc.vv.gameNetMgr.conf.type=="fangkadoudizhu3")){
            cc.find("kick", this._userinfo).active=true;
        }else{
			cc.find("kick", this._userinfo).active=false;
		}
        this._icon.getComponent(cc.Sprite).spriteFrame   =iconiconSprite.spriteFrame;
        this._name_.getComponent(cc.Label).string         =name;
        this._id_.getComponent(cc.Label).string           ="ID:"+userId;
        this._ip.getComponent(cc.Label).string           ="IP"+ip.slice(6);
        this.getUserInfo(this.userid);
        //    this._jy.string           =cc.find("jy",this._userinfo);
      
    },
    getlv: function (lv) {
        if (lv <= 1000) {
            return "1";
        } else if (cc.vv.userMgr.lv <= 3000) {
            return "2";
        } else if (cc.vv.userMgr.lv <= 10000) {
            return "3";
        } else if (cc.vv.userMgr.lv <= 50000) {
            return "4";
        } else if (cc.vv.userMgr.lv <= 100000) {
            return "5";
        } else if (cc.vv.userMgr.lv <= 500000) {
            return "6";
        } else if (cc.vv.userMgr.lv > 500000) {
            return "7";
        }
    },
    getchenghao: function (lv) {
        if (lv <= 1000) {
           
            return "初出茅庐";
        } else if (cc.vv.userMgr.lv <= 3000) {
            return "渐入佳境";
        } else if (cc.vv.userMgr.lv <= 10000) {
            return "千锤百炼";
        } else if (cc.vv.userMgr.lv <= 50000) {
            return "融会贯通";
        } else if (cc.vv.userMgr.lv <= 100000) {
            return "炉火纯青";
        } else if (cc.vv.userMgr.lv <= 500000) {
            return "登峰造极";
        } else if (cc.vv.userMgr.lv > 500000) {
            return "最强斗神";
        }
    },
    getjingyan: function (lv) {
        if (lv <= 1000) {
           
            return lv/1000;
        } else if (cc.vv.userMgr.lv <= 3000) {
            return lv/3000;
        } else if (cc.vv.userMgr.lv <= 10000) {
            return lv/10000;
        } else if (cc.vv.userMgr.lv <= 50000) {
            return lv/50000;
        } else if (cc.vv.userMgr.lv <= 100000) {
            return lv/100000;
        } else if (cc.vv.userMgr.lv <= 500000) {
            return lv/500000;
        } else if (cc.vv.userMgr.lv > 500000) {
            return 1;
        }
    },
    tiren:function(){
        if(cc.vv.gameNetMgr.numOfGames<=0){
            cc.vv.net.send("tiren",this.userid);
          //  this._userinfo.active = false;
            cc.vv.alert.show("提示","踢出成功！");
        }else{
            //alert("玩着呢踢什么踢！");
            cc.vv.alert.show("提示","游戏已经开始！");
        }
    
    },

    onClicked:function(){
        // this._daojukuang.active = false;
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
    xuanzedaoju:function(){
        // this._daojukuang.active = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    shiyongdaoju:function(event){
      //  alert( this._id_.getComponent(cc.Label).string  );
        var userid=this._id_.getComponent(cc.Label).string;
        userid=userid.split(':')[1];
      //  alert(userid);
        if(event.target.name=="d1"){
			cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"eggs"});
        }else if(event.target.name=="d2"){
            cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"kiss"});
        }else if(event.target.name=="d3"){
            cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"cheer"});
        }
        else if(event.target.name=="d4"){
            cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"pissa"});
        }
        else if(event.target.name=="d5"){
            cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"tuoxie"});
        }
        else if(event.target.name=="d6"){
            cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"zan"});
        }
        else if(event.target.name=="d7"){
            cc.vv.net.send("shiyongdaoju",{userid:userid,daoju:"zhuan"});
        }
        // this._daojukuang.active = false;
        this._userinfo.active = false;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
