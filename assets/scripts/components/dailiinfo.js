cc.Class({
    extends: cc.Component,

    properties: {
        sheng:cc.Label,
        wx:null,
        s:null,
    },

    // use this for initialization
    onLoad: function () {

    },
	init:function(info,wx1){
        this.sheng.string=info;
        this.wx=wx1;
        this.s=info;

	},
    dailiinfo:function(){
        cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hzsalert").active = true;
        cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hzsalert/sheng").getComponent(cc.Label).string = this.s;
        cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hzsalert/wx").getComponent(cc.Label).string = "微信号 : "+this.wx;
    },

});
