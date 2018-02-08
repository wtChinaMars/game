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
        jbTitle: cc.Node,
        sjTitle: cc.Node,
        mainTitle: cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function(type){
        if(type=="sj"){
            this.jbTitle.active=true;
            this.syTitle.active=false;
            this.mainTitle.active=false;
        }else if(type=="jb"){
            this.syTitle.active=true;
            this.jbTitle.active=false;
            this.mainTitle.active=false;
        }else if(type=="mian"){
            this.mainTitle.active=true;
            this.syTitle.active=false;
            this.jbTitle.active=false;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
