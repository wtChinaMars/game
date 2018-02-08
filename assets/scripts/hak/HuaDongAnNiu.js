cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        var slider = this.getComponent(cc.Slider);
    },

    OnPress: function(){
        //console.log(this.slider.progress);
        console.log(45);
        if(this.getComponent(cc.Slider).progress > 0.5){
            this.getComponent(cc.Slider).progress = 0;
        }else{
            this.getComponent(cc.Slider).progress = 1;
        }
    }
});
