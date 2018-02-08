

cc.Class({
    extends: cc.Component,

    properties: {        
        gameRoot:{
            default:null,
            type:cc.Node
        },
        
        prepareRoot:{
            default:null,
            type:cc.Node   
        },
		user_speed_state:{
			default:[],
			type:cc.SpriteFrame
        },
        card_fapai:cc.Prefab,
        card:cc.Prefab,
        card_other:cc.Prefab,
        card_other_count:cc.Label,
        selectmeun:cc.Node,
        shezhi:cc.Node,
        msg_set_bg:cc.Node,
		CardList:cc.Node,
		beishu:cc.Label,
		jishu:cc.Label,
		_isGameEnd:false,
        _gameresult:null,
        _myMJArr:[],
        _options:null,
        _selectedMJ:null,
        _chupaiSprite:[],
        _mjcount:null,
        _gamecount:null,
        _hupaiTips:[],
        _hupaiLists:[],
        _playEfxs:[],
        _opts:[],
        _to_left_x:-475,
        _xuanpai:null,
        _xuanpai_r:null,
	
		dipai:{
			default:[],
			type:cc.Node,
        },
        _tishi:[],
        _tishi_index:0,
        _fapai:null,
        _fapai_up:null,
        _x_up:null,
        _x_cards:null,
        _times:null,
        _time:null,
        _alertTime:null,
        _timeLabel:null,
    },
    
    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
        }
        this.addComponent("GameOver");
      
       this.addComponent("jbdouzizhu_Room");
       
    
        this.addComponent("Chat");
      
        this.addComponent("ReplayCtrl");
        this.addComponent("PopupMgr");

        this.addComponent("ReConnect");
        this.addComponent("Voice");
        this.addComponent("UserInfoShow_game");
        this.addComponent("Status");
        
        this.initView();
        this.initEventHandlers();
        
        this.gameRoot.active = false;
        this.prepareRoot.active = true;
        this.initWanfaLabel();
        this.onGameBegin();
        cc.vv.audioMgr.playBGM("bgFight.mp3");
        cc.vv.utils.addEscEvent(this.node);
        this._fapai=cc.find("Canvas/game/fapai");
        this._fapai_up=cc.find("Canvas/game/fapai/card");
        this._x_up=false;
        this._times=cc.find("Canvas/game/time_speed");
        this._timeLabel=this._times.getChildByName("times").getComponent(cc.Label);
    },
    
    initView:function(){
       
        //搜索需要的子节点
        var gameChild = this.gameRoot;
        var myselfChild = gameChild.getChildByName("myself");
		//this._mjcount.string = "剩余" + cc.vv.gameNetMgr.numOfMJ + "张";
        this._gamecount = gameChild.getChildByName('gamecount').getComponent(cc.Label);
		var myholds = myselfChild.getChildByName("holds");
        var sides = ["myself","right","left"];
        for(var i = 0; i < sides.length; ++i){
            var side = sides[i];
            
            var sideChild = gameChild.getChildByName(side);
         
            this._playEfxs.push(sideChild.getChildByName("play_efx").getComponent(cc.Animation));
        }
        this.CardList.on(cc.Node.EventType.TOUCH_START,function(event){
            this._xuanpai_r=this.newGuid();
            console.log(this._xuanpai_r);
            this._xuanpai=true;
        },this);
        this.CardList.on(cc.Node.EventType.TOUCH_END,this.tFun_chupai,this);
        this.CardList.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            console.log("结束TOUCH_CANCEL");
            setTimeout(() => {
                this.panduanlian();
            }, 200);
        },this);


    	 this.CardList.on(cc.Node.EventType.TOUCH_MOVE,function(event){
                this._xuanpai=false;
			    var _chupaiend=event.touch.getLocation().x-570;
				var _chupaibegin=event.touch.getStartLocation().x-570;
				
				if(_chupaiend<_chupaibegin){
					var temp=_chupaiend;
					_chupaiend=_chupaibegin;
					_chupaibegin=temp;
				}
				
                var cards=this._x_cards;
                if(cards.length==0)
                    return;
				var add_x=51;
				
			
				
				 var lastpai=cards.length-1;
				//console.log("_chupaibegin:"+_chupaibegin+"_______chupaiend:"+_chupaiend);
				for(var i=0;i<lastpai;i++){
					
				//	var canvasPos = c.convertToNodeSpaceAR(worldPos)
				//	console.log("x:"+cards[i].x);
					if((_chupaibegin-add_x)<cards[i].x&&cards[i].x<_chupaiend){
                            if(cards[i].guid!=this._xuanpai_r){
                                cards[i].guid=this._xuanpai_r;
                                if(cards[i].y>0){
                                  //  console.log("pai...."+i+"--"+cards[i].guid);
                                    if(cards[i].canmove==true){
                                        cards[i].canmove=false;
                                        cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                                            cards[index].canmove=true;
                                            if(cards[index].y<0){
                                                cards[index].y=0;
                                            }
                                        },this,i)));
                                    }
                                }else{
                                  //  cards[i].getChildByName("bg").color = new cc.Color(180, 180, 180);
                               //     console.log("pai...."+i+"--"+cards[i].guid);
                                if(cards[i].canmove==true){
                                    cards[i].canmove=false;
                                        cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 40),cc.callFunc(function(target, index){
                                            cards[index].canmove=true;
                                        //    cards[i].getChildByName("bg").color = new cc.Color(255, 255, 255);
                                        },this,i)));
                                    }
                                }
                            }
						
					} else{
                        if(cards[i].guid==this._xuanpai_r){
                            cards[i].guid="";
                            if(cards[i].y>0){
                                //cards[i].getChildByName("bg").color = new cc.Color(180, 180, 180);
                             //   console.log("pai...."+i+"--"+cards[i].guid);
                             if(cards[i].canmove==true){
                                    cards[i].canmove=false;
                                    cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                                        cards[index].canmove=true;
                                        if(cards[index].y<0){
                                            cards[index].y=0;
                                        }
                                    },this,i)));
                                }
                            }else{
                             //   cards[i].getChildByName("bg").color = new cc.Color(180, 180, 180);
                             //   console.log("pai...."+i+"--"+cards[i].guid);
                             if(cards[i].canmove==true){
                                cards[i].canmove=false;
                                cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 40),cc.callFunc(function(target, index){
                              //      cards[i].getChildByName("bg").color = new cc.Color(255, 255, 255);
                                 cards[index].canmove=true;
                                },this,i)));
                            }
                            }
                        }
					}
				}
				//单独判断最后一张牌中间偏右部分
				if(_chupaiend>cards[lastpai].x&&_chupaiend>cards[lastpai].x&&(cards[lastpai].x+170>_chupaibegin)&&(cards[lastpai].x+170>_chupaiend)){
                    if(cards[i].guid!=this._xuanpai_r){
                        cards[i].guid=this._xuanpai_r;
                        if(cards[lastpai].y>10){
                        //    cards[i].getChildByName("bg").color = new cc.Color(180, 180, 180);
                         //   console.log("pai...."+i+"--"+cards[i].guid);
                         if(cards[i].canmove==true){
                            cards[i].canmove=false;
                            cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                                cards[index].canmove=true;
                                if(cards[index].y<0){
                                    cards[index].y=0;
                                }
                            },this,i)));
                         }
                        }else{
                          //  cards[i].getChildByName("bg").color = new cc.Color(255, 255, 255);
                          //  console.log("pai...."+i+"--"+cards[i].guid);
                          if(cards[i].canmove==true){
                            cards[i].canmove=false;
                            cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 40),cc.callFunc(function(target, index){
                                cards[index].canmove=true;
                            },this,i)));
                        }
                        }
                    }					
				}else{
                    if(cards[i].guid==this._xuanpai_r){
                        cards[i].guid="";
                        if(cards[lastpai].y>10){
                            //cards[i].getChildByName("bg").color = new cc.Color(180, 180, 180);
                          //  console.log("pai..222.."+i+"--"+cards[i].guid);
                          if(cards[i].canmove==true){
                            cards[i].canmove=false;
                            cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                                cards[index].canmove=true;
                                if(cards[index].y<0){
                                    cards[index].y=0;
                                }
                            },this,i)));
                          }
                        }else{
                           // cards[i].getChildByName("bg").color = new cc.Color(255, 255, 255);
                        // console.log("pai.222..."+i+"--"+cards[i].guid);
                          //  cards[i].runAction(cc.moveBy(0.1,0, 40));
                        }
                    }
                    //cards[i].color = new cc.Color(255, 255, 255);       
                       
				}
		 },this);
		
        


        var opts = gameChild.getChildByName("ops");
        this._options = opts;   
},
    
tFun_chupai:function(event){
    //var start_y=event.touch.getLocation().y;
     cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    var _chupaiend=event.touch.getLocation().x-570;
    var _chupaibegin=event.touch.getStartLocation().x-570;
    
    if(_chupaiend<_chupaibegin){
        var temp=_chupaiend;
        _chupaiend=_chupaibegin;
        _chupaibegin=temp;
    }
    
    var cards=this.CardList.getChildren();
    if(cards.length==0)
    return;
    var add_x=0;
    
     add_x=1000/cards.length;
     if(cards.length<10)
         add_x=75;
     if(cards.length<6)
         add_x=90;
     add_x=51;
     var lastpai=cards.length-1;
    for(var i=0;i<lastpai;i++){
        if((_chupaibegin-add_x)<cards[i].x&&cards[i].x<_chupaiend){
            if(this._xuanpai){
                if(cards[i].y>10){
                    if(cards[i].canmove==true){
                        cards[i].canmove=false;
                        cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                            cards[index].canmove=true;
                            if(cards[index].y<0){
                                cards[index].y=0;
                            }
                     
                    },this,i)));
                    }
                }
                else{
                    if(cards[i].canmove==true){
                        cards[i].canmove=false;
                        cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 40),cc.callFunc(function(target, index){
                        cards[index].canmove=true;
                       
                    },this,i)));
                    }
                }
            }
        } 
    }
    //单独判断最后一张牌中间偏右部分
    if(_chupaiend>cards[lastpai].x&&_chupaiend>cards[lastpai].x&&(cards[lastpai].x+170>_chupaibegin)&&(cards[lastpai].x+170>_chupaiend)){
        if(this._xuanpai){
                if(cards[lastpai].y>10){
                    if(cards[lastpai].canmove=true){
                        cards[lastpai].canmove=false;
                        cards[lastpai].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                            cards[index].canmove=true;
                            if(cards[index].y<0){
                                cards[index].y=0;
                            }
                    },this,lastpai)));
                }
                }
                else{
                    //cards[i].y=40;
                    if(cards[lastpai].canmove=true){
                            cards[lastpai].canmove=false;
                            cards[lastpai].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 40),cc.callFunc(function(target, index){
                            cards[index].canmove=true;
                         
                        },this,lastpai)));
                    }
            //		cards[i].getChildByName("bg").color=new cc.Color(255, 255, 255);
                    //cards[i].color = new cc.Color(255, 255, 255);
                }
            }
    }
    
    console.log("结束tFun_chupai");
 
        setTimeout(() => {
            this.panduanlian();
        }, 200);
   
},
panduanlian(){
    var cards=this.CardList.getChildren();
    var lastpai=cards.length-1;
    var up_pais=[];
    for(var i=0;i<cards.length;i++){//循环遍历所有起立的牌
        if(cards[i].y>10){
            cards[i].up=false;
            up_pais.push(cards[i]);
        }
    }
    up_pais=up_pais.sort(function (a, b){
        var va = parseInt(a.val);
        var vb = parseInt(b.val);
        if(va === vb){
            return a.suit < b.suit ? 1 : -1;
        } else if(va < vb){
            return -1;
        } else {
            return 1;
        }
    });
 //   console.log(up_pais);
    if(up_pais.length>5){//判断起立张数是否大于5
        var new_pais=[];//定义新的连牌队列
        var min=up_pais[0];//取到最小的种子
        min.up=true;
        new_pais.push(min);
        
        for(var i=0;i<up_pais.length;i++){//循环n次，分别判断有比种子多一点的牌
            min=new_pais[new_pais.length-1];
            for(var j=i;j<up_pais.length;j++){
                if(parseInt(up_pais[j].val)==parseInt(min.val)+1){//如果找到一整递增点数的牌，插入队列，然后重新判断
                    if(up_pais[j].val<15){
                        up_pais[j].up=true;
                        new_pais.push(up_pais[j]);
                        break;
                    }
                } 
            }
          
        }
        console.log("___________");
   //     console.log(new_pais);
        if(new_pais.length>4&&this._x_up==false){
            var new_pars2=[];
            var resoult=this.valCount(up_pais);
            for(var x=0;x<new_pais.length;x++){
                var find=0;
                for(var y=0;y<resoult.length;y++){
                    if(new_pais[x].val==resoult[y].val&&resoult[y].count==2){
                        if(find<2){
                            new_pars2.push(new_pais[x]);
                            find++;
                        }else{
                            break;
                        }
                    }
                }

            }
            
            if(new_pars2.length>3){
                return;
            }

           // console.log(new_pars2);
          
                for(var i=0;i<up_pais.length;i++){
                    if(up_pais[i].up==true){

                    }else{
                        up_pais[i].runAction(cc.moveTo(0.1,cards[i].x, 0));
                    }
                }
                this._x_up=true;
          
        }else{
            this._x_up=false;
        }
    }else{
        this._x_up=false;
    }
    
},

    valCount :function(cards){
        var result = [];
        var addCount = function(result , v){
            for (var i = 0; i < result.length; i++) {
                if(result[i].val == v){
                    result[i].count ++;
                    return;
                }
            }
            result.push({'val': v, 'count': 1});
        };
        for (var i = 0; i < cards.length; i++){
            addCount(result, cards[i].val);
        }
        return result;
    },
	
    start:function(){
        this.checkIp();
    },

    checkIp:function(){
        if(cc.vv.gameNetMgr.gamestate == ''){
            return;
        }
        var selfData = cc.vv.gameNetMgr.getSelfData();
        var ipMap = {}
        for(var i = 0; i < cc.vv.gameNetMgr.seats.length; ++i){
            var seatData = cc.vv.gameNetMgr.seats[i];
            if(seatData.ip != null && seatData.userid > 0 && seatData != selfData){
                if(ipMap[seatData.ip]){
                    ipMap[seatData.ip].push(seatData.name);
                }
                else{
                    ipMap[seatData.ip] = [seatData.name];
                }
            }
        }
        
        for(var k in ipMap){
            var d = ipMap[k];
            if(d.length >= 2){
                var str = "" + d.join("\n") + "\n\n正在使用同一IP地址进行游戏!";
                cc.vv.alert.show("注意",str);
                return; 
            }
        }
    },

   
    
    hideChupai:function(){
        for(var i = 0; i < this._chupaiSprite.length; ++i){
            this._chupaiSprite[i].node.active = false;
        }        
    },
    
    initEventHandlers:function(){
        cc.vv.gameNetMgr.dataEventHandler = this.node;
        
        //初始化事件监听器
        var self = this;
        
        this.node.on('game_holds',function(data){
          // self.initpukes();
          cc.vv.audioMgr.playSFX("doudizhu/game/start.mp3");
          var fapaipanel=cc.find("Canvas/game/fapai");
          fapaipanel.active=true;
          fapaipanel.removeAllChildren();
          var data2=data.detail.allcard;
          var fapai=data.detail.fapailist;
       
          var index=0;
       
          if(cc.vv.gameNetMgr.seatIndex==0){
            cc.vv.gameNetMgr.seats[0].holds=[];
            cc.vv.gameNetMgr.seats[1].holds=[];
            cc.vv.gameNetMgr.seats[2].holds=[];
            cc.vv.gameNetMgr.seats[0].folds[0]=9;
            cc.vv.gameNetMgr.seats[1].folds[0]=9;
            cc.vv.gameNetMgr.seats[2].folds[0]=9;

              while(index<51){
                  
                cc.vv.gameNetMgr.seats[0].holds.push(fapai[index]);
                cc.vv.gameNetMgr.seats[1].holds.push({val:0,suit:0});
                cc.vv.gameNetMgr.seats[2].holds.push({val:0,suit:0});
                  index+=3;
              }
          }else if(cc.vv.gameNetMgr.seatIndex==1){
             
              cc.vv.gameNetMgr.seats[1].holds=[];
              cc.vv.gameNetMgr.seats[0].holds=[];
              cc.vv.gameNetMgr.seats[2].holds=[];
              cc.vv.gameNetMgr.seats[0].folds[0]=9;
              cc.vv.gameNetMgr.seats[1].folds[0]=9;
              cc.vv.gameNetMgr.seats[2].folds[0]=9;
              while(index<51){
                cc.vv.gameNetMgr.seats[0].holds.push({val:0,suit:0});
                cc.vv.gameNetMgr.seats[1].holds.push(fapai[index]);
                cc.vv.gameNetMgr.seats[2].holds.push({val:0,suit:0});
                  index+=3;
              }
          }else{
           
      
            cc.vv.gameNetMgr.seats[0].holds=[];
			cc.vv.gameNetMgr.seats[1].holds=[];
            cc.vv.gameNetMgr.seats[2].holds=[];
            cc.vv.gameNetMgr.seats[0].folds[0]=9;
            cc.vv.gameNetMgr.seats[1].folds[0]=9;
            cc.vv.gameNetMgr.seats[2].folds[0]=9;
            while(index<51){
              cc.vv.gameNetMgr.seats[0].holds.push({val:0,suit:0});
              cc.vv.gameNetMgr.seats[1].holds.push({val:0,suit:0});
              cc.vv.gameNetMgr.seats[2].holds.push(fapai[index]);
                index+=3;
            }
          }
   
          var gameChild = self.gameRoot;
          var fapaipanel=cc.find("Canvas/game/fapai");

          console.log("///////////////////////////");
        
          var left=-440;
          for(var i=0;i<3;i++){
            var _puke= cc.instantiate(self.card_fapai);
            _puke.getComponent("card").init(0,0,0,"back");
            fapaipanel.addChild(_puke);
            _puke.x=left;
            _puke.y=0;
            left+=16;
          }
          for(var i=fapai.length-1;i>=0;i--){
            var puke= cc.instantiate(self.card_fapai);
          var bg=data2==i?"noback":"back";
            puke.getComponent("card").init(fapai[i].val,fapai[i].suit,0,bg);
            fapaipanel.addChild(puke);
            puke.x=left;
            puke.y=0;
            left+=16;
            
          }
          var plist=fapaipanel.getChildren();
      
             var ii=0; 
             var m_x=0;
             var up_x=-370;
             var callback = function () { 
                 if (ii== 51) 
                 { 
                    self.initpukes();
                    self.unschedule(callback); 
                    plist[0].runAction(cc.spawn(cc.moveBy(0.2, 300, 0),cc.moveBy(0.2, 0, 110)));
                    plist[1].runAction(cc.spawn(cc.moveBy(0.2, 400, 0),cc.moveBy(0.2, 0, 110)));
                    plist[2].runAction(cc.spawn(cc.moveBy(0.2, 500, 0),cc.moveBy(0.2, 0, 110)));
                   
                 }else{

                    

                  self.fapai(fapai,ii);
                    if(ii%3==0){
                        plist[53-ii].runAction(cc.sequence(cc.moveTo(0.05, -450, -180),cc.hide()));
                        
                    }else if(ii%3==1){
                        plist[53-ii].runAction(cc.sequence(cc.moveTo(0.05, 400, 220),cc.hide()));
                       
                    }else{
						plist[53-ii].runAction(cc.sequence(cc.moveTo(0.05, -415, 250),cc.hide()));
					}
                  //  plist[33-ii].active=false;
                 }
                 ii++; 
             } 
             self.schedule(callback, 0.05);
        });
        //
        this.node.on('game_holds2',function(data){
             self.initpukes();
             self.initOtherpukes();
          });
        //开局
        this.node.on('game_begin',function(data){
            self.dipai[0].getComponent("card").init_dipai(0,-1,"");
            self.dipai[1].getComponent("card").init_dipai(0,-1,"");
            self.dipai[2].getComponent("card").init_dipai(0,-1,"");
            self.onGameBegin();
            self.clear_allcard();
            self._times.active=false;
            // cc.find("Canvas/btnReady").active=false;
            // cc.find("Canvas/btnExit").active=false;
            //第一把开局，要提示
           // if(cc.vv.gameNetMgr.numOfGames == 1){
                self.checkIp();
           // }
        });
        

         
        //显示底牌
        this.node.on('game_dipai',function(data){
            
            self.showdipai();
            var seats= cc.vv.gameNetMgr.seats;
        
                if (cc.vv.gameNetMgr.seatIndex!=cc.vv.gameNetMgr.button) {
                    seats[cc.vv.gameNetMgr.button].holds.push({val:0,suit:0});
                    seats[cc.vv.gameNetMgr.button].holds.push({val:0,suit:0});
                    seats[cc.vv.gameNetMgr.button].holds.push({val:0,suit:0});
                }
           
			self.initOtherpukes();
        });
		
		//通知开始打牌
		this.node.on('game_play',function(data){
            self.setzhuang();
		   self.initpukes();
        });
		 //重新发牌
        this.node.on('game_rebegin',function(data){
          var fapaipanel=cc.find("Canvas/game/fapai");
            fapaipanel.active=false;
            self.clear_allcard();
        });
		 //过牌提示
        this.node.on('game_tishi_guo',function(data){
            var gameChild = self.gameRoot;
            var tishi=gameChild.getChildByName("guopaitishi")
            tishi.active=true;
            setTimeout(() => {
                tishi.active=false;
            }, 1800);
        });


		
		
		
		
        //准备后隐藏按钮
        //
        this.node.on('hide_readyBtn',function(data){
          //  alert(data.detail.seatindex);
            if(cc.vv.gameNetMgr.seatIndex==data.detail.seatindex){
                var btn=self.prepareRoot.getChildByName("btnReady");
                btn.active=false;
              
                
            }
        });
        //user_out
		this.node.on('user_out',function(data){
			
			self.prepareRoot.active=true;
			self.gameRoot.active=false;
			var btn=self.prepareRoot.getChildByName("btnReady");
                btn.active=true;
		
		    var btnBack = self.prepareRoot.getChildByName("btnBack");
				btnBack.active=true;
				
		});
        this.node.on('check_ip',function(data){
            self.checkIp();
        });
        
        this.node.on('game_sync',function(data){
            self.onGameBegin();
            self.initpukes();
            self.initOtherpukes();
            self.checkIp();
			self.setzhuang();
        });
        
        this.node.on('game_chupai',function(data){
            data = data.detail;
            self.hideChupai();
            if(data.last != cc.vv.gameNetMgr.seatIndex){
                self.initMopai(data.last,null);   
            }
            if(!cc.vv.replayMgr.isReplay() && data.turn != cc.vv.gameNetMgr.seatIndex){
                self.initMopai(data.turn,-1);
            }
        });
        
    
        
        this.node.on('game_action',function(data){
            self.showAction(data.detail);
        });
        
       
        
        this.node.on('mj_count',function(data){
           // self._mjcount.string = "剩余" + cc.vv.gameNetMgr.numOfMJ + "张";
        });
        
        this.node.on('game_num',function(data){
           //  self._gamecount.string = "" + cc.vv.gameNetMgr.numOfGames + "/3局";
        });
        
        this.node.on('game_over',function(data){
            // self.gameRoot.active = false;
           // self.prepareRoot.active = true;
           self.hideOptions();
           cc.find("Canvas/popups").active=false;
           data=data.detail;
           var gameChild = self.gameRoot;
           //显示输赢金币
           for(var i=0;i<data.length;i++){
             var localIndex = cc.vv.gameNetMgr.getLocalIndex(i);
             var sides = ["myself","right","left"];
             var myselfChild = gameChild.getChildByName(sides[localIndex]);
             var seat = myselfChild.getChildByName("seat");
            // var shuying_score= seat.getChildByName("shuying_score").getComponent(cc.Label);
            // shuying_score.string=data[i].score;
            // shuying_score.node.active=true;    
           }
           if(data[0].dipai.length==0){
               for(var i=0;i<3;i++){
                  cc.vv.gameNetMgr.dipai.push(data[0].shengyu.pop());
               } 
           }
           self.showdipai();
           for (var key in cc.vv.gameNetMgr.seats) {
               if (cc.vv.gameNetMgr.seatIndex==key) {
                  continue;
               }
               cc.vv.gameNetMgr.seats[key].holds=data[key].holds;
               self.initOtherpukes();
           }
          
           
          // cc.find("Canvas/btnReady").active=true;
         //  cc.find("Canvas/btnExit").active=true;
        });
        
        
        this.node.on('game_chupai_notify',function(data){
           // self.hideChupai();
            var seatData = data.detail.seatData;
            var pai=data.detail.pai;
            var seatIndex=data.detail.seatIndex;
            //如果是自己，则刷新手牌
            if(seatData.seatindex == cc.vv.gameNetMgr.seatIndex){
                self.initpukes();                
            }
            else{
                self.initOtherpukes(seatData);
            }
            self.showChupai(seatData.seatindex);
       //     var audioUrl = cc.vv.mahjongmgr.getAudioURLByMJID(data.detail.pai);
          //  cc.vv.audioMgr.playSFX(audioUrl);
        });

        this.node.on('game_say_notify',function(data){
            var seatData = data.detail.seatData; 
            var pai;
            if(data.detail.pai){
                pai=data.detail.pai[0];
            }
            var cardKind=data.detail.cardKind;
            var sex=seatData.sex==2?"nv":"nan";
            var audioUrl = "/doudizhu/game/"+sex;
            if(data.detail.pai==null){
                audioUrl+="/Audio_Pass2_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }
            else if(data.detail.pai==0){
                audioUrl+="/CallLandlord_JDZ_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }
            else if(data.detail.pai==1){
                audioUrl+="/CallLandlord_BJDZ_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }
            else if(data.detail.pai==2){
                audioUrl+="/CallLandlord_QDZ_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }
            else if(data.detail.pai==3){
                audioUrl+="/CallLandlord_BQDZ_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(data.detail.pai==8){//让。1.2.3
               return;
            }else if(data.detail.pai==9){
                return;
            }else if(data.detail.pai==10){
                return;
            }else if(data.detail.pai==66){//春天
                var index=  cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
                self._playEfxs[index].node.active = true;
                self._playEfxs[index].play("chuntian");
                audioUrl+="/Audio_Spring_1_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }
            else if(cardKind==2){
                var val=2;
                if(pai.val>=3&&pai.val<=10){
                    val=pai.val;
                }
                else if(pai.val==11){
                    val="J";
                }else if(pai.val==12){
                    val="Q";
                }else if(pai.val==13){
                    val="K";
                }else if(pai.val==14){
                    val="A";
                }else if(pai.val==15){
                    val="2";
                }

                audioUrl+="/Audio_Card_Double_"+val+"_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }
            else if(cardKind==1){
                var val=2;
                if(pai.val>=3&&pai.val<=10){
                    val=pai.val;
                }
                else if(pai.val==11){
                    val="J";
                }else if(pai.val==12){
                    val="Q";
                }else if(pai.val==13){
                    val="K";
                }else if(pai.val==14){
                    val="A";
                }else if(pai.val==15){
                    val="2";
                }else if(pai.val==16){
                    val="Joker1";
                }else if(pai.val==17){
                    val="Joker2";
                }
                audioUrl+="/Audio_Card_Single_"+val+"_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==3){
                audioUrl+="/Audio_Card_Three_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==4){//
                audioUrl+="/Audio_Card_Three_Take_One_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==5){//
                audioUrl+="/Audio_Card_Three_Take_Double_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==6){//
                audioUrl+="/Audio_Card_Straight_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
              var index=  cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
                self._playEfxs[index].node.active = true;
                self._playEfxs[index].play("shunzi");
            }else if(cardKind==7){//
                audioUrl+="/Audio_Card_DoubleLine_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
                var index=  cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
                self._playEfxs[index].node.active = true;
                self._playEfxs[index].play("liandui");
            }else if(cardKind==8||cardKind==9||cardKind==10){//
                audioUrl+="/Audio_Card_Plane_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==11){//
                audioUrl+="/Audio_Card_Four_Take_2_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==12){//
                audioUrl+="/Audio_Card_Four_Take_2Double_";
                audioUrl+=sex=="nv"?"W.ogg":"M.ogg";
            }else if(cardKind==13){//
                audioUrl+="/Audio_Card_Bomb_";
                audioUrl+=sex=="nv"?"W.mp3":"M.mp3";
                var index=  cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
                self._playEfxs[index].node.active = true;
                self._playEfxs[index].play("zhadan");
                cc.vv.audioMgr.playSFX("/doudizhu/game/other/CardType_Bomb.ogg");
                cc.vv.audioMgr.playSFX(audioUrl);
                self.gameRoot.runAction(cc.sequence(cc.moveTo(0.05,30,0),cc.moveTo(0.05,30,30),cc.moveTo(0.05,-30,30),cc.moveTo(0.05,-30,-30),cc.moveTo(0.05,30,-30),cc.moveTo(0.05,0,0),cc.moveTo(0.05,30,0),cc.moveTo(0.05,30,30),cc.moveTo(0.05,-30,30),cc.moveTo(0.05,-30,-30),cc.moveTo(0.05,30,-30),cc.moveTo(0.05,0,0)));
                return ;
            }else if(cardKind==14){//
                audioUrl+="/Audio_Card_Rocket_";
                audioUrl+=sex=="nv"?"W.mp3":"M.mp3";
                var index=  cc.vv.gameNetMgr.getLocalIndex(seatData.seatindex);
                self._playEfxs[index].node.active = true;
                self._playEfxs[index].play("huojian");
                cc.vv.audioMgr.playSFX("/doudizhu/game/other/CardType_Bomb.ogg");
                cc.vv.audioMgr.playSFX(audioUrl);
                self.gameRoot.runAction(cc.sequence(cc.moveTo(0.05,30,0),cc.moveTo(0.05,30,30),cc.moveTo(0.05,-30,30),cc.moveTo(0.05,-30,-30),cc.moveTo(0.05,30,-30),cc.moveTo(0.05,0,0),cc.moveTo(0.05,30,0),cc.moveTo(0.05,30,30),cc.moveTo(0.05,-30,30),cc.moveTo(0.05,-30,-30),cc.moveTo(0.05,30,-30),cc.moveTo(0.05,0,0)));
                return;
            }
            cc.vv.audioMgr.playSFX(audioUrl);
        });
        
        this.node.on('guo_notify',function(data){
          //  self.hideChupai();
         //   self.hideOptions();
            self.speed_turn();
            var seatData = data.detail;
            //如果是自己，则刷新手牌
            if(seatData.seatindex == cc.vv.gameNetMgr.seatIndex){
                self.initpukes();                
            }
            
            cc.vv.audioMgr.playSFX("give.mp3");
        });
       
        this.node.on('guo_result',function(data){
            this.speed_turn();
        });
        this.node.on('game_renwu',function(data){ 
            console.log(data);
            cc.find("Canvas/game/renwu/info").getComponent(cc.Label).string = data.detail.name;
        });
       //game_turn 轮到某人
       this.node.on('game_turn',function(data){
       
        var gameChild = self.gameRoot;
        var localIndex = cc.vv.gameNetMgr.getLocalIndex(data.detail.index);
      
        if(data.detail.state=="play"){
            self._times.active=true;
            if(localIndex==0){
                // self._times.runAction(cc.sequence(cc.moveTo(0.2,0,88),callFunc(function(){
                //    alert("asd");
                // })));
                self._times.runAction(cc.sequence(cc.moveTo(0.2,0,88).easing(cc.easeIn(1.0)),cc.callFunc(function(){
                    self._time = 30;
                    self._alertTime = 3;
                },this,0)));
            }else if(localIndex==1){
              
                self._times.runAction(cc.sequence(cc.moveTo(0.2,420,220).easing(cc.easeIn(1.0)),cc.callFunc(function(){
                    self._time = 30;
                    self._alertTime = 3;
                 },this,0)));
            }else if(localIndex==2){
                
                  self._times.runAction(cc.sequence(cc.moveTo(0.2,-430,220).easing(cc.easeIn(1.0)),cc.callFunc(function(){
                      self._time = 30;
                      self._alertTime = 3;
                   },this,0)));
              }
        }else{
            self._times.active=false;
        }
        if(localIndex==0){
            self._tishi=[];
            self._tishi_index=0;
        }
        var sides = ["myself","right","left"];
            var myselfChild = gameChild.getChildByName(sides[localIndex]);
            var myholds = myselfChild.getChildByName("folds");
            myholds.removeAllChildren(); 
            var userstate=myselfChild.getChildByName("user_speed_state");
            userstate.active=true;
            var targetSprite=userstate.getComponent(cc.Sprite);
            targetSprite.spriteFrame=self.user_speed_state[6];
       });

       //提示
       this.node.on('game_tishi',function(data){
             data=data.detail;
             console.log("data",data);
             self._tishi=data;
             self._tishi_index=0;
             self.showtishi(function(){});

    });

    },

    initWanfaLabel:function(){
        var wanfa = cc.find("Canvas/infobar/wanfa").getComponent(cc.Label);
        wanfa.string = cc.vv.gameNetMgr.getWanfa();
    },
    
   
    
    playEfx:function(index,name){
        this._playEfxs[index].node.active = true;
        this._playEfxs[index].play(name);
    },
    //游戏开始
    onGameBegin:function(){
        this.gameRoot.x=0;
        this.gameRoot.y=0;
        for(var i = 0; i < this._playEfxs.length; ++i){
            this._playEfxs[i].node.active = false;
        }
        
      
        if(cc.vv.gameNetMgr.gamestate == "" && cc.vv.replayMgr.isReplay() == false){
            return;
        }
        this.jishu.string=0;//cc.vv.gameNetMgr.jishu;
	//	this._gamecount.string = "" + cc.vv.gameNetMgr.numOfGames + "/3局";
        this.beishu.string=cc.vv.gameNetMgr.beishu;
        this.jishu.string=cc.vv.gameNetMgr.jishu;
		this.gameRoot.active = true;
        this.prepareRoot.active = false;
        this.initpukes();
        this.initOtherpukes();
        this.setzhuang();
         cc.find("Canvas/game/renwu/info").getComponent(cc.Label).string = cc.vv.gameNetMgr.renwu_name;
       // this.clear_allcard();
        this.showdipai();
        var seats = cc.vv.gameNetMgr.seats;
        for(var i in seats){
            var seatData = seats[i];
            var localIndex = cc.vv.gameNetMgr.getLocalIndex(i);
            this.showChupai(localIndex);
           
        }
        if(cc.vv.gameNetMgr.curaction != null){
            this.showAction(cc.vv.gameNetMgr.curaction);
            cc.vv.gameNetMgr.curaction = null;
        }

    },
    
    showdipai:function(){
        var data=cc.vv.gameNetMgr.dipai;
        var fapaipanel=cc.find("Canvas/game/fapai");
        for(var i=0;i<3;i++){
            if(data.length==3){
                this.dipai[i].getComponent("card").init_dipai(data[i].val,data[i].suit,"noback");
                if(fapaipanel.children.length>0)
                    fapaipanel.children[i].getComponent("card").init(data[i].val,data[i].suit,0,"noback");
            
            }else{
                this.dipai[i].getComponent("card").init_dipai(0,-1,"");
            }  
        }
        if(data.length==3&&fapaipanel.children.length>0){
            setTimeout(() => {
                var up_y=cc.vv.gameNetMgr.button==cc.vv.gameNetMgr.seatIndex?-200:100;
                fapaipanel.children[0].runAction(cc.spawn(cc.moveBy(0.5, 50, up_y),cc.fadeOut(0.3)));
                fapaipanel.children[1].runAction(cc.spawn(cc.moveBy(0.5, 0, up_y),cc.fadeOut(0.3)));
                fapaipanel.children[2].runAction(cc.spawn(cc.moveBy(0.5, -50, up_y),cc.fadeOut(0.3)));
            }, 500);
        }
    },
    
   fapai:function(data,i){
        var gameChild = this.gameRoot;
		 var shui=i;
			if(cc.vv.gameNetMgr.seatIndex==0){
				
			}else if(cc.vv.gameNetMgr.seatIndex==1){
				shui=i+1;
			}else if(cc.vv.gameNetMgr.seatIndex==2){
				shui=i+2;
			}
          
            var localIndex = cc.vv.gameNetMgr.getLocalIndex(shui);
			
            var sides = ["myself","right","left"];
            var myselfChild = gameChild.getChildByName(sides[localIndex]);
            var myholds = myselfChild.getChildByName("holds");
            var puke;
            if(localIndex==0){
                puke= cc.instantiate(this.card);
            }else{
                 puke= cc.instantiate(this.card_other);
            }
            var bg="back";
             if(data[i].val>0){
                bg="noback";
             }

            puke.getComponent("card").init(data[i].val,data[i].suit,0,bg);
            puke.val=data[i].val;
            puke.suit=data[i].suit;
			myholds.addChild(puke);
			if(sides[localIndex]=="myself"){
				
			}else{
				var h_c=cc.find("seat/pai_count/num",myselfChild);
				h_c.getComponent(cc.Label).string=parseInt((i+3)/3) ;
			}
           // this.card_other_count.string=parseInt((i+2)/2) ;
            cc.vv.audioMgr.playSFX("/doudizhu/game/other/Audio_Out_Card.ogg");
            
        
    },

	
	setzhuang:function(){
        for (var key in cc.vv.gameNetMgr.seats) {
            var sides = ["myself","right","left"];
            var gameChild = this.node.getChildByName("game");
            var localIndex = cc.vv.gameNetMgr.getLocalIndex(key);
            var myselfChild = gameChild.getChildByName(sides[localIndex]);
            var seat = myselfChild.getChildByName("seat");
            var zhuang=seat.getChildByName("zhuang");
            zhuang.active=cc.vv.gameNetMgr.button==key;
        }
        
    },

	
	
    clear_allcard:function(){
        var gameChild = cc.find("Canvas/game");
        for (var key in cc.vv.gameNetMgr.seats) {
            var sides = ["myself","right","left"];
            var gameChild = this.node.getChildByName("game");
            var localIndex = cc.vv.gameNetMgr.getLocalIndex(key);
            var myselfChild = gameChild.getChildByName(sides[localIndex]);
			var myholds = myselfChild.getChildByName("holds");
			var myfolds = myselfChild.getChildByName("folds");
			 myholds.removeAllChildren(); 
			myfolds.removeAllChildren();
			var userstate=myselfChild.getChildByName("user_speed_state");
			userstate.active=false;
            var seat = myselfChild.getChildByName("seat");
            var zhuang=seat.getChildByName("zhuang");
            var shuying_score=seat.getChildByName("shuying_score");
            zhuang.active=false;
         //   shuying_score.active=false;
        }
    },
    //初始化自己扑克
    initpukes:function(){
		
        var holds=cc.vv.gameNetMgr.seats[cc.vv.gameNetMgr.seatIndex].holds;
        holds=holds.sort(function (a, b){
            var va = parseInt(a.val);
            var vb = parseInt(b.val);
            if(va === vb){
                return a.suit > b.suit ? 1 : -1;
            } else if(va > vb){
                return -1;
            } else {
                return 1;
            }
        });
		var gameChild = this.node.getChildByName("game");
        var myselfChild = gameChild.getChildByName("myself");
		var myholds = myselfChild.getChildByName("holds");
        myholds.removeAllChildren(); 
        var zhuang=0;
        if(cc.vv.gameNetMgr.seatIndex==cc.vv.gameNetMgr.button&&cc.vv.gameNetMgr.gamestate=="play"){
            zhuang=1;
        }
		for(var i in holds){
            var puke= cc.instantiate(this.card);
            puke.getComponent("card").init(holds[i].val,holds[i].suit,zhuang,"noback");
            puke.val=holds[i].val;
            puke.suit=holds[i].suit;
            puke.up=false;
            puke.down=true;
            puke.canmove=true;
			myholds.addChild(puke);
			
        }
        this._x_cards=this.CardList.getChildren();
       
        this.showChupai(cc.vv.gameNetMgr.seatIndex);
    },
      //初始化别人的扑克
      initOtherpukes:function(){
		if(cc.vv.gameNetMgr.fapaiying==true){
			return;
		}
       var seats= cc.vv.gameNetMgr.seats;
       for(var s in seats){
            if(s==cc.vv.gameNetMgr.seatIndex){
                continue;
            }else{
                var holds=seats[s].holds;
               
                var holds_count=holds.length;
                var noback="back";
                var localIndex = cc.vv.gameNetMgr.getLocalIndex(s);
                var sides = ["myself","right","left"];
                var gameChild = this.node.getChildByName("game");
                var myselfChild = gameChild.getChildByName(sides[localIndex]);
                var myholds = myselfChild.getChildByName("holds");
               
                myholds.removeAllChildren(); 
                var zhuang=0;
                if(s==cc.vv.gameNetMgr.button&&cc.vv.gameNetMgr.gamestate=="play"){
                    zhuang=1;
                    
                }

                for(var i=0 ;i<holds_count;i++){
                    var puke= cc.instantiate(this.card_other);
                    if(holds[i].val==0){
                        noback="back";
                    }else{
                        noback="noback";
                    }
                    if(noback=="noback"){
                        puke.getComponent("card").init(holds[i].val,holds[i].suit,zhuang,noback);
                        puke.val=holds[i].val;
                        puke.suit=holds[i].suit;
                    }else{
                        puke.getComponent("card").init(0,0,zhuang,noback);
                        puke.val=0;
                        puke.suit=0;
                    }
                    myholds.addChild(puke);
                }
                var h_c=cc.find("seat/pai_count/num",myselfChild).getComponent(cc.Label);
                h_c.string=holds_count;
              
            }
       }
    },
    //回落
    huiluo:function(){
        var cards=this.CardList.getChildren();
        if(cards.length==0)
        return;
	
		for(var i=0;i<cards.length;i++){
		
                    if(cards[i].y>10){
                        if(cards[i].canmove==true){
                            cards[i].canmove=false;
                            cards[i].runAction(cc.sequence(cc.moveTo(0.1,cards[i].x, 0),cc.callFunc(function(target, index){
                            cards[index].canmove=true;
                         
                        },this,i)));
                        }
                    }
                }
    },
    //显示设置菜单
    showmeun:function(){
        this.shezhi.active=false;
       // this.selectmeun.active=true;
        this.selectmeun.runAction(cc.sequence(cc.moveTo(0.1,548, 235),cc.callFunc(function(){
            this.msg_set_bg.active=true;
        },this,0)));
       
    },
    //隐藏设置菜单
    closemeun:function(){
        this.msg_set_bg.active=false;
		this.selectmeun.runAction(cc.sequence(cc.moveTo(0.1,548,489),cc.callFunc(function(){
			this.shezhi.active=true;
			//this.selectmeun.active=false;
		 },this,0)));
		 
	    
		
	},
  
    
  
	
   
	user_ctrl_Clicked:function(event){

        if(event.target.name=="btnJiaodizhu"){
			cc.vv.net.send("qiangdizhu",{val:1,type:0});
        }else if(event.target.name=="btnQiangdizhu"){
            cc.vv.net.send("qiangdizhu",{val:1,type:2});
        }
        else if(event.target.name=="btnBuqiang"){
			cc.vv.net.send("qiangdizhu",{val:0,type:3});
        }
        else if(event.target.name=="btnBujiao"){
			cc.vv.net.send("qiangdizhu",{val:0,type:1});
		}
        else if(event.target.name=="btnJiabei"){
			cc.vv.net.send("jiabei",1);
		}else if(event.target.name=="btnBujiabei"){
			cc.vv.net.send("jiabei",0);
		}else if(event.target.name=="btnMingbai"){
			cc.vv.net.send("mingbai");
		}
		else if(event.target.name=="btnTishi"){
            var btn=event.target;
			if(this._tishi.length>0){
                this._tishi_index++;
                if(this._tishi_index>=this._tishi.length){
                    this._tishi_index=0;;
                }
                btn.getComponent(cc.Button).interactable = false;
                this.showtishi(function(){
                    btn.getComponent(cc.Button).interactable = true;
                });
            }else{
                cc.vv.net.send("get_tishi");
            }
		}else if(event.target.name=="btnChupai"){
            //选择出用户要出的牌
            var pais=[];
            var cards=this.CardList.getChildren();
            for(var i=0;i<cards.length;i++){
                    if(cards[i].y>10){
                        var p={
                            val:cards[i].val,
                            suit:cards[i].suit
                        }
                        pais.push(p);
                    }
            }
            cc.vv.net.send("chupai",pais);

		}else if(event.target.name=="btnBushu"){
            cc.vv.net.send("guo");
        }
       
		
    },
   
	reday:function(){
		 cc.vv.net.send('ready'); 
	},
    
    
   
   
    showChupai:function(seatIndex){
        var pai = cc.vv.gameNetMgr.seats[seatIndex].folds[0];
        var gameChild =this.gameRoot;
        var localIndex = cc.vv.gameNetMgr.getLocalIndex(seatIndex);
        var sides = ["myself","right","left"];
            var myselfChild = gameChild.getChildByName(sides[localIndex]);
            var myholds = myselfChild.getChildByName("folds");
            myholds.removeAllChildren(); 
            

            var userstate=myselfChild.getChildByName("user_speed_state");
            userstate.active=false;

            if(cc.vv.gameNetMgr.gamestate=="play"){
                if(pai&&pai.length>0){
                    var zhuang=0;
                    if(seatIndex==cc.vv.gameNetMgr.button){
                        zhuang=1;
                    }
                    for(var i in pai){
                        var puke= cc.instantiate(this.card);
                        puke.getComponent("card").init(pai[i].val,pai[i].suit,zhuang,"noback");
                        puke.val=pai[i].val;
                        puke.suit=pai[i].suit;
                        myholds.addChild(puke);
                    }
                }else{
                    if(cc.vv.gameNetMgr.gamestate=="play"){
                        userstate.active=true;
                        var targetSprite=userstate.getComponent(cc.Sprite);
                        targetSprite.spriteFrame=this.user_speed_state[9];
                    }
                }
            }else{
               
                    userstate.active=true;
                    var targetSprite=userstate.getComponent(cc.Sprite);
                    targetSprite.spriteFrame=this.user_speed_state[pai];
                   
                 
            }

            this.beishu.string=cc.vv.gameNetMgr.beishu;    
			this.jishu.string=cc.vv.gameNetMgr.jishu;
    },
    
    showtishi:function(callback){
        var cards=this.CardList.getChildren();
        var t_card=this._tishi[this._tishi_index];
        for(var i=0;i<cards.length;i++){
           
               if(cards[i].y>10){

                    cards[i].y=0;

                }
           
        }
        setTimeout(function(){
            for(var c in t_card){
                for(var i=0;i<cards.length;i++){
                    if(cards[i].val==t_card[c].val&&cards[i].suit==t_card[c].suit){
                        if(cards[i].y>10){
                            cards[i].y=0;
                        }
                        else{
                            //cards[i].y=40;
                            cards[i].runAction(cc.moveTo(0.1,cards[i].x, 40));
                            cards[i].getChildByName("bg").color=new cc.Color(255, 255, 255);
                            //cards[i].color = new cc.Color(255, 255, 255);
                        }
                    }

                }
            }
            setTimeout(function(){
                callback();
            },200);
            
        },200);
       

       
    },

    addOption:function(btnName){
        for(var i = 0; i < this._options.childrenCount; ++i){
            var child = this._options.children[i]; 
            if(child.name == "op" && child.active == false){
                child.active = true;
                var btn = child.getChildByName(btnName); 
                btn.active = true;
                return;
            }
        }
    },
    hideOptions:function(data){
        this._options.active = false;
        for(var i = 0; i < this._options.childrenCount; ++i){
            var child = this._options.children[i]; 
            if(child.name == "op"){
                child.active = false;
                child.getChildByName("btnTishi").active = false;
                child.getChildByName("btnBushu").active = false;
                child.getChildByName("btnChupai").active = false;
                child.getChildByName("btnJiaodizhu").active = false;
                child.getChildByName("btnBujiao").active = false;
                child.getChildByName("btnQiangdizhu").active = false;
                child.getChildByName("btnBuqiang").active = false;
                child.getChildByName("btnBujiabei").active = false;
                child.getChildByName("btnMingbai").active = false;
                child.getChildByName("btnJiabei").active = false;
            }
        }
        var gameChild = this.node.getChildByName("game");
       
      
            var myselfChild = gameChild.getChildByName("myself");
          
            var userstate=myselfChild.getChildByName("user_speed_state");
            userstate.active=false;
           

    },
    
    showAction:function(data){
        if(this._options.active){
            this.hideOptions();
        }
        if(data && (data.tishi || data.buchu || data.chupai|| data.jiaodizhu|| data.bujiao|| data.qiangdizhu|| data.buqiang|| data.bujiabei|| data.mingpai|| data.jiabei)){
            this._options.active = true;
            
            if(data.buchu){
                this.addOption("btnBushu");
            }
			if(data.tishi){
                this.addOption("btnTishi");
            }
            if(data.chupai){
                this.addOption("btnChupai");
            }
            if(data.bujiao){
                this.addOption("btnBujiao");
            }
            if(data.jiaodizhu){
                this.addOption("btnJiaodizhu");
            }
            if(data.buqiang){
                this.addOption("btnBuqiang");
            }
            if(data.qiangdizhu){
                this.addOption("btnQiangdizhu");
            }
            if(data.bujiabei){
                this.addOption("btnBujiabei");
            }
            if(data.mingpai){
                this.addOption("btnMingbai");
            }
            if(data.jiabei){
                this.addOption("btnJiabei");
            }
        }
      //  this.initpukes();
    },
    
   
    onBtnDissolveClicked:function(){
      //  alert("asd");
        cc.vv.alert.show("解散房间","解散房间不扣钥匙，是否确定解散？",function(){
            cc.vv.net.send("dispress");    
        },true);
    },
    
    onBtnExit:function(){
		cc.vv.gameNetMgr.gamestate = "";
        cc.vv.net.send("exit");
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    onBtnSettingsClicked:function(){
        this.closemeun();
        cc.vv.popupMgr.showSettings();   
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");   
    },
 //分享朋友圈
    fenxiang:function(){
        cc.vv.anysdkMgr.shareToTimeline("豆乐斗棋牌","约局就来：「豆乐棋牌」安全无外挂，打牌更放心。");
    },
    //托管

    tuoguan:function(){
        alert("asd");
        cc.vv.net.send("tuoguan");
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._time > 0){
            this._time -= dt;
            if(this._alertTime > 0 && this._time < this._alertTime){
                cc.vv.audioMgr.playSFX("timeup_alarm.mp3");
                this._alertTime = -1;
            }
            var pre = "";
            if(this._time < 0){
                this._time = 0;
            }
            
            var t = Math.ceil(this._time);
            if(t < 10){
                pre = "0";
            }
            this._timeLabel.string = pre + t; 
        }
    },
    
    onDestroy:function(){
        console.log("onDestroy");
        if(cc.vv){
            cc.vv.gameNetMgr.clear();   
        }
    },
    newGuid:function(){
        var guid = "";
        for (var i = 1; i <= 32; i++){
          var n = Math.floor(Math.random()*16.0).toString(16);
          guid +=   n;
          if((i==8)||(i==12)||(i==16)||(i==20))
            guid += "-";
        }
        return guid;   
    },
   
});
