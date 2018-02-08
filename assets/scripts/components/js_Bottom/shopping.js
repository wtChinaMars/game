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
        jb_title:cc.Node,
        jt_title:cc.Node,
        jb_page:cc.Node,
        jt_page:cc.Node,
        lblJT:cc.Label,
        lblJB:cc.Label,
        lblFK:cc.Label,
        shopping:cc.Node,
        
    },

    // use this for initialization
    onLoad: function () {
        this.lblJB.string = cc.vv.userMgr.coins;
        this.lblJT.string = cc.vv.userMgr.jintiao;
        this.lblFK.string = cc.vv.userMgr.coins;
        
    },
//onclick
    onClicked: function(event){
        console.log("event.target.name  "+event.target.name);
        if(event.target.name="btnjt"){
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            console.log("jTjTjTjTjTjTjTjTjTjT");
            this.jt_title.active=true;
            this.jt_page.active=true;
            this.jb_title.active=false;
            this.jb_page.active=false;

        }
    },
    onClicked1: function(event){
        console.log("event.target.name  "+event.target.name);
        if(event.target.name="btnjb"){
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            console.log("jBjBjBjBjBjBjBjBjBjB");
            this.jb_title.active=true;
            this.jb_page.active=true;
            this.jt_title.active=false;
            this.jt_page.active=false;
        }
    },
    onClickClose: function(event){
        if(event.target.name="btn_shopClose"){
            this.shopping.active=false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
