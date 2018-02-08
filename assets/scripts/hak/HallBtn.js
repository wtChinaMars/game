cc.Class({
    extends: cc.Component,

    properties: {
        xiaoXi: {
            default: null,
            type:cc.Node
        },

        wanfa: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    BtnLianXiKeFu: function(){
        this.xiaoXi.active = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    BtnCha: function(){
        this.xiaoXi.active = false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    BtnWanFa: function(){
        this.wanfa.active = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    BtnWanFaCha: function(){
        this.wanfa.active = false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    }
});
