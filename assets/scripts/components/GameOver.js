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
        _gameover:null,
        _gameresult:null,
        _seats:[],
        _isGameEnd:false,
        _pingju:null,
        _win:null,
        _lose:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        if(cc.vv.gameNetMgr.conf == null){
            return;
        }
    //    if(cc.vv.gameNetMgr.conf.type == "fangkadoudizhu"){
            this._gameover = this.node.getChildByName("game_over");
     //   }
     //   else{
     //       this._gameover = this.node.getChildByName("game_over_xlch");
     //   }
        
        this._gameover.active = false;
        
        this._pingju = this._gameover.getChildByName("pingju");
        this._win = this._gameover.getChildByName("win");
        this._lose = this._gameover.getChildByName("lose");
        
        this._gameresult = this.node.getChildByName("game_result");
        
  
        
      
       
        
        //初始化网络事件监听器
        var self = this;
        this.node.on('game_over',function(data){self.onGameOver(data.detail);});
        
        this.node.on('game_end',function(data){self._isGameEnd = true;});
        this.node.on('game_honagbao',function(data){
            if(data.detail.hongbao1==cc.vv.userMgr.userId){
                cc.vv.alert.show("提示","恭喜获得第一名获得红包奖励请到背包查收！");
            }else if(data.detail.hongbao3==cc.vv.userMgr.userId){
                cc.vv.alert.show("提示","获得第二名请再接再厉！");
            }else{
                cc.vv.alert.show("提示","获得第三名请再接再厉！");
            }
          //  cc.vv.alert.show("提示","恭喜"+data.detail.hongbao1.userid+"获得"+cc.vv.gameNetMgr.conf.hongbao+"元");
        });
    },
    
    onGameOver(data){
        if(cc.vv.gameNetMgr.conf.type == "fangkadoudizhu"||cc.vv.gameNetMgr.conf.type == "fangkadoudizhu3"||cc.vv.gameNetMgr.conf.type == "shangjindoudizhu"||cc.vv.gameNetMgr.conf.type == "jinbidoudizhu"){
            this.onGameOver_XZDD(data);
        }
        else{
            this.onGameOver_XLCH(data);
        }
    },
    
    onGameOver_XZDD(data){

        if(data.roomConf){
            var wanfa="";
            var confInfo="玩法:";
            console.log(data);
            var roomConf=data.roomConf;
    
            if(roomConf.conf.renshu==2){
                wanfa+=" 斗地主-2人";
            }
    
            wanfa+="    房间号:"+roomConf.id;
            wanfa+="    共"+roomConf.conf.maxGames+"局";
    
            wanfa+="   "+this.formatDate(new Date(roomConf.createTime*1000));
    
            if(roomConf.conf.GPS==true){
                confInfo+="防作弊";
            }if(roomConf.conf.fanshu==999999){
                confInfo+=" 无封顶";
            }else{
                confInfo+=" "+roomConf.conf.fanshu+"封顶";
            }
            confInfo+=" 底牌翻倍";
            this._gameresult.getChildByName("jsbg").getChildByName("jilu").getComponent(cc.Label).string = wanfa;
            this._gameresult.getChildByName("jsbg").getChildByName("wanfa").getComponent(cc.Label).string = confInfo;
    
    
        }
     

        if(data.length == 0){
            this._gameresult.active = true;
            return;
        }
        if(!this._isGameEnd){
            this._gameover.active = true;
        }
        this._pingju.active = false;
        this._win.active = false;
        this._lose.active = false;

        var myscore = data[cc.vv.gameNetMgr.seatIndex].score;
        if(myscore > 0){
            this._win.active = true;
            cc.vv.audioMgr.playSFX("win.mp3");
        }         
        else if(myscore < 0){
            this._lose.active = true;
            cc.vv.audioMgr.playSFX("lose.mp3");
        }
        else{
            this._pingju.active = true;
        }
        //显示输赢金币
        var gameChild=cc.find("Canvas/game_over/result_list");
           for(var i=0;i<data.length;i++){
             var localIndex = cc.vv.gameNetMgr.getLocalIndex(i);
             var sides = ["myself","right","left"];
             var myselfChild = gameChild.getChildByName(sides[localIndex]);
             var seat = myselfChild.getChildByName("seat");
             var shuying_score= seat.getChildByName("score").getComponent(cc.Label);
             shuying_score.string=data[i].score;
             shuying_score.node.active=true;
             if(cc.vv.gameNetMgr.conf.jiabei){
                if(data.length==2){//二人
                    var jiabei=seat.getChildByName("jiabei").getComponent(cc.Label);
                    jiabei.string=data[i].beishu==1?"未加倍":"已加倍";
                }else{//三人
                    var jiabei=seat.getChildByName("jiabei").getComponent(cc.Label);
                    jiabei.string=data[i].beishu==1?"未加倍":"已加倍";
                }
             }
			 
           }
        //显示倍数和炸弹数
        var qiangdizhushu=gameChild.getChildByName("layout").getChildByName("qiangdizhu").getChildByName("qiangdizhutxt").getComponent(cc.Label);
        var beishu=gameChild.getChildByName("layout").getChildByName("beishu").getChildByName("beishutxt").getComponent(cc.Label);
        var zhadanshu=gameChild.getChildByName("layout").getChildByName("zhadan").getChildByName("zhadantxt").getComponent(cc.Label);
        if(data.length==2){//二人
            qiangdizhushu.string=data[0].qcount-1;
            gameChild.getChildByName("layout").getChildByName("qiangdizhu").active=(data[0].qcount-1)>0;
        }else{//三人
            qiangdizhushu.string=data[0].jcount;
        }
        beishu.string=cc.vv.gameNetMgr.beishu;
        zhadanshu.string=data[0].zhadans*2;
        gameChild.getChildByName("layout").getChildByName("zhadan").active=(data[0].zhadans*2)>0;
        
        
            //cc.vv.gameNetMgr.tiren=false;
      
    },
     formatDate:function(now) {

        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        },
        
    onGameOver_XLCH:function(data){
       
    },
    
  
    
    onBtnReadyClicked:function(){
        alert("over");
        console.log("onBtnReadyClicked");
        if(this._isGameEnd){
            this._gameresult.active = true;
        }
        else{
            cc.vv.net.send('ready');   
        }
        this._gameover.active = false;
    },
    
    onBtnShareClicked:function(){
        console.log("onBtnShareClicked");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
