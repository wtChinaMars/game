cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {

    },

    update: function (){
        var time = new Date();
        var nowTime = time.toLocaleTimeString();
        var shi=time.getHours();
        var fen=time.getMinutes();
        var miao=time.getSeconds();
        if(shi<10){
            shi = "0"+shi;
        }if(fen<10){
            fen = "0"+fen;
        }if(miao<10){
            miao = "0"+miao;
        }
        this.getComponent(cc.Label).string = shi+":"+fen+":"+miao;
    }
});
