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
        createRoomWin: cc.Node,

    },

    // use this for initialization
    onLoad: function () {
        // this.initButtonHandler("Canvas/center/CreateRoom/btn_ok3");

    },
    onGuanbizsfk:function(){
        this.zsfk.active = false;
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
    onCreateRoomClicked: function () {
        //  if(cc.vv.gameNetMgr.roomId != null){
        //      cc.vv.alert.show("提示","房间已经创建!\n必须解散当前房间才能创建新的房间");
        //      return;
        //  }
        //  console.log("onCreateRoomClicked");
        if(cc.vv.gameNetMgr.roomId!==null){
            cc.vv.alert.show("提示","您即将返回房间",function(){
                cc.vv.wc.show("正在进入房间");
                cc.director.loadScene(cc.vv.gameNetMgr.returngame);  
            }.bind(this),true);
        }else{
            this.createRoomWin.active = true;
    }
    
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    
    createRoom: function () {
        if(cc.vv.gameNetMgr.roomId!==null){
            cc.vv.alert.show("提示","您即将返回房间",function(){
                cc.vv.wc.show("正在进入房间");
                cc.director.loadScene(cc.vv.gameNetMgr.returngame);  
            }.bind(this),true);
        }else{
            var self = this;
            var onCreate = function (ret) {
                if (ret.errcode !== 0) {
                    cc.vv.wc.hide();
                    //console.log(ret.errmsg);
                    if (ret.errcode == 2222) {
                        cc.vv.alert.show("提示", "钥匙不足，创建房间失败!");
                    } else if (ret.errcode == 3333) {
                        cc.vv.alert.show("提示", "您创建的房间太多了!");
                    }
                    else {
                        cc.vv.alert.show("提示", "创建房间失败,错误码:" + ret.errcode);
                        //cc.vv.alert.show("提示","您创建的房间太多了!");  
                    }
                }
                else {
                    cc.vv.gameNetMgr.connectGameServer(ret);
                }
            };
            var conf = {
                type: "fangkadoudizhu",
                jushu: 8,
                renshu: 3,
                jishu: 2,
            };
    
            var data = {
                account: cc.vv.userMgr.account,
                sign: cc.vv.userMgr.sign,
                conf: JSON.stringify(conf)
            };
            console.log(data);
            cc.vv.wc.show("正在创建房间");
            cc.vv.http.sendRequest("/create_private_room", data, onCreate);
    
        }
        

    },
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
           // return;
           type =1 ;
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

        if (event.target.name == "glod1" && cc.vv.userMgr.coins >=500 ||cc.vv.userMgr.coins<=20000) {
            type = 1;
        } else if (event.target.name == "glod2" && cc.vv.userMgr.coins >=2000 ||cc.vv.userMgr.coins<=150000) {
            type = 2;
        } else if (event.target.name == "glod3" && cc.vv.userMgr.coins >=10000 ||cc.vv.userMgr.coins<=6000000) {
            type = 3;
        }else if(event.target.name == "glod4" && cc.vv.userMgr.coins >=50000) {
            type = 3; //金币场次待更新
        }else {
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
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
