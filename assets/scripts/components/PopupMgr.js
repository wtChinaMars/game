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
        _popuproot:null,
        _settings:null,
        _dissolveNotice:null,
        
        _endTime:-1,
        _extraInfo:null,
        _noticeLabel:null,
		_seats:null,
		_faqi:null,
		_btn_agree:null,
		_btn_reject:null
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        
        cc.vv.popupMgr = this;
        
        this._popuproot = cc.find("Canvas/popups");
        this._settings = cc.find("Canvas/popups/settings");
        this._dissolveNotice = cc.find("Canvas/popups/dissolve_notice");
        this._noticeLabel = this._dissolveNotice.getChildByName("info").getComponent(cc.Label);
        this._seats=this._dissolveNotice.getChildByName("seats").getChildren();
		this._faqi=this._dissolveNotice.getChildByName("faqi");
		this._btn_agree=this._dissolveNotice.getChildByName("btn_agree");
		this._btn_reject=this._dissolveNotice.getChildByName("btn_reject");
        this.closeAll();
        
        this.addBtnHandler("settings/btn_close");
        this.addBtnHandler("settings/btn_sqjsfj");
        this.addBtnHandler("dissolve_notice/btn_agree");
        this.addBtnHandler("dissolve_notice/btn_reject");
        this.addBtnHandler("dissolve_notice/btn_ok");
        this.addBtnHandler("dissolve_notice/btn_close");
        var self = this;
        this.node.on("dissolve_notice",function(event){
            var data = event.detail;
            self.showDissolveNotice(data);
        });
        
        this.node.on("dissolve_cancel",function(event){
            self.closeAll();
        });
    },
    
    start:function(){
        if(cc.vv.gameNetMgr.dissoveData){
            this.showDissolveNotice(cc.vv.gameNetMgr.dissoveData);
        }
    },
    
    addBtnHandler:function(btnName){
        var btn = cc.find("Canvas/popups/" + btnName);
        this.addClickEvent(btn,this.node,"PopupMgr","onBtnClicked");
    },
    
    addClickEvent:function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },
    
    onBtnClicked:function(event){
        this.closeAll();
        var btnName = event.target.name;
        if(btnName == "btn_agree"){
            cc.vv.net.send("dissolve_agree");
        }
        else if(btnName == "btn_reject"){
            cc.vv.net.send("dissolve_reject");
        }
        else if(btnName == "btn_sqjsfj"){
            cc.vv.net.send("dissolve_request"); 
        }
		else if(btnName == "btn_close"){
            cc.vv.net.send("dissolve_reject"); 
        }
    },
    
    closeAll:function(){
        this._popuproot.active = false;
        this._settings.active = false;
        this._dissolveNotice.active = false;
    },
    
    showSettings:function(){
        this.closeAll();
        this._popuproot.active = true;
        this._settings.active = true;
    },
    
    showDissolveRequest:function(){
        this.closeAll();
        this._popuproot.active = true;
    },
    
    showDissolveNotice:function(data){
        this._endTime = Date.now()/1000 + data.time;
        this._extraInfo = "";
		for(var i = 0; i < data.states.length; ++i){
			if(i==data.shenqing){
				 var namenode= this._faqi.getChildByName("name");
				 var name=namenode.getComponent(cc.Label);
				 name.string=cc.vv.gameNetMgr.seats[i].name;
				 var iconnode=this._faqi.getChildByName("icon");
				 var icon=iconnode.getComponent("ImageLoader");
				 icon.setUserID(cc.vv.gameNetMgr.seats[i].userid);
			}
		}
		var z=0;
        for(var i = 0; i < data.states.length; ++i){
		
          var b = data.states[i];
          var name = cc.vv.gameNetMgr.seats[i].name;
		  if(i==data.shenqing){
			continue;
		  }else{
			var namenode= this._seats[z].getChildByName("name");
			var name=namenode.getComponent(cc.Label);
				name.string=cc.vv.gameNetMgr.seats[i].name;
			var seatenode= this._seats[z].getChildByName("New Node");
			var seate=seatenode.getComponent(cc.RichText);
			var iconnode=this._seats[z].getChildByName("icon");
			var icon=iconnode.getComponent("ImageLoader");
			icon.setUserID(cc.vv.gameNetMgr.seats[i].userid);
			
		    if(b){
				seate.string="<color=#2C6F06>同意</color>"
			}
			else{
				seate.string="<color=#7A7474>未选择</color>"
			}
			this._seats[z].active=true;
		  }
		  z++;
        }
		if(cc.vv.gameNetMgr.seatIndex==data.shenqing){
			this._btn_agree.active=false;
			this._btn_reject.active=false;
		}else{
            this._btn_agree.active=true;
			this._btn_reject.active=true;
        }
        this.closeAll();
        this._popuproot.active = true;
        this._dissolveNotice.active = true;;
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._endTime > 0){
            var lastTime = this._endTime - Date.now() / 1000;
            if(lastTime < 0){
                this._endTime = -1;
            }
            
            var m = Math.floor(lastTime / 60);
            var s = Math.ceil(lastTime - m*60);
            
            var str = "";
            if(m > 0){
                str += m + "分"; 
            }
            
            this._noticeLabel.string = str + s + "秒" + this._extraInfo;
        }
    },
});
