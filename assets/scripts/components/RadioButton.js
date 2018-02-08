cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        target:cc.Node,
        sprite:cc.SpriteFrame,
        checkedSprite:cc.SpriteFrame,
        checked:false,
        groupId:-1,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        if(cc.vv.radiogroupmgr == null){
            var RadioGroupMgr = require("RadioGroupMgr");
            cc.vv.radiogroupmgr = new RadioGroupMgr();
            cc.vv.radiogroupmgr.init();
        }
        console.log(typeof(cc.vv.radiogroupmgr.add));
        cc.vv.radiogroupmgr.add(this);

        this.refresh();
    },
    
    refresh:function(){
        var targetSprite = this.target.getComponent(cc.Sprite);
        if(this.checked){
            targetSprite.spriteFrame = this.checkedSprite;
        }
        else{
            targetSprite.spriteFrame = this.sprite;
        }
    },
    
    check:function(value){
        this.checked = value;
        this.refresh();
    },
    
    onClicked:function(event){
        cc.vv.radiogroupmgr.check(this);
        if(event.target.name=="ren3"){
         var wanfa =    cc.find("Canvas/FK/CreateRoom/game_list/fangkadoudizhu/wanfaxuanze").getChildren();
         wanfa[3].active=true;
         var wanfa =    cc.find("Canvas/FK/DaiKaiRoom/game_list/fangkadoudizhu/wanfaxuanze").getChildren();
         wanfa[3].active=true;
         var jushu=cc.find("Canvas/FK/CreateRoom/game_list/fangkadoudizhu/xuanzejushu/RadioButton/title").getComponent(cc.Label).string=12+"局";
        }else if(event.target.name=="ren2"){
            var wanfa =    cc.find("Canvas/FK/CreateRoom/game_list/fangkadoudizhu/wanfaxuanze").getChildren();
            wanfa[3].active=false;
            var wanfa =    cc.find("Canvas/FK/DaiKaiRoom/game_list/fangkadoudizhu/wanfaxuanze").getChildren();
            wanfa[3].active=false;
            var jushu=cc.find("Canvas/FK/CreateRoom/game_list/fangkadoudizhu/xuanzejushu/RadioButton/title").getComponent(cc.Label).string=15+"局";
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    onDestroy:function(){
        if(cc.vv && cc.vv.radiogroupmgr){
            cc.vv.radiogroupmgr.del(this);            
        }
    }
});
