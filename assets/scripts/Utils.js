cc.Class({
    extends: cc.Component,

    properties: {
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

    addClickEvent:function(node,target,component,handler){
        console.log(component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },

    addSlideEvent:function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var slideEvents = node.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
    },

    addEscEvent:function(node){
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                if(cc.vv.userMgr.zhuangtai==true){
                    cc.find("Canvas/bottom_left").active = true;
                    cc.find("Canvas/gamelist").active = true;
                    cc.find("Canvas/SJ/gamelist").active = false;
                    cc.find("Canvas/SJ/fkx").active = false;
                    cc.find("Canvas/background/maintitle").active = true;
                  //  cc.find("Canvas/background/sj").active = false; 
                    cc.find("Canvas/bottom_left").active = true;
                    cc.find("Canvas/gamelist").active = true;
                    cc.find("Canvas/top/right_bottom/RoomCard").active = true;
                    cc.find("Canvas/top/right_bottom/Gold").active = true;
                    cc.find("Canvas/top/right_bottom/Score").active = false;
                 // cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = cc.vv.userMgr.gems;
                    cc.find("Canvas/FK/bottom_left").active = false;
                    cc.find("Canvas/FK/gamelist").active = false;
                    cc.find("Canvas/FK/fkx").active = false;
                    cc.find("Canvas/background/maintitle").active = true;
                    cc.find("Canvas/background/YP").active = false;
                    cc.find("Canvas/center/gamelist").active  = false;
                    cc.find("Canvas/gamelist").active = true;
                    cc.find("Canvas/background/jbtitle").active = false;
                    cc.find("Canvas/background/maintitle").active = true;
                    cc.find("Canvas/center/back").active = false;
                    cc.find("Canvas/FK/bottom_left/fk_bottom/zhanji/history").active = false;
                    cc.find("Canvas/FK/bottom_left/fk_bottom/wanfa/history").active = false;
                    cc.find("Canvas/FK/bottom_left/fk_bottom/zsfk/zsfk").active = false;
                    cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe").active = false;
                    cc.find("Canvas/FK/CreateRoom").active = false;
                    cc.find("Canvas/FK/JoinGame").active = false;
                    cc.find("Canvas/FK/DaiKaiRoom").active = false;
                    cc.find("Canvas/FK/roomwindow").active = false;
                    cc.find("Canvas/xiaoxi1").active = false;
                    cc.find("Canvas/settings").active = false;
                    cc.find("Canvas/task").active = false;
                    cc.find("Canvas/paihangbang").active = false;
                    cc.find("Canvas/beibao").active = false;
                    cc.find("Canvas/duihuan").active = false;
                    cc.find("Canvas/xyzp").active = false;
                    cc.find("Canvas/huodong").active = false;
                    cc.find("Canvas/shopping").active = false;
                   // cc.find("Canvas/lianxi").active = false;
                //    cc.vv.alert.show("提示",cc.find("Canvas/lianxi").active==true?"aa":'bb');
                    cc.vv.userMgr.zhuangtai=false;
                }else{
                //    cc.vv.alert.show("提示","..");
                   if(keyCode == cc.KEY.back){
                       cc.vv.alert.show('提示','确定要退出游戏吗？',function(){
                           cc.game.end();
                       },true);
                   }
                }

            }
        }, node);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
