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
        _lbl:null,
        pagecount:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this.initxieyi();
       

    },
//onClick
    onClickUp: function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(event.target.name == "btn_up") {
            var str = parseInt(this.pagecount.string)-1>0?parseInt(this.pagecount.string)-1:0;
            this.showPage(str);
            this.pagecount.string=str;
            
            cc.find("Canvas/fenYeMianBan/pages/02/lbl1").getComponent(cc.Label).string = "第"+(str+1)+"页";
            this.showBtn(str);
        }
    },
    onClickDown: function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(event.target.name == "btn_down"){
            var str = parseInt(this.pagecount.string)+1<43?parseInt(this.pagecount.string)+1:42;
            this.showPage(str);
            this.pagecount.string=str;
            cc.find("Canvas/fenYeMianBan/pages/02/lbl1").getComponent(cc.Label).string = "第"+(str+1)+"页";
            this.showBtn(str);

        }
    },
//function
    initxieyi: function(){
        this.pagecount.string=0;
        // this._lbl = cc.instantiate(this.lb1);
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/lbl").addChild(this._lbl);
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/lbl").height=this._lbl.height-520;
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content").height=this._lbl.height-520;
        // var pageurl = cc.url.raw("resources/textures/pagenum/page_1.png");
        // var textures = cc.textureCache.addImage(pageurl);
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/page").getComponent(cc.Sprite).spriteFrame.setTexture(textures);
        this.showBtn(0);
        
    },
    showPage: function(page){
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content").y=-10;
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/lbl").removeAllChildren();
        // this._lbl = cc.instantiate(arry[page]);
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/lbl").addChild(this._lbl);
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/lbl").height=this._lbl.height-520;
        // cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content").height=this._lbl.height-520;
        var pageurl = cc.url.raw("resources/textures/pagenum/page_"+(page+1)+".png");
        var textures = cc.textureCache.addImage(pageurl);
        cc.find("Canvas/fenYeMianBan/pages/02/New ScrollView/view/content/page").getComponent(cc.Sprite).spriteFrame.setTexture(textures);
        this.showBtn(page);
        
        
    },
    showBtn: function(page){
        if(this.pagecount.string==0){
            cc.find("Canvas/fenYeMianBan/pages/02/btn_up").active=false;
            cc.find("Canvas/fenYeMianBan/pages/02/btn_down").active=true;
        }else if(this.pagecount.string==42){
            cc.find("Canvas/fenYeMianBan/pages/02/btn_down").active=false;
            cc.find("Canvas/fenYeMianBan/pages/02/btn_up").active=true;
        }else{
            cc.find("Canvas/fenYeMianBan/pages/02/btn_up").active=true;
            cc.find("Canvas/fenYeMianBan/pages/02/btn_down").active=true;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
