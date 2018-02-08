var Net = require("Net")
var Global = require("Global")
cc.Class({
    extends: cc.Component,

    properties: {
        lblName: cc.Label,
        lblMoney: cc.Label,
        lblGems: cc.Label,
        lblID: cc.Label,
        lblNotice: cc.Label,
        joinGameWin: cc.Node,
        createRoomWin: cc.Node,
        settingsWin: cc.Node,
        helpWin: cc.Node,
        xiaoxiWin: cc.Node,
        btnJoinGame: cc.Node,
        btnReturnGame: cc.Node,
        sprHeadImg: cc.Sprite,
        roomwindow: cc.Node,
        userinfo: cc.Node,
        paihangbang: cc.Node,
        shezhi: cc.Node,
        mailinfo: cc.Prefab,
        taskinfo: cc.Prefab,
        mail: cc.Node,
        task: cc.Node,
        zsfk: cc.Node,
        chongzhongP: cc.Prefab,
        chongzhongC: cc.Node,
        duihuanC: cc.Node,
        duihuanP: cc.Prefab,
        paihangbangPrefab: cc.Prefab,
        paihangbangco: cc.Node,
        wupininfo: cc.Prefab,

        // foo: {
        //    default: null,
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

    onShare: function () {
        cc.vv.anysdkMgr.share("豆乐棋牌", "豆乐棋牌，欢迎您进入游戏。");
    },
    onzsfk123123: function () {
        this.zsfk.active = false;
    },
    // use this for initialization
    onLoad: function () {
        cc.vv.audioMgr.playBGM('kong.mp3');
        var fkinfo = cc.sys.localStorage.getItem("fkinfo");
        if (fkinfo == "true") {
            cc.vv.userMgr.zhuangtai = true;
            cc.find("Canvas/bottom_left").active = false;
            cc.find("Canvas/gamelist").active = false;
            cc.find("Canvas/top/right_bottom/RoomCard").active = false;
            cc.find("Canvas/top/right_bottom/Gold").active = false;
            cc.find("Canvas/top/right_bottom/Score").active = true;
            cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
            cc.find("Canvas/FK/bottom_left").active = true;
            cc.find("Canvas/FK/gamelist").active = true;
            cc.find("Canvas/FK/fkx").active = true;
            cc.find("Canvas/background/maintitle").active = false;
            cc.find("Canvas/background/YP").active = true;
            cc.sys.localStorage.setItem("fkinfo", false);
        }
        if (cc.vv.userMgr.fanhui == 0) {
            cc.find("Canvas/bottom_left").active = true;
            cc.find("Canvas/gamelist").active = true;
            cc.find("Canvas/top/right_bottom/RoomCard").active = true;
            cc.find("Canvas/top/right_bottom/Gold").active = true;
            cc.find("Canvas/top/right_bottom/Score").active = false;
            cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
            cc.find("Canvas/FK/bottom_left").active = false;
            cc.find("Canvas/FK/gamelist").active = false;
            cc.find("Canvas/FK/fkx").active = false;
            cc.find("Canvas/background/maintitle").active = true;
            cc.find("Canvas/background/YP").active = false;
            cc.vv.userMgr.fanhui++;
        }
        cc.sys.localStorage.setItem("fkinfo", false);
        if (!cc.sys.isNative && cc.sys.isMobile) {
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        if (!cc.vv) {
            cc.director.loadScene("loading");
            return;

        }


        var roomId = cc.vv.userMgr.oldRoomId
        if (roomId != null) {
            cc.vv.userMgr.oldRoomId = null;
            cc.vv.userMgr.enterRoom(roomId);
        }



        this.addComponent("UserInfoShow");



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

        var self = this;
        var desc = cc.vv.anysdkMgr.getGPSLocation();

        if (desc != "" && (desc.indexOf("locType:61") > -1 || desc.indexOf("locType:161") > -1)) {
            clearInterval(self._selfTimer);
            cc.vv.gameNetMgr.strGps = desc;
            var strdesc = desc.split("-");
            var latitudestr = strdesc[1].split(":");

            var latitude = latitudestr[1];

            var lontitudestr = strdesc[2].split(":");

            var lontitude = lontitudestr[1];


            cc.vv.userMgr.latitude = latitude;
            cc.vv.userMgr.lontitude = lontitude;


            cc.vv.userMgr.hallgps = true;
        } else {

            cc.vv.userMgr.hallgps = false;
        }
        this.onRefushCoin();
         var callback=function(){



            if(cc.sys.localStorage.getItem("fkinfo")=="false"){
                self.onRefushCoin();
                self.check_version();

                desc = cc.vv.anysdkMgr.getGPSLocation();
               // if (desc.indexOf("locType : 61")>-1){
                    if(desc != "" && (desc.indexOf("locType:61")>-1||desc.indexOf("locType:161")>-1))
                    {
                            cc.vv.gameNetMgr.strGps=desc;
                            var strdesc=desc.split("-");
                            var latitudestr=strdesc[1].split(":");
                            var latitude=latitudestr[1];
                            var lontitudestr=strdesc[2].split(":");
                            var lontitude=lontitudestr[1];
                            cc.vv.userMgr.latitude=latitude;
                            cc.vv.userMgr.lontitude=lontitude;
                        cc.vv.userMgr.hallgps=true;
                    }else{
                        cc.vv.userMgr.hallgps=false;
                    }


                }
        }
        this.schedule(callback, 3);
        this.refreshInfo();
        this.refreshNotice();
        this.refreshGemsTip();
        //  cc.vv.audioMgr.playBGM("bgMain.mp3");
        //   cc.vv.audioMgr.resumeAll();
        cc.vv.utils.addEscEvent(this.node);


    },
    check_version(){
        var self = this;
        var version;
        var onGet=function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                version=ret.version
                if(cc.sys.localStorage.getItem("version")==null){
                    cc.sys.localStorage.setItem("version",version);
                }else{
                    var oldversion=cc.sys.localStorage.getItem("version");
                    if(oldversion!=version){
                        cc.sys.localStorage.setItem("version",version);
                       // cc.vv.wc.show("发现更新，开始检测安装");
                        var _url=cc.vv.http.url.split(':');
                        var new_url=_url[0]+":"+_url[1]+":9000";
                 //     cc.vv.http.url = "http://192.168.0.150:9000" ;
                        cc.vv.http.url =new_url;
                        setTimeout(function(){
                            cc.game.restart();
                        },1000);

                    }
                }
            }
        }
        cc.vv.http.sendRequest("/get_game_version",{},onGet);
    },
    alertTishi:function () {
      cc.vv.alert.show("提示","尽情期待！");
    },
    intmailinfo: function () {
        var data = {
            account: cc.vv.userMgr.userId
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                var mails = [];
                self.mail.removeAllChildren();
                console.log(ret);

                for (var i = 0; i < ret.mailsum[0].mailsum; i++) {
                    var xinxi = cc.instantiate(self.mailinfo);
                    var time = new Date(parseInt(ret.mailinfo[i].create_time) * 1000).toLocaleDateString()
                    xinxi.getComponent("mailinfo").init(ret.mailinfo[i].title, time, ret.mailinfo[i].id, ret.mailinfo[i].neirong, ret.mailinfo[i].wupin, true);
                    self.mail.addChild(xinxi);
                    // mails.push(xinxi);
                }


                // var puke= cc.instantiate(this.card);
                // puke.getComponent("card").init(holds[i].val,holds[i].suit,zhuang,"noback");
                // puke.val=holds[i].val;
                // puke.suit=holds[i].suit;
                // myholds.addChild(puke);
            }
        };


        cc.vv.http.sendRequest("/intmail", data, onCreate);
    },


    /**
     *
     * app.get('/intmail', function (req, res) {
	var account = req.query.account;
	if (!check_account(req, res)) {
		return;
	}
	var account = data.account;
	db.get_mail_sum(account, function (data) {
		if (data == null) {
			http.send(res, -1, "system error");
			return;
		}else{
			var userId = data.userid;
			db.get_mail_info(access, function (data1) {
				if(data!=null){
					http.send(res, 0, "ok", { mailsum:data,mailinfo:data1 });
				}else{
					http.send(res, -1, "no",'no info');
					return;
				}

			});
		}

	});
});
     */



    onSheZhi: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        if (event.target.name == "guan") {
            this.shezhi.getChildByName("jingyin").getChildByName("kai").active = true;
            this.shezhi.getChildByName("jingyin").getChildByName("guan").active = true;

        } else if (event.target.name == "kai") {
            this.shezhi.getChildByName("jingyin").getChildByName("kai").active = false;
            this.shezhi.getChildByName("jingyin").getChildByName("guan").active = true;
        } else if (event.target.name == "guan1") {
            this.shezhi.getChildByName("zhendong").getChildByName("kai1").active = true;
            this.shezhi.getChildByName("zhendong").getChildByName("guan1").active = false;
            var kai = true;
            cc.sys.localStorage.setItem("jushuxuanze", kai);
        } else if (event.target.name == "kai1") {
            this.shezhi.getChildByName("zhendong").getChildByName("kai1").active = false;
            this.shezhi.getChildByName("zhendong").getChildByName("guan1").active = true;
            var kai = false;
            cc.sys.localStorage.setItem("jushuxuanze", kai);
        }
    },
    onUserInfoExit: function () {
        this.userinfo.active = false;
    },
    onInputFinished: function (roomId) {
        cc.vv.userMgr.enterRoom(roomId, function (ret) {
            if (ret.errcode == 0) {
                // this.node.active = false;
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
    },
    refreshInfo: function () {
        var self = this;
        var onGet = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                if (ret.gems != null) {
                    this.lblGems.string = ret.gems;
                }
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
        };
        cc.vv.http.sendRequest("/get_user_status", data, onGet.bind(this));
    },
    onfuzhi: function () {
        var wx = cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hzsalert/wx").getComponent(cc.Label).string;
        cc.vv.anysdkMgr.copyClipboard(wx);
        //data.detail[i]
        var seq = cc.sequence(cc.show(), cc.fadeIn(1.0), cc.delayTime(1), cc.fadeOut(1.0));
        var js = cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hkuang");
        js.active = true;
        js.runAction(seq);
    },
    onfuzhi1: function () {
        var wx = "doule123";
        cc.vv.anysdkMgr.copyClipboard(wx);
        //data.detail[i]
        var seq = cc.sequence(cc.show(), cc.fadeIn(1.0), cc.delayTime(1), cc.fadeOut(1.0));
        var js = cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hkuang");
        js.runAction(seq);
    },
    refreshGemsTip: function () {
        var self = this; 1
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
    onBtnClicked: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        if (event.target.name == "btn_shezhi") {
            this.settingsWin.active = true;

        }
        else if (event.target.name == "btn_help") {
            this.helpWin.active = true;
        }
        else if (event.target.name == "btn_xiaoxi") {
            this.xiaoxiWin.active = true;
        }
        else if (event.target.name == "head") {
            cc.vv.userinfoShow.show(cc.vv.userMgr.userName, cc.vv.userMgr.userId, this.sprHeadImg, cc.vv.userMgr.sex, cc.vv.userMgr.ip, cc.vv.userMgr.charm, cc.vv.userMgr.lv, cc.vv.userMgr.jinbichangnum, cc.vv.userMgr.jinbichangshenglv, cc.vv.userMgr.coins, cc.vv.userMgr.jintiao);
        } else if (event.target.name == "fangjian") {
            this.roomwindow.active = true;
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1), cc.callFunc(function () {
                this.roomwindow.getComponent("RoomWindow").getrooms();
            }, this, 0));
            this.roomwindow.runAction(seq);

            // this.roomwindow.getComponent("RoomWindow").getrooms();

        }
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    onBtnTask: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        if (event.target.name == "meiriqiandao") {
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            this.task.getChildByName("Dailytasks").active = false;
        } else if (event.target.name == "hmeirirenwu") {
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            this.task.getChildByName("Dailytasks").active = true;
        }
    },
    onJoinGameClicked: function () {

        if (cc.vv.gameNetMgr.roomId !== null) {
            cc.vv.alert.show("提示", "您即将返回房间", function () {
                cc.vv.wc.show("正在进入房间");
                cc.director.loadScene(cc.vv.gameNetMgr.returngame);
            }.bind(this), true);
        } else {
            this.joinGameWin.active = true;
        }


    },
    onReturnGameClicked: function () {
        cc.vv.wc.show('正在返回游戏房间');
        cc.director.loadScene("mjgame");
    },

    onBtnAddGemsClicked: function () {
        cc.vv.alert.show("提示", cc.vv.userMgr.gemstip.msg, function () {
            this.onBtnTaobaoClicked();
        }.bind(this));
        this.refreshInfo();
    },

    onCreateRoomClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        if (cc.vv.gameNetMgr.roomId != null) {
            cc.vv.alert.show("提示", "房间已经创建!\n必须解散当前房间才能创建新的房间");
            return;
        }
        console.log("onCreateRoomClicked");
        this.createRoomWin.active = true;
    },
    createRoom: function () {

        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        //  cc.director.loadScene("hall_vip");
        setTimeout(() => {



            cc.vv.userMgr.zhuangtai = true;
            cc.find("Canvas/bottom_left").active = false;
            cc.find("Canvas/gamelist").active = false;
            cc.find("Canvas/top/right_bottom/RoomCard").active = false;
            cc.find("Canvas/top/right_bottom/Gold").active = false;
            cc.find("Canvas/top/right_bottom/Score").active = true;
            cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
            cc.find("Canvas/FK/bottom_left").active = true;
            cc.find("Canvas/FK/gamelist").active = true;
            cc.find("Canvas/FK/fkx").active = true;
            cc.find("Canvas/background/maintitle").active = false;
            cc.find("Canvas/background/YP").active = true;




            cc.find("Canvas/center/gamelist").active = false;
            cc.find("Canvas/background/jbtitle").active = false;
            cc.find("Canvas/center/back").active = false;
            cc.find("Canvas/background/maintitle").active = false;
            cc.find("Canvas/gamelist").active = false;

            cc.find("Canvas/gamelist").active = false;
            cc.find("Canvas/SJ/gamelist").active = false;
            cc.find("Canvas/SJ/fkx").active = false;
            cc.find("Canvas/background/maintitle").active = false;
          //  cc.find("Canvas/background/sj").active = false;
        }, 120);


    },

    fkhoutui: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        cc.vv.userMgr.zhuangtai = true;
        cc.find("Canvas/bottom_left").active = true;
        cc.find("Canvas/gamelist").active = true;
        cc.find("Canvas/top/right_bottom/RoomCard").active = true;
        cc.find("Canvas/top/right_bottom/Gold").active = true;
        cc.find("Canvas/top/right_bottom/Score").active = false;
        //   cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
        cc.find("Canvas/FK/bottom_left").active = false;
        cc.find("Canvas/FK/gamelist").active = false;
        cc.find("Canvas/FK/fkx").active = false;
        cc.find("Canvas/background/maintitle").active = true;
        cc.find("Canvas/background/YP").active = false;
    },

    createRoom_shangjin: function () {
        setTimeout(() => {
            if (cc.vv.gameNetMgr.roomId !== null) {
                cc.vv.alert.show("提示", "您即将返回房间", function () {
                    cc.vv.wc.show("正在进入房间");
                    cc.director.loadScene(cc.vv.gameNetMgr.returngame);
                    //cc.sys.localStorage.setItem("fkinfo",true);
                }.bind(this), true);
            } else {
                cc.vv.userMgr.zhuangtai = true;
                cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
                //  cc.director.loadScene("hall_vip");


                cc.find("Canvas/gamelist").active = false;
                cc.find("Canvas/SJ/gamelist").active = true;
                cc.find("Canvas/SJ/fkx").active = true;
                cc.find("Canvas/background/maintitle").active = false;
                cc.find("Canvas/background/sj").active = true;






                cc.find("Canvas/center/gamelist").active = false;
                cc.find("Canvas/background/jbtitle").active = false;
                cc.find("Canvas/center/back").active = false;
                cc.find("Canvas/background/maintitle").active = false;
                cc.find("Canvas/gamelist").active = false;

               // cc.find("Canvas/bottom_left").active = false;
                cc.find("Canvas/gamelist").active = false;
              //  cc.find("Canvas/top/right_bottom/RoomCard").active = false;
             //   cc.find("Canvas/top/right_bottom/Gold").active = false;
                cc.find("Canvas/top/right_bottom/Score").active = false;
            // cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
                cc.find("Canvas/FK/bottom_left").active = false;
                cc.find("Canvas/FK/gamelist").active = false;
                cc.find("Canvas/FK/fkx").active = false;
                cc.find("Canvas/background/maintitle").active = false;
                cc.find("Canvas/background/YP").active = false;

                //  cc.director.loadScene("hall_sjvip");
                //  cc.vv.alert.show("提示","赏金场修改中。。。");
            }
        }, 120);

    },
    SJhoutui: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        cc.vv.userMgr.zhuangtai = true;
        cc.find("Canvas/bottom_left").active = true;
        cc.find("Canvas/gamelist").active = true;
        cc.find("Canvas/SJ/gamelist").active = false;
        cc.find("Canvas/SJ/fkx").active = false;
        cc.find("Canvas/background/maintitle").active = true;
        cc.find("Canvas/background/sj").active = false;
    },
    createRoom_jinbi: function () {
        setTimeout(() => {
            if (cc.vv.gameNetMgr.roomId !== null) {
                cc.vv.alert.show("提示", "您即将返回房间", function () {
                    cc.vv.wc.show("正在进入房间");
                    cc.director.loadScene(cc.vv.gameNetMgr.returngame);
                    //   cc.sys.localStorage.setItem("fkinfo",true);
                }.bind(this), true);
            } else {
                cc.vv.userMgr.zhuangtai = true;
                cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");



                cc.find("Canvas/center/gamelist").active = true;
                cc.find("Canvas/background/jbtitle").active = true;
                cc.find("Canvas/center/back").active = true;
                cc.find("Canvas/background/maintitle").active = false;
                cc.find("Canvas/gamelist").active = false;



                          cc.find("Canvas/gamelist").active = false;
                cc.find("Canvas/SJ/gamelist").active = false;
                cc.find("Canvas/SJ/fkx").active = false;
                cc.find("Canvas/background/maintitle").active = false;
                cc.find("Canvas/background/sj").active = false;

             //   cc.find("Canvas/bottom_left").active = false;
                cc.find("Canvas/gamelist").active = false;
              //  cc.find("Canvas/top/right_bottom/RoomCard").active = false;
             //   cc.find("Canvas/top/right_bottom/Gold").active = false;
                cc.find("Canvas/top/right_bottom/Score").active = false;
            // cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
                cc.find("Canvas/FK/bottom_left").active = false;
                cc.find("Canvas/FK/gamelist").active = false;
                cc.find("Canvas/FK/fkx").active = false;
                cc.find("Canvas/background/maintitle").active = false;
                cc.find("Canvas/background/YP").active = false;



            }
        }, 120);

        // cc.director.loadScene("hall_jbvip");
    },

    onBtnTaobaoClicked: function () {
        cc.sys.openURL('https://shop596732896.taobao.com/');
    },
    /**
     * 实名认证
     */
    onShiMing: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        if (event.target.name == "hbg") {
            this.userinfo.getChildByName("shiming").active = false;
        } else if (event.target.name == "shiming") {
            if (cc.vv.userMgr.isuuidyes == 0) {
                this.userinfo.getChildByName("shiming").active = true;
            } else {
                cc.vv.alert.show("提示", "身份证已经绑定了,不用重复绑定！");
            }

        } else if (event.target.name == "hbg") {
            this.userinfo.getChildByName("shiming").active = false;
        } else if (event.target.name == "hshiming") {
            this.userinfo.getChildByName("shiming").active = false;
        } else if (event.target.name == "qhzhanghao") {


            cc.vv.alert.show("提示", "是否要切换账号！", function () {
                cc.sys.localStorage.removeItem("wx_account");
                cc.sys.localStorage.removeItem("wx_sign");
                cc.director.loadScene("login");
            }.bind(this), true);
        } else if (event.target.name == "tijiao") {

            if (/^\d{17}(\d|x)$/i.test(this.userinfo.getChildByName("shiming").getChildByName("haoma").getComponent(cc.EditBox).string)) {
                var data = {
                    userid: cc.vv.userMgr.userId,
                    name: this.userinfo.getChildByName("shiming").getChildByName("xingming").getComponent(cc.EditBox).string,
                    uuid: this.userinfo.getChildByName("shiming").getChildByName("haoma").getComponent(cc.EditBox).string,
                }
                var self = this;
                var onCreate = function (ret) {
                    if (ret == "") {
                        console.log(ret.errmsg);
                    }
                    else {
                        cc.vv.alert.show("提示", "身份证绑定成功！");
                        cc.vv.userMgr.isuuidyes = 1;
                        self.userinfo.getChildByName("shiming").active = false;
                    }
                };
                cc.vv.http.sendRequest("/shimingrengzheng", data, onCreate);

            } else {
                cc.vv.alert.show("提示", "请输入正确的身份证号！");
            }

        }
    },
    onBtnXiaoxiiClicked1: function () {
        this.intmailinfo();
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/xiaoxi1");
        game.active = true;

    },
    onBtnXClicked: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/xiaoxi1");
        game.active = false;
        var game = cc.find("Canvas/xiaoxi1/news");
        game.active = false;
    },
    onBtnMessageHomepageClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");

        var game = cc.find("Canvas/xiaoxi1/news");
        game.active = true;
    },
    onBtnTaskClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");

        var game = cc.find("Canvas/task");
        game.active = true;
        // this.intmailinfo();

        var data = {
            ok: "ok",
            userid: cc.vv.userMgr.userId
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret == "") {
                console.log(ret.errmsg);
            }
            else {
                cc.log(ret);
                console.log(ret);
                self.task.removeAllChildren();
                ret.taskState[0].taskInfo = JSON.parse(ret.taskState[0].taskInfo);
                for (var i = 0; ret.ret.length; i++) {
                    if (ret.ret[i].type != 1) continue;
                    if (ret.ret[i].type == 0) continue;
                    var jiangli = JSON.parse(ret.ret[i].reward);
                    var daili = cc.instantiate(self.taskinfo);
                    console.log(jiangli.wupin[0]);
                    var zongNum = 0; var Num = 0;var l="0";
                  
                     ret.ret[i].type_json = JSON.parse(ret.ret[i].type_json);  // ret[i].type_json = JSON.parse(ret[i].type_json);
                                     
                    //var info1 = JSON.parse(type_json);
                    if (ret.ret[i].type_json.taskgame[0].taskNum == -1) {
                        zongNum = ret.ret[i].type_json.taskgame[0].zongWinNum;
                        Num = ret.taskState[0].taskInfo[i].zongWinNum;
                    } else if (ret.ret[i].type_json.taskgame[0].zongWinNum == -1) {
                        zongNum = ret.ret[i].type_json.taskgame[0].taskNum;
                        Num = ret.taskState[0].taskInfo.taskgame[i].taskNum;
                    }
                    daili.getComponent("renwuinfo").init(ret.ret[i].name, jiangli.wupin[0].wupin, jiangli.wupin[0].shuliang, jiangli.wupin[1].wupin, jiangli.wupin[1].shuliang, jiangli.wupin[2].wupin, jiangli.wupin[2].shuliang, zongNum, Num, jiangli.wupin[0]);
                    self.task.addChild(daili);
                }
            }

        };
        cc.vv.http.sendRequest("/renwuinfo", data, onCreate);
        console.log(data);
    },

    onBtnTaskXClicked: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/task");
        game.active = false;
    },
    onBtnBeibaoClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/beibao");
        game.active = true;
        this.jindousum = 0;
        cc.vv.userMgr.coins1 = cc.vv.userMgr.coins;
        var xiedai = cc.find("Canvas/beibao/beibaoinfo/view/content/kuang/xiedaishuliang").getComponent(cc.Label);

        xiedai.string = cc.vv.userMgr.coins;


        var data = {
            userid: cc.vv.userMgr.userId,
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                var beibaowuppininfo1 = cc.find("Canvas/beibao/beibaoinfo/view/content/wupin");
                beibaowuppininfo1.removeAllChildren();
                console.log(ret);
                console.log(ret.beibao_info);
                for (var i = 0; i < ret.str.wupin.length; i++) {
                    if (ret.str.wupin[i].name == "") continue;
                    if (ret.str.wupin.length == 0) continue;
                    var daili = cc.instantiate(self.wupininfo);
                    daili.getChildByName("scripts").getComponent("beibaoinfo").init(ret.str.wupin[i].wupin, ret.str.wupin[i].shuliang);
                    beibaowuppininfo1.addChild(daili);
                }
                cc.find("Canvas/beibao/beibaoinfo/view/content/kuang/chucunshuliang").getComponent(cc.Label).string = ret.ret[0].storage_info;
            }
        };
        cc.vv.http.sendRequest("/beibaoinfo", data, onCreate);
        console.log(data);


    },
    onBtnBeibaoXClicked: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/beibao");
        game.active = false;
    },
    onBtnDuihuanClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/duihuan");
        game.active = true;
        var game = cc.find("Canvas/duihuan").getChildByName("wupin").active = true;
        var game = cc.find("Canvas/duihuan").getChildByName("wupin1").active = false;
    },
    onBtnDuihuanjILV: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        cc.find("Canvas/duihuan").getChildByName("wupin").active = false;
        cc.find("Canvas/duihuan").getChildByName("wupin1").active = true;
        var data = {
            userid: cc.vv.userMgr.userId,
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret == "") {
                console.log(ret.errmsg);
            }
            else {
                self.duihuanC.removeAllChildren();

                for (var i = 0; i < ret.length; i++) {
                    var daili = cc.instantiate(self.duihuanP);
                    var str = "恭喜你获得金币：1000"
                    daili.getComponent("duihuan").initduihuanjilv(str);
                    self.duihuanC.addChild(daili);
                }

            }
        };
        cc.vv.http.sendRequest("/GetDuihuan", data, onCreate);
        console.log(data);
    },
    onUserInfoCdk: function () {
        cc.vv.userMgr.zhuangtai = true;
        var cdk = cc.find("Canvas/top/userinfo/jintiao/CDK").getComponent(cc.EditBox);
        if (cdk.string == "") {
            cc.vv.alert.show("提示", "请输入正确的CDK，不能为空");
            return;
        }
        var data = {
            userid: cc.vv.userMgr.userId,
            cdk: cdk.string,
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret == "") {
                console.log(ret);
            }
            else {
                cc.vv.alert.show("提示", ret);
            }
        };
        cc.vv.http.sendRequest("/GetCdk", data, onCreate);
        console.log(data);

    },
    onBtnDuihuanXClicked: function () {
        var game = cc.find("Canvas/duihuan");
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        game.active = false;
        cc.find("Canvas/duihuan/zuanshi/zs").getComponent(cc.Label).string = cc.vv.userMgr.zuanshi;
    },
    onBtnZhuanpanClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/xyzp");
        game.active = true;

        cc.find("Canvas/xyzp/renwu/jt/jtsl").getComponent(cc.Label).string = cc.vv.userMgr.jintiao;
        cc.find("Canvas/xyzp/renwu/zs/zssl").getComponent(cc.Label).string = cc.vv.userMgr.coins;
        cc.find("Canvas/xyzp/renwu/ncinfo").getComponent(cc.Label).string = cc.vv.userMgr.userName;
        var tx = cc.find("Canvas/xyzp/renwu/tx");
        var imgLoader = tx.getComponent("ImageLoader");
        imgLoader.setUserID(cc.vv.userMgr.userId);
        var data = {
            userid: cc.vv.userMgr.userId,
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret == "") {
                console.log(ret);
            }
            else {
                self.chongzhongC.removeAllChildren();
                for (var i = 0; i < ret.length; i++) {
                    var daili = cc.instantiate(self.chongzhongP);
                    daili.getComponent("chouzhong").init(ret[i].name, ret[i].chouzhong);
                    self.chongzhongC.addChild(daili);
                }

                for (var i = 0; i < ret.str.wupin.length; i++) {
                    if (ret.str.wupin[i].name == "") continue;
                    if (ret.str.wupin.length == 0) continue;

                }
            }
        };
        cc.vv.http.sendRequest("/getchongzhong", data, onCreate);
        console.log(data);
    },
    onBtnZhuanpanXClicked: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/xyzp");
        game.active = false;
    },
    onBtnPaihangbangClicked: function () {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/huodong");
        game.active = true;
        var data = {
            ok: "ok",
            userid: cc.vv.userMgr.userId,
        }

        var self = this;
        var onCreate = function (ret) {
            if (ret == "") {
                console.log(ret.errmsg);
            }
            else {
                //排行榜
                console.log(ret);
                var is = "";
                self.paihangbangco.removeAllChildren();
                for (var i = 0; i < ret.ret.length; i++) {
                    if (ret.ret[i].userid == cc.vv.userMgr.userId) {
                        is = i;
                    }
                    var daili = cc.instantiate(self.paihangbangPrefab);
                    var name = ret.ret[i].name;
                    var id = ret.ret[i].userid;
                    var jf = ret.ret[i].lv;
                    daili.getComponent("paihangbang").init(name, id, jf, i);
                    self.paihangbangco.addChild(daili);
                }
                var ren = cc.find("Canvas/huodong/jingcaihuodong/jscb/my_bg/ren");
                ren.getChildByName("name").getComponent(cc.Label).string = cc.vv.userMgr.userName;
                ren.getChildByName("id").getComponent(cc.Label).string = "ID:" + cc.vv.userMgr.userId;
                ren.getChildByName("jifen").getComponent(cc.Label).string = cc.vv.userMgr.lv;
                if (is == 0 && is != "") {
                    ren.getChildByName("jiangbei").getChildByName("one").active = true;
                    ren.getChildByName("jiangbei").getChildByName("two").active = false;
                    ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                    ren.getChildByName("jiangbei").getChildByName("diji").active = false;
                    cc.find("Canvas/huodong/jingcaihuodong/jscb/my_bg/ren/tishi").getComponent(cc.Label).string = "第" + (is + 1) + "名！恭喜！";
                } else if (is == 1) {
                    ren.getChildByName("jiangbei").getChildByName("one").active = false;
                    ren.getChildByName("jiangbei").getChildByName("two").active = true;
                    ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                    ren.getChildByName("jiangbei").getChildByName("diji").active = false;
                    cc.find("Canvas/huodong/jingcaihuodong/jscb/my_bg/ren/tishi").getComponent(cc.Label).string = "第" + (is + 1) + "名！恭喜！";
                } else if (is == 2) {
                    ren.getChildByName("jiangbei").getChildByName("one").active = false;
                    ren.getChildByName("jiangbei").getChildByName("two").active = false;
                    ren.getChildByName("jiangbei").getChildByName("Three").active = true;
                    ren.getChildByName("jiangbei").getChildByName("diji").active = false;
                    cc.find("Canvas/huodong/jingcaihuodong/jscb/my_bg/ren/tishi").getComponent(cc.Label).string = "第" + (is + 1) + "名！恭喜！";
                } else if (is > 2 & is < 11) {
                    ren.getChildByName("jiangbei").getChildByName("one").active = false;
                    ren.getChildByName("jiangbei").getChildByName("two").active = false;
                    ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                    ren.getChildByName("jiangbei").getChildByName("diji").active = true;
                    ren.getChildByName("jiangbei").getChildByName("diji").getChildByName("dengji").getComponent(cc.Label).string = is + 1;
                    cc.find("Canvas/huodong/jingcaihuodong/jscb/my_bg/ren/tishi").getComponent(cc.Label).string = "第" + (is + 1) + "名！恭喜！";
                } else {
                    ren.getChildByName("jiangbei").getChildByName("one").active = false;
                    ren.getChildByName("jiangbei").getChildByName("two").active = false;
                    ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                    ren.getChildByName("jiangbei").getChildByName("diji").active = true;
                    // ren.getChildByName("jiangbei").getChildByName("diji").getChildByName("dengji").getComponent(cc.Label).string="未上榜"
                    cc.find("Canvas/huodong/jingcaihuodong/jscb/my_bg/ren/jiangbei/diji/dengji").getComponent(cc.Label).string = "未上榜";
                }
            }
        };
        cc.vv.http.sendRequest("/paihangbang", data, onCreate);
        console.log(data);
    },
    mailshouqu: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var beibaowenjian = cc.vv.userMgr.beibao_info;
        beibaowenjian = JSON.parse(beibaowenjian);
        beibaowenjian.wupin.push({
            name: "钟",
            sum: 5,
            tupian: "zhong"
        });

        //  cc.vv.userMgr.beibao_info=beibaowenjian;
        var last = JSON.stringify(beibaowenjian);
        cc.vv.userMgr.beibao_info = last;
        var data = {
            userid: cc.vv.userMgr.userId,
        }

        var self = this;
        var onCreate = function (ret) {
            cc.vv.alert.show("提示", "恭喜你，领取成功！");
            console.log("领取成功！");
            var last = JSON.stringify(beibaowenjian);
            cc.vv.userMgr.beibao_info = last;
        };
        cc.vv.http.sendRequest("/maillingqu", data, onCreate);

    },
    onJinQingQidai:function () {
      cc.vv.alert.show("提示","敬请期待！");
    },
    onRefushCoin: function () {

        //     cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var data = {
            userid: cc.vv.userMgr.userId,
        }
        var self = this;
        var getMoney = function (ret) {
            console.log("ret", ret);
            cc.find("Canvas/xyzp/renwu/jt/jtsl").getComponent(cc.Label).string = ret[0].jintiao;
            cc.find("Canvas/xyzp/renwu/zs/zssl").getComponent(cc.Label).string = ret[0].coins;
            cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = ret[0].gems;
            cc.vv.userMgr.coins = ret[0].coins;
            cc.vv.userMgr.jintiao = ret[0].jintiao;
            cc.vv.userMgr.gems = ret[0].gems;
        };
        cc.vv.http.sendRequest("/get_money", data, getMoney);

    },
    onBtnPaihangbangXClicked: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/paihangbang");
        game.active = false;
    },
    onBtnHuodongPangX: function () {
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var game = cc.find("Canvas/huodong");
        game.active = false;
    },
    paihangbang1: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if (event.target.name == "hhb") {
            this.paihangbang.getChildByName("xz").getChildByName("hb").active = true;
            this.paihangbang.getChildByName("xz").getChildByName("hhb").active = false;
            this.paihangbang.getChildByName("xz").getChildByName("jf").active = false;
            this.paihangbang.getChildByName("xz").getChildByName("hjf").active = true;
            this.paihangbang.getChildByName("hbph").active = true;
            this.paihangbang.getChildByName("jfph").active = false;

        } else if (event.target.name == "hjf") {
            this.paihangbang.getChildByName("xz").getChildByName("hb").active = false;
            this.paihangbang.getChildByName("xz").getChildByName("hhb").active = true;
            this.paihangbang.getChildByName("xz").getChildByName("jf").active = true;
            this.paihangbang.getChildByName("xz").getChildByName("hjf").active = false;
            this.paihangbang.getChildByName("hbph").active = false;
            this.paihangbang.getChildByName("jfph").active = true;
        }
    },

    onRenWuQianDaoQiehuan: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if (event.target.name == "meiriqiandao") {
            cc.find("Canvas/task/qiandao").active = true;
            cc.find("Canvas/task/Dailytasks").active = false;
        } else if (event.target.name == "meriirw2") {
            cc.find("Canvas/task/qiandao").active = false;
            cc.find("Canvas/task/Dailytasks").active = true;
        }
    },
    onShangCheng: function (event) {
        cc.vv.userMgr.zhuangtai = true;
        if (event.target.name == "shop") {
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            cc.find("Canvas/shopping").active = true;
        } else if (event.target.name == "btn_shopClose") {
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            cc.find("Canvas/shopping").active = false;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //  var self = this

        if (cc.vv && cc.vv.userMgr.roomData != null) {
            cc.vv.userMgr.enterRoom(cc.vv.userMgr.roomData);
            cc.vv.userMgr.roomData = null;
        }
    },
});
