cc.Class({
    extends: cc.Component,

    properties: {
        beibao_name:cc.Label,
        beibao_sum:cc.Label,
        beibao_wupin:cc.Node,
        
       
        
        
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
    onLoad: function() {
    },
	init:function(name,sum,wupin){
        this.beibao_name.string = name;
        this.beibao_sum.string = sum;
      //  this.beibao_wupin.active = true;
      for(var i=0;i<beibao_wupin.children.length;i++){
          if(beibao_wupin.children[i].name==wupin){
              beibao_wupin.children[i].active = true;
          }else{
              beibao_wupin.children[i].active = false;
          }
      }
        var s = {wupin:[]}
    },

});
