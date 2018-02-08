cc.Class({
    extends: cc.Component,

    properties: {
        name1:cc.Label,
        jiangli:cc.Label,
        
    },
    onLoad: function () {

    },
    init:function(name,jiangli){
        this.name1.string=name;
        this.jiangli.string=jiangli;
    },
});
