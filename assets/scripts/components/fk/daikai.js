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
        daikaiRoomWin: cc.Node,
        roomwindow:cc.Node,

    },

    // use this for initialization
    onLoad: function () {

    },
    onDaiKaiRoomClicked: function () {
        //  if(cc.vv.gameNetMgr.roomId != null){
        //      cc.vv.alert.show("提示","房间已经创建!\n必须解散当前房间才能创建新的房间");
        //      return;
        //  }
        //  console.log("onCreateRoomClicked");
        this.daikaiRoomWin.active = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    onBtnClicked: function (event) {
        if (event.target.name == "btn_shezhi") {
            this.settingsWin.active = true;
        }
        else if (event.target.name == "btn_help") {
            this.helpWin.active = true;
        }
        else if (event.target.name == "btn_xiaoxi") {
            this.xiaoxiWin.active = true;
        }
        else if (event.target.name == "head") {
            cc.vv.userMgr.zhuangtai=true;
            cc.vv.userinfoShow.show(cc.vv.userMgr.userName, cc.vv.userMgr.userId, this.sprHeadImg, cc.vv.userMgr.sex, cc.vv.userMgr.ip, cc.vv.userMgr.charm, cc.vv.userMgr.lv, cc.vv.userMgr.jinbichangnum, cc.vv.userMgr.jinbichangshenglv, cc.vv.userMgr.coins, cc.vv.userMgr.jintiao);
        } else if (event.target.name == "btn_ok3") {
            this.roomwindow.active = true;
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1), cc.callFunc(function () {
                this.roomwindow.getComponent("RoomWindow").getrooms();
            }, this, 0));
            this.roomwindow.runAction(seq);

            // this.roomwindow.getComponent("RoomWindow").getrooms();

        }
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
