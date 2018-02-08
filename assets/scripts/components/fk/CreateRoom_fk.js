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
        _leixingxuanze: null,
        _gamelist: null,
        _currentGame: null,
        roomwindow:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

        this._gamelist = this.node.getChildByName('game_list');

        this._leixingxuanze = [];
      //  var t = this.node.getChildByName("leixingxuanze");
      // for (var i = 0; i < t.childrenCount; ++i) {
     //       var n = t.children[i].getComponent("RadioButton");
      //   if (n != null) {
      //         this._leixingxuanze.push(n);
      //    }
      //  }
     // this.initButtonHandler("Canvas/CreateRoom/btn_ok3");
    },
   
    onBtnBack: function () {
        this.node.active = false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    onBtnOK: function () {
        var usedTypes = ['fangkadoudizhu', 'shangjindoudizhu'];
        var type = this.getType();
        if (usedTypes.indexOf(type) == -1) {
            return;
        }

        this.node.active = false;
        this.createRoom(0);
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    onBtnOK_daikai: function () {
        cc.vv.alert.show("提示","房间创建成功！");
        var usedTypes = ['fangkadoudizhu', 'shangjindoudizhu'];
        var type = this.getType();
        if (usedTypes.indexOf(type) == -1) {
            return;
        }
      //  cc.vv.alert.show("提示","房间创建成功！");
      //  this.node.active = false;
      if(this.createRoom(1)!=1){
        cc.vv.alert.show("提示","房间创建成功！");
      }  
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
   

    getType: function () {
        var type = 0;
        for (var i = 0; i < this._leixingxuanze.length; ++i) {
            if (this._leixingxuanze[i].checked) {
                type = i;
                break;
            }
        }
        if (type == 0) {
            return 'fangkadoudizhu';
        }
        else if (type == 1) {
            return 'shangjindoudizhu';
        }
        return 'xzdd';
    },

    getSelectedOfRadioGroup(groupRoot) {
        console.log(groupRoot);
        var t = this._currentGame.getChildByName(groupRoot);

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

    createRoom: function (val) {
        var self = this;
        var onCreate = function (ret) {
            if (ret.errcode !== 0) {
                cc.vv.wc.hide();
                //console.log(ret.errmsg);
                if (ret.errcode == 2222) {
                    cc.vv.alert.show("提示", "钥匙不足，创建房间失败!");
                }
                else if (ret.errcode == 3333) {
                    cc.vv.alert.show("提示", "您创建的房间太多了!");
                    return 1;
                }else {
                         cc.vv.alert.show("提示", "创建房间失败,错误码:" + ret.errcode);
                     }
            }else {
                
              if(val==1){
                //self.roomwindow.active=true;
                    var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1),cc.callFunc(function(){
                        self.roomwindow.getComponent("RoomWindow").getrooms();
                    },this,0));
                    self.roomwindow.runAction(seq);
                 }
              else{
                cc.vv.gameNetMgr.connectGameServer(ret);
              }
            }
        };
        var type = this.getType();
        var conf = null;
        if (val == 0) {
            conf = this.constructSCMJConf(0);
        }
        else if (val == 1) {
            conf = this.constructSCMJConf(1);
        }
        conf.type = type;
        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            conf: JSON.stringify(conf)
        };
        console.log(data);
        if(val==0){
         cc.vv.wc.show("正在创建房间");
        }
        cc.vv.http.sendRequest("/create_private_room", data, onCreate);
    },
    constructSCMJConf: function (val) {
        var t=val==1;
        // var wanfaxuanze = this._currentGame.getChildByName('wanfaxuanze');
        // var huansanzhang = wanfaxuanze.children[0].getComponent('CheckBox').checked;
        // var jiangdui = wanfaxuanze.children[1].getComponent('CheckBox').checked;
        // var menqing = wanfaxuanze.children[2].getComponent('CheckBox').checked;
        // var tiandihu = wanfaxuanze.children[3].getComponent('CheckBox').checked;
    
        //    var difen = this.getSelectedOfRadioGroup('difenxuanze');
        //    var zimo = this.getSelectedOfRadioGroup('zimojiacheng');
        var zuidafanshu = this.getSelectedOfRadioGroup('zuidafanshu');
        var jushuxuanze = this.getSelectedOfRadioGroup('xuanzejushu');
        // var jiabei=this.getSelectedOfRadioGroup('zimojiacheng');
        var renshu=this.getSelectedOfRadioGroup('dianganghua');
        var wanfaxuanze = this._currentGame.getChildByName('wanfaxuanze');
            
        var shuangwang = wanfaxuanze.children[0].getComponent('CheckBox').checked;
        var sixiaowang = wanfaxuanze.children[1].getComponent('CheckBox').checked; 
        var longhupao = wanfaxuanze.children[2].getComponent('CheckBox').checked; 
        var gps = wanfaxuanze.children[3].getComponent('CheckBox').checked;    
        var jiabei = wanfaxuanze.children[4].getComponent('CheckBox').checked;  
        console.log(jiabei);  
        jiabei = jiabei?0:1;
        var jinyan = wanfaxuanze.children[5].getComponent('CheckBox').checked;    
        console.log(gps);
         //   var dianganghua = this.getSelectedOfRadioGroup('dianganghua');
            if(jushuxuanze==0)
            {
                jushuxuanze=15;
            }else{
                jushuxuanze=30;
            }
            if(zuidafanshu==0){
                zuidafanshu=32;
            }else if(zuidafanshu==1){
                zuidafanshu=64;
            }else{
                zuidafanshu=999999;
            }
            if(renshu==0){
                gps=false;
            }
            var conf = {
                jushu:jushuxuanze,
                renshu:renshu,
                fanshu:zuidafanshu,
                jiabei:jiabei,
                daikai:t,
                jinyan:jinyan,
                GPS:gps,
            };
            return conf
    },

});