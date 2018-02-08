cc.Class({
    extends: cc.Component,

    properties: {
        ph_name:cc.Label,
        ph_id:cc.Label,
        ph_jifen:cc.Label,
        ph_touxiang:cc.Sprite,
        one:cc.Node,
        two:cc.Node,
        Three:cc.Node,
      //  paiming:cc.Label,
        qt:cc.Node,
        
    },
    onLoad: function () {

    },
    init:function(name,id,jifen,paiming){
        if(paiming==0){
            var imgLoader = this.ph_touxiang.node.getComponent("ImageLoader");
            imgLoader.setUserID(id);
            this.one.active=true;
            this.two.active=false;
            this.Three.active=false;
            this.qt.active=false;
            this.ph_name.string = name;
            this.ph_id.string = "ID:"+id;
            this.ph_jifen.string =jifen;
        }else  if(paiming==1){
            var imgLoader = this.ph_touxiang.node.getComponent("ImageLoader");
            imgLoader.setUserID(id);
            this.one.active=false;
            this.two.active=true;
            this.Three.active=false;
            this.qt.active=false;
            this.ph_name.string = name;
            this.ph_id.string = "ID:"+id;
            this.ph_jifen.string =jifen;
        }else  if(paiming==2){
            var imgLoader = this.ph_touxiang.node.getComponent("ImageLoader");
            imgLoader.setUserID(id);
            this.one.active=false;
            this.two.active=false;
            this.Three.active=true;
            this.qt.active=false;
            this.ph_name.string = name;
            this.ph_id.string = "ID:"+id;
            this.ph_jifen.string =jifen;
        }else{
            var imgLoader = this.ph_touxiang.node.getComponent("ImageLoader");
            imgLoader.setUserID(id);
            this.one.active=false;
            this.two.active=false;
            this.Three.active=false;
            this.qt.active=true;
            this.qt.getChildByName("paiming").getComponent(cc.Label).string=paiming+1;
            this.ph_name.string = name;
            this.ph_id.string = "ID:"+id;
            this.ph_jifen.string =jifen;
        }
    },
});
