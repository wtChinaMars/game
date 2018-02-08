cc.Class({
    extends: cc.Component,

    properties: {
        _sprIcon: null,
        _zhuang: null,
        _ready: null,
        _offline: null,
        _lblName: null,
        _lblScore: null,
        _scoreBg: null,
        _nddayingjia: null,
        _voicemsg: null,

        _chatBubble: null,
        _emoji: null,
        _lastChatTime: -1,

        _userName: "",
        _score: 0,
        _dayingjia: false,
        _isOffline: false,
        _isReady: false,
        _isZhuang: false,
        _userId: null,
    },

    // use this for initialization
    onLoad: function () {
        if (cc.vv == null) {
            return;
        }

        this._sprIcon = this.node.getChildByName("Z_user").getChildByName("icon").getComponent("ImageLoader");
        this._lblName = this.node.getChildByName("name").getComponent(cc.Label);
        this._lblScore = this.node.getChildByName("score").getComponent(cc.Label);
        this._voicemsg = this.node.getChildByName("voicemsg");
        this._xuanpai = this.node.getChildByName("xuanpai");
        this.refreshXuanPaiState();

        if (this._voicemsg) {
            this._voicemsg.active = false;
        }

        if (this._sprIcon && this._sprIcon.getComponent(cc.Button)) {
            cc.vv.utils.addClickEvent(this._sprIcon, this.node, "Seat", "onIconClicked");
        }


        this._offline = this.node.getChildByName("offline");

        this._ready = this.node.getChildByName("ready");

        this._zhuang = this.node.getChildByName("zhuang");

        this._scoreBg = this.node.getChildByName("Z_money_frame");
        this._nddayingjia = this.node.getChildByName("dayingjia");

        this._chatBubble = this.node.getChildByName("ChatBubble");
        if (this._chatBubble != null) {
            this._chatBubble.active = false;
        }

        this._emoji = this.node.getChildByName("emoji");
        if (this._emoji != null) {
            this._emoji.active = false;
        }

        this.refresh();

        if (this._sprIcon && this._userId) {
            this._sprIcon.setUserID(this._userId);
        }


    },

    onIconClicked: function () {


        var iconSprite = this._sprIcon.node.getComponent(cc.Sprite);
        if (this._userId != null && this._userId > 0) {
            var seat = cc.vv.gameNetMgr.getSeatByID(this._userId);
            var sex = 0;

            if (cc.vv.baseInfoMap) {
                var info = cc.vv.baseInfoMap[this._userId];
                if (info) {
                    sex = info.sex;
                }
            }

            cc.vv.userinfoShow_game.show(seat.name, seat.userid, iconSprite, sex, seat.ip);


        }
    },
    onBtnGps: function (event) {
        if (event.target.name == "a1") {
            cc.vv.net.send("gpsbaojing");
            this.gpsceshi();
        } else if (event.target.name == "a2") {
            cc.vv.net.send("gpsbaojing");
        } else if (event.target.name == "a3") {
            cc.vv.net.send("gpsbaojing");
        }
    },
    gpsceshi: function (data) {
        var name = this.node.getChildByName("gps2").getChildByName("gpstu").getChildByName("gpsname").getComponent(cc.Label);
        var juli = cc.vv.gameNetMgr.gpsJinggao.juli;
        var username = cc.vv.gameNetMgr.gpsJinggao.name;
        name.string = username + "距离太近:" + juli + "米";
    },
    ongps1: function () {
        var renshu = 0;
        for (var i = 0; i < cc.vv.gameNetMgr.seats.length; i++) {
            if (cc.vv.gameNetMgr.seats[i].userid > 0) {
                renshu++;
            }
        }
        if (renshu == 3) {
            var si = [];
            for (var i = 0; i < cc.vv.gameNetMgr.seats.length; i++) {
                if (this._userId != cc.vv.gameNetMgr.seats[i].userid) {
                    si.push(i);
                }
              
            }
            var juli = this.getDisance(cc.vv.gameNetMgr.seats[si[0]].latitude, cc.vv.gameNetMgr.seats[si[0]].lontitude, cc.vv.gameNetMgr.seats[si[1]].latitude, cc.vv.gameNetMgr.seats[si[1]].lontitude);
            var julijiedian = this.node.getChildByName("juliwenzi");
            juli=parseInt(juli);
            julijiedian.active = true;
            julijiedian.getChildByName("info").getComponent(cc.Label).string ="注意:"+cc.vv.gameNetMgr.seats[si[0]].name.substring(0, 3) + "距离:" + cc.vv.gameNetMgr.seats[si[1]].name.substring(0, 3) + juli + "米";



        } else if (renshu == 2) {
            var si = [];
            for (var i = 0; i < cc.vv.gameNetMgr.seats.length; i++) {
                if (cc.vv.gameNetMgr.seats[i].userid > 0) {
                    si.push(i);
                }
            }
            var juli = this.getDisance(cc.vv.gameNetMgr.seats[si[0]].latitude, cc.vv.gameNetMgr.seats[si[0]].lontitude, cc.vv.gameNetMgr.seats[si[1]].latitude, cc.vv.gameNetMgr.seats[si[1]].lontitude);
            var julijiedian = this.node.getChildByName("juliwenzi");
            julijiedian.active = true;
            juli=parseInt(juli);
            julijiedian.getChildByName("info").getComponent(cc.Label).string ="注意:"+ cc.vv.gameNetMgr.seats[si[0]].name.substring(0, 3) + "距离:" + cc.vv.gameNetMgr.seats[si[1]].name.substring(0, 3) + juli + "米";

        }
        setTimeout(() => {
            julijiedian.active = false;
        }, 2000);
    },
    toRad: function (d) { return d * Math.PI / 180; },
    getDisance: function (lat1, lng1, lat2, lng2) { //lat为纬度, lng为经度, 一定不要弄错
        var dis = 0;
        var radLat1 = this.toRad(lat1);
        var radLat2 = this.toRad(lat2);
        var deltaLat = radLat1 - radLat2;
        var deltaLng = this.toRad(lng1) - this.toRad(lng2);
        var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return dis * 6378137;
    },

    refresh: function () {
        if (this._lblName != null) {
            this._lblName.string = this._userName;
        }

        if (this._lblScore != null) {
            this._lblScore.string = this._score;
        }

        if (this._nddayingjia != null) {
            // this._nddayingjia.active = this._dayingjia == true;
        }

        if (this._offline) {
            this._offline.active = this._isOffline && this._userName != "";
        }

        if (this._ready) {
            this._ready.active = this._isReady && (cc.vv.gameNetMgr.numOfGames > 0);
        }

        if (this._zhuang) {
            //   this._zhuang.active = this._isZhuang;    
        }

        this.node.active = this._userName != null && this._userName != "";
    },

    setInfo(name, score, dayingjia) {
        this._userName = name;
        this._score = score;
        if (this._score == null) {
            this._score = 0;
        }
        this._dayingjia = dayingjia;

        if (this._scoreBg != null) {
            this._scoreBg.active = this._score != null;
        }

        if (this._lblScore != null) {
            this._lblScore.node.active = this._score != null;
        }

        this.refresh();
    },

    setZhuang: function (value) {
        this._isZhuang = value;
        if (this._zhuang) {
            this._zhuang.active = value;
        }
    },

    setReady: function (isReady) {
        this._isReady = isReady;
        if (this._ready) {
            this._ready.active = this._isReady;//&& (cc.vv.gameNetMgr.numOfGames > 0); 
        }
    },

    setID: function (id) {
        var idNode = this.node.getChildByName("id");
        if (idNode) {
            var lbl = idNode.getComponent(cc.Label);
            lbl.string = "ID:" + id;
        }

        this._userId = id;
        if (this._sprIcon) {
            this._sprIcon.setUserID(id);
        }
    },

    setOffline: function (isOffline) {
        this._isOffline = isOffline;
        if (this._offline) {
            this._offline.active = this._isOffline && this._userName != "";
        }
    },

    chat: function (content) {
        if (this._chatBubble == null || this._emoji == null) {
            return;
        }
        this._emoji.active = false;
        this._chatBubble.active = true;
        this._chatBubble.getComponent(cc.Label).string = content;
        this._chatBubble.getChildByName("New Label").getComponent(cc.Label).string = content;
        this._lastChatTime = 3;
    },

    emoji: function (emoji) {
        //emoji = JSON.parse(emoji);
        if (this._emoji == null || this._emoji == null) {
            return;
        }
        console.log(emoji);
        this._chatBubble.active = false;
        this._emoji.active = true;
        this._emoji.getComponent(cc.Animation).play(emoji);
        this._lastChatTime = 3;
    },

    voiceMsg: function (show) {
        if (this._voicemsg) {
            this._voicemsg.active = show;
        }
    },

    refreshXuanPaiState: function () {
        if (this._xuanpai == null) {
            return;
        }

        this._xuanpai.active = cc.vv.gameNetMgr.isHuanSanZhang;
        if (cc.vv.gameNetMgr.isHuanSanZhang == false) {
            return;
        }

        this._xuanpai.getChildByName("xz").active = false;
        this._xuanpai.getChildByName("xd").active = false;

        var seat = cc.vv.gameNetMgr.getSeatByID(this._userId);
        if (seat) {
            if (seat.huanpais == null) {
                this._xuanpai.getChildByName("xz").active = true;
            }
            else {
                this._xuanpai.getChildByName("xd").active = true;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this._lastChatTime > 0) {
            this._lastChatTime -= dt;
            if (this._lastChatTime < 0) {
                this._chatBubble.active = false;
                this._emoji.active = false;
                this._emoji.getComponent(cc.Animation).stop();
            }
        }
    },
});
