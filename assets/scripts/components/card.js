cc.Class({
    extends: cc.Component,

    properties: {
		
		point:cc.Node,
		suit:cc.Node,
		b_point:cc.Node,
		b_suit:cc.Node,
		king:cc.Node,
		b_king:cc.Node,
		center:cc.Node,
		dizhu:cc.Node,
		bg:cc.Node,
		pic:{
			default:null,
            type:cc.SpriteAtlas
		},
		pic2:{
			default:null,
            type:cc.SpriteAtlas
		},
		car_bg:{
			default:null,
            type:cc.SpriteFrame
		},
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
    onLoad: function () {
		
    },
	
	up_down:function(){
		if(this.node.canmove==true){
			if(this.node.y>0){
				this.node.canmove=false;
				this.node.runAction(cc.sequence(cc.moveTo(0.1,this.node.x, 0),cc.callFunc(function(target, index){
				this.node.canmove=true;
				},this,0)));
			}else{
				this.node.canmove=false;
				this.node.runAction(cc.sequence(cc.moveTo(0.1,this.node.x, 40),cc.callFunc(function(target, index){
				this.node.canmove=true;
				},this,0)));
			}
        }
	},
	init:function(point,suit,dizhu,bg){
		//初始化牌背景
		if(bg=="noback"){
			var targetSprite=this.bg.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic2.getSpriteFrame("card_backgroud");
			var point_color="";
			if(suit=="1"||suit=="3"){//设置点数颜色
				point_color="";
			}else{
				point_color="r";
			}
			//设置点数数字
			if(point==14){
				point=1;
			}else if(point==15){
				point=2;
			}
			var targetSprite=this.point.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic.getSpriteFrame(point_color+""+point);
		//	var targetSprite=this.b_point.getComponent(cc.Sprite);
		//	targetSprite.spriteFrame=this.pic.getSpriteFrame("card_num_"+point_color+""+point);
			
			if(point==16){
				var targetSprite=this.king.getComponent(cc.Sprite);
				targetSprite.spriteFrame=this.pic.getSpriteFrame("小王_大");
				// var targetSprite=this.b_king.getComponent(cc.Sprite);
				// targetSprite.spriteFrame=this.pic.getSpriteFrame("card_small_ghost_font");
				this.king.active=true;
			//	this.b_king.active=true;
				this.point.active=false;
				this.suit.active=false;
				this.center.active=false;
			//	this.b_point.active=false;
			//	this.b_suit.active=false;
			}else if(point==17){
				var targetSprite=this.king.getComponent(cc.Sprite);
				targetSprite.spriteFrame=this.pic.getSpriteFrame("大王_大");
				// var targetSprite=this.b_king.getComponent(cc.Sprite);
				// targetSprite.spriteFrame=this.pic.getSpriteFrame("card_big_ghost_font");
				this.king.active=true;
			//	this.b_king.active=true;
				this.point.active=false;
				this.suit.active=false;
				this.center.active=false;
			//	this.b_suit.active=false;
			}else{
				this.king.active=false;
			//	this.b_king.active=false;
				this.point.active=true;
				this.suit.active=true;
				this.center.active=true;
			//	this.b_point.active=true;
			//	this.b_suit.active=true;
			}
		
			//初始化花色
			var suit_color="";
			if(suit=="1"){
				suit_color="黑桃";
			}else if(suit=="2"){
				suit_color="红心";
			}else if(suit=="3"){
				suit_color="梅花";
			}else if(suit=="4"){
				suit_color="方片";
			}
			var targetSprite=this.suit.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic.getSpriteFrame(suit_color);
			var targetSprite=this.center.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic.getSpriteFrame(suit_color);
		//	var targetSprite=this.b_suit.getComponent(cc.Sprite);
		//	targetSprite.spriteFrame=this.pic.getSpriteFrame(suit_color);
			this.dizhu.active=dizhu>0;
			

		}else{
			var targetSprite=this.bg.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.car_bg;
			this.point.active=false;
			this.suit.active=false;
			this.center.active=false;
		//	this.b_point.active=false;
		//	this.b_suit.active=false;
			this.king.active=false;
		//	this.b_king.active=false;
			this.dizhu.active=false;
			return;
		}	
		
		
		
	},
	init_dipai:function(point,suit,bg){
		if(bg=="noback"){
			var targetSprite=this.bg.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic2.getSpriteFrame("card_backgroud");
			var point_color="";
			if(suit=="1"||suit=="3"){//设置点数颜色
				point_color="";
			}else{
				point_color="r";
			}
			//设置点数数字
			if(point==14){
				point=1;
			}else if(point==15){
				point=2;
			}
			var targetSprite=this.point.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic.getSpriteFrame(point_color+""+point);
			
			if(point==16){
				var targetSprite=this.king.getComponent(cc.Sprite);
				targetSprite.spriteFrame=this.pic.getSpriteFrame("小王_大");
				this.king.active=true;
				this.point.active=false;
				this.suit.active=false;
				
			}else if(point==17){
				var targetSprite=this.king.getComponent(cc.Sprite);
				targetSprite.spriteFrame=this.pic.getSpriteFrame("大王_大");			
				this.king.active=true;
				this.point.active=false;
				this.suit.active=false;
				
			}else{
				this.king.active=false;
				this.point.active=true;
				this.suit.active=true;
				
			}
		
			//初始化花色
			var suit_color="";
			if(suit=="1"){
				suit_color="黑桃";
			}else if(suit=="2"){
				suit_color="红心";
			}else if(suit=="3"){
				suit_color="梅花";
			}else if(suit=="4"){
				suit_color="方片";
			}
			var targetSprite=this.suit.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.pic.getSpriteFrame(suit_color);
			
		}else{
			var targetSprite=this.bg.getComponent(cc.Sprite);
			targetSprite.spriteFrame=this.car_bg;
			this.point.active = false;
			this.suit.active = false;
		
			this.king.active = false;
		
		
		}	
	},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
