cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler: null,
        roomId: null,
        maxNumOfGames: 0,
        numOfGames: 0,
        speedTime: 0,
        numOfMJ: 0,
        seatIndex: -1,
        seats: null,
        returngame:"",
        turn: -1,
        jishu: 0,
        beishu: 0,
        rangpai: 0,
        button: -1,

        chupai: -1,
        chupuke: null,//当前出牌和人{pai:pai,useindex:userindex}
        winindex: -1,//当前最大牌玩家索引

        gamestate: "",
        isOver: false,
        dissoveData: null,
        dipai: [],
        strGps: "",
        GpsDistance: 0,
        juli: "",
        gps: false,
        jinyan: false,
        fapaiing: false,
        tiren: false,
        gpsJinggao: 0,

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

    reset: function () {
        this.turn = -1;
        this.chupai = -1,

        this.button = -1;
        this.gamestate = "";

        this.jishu = 0;
        this.beishu = 0;
        this.rangpai = 0;
        this.chupuke = null,
            this.winindex = -1,
            this.curaction = null;
        this.dipai = [];
        this.fapaiying = false;
        for (var i = 0; i < this.seats.length; ++i) {
            this.seats[i].holds = [];
            this.seats[i].folds = [];
            this.seats[i].ready = false;
            this.huanpaimethod = -1;
        }
    },

    clear: function () {
        this.dataEventHandler = null;
        if (this.isOver == null) {
            this.seats = null;
            this.roomId = null;
            this.maxNumOfGames = 0;
            this.numOfGames = 0;
        }
    },

    dispatchEvent(event, data) {
        if (this.dataEventHandler) {
            this.dataEventHandler.emit(event, data);
        }
    },

    getSeatIndexByID: function (userId) {
        for (var i = 0; i < this.seats.length; ++i) {
            var s = this.seats[i];
            if (s.userid == userId) {
                return i;
            }
        }
        return -1;
    },

    isOwner: function () {
        return this.seatIndex == 0;
    },

    getSeatByID: function (userId) {
        var seatIndex = this.getSeatIndexByID(userId);
        var seat = this.seats[seatIndex];
        return seat;
    },

    getSelfData: function () {
        return this.seats[this.seatIndex];
    },

    getLocalIndex: function (index) {
        var ret = (index - this.seatIndex + this.seats.length) % this.seats.length;
        return ret;
    },

    prepareReplay: function (roomInfo, detailOfGame) {
        this.roomId = roomInfo.id;
        this.seats = roomInfo.seats;
        this.turn = detailOfGame.base_info.button;
        var baseInfo = detailOfGame.base_info;

        for (var i = 0; i < this.seats.length; ++i) {
            var s = this.seats[i];
            s.seatindex = i;
            s.score = null;
            s.holds = baseInfo.game_seats[i];

            s.folds = [];
            console.log(s);
            if (cc.vv.userMgr.userId == s.userid) {
                this.seatIndex = i;
            }
        }
        this.conf = {
            type: baseInfo.type,
        }

        if (this.conf.type == null) {
            this.conf.type == "xzdd";
        }
    },

    getWanfa: function () {
        var conf = this.conf;
        if (conf && conf.maxGames != null) {
            var strArr = [];
            strArr.push(conf.maxGames + "局");
            if (conf.fanshu == 999999 || conf.fanshu == "999999") {
                strArr.push("无封顶");
            } else {
                strArr.push(conf.fanshu + "番封顶");
            }
            if (conf.jinyan == true) {
                strArr.push("禁言");
            }
            if (conf.jiabei == true) {
                strArr.push("可加倍");
                this._isjiabei= conf.jiabei;
            } else {
                strArr.push("无加倍");
            }

            return strArr.join(" ");
        }
        return "";
    },
    
    chongxinlianjie:function(){
        this.dispatchEvent("disconnect");
    },
    initHandlers: function () {
        var self = this;
        cc.vv.net.addHandler("login_result", function (data) {
            console.log(data);
            if (data.errcode === 0) {
                var data = data.data;
                self.roomId = data.roomid;
                self.conf = data.conf;
                self.maxNumOfGames = data.conf.maxGames;
                self.numOfGames = data.numofgames;
                self.jishu = data.conf.jishu;
                self.gps = data.conf.GPS;
                self.jinyan = data.conf.jinyan;
                //self.beishu=data.conf.beishu;
                self.seats = data.seats;

                    self.seatIndex = self.getSeatIndexByID(cc.vv.userMgr.userId);
                self.isOver = false;
            }
            else {
                console.log(data.errmsg);
            }
            self.dispatchEvent('login_result');
        });
        cc.vv.net.addHandler("login_finished", function (data) {
            console.log(data.gametype);
            var str = data.gametype;
            self.returngame=data.gametype;
            if (data.gametype == "fangkadoudizhu") {
                if (data.renshu == 2) {
                    str = 'fangkadoudizhu';
                } else {
                    str = 'fangkadoudizhu3';
                }
            }
            cc.director.loadScene(str, function () {
                cc.vv.net.ping();
                cc.vv.wc.hide();
            });
            self.dispatchEvent("login_finished");
        });
        cc.vv.net.addHandler("exit_result", function (data) {
            self.roomId = null;
            self.turn = -1;
            self.dingque = -1;
            self.isDingQueing = false;
            self.isQiangDiZhuging = false
            self.seats = null;
        });
        cc.vv.net.addHandler("exit_notify_push", function (data) {
            var userId = data;
            var s = self.getSeatByID(userId);
            if (s != null) {
                s.userid = 0;
                s.name = "";
                self.dispatchEvent("user_state_changed", s);
            }
            self.dispatchEvent("user_out", s);
        });
        cc.vv.net.addHandler("dispress_push", function (data) {
            self.roomId = null;
            self.turn = -1;
            self.dingque = -1;
            self.isDingQueing = false;
            self.isQiangDiZhuging = false
            self.seats = null;
        });
        cc.vv.net.addHandler("game_honagbao",function(data){
            self.dispatchEvent("game_honagbao", data);
        });
        cc.vv.net.addHandler("game_jb_bz",function(data){
            self.dispatchEvent("game_jb_bz", data);
        });
        cc.vv.net.addHandler("disconnect", function (data) {
            if (self.roomId == null) {
                cc.vv.wc.show('正在返回游戏大厅');
                cc.director.loadScene("hall");
            }
            else {
                if (self.isOver == false) {
                    cc.vv.userMgr.oldRoomId = self.roomId;
                    self.dispatchEvent("disconnect");
                }
                else {
                    self.roomId = null;
                }
            }
        });
        cc.vv.net.addHandler("new_user_comes_push", function (data) {
            //console.log(data);
            var seatIndex = data.seatindex;
            var needCheckIp = false;
            if (self.seats[seatIndex].userid > 0) {
                self.seats[seatIndex].online = true;
                if (self.seats[seatIndex].ip != data.ip) {
                    self.seats[seatIndex].ip = data.ip;
                    needCheckIp = true;
                }
            }
            else {
                data.online = true;
                self.seats[seatIndex] = data;
                needCheckIp = true;
            }
            self.dispatchEvent('new_user', self.seats[seatIndex]);

            if (needCheckIp) {
                self.dispatchEvent('check_ip', self.seats[seatIndex]);
            }
        });

        cc.vv.net.addHandler("user_state_push", function (data) {
            //console.log(data);
            var userId = data.userid;
            var seat = self.getSeatByID(userId);
            seat.online = data.online;
            self.dispatchEvent('user_state_changed', seat);
        });

        cc.vv.net.addHandler("game_exitroom_push", function (data) {
      
            self.dispatchEvent('game_exitroom_push');
        });
        cc.vv.net.addHandler("user_ready_push", function (data) {
            //console.log(data);
            var userId = data.userid;
            var seat = self.getSeatByID(userId);
            seat.ready = data.ready;
            self.dispatchEvent('user_state_changed', seat);
            self.dispatchEvent('hide_readyBtn', seat);
        });

        //斗地主
        cc.vv.net.addHandler("game_holds_push", function (data) {
            var seat = self.seats[self.seatIndex];
            self.fapaiying = true;
            console.log(data);
            //   seat.holds = data;
            for (var i = 0; i < self.seats.length; ++i) {
                var s = self.seats[i];
                if (s.folds == null) {
                    s.folds = [];
                }

                s.ready = false;
            }
            seat.holds = data;
            self.dispatchEvent('game_holds', data);
        });
        //vip斗地主
        cc.vv.net.addHandler("game_holds_push2", function (data) {
            var seat = self.seats[self.seatIndex];
            console.log(data);
            seat.holds = data;
            for (var i = 0; i < self.seats.length; ++i) {
                var s = self.seats[i];
                if (s.folds == null) {
                    s.folds = [];
                }

                s.ready = false;
            }
            self.dispatchEvent('game_holds2', data);
        });
        //房主踢人
        cc.vv.net.addHandler("game_tiren_push", function (data) {
            self.dispatchEvent('game_tiren', data);
        });

        cc.vv.net.addHandler("game_renwu_push", function (data) {
            self.dispatchEvent('game_renwu', data);
        });
        //vip斗地主发牌队列
        cc.vv.net.addHandler("game_fapai_push", function (data) {
            self.dispatchEvent('game_fapai', data);
        });
        //斗地主提示过牌
        cc.vv.net.addHandler("game_tishi_guo_push", function (data) {
            self.dispatchEvent('game_tishi_guo');
        });

        cc.vv.net.addHandler("game_begin_push", function (data) {
            console.log('game_action_push');
            console.log(data);
            self.button = data;
            self.turn = self.button;
            self.gamestate = "qiangdizhu";
            self.dispatchEvent('game_begin');
        });

        cc.vv.net.addHandler("game_playing_push", function (data) {
            console.log('game_playing_push');
            self.gamestate = "playing";
            self.dispatchEvent('game_playing');
        });

        cc.vv.net.addHandler("game_sync_push", function (data) {
            console.log("game_sync_push");
            // console.log(data);
            cc.vv.wc.show("初始化房间信息");
            //var zxc=JSON.parse(data.seats[0]);
            self.numOfMJ = data.numofmj;
            self.gamestate = data.state;
            self.turn = data.turn;
            self.beishu = data.beishu;
            self.button = data.button;
            self.chupai = data.chuPai;
            self.dipai = data.dipai;
            self.rangpai = data.rangpai;
            self.jishu = data.jishu;
            self.huanpaimethod = data.huanpaimethod;
            self.numOfGames = data.numOfGames;
            self.speedTime = data.speedtime;
            for (var i = 0; i < self.seats.length; ++i) {
                var seat = self.seats[i];
                var sd = data.seats[i];
                seat.holds = sd.holds;
                seat.folds = sd.folds;
                seat.beishu = sd.beishu;
                seat.renwu_name=sd.renwu_name;
                seat.coins=sd.coins;
            }
            //   setTimeout(function(){
            //       self.dispatchEvent('game_sync');

            //   },3000);

        });
        //斗地主,开始抢地主
        cc.vv.net.addHandler("game_qiangdizhu_push", function (data) {
            self.dispatchEvent('game_qiangdizhu', data);
        });

        //斗地主，玩家加倍操作
        cc.vv.net.addHandler("game_jiabei_push", function (data) {
            self.gamestate = 'jiabei';
            self.turn = data.turn;
            self.dispatchEvent('game_jiabei', data);
        });
        //斗地主，开始打牌
        cc.vv.net.addHandler("game_play_push", function (data) {
            self.gamestate = 'play';
            self.turn = data.turn;
            self.fapaiying = false;
            self.dispatchEvent('game_play', data);
        });
        //斗地主，推送底牌
        cc.vv.net.addHandler("game_dipai_push", function (data) {
            self.dipai = data.dipai;
            self.button = data.index;
            self.dispatchEvent('game_dipai');
        });
        //斗地主，推送剩余牌数
        cc.vv.net.addHandler("game_pukecount_push", function (data) {

            self.dispatchEvent('game_pukecount', data);
        });
        //斗地主,不出的话，清除打的牌
        cc.vv.net.addHandler("guo_clare_push", function (data) {
            self.dispatchEvent('guo_clare', data);
        });
        //斗地主，轮子
        cc.vv.net.addHandler("game_turn_push", function (data) {
            self.dispatchEvent('game_turn', data);
        });
        cc.vv.net.addHandler("game_turn_push2", function (data) {
            self.dispatchEvent('game_turn2', data);
        });
        //斗地主tishi game_tishi_push
        cc.vv.net.addHandler("game_tishi_push", function (data) {
            self.dispatchEvent('game_tishi', data);
        });
       
        cc.vv.net.addHandler("game_dingque_push", function (data) {
            self.isDingQueing = true;
            self.isHuanSanZhang = false;
            self.gamestate = 'dingque';
            self.dispatchEvent('game_dingque');
        });
        cc.vv.net.addHandler("game_huanpai_push", function (data) {
            self.isHuanSanZhang = true;
            self.dispatchEvent('game_huanpai');
        });

        cc.vv.net.addHandler("hangang_notify_push", function (data) {
            self.dispatchEvent('hangang_notify', data);
        });

        cc.vv.net.addHandler("game_action_push", function (data) {
            self.curaction = data;
            console.log(data);
            self.dispatchEvent('game_action', data);
        });

        cc.vv.net.addHandler("game_chupai_push", function (data) {
            console.log('game_chupai_push');
            //console.log(data);
            var turnUserID = data;
            var si = self.getSeatIndexByID(turnUserID);
            self.doTurnChange(si);
        });

        cc.vv.net.addHandler("game_num_push", function (data) {
            self.numOfGames = data.numOfGames;
            self.speedTime = data.speedtime;
            self.dispatchEvent('game_num', data);
        });

        cc.vv.net.addHandler("game_rebegin_push", function (data) {
            self.fapaiying = true;
            self.dispatchEvent('game_rebegin', data);
        });
        cc.vv.net.addHandler("game_beishu",function(data){
            self.dispatchEvent('game_beishu', data);
        });
        //GPS_ip
        cc.vv.net.addHandler("gps_ip", function (data) {
            self.dispatchEvent('gps_ip', data);
        });
        cc.vv.net.addHandler("game_gps", function (data) {
            self.dispatchEvent("game_gps", data);
        });
        //Gps
        cc.vv.net.addHandler("fkgame_onGpsDistance", function (data) {
            console.log("fkgame_onGpsDistance");
            self.GpsDistance = data;
            self.dispatchEvent("fkgame_onGpsDistance", data);
        });
        cc.vv.net.addHandler("game_gps_jingao", function (data) {
            self.dispatchEvent("game_gps_jingao", data);
        });
        cc.vv.net.addHandler("fkgame_onGpsjinggao", function (data) {
            console.log("fkgame_onGpsjinggao");
            self.gpsJinggao = data;
            self.dispatchEvent("fkgame_onGpsjinggao", data);
        });
        cc.vv.net.addHandler("game_over_push", function (data) {
            console.log('game_over_push');
            var results = data.results;
            
            for (var i = 0; i < self.seats.length; ++i) {
                self.seats[i].score = results.length == 0 ? 0 : results[i].totalscore;
                self.seats[i].coins = results[i].coins;
                self.seats[i].ready = false;
            }
            if(data.endinfo){
              var roomConf=data.endinfo[0].roomInfo;
              results.roomConf = roomConf;
            }

            self.dispatchEvent('game_over', results);
            if (data.endinfo) {
                self.isOver = true;

                self.dispatchEvent('game_end', data.endinfo);
            }
            self.reset();
            for (var i = 0; i < self.seats.length; ++i) {
                self.dispatchEvent('user_state_changed', self.seats[i]);
            }
        });

        cc.vv.net.addHandler("mj_count_push", function (data) {
            console.log('mj_count_push');
            self.numOfMJ = data;
            //console.log(data);
            self.dispatchEvent('mj_count', data);
        });

        cc.vv.net.addHandler("hu_push", function (data) {
            console.log('hu_push');
            console.log(data);
            self.doHu(data);
        });

        cc.vv.net.addHandler("game_chupai_notify_push", function (data) {
            var userId = data.userId;
            var pai = data.pai;

            var si = self.getSeatIndexByID(userId);



            self.doChupai(si, pai, data.cardKind, data.beishu, data.rangpai, data.jishu);

            //   self.say(si,data.cardKind,pai);

        });

        cc.vv.net.addHandler("game_mopai_push", function (data) {
            console.log('game_mopai_push');
            self.doMopai(self.seatIndex, data);
        });

        cc.vv.net.addHandler("guo_notify_push", function (data) {
            console.log('guo_notify_push');
            self.winindex = data.winindex;
            self.turn = data.seatIndex;
            var userId = data.userId;
            var pai = data.pai;
            var si = self.getSeatIndexByID(userId);
            self.doGuo(si, pai);
        });

        cc.vv.net.addHandler("guo_result", function (data) {
            console.log('guo_result');
            self.dispatchEvent('guo_result');
        });

        cc.vv.net.addHandler("guohu_push", function (data) {
            console.log('guohu_push');
            self.dispatchEvent("push_notice", { info: "过胡", time: 1.5 });
        });

        cc.vv.net.addHandler("huanpai_notify", function (data) {
            var seat = self.getSeatByID(data.si);
            seat.huanpais = data.huanpais;
            self.dispatchEvent('huanpai_notify', seat);
        });

        cc.vv.net.addHandler("game_huanpai_over_push", function (data) {
            console.log('game_huanpai_over_push');
            var info = "";
            var method = data.method;
            if (method == 0) {
                info = "换对家牌";
            }
            else if (method == 1) {
                info = "换下家牌";
            }
            else {
                info = "换上家牌";
            }
            self.huanpaimethod = method;
            cc.vv.gameNetMgr.isHuanSanZhang = false;
            self.dispatchEvent("game_huanpai_over");
            self.dispatchEvent("push_notice", { info: info, time: 2 });
        });

        cc.vv.net.addHandler("peng_notify_push", function (data) {
            console.log('peng_notify_push');
            console.log(data);
            var userId = data.userid;
            var pai = data.pai;
            var si = self.getSeatIndexByID(userId);
            self.doPeng(si, data.pai);
        });

        cc.vv.net.addHandler("gang_notify_push", function (data) {
            console.log('gang_notify_push');
            console.log(data);
            var userId = data.userid;
            var pai = data.pai;
            var si = self.getSeatIndexByID(userId);
            self.doGang(si, pai, data.gangtype);
        });

        cc.vv.net.addHandler("game_dingque_notify_push", function (data) {
            self.dispatchEvent('game_dingque_notify', data);
        });

        cc.vv.net.addHandler("game_dingque_finish_push", function (data) {
            for (var i = 0; i < data.length; ++i) {
                self.seats[i].dingque = data[i];
                if (i == self.seatIndex) {
                    self.dingque = data[i];
                }
            }
            self.dispatchEvent('game_dingque_finish', data);
        });

        //使用道具
        cc.vv.net.addHandler("shiyongdaoju_push", function (data) {
            var index = -1;
            index = self.getSeatByID(data.userid);
            index = self.getLocalIndex(index.seatindex);
            self.dispatchEvent("shiyongdaoju", { index: index, daoju: data.daoju });
        });

        cc.vv.net.addHandler("chat_push", function (data) {
            self.dispatchEvent("chat_push", data);
        });

        cc.vv.net.addHandler("quick_chat_push", function (data) {
            self.dispatchEvent("quick_chat_push", data);
        });

        cc.vv.net.addHandler("emoji_push", function (data) {
            self.dispatchEvent("emoji_push", data);
        });

        cc.vv.net.addHandler("dissolve_notice_push", function (data) {
            console.log("dissolve_notice_push");
            console.log(data);
            self.dissoveData = data;
            self.dispatchEvent("dissolve_notice", data);
        });

        cc.vv.net.addHandler("dissolve_cancel_push", function (data) {
            self.dissoveData = null;
            self.dispatchEvent("dissolve_cancel", data);
        });

        cc.vv.net.addHandler("voice_msg_push", function (data) {
            self.dispatchEvent("voice_msg", data);
        });
        cc.vv.net.addHandler("game_taskInfo", function (data) {
            self.dispatchEvent("game_taskInfo", data);
        });
    },

    doGuo: function (seatIndex, pai) {
        var seatData = this.seats[seatIndex];
        var folds = seatData.folds;
        folds.push(pai);
        this.dispatchEvent('guo_notify', seatData);
    },

    doMopai: function (seatIndex, pai) {
        var seatData = this.seats[seatIndex];
        if (seatData.holds) {
            seatData.holds.push(pai);
            this.dispatchEvent('game_mopai', { seatIndex: seatIndex, pai: pai });
        }
    },

    doChupai: function (seatIndex, pai, cardKind, beishu, rangpai, jishu) {
        this.chupai = pai;
        var seatData = this.seats[seatIndex];
        seatData.folds[0] = this.chupai;
        if (beishu) {
            this.beishu = beishu;
        }
        if (rangpai) {
            this.rangpai = rangpai;
        }
        if (jishu) {
            this.jishu = jishu;
        }
        if (seatData.holds) {
            for (var p in pai) {
                for (var h in seatData.holds) {
                    if (seatData.holds[h].val == pai[p].val && seatData.holds[h].suit == pai[p].suit) {
                        seatData.holds.splice(h, 1);
                    }
                }
            }
        }
        if (cc.vv.replayMgr.isReplay() == false) {
            if (seatIndex != this.seatIndex) {
                for (var key in pai) {
                    seatData.holds.pop();
                }

            }
        }
        this.dispatchEvent('game_chupai_notify', { seatData: seatData,pai: pai});
        //this.say();
        this.say(seatIndex, cardKind, pai);
    },
    say: function (seatIndex, cardKind, pai) {
        var seatData = this.seats[seatIndex];
        this.dispatchEvent('game_say_notify', { seatData: seatData, pai: pai, cardKind: cardKind});
    },

    doPeng: function (seatIndex, pai) {
        var seatData = this.seats[seatIndex];
        //移除手牌
        if (seatData.holds) {
            for (var i = 0; i < 2; ++i) {
                var idx = seatData.holds.indexOf(pai);
                seatData.holds.splice(idx, 1);
            }
        }

        //更新碰牌数据
        var pengs = seatData.pengs;
        pengs.push(pai);

        this.dispatchEvent('peng_notify', seatData);
    },

    getGangType: function (seatData, pai) {
        if (seatData.pengs.indexOf(pai) != -1) {
            return "wangang";
        }
        else {
            var cnt = 0;
            for (var i = 0; i < seatData.holds.length; ++i) {
                if (seatData.holds[i] == pai) {
                    cnt++;
                }
            }
            if (cnt == 3) {
                return "diangang";
            }
            else {
                return "angang";
            }
        }
    },

    doGang: function (seatIndex, pai, gangtype) {
        var seatData = this.seats[seatIndex];

        if (!gangtype) {
            gangtype = this.getGangType(seatData, pai);
        }

        if (gangtype == "wangang") {
            if (seatData.pengs.indexOf(pai) != -1) {
                var idx = seatData.pengs.indexOf(pai);
                if (idx != -1) {
                    seatData.pengs.splice(idx, 1);
                }
            }
            seatData.wangangs.push(pai);
        }
        if (seatData.holds) {
            for (var i = 0; i <= this.seats.length; ++i) {
                var idx = seatData.holds.indexOf(pai);
                if (idx == -1) {
                    //如果没有找到，表示移完了，直接跳出循环
                    break;
                }
                seatData.holds.splice(idx, 1);
            }
        }
        if (gangtype == "angang") {
            seatData.angangs.push(pai);
        }
        else if (gangtype == "diangang") {
            seatData.diangangs.push(pai);
        }
        this.dispatchEvent('gang_notify', { seatData: seatData, gangtype: gangtype });
    },

    doHu: function (data) {
        this.dispatchEvent('hupai', data);
    },

    doTurnChange: function (si) {
        var data = {
            last: this.turn,
            turn: si,
        }
        this.turn = si;
        this.dispatchEvent('game_chupai', data);
    },

    connectGameServer: function (data) {
        this.dissoveData = null;
        cc.vv.net.ip = data.ip + ":" + data.port;
        console.log(cc.vv.net.ip);
        var self = this;

        var onConnectOK = function () {
            console.log("onConnectOK");
            var sd = {
                token: data.token,
                roomid: data.roomid,
                time: data.time,
                sign: data.sign,
            };
            cc.vv.net.send("login", sd);
        };

        var onConnectFailed = function () {
            console.log("failed.");
            cc.vv.net.connect(onConnectOK, onConnectFailed);
            cc.vv.wc.hide();
        };
        cc.vv.wc.show("正在进入房间");

        //    cc.vv.net.connect(onConnectOK,onConnectFailed);

        if (cc.sys.os == cc.sys.OS_IOS) {
            setTimeout(() => {
                cc.vv.net.connect(onConnectOK, onConnectFailed);
            }, 100);
        }
        else {
            cc.vv.net.connect(onConnectOK, onConnectFailed);
        }

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
