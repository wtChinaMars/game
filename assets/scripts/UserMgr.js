var Global = require("Global")
cc.Class({
    extends: cc.Component,
    properties: {
        account:null,
        account2:null,
	    userId:null,
		userName:null,
		pwd:null,
		lv:0,
		exp:0,
        coins:0,
        coins1:0,
        jintiao:0,
        returngame:"",
		gems:0,
		sign:0,
        ip:"",
        sex:0,
        jinbichangnum:0,
        jinbichangshenglv:0,
        shangjinchangnum:0,
        shangjinchangshenglv:0,
        fangkachangnum:0,
        fangkachangshenglv:0,
        dashisaichangnum:0,
        dashisaichangshenglv:0,
        beibao_info:"",
        storage_info:0,
        roomData:null,
        oldRoomId:null,
        isuuidyes:0,
        zuanshi:0,
        zhuangtai:false,
        fanhui:0,
        hallgps:false,
        latitude:0,
        lontitude:0,
    },

    guestAuth:function(){
        var account = cc.args["account"];
        if(account == null){
            account = cc.sys.localStorage.getItem("account");
        }

        if(account == null){
            account = Date.now();
            cc.sys.localStorage.setItem("account",account);
        }

        cc.vv.http.sendRequest("/guest",{account:account},this.onAuth);
    },

    onAuth:function(ret){
        var self = cc.vv.userMgr;
        if(ret.errcode !== 0){
            console.log(ret.errmsg);
        }
        else{
            self.account = ret.account;
            self.sign = ret.sign;
            cc.vv.http.url = "http://" + cc.vv.SI.hall;
            self.login();
        }
    },

    login:function(){
        var self = this;
        var onLogin = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                if(!ret.userid){
                    //jump to register user info.
                    cc.director.loadScene("createrole");
                }
                else{
                    console.log(ret);
                    self.account = ret.account;
                    self.account2= ret.account2;
        			self.userId = ret.userid;
        			self.userName = ret.name;
        			self.lv = ret.lv;
        			self.exp = ret.exp;
                    self.coins = ret.coins;
        			self.gems = ret.gems;
                    self.roomData = ret.roomid;
                    self.sex = ret.sex;
                    self.ip = ret.ip;
                    self.jintiao = ret.jintiao;
                    self.charm=ret.charm;
                    self.jinbichangnum=ret.jinbichangnum;
                    self.jinbichangshenglv=ret.jinbichangshenglv;
                    self.shangjinchangnum=ret.shangjinchangnum;
                    self.shangjinchangshenglv=ret.shangjinchangshenglv;
                    self.fangkachangnum=ret.fangkachangnum;
                    self.fangkachangshenglv=ret.fangkachangshenglv;
                    self.dashisaichangnum=ret.dashisaichangnum;
                    self.dashisaichangshenglv=ret.dashisaichangshenglv;
                    self.beibao_info = ret.beibao_info;
                    self.storage_info = ret.storage_info;
                    self.isuuidyes=ret.isuuidyes;
                    self.zuanshi=ret.zuanshi;
        			cc.director.loadScene("hall");
                }
            }
        };
        cc.vv.wc.show("正在登录游戏");
        cc.vv.http.sendRequest("/login",{account:this.account,sign:this.sign,pwd:this.pwd},onLogin);
    },

	 login2:function(){//账号登陆
        var self = this;
        var onLogin = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
				if(ret.errcode==1){

				}
            }
            else{
                if(!ret.userid){
                    //jump to register user info.
                  //  cc.director.loadScene("createrole");
                  cc.vv.wc.hide();
                  cc.vv.alert.show("提示","该账号未注册！");

                }
                else{
                    console.log(ret);
                    if(ret.account==undefined){
                      self.account = ret.account2;
                    }else{
                        self.account = ret.account;
                    }

        			self.userId = ret.userid;
        			self.userName = ret.name;
        			self.lv = ret.lv;
        			self.exp = ret.exp;
                    self.coins = ret.coins;
        			self.gems = ret.gems;
                    self.roomData = ret.roomid;
                    self.sex = ret.sex;
                    self.ip = ret.ip;
                    self.jintiao = ret.jintiao;
                    self.charm=ret.charm;
                    self.jinbichangnum=ret.jinbichangnum;
                    self.jinbichangshenglv=ret.jinbichangshenglv;
                    self.shangjinchangnum=ret.shangjinchangnum;
                    self.shangjinchangshenglv=ret.shangjinchangshenglv;
                    self.fangkachangnum=ret.fangkachangnum;
                    self.fangkachangshenglv=ret.fangkachangshenglv;
                    self.dashisaichangnum=ret.dashisaichangnum;
                    self.dashisaichangshenglv=ret.dashisaichangshenglv;
                    self.beibao_info = ret.beibao_info;
                    self.storage_info = ret.storage_info;
                    self.isuuidyes=ret.isuuidyes;
                    self.zuanshi=ret.zuanshi;
					cc.sys.localStorage.setItem("account2",Global.account);
					cc.sys.localStorage.setItem("pwd",Global.pwd);
        			cc.director.loadScene("hall");
                }
            }
        };
        cc.vv.wc.show("正在登录游戏");

        cc.vv.http.sendRequest("/login2",{account:Global.account,pwd:Global.pwd,sign:this.sign},onLogin);
    },

    create:function(name){
        var self = this;
        var onCreate = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                self.login();
            }
        };

        var data = {
            account:this.account,
            sign:this.sign,
            name:name,
			pwd:this.pwd
        };
        cc.vv.http.sendRequest("/create_user",data,onCreate);
    },
	create_zhanghao:function(name){
		var self = this;
        var onCreate = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                self.login2();
            }
        };

        var data = {
            account:Global.account,
            sign:this.sign,
            name:name,
			      pwd:Global.pwd,
            sex:Global.sex,
        };
        cc.vv.http.sendRequest("/create_user_zhanghao",data,onCreate);
	},

    enterRoom:function(roomId,callback){
        var self = this;
        var onEnter = function(ret){
            if(ret.errcode !== 0){
                if(ret.errcode == -1){
                    setTimeout(function(){
                        self.enterRoom(roomId,callback);
                    },5000);
                }
                else{
                    cc.vv.wc.hide();
                    if(callback != null){
                        callback(ret);
                    }
                }
            }
            else{
                cc.vv.wc.hide();
                if(callback != null){
                    callback(ret);
                }
               // setTimeout(() => {
                    cc.vv.gameNetMgr.connectGameServer(ret);
               // }, 2000);

            }
        };

        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            roomid:roomId,
            latitude:cc.vv.userMgr.latitude,
            lontitude:cc.vv.userMgr.lontitude,
            sex:cc.vv.userMgr.sex,
        };
        cc.vv.wc.show("正在进入房间 " + roomId);
        cc.vv.http.sendRequest("/enter_private_room",data,onEnter);
    },
    getHistoryList:function(callback){
        var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                console.log(ret.history);
                if(callback != null){
                    callback(ret.history);
                }
            }
        };

        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
        };
        cc.vv.http.sendRequest("/get_history_list",data,onGet);
    },
    getGamesOfRoom:function(uuid,callback){
        var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                console.log(ret.data);
                callback(ret.data);
            }
        };

        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            uuid:uuid,
        };
        cc.vv.http.sendRequest("/get_games_of_room",data,onGet);
    },

    getDetailOfGame:function(uuid,index,callback){
        var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                console.log(ret.data);
                callback(ret.data);
            }
        };

        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            uuid:uuid,
            index:index,
        };
        cc.vv.http.sendRequest("/get_detail_of_game",data,onGet);
    },

});
