cc.Class({
    extends: cc.Component,

    properties: {
        fenYeMianBan: {
            default: null,
            type: cc.Node,
        },

        settings: {
            default: null,
            type: cc.Node,
        },

        press: {
            default: null,
            type: cc.Node,
        },

        page_1: {
            default: null,
            type: cc.Node,
        },

        page_2: {
            default: null,
            type: cc.Node,
        },

        page_3: {
            default: null,
            type: cc.Node,
        },

        page_4: {
            default: null,
            type: cc.Node,
        },

        _pos_Btn01: -135,
        _pos_Btn02: 75,
        _pos_Btn03: 295,
        _pos_Btn04: 515,

    },

    // use this for initialization
    onLoad: function () {

    },

    OnPress_GuanYuWoMen: function (){
        this.settings.active = false;
        this.fenYeMianBan.active = true;

        this.page_1.active = true;
        this.page_2.active = false;
        this.page_3.active = false;
        this.page_4.active = false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    OnPress_GuanYuWoMen_S: function(){
        this.page_1.active = true;
        this.page_2.active = false;
        this.page_3.active = false;
        this.page_4.active = false;
        cc.find("Canvas/fenYeMianBan/bg/gy_bg").active=true;
        cc.find("Canvas/fenYeMianBan/bg/xy_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/sm_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/cl_bg").active=false;

        
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    OnPress_FuWuXieYi: function(){
        this.page_1.active = false;
        this.page_2.active = true;
        this.page_3.active = false;
        this.page_4.active = false;
        cc.find("Canvas/fenYeMianBan/bg/gy_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/xy_bg").active=true;
        cc.find("Canvas/fenYeMianBan/bg/sm_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/cl_bg").active=false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    OnPress_BanHaoShenMing: function(){
        this.page_1.active = false;
        this.page_2.active = false;
        this.page_3.active = true;
        this.page_4.active = false;
        cc.find("Canvas/fenYeMianBan/bg/gy_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/xy_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/sm_bg").active=true;
        cc.find("Canvas/fenYeMianBan/bg/cl_bg").active=false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    OnPress_YinSi: function(){
        this.page_1.active = false;
        this.page_2.active = false;
        this.page_3.active = false;
        this.page_4.active = true;
        cc.find("Canvas/fenYeMianBan/bg/gy_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/xy_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/sm_bg").active=false;
        cc.find("Canvas/fenYeMianBan/bg/cl_bg").active=true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    OnPressYouXiBangZhu: function (){
        this.settings.active = false;
        this.fenYeMianBan.active = true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },

    OnPressFanHui: function(){
        this.settings.active = true;
        this.fenYeMianBan.active = false;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    }
});
