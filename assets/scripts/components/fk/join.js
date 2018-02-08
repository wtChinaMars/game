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
        joinGameWin: cc.Node,

    },

    // use this for initialization
    onLoad: function () {

    },
    onJoinGameClicked: function () {
        if(cc.vv.gameNetMgr.roomId!==null){
            cc.vv.alert.show("提示","您即将返回房间",function(){
                cc.vv.wc.show("正在进入房间");
                cc.director.loadScene(cc.vv.gameNetMgr.returngame);  
            }.bind(this),true);
        }else{
            this.joinGameWin.active = true;
        }
       
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    onInputFinished:function(roomId){
        cc.vv.userMgr.enterRoom(roomId,function(ret){
            if(ret.errcode == 0){
                this.node.active = false;
            }
            else{
                var content = "房间["+ roomId +"]不存在，请重新输入!";
                if(ret.errcode == 4){
                    content = "房间["+ roomId + "]已满!";
                    
                }
                cc.vv.alert.show("提示",content);
                this.onResetClicked();
            }
        }.bind(this)); 
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
