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
    },

    // use this for initialization
    onLoad: function () {

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
    createRoom_shangjin: function (event) {

        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var self = this;
        var type = 0;

        if (event.target.name == "glod1" && cc.vv.userMgr.coins >= 10000) {
            cc.vv.alert.show("提示","是否花费10000金币进入赏金场！",function(){
                type = 1;
                self.shangjin(type,10000,self);
            },true);
            
        } else if (event.target.name == "glod2" && cc.vv.userMgr.coins >= 20000) {
            cc.vv.alert.show("提示","是否花费20000金币进入赏金场！",function(){
                type = 2;
                self.shangjin(type,20000,self);
            },true);
        } else if (event.target.name == "glod3" && cc.vv.userMgr.coins >= 50000) {
            cc.vv.alert.show("提示","是否花费50000金币进入赏金场！",function(){
                type = 3;
                self.shangjin(type,50000,self);
            },true);
        } else {
            cc.vv.alert.show("提示", "金币不足！");
        }

    },
    shangjin:function(type,num,self){
        var data={
            userid:cc.vv.userMgr.userId,
            num:num,
        };
        cc.vv.http.sendRequest("/sjmp", data);
        //var self = ;
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
                            self.onResetClicked();
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
                        jiabei:true,
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
    },
});
