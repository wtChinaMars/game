cc.Class({
    extends: cc.Component,

    properties: {
        jion:cc.Node,
        share:cc.Node,
        g_id:cc.Label,
        g_name:cc.Label,
        g_time:cc.Label,
        g_renshu:cc.Label,
        g_state:cc.Label,
        g_wanfa:cc.Label,
        useats:{
            default:[],
            type:cc.Node
        },
        _roomid:null,
        _renshu:null,
        _roomConf:null,
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
    },

    // use this for initialization
    onLoad: function () {

    },
    init:function(id,name,time,renshu,state,seats,rs,roomConf){
        this._roomid=id;
        this.g_id.string="房间号"+id;
        this.g_name.string=name;
        this.g_time.string=time;
        this.g_renshu.string=renshu;
        this.g_state.string=state;
        this.g_wanfa.string=roomConf;
        if(rs==2){
            this.useats[2].active=false;
        }else{
            this.useats[2].active=true;
            
        }
        this._renshu=rs;
        this._roomConf=roomConf;
        
        for(i=0;i<4;i++){
          var u_name=  this.useats[i].getChildByName("name");
          var tirenbtn=this.useats[i].getChildByName("ti");
          tirenbtn.user_id=seats[i].id;
          tirenbtn.roomid=id;
          u_name.getComponent(cc.Label).string=seats[i].name==null?"该位置没人":this.decode(seats[i].name);
          if(seats[i].id>0){
            var sss=  this.useats[i].getChildByName("icon");
            var head=sss.getComponent("ImageLoader");
            head.setUserID(seats[i].id);
          }
        }

    },
    tiren:function(event){
        
        if(event.target.user_id==cc.vv.userMgr.userId){
            cc.vv.alert.show("提示","不可以踢自己！");
            return;
        }
       
        var self = this;
        var onCreate = function onCreate(ret) {
           
            if (ret.errcode !== 0) {
               
            } else {

            }
        };
        var data = {
            userid:event.target.user_id,
            roomid:event.target.roomid
        };
    
        cc.vv.alert.show("踢出玩家(游戏开始时踢人操作无效)","您确定要提出这个玩家嘛？",function(){
            if(event.target.user_id>0){
                cc.vv.http.sendRequest("/tiren",data, onCreate);
                event.target.user_id=0;
            }
          //  event.target.active = false; 
        },true);
   

      setTimeout(() => {
       // event.target.active = true; 
      }, 4000);
        // cc.vv.net.ip = "192.168.0.150:10000";
      
        // cc.vv.net.connect(function(){
        //     cc.vv.net.ping();
        // },function(){
        //     cc.vv.net.ping();
        // });
      
       // cc.vv.alert.show("踢出玩家","您确定要提出这个玩家嘛？",function(){
            // account:cc.vv.userMgr.account,
            // sign:cc.vv.userMgr.sign,
            // ip:arr[0],
            // port:arr[1],
        //},true);
      
    },
    onClickJoin:function(event){
        if(cc.vv.gameNetMgr.roomId!==null){
            cc.vv.alert.show("提示","您即将返回房间",function(){
                cc.vv.wc.show("正在进入房间");
                cc.director.loadScene(cc.vv.gameNetMgr.returngame);  
                
            }.bind(this),true);
        }else{
      
      //  var roomId = this.parseRoomID();
        //console.log("ok:" + roomId);
        var self=this;
        var onCreate = function(ret){
            if(ret.errcode==1){
                cc.vv.alert.show("提示","房间号码不存在！");
               // self.onResetClicked();
                return;
            }else if(ret.errcode==2){
                cc.vv.alert.show("提示","该房间需要开启GPS！");
                //self.onResetClicked();
                return;
            }else if(ret.errcode==0||ret.errcode==3){
                cc.vv.wc.show("正在进入房间");
                cc.vv.userMgr.enterRoom(self._roomid,function(ret1){
                    cc.vv.wc.hide();
                    if(ret1.errcode == 0){
                      //  this.node.active = false;
                    }
                    else{
                        var content = "房间["+ self._roomid +"]不存在，请重新输入!";
                        if(ret1.errcode == 4){
                            content = "房间["+ self._roomid + "]已满!";
                        }
                        cc.vv.alert.show("提示",content);
                      
                    }
                }); 
            }
        }
        cc.vv.http.sendRequest("/get_Conf_Gps",{roomId:this._roomid,Gps:cc.vv.userMgr.hallgps},onCreate);
        
        

    }
    },
    onInputFinished:function(roomId){
        cc.vv.userMgr.enterRoom(roomId,function(ret){
            if(ret.errcode == 0){
                this.node.active = false;
            }
            else{
                var content = "房间["+ roomId +"]不存在，请重新输入!";
                if(ret.errcode == 4){
                    content = "房间["+ roomId + "]已满!";
                    
                }
                cc.vv.alert.show("提示",content);
                this.onResetClicked();
            }
        }.bind(this)); 
    },
    onClickShare:function(event){
        if(this._renshu==2){
            cc.vv.anysdkMgr.share("豆乐棋牌-二人斗地主！" ,"房号:" +this._roomid+ " 玩法:" + this._roomConf);
        }else{
            cc.vv.anysdkMgr.share("豆乐棋牌-三人斗地主！" ,"房号:" + this._roomid + " 玩法:" + this._roomConf);
        }
    },
    decode: function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        var string = "";
        var i = 0;
        var c = 0,
            c1 = 0,
            c2 = 0,
            c3 = 0;
        while (i < output.length) {
            c = output.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = output.charCodeAt(i + 1);
                string += String.fromCharCode((c & 31) << 6 | c2 & 63);
                i += 2;
            } else {
                c2 = output.charCodeAt(i + 1);
                c3 = output.charCodeAt(i + 2);
                string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                i += 3;
            }
        }
        return string;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
