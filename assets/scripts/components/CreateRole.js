var Global = require("Global")
cc.Class({
    extends: cc.Component,

    properties: {
        inputName:cc.EditBox,
        nan:cc.Node,
        nv:cc.Node,
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    onRandomBtnClicked:function(){
        var names = [
            "上官",
            "欧阳",
            "东方",
            "端木",
            "独孤",
            "司马",
            "南宫",
            "夏侯",
            "诸葛",
            "皇甫",
            "长孙",
            "宇文",
            "轩辕",
            "东郭",
            "子车",
            "东阳",
            "子言",
        ];

        var names2 = [
            "雀圣",
            "赌侠",
            "赌圣",
            "稳赢",
            "不输",
            "好运",
            "自摸",
            "有钱",
            "土豪",
        ];
        var idx = Math.floor(Math.random() * (names.length - 1));
        var idx2 = Math.floor(Math.random() * (names2.length - 1));
        this.inputName.string = names[idx] + names2[idx2];
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        this.onRandomBtnClicked();
    },

    onBtnConfirmClicked:function(){
        var name = this.inputName.string;
        if(name == ""){
            console.log("invalid name.");
            return;
        }
        console.log(name);

        //cc.vv.userMgr.create(name);
		      cc.vv.userMgr.create_zhanghao(name);
    },
    onBtnSex:function(event){
      if(event.target.name == 'sex_man'){
        Global.sex=1;
        this.nan.active = true;
        this.nv.active = false;
      }else if(event.target.name =='sex_women'){
        Global.sex=2;
        this.nan.active = false;
        this.nv.active = true;
      }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
