cc.Class({
    extends: cc.Component,

    properties: {
        roomlist: cc.Node ,
        room:cc.Prefab,
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
    onCloseRoomWindow:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        this.node.active=false;
        
      
       
    },
    getrooms:function(){
       // cc.vv.userMgr.userId
       this.roomlist.removeAllChildren();
       var self = this;
       var onGet = function(ret){
        if(ret.errcode !== 0){
            console.log(ret.errmsg);
        }
        else{
                console.log(ret.rooms);
                //房间列表
                for(var i in ret.rooms){
                    var gamename="";
                    var json_str=JSON.parse(ret.rooms[i].base_info);
                    if(json_str.type=="fangkadoudizhu")
                        gamename="斗地主";
                  
                    var renwu=0;
                 
                        if(ret.rooms[i].user_id0>0)
                            renwu++;
                        if(ret.rooms[i].user_id1>0)
                            renwu++;
                        if(ret.rooms[i].user_id2>0)
                            renwu++;
                        if(ret.rooms[i].user_id3>0)
                            renwu++;

                    
                    var game_renshu=renwu+"/"+json_str.renshu+"人";
                    var rs = json_str.renshu;
                    var gamestate=ret.rooms[i].num_of_turns>0?"已开始":"未开始";
                    var time="";//12:30:30
                    var seats=[];
                    seats.push({id:ret.rooms[i].user_id0,name:ret.rooms[i].user_name0});
                    seats.push({id:ret.rooms[i].user_id1,name:ret.rooms[i].user_name1});
                    seats.push({id:ret.rooms[i].user_id2,name:ret.rooms[i].user_name2});
                    seats.push({id:ret.rooms[i].user_id3,name:ret.rooms[i].user_name3});
                    
                    var room   = cc.instantiate(self.room);
                    var  roomConf="";
                    roomConf+=json_str.maxGames + "局";
                    if (json_str.fanshu == 999999 || json_str.fanshu == "999999") {
                        roomConf+=" 无封顶";
                    } else {
                        roomConf+=" "+json_str.fanshu+"番封顶";
                    }
                    if (json_str.jinyan == true) {
                        roomConf+=" 禁言";
                    }
                    if (json_str.jiabei == true) {
                        roomConf+=" 可加倍";
                    } else {
                        roomConf+=" 无加倍";
                    }

                
                    room.getComponent("room").init(ret.rooms[i].id,gamename,time,game_renshu,gamestate,seats,rs,roomConf);//id,name,time,renshu,state
                    room.parent = self.roomlist;
                }
            }
        };
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
        };
        cc.vv.http.sendRequest("/get_room_list",data,onGet);
    },
   
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
