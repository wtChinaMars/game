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
        gamelist1:cc.Node,
        gamelist12:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function(type){
        if(type=="sj"){
            this.gamelist1.active=true;
            this.gamelist2.active=false;
        }else if(type=="jb"){
            this.gamelist2.active=true;
            this.gamelist1.active=false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
