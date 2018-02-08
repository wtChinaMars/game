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
        _history:null,
        _viewlist:null,
        _content:null,
        _viewitemTemp:null,
        _historyData:null,
        _curRoomInfo:null,
        _emptyTip:null,
    },

    // use this for initialization
    onLoad: function () {
        this._history = this.node.getChildByName("FK").getChildByName("bottom_left").getChildByName("fk_bottom").getChildByName("wanfa").getChildByName("history");
        this._history.active = false;
        
        this._emptyTip = this._history.getChildByName("emptyTip");
        this._emptyTip.active = true;
        
        this._viewlist = this._history.getChildByName("viewlist");
        this._content = cc.find("view/content",this._viewlist);
        
        this._viewitemTemp = this._content.children[0];
        this._content.removeChild(this._viewitemTemp);

        var node = cc.find("Canvas/FK/bottom_left/fk_bottom/btnwanfa");        
        this.addClickEvent(node,this.node,"replay_History","onBtnHistoryClicked");
        
        var node = cc.find("Canvas/FK/bottom_left/fk_bottom/wanfa/history/btn_back");  
        this.addClickEvent(node,this.node,"replay_History","onBtnBackClicked");
    },
    
    addClickEvent:function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },
    
    onBtnBackClicked:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(this._curRoomInfo == null){
            this._historyData = null;
            this._history.active = false;            
        }
        else{
            this.initRoomHistoryList(this._historyData);   
        }
    },
    
    onBtnHistoryClicked:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        this._history.active = true;
        var self = this;
        cc.vv.userMgr.getHistoryList(function(data){
            data.sort(function(a,b){
                return a.time < b.time; 
            });
            self._historyData = data;
			
            for(var i = 0; i < data.length; ++i){
                for(var j = 0; j < data[i].seats.length; ++j){
                    var s = data[i].seats[j];
					
                    s.name =self.decode(s.name);
                }
            }
            self.initRoomHistoryList(data);
        });
    },
    
    dateFormat:function(time){
        var date = new Date(time);
        var datetime = "{0}-{1}-{2} {3}:{4}:{5}";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month >= 10? month : ("0"+month);
        var day = date.getDate();
        day = day >= 10? day : ("0"+day);
        var h = date.getHours();
        h = h >= 10? h : ("0"+h);
        var m = date.getMinutes();
        m = m >= 10? m : ("0"+m);
        var s = date.getSeconds();
        s = s >= 10? s : ("0"+s);
        datetime = datetime.format(year,month,day,h,m,s);
        return datetime;
    },
    
    initRoomHistoryList:function(data){
          for(var i = 0; i < data.length; ++i){
            var node = this.getViewItem(i);
            node.idx = i;
            var titleId = "" + (i + 1);
            node.getChildByName("title").getComponent(cc.Label).string = titleId;
            node.getChildByName("roomNo").getComponent(cc.Label).string = "房间ID:" + data[i].id;
            var datetime = this.dateFormat(data[i].time * 1000);
            node.getChildByName("time").getComponent(cc.Label).string = datetime;
            
            var btnOp = node.getChildByName("btnOp");
            btnOp.idx = i;
            btnOp.getChildByName("Label").getComponent(cc.Label).string = "详情";
            var j = 0;
			var k=0;
            for(var j = 0; j < data[i].seats.length; ++j){
                var s = data[i].seats[j];
                var info = s.name + ":" +  s.score;
                //console.log(info);
                node.getChildByName("info" + j).getComponent(cc.Label).string = info;
				k++;
            }
			while(k<4){
				node.getChildByName("info" + k).active=false;
				k++
			}
        }
       // this._emptyTip.active = data.length == 0;
	    this._emptyTip.active =false;
        this.shrinkContent(data.length);
        this._curRoomInfo = null;
    },
    
    initGameHistoryList:function(roomInfo,data){
        data.sort(function(a,b){
           return a.create_time < b.create_time; 
        });
        for(var i = 0; i < data.length; ++i){
            var node = this.getViewItem(i);
            var idx = data.length - i - 1;
            node.idx = idx;
            var titleId = "" + (idx + 1);
            node.getChildByName("title").getComponent(cc.Label).string = titleId;
            node.getChildByName("roomNo").getComponent(cc.Label).string = "房间ID:" + roomInfo.id;
            var datetime = this.dateFormat(data[i].create_time * 1000);
            node.getChildByName("time").getComponent(cc.Label).string = datetime;
            
            var btnOp = node.getChildByName("btnOp");
            btnOp.idx = idx; 
            btnOp.getChildByName("Label").getComponent(cc.Label).string = "回放";
            
            var result = JSON.parse(data[i].result);
			var k=0;
            for(var j = 0; j < roomInfo.seats.length; ++j){
                var s = roomInfo.seats[j];
                var info = s.name + ":" + result[j];
                //console.log(info);
                node.getChildByName("info" + j).getComponent(cc.Label).string = info;
				k++;
            }
			while(k<4){
				node.getChildByName("info" + k).active=false;
				k++
			}
        }
        this.shrinkContent(data.length);
        this._curRoomInfo = roomInfo;
    },
    
    getViewItem:function(index){
        var content = this._content;
        if(content.childrenCount > index){
            return content.children[index];
        }
        var node = cc.instantiate(this._viewitemTemp);
        content.addChild(node);
        return node;
    },
    shrinkContent:function(num){
        while(this._content.childrenCount > num){
            var lastOne = this._content.children[this._content.childrenCount -1];
            this._content.removeChild(lastOne,true);
        }
    },
    
    getGameListOfRoom:function(idx){
        var self = this;
        var roomInfo = this._historyData[idx];        
        cc.vv.userMgr.getGamesOfRoom(roomInfo.uuid,function(data){
            if(data != null && data.length > 0){
                self.initGameHistoryList(roomInfo,data);
            }
        });
    },
    
    getDetailOfGame:function(idx){
        var self = this;
        var roomUUID = this._curRoomInfo.uuid;
        cc.vv.userMgr.getDetailOfGame(roomUUID,idx,function(data){
            data.base_info = JSON.parse(data.base_info);
            data.action_records = JSON.parse(data.action_records);
            cc.vv.gameNetMgr.prepareReplay(self._curRoomInfo,data);
            cc.vv.replayMgr.init(data);//fangkadoudizhu
			var scenename=data.base_info.type;
			if(scenename=="fangkadoudizhu"){
				if(data.base_info.game_seats.length==3){
					scenename="fangkadoudizhu3";
				}
			}
            cc.director.loadScene(scenename); 
        });
    },
    
    onViewItemClicked:function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var idx = event.target.idx;
        console.log(idx);
        if(this._curRoomInfo == null){
            this.getGameListOfRoom(idx);
        }
        else{
            this.getDetailOfGame(idx);      
        }
    },
    
    onBtnOpClicked:function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var idx = event.target.parent.idx;
        console.log(idx);
        if(this._curRoomInfo == null){
            this.getGameListOfRoom(idx);
        }
        else{
            this.getDetailOfGame(idx);      
        }
    },
    decode :function(input){
		var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        var string = "";  
        var i = 0;  
        var c = 0,c1 =0, c2 = 0,c3 = 0;  
        while ( i < output.length ) {  
            c = output.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = output.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = output.charCodeAt(i+1);  
                c3 = output.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
		
	},
	
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
