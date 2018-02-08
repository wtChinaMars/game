cc.Class({
    extends: cc.Component,
//init
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
        top_right  : cc.Node,
        top_left   : cc.Node,
        huodong    : cc.Node,
        huodongym  : cc.Node,
        gonggaoym  : cc.Node, 
        lbdh       :  cc.Node,
        zhaobug    :  cc.Node,
        gzweixin   :  cc.Node,
        jfchongbang:  cc.Node,
        jkyx       :  cc.Node,
        fzb        :  cc.Node,
        sjbht      :  cc.Node,
        
    },

//load
    onLoad: function () {

    },
//onclick
    onClicked:function(event){
        //活动节点下精彩游戏和游戏公告切换
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(event.target.name=="btn_jchd"){
            this.top_left.active=true;
            this.top_right.active=false;
            this.huodongym.active=true;
            this.gonggaoym.active=false;  
        }else if(event.target.name=="btn_yxgg"){
            this.top_left.active=false;
            this.top_right.active=true;
            this.huodongym.active=false;
            this.gonggaoym.active=true;  
        }

        //精彩游戏下三个节点切换
        if(event.target.name=="btn_lbdh"){
            this.lbdh.active=true;
            this.zhaobug.active=false;
            this.gzweixin.active=false;
            this.jfchongbang.active=false;
        }else if(event.target.name=="btn_zhaobug"){
            this.lbdh.active=false;
            this.zhaobug.active=true;
            this.gzweixin.active=false;
            this.jfchongbang.active=false;  
        }else if(event.target.name=="btn_gzweixin"){
            this.lbdh.active=false;
            this.zhaobug.active=false;
            this.gzweixin.active=true;
            this.jfchongbang.active=false;  
        }else if(event.target.name=="btn_jfchongbang"){
            this.lbdh.active=false;
            this.zhaobug.active=false;
            this.gzweixin.active=false;
            this.jfchongbang.active=true;  
        }
        //游戏公告下三个节点切换
        if(event.target.name=="btn_jkyx"){
            this.jkyx.active=true;
            this.fzb.active=false;
            this.sjbht.active=false;
        }else if(event.target.name=="btn_fzb"){
            this.jkyx.active=false;
            this.fzb.active=true;
            this.sjbht.active=false;
        }else if(event.target.name=="btn_sjbut"){
            this.jkyx.active=false;
            this.fzb.active=false;
            this.sjbht.active=true;
        }
    },
    onClickClose:function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(event.target.name=="btn_hd_exit"){
            this.huodong.active=false;
        }
    }
//function
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
