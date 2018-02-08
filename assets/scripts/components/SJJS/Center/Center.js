cc.Class({
    extends: cc.Component,

    properties: {
        lblNotice: cc.Label,        
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
    initNetHandlers: function () {
        var self = this;
    },
// onLoad
    onLoad: function () {
        // this.initButtonHandler("Canvas/CreateRoom/btn_ok3");
        //  this.initButtonHandler("Canvas/right_bottom/btn_xiaoxi");
        // this.helpWin.addComponent("OnBack");
        // this.xiaoxiWin.addComponent("OnBack");

        if (!cc.vv.userMgr.notice) {
            cc.vv.userMgr.notice = {
                version: null,
                msg: "数据请求中...",
            }
        }

        if (!cc.vv.userMgr.gemstip) {
            cc.vv.userMgr.gemstip = {
                version: null,
                msg: "数据请求中...",
            }
        }
        this.lblNotice.string = cc.vv.userMgr.notice.msg;
        
        //this.refreshInfo();
        this.refreshNotice();
        this.refreshGemsTip();
       // cc.vv.utils.addEscEvent(this.node);
        
    },
//onClick
    createRoom_shangjin: function (event) {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var self = this;
        var type = 0;

        if (event.target.name == "glod1" && cc.vv.userMgr.coins >= 6000) {
            type = 1;
        } else if (event.target.name == "glod2" && cc.vv.userMgr.coins >= 10000) {
            type = 2;
        } else if (event.target.name == "glod3" && cc.vv.userMgr.coins >= 20000) {
            type = 3;
        } else {
            cc.vv.alert.show("提示", "金币不足！");
            return;
        }
        var checkRoom = function (rett) {
            if (rett.errcode !== 0) {

            }
            else {
                //	alert(rett.roomid);
                if (rett.roomid) {
                    var roomid = rett.roomid;
                    cc.vv.userMgr.enterRoom(roomid, function (ret) {
                        if (ret.errcode == 0) {

                        }
                        else {
                            var content = "房间[" + roomId + "]不存在，请重新输入!";
                            if (ret.errcode == 4) {
                                content = "房间[" + roomId + "]已满!";
                            }
                            cc.vv.alert.show("提示", content);
                            this.onResetClicked();
                        }
                    }.bind(this));
                } else {
                    var onCreate = function (ret) {
                        if (ret.errcode !== 0) {
                            cc.vv.wc.hide();
                            console.log(ret.errmsg);
                            if (ret.errcode == 2222) {
                                cc.vv.alert.show("提示", "失败!");
                            }
                            else {
                                cc.vv.alert.show("提示", "失败,错误码:" + ret.errcode);
                            }
                        }
                        else {
                            cc.vv.gameNetMgr.connectGameServer(ret);
                        }
                    };
                    var conf = {
                        type: "shangjindoudizhu",
                        room_type: type,//赏金房间类型
                        renshu: 3,
                        daikai: false,
                    };

                    var data = {
                        account: cc.vv.userMgr.account,
                        sign: cc.vv.userMgr.sign,
                        conf: JSON.stringify(conf),
                        coins: cc.vv.userMgr.coins,
                    };
                    console.log(data);
                    cc.vv.wc.show("正在创建房间");
                    cc.vv.http.sendRequest("/create_private_room", data, onCreate);
                }
            }

        };
        //cc.vv.userMgr.enterRoom(9999999,function(ret){}.bind(this)); 
        cc.vv.http.sendRequest("/check_shangjinRoom", { room_type: type }, checkRoom);

        // cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        // cc.director.loadScene("hall_sjvip");
    },

    createRoom_jinbi: function (event) {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var self = this;
        var type = 0;
        var data={
            userid:cc.vv.userMgr.userId,
        };
            var onCreate=function(ret){
                if(cc.vv.userMgr.coins<500&&ret==0){
                    cc.vv.alert.show("提示", "金币不足，获取888金币");
                    cc.vv.http.sendRequest("/pochanjb",data);
                    return;
                }
            };
          
            cc.vv.http.sendRequest("/pochan", data, onCreate);
      
        if (event.target.name == "glod1" && cc.vv.userMgr.coins >=500 &&cc.vv.userMgr.coins<=20000) {
            type = 1;
        } else if (event.target.name == "glod2" && cc.vv.userMgr.coins >=2000 &&cc.vv.userMgr.coins<=150000) {
            type = 2;
        } else if (event.target.name == "glod3" && cc.vv.userMgr.coins >=10000 &&cc.vv.userMgr.coins<=6000000) {
            type = 3;
        }else if(event.target.name == "glod4" && cc.vv.userMgr.coins >=50000) {
            type = 4; //金币场次待更新
        } else {

            cc.vv.alert.show("提示", "金币不足！");
            return;
        }
        var checkRoom = function (rett) {
            if (rett.errcode !== 0) {

            }
            else {
                //	alert(rett.roomid);
                if (rett.roomid) {
                    var roomid = rett.roomid;
                    cc.vv.userMgr.enterRoom(roomid, function (ret) {
                        if (ret.errcode == 0) {

                        }
                        else {
                            var content = "房间[" + roomId + "]不存在，请重新输入!";
                            if (ret.errcode == 4) {
                                content = "房间[" + roomId + "]已满!";
                            }
                            cc.vv.alert.show("提示", content);
                            this.onResetClicked();
                        }
                    }.bind(this));
                } else {
                    var onCreate = function (ret) {
                        if (ret.errcode !== 0) {
                            cc.vv.wc.hide();
                            console.log(ret.errmsg);
                            if (ret.errcode == 2222) {
                                cc.vv.alert.show("提示", "失败!");
                            }
                            else {
                                cc.vv.alert.show("提示", "失败,错误码:" + ret.errcode);
                            }
                        }
                        else {
                            cc.vv.gameNetMgr.connectGameServer(ret);
                        }
                    };
                    var conf = {
                        type: "jinbidoudizhu",
                        room_type: type,//赏金房间类型
                        renshu: 3,
                        daikai: false,
                        jiabei :true,
                    };

                    var data = {
                        account: cc.vv.userMgr.account,
                        sign: cc.vv.userMgr.sign,
                        conf: JSON.stringify(conf),
                        coins: cc.vv.userMgr.coins,
                        
                    };
                    console.log(data);
                    cc.vv.wc.show("正在创建房间");
                    cc.vv.http.sendRequest("/create_private_room", data, onCreate);
                }
            }

        };
        //cc.vv.userMgr.enterRoom(9999999,function(ret){}.bind(this)); 
        cc.vv.http.sendRequest("/check_jinbiRoom", { room_type: type }, checkRoom);

        // cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        // cc.director.loadScene("hall_sjvip");
    },
    return_hall: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
       // cc.director.loadScene("hall");
       cc.find("Canvas/center/gamelist").active  = false;
       cc.find("Canvas/gamelist").active = true;
       cc.find("Canvas/background/jbtitle").active = false;
       cc.find("Canvas/background/maintitle").active = true;
       cc.find("Canvas/center/back").active = false;
    },
//function
    refreshGemsTip: function () {
        var self = this;
        var onGet = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                cc.vv.userMgr.gemstip.version = ret.version;
                cc.vv.userMgr.gemstip.msg = ret.msg.replace("<newline>", "\n");
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            type: "fkgm",
            version: cc.vv.userMgr.gemstip.version
        };
        cc.vv.http.sendRequest("/get_message", data, onGet.bind(this));
    },
    refreshNotice: function () {
        var self = this;
        var onGet = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                cc.vv.userMgr.notice.version = ret.version;
                cc.vv.userMgr.notice.msg = ret.msg;
                this.lblNotice.string = ret.msg;
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            type: "notice",
            version: cc.vv.userMgr.notice.version
        };
        cc.vv.http.sendRequest("/get_message", data, onGet.bind(this));
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var x = this.lblNotice.node.x;
        x -= dt * 100;
        if (x + this.lblNotice.node.width < -1000) {
            x = 500;
        }
        this.lblNotice.node.x = x;

        if (cc.vv && cc.vv.userMgr.roomData != null) {
            cc.vv.userMgr.enterRoom(cc.vv.userMgr.roomData);
            cc.vv.userMgr.roomData = null;
        }
    },
});
