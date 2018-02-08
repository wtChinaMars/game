var Net = require("Net")
var Global = require("Global")
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
        zhanghao:cc.EditBox,
        yanzhengma:cc.EditBox,
        mima:cc.EditBox,
        tims_speed:cc.Label,
		_code:null,
        _yanzhengma_btn:null,
        _daojishi:null,
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
            
        }
        this._yanzhengma_btn=cc.find("btn_qryzm/btn_qryzm",this.node);
		this._code=[];
		
    },
    get_code:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(this.zhanghao.string.length!=11){
            cc.vv.alert.show('提示','请输入正确的手机号');
        }else{
           var data={
                account:this.zhanghao.string
            }
            var self=this;
            var onGetcode=function(ret){
				
                if(ret.errcode.errcode == 1){
                    cc.vv.alert.show('提示','该手机号已被注册');
				}
                else if(ret.errcode.errcode == 2){
					cc.vv.alert.show('提示','注册系统繁忙，请联系客服！');
				}else{
					this._code.push(ret.errcode.code);
					this._yanzhengma_btn.active=false;
					this._daojishi=59;
                }
            }
            cc.vv.http.sendRequest("/getcode",data,onGetcode.bind(this));   
            
        }


    },
	
	querenzhuce:function(){
		var right=false;
		for(var c in this._code){
			if(this._code[c]==this.yanzhengma.string){
				right=true;
				break;
			}
		}
		if(right){
			this._code=[];
			Global.account=this.zhanghao.string;
			Global.pwd=this.mima.string;
			cc.vv.http.url = "http://" + cc.vv.SI.hall;
			cc.director.loadScene("createrole");
		}
		else{
			alert("验证码错误");
		}
		
	},
	
    close:function(){
        this.node.active=false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._daojishi>0){
            this._daojishi-=dt;
            var pre = "";
            if(this._daojishi<0){
                this._daojishi=0;
                this._yanzhengma_btn.active=true;
            }
            var t = Math.ceil(this._daojishi);
            if(t < 10){
                pre = "0";
            }
            this.tims_speed.string=pre+t+"秒";
        }
        else{

        }
   },
});
