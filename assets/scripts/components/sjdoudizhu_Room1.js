cc.Class({
    extends: cc.Component,

    properties: {
        lblRoomNo:{
            default:null,
            type:cc.Label
        },
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _seats:[],
        _seats2:[],
        _timeLabel:null,
        _voiceMsgQueue:[],
        _lastPlayingSeat:null,
        _playingSeat:null,
        _lastPlayTime:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        
        this.initView();
        this.initSeats();
        this.initEventHandlers();
    },
    
    initView:function(){
        var prepare = this.node.getChildByName("prepare");
        var seats = prepare.getChildByName("seats");
        for(var i = 0; i < seats.children.length; ++i){
            this._seats.push(seats.children[i].getComponent("Seat"));
        }
        this.refreshBtns(); 
        this.lblRoomNo = cc.find("Canvas/infobar/Z_room_txt/New Label").getComponent(cc.Label);
        this._timeLabel = cc.find("Canvas/infobar/time").getComponent(cc.Label);
        this.lblRoomNo.string = cc.vv.gameNetMgr.roomId;
        var gameChild = this.node.getChildByName("game");
        var sides = ["myself","right","left"];
        for(var i = 0; i < sides.length; ++i){
            var sideNode = gameChild.getChildByName(sides[i]);
            var seat = sideNode.getChildByName("seat");
            this._seats2.push(seat.getComponent("Seat"));
        }
        
        var btnWechat = cc.find("Canvas/prepare/btnWeichat");
        if(btnWechat){
            cc.vv.utils.addClickEvent(btnWechat,this.node,"sjdoudizhu_Room1","onBtnWeichatClicked");
        }
        
        
        var titles = cc.find("Canvas/typeTitle");
        for(var i = 0; i < titles.children.length; ++i){
            titles.children[i].active = false;
        }
        
        if(cc.vv.gameNetMgr.conf){
            var type = cc.vv.gameNetMgr.conf.type;
            if(type == null || type == ""){
                type = "xzdd";
            }
            
            //titles.getChildByName(type).active = true;   
        }
    },
    
    refreshBtns:function(){
        var prepare = this.node.getChildByName("prepare");
      //  var btnExit = prepare.getChildByName("btnExit");
        var btnDispress = prepare.getChildByName("btnDissolve");
        var btnWeichat = prepare.getChildByName("btnWeichat");
        var btnBack = prepare.getChildByName("btnBack");
        var isIdle = cc.vv.gameNetMgr.numOfGames == 0;
        
     //   btnExit.active = !cc.vv.gameNetMgr.isOwner() && isIdle;
        btnDispress.active = cc.vv.gameNetMgr.isOwner() && isIdle;
        
        btnWeichat.active = isIdle;
        btnBack.active = isIdle;
    },
    
    initEventHandlers:function(){
        var self = this;
        this.node.on('new_user',function(data){
            var seats =  cc.find("Canvas/prepare/seats");
            self.initSingleSeat(data.detail);
           
        });
        
        this.node.on('user_state_changed',function(data){
            var seats=cc.find("Canvas/prepare/seats");
            seats=seats.getChildren();
            self.initSingleSeat(data.detail);
           
        });
        
        this.node.on('game_begin',function(data){
            self.refreshBtns();
            self.initSeats();
        });
        
        this.node.on('game_num',function(data){
            self.refreshBtns();
        });

        this.node.on('game_huanpai',function(data){
            for(var i in self._seats2){
                self._seats2[i].refreshXuanPaiState();    
            }
        });
                
        this.node.on('huanpai_notify',function(data){
            var idx = data.detail.seatindex;
            var localIdx = cc.vv.gameNetMgr.getLocalIndex(idx);
            self._seats2[localIdx].refreshXuanPaiState();
        });
        
        this.node.on('game_huanpai_over',function(data){
            for(var i in self._seats2){
                self._seats2[i].refreshXuanPaiState();    
            }
        });
        
        this.node.on('voice_msg',function(data){
            var data = data.detail;
            self._voiceMsgQueue.push(data);
            self.playVoice();
        });
        
        this.node.on('chat_push',function(data){
            var data = data.detail;
            var idx = cc.vv.gameNetMgr.getSeatIndexByID(data.sender);
            var localIdx = cc.vv.gameNetMgr.getLocalIndex(idx);
            self._seats[localIdx].chat(data.content);
            self._seats2[localIdx].chat(data.content);
           
        });
        this.node.on('quick_chat_push',function(data){
            var data = data.detail;
            var idx = cc.vv.gameNetMgr.getSeatIndexByID(data.sender);
            var localIdx = cc.vv.gameNetMgr.getLocalIndex(idx);
            
            var index = JSON.parse(data.content).index;
            var sex = JSON.parse(data.content).sex;
            var info = cc.vv.chat.getQuickChatInfo(index,sex);
            self._seats[localIdx].chat(info.content);
            self._seats2[localIdx].chat(info.content);
               if(localIdx==0){
                cc.find("Canvas/btn_chat").active=false;
                setTimeout(() => {
                    cc.find("Canvas/btn_chat").active=true;
                }, 3000);
            }
            cc.vv.audioMgr.playSFX(info.sound);
        });

        this.node.on('emoji_push',function(data){
            var data = data.detail;
            var idx = cc.vv.gameNetMgr.getSeatIndexByID(data.sender);
            var localIdx = cc.vv.gameNetMgr.getLocalIndex(idx);
            console.log(data);
            self._seats[localIdx].emoji(data.content);
            self._seats2[localIdx].emoji(data.content);
        });
    },
    
    initSeats:function(){
        var seats = cc.vv.gameNetMgr.seats;
        for(var i = 0; i < seats.length; ++i){
            this.initSingleSeat(seats[i]);
        }
    },
    
    initSingleSeat:function(seat){
        var index = cc.vv.gameNetMgr.getLocalIndex(seat.seatindex);
        var isOffline = !seat.online;
        var isZhuang = seat.seatindex == cc.vv.gameNetMgr.button;
        
        console.log("isOffline:" + isOffline);
        
        this._seats[index].setInfo(seat.name,seat.score);
        this._seats[index].setReady(seat.ready);

        

        this._seats[index].setOffline(isOffline);
        this._seats[index].setID(seat.userid);
        this._seats[index].voiceMsg(false);
        
        this._seats2[index].setInfo(seat.name,seat.score);
         if(cc.vv.gameNetMgr.gamestate=="play"){
         // this._seats2[index].setZhuang(isZhuang);
        }
        this._seats2[index].setOffline(isOffline);
        this._seats2[index].setID(seat.userid);
        this._seats2[index].voiceMsg(false);
        this._seats2[index].refreshXuanPaiState();
        cc.vv.gameNetMgr.seats[seat.seatindex].latitude=seat.latitude;
        cc.vv.gameNetMgr.seats[seat.seatindex].lontitude=seat.lontitude;
        this.checkgps();
    },
    //修改过
    onBtnSettingsClicked:function(){
      //  cc.vv.popupMgr.showSettings();   
      alert("asd");
    },

    onBtnBackClicked:function(){
        var index=cc.vv.gameNetMgr.seatindex;
        var seats= cc.vv.gameNetMgr.seats;
        
        if(seats[index].userid==cc.vv.gameNetMgr.conf.creator&&cc.vv.userMgr.gems<50){
            cc.vv.alert.show("返回大厅","返回大厅房间仍会保留，快去邀请大伙来玩吧！",function(){
                cc.vv.wc.show('正在返回游戏大厅');
                cc.director.loadScene("hall");    
            },true);
        }else{

            cc.vv.net.send("exit");
        }
    },
    
    onBtnChatClicked:function(){
        
    },
    
    onBtnWeichatClicked:function(){
        var title = "<xxxx>";
        if(cc.vv.gameNetMgr.conf.type == "xlch"){
            var title = "<xxxx>";
        }
       // cc.vv.anysdkMgr.shareResult();   
        cc.vv.anysdkMgr.share("豆乐棋牌-三人斗地主！" ,"房号:" + cc.vv.gameNetMgr.roomId + " 玩法:" + cc.vv.gameNetMgr.getWanfa());
    },
    
    onBtnDissolveClicked:function(){
        cc.vv.alert.show("解散房间","解散房间不扣钥匙，是否确定解散？",function(){
            cc.vv.net.send("dispress");    
        },true);
    },
    
    onBtnExit:function(){
        var index=cc.vv.gameNetMgr.seatIndex;
        var seats= cc.vv.gameNetMgr.seats;
        
        if(seats[index].userid==cc.vv.gameNetMgr.conf.creator&&cc.vv.userMgr.gems<50){
            cc.vv.alert.show("返回大厅","返回大厅房间仍会保留，快去邀请大伙来玩吧！",function(){
                cc.vv.wc.show('正在返回游戏大厅');
                cc.director.loadScene("hall");    
            },true);
        }else{

            cc.vv.net.send("exit");
        }
    },
    
    checkgps:function(){
        if(cc.vv.gameNetMgr.gamestate == ''){
         //   return;
        }
        var selfData = cc.vv.gameNetMgr.getSelfData();
        var ipMap = {}
        var renshu=0;
        var seats=cc.find("Canvas/prepare/seats");
        seats=seats.getChildren();
        for(var i = 0;i<cc.vv.gameNetMgr.seats.length;i++){
            if(cc.vv.gameNetMgr.seats[i].userid>0){
                renshu++;
            }
        }
        if(renshu==3){
            var si=[];
            for(var i = 0; i < cc.vv.gameNetMgr.seats.length; ++i){
                if(i==cc.vv.gameNetMgr.seatIndex) continue;
                si.push(i);
            }
            var seatData1 = cc.vv.gameNetMgr.seats[si[0]];
            var seatData2 = cc.vv.gameNetMgr.seats[si[1]];
         
            var  juli=  this.getDisance(seatData1.latitude,seatData1.lontitude,seatData2.latitude,seatData2.lontitude);
           
                var index1=cc.vv.gameNetMgr.getLocalIndex(si[0]);
                var index2=cc.vv.gameNetMgr.getLocalIndex(si[1]);
                var index3=cc.vv.gameNetMgr.getLocalIndex(cc.vv.gameNetMgr.seatIndex);
            if(juli<=50){
                seats[index3].getChildByName("jingbao").active = true;
                seats[index1].getChildByName("jingbao").active = true;
                seats[index2].getChildByName("jingbao").active = true;
            }else{
                seats[index1].getChildByName("jingbao").active = false;
                seats[index2].getChildByName("jingbao").active = false;
            }

        }else if(renshu==2){
            var seatData=null;
            for(var i = 0; i < cc.vv.gameNetMgr.seats.length; ++i){
                console.log(cc.vv.gameNetMgr.seats[i]);
                if(cc.vv.gameNetMgr.seats[i].userid>0&&i!=cc.vv.gameNetMgr.seatIndex){
                    seatData = cc.vv.gameNetMgr.seats[i];
                }
            }
            var  juli=  this.getDisance(cc.vv.userMgr.latitude,cc.vv.userMgr.lontitude,seatData.latitude,seatData.lontitude);
           
                var index=cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
                var index2=cc.vv.gameNetMgr.getLocalIndex(cc.vv.gameNetMgr.seatIndex);
            if(juli<=50){
                seats[index2].getChildByName("jingbao").active = true;
                seats[index].getChildByName("jingbao").active = true;
            }else{
                seats[index2].getChildByName("jingbao").active = false;
                seats[index].getChildByName("jingbao").active = false;
            }

           
    }else{
        var index=cc.vv.gameNetMgr.getLocalIndex(cc.vv.gameNetMgr.seatIndex);
        seats[index].getChildByName("jingbao").active = false;
    }
        
        
       
    },
    
     toRad:function(d) {  return d * Math.PI / 180; },
     getDisance:function(lat1, lng1, lat2, lng2) { //lat为纬度, lng为经度, 一定不要弄错
        var dis = 0;
        var radLat1 = this.toRad(lat1);
        var radLat2 = this.toRad(lat2);
        var deltaLat = radLat1 - radLat2;
        var deltaLng = this.toRad(lng1) - this.toRad(lng2);
        var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return dis * 6378137;
    },
    playVoice:function(){
        if(!cc.vv.gameNetMgr.jinyan){
            if(this._playingSeat == null && this._voiceMsgQueue.length){
                console.log("playVoice2");
                var data = this._voiceMsgQueue.shift();
                var idx = cc.vv.gameNetMgr.getSeatIndexByID(data.sender);
                var localIndex = cc.vv.gameNetMgr.getLocalIndex(idx);
                this._playingSeat = localIndex;
                this._seats[localIndex].voiceMsg(true);
                this._seats2[localIndex].voiceMsg(true);
                
                var msgInfo = JSON.parse(data.content);
                
                var msgfile = "voicemsg.amr";
                console.log(msgInfo.msg.length);
                cc.vv.voiceMgr.writeVoice(msgfile,msgInfo.msg);
                cc.vv.voiceMgr.play(msgfile);
                this._lastPlayTime = Date.now() + msgInfo.time;
                cc.find("Canvas/btn_voice").active=false;
            }
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var minutes = Math.floor(Date.now()/1000/60);
        if(this._lastMinute != minutes){
            this._lastMinute = minutes;
            var date = new Date();
            var h = date.getHours();
            h = h < 10? "0"+h:h;
            
            var m = date.getMinutes();
            m = m < 10? "0"+m:m;
            this._timeLabel.string = "" + h + ":" + m;             
        }
        
        
        if(this._lastPlayTime != null){
            if(Date.now() > this._lastPlayTime + 200){
                this.onPlayerOver();
                this._lastPlayTime = null;    
                cc.find("Canvas/btn_voice").active=true;
            }
        }
        else{
            this.playVoice();
        }
    },
    
        
    onPlayerOver:function(){
        cc.vv.audioMgr.resumeAll();
        console.log("onPlayCallback:" + this._playingSeat);
        var localIndex = this._playingSeat;
        this._playingSeat = null;
        this._seats[localIndex].voiceMsg(false);
        this._seats2[localIndex].voiceMsg(false);
    },
    
    onDestroy:function(){
        cc.vv.voiceMgr.stop();
//        cc.vv.voiceMgr.onPlayCallback = null;
    }
});
