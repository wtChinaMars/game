String.prototype.format = function(args) { 
    if (arguments.length>0) { 
        var result = this; 
        if (arguments.length == 1 && typeof (args) == "object") { 
            for (var key in args) { 
                var reg=new RegExp ("({"+key+"})","g"); 
                result = result.replace(reg, args[key]); 
            } 
        } 
        else { 
            for (var i = 0; i < arguments.length; i++) { 
                if(arguments[i]==undefined) { 
                    return ""; 
                } 
                else { 
                    var reg=new RegExp ("({["+i+"]})","g"); 
                    result = result.replace(reg, arguments[i]); 
                } 
            } 
        } 
        return result; 
    } 
    else { 
        return this; 
    } 
};
var Global = require("Global")
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _mima:null,
        _mimaIndex:0,
        zhanghao:cc.EditBox,
		mima:cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        
        if(!cc.vv){
            cc.director.loadScene("loading");
           return;
        }
        this.node.setOpacity(0);
        this.node.runAction(cc.fadeIn(0.3));
        cc.vv.http.url = cc.vv.http.master_url;
        cc.vv.net.addHandler('push_need_create_role',function(){
            console.log("onLoad:push_need_create_role");
            cc.director.loadScene("createrole");
        });
        
        //cc.vv.audioMgr.playBGM("doudizhu/login.mp3");
        
        this._mima = ["A","A","B","B","A","B","A","B","A","A","A","B","B","B"];
        
        if(!cc.sys.isNative || cc.sys.os == cc.sys.OS_WINDOWS){
            cc.find("Canvas/btn_yk").active = true;
            cc.find("Canvas/btn_weixin").active = false;
        }
        else{
            cc.find("Canvas/btn_yk").active = false;
            cc.find("Canvas/btn_weixin").active = true;
        }
        var account2 = cc.sys.localStorage.getItem("account2");
        
		if(account2!=null){
           
			this.zhanghao.string=cc.sys.localStorage.getItem("account2");
			this.mima.string=cc.sys.localStorage.getItem("pwd");
			
		}

     
    },
    
    start:function(){
        var account =  cc.sys.localStorage.getItem("wx_account");
        var sign = cc.sys.localStorage.getItem("wx_sign");
        if(account != null && sign != null){
            var ret = {
                errcode:0,
                account:account,
                sign:sign
            }
            cc.vv.userMgr.onAuth(ret);
        }   
    },
    
    onBtnQuickStartClicked:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        cc.vv.userMgr.guestAuth();
    },
    
    onBtnWeichatClicked:function(){
        var self = this;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        cc.vv.anysdkMgr.login();
    },
    onzhuceClicked:function(){
        var zhuce_win=cc.find("Canvas/Regist");
        zhuce_win.active=true;
		cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
	},
	ondengluClicked:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(this.zhanghao.string==""||this.mima.string==""){
            cc.vv.alert.show("提示","请输入账号密码！");
            return;
        }
		Global.account=this.zhanghao.string;
        Global.pwd=this.mima.string;
        cc.vv.http.url = "http://" + cc.vv.SI.hall;
		cc.vv.userMgr.login2();
	},
    
    onBtnMIMAClicked:function(event){
        if(this._mima[this._mimaIndex] == event.target.name){
            this._mimaIndex++;
            if(this._mimaIndex == this._mima.length){
                cc.find("Canvas/btn_yk").active = true;
            }
        }
        else{
            console.log("oh ho~~~");
            this._mimaIndex = 0;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
