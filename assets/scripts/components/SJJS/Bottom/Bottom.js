cc.Class({
    extends: cc.Component,

    properties: {
        xyzp: cc.Node,
        duihuan: cc.Node,
        beibao: cc.Node,
        task: cc.Node,
        xiaoxi: cc.Node,
        huodong:cc.Node,
        shop:cc.Node,
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
    onClicked: function(event){
        if (event.target.name == "zhuanpan") {
            this.xyzp.zIndex=100;
            this.xyzp.active = true;
        }else if (event.target.name == "duihuan") {
            this.duihuan.zIndex=100;
            this.duihuan.active = true;
        }else if (event.target.name == "beibao") {
            this.beibao.zIndex=100;
            this.beibao.active = true;
        }else if (event.target.name == "renwu") {
            this.task.zIndex=100;
            this.task.active = true;
            cc.find("Canvas/bottom/task/meiriqiandao").getComponent("taskqd").showTime();
        }else if (event.target.name == "xiaoxi") {
            this.xiaoxi.zIndex=100;
            this.xiaoxi.active = true;
        }else if (event.target.name == "huodong") {
            this.xiaoxi.zIndex=100;
            this.huodong.active = true;
        }else if (event.target.name == "shop") {
            this.shop.zIndex=100;
            this.shop.active = true;
        }
    },
    onClickClose: function(event){
        if (event.target.name == "btn_xyzp_exit") {
            this.xyzp.active = false;
        }else if (event.target.name == "btn_dh_exit") {
            this.duihuan.active = false;
        }else if (event.target.name == "btn_bb_exit") {
            this.beibao.active = false;
        }else if (event.target.name == "btn_mrrw_exit"||event.target.name == "btn_mrqd_exit") {
            this.task.active = false;
        }else if (event.target.name == "btn_xx_exit") {
            this.xiaoxi.active = false;
        }else if (event.target.name == "btn_hd_exit") {
            this.huodong.active = false;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
